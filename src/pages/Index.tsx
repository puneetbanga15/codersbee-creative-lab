import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { Features } from "@/components/Features";
import { Testimonial } from "@/components/Testimonial";

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

  const testimonials = [
    {
      content: "Amazing Amazing teacher!! Manisha does a great job in grabbing the attention of the student and makes coding fun… my daughter has been learning coding from her and is really involved in coding now.",
      author: "Deepthi Renati",
      rating: 5,
    },
    {
      content: "Highly recommend Manisha as an exceptional teacher for children to learn coding. She is soft spoken, gentle and understands her students individual needs.",
      author: "Aradhana Vineeth",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Features />
        </div>
      </section>

      <section id="courses" className="py-20 bg-codersbee-purple/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Learning Tracks Offered By Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;