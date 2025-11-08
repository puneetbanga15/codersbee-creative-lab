import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface Player {
  id: string;
  student_name: string;
  score: number;
  answers_correct: number;
  answers_wrong: number;
  joined_at: string;
}

export interface QuizSession {
  id: string;
  quiz_id: string;
  room_code: string;
  host_id: string;
  status: "waiting" | "active" | "completed" | "cancelled";
  current_question_index: number;
  max_players: number;
  time_per_question: number;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
}

export interface SessionBroadcast {
  event: "player_joined" | "player_left" | "question_changed" | "answer_submitted" | "session_started" | "session_ended";
  payload: any;
}

export const useQuizSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [connectedPlayers, setConnectedPlayers] = useState<Set<string>>(new Set());

  // Fetch session data
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['quiz-session', sessionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      return data as QuizSession;
    },
    refetchInterval: 3000, // Poll every 3 seconds for session updates
  });

  // Fetch quiz questions
  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ['quiz-questions', session?.quiz_id],
    queryFn: async () => {
      if (!session?.quiz_id) return [];

      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', session.quiz_id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as QuizQuestion[];
    },
    enabled: !!session?.quiz_id,
  });

  // Fetch players
  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ['quiz-session-players', sessionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_session_players')
        .select('*')
        .eq('session_id', sessionId)
        .order('score', { ascending: false });

      if (error) throw error;
      return data as Player[];
    },
    refetchInterval: 2000, // Poll every 2 seconds for leaderboard updates
  });

  // Join session as player
  const joinSessionMutation = useMutation({
    mutationFn: async ({ studentName, userId }: { studentName: string; userId?: string }) => {
      const { data, error } = await supabase
        .from('quiz_session_players')
        .insert({
          session_id: sessionId,
          student_name: studentName,
          user_id: userId || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session-players', sessionId] });
    },
  });

  // Submit answer
  const submitAnswerMutation = useMutation({
    mutationFn: async ({
      playerId,
      questionId,
      selectedAnswer,
      correctAnswer,
      timeTaken,
    }: {
      playerId: string;
      questionId: string;
      selectedAnswer: string;
      correctAnswer: string;
      timeTaken: number;
    }) => {
      const isCorrect = selectedAnswer === correctAnswer;

      const { data, error } = await supabase
        .from('quiz_session_answers')
        .insert({
          session_id: sessionId,
          player_id: playerId,
          question_id: questionId,
          selected_answer: selectedAnswer,
          is_correct: isCorrect,
          time_taken_seconds: timeTaken,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session-players', sessionId] });
    },
  });

  // Start session (host only)
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('quiz_sessions')
        .update({
          status: 'active',
          started_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      // Broadcast session started event
      if (channel) {
        channel.send({
          type: 'broadcast',
          event: 'session_started',
          payload: { sessionId },
        });
      }
    },
  });

  // Move to next question (host only)
  const nextQuestionMutation = useMutation({
    mutationFn: async (nextIndex: number) => {
      const { data, error } = await supabase
        .from('quiz_sessions')
        .update({
          current_question_index: nextIndex,
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      // Broadcast question changed event
      if (channel) {
        channel.send({
          type: 'broadcast',
          event: 'question_changed',
          payload: { sessionId },
        });
      }
    },
  });

  // End session (host only)
  const endSessionMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('quiz_sessions')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      // Broadcast session ended event
      if (channel) {
        channel.send({
          type: 'broadcast',
          event: 'session_ended',
          payload: { sessionId },
        });
      }
    },
  });

  // Setup Realtime channel
  useEffect(() => {
    if (!sessionId) return;

    const realtimeChannel = supabase.channel(`quiz-session-${sessionId}`, {
      config: {
        presence: {
          key: sessionId,
        },
      },
    });

    // Subscribe to presence (who's online)
    realtimeChannel
      .on('presence', { event: 'sync' }, () => {
        const state = realtimeChannel.presenceState();
        const players = Object.keys(state);
        setConnectedPlayers(new Set(players));
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        console.log('Player joined:', key);
        queryClient.invalidateQueries({ queryKey: ['quiz-session-players', sessionId] });
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('Player left:', key);
        queryClient.invalidateQueries({ queryKey: ['quiz-session-players', sessionId] });
      })
      // Subscribe to broadcasts
      .on('broadcast', { event: 'answer_submitted' }, () => {
        queryClient.invalidateQueries({ queryKey: ['quiz-session-players', sessionId] });
      })
      .on('broadcast', { event: 'question_changed' }, () => {
        queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      })
      .on('broadcast', { event: 'session_started' }, () => {
        queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      })
      .on('broadcast', { event: 'session_ended' }, () => {
        queryClient.invalidateQueries({ queryKey: ['quiz-session', sessionId] });
      })
      .subscribe();

    setChannel(realtimeChannel);

    return () => {
      realtimeChannel.unsubscribe();
    };
  }, [sessionId, queryClient]);

  // Track presence
  const trackPresence = async (playerId: string, playerName: string) => {
    if (channel) {
      await channel.track({
        player_id: playerId,
        player_name: playerName,
        online_at: new Date().toISOString(),
      });
    }
  };

  // Broadcast answer
  const broadcastAnswer = (playerId: string) => {
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'answer_submitted',
        payload: { playerId, sessionId },
      });
    }
  };

  return {
    session,
    questions,
    players,
    connectedPlayers,
    isLoading: sessionLoading || questionsLoading || playersLoading,
    joinSession: joinSessionMutation.mutateAsync,
    submitAnswer: submitAnswerMutation.mutateAsync,
    startSession: startSessionMutation.mutateAsync,
    nextQuestion: nextQuestionMutation.mutateAsync,
    endSession: endSessionMutation.mutateAsync,
    trackPresence,
    broadcastAnswer,
  };
};
