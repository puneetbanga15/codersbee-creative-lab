
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  image: string;
  ageRange: string;
  features: string[];
  backgroundColor: string;
  altText?: string; // Add optional alt text prop
}

export const CourseCard = ({ title, image, ageRange, features, backgroundColor, altText = "CodersBee learning track" }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl overflow-hidden shadow-lg ${backgroundColor} h-full flex flex-col`}
    >
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt={altText} // Use the provided alt text for better SEO
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
        <h3 className="text-xl font-bold mb-2 text-center text-codersbee-dark">{title}</h3>
        <p className="text-sm text-gray-600 text-center mb-6">{ageRange}</p>
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto p-6 pt-0">
        <Link to="/enroll">
          <Button className="w-full bg-codersbee-orange hover:bg-codersbee-orange/90">
            Enroll Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
