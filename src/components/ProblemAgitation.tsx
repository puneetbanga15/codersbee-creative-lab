
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Brain, GraduationCap, Building, RefreshCw, Code, Users, Calendar } from "lucide-react";

export const ProblemAgitation = () => {
  const contentPairs = [
    {
      statistic: {
        text: "Did you know that 65% of today's students will work in jobs that don't even exist yet?",
        source: "World Economic Forum",
        link: "https://www3.weforum.org/docs/WEF_Future_of_Jobs_2023.pdf",
        icon: <TrendingUp className="w-8 h-8" />,
        accentColor: "border-codersbee-vivid"
      },
      painPoint: {
        text: "Is your institute still teaching yesterday's coding?",
        solution: "Our curriculum updates monthly with the latest AI & coding advances",
        icon: <RefreshCw className="w-8 h-8" />,
        accentColor: "border-codersbee-orange"
      }
    },
    {
      statistic: {
        text: "88% of Parents Say AI Is Crucial but Worry Schools Aren't Teaching It",
        source: "Parents.com Research",
        link: "https://www.parents.com/ai-and-education-how-important-is-it-8722567",
        icon: <Brain className="w-8 h-8" />,
        accentColor: "border-codersbee-vivid"
      },
      painPoint: {
        text: "Tired of rigid, outdated courses?",
        solution: "Our AI-first approach adapts to your child's learning style",
        icon: <Code className="w-8 h-8" />,
        accentColor: "border-codersbee-orange"
      }
    },
    {
      statistic: {
        text: "By 2035, experts predict that 80% of all jobs will require some form of AI literacy and coding skills",
        source: "UNESCO Report",
        link: "https://www.unesco.org/en/articles/artificial-intelligence-education-here-nine-things-know",
        icon: <GraduationCap className="w-8 h-8" />,
        accentColor: "border-codersbee-vivid"
      },
      painPoint: {
        text: "Worried about inconsistent teaching quality?",
        solution: "Our certified teachers stay with your child throughout their journey",
        icon: <Users className="w-8 h-8" />,
        accentColor: "border-codersbee-orange"
      }
    },
    {
      statistic: {
        text: "According to McKinsey, 75% of companies are actively implementing or exploring AI, creating massive future job opportunities",
        source: "McKinsey State of AI 2023",
        link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-AIs-breakout-year",
        icon: <Building className="w-8 h-8" />,
        accentColor: "border-codersbee-vivid"
      },
      painPoint: {
        text: "Need more flexibility in learning and payments?",
        solution: "Choose your pace with our pay-as-you-go model",
        icon: <Calendar className="w-8 h-8" />,
        accentColor: "border-codersbee-orange"
      }
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white via-codersbee-purple/5 to-codersbee-purple/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentPairs.map((pair, index) => (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`
                  bg-white p-6 rounded-lg shadow-lg border-l-4 ${pair.statistic.accentColor}
                  transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-codersbee-vivid">
                    {pair.statistic.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-codersbee-dark font-medium mb-3">
                      {pair.statistic.text}
                    </p>
                    <a
                      href={pair.statistic.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-codersbee-vivid hover:text-codersbee-vivid/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Read {pair.statistic.source} Report
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {contentPairs.map((pair, index) => (
              <motion.div
                key={`pain-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.2 }}
                className={`
                  bg-gradient-to-br from-white to-codersbee-purple/5 p-6 rounded-lg shadow-lg 
                  border-l-4 ${pair.painPoint.accentColor}
                  transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-codersbee-orange">
                    {pair.painPoint.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-codersbee-dark mb-2">
                      {pair.painPoint.text}
                    </h3>
                    <p className="text-codersbee-dark/80">
                      {pair.painPoint.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
