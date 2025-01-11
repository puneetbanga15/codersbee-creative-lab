import { motion } from "framer-motion";
import { Brain, GraduationCap, Users } from "lucide-react";

export const VisualEquation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-codersbee-purple/10">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Curious Student */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-codersbee-yellow flex items-center justify-center mb-3 shadow-lg">
              <GraduationCap className="w-12 h-12 text-codersbee-dark" />
            </div>
            <p className="text-lg font-medium text-codersbee-dark">Curious Student</p>
          </motion.div>

          {/* Plus Sign */}
          <motion.div 
            variants={itemVariants}
            className="text-4xl font-bold text-codersbee-vivid"
          >
            +
          </motion.div>

          {/* Expert Mentors */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-codersbee-orange flex items-center justify-center mb-3 shadow-lg">
              <Users className="w-12 h-12 text-codersbee-dark" />
            </div>
            <p className="text-lg font-medium text-codersbee-dark">Expert Mentors</p>
          </motion.div>

          {/* Plus Sign */}
          <motion.div 
            variants={itemVariants}
            className="text-4xl font-bold text-codersbee-vivid"
          >
            +
          </motion.div>

          {/* Power of AI */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-codersbee-green flex items-center justify-center mb-3 shadow-lg">
              <Brain className="w-12 h-12 text-codersbee-dark" />
            </div>
            <p className="text-lg font-medium text-codersbee-dark">Power of AI</p>
          </motion.div>

          {/* Equals Sign */}
          <motion.div 
            variants={itemVariants}
            className="text-4xl font-bold text-codersbee-vivid"
          >
            =
          </motion.div>

          {/* Future Innovator */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-codersbee-purple to-codersbee-vivid/30 flex items-center justify-center mb-3 shadow-lg">
              <div className="text-3xl text-white">🚀</div>
            </div>
            <p className="text-xl font-bold bg-gradient-to-r from-codersbee-vivid to-codersbee-dark bg-clip-text text-transparent">
              Future Innovator
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};