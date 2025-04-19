
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnrollHero } from "@/components/enroll/EnrollHero";
import { ValueProposition } from "@/components/enroll/ValueProposition";
import { StudentShowcase } from "@/components/enroll/StudentShowcase";
import { SuccessStories } from "@/components/SuccessStories";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { EnrollCTA } from "@/components/enroll/EnrollCTA";

const Enroll = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-20">
        <EnrollHero />
        <ValueProposition />
        <StudentShowcase />
        <SuccessStories />
        <TestimonialCarousel />
        <EnrollCTA />
      </div>
    </div>
  );
};

export default Enroll;
