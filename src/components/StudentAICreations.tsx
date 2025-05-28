import { motion } from 'framer-motion';

export const StudentAICreations = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-codersbee-dark mb-6">
            Meet Our <span className="text-codersbee-vivid">Student's AI Creations</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the incredible AI projects created by our talented students. 
            These projects showcase the skills and creativity developed through our programs.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* TV Screen */}
            <div className="relative mx-auto w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-3xl">
              {/* Screen */}
              <div className="relative pt-[56.25%] bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/jxlI-30FJQ8?modestbranding=1&rel=0"
                    title="Student AI Project: Shuvam's Creation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Screen reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-30 mix-blend-overlay pointer-events-none" />
                {/* Screen border */}
                <div className="absolute inset-0 border-8 border-gray-900 rounded-lg pointer-events-none" />
                {/* Screen glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30 rounded-lg pointer-events-none" />
              </div>
              
              {/* TV Bezel */}
              <div className="absolute inset-0 border-8 border-gray-800 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
                borderImage: 'linear-gradient(135deg, #333, #666, #333) 1',
              }} />
              
              {/* TV Stand */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg z-10" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg z-0" />
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-900 rounded-b-2xl z-0 shadow-lg" />
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-800 rounded-full z-0 opacity-70" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-56 h-2 bg-gray-200 rounded-full opacity-30 blur-sm" />
            <div className="absolute -bottom-26 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-300 rounded-full opacity-20 blur-sm" />
          </div>
          
          {/* Video Description */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-codersbee-dark mb-4">
              AI-Powered Personal Assistant
            </h3>
            <p className="text-xl text-codersbee-vivid font-medium mb-4">
              Created by Shuvam, 12 years old
            </p>
            <blockquote className="text-xl text-gray-700 italic mb-8 px-4">
              "I have already participated in 5 AI hackathons and gearing up to pitch my startup to Silicon Valley investors, thanks to CodersBee"
            </blockquote>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-codersbee-vivid text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-codersbee-vivid font-semibold border-2 border-codersbee-vivid rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300"
              >
                View More Projects
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentAICreations;
