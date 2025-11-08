import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, Play, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuizSession } from "@/hooks/useQuizSession";

interface QuizLobbyProps {
  sessionId: string;
  isHost: boolean;
  onStart: () => void;
}

export const QuizLobby = ({ sessionId, isHost, onStart }: QuizLobbyProps) => {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    session,
    players,
    questions,
    isLoading,
    joinSession,
    startSession,
    trackPresence,
  } = useQuizSession(sessionId);

  const handleJoinSession = async () => {
    if (!studentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to join",
        variant: "destructive",
      });
      return;
    }

    try {
      const player = await joinSession({ studentName: studentName.trim() });
      setCurrentPlayerId(player.id);
      setHasJoined(true);

      // Track presence in realtime
      await trackPresence(player.id, studentName.trim());

      toast({
        title: "Joined Successfully!",
        description: "Waiting for the quiz to start...",
      });
    } catch (error) {
      console.error("Error joining session:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join session",
        variant: "destructive",
      });
    }
  };

  const handleStartQuiz = async () => {
    if (!players || players.length === 0) {
      toast({
        title: "No Players",
        description: "Wait for at least one player to join",
        variant: "destructive",
      });
      return;
    }

    try {
      await startSession();
      onStart();
    } catch (error) {
      console.error("Error starting session:", error);
      toast({
        title: "Error",
        description: "Failed to start session",
        variant: "destructive",
      });
    }
  };

  const copyRoomCode = () => {
    if (session?.room_code) {
      navigator.clipboard.writeText(session.room_code);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Room code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    // Auto-start for host when session status changes
    if (session?.status === 'active' && isHost) {
      onStart();
    }
  }, [session?.status, isHost, onStart]);

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
        <p className="text-muted-foreground">Session not found</p>
      </div>
    );
  }

  const isFull = (players?.length || 0) >= session.max_players;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Quiz Lobby</CardTitle>
          <CardDescription>
            {isHost ? "Share the room code with players" : "Enter your name to join"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Room Code */}
          <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Room Code</p>
              <div className="flex items-center gap-2">
                <p className="text-4xl font-bold tracking-widest text-purple-600">
                  {session.room_code}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyRoomCode}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-accent/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Questions</p>
              <p className="text-lg font-semibold">{questions?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time per Question</p>
              <p className="text-lg font-semibold">{session.time_per_question}s</p>
            </div>
          </div>

          {/* Join Form (for non-host players) */}
          {!isHost && !hasJoined && !isFull && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Your Name</Label>
                <Input
                  id="student-name"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinSession()}
                />
              </div>
              <Button
                onClick={handleJoinSession}
                className="w-full"
                size="lg"
              >
                Join Quiz
              </Button>
            </div>
          )}

          {/* Full Message */}
          {!isHost && !hasJoined && isFull && (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 font-medium">
                This quiz session is full ({session.max_players} players max)
              </p>
            </div>
          )}

          {/* Players List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players ({players?.length || 0}/{session.max_players})
              </h3>
              <Badge variant="secondary">{session.status}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {players && players.length > 0 ? (
                players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-2 p-3 bg-accent/30 rounded-lg"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{player.student_name}</span>
                    {player.id === currentPlayerId && (
                      <Badge variant="outline" className="ml-auto">You</Badge>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground col-span-2 text-center py-8">
                  No players yet. Waiting for players to join...
                </p>
              )}
            </div>
          </div>

          {/* Start Button (host only) */}
          {isHost && (
            <Button
              onClick={handleStartQuiz}
              className="w-full"
              size="lg"
              disabled={!players || players.length === 0}
            >
              <Play className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          )}

          {/* Waiting Message (for players who joined) */}
          {!isHost && hasJoined && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-blue-800 font-medium">
                Waiting for host to start the quiz...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
