
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LLMBasicsActivityWrapperProps {
  onComplete?: () => void;
}

export const LLMBasicsActivityWrapper = ({ onComplete }: LLMBasicsActivityWrapperProps) => {
  // For now, we'll mark it as completed once mounted
  // In a real implementation, we would track actual completion of the activity
  useEffect(() => {
    if (onComplete) {
      // In a real app, you'd call this when the activity is actually completed
      // For now we'll set a timeout to simulate completion after some interaction
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">LLM Basics Activity</h2>
          <p>This is a placeholder for the LLM Basics interactive activity.</p>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p>In this activity, you would practice writing effective prompts and see how different prompts produce different results.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
