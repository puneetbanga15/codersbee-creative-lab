
import React from "react";

type TierHeaderProps = {
  stage: "discoverers" | "explorers" | "builders" | "creators";
  title: string;
};

const tierBgMap: Record<string, string> = {
  discoverers: "/Discoverers (BeachShore).png",
  explorers: "/Explorers (Jungle).png",
  builders: "/Builders (Mountain Caves).png",
  creators: "/Creators (Magical Peak).png",
};

export const TierHeader: React.FC<TierHeaderProps> = ({ stage, title }) => (
  <div className="relative mb-6 rounded-xl overflow-hidden shadow-xl border-2 border-teal-300">
    {/* Background art */}
    <img
      src={tierBgMap[stage]}
      alt={`${title} background`}
      className="w-full h-32 object-cover object-center"
      draggable={false}
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/10" />
    <div className="absolute inset-0 flex items-end p-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-sky-900 drop-shadow-md tracking-wide">
        {title}
      </h2>
    </div>
  </div>
);
