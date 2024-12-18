import { motion } from "framer-motion";
import { Sparkles, Rocket, Brain, Zap } from "lucide-react";

export const InnovationHighlight = () => {
  const studentProjects = [
    {
      name: "Shuvam",
      project: "AI Travel Planner",
      description: "Created an intelligent travel planner using AI agents to craft personalized itineraries.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      name: "Ayaan",
      project: "Smart Recipe Generator",
      description: "Developed an AI-powered recipe maker that considers nutritional needs and dietary preferences.",
      icon: <Brain className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-codersbee-purple/20 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-codersbee-dark">
            Why We're <span className="text-codersbee-vivid">Revolutionary</span>
          </h2>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-codersbee-vivid mr-2" />
            <p className="text-xl text-gray-700">
              We teach what's happening <span className="font-semibold">right now</span>, not last year
            </p>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            While others stick to basics, we dive into the latest AI developments. Our students learn to build professional 
            applications using cutting-edge tools like Large Language Models, AI Agents, and RAG systems - the same 
            technology powering today's innovations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {studentProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-codersbee-purple/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-codersbee-purple/10 rounded-full mr-4">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-codersbee-dark">
                    {project.project}
                  </h3>
                  <p className="text-codersbee-vivid">by {project.name}</p>
                </div>
              </div>
              <p className="text-gray-600">{project.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center bg-codersbee-vivid/10 px-6 py-3 rounded-full">
            <Zap className="w-5 h-5 text-codersbee-vivid mr-2" />
            <p className="text-codersbee-dark font-medium">
              Our students don't just learn - they create the future!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};