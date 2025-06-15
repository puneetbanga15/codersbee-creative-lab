
import React from "react";
import { PirateAvatarProgress } from "./PirateAvatarProgress";

export const AdventureMasthead: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-10 gap-6 p-8 rounded-xl border-4 border-yellow-300 bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-yellow-100/95 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col max-w-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-800 tracking-tight drop-shadow-lg mb-3 leading-tight">
          Welcome to the Magical Island of AI!
        </h1>
        <p className="text-xl md:text-2xl text-amber-700 max-w-md mb-4 font-medium">
          Your pirate voyage begins… Explore, learn, and unlock treasures as you become an AI legend!
        </p>
        <div className="flex items-center gap-4 mb-2">
          <img
            src="/Pirate Ship Icon.png"
            alt="Pirate ship"
            className="w-12 h-12 animate-[float_2.5s_ease-in-out_infinite] drop-shadow-lg"
          />
          <span className="font-bold text-purple-800 text-lg animate-pulse bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-200">Adventure Points: 0</span>
        </div>
      </div>
      <PirateAvatarProgress />
    </section>
  );
};
