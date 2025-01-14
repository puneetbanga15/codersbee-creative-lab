import React from "react";
import { motion } from "framer-motion";
import { ResourceCard } from "./ResourceCard";
import { LucideIcon } from "lucide-react";

type Resource = {
  title: string;
  description: string;
  locked: boolean;
};

type ResourceSectionProps = {
  title: string;
  icon: LucideIcon;
  resources: Resource[];
};

export const ResourceSection = ({ title, icon: Icon, resources }: ResourceSectionProps) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
      <h2 className="text-2xl font-bold mb-4 text-codersbee-dark flex items-center">
        <Icon className="w-6 h-6 mr-2 text-codersbee-vivid" />
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            locked={resource.locked}
          />
        ))}
      </div>
    </motion.div>
  );
};