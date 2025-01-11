import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const ProblemAgitation = () => {
  const questions = [
    {
      text: "Did you know that 65% of today's students will work in jobs that don't even exist yet?",
      source: "World Economic Forum",
      link: "https://www3.weforum.org/docs/WEF_Future_of_Jobs_2023.pdf"
    },
    {
      text: "88% of Parents Say AI Is Crucial but Worry Schools Aren't Teaching It",
      source: "Parents.com Research",
      link: "https://www.parents.com/ai-and-education-how-important-is-it-8722567"
    },
    {
      text: "By 2035, experts predict that 80% of all jobs will require some form of AI literacy and coding skills",
      source: "UNESCO Report",
      link: "https://www.unesco.org/en/articles/artificial-intelligence-education-here-nine-things-know"
    },
    {
      text: "According to McKinsey, 75% of companies are actively implementing or exploring AI, creating massive future job opportunities",
      source: "McKinsey State of AI 2023",
      link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-AIs-breakout-year"
    }
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
              <p className="text-lg md:text-xl text-codersbee-dark font-medium mb-3">
                {question.text}
              </p>
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-codersbee-vivid hover:text-codersbee-vivid/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Read {question.source} Report
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};