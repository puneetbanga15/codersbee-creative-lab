import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const AICorner = () => {
  const stages = [
    {
      title: "Stage 1: AI Fundamentals",
      description: "Master the building blocks of Artificial Intelligence",
      duration: "12-16 classes",
      topics: [
        "Python Programming Advanced Concepts",
        "Introduction to Machine Learning",
        "Neural Networks Basics",
        "Data Structures for AI",
        "Mathematical Foundations"
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      color: "bg-gradient-to-br from-purple-100 to-purple-200"
    },
    {
      title: "Stage 2: Building AI Applications",
      description: "Create your first AI applications using industry-standard tools",
      duration: "16-20 classes",
      topics: [
        "OpenAI API Integration",
        "Claude API Implementation",
        "Hugging Face Transformers",
        "Building Custom Chatbots",
        "Open Source Model Deployment"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      color: "bg-gradient-to-br from-blue-100 to-blue-200"
    },
    {
      title: "Stage 3: Advanced AI Techniques",
      description: "Dive deep into sophisticated AI implementations",
      duration: "12-16 classes",
      topics: [
        "Retrieval Augmented Generation (RAG)",
        "Model Fine-tuning Techniques",
        "AI Security Best Practices",
        "Custom Data Integration",
        "Performance Optimization"
      ],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      color: "bg-gradient-to-br from-green-100 to-green-200"
    },
    {
      title: "Stage 4: AI Mastery",
      description: "Perfect your AI skills with advanced methodologies",
      duration: "12-16 classes",
      topics: [
        "Hallucination Prevention Techniques",
        "AI Result Accuracy Improvement",
        "Advanced AI Tools (Cursor, Lovable)",
        "Project Portfolio Development",
        "Industry Best Practices"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      color: "bg-gradient-to-br from-orange-100 to-orange-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-codersbee-dark mb-4">
            AI Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on a comprehensive journey to master Artificial Intelligence through our carefully crafted stages, designed specifically for young innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className={`${stage.color} border-none shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <img 
                    src={stage.image} 
                    alt={stage.title} 
                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                  />
                  <CardTitle className="text-2xl mb-2">{stage.title}</CardTitle>
                  <p className="text-gray-600">{stage.description}</p>
                  <p className="text-sm font-semibold text-purple-600 mt-2">Duration: {stage.duration}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-gray-700">
                        <span className="mr-2">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICorner;