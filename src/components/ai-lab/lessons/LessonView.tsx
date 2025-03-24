import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Rocket, Info, Code, Play, CheckCircle, ArrowRight, Book } from 'lucide-react';
import { curriculumData } from './curriculumData';

// Import lesson-specific components
import { MeetAIFriendIntro } from './introductions/MeetAIFriendIntro';
import { MeetAIFriendTutorial } from './tutorials/MeetAIFriendTutorial';
import { MeetAIFriendActivityWrapper } from './activities/MeetAIFriendActivityWrapper';
import { MeetAIFriendCode } from './code-samples/MeetAIFriendCode';

// Import LLM Basics lesson components
import { LLMBasicsIntro } from './introductions/LLMBasicsIntro';
import { LLMBasicsTutorial } from './tutorials/LLMBasicsTutorial';
import { LLMBasicsActivityWrapper } from './activities/LLMBasicsActivityWrapper';
import { LLMBasicsCode } from './code-samples/LLMBasicsCode';

type LessonViewProps = {
  lessonId: string;
  onBack: () => void;
};

export const LessonView = ({ lessonId, onBack }: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState('introduction');
  const lesson = curriculumData.find(l => l.id === lessonId);
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the lesson you're looking for.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lessons
        </Button>
      </div>
    );
  }
  
  const renderLessonContent = (tab: string) => {
    if (lessonId === 'meet-ai-friend') {
      switch (tab) {
        case 'introduction':
          return <MeetAIFriendIntro />;
        case 'tutorial':
          return <MeetAIFriendTutorial />;
        case 'activity':
          return <MeetAIFriendActivityWrapper />;
        case 'code':
          return <MeetAIFriendCode />;
        default:
          return <div>Content not available</div>;
      }
    } 
    else if (lessonId === 'llm-basics') {
      switch (tab) {
        case 'introduction':
          return <LLMBasicsIntro />;
        case 'tutorial':
          return <LLMBasicsTutorial />;
        case 'activity':
          return <LLMBasicsActivityWrapper />;
        case 'code':
          return <LLMBasicsCode />;
        default:
          return <div>Content not available</div>;
      }
    }
    else {
      switch (tab) {
        case 'introduction':
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4">Welcome to {lesson.title}!</h2>
              <p className="mb-4">
                In this lesson, you'll learn about {lesson.concepts.join(', ')}. 
                This activity will take approximately {lesson.duration} minutes to complete.
              </p>
              
              <h3 className="text-lg font-medium mt-6 mb-3">What You'll Learn</h3>
              <ul className="list-disc pl-5 space-y-2">
                {lesson.concepts.map((concept, index) => (
                  <li key={index} className="text-gray-700">{concept}</li>
                ))}
              </ul>
            </div>
          );
        case 'tutorial':
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4">Tutorial: {lesson.title}</h2>
              <p className="text-gray-700 mb-6">
                This tutorial will guide you through the key concepts and steps for this lesson.
              </p>
              
              <div className="space-y-6">
                <p>Tutorial content will be implemented based on the specific lesson.</p>
                <p>For now, this is a placeholder that would contain:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Step-by-step instructions</li>
                  <li>Visual explanations of concepts</li>
                  <li>Interactive examples</li>
                </ul>
              </div>
            </div>
          );
        case 'activity':
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4">Activity: {lesson.title}</h2>
              <p className="text-gray-700 mb-6">
                Now it's your turn to experiment and practice what you've learned!
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <p className="text-center text-gray-600 mb-4">Activity interface would appear here</p>
                <p className="text-center text-sm text-gray-500">
                  (This is a placeholder for the interactive activity that would be implemented 
                  specifically for this lesson)
                </p>
              </div>
            </div>
          );
        case 'code':
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4">Behind the Scenes: The Code</h2>
              <p className="text-gray-700 mb-6">
                Let's take a look at the code that makes this AI activity work!
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`// This is sample code that would be specific to each lesson
// For example, for the chatbot lesson:

function createChatbot(responses) {
  return {
    respond: function(message) {
      // Simple keyword matching
      for (const [keyword, response] of Object.entries(responses)) {
        if (message.toLowerCase().includes(keyword)) {
          return response;
        }
      }
      return responses.default;
    }
  };
}

// Create a chatbot with some responses
const myBot = createChatbot({
  "hello": "Hi there! How can I help you today?",
  "name": "I'm Buzzy, your AI assistant!",
  "weather": "I'm not connected to weather data, but I hope it's nice outside!",
  "default": "I'm not sure how to respond to that. Can you try asking something else?"
});

// Example usage
console.log(myBot.respond("Hello there!")); // "Hi there! How can I help you today?"
console.log(myBot.respond("What's your name?")); // "I'm Buzzy, your AI assistant!"
`}</pre>
              </div>
            </div>
          );
        default:
          return <div>Content not available</div>;
      }
    }
  };
  
  const findNextLesson = () => {
    const currentIndex = curriculumData.findIndex(l => l.id === lessonId);
    if (currentIndex === -1 || currentIndex === curriculumData.length - 1) {
      return null; // No next lesson
    }
    return curriculumData[currentIndex + 1];
  };
  
  const nextLesson = findNextLesson();
  
  const handleGoToNextLesson = () => {
    if (nextLesson) {
      onBack();
      setTimeout(() => {
        const nextLessonElement = document.querySelector(`[data-lesson-id="${nextLesson.id}"]`);
        if (nextLessonElement) {
          nextLessonElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      }, 100);
    }
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Badge className={`${getStageBgClass(lesson.stage)} mr-2`}>
          {getStageLabel(lesson.stage)}
        </Badge>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="introduction" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Introduction</span>
              </TabsTrigger>
              <TabsTrigger value="tutorial" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Tutorial</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="introduction" className="p-4 bg-white rounded-md shadow-sm mt-4">
              {renderLessonContent('introduction')}
              
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setActiveTab('tutorial')} className="flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorial" className="p-4 bg-white rounded-md shadow-sm mt-4">
              {renderLessonContent('tutorial')}
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('introduction')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setActiveTab('activity')} className="flex items-center gap-2">
                  Try it Yourself
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="p-4 bg-white rounded-md shadow-sm mt-4">
              {renderLessonContent('activity')}
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('tutorial')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tutorial
                </Button>
                <Button onClick={() => setActiveTab('code')} className="flex items-center gap-2">
                  See the Code
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="p-4 bg-white rounded-md shadow-sm mt-4">
              {renderLessonContent('code')}
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('activity')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Activity
                </Button>
                
                {nextLesson ? (
                  <Button 
                    className="bg-purple-500 hover:bg-purple-600" 
                    onClick={handleGoToNextLesson}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Next Lesson: {nextLesson.title}
                  </Button>
                ) : (
                  <Button className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Lesson
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Lesson Info</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Difficulty</p>
                  <Badge className={`${getStageBgClass(lesson.stage)}`}>
                    {getStageDifficulty(lesson.stage)}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
                  <p className="text-gray-700">{lesson.duration} minutes</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Key Concepts</p>
                  <div className="flex flex-wrap gap-1">
                    {lesson.concepts.map((concept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-purple-500" />
                    Tips for Success
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Take your time to understand each concept</li>
                    <li>• Try the activity multiple times with different inputs</li>
                    <li>• Don't be afraid to experiment and make mistakes</li>
                    <li>• Ask your teacher if you need help understanding</li>
                  </ul>
                </div>
                
                {nextLesson && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-2">Up Next:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <Badge className={`${getStageBgClass(nextLesson.stage)} mb-2`}>
                        Lesson {nextLesson.number}
                      </Badge>
                      <p className="font-medium">{nextLesson.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{nextLesson.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function getStageLabel(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Foundation';
    case 'application':
      return 'Application';
    case 'understanding':
      return 'Understanding';
    case 'advanced':
      return 'Advanced';
    default:
      return 'Unknown';
  }
}

function getStageBgClass(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'bg-blue-500';
    case 'application':
      return 'bg-green-500';
    case 'understanding':
      return 'bg-purple-500';
    case 'advanced':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}

function getStageDifficulty(stage: string): string {
  switch (stage) {
    case 'foundation':
      return 'Beginner';
    case 'application':
      return 'Intermediate';
    case 'understanding':
      return 'Advanced';
    case 'advanced':
      return 'Expert';
    default:
      return 'Unknown';
  }
}
