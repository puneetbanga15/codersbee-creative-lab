import { motion } from "framer-motion";

export const ProblemAgitation = () => {
  const questions = [
    "Is your child prepared for the AI revolution that's transforming industries at lightning speed?",
    "Are you worried that traditional education might not be enough in this rapidly evolving tech landscape?",
    "Did you know that 65% of today's students will work in jobs that don't even exist yet?"
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-codersbee-purple/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
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