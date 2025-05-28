import { motion } from 'framer-motion';

export const VideoTestimonial = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
            Hear From Our Students
          </h2>
          <p className="text-lg text-gray-600">
            See how our students are building amazing projects and developing valuable skills
          </p>
        </div>
        
        <motion.div 
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* TV Frame */}
          <div className="bg-black rounded-xl rounded-b-none overflow-hidden shadow-2xl">
            <div className="relative pt-[56.25%] bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/jxlI-30FJQ8?modestbranding=1&rel=0"
                  title="Student Testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* TV Screen Effect */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.1) 100%)',
                mixBlendMode: 'overlay'
              }} />
            </div>
          </div>
          
          {/* TV Stand */}
          <div className="relative">
            {/* TV Neck */}
            <div className="h-8 w-24 mx-auto bg-gradient-to-b from-gray-300 to-gray-400"></div>
            {/* TV Base */}
            <div className="h-4 w-48 mx-auto bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg"></div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto italic">
              "I have already participated in 5 AI hackathons and gearing up to pitch my startup to silicon valley investors, thanks to CodersBee"
            </p>
            <p className="mt-2 font-medium text-codersbee-dark">
              - Shuvam, 12 years old
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
