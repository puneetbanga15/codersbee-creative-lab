import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF]/80 via-white/60 to-white/80 md:backdrop-blur-[2px] z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80 md:opacity-100 md:aspect-auto aspect-[9/16] md:object-center object-[20%_50%]"
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
              <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium inline-block">
                Empower Your Child to Lead the AI Revolution
              </span>
            </div>
            <h1 className="text-3xl md:text-7xl font-bold text-[#1A1F2C] mb-6 md:mb-8 leading-tight hero-heading">
              1:1 Live Classes Where Kids Build
              <br />Coding and AI Projects
              <br /><span className="text-[#9b87f5]">From Day 1</span>
            </h1>
            <p className="text-sm md:text-2xl mb-8 md:mb-12 text-[#403E43] max-w-3xl mx-auto px-4 md:px-0 hero-body">
              As AI reshapes careers, equip your child with future-proof skills: creative problem-solving, coding, and AI fluency. 
              Our certified trainers guide them step-by-step in live sessions.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-2xl mx-auto px-4 md:px-0">
              {/* Video Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full md:w-auto bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <span>▶️</span> Watch Shuvam (12) Build an AI App →
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/vmgCTuT7slg"
                    title="Student AI Project Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </DialogContent>
              </Dialog>

              <Button 
                className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
              >
                Free Trial → Join 100+ Coders
              </Button>
            </div>
            
            {/* Trust Elements */}
            <div className="mt-8 md:mt-12 flex flex-col items-center space-y-3 md:space-y-4 px-4 md:px-0">
              <div className="bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full border border-[#9b87f5]/20 shadow-sm">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-[#1A1F2C] font-medium text-xs md:text-base trust-badge">
                    🎓 US Certified Educators
                  </p>
                  <p className="text-[#1A1F2C] font-medium text-xs md:text-base trust-badge">
                    AI Curriculum by Industry Experts with 20+ Years Experience
                  </p>
                </div>
              </div>
              <p className="text-[#403E43] font-medium text-xs md:text-base trust-badge">
                👥 Small Classes → Personalized Learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};