
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export const Hero = () => {
  return <div className="relative min-h-[90vh] overflow-hidden pt-16 md:pt-24">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF]/80 via-white/60 to-white/80 md:backdrop-blur-[2px] z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 md:opacity-100 md:aspect-auto aspect-[9/16] md:object-center object-[20%_50%]">
          <source src="https://jjshsfsmgbrhypotcwvx.supabase.co/storage/v1/object/public/media/replicate-prediction-2f3wjhj71srmc0cmmteaqgzjhc.mp4?t=2025-01-27T09%3A20%3A36.002Z" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#1A1F2C] mb-6 md:mb-8 leading-tight hero-heading md:text-7xl">
              1:1 Live Classes Where Kids Build
              <br />Coding and AI Projects
              <br /><span className="text-[#9b87f5]">From Day 1</span>
            </h1>
            <p className="text-sm md:text-2xl mb-8 md:mb-12 text-[#403E43] max-w-3xl mx-auto px-4 md:px-0 hero-body">
              As AI reshapes careers, equip your child with creative problem-solving, coding, and AI fluency with help from our expert teachers.
            </p>
            
            {/* Primary CTA */}
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 md:px-0">
              <Link to="/enroll">
                <Button 
                  className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative" 
                >
                  Build Your First AI Project{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                </Button>
              </Link>
              
              {/* Social Proof */}
              <div className="mt-4 flex flex-col items-center space-y-2">
                <div className="bg-[#1A1F2C]/5 rounded-full px-4 py-1 flex items-center gap-2">
                  <span className="flex -space-x-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </span>
                  <p className="text-[#1A1F2C] text-sm font-medium">
                    Free Trial • Limited Spots
                  </p>
                </div>
                <p className="text-[#403E43] text-xs md:text-sm">
                  100+ Kids Already Building Amazing Projects
                </p>
              </div>
            </div>
            
            {/* Trust Elements */}
            <div className="mt-12 space-y-6">
              {/* Trust Badges */}
              <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-[#9b87f5]/20 shadow-sm">
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-[#1A1F2C] font-medium text-base md:text-lg">
                    🎓 US Certified Educators with 20+ Years Experience
                  </p>
                  <p className="text-[#1A1F2C] font-medium text-base md:text-lg">
                    👥 Small Classes → Personalized Learning
                  </p>
                </div>
              </div>
              
              {/* Student Success Story */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-[#1A1F2C] hover:text-[#9b87f5] transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base mx-auto">
                    <span>▶️</span> See how Shuvam (12) built his first AI app
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>;
};
