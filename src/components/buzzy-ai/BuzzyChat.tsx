
import { ChatHeader } from "./ChatHeader";
import { ConnectionError } from "./ConnectionError";
import { InitialChatForm } from "./InitialChatForm";
import { ChatConversation } from "./ChatConversation";
import { useBuzzyChat } from "./useBuzzyChat";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

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
      />
    </div>
  );
};
