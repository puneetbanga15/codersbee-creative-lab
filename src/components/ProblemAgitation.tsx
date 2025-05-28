
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Brain, GraduationCap, Building, RefreshCw, Code, Users, Calendar } from "lucide-react";

export const ProblemAgitation = () => {
  const contentItems = [
    {
      painPoint: "Is your institute still teaching yesterday's coding?",
      statistic: "88% of Parents Say AI Is Crucial but Worry Schools Aren't Teaching It",
      source: "Parents.com Research",
      link: "https://www.parents.com/ai-and-education-how-important-is-it-8722567",
      solution: "Our curriculum updates monthly with latest AI & coding advances",
      statisticIcon: <Brain className="w-8 h-8" />,
      solutionIcon: <RefreshCw className="w-8 h-8" />,
      accentColor: "border-codersbee-vivid"
    },
    {
      painPoint: "Will your child be ready for tomorrow's jobs?",
      statistic: "65% of today's students will work in jobs that don't even exist yet",
      source: "World Economic Forum",
      link: "https://www3.weforum.org/docs/WEF_Future_of_Jobs_2023.pdf",
      solution: "Our AI-first approach adapts to your child's unique learning style",
      statisticIcon: <TrendingUp className="w-8 h-8" />,
      solutionIcon: <Code className="w-8 h-8" />,
      accentColor: "border-codersbee-orange"
    },
    {
      painPoint: "Worried about keeping up with AI revolution?",
      statistic: "In advanced economies, about 60% of jobs could be impacted by AI and skill enhancement is an imminent need",
      source: "IMF Report",
      link: "https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
      solution: "Our certified teachers stay with your child throughout their journey",
      statisticIcon: <GraduationCap className="w-8 h-8" />,
      solutionIcon: <Users className="w-8 h-8" />,
      accentColor: "border-codersbee-vivid"
    },
    {
      painPoint: "Need learning flexibility with assured outcomes?",
      statistic: "75% of companies are actively implementing AI, creating massive future opportunities",
      source: "McKinsey State of AI 2023",
      link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-AIs-breakout-year",
      solution: "Choose your pace with our pay-as-you-go model",
      statisticIcon: <Building className="w-8 h-8" />,
      solutionIcon: <Calendar className="w-8 h-8" />,
      accentColor: "border-codersbee-orange"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-codersbee-purple/5 to-codersbee-purple/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16 bg-white p-8 rounded-2xl shadow-xl border border-codersbee-purple/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-6">
            Dear Parents,
          </h2>
          <div className="prose prose-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            <p className="text-xl leading-relaxed mb-6">
              In a world where <span className="font-bold text-codersbee-vivid">AI is transforming every industry</span>, we understand your concerns about preparing your child for a future that's evolving at an unprecedented pace.
            </p>
            <p className="text-xl leading-relaxed mb-6">
              At CodersBee, we don't just teach coding - we're shaping the <span className="font-bold text-codersbee-vivid">next generation of innovators and problem-solvers</span> who will thrive in the AI era.
            </p>
          </div>
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="/enroll" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-codersbee-vivid hover:bg-codersbee-vivid/90 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Secure Your Child's Future Today
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contentItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`
                  bg-white p-6 rounded-lg shadow-lg border-l-4 ${item.accentColor}
                  transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-codersbee-vivid">
                    {item.statisticIcon}
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-semibold text-codersbee-dark">
                      {item.painPoint}
                    </h3>
                    
                    <p className="text-base text-codersbee-dark/80">
                      {item.statistic}
                    </p>
                    
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-codersbee-vivid hover:text-codersbee-vivid/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Read {item.source}
                    </a>

                    <div className="flex items-start space-x-3 pt-2 border-t border-gray-100">
                      <div className="text-codersbee-orange">
                        {item.solutionIcon}
                      </div>
                      <p className="text-codersbee-dark flex-1">
                        {item.solution}
                      </p>
                    </div>
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
