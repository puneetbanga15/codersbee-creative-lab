
import React from "react";
import { PirateAvatarProgress } from "./PirateAvatarProgress";

export const AdventureMasthead: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-10 gap-6 p-6 rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-amber-50/90 via-purple-50/80 to-sky-100/80 shadow-lg">
      <div className="flex flex-col max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-800 tracking-tight drop-shadow-md mb-1">
          Welcome to the Magical Island of AI!
        </h1>
        <p className="text-lg md:text-xl text-amber-600 max-w-md mb-2">
          Your pirate voyage begins… Explore, learn, and unlock treasures as you become an AI legend!
        </p>
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/Pirate Ship Icon.png"
            alt="Pirate ship"
            className="w-10 h-10 animate-[float_2.5s_ease-in-out_infinite]"
          />
          <span className="font-medium text-purple-700 animate-pulse">Adventure Points: 0</span>
        </div>
      </div>
      <PirateAvatarProgress />
    </section>
  );
};
