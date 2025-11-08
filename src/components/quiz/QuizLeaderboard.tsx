import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Home } from "lucide-react";
import { useQuizSession } from "@/hooks/useQuizSession";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface QuizLeaderboardProps {
  sessionId: string;
  playerId: string | null;
}

export const QuizLeaderboard = ({ sessionId, playerId }: QuizLeaderboardProps) => {
  const navigate = useNavigate();
  const { players, session, questions } = useQuizSession(sessionId);

  useEffect(() => {
    // Fire confetti when leaderboard loads
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-orange-600" />;
      default:
        return <Award className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">1st Place</Badge>;
      case 2:
        return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500 text-white">2nd Place</Badge>;
      case 3:
        return <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">3rd Place</Badge>;
      default:
        return null;
    }
  };

  const totalQuestions = questions?.length || 0;
  const currentPlayer = players?.find(p => p.id === playerId);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          <CardDescription>
            Here's how everyone performed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Player's Score (if participant) */}
          {currentPlayer && (
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
              <p className="text-sm text-muted-foreground mb-1">Your Score</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-purple-600">{currentPlayer.score} points</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentPlayer.answers_correct} correct out of {totalQuestions} questions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">
                    {totalQuestions > 0 ? Math.round((currentPlayer.answers_correct / totalQuestions) * 100) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Final Rankings</h3>
            <div className="space-y-3">
              {players && players.length > 0 ? (
                players.map((player, index) => {
                  const rank = index + 1;
                  const isCurrentPlayer = player.id === playerId;
                  const accuracy = totalQuestions > 0 ? Math.round((player.answers_correct / totalQuestions) * 100) : 0;

                  return (
                    <div
                      key={player.id}
                      className={`
                        flex items-center gap-4 p-4 rounded-lg border-2 transition-all
                        ${rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' : 'bg-accent/30 border-transparent'}
                        ${isCurrentPlayer ? 'ring-2 ring-purple-500' : ''}
                      `}
                    >
                      {/* Rank Icon */}
                      <div className="flex-shrink-0">
                        {getRankIcon(rank)}
                      </div>

                      {/* Player Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-lg">{player.student_name}</p>
                          {isCurrentPlayer && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                          {getRankBadge(rank)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{player.answers_correct}/{totalQuestions} correct</span>
                          <span>•</span>
                          <span>{accuracy}% accuracy</span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">{player.score}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No players found
                </p>
              )}
            </div>
          </div>

          {/* Quiz Statistics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold">{players?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total Players</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/quizzes')}
              variant="outline"
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Button>
            <Button
              onClick={() => navigate('/teachers/dashboard')}
              className="flex-1"
            >
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
