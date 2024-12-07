import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";

const Courses = () => {
  const courses = [
    {
      title: "Coding for Young Explorers",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      ageRange: "Recommended for 6-9 years old kids",
      features: ["Code.Org, Scratch, HTML and CSS", "Fundamentals", "Gamified", "Fun and Interactive"],
      backgroundColor: "bg-codersbee-yellow/30",
    },
    {
      title: "Advanced Coding for Innovators",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      ageRange: "Recommended for kids aged 9-12",
      features: ["Javascript, Python and Fundamentals of AI", "Coding Projects", "Real world problems", "Gen AI Creativity"],
      backgroundColor: "bg-codersbee-orange/30",
    },
    {
      title: "AI for Budding Entrepreneurs",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      ageRange: "Recommended for kids aged 12 and above",
      features: ["Generative AI - From basics to advanced", "AI Projects", "OpenAI APIs", "Cloud Hosting"],
      backgroundColor: "bg-codersbee-green/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-codersbee-dark">
          Our <span className="text-codersbee-vivid">Learning Tracks</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;