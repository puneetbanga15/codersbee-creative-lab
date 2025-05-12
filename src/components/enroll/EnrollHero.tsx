import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Star, Users, GraduationCap, Trophy } from "lucide-react";
import { BookingForm } from './BookingForm';
import { Link } from 'react-router-dom';

export const EnrollHero = () => {
  return <section className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="space-y-6">
            {/* Social Proof Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{
              scale: 1.05
            }} className="flex items-center bg-codersbee-vivid/10 px-4 py-3 rounded-lg cursor-pointer" onClick={() => window.open('https://www.facebook.com/CodersBee/reviews', '_blank')}>
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <div className="text-sm">
                  <p className="font-semibold">Perfect 5-Star Rated</p>
                  <p className="text-xs text-gray-600">Read Reviews on Facebook</p>
                </div>
              </motion.div>

              <motion.div whileHover={{
              scale: 1.05
            }} className="flex items-center bg-codersbee-vivid/10 px-4 py-3 rounded-lg">
                <Users className="w-5 h-5 text-codersbee-vivid mr-2" />
                <div className="text-sm">
                  <p className="font-semibold">100+ Students</p>
                  <p className="text-xs text-gray-600">Active Learners</p>
                </div>
              </motion.div>

              <motion.div whileHover={{
              scale: 1.05
            }} className="flex items-center bg-codersbee-vivid/10 px-4 py-3 rounded-lg">
                <GraduationCap className="w-5 h-5 text-codersbee-vivid mr-2" />
                <div className="text-sm">
                  <p className="font-semibold">20+ Years</p>
                  <p className="text-xs text-gray-600">Teaching Experience</p>
                </div>
              </motion.div>

              <Link to="/ai-lab">
                <motion.div whileHover={{
                scale: 1.05
              }} className="flex items-center bg-codersbee-vivid/10 px-4 py-3 rounded-lg cursor-pointer">
                  <Trophy className="w-5 h-5 text-codersbee-vivid mr-2" />
                  <div className="text-sm">
                    <p className="font-semibold">Pioneers in AI Learning</p>
                    <p className="text-xs text-gray-600">Visit AI Lab</p>
                  </div>
                </motion.div>
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-codersbee-dark">
              Transform Your Child into a
              <span className="text-codersbee-vivid block">
                Future Tech Leader
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Join our 1:1 personalized coding classes where your child will master coding, AI, and future-ready skills through hands-on projects and real-world applications.
            </p>

            <Button size="lg" variant="outline" onClick={() => window.open('https://wa.me/919996465023', '_blank')} className="border-codersbee-vivid text-codersbee-vivid hover:bg-codersbee-vivid/10">
              Chat on WhatsApp
            </Button>
          </motion.div>

          <BookingForm />
        </div>
      </div>
    </section>;
};
