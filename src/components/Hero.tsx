import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E5DEFF]/90 to-white/95 backdrop-blur-sm z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://jjshsfsmgbrhypotcwvx.supabase.co/storage/v1/object/public/media/replicate-prediction-2f3wjhj71srmc0cmmteaqgzjhc.mp4?t=2025-01-27T09%3A20%3A36.002Z" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium inline-block">
                Don't let your child fall behind in the AI revolution
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#1A1F2C] mb-8 leading-tight">
              Ready to Start Your
              <br />Child's Coding and
              <br /><span className="text-[#9b87f5]">AI Journey?</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-[#403E43] max-w-3xl mx-auto">
              While AI is transforming the world at lightning speed, give your child the edge they need. 
              Start their journey with personalized 1:1 classes.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#9b87f5]/10 p-8 rounded-xl mb-8 backdrop-blur-sm border border-[#9b87f5]/20 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A1F2C] mb-2">
                  Watch How Your Child Can Build Their First Coding and AI Projects in 7 Days
                </h2>
                <p className="text-xl text-[#403E43]/90">(Free Trial Included)</p>
              </div>
              
              <Button 
                className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
              >
                Start Today with a Free Trial
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-gray-600 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Trusted by 100s of Parents</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI curriculum prepared by top AI researchers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};