import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type QuizType = "scratch" | "python" | "ai" | "web" | "cloud";
type QuizDifficulty = "easy" | "intermediate" | "complex";

export const TopicUploadForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [quizType, setQuizType] = useState<QuizType>("scratch");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("intermediate");
  const [numQuestions, setNumQuestions] = useState(10);

  const createTopicMutation = useMutation({
    mutationFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Insert topic
      const { data: topic, error: topicError } = await supabase
        .from("quiz_topics")
        .insert({
          title,
          description,
          content,
          quiz_type: quizType,
          difficulty,
          num_questions: numQuestions,
          created_by: user.id,
          generation_status: "pending"
        })
        .select()
        .single();

      if (topicError) throw topicError;

      // Call Edge Function to generate quiz
      const { data, error } = await supabase.functions.invoke('generate-quiz-from-topic', {
        body: {
          topicId: topic.id,
          title: topic.title,
          description: topic.description,
          content: topic.content,
          quizType: topic.quiz_type,
          difficulty: topic.difficulty,
          numQuestions: topic.num_questions
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Quiz Generated Successfully!",
        description: `${data.questionsCount} questions have been created for your quiz.`,
      });
      queryClient.invalidateQueries({ queryKey: ['quiz-topics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });

      // Reset form
      setTitle("");
      setDescription("");
      setContent("");
      setNumQuestions(10);
    },
    onError: (error) => {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate quiz",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    if (numQuestions < 5 || numQuestions > 20) {
      toast({
        title: "Validation Error",
        description: "Number of questions must be between 5 and 20",
        variant: "destructive",
      });
      return;
    }

    createTopicMutation.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Quiz Generator
        </CardTitle>
        <CardDescription>
          Upload a topic and let AI generate an engaging quiz for your students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Introduction to Photosynthesis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={createTopicMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Brief description of the quiz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createTopicMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Topic Content *</Label>
            <Textarea
              id="content"
              placeholder="Paste your topic content here. The AI will use this to generate relevant quiz questions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={createTopicMutation.isPending}
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Tip: More detailed content will result in better quiz questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-type">Quiz Type</Label>
              <Select
                value={quizType}
                onValueChange={(value) => setQuizType(value as QuizType)}
                disabled={createTopicMutation.isPending}
              >
                <SelectTrigger id="quiz-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scratch">Scratch</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="cloud">Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as QuizDifficulty)}
                disabled={createTopicMutation.isPending}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="num-questions">Number of Questions</Label>
              <Input
                id="num-questions"
                type="number"
                min={5}
                max={20}
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                disabled={createTopicMutation.isPending}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createTopicMutation.isPending}
          >
            {createTopicMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Quiz with AI
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
