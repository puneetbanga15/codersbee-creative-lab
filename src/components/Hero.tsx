import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-codersbee-purple/50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-6">
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium">
                Don't let your child fall behind in the AI revolution
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-codersbee-dark mb-6">
              <span className="text-codersbee-vivid">Future-Ready</span>
              <br />Coding and
              <br />AI School
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              While AI is transforming the world at lightning speed, give your child the edge they need. 
              Start their journey with personalized 1:1 classes.
            </p>
            <Button 
              className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white px-8 py-6 text-lg"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book Trial Class Now
            </Button>
          </div>
          <div className="flex-1">
            <img 
              src="/lovable-uploads/dabdc79c-f6b3-47c9-b182-6a42ba5264b6.png" 
              alt="Student learning coding" 
              className="w-full max-w-lg mx-auto animate-float rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};