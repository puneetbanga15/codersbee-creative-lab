
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Brain, MessageSquare, Lightbulb, Shield } from 'lucide-react';

export const LLMBasicsTutorial: React.FC = () => {
  const [activeTab, setActiveTab] = useState("how-llms-work");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="how-llms-work" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>How LLMs Work</span>
          </TabsTrigger>
          <TabsTrigger value="prompt-engineering" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Prompt Engineering</span>
          </TabsTrigger>
          <TabsTrigger value="example-prompts" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Example Prompts</span>
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>AI Tools & Safety</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="how-llms-work" className="mt-4">
          <HowLLMsWorkSlides />
        </TabsContent>
        
        <TabsContent value="prompt-engineering" className="mt-4">
          <PromptEngineeringSlides />
        </TabsContent>
        
        <TabsContent value="example-prompts" className="mt-4">
          <ExamplePromptsSlides />
        </TabsContent>
        
        <TabsContent value="ai-tools" className="mt-4">
          <AIToolsSlides />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Slide component for How LLMs Work section
const HowLLMsWorkSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "How Are Large Language Models Trained?",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-2">Step 1: Gathering Data</h3>
            <p className="text-gray-700">
              LLMs need LOTS of examples to learn from. Researchers collect billions of 
              texts from websites, books, articles, code, and other sources.
            </p>
            <div className="mt-3 bg-white p-3 rounded-md">
              <p className="text-sm italic text-gray-600">
                Imagine if you had to read millions of books to learn a language instead of 
                just learning from your parents and teachers!
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 2: Training</h3>
            <p className="text-gray-700">Coming up in the next slide...</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 3: Prediction</h3>
            <p className="text-gray-700">Coming up in the next slide...</p>
          </div>
        </div>
      )
    },
    {
      title: "How Are Large Language Models Trained?",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 1: Gathering Data</h3>
            <p className="text-gray-700">Covered in previous slide...</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-2">Step 2: Training</h3>
            <p className="text-gray-700">
              The AI is shown pieces of text with some words hidden. It has to predict what 
              the missing words should be. It learns by seeing if its guesses are right or wrong, 
              and gradually gets better at predicting.
            </p>
            <div className="mt-3 bg-white p-3 rounded-md">
              <p className="text-sm italic text-gray-600">
                For example: "I need to wear a ___ when it's raining outside."
                <br />
                The AI learns that "raincoat" or "umbrella" are good predictions here.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 3: Prediction</h3>
            <p className="text-gray-700">Coming up in the next slide...</p>
          </div>
        </div>
      )
    },
    {
      title: "How Are Large Language Models Trained?",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 1: Gathering Data</h3>
            <p className="text-gray-700">Covered in previous slide...</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-50">
            <h3 className="font-medium text-gray-800 mb-2">Step 2: Training</h3>
            <p className="text-gray-700">Covered in previous slide...</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-2">Step 3: Prediction</h3>
            <p className="text-gray-700">
              After training, when you give the LLM a prompt, it uses everything it learned to 
              predict what would make sense to come next. It doesn't just remember exact phrases - 
              it learned patterns about language and knowledge about the world.
            </p>
            <div className="mt-3 bg-white p-3 rounded-md">
              <p className="text-sm italic text-gray-600">
                This is different from your AI friend in Lesson 1, which only knew the exact 
                responses you taught it. An LLM can answer questions it's never seen before!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "LLMs: Pattern Recognition Machines",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <p className="text-gray-700">
              LLMs learn patterns from text, much like how you might notice patterns in music, 
              stories, or games. After seeing many examples, they can:
            </p>
            
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-600 p-1 rounded mt-1">✓</span>
                <span>Predict what words make sense in different contexts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-600 p-1 rounded mt-1">✓</span>
                <span>Understand the connections between different concepts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-600 p-1 rounded mt-1">✓</span>
                <span>Recognize the style and tone of different types of writing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-600 p-1 rounded mt-1">✓</span>
                <span>Apply knowledge from one topic to answer questions about another</span>
              </li>
            </ul>
            
            <div className="mt-4 p-3 bg-white rounded-md">
              <p className="text-sm text-gray-600">
                This is why LLMs can be so versatile - they weren't just programmed with specific 
                answers, they learned how language works!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>
        
        <div className="min-h-[300px]">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Slide component for Prompt Engineering section
const PromptEngineeringSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "What is Prompt Engineering?",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-5 rounded-lg border border-green-100">
            <p className="text-gray-700">
              Prompt engineering is the skill of creating effective instructions for AI systems. 
              It's like learning how to ask good questions or give clear directions!
            </p>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-red-600 mb-1">Bad Prompt:</h4>
                <p className="text-sm text-gray-700">"Make something"</p>
                <p className="mt-2 text-xs text-gray-500 italic">Too vague! The AI doesn't know what you want.</p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-green-600 mb-1">Good Prompt:</h4>
                <p className="text-sm text-gray-700">"Write a short poem about space exploration that rhymes and is suitable for 10-year-olds."</p>
                <p className="mt-2 text-xs text-gray-500 italic">Clear and specific instructions!</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Elements of Good Prompts",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Be Specific</h3>
              <p className="text-gray-700 text-sm">
                Include details about what you want: format, length, style, audience, and purpose.
              </p>
              <div className="mt-2 p-2 bg-white rounded-md">
                <p className="text-xs text-gray-600 italic">
                  "Explain photosynthesis" vs. "Explain photosynthesis in 3 simple steps that a 
                  9-year-old would understand, with a fun fact at the end."
                </p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">Use Clear Structure</h3>
              <p className="text-gray-700 text-sm">
                Break down complex requests into steps or numbered points.
              </p>
              <div className="mt-2 p-2 bg-white rounded-md">
                <p className="text-xs text-gray-600 italic">
                  "I need help with my science project. 1) First, explain what makes a good 
                  experiment. 2) Then, give me 3 ideas about plant growth."
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2">Provide Examples</h3>
              <p className="text-gray-700 text-sm">
                Show the AI what kind of response you're looking for.
              </p>
              <div className="mt-2 p-2 bg-white rounded-md">
                <p className="text-xs text-gray-600 italic">
                  "Give me 5 science facts. For example: 'Water expands when it freezes, 
                  which is why ice floats in water.'"
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Set the Role</h3>
              <p className="text-gray-700 text-sm">
                Tell the AI who you want it to be when answering.
              </p>
              <div className="mt-2 p-2 bg-white rounded-md">
                <p className="text-xs text-gray-600 italic">
                  "Act as a friendly space explorer and explain what planets are."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Prompt Formula",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-3">A Simple Formula for Effective Prompts:</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">1. Role (Optional)</h4>
                <p className="text-sm text-gray-700">
                  "Act as a friendly science teacher..."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">2. Task</h4>
                <p className="text-sm text-gray-700">
                  "...explain how rainbows form..."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">3. Format & Details</h4>
                <p className="text-sm text-gray-700">
                  "...in a step-by-step guide with 4 steps and include a fun experiment kids can do at home to create their own rainbow."
                </p>
              </div>
              
              <div className="bg-purple-100 p-3 rounded-md">
                <h4 className="font-medium text-purple-800">Complete Prompt:</h4>
                <p className="text-sm text-gray-700">
                  "Act as a friendly science teacher and explain how rainbows form in a step-by-step guide with 4 steps and include a fun experiment kids can do at home to create their own rainbow."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>
        
        <div className="min-h-[300px]">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Slide component for Example Prompts section
const ExamplePromptsSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Kid-Friendly Prompt Examples",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-3">For School Projects:</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700">Research Helper</h4>
                <p className="text-sm text-gray-700">
                  "I'm doing a school project about tigers. Can you give me 5 interesting facts about tigers that most kids don't know? Make them easy to understand for a 4th grader."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700">Essay Planner</h4>
                <p className="text-sm text-gray-700">
                  "I need to write a one-page essay about recycling. Can you help me create an outline with an introduction, 3 main points, and a conclusion? Each point should include one fact about why recycling is important."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700">Presentation Ideas</h4>
                <p className="text-sm text-gray-700">
                  "I'm making a presentation about space for my science class. What are 3 visual demonstrations or experiments I could include to make it more interesting? They need to be safe and easy to do in a classroom."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Kid-Friendly Prompt Examples",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-3">For Creative Writing:</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">Story Starter</h4>
                <p className="text-sm text-gray-700">
                  "I want to write a short story about a kid who discovers a magical creature in their backyard. Can you help me create a character profile for my main character and the magical creature? Include what they look like, their personality, and one special ability each."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">Poetry Helper</h4>
                <p className="text-sm text-gray-700">
                  "I'm learning about haiku poems. Can you explain what makes a haiku special, then give me 3 examples of haikus about nature? After that, help me create my own haiku about the ocean."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-purple-700">Comic Book Ideas</h4>
                <p className="text-sm text-gray-700">
                  "I want to make a comic book about a superhero who helps protect the environment. Can you help me create:
                  1. A name for my superhero
                  2. Their superpower (related to nature)
                  3. A villain they might fight
                  4. A short plot for their first adventure"
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Kid-Friendly Prompt Examples",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-3">For Learning & Fun:</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-amber-700">Explain Like I'm 10</h4>
                <p className="text-sm text-gray-700">
                  "Can you explain how airplanes stay in the air in a way that a 10-year-old would understand? Use simple examples and avoid complicated words. Include a fun fact at the end."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-amber-700">Quiz Creator</h4>
                <p className="text-sm text-gray-700">
                  "Create a 5-question quiz about dinosaurs for kids. Make the questions multiple choice with 3 options each. Include the correct answers at the end and one surprising fact after each answer."
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-amber-700">Game Ideas</h4>
                <p className="text-sm text-gray-700">
                  "I'm having a birthday party with 10 kids ages 8-10. Can you suggest 3 fun outdoor games we could play that:
                  1. Don't require special equipment
                  2. Are easy to explain
                  3. Everyone can participate in
                  Give simple instructions for each game."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>
        
        <div className="min-h-[300px]">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Slide component for AI Tools section
const AIToolsSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Popular AI Tools for Kids",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 mb-3">Kid-Friendly AI Tools:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <span className="font-semibold text-green-800">C</span>
                  </div>
                  <h4 className="font-medium text-green-800">ChatGPT</h4>
                </div>
                <p className="text-sm text-gray-700">
                  A conversational AI that can answer questions, help with homework, and have fun chats.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">chat.openai.com</a>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    <span className="font-semibold text-purple-800">C</span>
                  </div>
                  <h4 className="font-medium text-purple-800">Claude</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Another helpful AI assistant that's good at explaining complex topics in simple ways.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <span className="font-semibold text-blue-800">B</span>
                  </div>
                  <h4 className="font-medium text-blue-800">Bard</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Google's AI assistant that can help with creative writing and answer questions.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  <a href="https://bard.google.com" target="_blank" rel="noopener noreferrer">bard.google.com</a>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                    <span className="font-semibold text-pink-800">D</span>
                  </div>
                  <h4 className="font-medium text-pink-800">DALL-E</h4>
                </div>
                <p className="text-sm text-gray-700">
                  Creates images based on your descriptions - great for art projects!
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  <a href="https://openai.com/dall-e-3" target="_blank" rel="noopener noreferrer">openai.com/dall-e-3</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Using AI Tools Safely",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-3">AI Safety Tips for Kids:</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Always Have Parent Permission
                </h4>
                <p className="text-sm text-gray-700 ml-6">
                  Get your parent or guardian's permission before using any AI tools. Many have age restrictions.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Never Share Personal Information
                </h4>
                <p className="text-sm text-gray-700 ml-6">
                  Don't tell AI tools your full name, address, phone number, school name, or other personal details.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Double-Check Information
                </h4>
                <p className="text-sm text-gray-700 ml-6">
                  AI can sometimes make mistakes or share incorrect information. Always verify important facts with trusted sources.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Use for Help, Not to Replace Learning
                </h4>
                <p className="text-sm text-gray-700 ml-6">
                  AI is a great helper, but the most important learning happens in your own brain! Use AI to assist with homework, not to do it for you.
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  Tell a Trusted Adult if Something Feels Wrong
                </h4>
                <p className="text-sm text-gray-700 ml-6">
                  If an AI gives a response that makes you uncomfortable or confused, tell a parent, teacher, or other trusted adult right away.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>
        
        <div className="min-h-[300px]">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
