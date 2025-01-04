import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  title: string;
  image: string;
  ageRange: string;
  features: string[];
  backgroundColor: string;
  showArrow?: boolean;
}

export const CourseCard = ({ title, image, ageRange, features, backgroundColor, showArrow = false }: CourseCardProps) => {
  const courseDescriptions = {
    "Coding for Young Explorers": "Start your coding journey with fun and interactive lessons. Learn the basics of programming through games and creative projects. Perfect for beginners who want to explore the world of coding.",
    "Coding for Innovators": "Take your coding skills to the next level with real-world projects. Learn popular programming languages and start building your own applications with AI integration.",
    "AI for Budding Entrepreneurs": "Master the latest AI tools and technologies. Create innovative solutions using generative AI, and learn how to build and deploy AI-powered applications."
  };

  const courseImages = {
    "Coding for Young Explorers": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    "Coding for Innovators": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "AI for Budding Entrepreneurs": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="relative">
      <Card className={`${backgroundColor} border-none shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col`}>
        <CardHeader>
          <img 
            src={courseImages[title as keyof typeof courseImages] || image} 
            alt={title} 
            className="w-full h-48 object-cover rounded-lg shadow-md" 
          />
          <CardTitle className="text-xl mt-4">{title}</CardTitle>
          <p className="text-sm text-[#8E9196]">{ageRange}</p>
          <p className="text-sm text-[#403E43] mt-2 min-h-[80px]">{courseDescriptions[title as keyof typeof courseDescriptions]}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-[#403E43]">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
            onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
          >
            Join Course
          </Button>
        </CardFooter>
      </Card>
      {showArrow && (
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
          <ArrowRight className="w-8 h-8 text-codersbee-vivid animate-pulse" />
        </div>
      )}
    </div>
  );
};