
import React from "react";

export const PirateAvatarProgress: React.FC = () => {
  // For first version, show "basic pirate" as starter, space for later avatars.
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-purple-700">Your Avatar</span>
      <div className="relative">
        <img
          src="/Basic Pirate Kid (Starting Avatar).png"
          alt="Your pirate avatar"
          className="w-20 h-20 md:w-28 md:h-28 border-4 border-amber-200 rounded-full shadow animate-[float_5s_ease-in-out_infinite]"
        />
        {/* Future: Overlay adventure progress badges or hats */}
        <span className="absolute bottom-1 right-0 bg-amber-400 rounded-full px-2 py-0.5 text-xs font-bold text-white shadow">
          Level 1
        </span>
      </div>
    </div>
  );
};
