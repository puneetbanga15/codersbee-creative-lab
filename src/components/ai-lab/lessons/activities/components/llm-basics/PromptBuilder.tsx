
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from 'lucide-react';

interface PromptBuilderProps {
  onComplete: () => void;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ onComplete }) => {
  const [role, setRole] = useState('');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [format, setFormat] = useState('');
  const [extras, setExtras] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const generatePrompt = () => {
    let prompt = '';
    
    // Add role if provided
    if (role) {
      prompt += `Act as a ${role} and `;
    }
    
    // Add main request with topic
    if (topic) {
      prompt += `explain about ${topic}`;
    } else {
      return ''; // Topic is required
    }
    
    // Add audience if provided
    if (audience) {
      prompt += ` in a way that ${audience} would understand`;
    }
    
    // Add format if provided
    if (format) {
      prompt += ` using ${format}`;
    }
    
    // Add extras if provided
    if (extras) {
      prompt += `. ${extras}`;
    } else {
      prompt += '.';
    }
    
    return prompt;
  };
  
  const handleCopyPrompt = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };
  
  const promptIsValid = !!topic && (!!role || !!audience || !!format || !!extras);
  const generatedPrompt = generatePrompt();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Build Your Own Prompt</h2>
      
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
        <p className="text-gray-700">
          Use this prompt builder to create effective prompts for AI assistants. 
          Fill in at least the topic and one other field to create your prompt.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="role">Role (Optional)</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Who should the AI act as?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friendly_teacher">Friendly Teacher</SelectItem>
              <SelectItem value="science_expert">Science Expert</SelectItem>
              <SelectItem value="storyteller">Storyteller</SelectItem>
              <SelectItem value="historian">Historian</SelectItem>
              <SelectItem value="game_designer">Game Designer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="topic" className="text-red-500">Topic (Required)</Label>
          <Input 
            id="topic" 
            placeholder="What do you want to learn about?" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-red-200"
          />
        </div>
        
        <div>
          <Label htmlFor="audience">Audience (Optional)</Label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger id="audience">
              <SelectValue placeholder="Who is this explanation for?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seven_year_old">a 7-year-old</SelectItem>
              <SelectItem value="ten_year_old">a 10-year-old</SelectItem>
              <SelectItem value="beginner">a beginner</SelectItem>
              <SelectItem value="complete_novice">someone who knows nothing about the topic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="format">Format (Optional)</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue placeholder="How should the information be structured?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="three_step_guide">a simple 3-step guide</SelectItem>
              <SelectItem value="five_facts">5 interesting facts</SelectItem>
              <SelectItem value="short_story">a short story</SelectItem>
              <SelectItem value="q_and_a">a question and answer format</SelectItem>
              <SelectItem value="examples_analogies">examples and analogies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="extras">Extra Details (Optional)</Label>
          <Textarea 
            id="extras" 
            placeholder="Any other specific instructions? (Add a fun fact, include a quiz at the end, etc.)" 
            value={extras}
            onChange={(e) => setExtras(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Your Generated Prompt:</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyPrompt} 
            disabled={!promptIsValid}
            className="flex items-center gap-1"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        
        <div className="bg-white p-3 rounded-md border border-gray-300 min-h-[80px]">
          {promptIsValid ? (
            <p>{generatedPrompt}</p>
          ) : (
            <p className="text-gray-400 italic">Fill in at least the topic field and one other field to generate a prompt...</p>
          )}
        </div>
      </div>
      
      <Button 
        onClick={handleComplete} 
        disabled={!promptIsValid || isCompleted}
        className="w-full"
      >
        {isCompleted ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Completed!
          </>
        ) : (
          "Mark Complete"
        )}
      </Button>
      
      {isCompleted && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <p className="text-green-700">
            Great job building your own prompt! You can copy this prompt and try it with ChatGPT, Claude, or another AI assistant.
          </p>
        </div>
      )}
    </div>
  );
};
