import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Labs",
    description: "Hands-on projects to explore AI concepts in a fun, interactive way.",
    icon: "🔬",
    link: "/labs"
  },
  {
    title: "Coding Challenges",
    description: "Test your skills with our collection of coding exercises and challenges.",
    icon: "💻",
    link: "/challenges"
  },
  {
    title: "Learning Resources",
    description: "Curated tutorials, videos, and articles to enhance your learning.",
    icon: "📚",
    link: "/resources"
  }
];

export const ExploreMore = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
            Not Ready to Enroll Yet?
          </h2>
          <p className="text-lg text-gray-600">
            Explore our free learning resources and get a taste of what we offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-codersbee-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link to={feature.link}>
                <Button
                  variant="outline"
                  className="border-codersbee-purple text-codersbee-purple hover:bg-codersbee-purple/10"
                >
                  Explore Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Want to see what else we offer?
          </p>
          <Link to="/courses">
            <Button className="bg-codersbee-purple hover:bg-codersbee-purple/90">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
