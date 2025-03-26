import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Brain, Bot, Sparkles, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { BuzzyAnimation } from '@/components/ai-lab/ui/BuzzyAnimation';
import { BuzzySpeechBubble } from '@/components/ai-lab/ui/BuzzySpeechBubble';

// AI Brain Canvas Component
const AIBrainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 200;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw brain outline
    ctx.beginPath();
    ctx.fillStyle = '#f3e8ff'; // Light purple background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw brain shape
    ctx.beginPath();
    ctx.fillStyle = '#c084fc'; // Purple
    
    // Brain curves
    ctx.moveTo(100, 40);
    ctx.bezierCurveTo(140, 30, 180, 60, 170, 100);
    ctx.bezierCurveTo(180, 140, 140, 170, 100, 160);
    ctx.bezierCurveTo(60, 170, 20, 140, 30, 100);
    ctx.bezierCurveTo(20, 60, 60, 30, 100, 40);
    ctx.fill();
    
    // Draw circuit patterns
    ctx.strokeStyle = '#f0abfc'; // Lighter purple
    ctx.lineWidth = 2;
    
    // Horizontal lines
    for (let y = 50; y < 150; y += 20) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(160, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 50; x < 150; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, 160);
      ctx.stroke();
    }
    
    // Draw nodes
    ctx.fillStyle = '#f0f0f0';
    const nodePositions = [
      [60, 60], [100, 60], [140, 60],
      [60, 100], [100, 100], [140, 100],
      [60, 140], [100, 140], [140, 140]
    ];
    
    nodePositions.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect
      ctx.beginPath();
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 10);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Add pulsing animation
    let pulse = 0;
    const animate = () => {
      pulse = (pulse + 1) % 60;
      const scale = 1 + Math.sin(pulse / 10) * 0.05;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = '#f3e8ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Save context for scaling
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      
      // Brain shape
      ctx.beginPath();
      ctx.fillStyle = '#c084fc';
      ctx.moveTo(100, 40);
      ctx.bezierCurveTo(140, 30, 180, 60, 170, 100);
      ctx.bezierCurveTo(180, 140, 140, 170, 100, 160);
      ctx.bezierCurveTo(60, 170, 20, 140, 30, 100);
      ctx.bezierCurveTo(20, 60, 60, 30, 100, 40);
      ctx.fill();
      
      // Circuit patterns
      ctx.strokeStyle = '#f0abfc';
      ctx.lineWidth = 2;
      
      // Horizontal lines
      for (let y = 50; y < 150; y += 20) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(160, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 50; x < 150; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, 160);
        ctx.stroke();
      }
      
      // Nodes with pulsing effect
      nodePositions.forEach(([x, y], i) => {
        const nodePulse = (pulse + i * 5) % 60;
        const nodeScale = 1 + Math.sin(nodePulse / 10) * 0.3;
        
        ctx.beginPath();
        ctx.fillStyle = '#f0f0f0';
        ctx.arc(x, y, 5 * nodeScale, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 15);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={200} 
      height={200} 
      className="rounded-lg shadow-md"
    />
  );
};

