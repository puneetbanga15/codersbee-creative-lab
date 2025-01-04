import { motion } from "framer-motion";

export const ProblemAgitation = () => {
  const questions = [
    "Did you know that 65% of today's students will work in jobs that don't even exist yet?",
    "Are you aware that the AI market is projected to reach $1.3 trillion by 2032, growing at an incredible rate of 38% annually?",
    "Is your child prepared for a world where AI is expected to automate 85 million jobs while creating 97 million new roles by 2025?",
    "Did you know that companies using AI and automation are 33% more likely to be high-performing organizations?"
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-codersbee-purple/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-codersbee-vivid"
            >
              <p className="text-lg md:text-xl text-codersbee-dark font-medium">
                {question}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};