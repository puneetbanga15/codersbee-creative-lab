import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Zap, Brain, Sparkles, Bot, BookOpen, Users } from 'lucide-react';
import { CollapsibleSection } from '@/components/ai-lab/ui/CollapsibleSection';
import { motion } from 'framer-motion';

export const MeetAIFriendIntro = () => {
  // Emit event when component mounts to indicate we're at the end of the section
  useEffect(() => {
    // Create and dispatch a custom event to notify the parent component
    const event = new CustomEvent('sectionEndReached', { 
      detail: { isAtEnd: true }
    });
    window.dispatchEvent(event);
    
    return () => {
      // Reset when unmounting
      const resetEvent = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false }
      });
      window.dispatchEvent(resetEvent);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">Welcome to "Meet Your AI Friend"!</h2>
        <p className="text-purple-700 mb-4">
          Have you ever wondered how AI chatbots like Siri, Alexa, or ChatGPT work? In this fun lesson, 
          you'll get to create your very own AI friend with a unique personality!
        </p>
        <div className="flex items-center gap-3 text-purple-800">
          <Bot className="h-5 w-5" />
          <p className="font-medium">Estimated time: 30 minutes</p>
        </div>
      </div>

      <CollapsibleSection 
        title="What You'll Learn" 
        icon={<BookOpen className="h-5 w-5" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">AI Communication</h4>
                  <p className="text-sm text-gray-600">Understand how AI chatbots communicate with humans through pattern recognition</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">AI Training</h4>
                  <p className="text-sm text-gray-600">Learn how AI systems are trained to respond in specific ways</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Personality Design</h4>
                  <p className="text-sm text-gray-600">Design unique AI personalities by customizing response patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Creative Problem Solving</h4>
                  <p className="text-sm text-gray-600">Apply creative thinking to develop engaging AI interactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CollapsibleSection>

      <CollapsibleSection 
        title="Meet Your Characters" 
        icon={<Users className="h-5 w-5" />}
        defaultOpen={true}
      >
        <p className="mb-4">
          Choose from these amazing characters to be your AI friend! Each one has their own unique personality and way of thinking:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-b from-red-50 to-amber-50 p-4 rounded-lg border border-red-100 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-500">HP</span>
            </div>
            <h4 className="text-center font-medium mb-1">Harry Potter</h4>
            <p className="text-center text-sm text-gray-600">The brave young wizard</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-b from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-500">AE</span>
            </div>
            <h4 className="text-center font-medium mb-1">Albert Einstein</h4>
            <p className="text-center text-sm text-gray-600">The brilliant scientist</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-b from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-500">K</span>
            </div>
            <h4 className="text-center font-medium mb-1">Krishna</h4>
            <p className="text-center text-sm text-gray-600">The divine guide</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-b from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-600">WS</span>
            </div>
            <h4 className="text-center font-medium mb-1">Shakespeare</h4>
            <p className="text-center text-sm text-gray-600">The poetic playwright</p>
          </motion.div>
        </div>
      </CollapsibleSection>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">What You'll Create</h3>
        <p className="mb-4">
          By the end of this lesson, you'll have:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 text-blue-700">
          <li>Created your own AI friend with a unique personality</li>
          <li>Learned how to train an AI to respond in different ways</li>
          <li>Understood the basics of how AI chatbots work</li>
          <li>Completed a fun quiz to test your knowledge</li>
        </ul>
      </div>

      <div className="mt-6 bg-yellow-50 p-5 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-lg mb-2 text-yellow-800">For Parents & Teachers</h3>
        <p className="text-yellow-700 mb-3">
          This lesson introduces children to the concept of artificial intelligence in a fun, accessible way.
          Students will learn about pattern recognition, basic training concepts, and how AI personalities
          can be customized - all important concepts in understanding modern technology.
        </p>
        <p className="text-yellow-700">
          The drag-and-drop interface makes learning engaging, while the quiz at the end helps reinforce key concepts.
          Consider discussing with your child how AI is used in their everyday life after completing this lesson.
        </p>
      </div>
    </div>
  );
};
