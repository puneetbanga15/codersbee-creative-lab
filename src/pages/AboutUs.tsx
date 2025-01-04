import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const AboutUs = () => {
  const resources = [
    {
      title: "Revolutionizing Education with AI",
      description: "Discover how CodersBee is using ChatGPT plugins to create personalized, engaging learning experiences that make coding fun for every student.",
      link: "https://podcasts.apple.com/in/podcast/how-is-this-ed-tech-founder-using-chatgpt-plugins-to/id1726562683?i=1000650683679",
      type: "Podcast"
    },
    {
      title: "Global Educational Insights",
      description: "Learn how we're bringing the best educational practices from Sweden and USA to create a unique learning experience for Indian students.",
      link: "https://www.educationworld.in/from-west-to-east-educational-insights-from-usa-and-sweden-to-india/",
      type: "Article"
    },
    {
      title: "Why Coding in the AI Era?",
      description: "Explore why learning to code is more crucial than ever in the age of AI, and how it transforms children's cognitive abilities beyond just technical skills.",
      link: "https://www.linkedin.com/pulse/should-kids-learn-coding-times-ai-absolutely-heres-why-manisha-kapoor/",
      type: "Article"
    },
    {
      title: "Our Success Mantras",
      description: "Discover the six core principles that drive our exceptional educational service: experience creation, engagement, personalization, results, flexibility, and innovation.",
      link: "https://www.linkedin.com/pulse/being-exceptional-6-success-mantras-educational-service-kapoor/",
      type: "Article"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-codersbee-dark">
              We are Pioneering the Future of <span className="text-codersbee-vivid">AI Education</span>
            </h1>
            <p className="text-xl text-gray-600">
              Building the bridge between traditional education and tomorrow's AI-driven world
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-codersbee-dark mb-6">Our Philosophy</h2>
              <p className="text-gray-600">
                At CodersBee, we believe that every child deserves to be equipped with the skills needed to thrive in an AI-powered future. Our innovative approach combines cutting-edge technology with personalized learning experiences, ensuring that each student not only learns to code but develops the critical thinking and problem-solving abilities essential for future success.
              </p>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-center mb-8 text-codersbee-dark">
            Explore Our Journey & Insights
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-codersbee-vivid bg-codersbee-purple/20 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-codersbee-dark">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-codersbee-vivid hover:text-codersbee-vivid/80 font-semibold"
                >
                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center bg-codersbee-purple/20 p-8 rounded-xl"
          >
            <p className="text-xl text-codersbee-dark font-semibold">
              Join us in our mission to prepare the next generation of AI innovators and digital leaders.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;