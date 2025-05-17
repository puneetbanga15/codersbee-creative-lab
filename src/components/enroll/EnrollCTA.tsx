
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export const EnrollCTA = () => {
  const navigate = useNavigate();
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919996465023', '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-codersbee-purple/10 to-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
            Start Your Child's Tech Journey Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book a FREE trial class and see how our personalized approach can help your child master coding and AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enroll">
              <Button
                size="lg"
                className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
              >
                Book FREE Trial Class
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsAppClick}
              className="border-codersbee-vivid text-codersbee-vivid hover:bg-codersbee-vivid/10"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
