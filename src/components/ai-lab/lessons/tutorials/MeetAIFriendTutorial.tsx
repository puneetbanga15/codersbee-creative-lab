import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Brain, Bot, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  const slides = [
    {
      title: "What is an AI Friend?",
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
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
      )
    },
    {
      title: "How AI Friends Work",
      icon: <Brain className="h-6 w-6 text-purple-600" />,
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
      )
    },
    {
      title: "Training Your AI Friend",
      icon: <Bot className="h-6 w-6 text-purple-600" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-12 w-12 text-blue-500" />
              </div>
              <div className="absolute -right-4 top-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-center mb-2">Training is like teaching a pet tricks!</h3>
              <p className="text-sm text-center">
                You show examples of what to do, and they learn to copy it
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex flex-col items-center">
              <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mb-2">
                <span className="font-bold text-green-800">1</span>
              </div>
              <p className="text-center text-xs">
                Give examples
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col items-center">
              <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mb-2">
                <span className="font-bold text-blue-800">2</span>
              </div>
              <p className="text-center text-xs">
                Show patterns
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col items-center">
              <div className="bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center mb-2">
                <span className="font-bold text-amber-800">3</span>
              </div>
              <p className="text-center text-xs">
                Practice
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex flex-col items-center">
              <div className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center mb-2">
                <span className="font-bold text-purple-800">4</span>
              </div>
              <p className="text-center text-xs">
                Improve
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Different AI Personalities",
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
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
      )
    },
    {
      title: "Let's Get Started!",
      icon: <Zap className="h-6 w-6 text-purple-600" />,
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
      )
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? prev : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? prev : prev - 1));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {slides[currentSlide].icon}
            {slides[currentSlide].title}
          </h2>
          <div className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
        
        <div className="min-h-[300px] flex items-center justify-center">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          <Button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
