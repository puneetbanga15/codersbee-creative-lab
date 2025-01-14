import React from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Code, BookOpen, Cloud, Sparkles } from "lucide-react";
import { ResourceSection } from "@/components/resources/ResourceSection";

const Resources = () => {
  const resources = {
    "Scratch": [
      { title: "Introduction to Scratch", description: "Learn the basics of Scratch programming", locked: false },
      { title: "Game Development with Scratch", description: "Create your first game using Scratch", locked: false },
      { title: "Advanced Scratch Projects", description: "Complex projects and animations", locked: true }
    ],
    "HTML and CSS": [
      { title: "HTML Fundamentals", description: "Basic structure and elements", locked: false },
      { title: "CSS Styling", description: "Make your websites beautiful", locked: false },
      { title: "Responsive Design", description: "Advanced layouts and media queries", locked: true }
    ],
    "JavaScript": [
      { title: "JavaScript Basics", description: "Variables, functions, and control flow", locked: false },
      { title: "DOM Manipulation", description: "Interact with web pages", locked: true },
      { title: "Advanced JavaScript", description: "Objects, classes, and modern features", locked: true }
    ],
    "Cloud and Hosting": [
      { title: "Introduction to Cloud", description: "Understanding cloud computing", locked: false },
      { title: "Website Deployment", description: "Host your first website", locked: true }
    ],
    "Generative AI": [
      { title: "AI Basics", description: "Understanding AI and its applications", locked: false },
      { title: "ChatGPT Integration", description: "Building with AI APIs", locked: true },
      { title: "Advanced AI Projects", description: "Complex AI implementations", locked: true }
    ]
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-codersbee-dark">
          Learning <span className="text-codersbee-vivid">Resources</span>
        </h1>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <ResourceSection
            title="Scratch"
            icon={Code}
            resources={resources["Scratch"]}
          />
          <ResourceSection
            title="HTML and CSS"
            icon={BookOpen}
            resources={resources["HTML and CSS"]}
          />
          <ResourceSection
            title="JavaScript"
            icon={Code}
            resources={resources["JavaScript"]}
          />
          <ResourceSection
            title="Cloud and Hosting"
            icon={Cloud}
            resources={resources["Cloud and Hosting"]}
          />
          <ResourceSection
            title="Generative AI"
            icon={Sparkles}
            resources={resources["Generative AI"]}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;