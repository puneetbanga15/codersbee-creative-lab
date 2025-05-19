
import React, { useState, useEffect } from 'react';
import { MeetAIFriendActivity } from './MeetAIFriendActivity';

interface MeetAIFriendActivityWrapperProps {
  onComplete?: () => void;
}

export const MeetAIFriendActivityWrapper = ({ onComplete }: MeetAIFriendActivityWrapperProps) => {
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

  return <MeetAIFriendActivity />;
};
