import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Facebook, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    content: "Our 11-year-old son has been taking coding lessons with Manisha and we are pleased with the progress he's making. They have a good approach to introducing coding concepts, making them understandable at a young age. We appreciate Manisha's efforts in helping our son learn to code. The coding projects assigned are not only fun but also incredibly educational. They challenge our son to think critically and apply what he's learned in a hands-on way. It's a joy to see him so enthusiastic about his accomplishments and to watch his skills grow week by week. We highly recommend Manisha and CodersBee to any parent looking to give their child a head start in the world of coding and technology.",
    author: "Shruti Rao",
    rating: 5
  },
  {
    content: "Amazing Amazing teacher!! Manisha does a great job in grabbing the attention of the student and makes coding fun… my daughter has been learning coding from her and is really involved in coding now.",
    author: "Deepthi Renati",
    rating: 5
  },
  {
    content: "Highly recommend Manisha as an exceptional teacher for children to learn coding. She is soft spoken, gentle and understands her students individual needs.",
    author: "Aradhana Vineeth",
    rating: 5
  }
];

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="flex mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{testimonials[current].content}</p>
            <p className="font-semibold text-codersbee-dark">— {testimonials[current].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-codersbee-dark" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-codersbee-dark" />
      </button>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.open('https://www.facebook.com/CodersBee/reviews', '_blank')}
        >
          <Facebook className="w-4 h-4" />
          Check out more 5-star reviews on Facebook
        </Button>
      </div>
    </div>
  );
};