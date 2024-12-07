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
  return (
    <Card className={`${backgroundColor} border-none shadow-lg hover:shadow-xl transition-shadow`}>
      <CardHeader>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <p className="text-sm text-gray-600">{ageRange}</p>
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
        <Button className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90">
          Join Course
        </Button>
      </CardFooter>
    </Card>
  );
};