import { motion } from "framer-motion";
import { Sparkles, Rocket, Brain, Zap } from "lucide-react";

export const InnovationHighlight = () => {
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
            Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
          </h2>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-codersbee-vivid mr-2" />
            <p className="text-xl text-gray-700">
              Our students are building remarkable AI projects
            </p>
          </div>
        </motion.div>

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