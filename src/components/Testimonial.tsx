import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  content: string;
  author: string;
  rating: number;
}

export const Testimonial = ({ content, author, rating }: TestimonialProps) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
        <p className="text-gray-700 mb-4">{content}</p>
        <p className="font-semibold text-codersbee-dark">— {author}</p>
      </CardContent>
    </Card>
  );
};