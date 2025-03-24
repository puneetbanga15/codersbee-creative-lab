
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, ThumbsUp, Send } from 'lucide-react';

interface PromptPracticeProps {
  onComplete: () => void;
}

export const PromptPractice: React.FC<PromptPracticeProps> = ({ onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const topics = [
    "dinosaurs",
    "space exploration",
    "ocean animals",
    "robots",
    "weather",
    "rainforests"
  ];
  
  const [selectedTopic] = useState(topics[Math.floor(Math.random() * topics.length)]);
  
  const analyzePrompt = () => {
    if (prompt.trim().length < 10) {
      setFeedback("Your prompt is too short. Try to be more specific about what you want to learn.");
      return;
    }
    
    let score = 0;
    let feedbackPoints: string[] = [];
    
    // Check for specificity
    if (prompt.length > 50) {
      score += 1;
    } else {
      feedbackPoints.push("Add more details to make your prompt more specific.");
    }
    
    // Check if it contains the topic
    if (prompt.toLowerCase().includes(selectedTopic.toLowerCase())) {
      score += 1;
    } else {
      feedbackPoints.push(`Make sure your prompt is about ${selectedTopic}.`);
    }
    
    // Check for question structure
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'can you', 'could you'];
    if (questionWords.some(word => prompt.toLowerCase().includes(word))) {
      score += 1;
    } else {
      feedbackPoints.push("Try phrasing your prompt as a clear question or request.");
    }
    
    // Check for audience specification
    const ageTerms = ['kid', 'child', 'year old', 'grade', 'age', 'young', 'simple', 'easy', 'beginner'];
    if (ageTerms.some(term => prompt.toLowerCase().includes(term))) {
      score += 2;
    } else {
      feedbackPoints.push("Consider specifying who the information is for (like 'explain to a 10-year-old').");
    }
    
    // Check for format requests
    const formatTerms = ['list', 'steps', 'example', 'story', 'points', 'facts', 'guide'];
    if (formatTerms.some(term => prompt.toLowerCase().includes(term))) {
      score += 2;
    } else {
      feedbackPoints.push("Try specifying the format you want (like a list, steps, or examples).");
    }
    
    // Provide feedback based on score
    if (score >= 5) {
      setFeedback("Excellent prompt! You've been very specific, included the topic, asked a clear question, specified the audience, and requested a specific format.");
      setIsCompleted(true);
      onComplete();
    } else if (score >= 3) {
      setFeedback(`Good start! Here's how you could improve: ${feedbackPoints.join(' ')}`);
    } else {
      setFeedback(`This prompt needs some work. Here's how to improve: ${feedbackPoints.join(' ')}`);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Create a Prompt</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
        <h3 className="font-medium text-blue-800 mb-2">Your Challenge:</h3>
        <p className="text-gray-700">
          Create a prompt about <span className="font-bold">{selectedTopic}</span> that would help 
          you learn something interesting. Make it specific and clear for an AI to understand exactly 
          what you want to know.
        </p>
      </div>
      
      <div className="space-y-3">
        <label htmlFor="prompt" className="block font-medium">
          Your Prompt:
        </label>
        <Textarea
          id="prompt"
          placeholder={`Type your prompt about ${selectedTopic} here...`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
      
      <Button 
        onClick={analyzePrompt} 
        className="w-full"
        disabled={prompt.trim().length === 0 || isCompleted}
      >
        <Send className="mr-2 h-4 w-4" />
        Submit Prompt for Feedback
      </Button>
      
      {feedback && (
        <div className={`p-4 rounded-lg ${isCompleted ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <h3 className={`font-medium flex items-center ${isCompleted ? 'text-green-800' : 'text-amber-800'}`}>
            {isCompleted ? (
              <>
                <ThumbsUp className="mr-2 h-5 w-5" />
                Prompt Analysis
              </>
            ) : (
              <>
                Prompt Feedback
              </>
            )}
          </h3>
          <p className={`mt-2 ${isCompleted ? 'text-green-700' : 'text-amber-700'}`}>
            {feedback}
          </p>
          
          {isCompleted && (
            <div className="mt-4 flex items-center justify-center">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center">
                <Check className="mr-2 h-5 w-5" /> Activity Completed!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
