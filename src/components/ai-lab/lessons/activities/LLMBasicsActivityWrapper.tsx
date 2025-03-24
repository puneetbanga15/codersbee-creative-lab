
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Wand, Brain, Check } from 'lucide-react';
import { PromptPractice } from './components/llm-basics/PromptPractice';
import { PromptComparison } from './components/llm-basics/PromptComparison';
import { PromptBuilder } from './components/llm-basics/PromptBuilder';

export const LLMBasicsActivityWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState("prompt-practice");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  
  const markComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
        <h1 className="text-2xl font-bold text-purple-900 mb-3">
          Prompt Engineering Practice
        </h1>
        <p className="text-gray-700 mb-4">
          Now it's time to practice what you've learned about large language models and 
          prompt engineering. Let's try creating and improving prompts!
        </p>
        
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <AlertDescription className="text-blue-800">
            The activities below will help you learn how to create effective prompts 
            for AI systems like ChatGPT, Claude, and other large language models.
          </AlertDescription>
        </Alert>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {completedSections.length} of 3 activities completed
          </div>
          {completedSections.length === 3 && (
            <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center">
              <Check className="h-4 w-4 mr-1" /> All activities completed!
            </div>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prompt-practice" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Prompt Practice</span>
            {completedSections.includes("prompt-practice") && (
              <Check className="h-4 w-4 ml-1 text-green-600" />
            )}
          </TabsTrigger>
          <TabsTrigger value="prompt-comparison" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Compare Prompts</span>
            {completedSections.includes("prompt-comparison") && (
              <Check className="h-4 w-4 ml-1 text-green-600" />
            )}
          </TabsTrigger>
          <TabsTrigger value="prompt-builder" className="flex items-center gap-2">
            <Wand className="h-4 w-4" />
            <span>Prompt Builder</span>
            {completedSections.includes("prompt-builder") && (
              <Check className="h-4 w-4 ml-1 text-green-600" />
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt-practice" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <PromptPractice onComplete={() => markComplete("prompt-practice")} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt-comparison" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <PromptComparison onComplete={() => markComplete("prompt-comparison")} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt-builder" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <PromptBuilder onComplete={() => markComplete("prompt-builder")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
