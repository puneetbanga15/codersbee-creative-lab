import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, Trash2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const GeneratedQuizzesList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: topics, isLoading } = useQuery({
    queryKey: ['quiz-topics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('quiz_topics')
        .select(`
          *,
          quizzes:generated_quiz_id (
            id,
            title,
            difficulty,
            quiz_type
          )
        `)
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async (quizId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Generate unique room code using database function
      const { data: roomCodeData, error: roomCodeError } = await supabase
        .rpc('generate_room_code');

      if (roomCodeError) throw roomCodeError;

      // Create session
      const { data: session, error: sessionError } = await supabase
        .from('quiz_sessions')
        .insert({
          quiz_id: quizId,
          host_id: user.id,
          room_code: roomCodeData,
          max_players: 10,
          time_per_question: 30,
          status: 'waiting'
        })
        .select()
        .single();

      if (sessionError) throw sessionError;
      return session;
    },
    onSuccess: (session) => {
      toast({
        title: "Quiz Session Created!",
        description: `Room Code: ${session.room_code}`,
      });
      // Navigate to session lobby
      navigate(`/quiz-session/${session.id}`);
    },
    onError: (error) => {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create session",
        variant: "destructive",
      });
    },
  });

  const deleteTopicMutation = useMutation({
    mutationFn: async (topicId: string) => {
      const { error } = await supabase
        .from('quiz_topics')
        .delete()
        .eq('id', topicId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Topic Deleted",
        description: "Quiz topic has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ['quiz-topics'] });
    },
    onError: (error) => {
      console.error("Error deleting topic:", error);
      toast({
        title: "Error",
        description: "Failed to delete topic",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'generating':
        return <Badge className="bg-blue-500"><Loader2 className="h-3 w-3 mr-1 animate-spin" />Generating</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No quizzes generated yet. Create your first AI-powered quiz above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Generated Quizzes</CardTitle>
        <CardDescription>
          Manage and start multiplayer sessions for your AI-generated quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{topic.title}</h3>
                  {getStatusBadge(topic.generation_status || 'pending')}
                  <Badge variant="outline" className="capitalize">
                    {topic.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {topic.quiz_type}
                  </Badge>
                </div>
                {topic.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {topic.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {topic.num_questions} questions • Created {new Date(topic.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {topic.generation_status === 'completed' && topic.generated_quiz_id && (
                  <Button
                    onClick={() => createSessionMutation.mutate(topic.generated_quiz_id)}
                    disabled={createSessionMutation.isPending}
                    size="sm"
                  >
                    {createSessionMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Session
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTopicMutation.mutate(topic.id)}
                  disabled={deleteTopicMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
