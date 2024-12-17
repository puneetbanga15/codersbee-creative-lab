import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Features } from "@/components/Features";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CTASection } from "@/components/CTASection";
import { Stats } from "@/components/Stats";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

const Index = () => {
  const courses = [
    {
      title: "Coding for Young Explorers",
      image: "/placeholder.svg",
      ageRange: "Recommended for 6-9 years old kids",
      features: ["Code.Org, Scratch, HTML and CSS", "Fundamentals", "Gamified", "Fun and Interactive"],
      backgroundColor: "bg-codersbee-yellow/30",
    },
    {
      title: "Advanced Coding for Innovators",
      image: "/placeholder.svg",
      ageRange: "Recommended for kids aged 9-12",
      features: ["Javascript, Python and Fundamentals of AI", "Coding Projects", "Real world problems", "Gen AI Creativity"],
      backgroundColor: "bg-codersbee-orange/30",
    },
    {
      title: "AI for Budding Entrepreneurs",
      image: "/placeholder.svg",
      ageRange: "Recommended for kids aged 12 and above",
      features: ["Generative AI - From basics to advanced", "AI Projects", "OpenAI APIs", "Cloud Hosting"],
      backgroundColor: "bg-codersbee-green/30",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="stats" className="py-16 bg-white">
        <Stats />
      </section>

      <section id="features" className="py-20 bg-gradient-to-b from-white to-codersbee-purple/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
            Why Choose <span className="text-codersbee-vivid">CodersBee</span>?
          </h2>
          <Features />
        </div>
      </section>

      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
            Learning Tracks Offered By Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-codersbee-purple/10">
        <WhyChooseUs />
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
            What Our Parents Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Index;