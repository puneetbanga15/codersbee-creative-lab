
import React from "react";

export const PirateAvatarProgress: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-lg font-bold text-purple-700 bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-200">Your Avatar</span>
      <div className="relative">
        <img
          src="/Basic Pirate Kid (Starting Avatar).png"
          alt="Your pirate avatar"
          className="w-28 h-28 md:w-36 md:h-36 border-4 border-amber-300 rounded-full shadow-2xl animate-[float_5s_ease-in-out_infinite] bg-white p-2"
        />
        <span className="absolute -bottom-2 -right-2 bg-amber-400 rounded-full px-3 py-1 text-sm font-bold text-white shadow-lg border-2 border-white">
          Level 1
        </span>
      </div>
    </div>
  );
};
