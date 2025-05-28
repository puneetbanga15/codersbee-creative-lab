
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  image: string;
  ageRange: string;
  features: string[];
  backgroundColor: string;
  altText?: string;
}

export const CourseCard = ({ title, image, ageRange, features, backgroundColor, altText = "CodersBee learning track" }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.15), 0 0 0 4px #a78bfa55', transition: { duration: 0.2 } }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl ${backgroundColor} h-full flex flex-col border-2 border-transparent bg-white hover:border-codersbee-vivid/70 hover:shadow-codersbee-vivid/30 transition-all duration-300`}
      style={{ boxShadow: '0 4px 32px 0 rgba(124,58,237,0.08)' }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-start">
          <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">{title}</h3>
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-codersbee-vivid to-codersbee-purple text-xs font-semibold rounded-full shadow-md mb-1">
            {ageRange}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-green-500 mr-3" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-auto">
          <Link to="/enroll" className="block mt-4">
            <Button 
              className="w-full bg-gradient-to-r from-codersbee-vivid to-codersbee-purple hover:from-codersbee-purple hover:to-codersbee-vivid text-white font-bold shadow-lg hover:shadow-xl group text-lg py-3 rounded-xl"
              size="lg"
            >
              <span>Enroll Now</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
