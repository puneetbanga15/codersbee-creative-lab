
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Trophy, Rocket } from 'lucide-react';

export const ValueProposition = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-codersbee-vivid" />,
      title: "AI-First Curriculum",
      description: "Learn to create AI applications and understand the technology shaping our future"
    },
    {
      icon: <Users className="w-8 h-8 text-codersbee-vivid" />,
      title: "1:1 Personalized Learning",
      description: "Individual attention ensures your child learns at their perfect pace"
    },
    {
      icon: <Trophy className="w-8 h-8 text-codersbee-vivid" />,
      title: "Hackathon Ready",
      description: "Practice and prepare for coding competitions and hackathons"
    },
    {
      icon: <Rocket className="w-8 h-8 text-codersbee-vivid" />,
      title: "Project-Based Learning",
      description: "Build real projects that showcase your child's skills to the world"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-codersbee-dark mb-4">
            Why Parents Choose CodersBee
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We don't just teach coding – we nurture future innovators with our unique approach to technology education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-codersbee-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
