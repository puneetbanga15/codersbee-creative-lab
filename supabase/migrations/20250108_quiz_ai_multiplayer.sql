-- AI Quiz Generation and Multiplayer Sessions Migration
-- Created: 2025-01-08
-- Features: Teacher topic upload, AI quiz generation, multiplayer quiz sessions

-- =============================================
-- ENUMS
-- =============================================

-- Add difficulty level enum
CREATE TYPE quiz_difficulty AS ENUM ('easy', 'intermediate', 'complex');

-- Add session status enum
CREATE TYPE session_status AS ENUM ('waiting', 'active', 'completed', 'cancelled');

-- =============================================
-- TABLES
-- =============================================

-- Quiz Topics (Teacher uploads for AI generation)
CREATE TABLE quiz_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- Topic content for AI to process
  quiz_type quiz_type NOT NULL,
  difficulty quiz_difficulty NOT NULL DEFAULT 'intermediate',
  num_questions INTEGER NOT NULL DEFAULT 10,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  generated_quiz_id UUID REFERENCES quizzes(id) ON DELETE SET NULL,
  generation_status TEXT DEFAULT 'pending' -- pending, generating, completed, failed
);

-- Quiz Sessions (Multiplayer Rooms)
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  room_code TEXT UNIQUE NOT NULL,
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status session_status DEFAULT 'waiting',
  current_question_index INTEGER DEFAULT 0,
  max_players INTEGER DEFAULT 10,
  time_per_question INTEGER DEFAULT 30, -- seconds
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ
);

-- Session Players (Who's in the room)
CREATE TABLE quiz_session_players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  answers_correct INTEGER DEFAULT 0,
  answers_wrong INTEGER DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, student_name)
);

-- Session Answers (Real-time answer tracking)
CREATE TABLE quiz_session_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES quiz_session_players(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE NOT NULL,
  selected_answer TEXT,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  time_taken_seconds INTEGER,
  UNIQUE(session_id, player_id, question_id)
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_quiz_topics_created_by ON quiz_topics(created_by);
CREATE INDEX idx_quiz_topics_status ON quiz_topics(generation_status);
CREATE INDEX idx_quiz_sessions_room_code ON quiz_sessions(room_code);
CREATE INDEX idx_quiz_sessions_host ON quiz_sessions(host_id);
CREATE INDEX idx_quiz_sessions_status ON quiz_sessions(status);
CREATE INDEX idx_quiz_session_players_session ON quiz_session_players(session_id);
CREATE INDEX idx_quiz_session_answers_session ON quiz_session_answers(session_id);
CREATE INDEX idx_quiz_session_answers_player ON quiz_session_answers(player_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE quiz_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_session_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_session_answers ENABLE ROW LEVEL SECURITY;

-- Quiz Topics Policies
CREATE POLICY "Teachers and admins can view all topics"
  ON quiz_topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Teachers and admins can create topics"
  ON quiz_topics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Creators can update their topics"
  ON quiz_topics FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Creators can delete their topics"
  ON quiz_topics FOR DELETE
  USING (created_by = auth.uid());

-- Quiz Sessions Policies
CREATE POLICY "Anyone can view active sessions"
  ON quiz_sessions FOR SELECT
  USING (true);

CREATE POLICY "Teachers and admins can create sessions"
  ON quiz_sessions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Hosts can update their sessions"
  ON quiz_sessions FOR UPDATE
  USING (host_id = auth.uid());

CREATE POLICY "Hosts can delete their sessions"
  ON quiz_sessions FOR DELETE
  USING (host_id = auth.uid());

-- Quiz Session Players Policies
CREATE POLICY "Anyone can view session players"
  ON quiz_session_players FOR SELECT
  USING (true);

CREATE POLICY "Anyone can join sessions as player"
  ON quiz_session_players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Players can update their own data"
  ON quiz_session_players FOR UPDATE
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Quiz Session Answers Policies
CREATE POLICY "Players can view answers in their session"
  ON quiz_session_answers FOR SELECT
  USING (
    session_id IN (
      SELECT session_id FROM quiz_session_players
      WHERE user_id = auth.uid() OR id IN (
        SELECT id FROM quiz_session_players WHERE session_id = quiz_session_answers.session_id
      )
    )
  );

CREATE POLICY "Players can submit answers"
  ON quiz_session_answers FOR INSERT
  WITH CHECK (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to generate unique 6-digit room code
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate random 6-digit code
    code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');

    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM quiz_sessions WHERE room_code = code) INTO exists;

    -- Exit loop if code is unique
    EXIT WHEN NOT exists;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to update player score after correct answer
CREATE OR REPLACE FUNCTION update_player_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_correct THEN
    UPDATE quiz_session_players
    SET
      score = score + 10, -- 10 points per correct answer
      answers_correct = answers_correct + 1
    WHERE id = NEW.player_id;
  ELSE
    UPDATE quiz_session_players
    SET answers_wrong = answers_wrong + 1
    WHERE id = NEW.player_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update scores
CREATE TRIGGER update_score_on_answer
  AFTER INSERT ON quiz_session_answers
  FOR EACH ROW
  EXECUTE FUNCTION update_player_score();

-- =============================================
-- INITIAL DATA / HELPERS
-- =============================================

-- Add difficulty column to existing quizzes table (if doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN difficulty quiz_difficulty DEFAULT 'intermediate';
  END IF;
END $$;

COMMENT ON TABLE quiz_topics IS 'Teacher-uploaded topics for AI quiz generation';
COMMENT ON TABLE quiz_sessions IS 'Multiplayer quiz game rooms';
COMMENT ON TABLE quiz_session_players IS 'Players participating in quiz sessions';
COMMENT ON TABLE quiz_session_answers IS 'Individual answers submitted during multiplayer quizzes';
