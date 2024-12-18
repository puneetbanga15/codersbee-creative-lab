import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-codersbee-purple/50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-codersbee-dark mb-6">
              <span className="text-codersbee-vivid">Future-Ready</span>
              <br />Coding and
              <br />AI School
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Live online 1:1 classes for kids aged 6-15
            </p>
            <Button 
              className="bg-codersbee-vivid hover:bg-codersbee-vivid/90 text-white px-8 py-6 text-lg"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book a FREE trial
            </Button>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
              alt="Online coding class illustration" 
              className="w-full max-w-lg mx-auto animate-float rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};