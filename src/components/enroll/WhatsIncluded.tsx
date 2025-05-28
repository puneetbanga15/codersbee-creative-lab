import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "30-minute 1:1 session",
    description: "Personal attention from expert instructors",
    color: "from-[#FF6B6B] to-[#FF8E8E]",
    highlight: "bg-red-50"
  },
  {
    title: "Skill assessment",
    description: "Understand your child's current level",
    color: "from-[#4ECDC4] to-[#6EE7E7]",
    highlight: "bg-teal-50"
  },
  {
    title: "Personalized learning plan",
    description: "Tailored pathway for optimal growth",
    color: "from-[#9B89F8] to-[#BEB1FF]",
    highlight: "bg-purple-50"
  },
  {
    title: "Q&A with instructor",
    description: "Get all your questions answered",
    color: "from-[#FFB84C] to-[#FFCF87]",
    highlight: "bg-orange-50"
  },
  {
    title: "Special offer for enrollment",
    description: "Exclusive benefits for demo attendees",
    color: "from-[#45B7D1] to-[#6DCAE0]",
    highlight: "bg-blue-50"
  }
];

export const WhatsIncluded = () => (
  <section className="py-16 bg-gradient-to-b from-white via-codersbee-purple/5 to-white">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-codersbee-dark">
        What's Included in Your Free Demo
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12">
        Every parent and child receives these exclusive benefits when you book a free demo:
      </p>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-16 max-w-7xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div 
            key={idx}
            className="relative"
            style={{
              transform: `scale(${1 + idx * 0.01})`
            }}
          >
            <motion.div
              className={`${benefit.highlight} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Colorful top banner */}
              <div className={`h-3 bg-gradient-to-r ${benefit.color}`} />
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
            
            {/* Animated arrow for desktop */}
            {idx < benefits.length - 1 && (
              <motion.div 
                className="hidden lg:flex absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-20"
                initial={{ x: -5, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
              >
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <motion.a
          href="/enroll?demo=true"
          className="inline-block bg-gradient-to-r from-codersbee-vivid to-codersbee-purple text-white font-semibold px-12 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Your Free Demo Now
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </div>
  </section>
);

export default WhatsIncluded;
