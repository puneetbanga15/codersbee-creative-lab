import { motion } from "framer-motion";
import { Users, Code2, Trophy, Star } from "lucide-react";

export const Stats = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "500+", label: "Happy Students" },
    { icon: <Code2 className="w-8 h-8" />, value: "50+", label: "Projects Built" },
    { icon: <Trophy className="w-8 h-8" />, value: "15+", label: "Awards Won" },
    { icon: <Star className="w-8 h-8" />, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="text-codersbee-vivid mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-codersbee-dark mb-1">{stat.value}</div>
            <div className="text-gray-600 text-center">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};