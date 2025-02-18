
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
import { VisualEquation } from "@/components/VisualEquation";
import { AnnouncementBar } from "@/components/announcement/AnnouncementBar";

const Index = () => {
  const courses = [
    {
      title: "Coding for Young Explorers",
      image: "/placeholder.svg",
      ageRange: "Recommended for 6-9 years old kids",
      features: ["Code.Org, Scratch, HTML and CSS", "Fundamentals", "Gamified", "Fun and Interactive"],
      backgroundColor: "bg-codersbee-yellow/30"
    },
    {
      title: "Coding for Innovators",
      image: "/placeholder.svg",
      ageRange: "Recommended for kids aged 9-12",
      features: ["Javascript, Python and Fundamentals of AI", "Coding Projects", "Real world problems", "Gen AI Creativity"],
      backgroundColor: "bg-codersbee-orange/30"
    },
    {
      title: "AI for Budding Entrepreneurs",
      image: "/placeholder.svg",
      ageRange: "Recommended for kids aged 12 and above",
      features: ["Generative AI - From basics to advanced", "AI Projects", "OpenAI APIs", "Cloud Hosting"],
      backgroundColor: "bg-codersbee-green/30"
    },
  ];

  return (
    <div className="min-h-screen pt-[110px]">
      <Navbar />
      <AnnouncementBar />
      <Hero />
      <ProblemAgitation />
      <InnovationHighlight />
      <SuccessStories />

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-codersbee-dark">
            Ready to Start Your Child's AI Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We've crafted specialized learning tracks that adapt to your child's age and skill level. 
            Each track is designed to nurture their creativity while building strong foundations in coding and AI.
            Let's explore the perfect path for your child:
          </p>
        </div>
      </section>

      <section id="courses" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-codersbee-dark">
            Learning Tracks Offered By Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-codersbee-purple/10">
        <div className="container mx-auto px-4 text-center mb-8">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While many platforms offer coding courses, what truly sets us apart is our commitment to delivering an exceptional learning experience.
            Here's why parents and students choose CodersBee:
          </p>
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
      <Footer />
    </div>
  );
};

export default Index;
