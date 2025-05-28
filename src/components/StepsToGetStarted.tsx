import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, UserCheck, Video, ArrowRight } from 'lucide-react';

export const StepsToGetStarted = () => {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8 text-codersbee-vivid" />,
      title: "1. Book Your Free Trial",
      description: "Schedule a free trial class at your convenience"
    },
    {
      icon: <Video className="w-8 h-8 text-codersbee-orange" />,
      title: "2. Attend First Class",
      description: "Join the live online session with our expert instructor"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-codersbee-green" />,
      title: "3. Get Personalized Plan",
      description: "Receive a customized learning path for your child"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-codersbee-purple" />,
      title: "4. Start Learning",
      description: "Begin the exciting journey of coding and AI"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-codersbee-purple/5 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
            Steps to Get Started
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Begin your child's coding journey in just a few simple steps
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-codersbee-vivid/20 via-codersbee-orange/20 to-codersbee-purple/20 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  transform: `scale(${1 + index * 0.02})`,
                  marginTop: `${index * 8}px`
                }}
              >
                <motion.div
                  className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-codersbee-purple/10 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-codersbee-vivid to-codersbee-purple text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    Step {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-codersbee-vivid/10 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 hover:bg-codersbee-vivid/15">
                    {React.cloneElement(step.icon, { className: 'w-8 h-8 text-codersbee-vivid' })}
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    {index === 0 ? (
                      <a href="/enroll" className="text-codersbee-vivid hover:underline focus:underline transition-colors">
                        {step.title}
                      </a>
                    ) : step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </motion.div>
                {/* Animated arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className={
                    `hidden lg:block absolute top-1/2 transform -translate-y-1/2 z-10 ` +
                    (index === 1 ? 'right-[-20px]' : index === 2 ? 'right-[-24px]' : 'right-[-32px]')
                  }>
                    <ArrowRight className="h-7 w-7 text-codersbee-vivid/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsToGetStarted;
