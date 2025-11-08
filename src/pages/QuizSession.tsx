import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QuizLobby } from "@/components/quiz/QuizLobby";
import { MultiplayerQuizPlayer } from "@/components/quiz/MultiplayerQuizPlayer";
import { QuizLeaderboard } from "@/components/quiz/QuizLeaderboard";
import { Loader2 } from "lucide-react";

type SessionPhase = "lobby" | "playing" | "completed";

export default function QuizSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<SessionPhase>("lobby");
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);

  // Get current user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  // Get session data to check if user is host
  const { data: session, isLoading } = useQuery({
    queryKey: ['quiz-session-check', sessionId],
    queryFn: async () => {
      if (!sessionId) return null;

      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) {
        console.error("Error fetching session:", error);
        return null;
      }

      return data;
    },
    enabled: !!sessionId,
  });

  // Check if user is host and handle phase changes
  useEffect(() => {
    if (session && user) {
      const isHostUser = session.host_id === user.id;
      setIsHost(isHostUser);

      // Update phase based on session status
      if (session.status === 'active') {
        setPhase('playing');
      } else if (session.status === 'completed') {
        setPhase('completed');
      }
    }
  }, [session, user]);

  // Subscribe to session status changes
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`session-status-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quiz_sessions',
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          if (newStatus === 'active') {
            setPhase('playing');
          } else if (newStatus === 'completed') {
            setPhase('completed');
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  // Retrieve playerId from localStorage if available
  useEffect(() => {
    if (sessionId) {
      const storedPlayerId = localStorage.getItem(`player-${sessionId}`);
      if (storedPlayerId) {
        setPlayerId(storedPlayerId);
      }
    }
  }, [sessionId]);

  // Save playerId to localStorage when it changes
  const handlePlayerIdChange = (newPlayerId: string) => {
    setPlayerId(newPlayerId);
    if (sessionId) {
      localStorage.setItem(`player-${sessionId}`, newPlayerId);
    }
  };

  if (!sessionId) {
    navigate('/quizzes');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Session Not Found</h1>
          <p className="text-muted-foreground mb-4">
            This quiz session doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/quizzes')}
            className="text-purple-600 hover:underline"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {phase === "lobby" && (
        <QuizLobby
          sessionId={sessionId}
          isHost={isHost}
          onStart={() => setPhase('playing')}
        />
      )}

      {phase === "playing" && (
        <MultiplayerQuizPlayer
          sessionId={sessionId}
          playerId={playerId}
          isHost={isHost}
          onComplete={() => setPhase('completed')}
        />
      )}

      {phase === "completed" && (
        <QuizLeaderboard
          sessionId={sessionId}
          playerId={playerId}
        />
      )}
    </>
  );
}
