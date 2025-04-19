
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BuzzyAnimation } from '../ai-lab/ui/BuzzyAnimation';

export const StudentShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-codersbee-purple/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-codersbee-dark mb-4">
            Meet Our Student's AI Creation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our students are building amazing AI projects. Meet Buzzy, an AI assistant created by one of our students!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center"
          >
            <BuzzyAnimation 
              state="excited" 
              size="lg" 
              className="w-48 h-48 md:w-64 md:h-64"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-codersbee-dark">
              From Learning to Creating: The Buzzy Story
            </h3>
            <p className="text-gray-600">
              One of our students created Buzzy, an intelligent AI assistant that helps other kids learn coding and AI concepts. This is just one example of what your child can achieve with CodersBee.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Built using OpenAI's latest models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Interactive and engaging learning experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Real-world AI application</span>
              </div>
            </div>
            <Button
              onClick={() => window.location.href = '/buzzy-ai'}
              className="inline-flex items-center gap-2"
            >
              Try Buzzy Now
              <ExternalLink className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
