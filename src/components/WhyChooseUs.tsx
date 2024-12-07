import { motion } from "framer-motion";
import { GraduationCap, Clock, DollarSign } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Expert Teachers",
      description: "Our teachers are highly qualified professionals who continue throughout the entire course, ensuring consistent quality education.",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Flexible Scheduling",
      description: "Choose class times that work best for you, with easy rescheduling options to accommodate your busy lifestyle.",
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Transparent Pricing",
      description: "No long-term commitments required. Pay as you go with clear, upfront pricing and flexible payment options.",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
        What Differentiates Us From Others
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="text-codersbee-vivid mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-4 text-codersbee-dark">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};