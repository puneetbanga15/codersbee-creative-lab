import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  image: string;
  ageRange: string;
  features: string[];
  backgroundColor: string;
}

export const CourseCard = ({ title, image, ageRange, features, backgroundColor }: CourseCardProps) => {
  const courseDescriptions = {
    "Coding for Young Explorers": "Start your coding journey with fun and interactive lessons. Learn the basics of programming through games and creative projects. Perfect for beginners who want to explore the world of coding.",
    "Advanced Coding for Innovators": "Take your coding skills to the next level with real-world projects. Learn popular programming languages and start building your own applications with AI integration.",
    "AI for Budding Entrepreneurs": "Master the latest AI tools and technologies. Create innovative solutions using generative AI, and learn how to build and deploy AI-powered applications."
  };

  const courseImages = {
    "Coding for Young Explorers": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    "Advanced Coding for Innovators": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "AI for Budding Entrepreneurs": "/lovable-uploads/ddcd2e4f-55b3-41aa-b1b2-26b416244488.png"
  };

  return (
    <Card className={`${backgroundColor} border-none shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col`}>
      <CardHeader>
        <img 
          src={courseImages[title as keyof typeof courseImages] || image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-lg shadow-md" 
        />
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <p className="text-sm text-gray-600">{ageRange}</p>
        <p className="text-sm text-gray-700 mt-2 min-h-[80px]">{courseDescriptions[title as keyof typeof courseDescriptions]}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90"
          onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
        >
          Join Course
        </Button>
      </CardFooter>
    </Card>
  );
};