export const MeetAIFriendTutorial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBuzzy, setShowBuzzy] = useState(true);
  
  const slides = [
    {
      title: "What is an AI Friend?",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center">
              <Bot className="h-16 w-16 text-purple-500" />
            </div>
          </div>
          <p className="text-center text-lg">
            An AI Friend is like a digital buddy that can talk with you!
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col items-center">
              <Zap className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-center text-sm">
                It learns from examples you give it
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center">
              <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-center text-sm">
                It responds like it's having a conversation
              </p>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "Hi there! I'm Buzzy, and I'm excited to teach you about AI Friends! AI Friends are like digital buddies that can talk with you.",
      buzzyState: "teaching"
    },
    {
      title: "How AI Friends Work",
      content: (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <AIBrainCanvas />
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">1</span>
            </div>
            <p className="text-sm">AI Friends recognize patterns in your messages</p>
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg mb-2">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">2</span>
            </div>
            <p className="text-sm">They pick the best response from what they've learned</p>
          </div>
          <div className="flex items-center bg-purple-50 p-3 rounded-lg">
            <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="font-bold text-purple-800">3</span>
            </div>
            <p className="text-sm">They don't really understand like humans, but they seem real!</p>
          </div>
        </div>
      ),
      buzzyMessage: "When you talk to an AI Friend like me, I process your words, understand what you're asking, and create a response. It's like a conversation, but with a computer!",
      buzzyState: "default"
    },
    {
      title: "Training Your AI Friend",
      content: (
        <div className="space-y-4">
          <p className="text-gray-800">
            Training an AI Friend is like teaching a pet tricks! You show examples of what to do, and they learn to copy it.
          </p>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
            <h3 className="font-semibold text-green-800 mb-2">How Training Works:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-green-800 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Give Examples</p>
                  <p className="text-sm text-green-700">Show your AI Friend how to respond to different questions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-green-800 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Pattern Recognition</p>
                  <p className="text-sm text-green-700">Your AI Friend learns patterns from your examples</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-200 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-green-800 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Test It Out</p>
                  <p className="text-sm text-green-700">Try talking to your AI Friend to see what it learned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "Training an AI Friend is like teaching a pet tricks! You show examples of what to do, and they learn to copy it.",
      buzzyState: "excited"
    },
    {
      title: "Different AI Personalities",
      content: (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-red-500">HP</span>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-500">AE</span>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-500">K</span>
              </div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-amber-500">WS</span>
              </div>
            </div>
          </div>
          
          <p className="text-center">
            AI Friends can have different personalities!
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-gradient-to-r from-red-50 to-amber-50 p-3 rounded-lg">
              <h3 className="font-medium mb-1 text-center">Harry Potter</h3>
              <p className="text-xs text-center">Magical, brave, and loyal</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
              <h3 className="font-medium mb-1 text-center">Albert Einstein</h3>
              <p className="text-xs text-center">Smart, curious, and thoughtful</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
              <h3 className="font-medium mb-1 text-center">Krishna</h3>
              <p className="text-xs text-center">Wise, playful, and compassionate</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg">
              <h3 className="font-medium mb-1 text-center">William Shakespeare</h3>
              <p className="text-xs text-center">Poetic, dramatic, and expressive</p>
            </div>
          </div>
        </div>
      ),
      buzzyMessage: "AI Friends can have different personalities! They can be magical, brave, and loyal, or smart, curious, and thoughtful.",
      buzzyState: "default"
    },
    {
      title: "Let's Get Started!",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center">
            <Sparkles className="h-16 w-16 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-center text-purple-700">
            Ready to create your AI Friend?
          </h3>
          <p className="text-center">
            Click "Start Activity" to begin your AI adventure!
          </p>
        </div>
      ),
      buzzyMessage: "Ready to create your AI Friend? Click 'Start Activity' to begin your AI adventure!",
      buzzyState: "teaching"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowBuzzy(true);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowBuzzy(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
          <h2 className="text-xl font-bold text-purple-900">Meet Your AI Friend</h2>
          <p className="text-sm text-purple-700">Tutorial {currentSlide + 1} of {slides.length}</p>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{slides[currentSlide].title}</h3>
          
          {showBuzzy && (
            <div className="mb-6 flex items-start gap-4">
              <BuzzyAnimation 
                state={slides[currentSlide].buzzyState as any} 
                size="md" 
                className="flex-shrink-0" 
              />
              <BuzzySpeechBubble 
                message={slides[currentSlide].buzzyMessage}
                state={slides[currentSlide].buzzyState as any}
                onClose={() => setShowBuzzy(false)}
              />
            </div>
          )}
          
          {slides[currentSlide].content}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
