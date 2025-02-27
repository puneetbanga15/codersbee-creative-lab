
import { MAX_QUESTIONS } from "./constants";

interface ChatHeaderProps {
  connectionFailed: boolean;
}

export const ChatHeader = ({ connectionFailed }: ChatHeaderProps) => {
  return (
    <div className="text-center mb-4 mt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-2">
        Meet Buzzy
      </h1>
      <p 
        className="text-lg md:text-xl mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent font-medium" 
        style={{ fontFamily: 'Comic Sans MS, cursive' }}
      >
        Secure AI chat for parents and kids
      </p>
      <div className="flex justify-center mb-8">
        <img 
          src="/lovable-uploads/230855da-e71d-43ac-a6b6-1c45a8569cce.png" 
          alt="Buzzy Bee"
          className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};
