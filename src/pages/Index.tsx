
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Features } from "@/components/Features";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { InnovationHighlight } from "@/components/InnovationHighlight";
import { SuccessStories } from "@/components/SuccessStories";
import { FAQ } from "@/components/FAQ";
import { ProblemAgitation } from "@/components/ProblemAgitation";
import { FloatingBuzzyChat } from "@/components/buzzy-ai/FloatingBuzzyChat";
import { StudentLabs } from "@/components/StudentLabs";
import { VideoTestimonial } from "@/components/VideoTestimonial";
import { EnrollHero } from "@/components/enroll/EnrollHero";
import { ValueProposition } from "@/components/enroll/ValueProposition";
import { StudentShowcase } from "@/components/enroll/StudentShowcase";
import { EnrollCTA } from "@/components/enroll/EnrollCTA";
import { ExploreMore } from "@/components/ExploreMore";
import { VisualEquation } from "@/components/VisualEquation";
import StepsToGetStarted from '@/components/StepsToGetStarted';
import WhatsIncluded from '@/components/enroll/WhatsIncluded';
import { NotReadyToEnroll } from "@/components/NotReadyToEnroll";

const Index = () => {
  const courses = [
    {
      title: "Coding for Young Explorers",
      image: "/lovable-uploads/Young.png", // Girl with Scratch programming
      ageRange: "Ages 6-9 years",
      features: [
        "Scratch & Block-based Programming",
        "Creative Storytelling with Code",
        "Basic Game Development",
        "Interactive Animations"
      ],
      backgroundColor: "bg-codersbee-yellow/30",
      altText: "Young children learning Scratch and basic coding concepts"
    },
    {
      title: "Coding for Innovators",
      image: "/lovable-uploads/Innovators.png", // Boy programming
      ageRange: "Ages 9-12 years",
      features: [
        "JavaScript & Python Fundamentals",
        "Web Development Basics",
        "Game Development with Pygame",
        "Introduction to AI & Machine Learning"
      ],
      backgroundColor: "bg-codersbee-orange/30",
      altText: "Children learning JavaScript and Python programming languages"
    },
    {
      title: "AI for Young Entrepreneurs",
      image: "/lovable-uploads/AI.png", // Multiple kids, AI/agents/business plan
      ageRange: "Ages 12+ years",
      features: [
        "Advanced Python Programming",
        "Generative AI & Machine Learning",
        "Building AI Applications",
        "Cloud Deployment & APIs"
      ],
      backgroundColor: "bg-codersbee-green/30",
      altText: "Teenagers exploring AI technology and building projects"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <VideoTestimonial />
        
        {/* Steps to Get Started */}
        <StepsToGetStarted />
        <WhatsIncluded />

        <section id="courses" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-codersbee-dark mb-4">
                Our Learning Tracks
              </h2>
              <p className="text-xl text-gray-600">
                Age-appropriate, progressive learning paths designed to take your child from beginner to advanced coder
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Section */}
        <section className="py-10 bg-gradient-to-r from-codersbee-vivid/5 to-codersbee-purple/5 mt-8">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-codersbee-dark mb-2">Need more info about a course or want to see student projects?</h3>
            <p className="text-lg text-gray-600 mb-4">Chat with us on WhatsApp for quick answers and personalized guidance.</p>
            <a
              href="https://wa.me/919996465023"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg text-lg transition"
            >
              Message Us on WhatsApp
            </a>
          </div>
        </section>

        {/* Not Ready to Enroll Section */}
        <NotReadyToEnroll />

        {/* Differentiating factors section restored after courses */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-codersbee-dark">Why Parents Choose CodersBee?</h2>
            <p className="text-lg text-gray-700 mb-8">While many platforms offer coding courses, what truly sets us apart is our commitment to delivering an exceptional learning experience. Here's why parents and students choose CodersBee:</p>
          </div>
          <WhyChooseUs />
        </section>

        <section id="testimonials" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
              What Our Parents Say
            </h2>
            <TestimonialCarousel />
          </div>
        </section>

        <FAQ />
        <VisualEquation />
      </main>
      <Footer />
      <FloatingBuzzyChat />
    </div>
  );
};

export default Index;
