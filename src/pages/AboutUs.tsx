import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-codersbee-dark">
              Leading the <span className="text-codersbee-vivid">AI Revolution</span>
            </h1>
            <p className="text-xl text-gray-600">
              Empowering the next generation to shape the future of artificial intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                alt="AI Technology"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-codersbee-dark">Our Vision</h2>
              <p className="text-gray-600">
                At CodersBee, we believe that the future belongs to those who understand and can harness the power of Artificial Intelligence. We started with a simple mission: to ensure that kids of today lead the AI revolution of tomorrow.
              </p>
              <p className="text-gray-600">
                Our curriculum is specifically designed around Generative AI, ensuring that students not only understand the fundamentals but can also create practical applications using cutting-edge AI tools and technologies.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-codersbee-dark">AI-First Approach</h3>
              <p className="text-gray-600">
                Our curriculum integrates the latest in Generative AI, ensuring students are always at the cutting edge.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-codersbee-dark">Practical Learning</h3>
              <p className="text-gray-600">
                Students work on real-world AI projects, gaining hands-on experience with tools like ChatGPT and DALL-E.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-codersbee-dark">Future Ready</h3>
              <p className="text-gray-600">
                We prepare students not just for today's technology, but for the AI-driven future they'll help create.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <img
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
              alt="Coding and AI"
              className="rounded-lg shadow-xl mb-8 mx-auto"
            />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in shaping a future where every child understands, creates, and innovates with AI technology.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;