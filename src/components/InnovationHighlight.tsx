import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export const InnovationHighlight = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-codersbee-purple/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center bg-codersbee-vivid/10 px-6 py-3 rounded-full">
            <Brain className="w-5 h-5 text-codersbee-vivid mr-2" />
            <p className="text-codersbee-dark font-medium">
              Empowering young minds with AI and coding skills
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};