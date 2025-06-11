
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Star, Users, GraduationCap, Trophy } from "lucide-react";
import { BookingForm } from './BookingForm';
import { Link } from 'react-router-dom';

export const EnrollHero = () => {
  return (
    <section className="relative py-8 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Mobile-first layout: Form first on mobile, content first on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Booking Form - Appears first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <BookingForm />
          </motion.div>

          {/* Content - Appears second on mobile, first on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 space-y-6"
          >
            {/* Social Proof Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex items-center bg-codersbee-vivid/10 px-3 md:px-4 py-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200" 
                onClick={() => window.open('https://www.facebook.com/CodersBee/reviews', '_blank')}
              >
                <Star className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Perfect 5-Star Rated</p>
                  <p className="text-xs text-gray-600">Read Reviews on Facebook</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex items-center bg-codersbee-vivid/10 px-3 md:px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Users className="w-5 h-5 text-codersbee-vivid mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">100+ Students</p>
                  <p className="text-xs text-gray-600">Active Learners</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex items-center bg-codersbee-vivid/10 px-3 md:px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <GraduationCap className="w-5 h-5 text-codersbee-vivid mr-2 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">20+ Years</p>
                  <p className="text-xs text-gray-600">Teaching Experience</p>
                </div>
              </motion.div>

              <Link to="/ai-lab">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  className="flex items-center bg-codersbee-vivid/10 px-3 md:px-4 py-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Trophy className="w-5 h-5 text-codersbee-vivid mr-2 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Pioneers in AI Learning</p>
                    <p className="text-xs text-gray-600">Visit AI Lab</p>
                  </div>
                </motion.div>
              </Link>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-codersbee-dark leading-tight">
              Transform Your Child into a
              <span className="text-codersbee-vivid block mt-1">
                Future Tech Leader
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              Join our 1:1 personalized coding classes where your child will master coding, AI, and future-ready skills through hands-on projects and real-world applications.
            </p>

            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.open('https://wa.me/919996465023', '_blank')} 
              className="border-codersbee-vivid text-codersbee-vivid hover:bg-codersbee-vivid/10 h-12 px-6 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Chat on WhatsApp
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
