
import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ConnectionError } from "./ConnectionError";
import { InitialChatForm } from "./InitialChatForm";
import { ChatConversation } from "./ChatConversation";
import { useBuzzyChat } from "./useBuzzyChat";
import { LearningJourneyVisualizer } from "./journey/LearningJourneyVisualizer";

export const BuzzyChat = () => {
  const {
    messages,
    isLoading,
    questionsAsked,
    inputValue,
    setInputValue,
    connectionFailed,
    chatContainerRef,
    handleSendMessage,
    handleKeyPress,
    reachedLimit
  } = useBuzzyChat();

  const [showJourneyVisualizer, setShowJourneyVisualizer] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleJourneyComplete = (recommendation: any, profile: any) => {
    // Add the recommendation to the chat
    const recommendationMsg = `Based on your responses, I recommend the "${recommendation.title}" program for your child. 
    
This program focuses on ${recommendation.description.toLowerCase()} and takes approximately ${recommendation.timeToComplete} to complete. 

Your child will learn: ${recommendation.milestones.join(', ')}

They'll build projects like: ${recommendation.projectExample}

Would you like to book a free consultation to learn more about this program?`;
    
    setInputValue(`Tell me more about the ${recommendation.title} program`);
    setShowJourneyVisualizer(false);
  };

  // Check for journey trigger words in the last user message
  const shouldTriggerJourney = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        const triggerWords = ['recommend', 'journey', 'learning path', 'suggest', 'course', 'what should', 'which program'];
        return triggerWords.some(word => lastMessage.content.toLowerCase().includes(word));
      }
    }
    return false;
  };

  // Show journey visualizer when triggered
  if (showJourneyVisualizer) {
    return (
      <div className="max-w-4xl mx-auto">
        <ChatHeader connectionFailed={connectionFailed} />
        <div className="mt-6">
          <LearningJourneyVisualizer 
            onComplete={handleJourneyComplete}
            onClose={() => setShowJourneyVisualizer(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ChatHeader connectionFailed={connectionFailed} />
      
      <ConnectionError visible={connectionFailed} />
      
      <InitialChatForm 
        visible={messages.length === 0}
        inputValue={inputValue}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onSubmit={handleSendMessage}
      />
      
      <ChatConversation 
        visible={messages.length > 0}
        messages={messages}
        isLoading={isLoading}
        questionsAsked={questionsAsked}
        inputValue={inputValue}
        reachedLimit={reachedLimit}
        chatContainerRef={chatContainerRef}
        onSetInputValue={setInputValue}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onSubmit={handleSendMessage}
        onStartJourney={() => setShowJourneyVisualizer(true)}
        shouldTriggerJourney={shouldTriggerJourney()}
      />
    </div>
  );
};
