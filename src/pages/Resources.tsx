import React from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Code, BookOpen, Cloud, Sparkles } from "lucide-react";
import { ResourceSection } from "@/components/resources/ResourceSection";

const Resources = () => {
  const resources = {
    "Scratch": [
      { 
        title: "Introduction to Scratch", 
        description: "Learn the basics of Scratch programming", 
        locked: false,
        link: "/resources/scratch-fundamentals"
      },
      { 
        title: "Game Development with Scratch", 
        description: "Lesson coming soon! Learn to create your first game using Scratch", 
        locked: true 
      },
      { 
        title: "Advanced Scratch Projects", 
        description: "Lesson coming soon! Explore complex projects and animations", 
        locked: true 
      }
    ],
    "HTML and CSS": [
      { 
        title: "HTML Fundamentals", 
        description: "Lesson coming soon! Learn basic structure and elements", 
        locked: true 
      },
      { 
        title: "CSS Styling", 
        description: "Lesson coming soon! Make your websites beautiful", 
        locked: true 
      },
      { 
        title: "Responsive Design", 
        description: "Lesson coming soon! Master advanced layouts and media queries", 
        locked: true 
      }
    ],
    "JavaScript": [
      { 
        title: "JavaScript Basics", 
        description: "Lesson coming soon! Learn variables, functions, and control flow", 
        locked: true 
      },
      { 
        title: "DOM Manipulation", 
        description: "Lesson coming soon! Learn to interact with web pages", 
        locked: true 
      },
      { 
        title: "Advanced JavaScript", 
        description: "Lesson coming soon! Master objects, classes, and modern features", 
        locked: true 
      }
    ],
    "Cloud and Hosting": [
      { 
        title: "Introduction to Cloud", 
        description: "Lesson coming soon! Understanding cloud computing", 
        locked: true 
      },
      { 
        title: "Website Deployment", 
        description: "Lesson coming soon! Learn to host your first website", 
        locked: true 
      }
    ],
    "Generative AI": [
      { 
        title: "AI Basics", 
        description: "Lesson coming soon! Understanding AI and its applications", 
        locked: true 
      },
      { 
        title: "ChatGPT Integration", 
        description: "Lesson coming soon! Building with AI APIs", 
        locked: true 
      },
      { 
        title: "Advanced AI Projects", 
        description: "Lesson coming soon! Complex AI implementations", 
        locked: true 
      }
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