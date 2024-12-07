import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-codersbee-purple to-codersbee-vivid/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-codersbee-dark">
          Ready to Start Your Child's Coding Journey?
        </h2>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Book a free trial class today and watch your child transform into a future-ready innovator!
        </p>
        <Button className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white px-8 py-6 text-lg">
          Book Your FREE Trial Now
        </Button>
      </div>
    </section>
  );
};