import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-[#E5DEFF] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-6">
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium inline-block">
                Don't let your child fall behind in the AI revolution
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A1F2C] mb-6">
              Ready to Start Your
              <br />Child's Coding and
              <br /><span className="text-[#9b87f5]">AI Journey?</span>
            </h1>
            <p className="text-xl mb-8 text-[#403E43] max-w-2xl">
              While AI is transforming the world at lightning speed, give your child the edge they need. 
              Start their journey with personalized 1:1 classes.
            </p>
            <div className="max-w-xl mx-auto md:mx-0">
              <div className="bg-[#9b87f5]/20 p-8 rounded-xl mb-6 text-xl font-semibold text-[#1A1F2C] shadow-lg">
                Watch How Your Child Can Build Their First Coding and AI Projects in 7 Days
                <span className="block text-lg mt-2 opacity-90 font-medium">(Free Trial Included)</span>
              </div>
              <Button 
                className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
              >
                Start Today with a Free Trial
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-gray-600 flex items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Trusted by 100s of Parents</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI curriculum prepared by top AI researchers</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 md:flex-[2] relative">
            <div className="rounded-2xl overflow-hidden border-4 border-[#9b87f5]/30 shadow-2xl">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover rounded-xl"
              >
                <source 
                  src="https://jjshsfsmgbrhypotcwvx.supabase.co/storage/v1/object/public/media/replicate-prediction-2f3wjhj71srmc0cmmteaqgzjhc.mp4?t=2025-01-27T09%3A20%3A36.002Z" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};