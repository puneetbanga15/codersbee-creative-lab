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
    "Coding for Young Explorers": "Fundamentals of web, Gamified for easier grasping",
    "Advanced Coding for Innovators": "Javascript, Python and Fundamentals of AI",
    "AI for Budding Entrepreneurs": "Generative AI - From basics to advanced"
  };

  const courseImages = {
    "Coding for Young Explorers": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    "Advanced Coding for Innovators": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "AI for Budding Entrepreneurs": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <Card className={`${backgroundColor} border-none shadow-lg hover:shadow-xl transition-shadow`}>
      <CardHeader>
        <img 
          src={courseImages[title as keyof typeof courseImages] || image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-lg shadow-md" 
        />
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <p className="text-sm text-gray-600">{ageRange}</p>
        <p className="text-sm text-gray-700 mt-2">{courseDescriptions[title as keyof typeof courseDescriptions]}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
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