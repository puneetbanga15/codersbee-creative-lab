import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Wand, Brain, Check, Send } from 'lucide-react';
import { CollapsibleSection } from '../../ui/CollapsibleSection';
import { Input } from "@/components/ui/input";
import { PromptPractice } from './components/llm-basics/PromptPractice';
import { PromptComparison } from './components/llm-basics/PromptComparison';
import { PromptBuilder } from './components/llm-basics/PromptBuilder';
import { motion, AnimatePresence } from 'framer-motion';

export const LLMBasicsActivityWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState("prompt-practice");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const markComplete = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', message: prompt }]);
    setPrompt("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: "Hi! I'm your AI friend. I'm here to help you learn about AI and prompt engineering. Try asking me something specific about AI or how to write better prompts!" 
      }]);
      setIsTyping(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
        <h1 className="text-2xl font-bold text-purple-900 mb-3">
          Prompt Engineering Practice
        </h1>
        <p className="text-purple-700 mb-4">
          Now it's time to practice what you've learned about large language models and 
          prompt engineering. Let's try creating and improving prompts!
        </p>
        
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <AlertDescription className="text-blue-800">
            The activities below will help you learn how to create effective prompts 
            for AI systems like ChatGPT, Claude, and other large language models.
          </AlertDescription>
        </Alert>
      </div>

      <CollapsibleSection
        title="Try Chatting with AI"
        icon={<MessageSquare className="h-5 w-5" />}
        defaultOpen={true}
      >
        <div className="bg-white rounded-lg p-4">
          <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
            <AnimatePresence>
              {chatHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-purple-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.message}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <form onSubmit={handlePromptSubmit} className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="flex-1"
            />
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Practice Activities"
        icon={<Brain className="h-5 w-5" />}
        defaultOpen={true}
      >
        <div className="bg-white rounded-lg">
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
      </CollapsibleSection>

      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
        <div className="text-sm text-blue-600">
          {completedSections.length} of 3 activities completed
        </div>
        {completedSections.length === 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full flex items-center"
          >
            <Check className="h-4 w-4 mr-2" /> All activities completed!
          </motion.div>
        )}
      </div>
    </div>
  );
};
