import { Button } from "@/components/ui/button";
import { User, GraduationCap, BookOpen, Trophy, CheckCircle2, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919996465023', '_blank');
  };

  const handleTrialClick = () => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
  };

  const handleCoursesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#courses');
    } else {
      const coursesSection = document.getElementById('courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Mobile menu portal component
  const MobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return createPortal(
      <div className="md:hidden fixed inset-0 top-[72px] bg-white z-[9998] overflow-y-auto">
        <div className="px-6 py-4 space-y-4">
          <a 
            href="/#courses" 
            onClick={(e) => { 
              handleCoursesClick(e); 
              setIsMobileMenuOpen(false); 
            }} 
            className="block text-[#9b87f5] hover:text-[#7E69AB] py-2"
          >
            Courses
          </a>
          
          <div className="py-2 space-y-2">
            <span className="block text-[#9b87f5] font-medium">Student's Corner</span>
            <Link 
              to="/quizzes" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-[#9b87f5] hover:text-[#7E69AB] pl-4"
            >
              <div className="flex items-start gap-3 py-2">
                <CheckCircle2 className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                <div>
                  <div>Quizzes</div>
                  <div className="text-sm text-gray-500">Test your knowledge with interactive quizzes</div>
                </div>
              </div>
            </Link>
            <Link 
              to="/projects" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-[#9b87f5] hover:text-[#7E69AB] pl-4"
            >
              <div className="flex items-start gap-3 py-2">
                <Trophy className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                <div>
                  <div>Projects Gallery</div>
                  <div className="text-sm text-gray-500">Explore student projects and achievements</div>
                </div>
              </div>
            </Link>
            <Link 
              to="/tutorials" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block text-[#9b87f5] hover:text-[#7E69AB] pl-4"
            >
              <div className="flex items-start gap-3 py-2">
                <BookOpen className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                <div>
                  <div>Learning Resources</div>
                  <div className="text-sm text-gray-500">Access comprehensive learning materials</div>
                </div>
              </div>
            </Link>
          </div>
          
          <Link 
            to="/about" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block text-[#9b87f5] hover:text-[#7E69AB] py-2"
          >
            About Us
          </Link>

          <div className="pt-4 border-t border-gray-100">
            <div className="grid gap-4">
              <div className="space-y-2">
                <span className="block text-[#9b87f5] font-medium mb-2">Login Options</span>
                <Link 
                  to="/parents/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 border rounded-md text-[#9b87f5] hover:bg-[#9b87f5]/10"
                >
                  Parent Login
                </Link>
                <Link 
                  to="/teachers/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 border rounded-md text-[#9b87f5] hover:bg-[#9b87f5]/10"
                >
                  Teacher Login
                </Link>
              </div>
              
              <Button 
                variant="outline"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => { 
                  handleWhatsAppClick(); 
                  setIsMobileMenuOpen(false); 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Message on WhatsApp
              </Button>
              
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                onClick={() => { 
                  handleTrialClick(); 
                  setIsMobileMenuOpen(false); 
                }}
              >
                Book FREE Trial Now
              </Button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-[9999] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-x-2">
            <img 
              src="/lovable-uploads/96665488-c73d-4daf-a6f2-5dc7d468a820.png" 
              alt="CodersBee Logo" 
              className="h-12" 
            />
            <span className="text-xl font-semibold text-[#9b87f5]">CodersBee</span>
          </Link>

          <div className="hidden md:flex items-center gap-x-6 ml-8">
            <a href="/#courses" onClick={handleCoursesClick} className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors">
              Courses
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student's Corner
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white">
                <DropdownMenuItem className="focus:bg-[#9b87f5]/10">
                  <Link to="/buzzy-ai" className="w-full">
                    <div className="flex items-start gap-3">
                      <span className="text-[#9b87f5]">🐝</span>
                      <div>
                        <div className="font-medium text-[#1A1F2C]">Buzzy AI Tutor</div>
                        <div className="text-sm text-gray-500">Chat with our AI coding tutor</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#9b87f5]/10">
                  <Link to="/quizzes" className="w-full">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                      <div>
                        <div className="font-medium text-[#1A1F2C]">Quizzes</div>
                        <div className="text-sm text-gray-500">Test your knowledge with interactive quizzes</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#9b87f5]/10">
                  <Link to="/projects" className="w-full">
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                      <div>
                        <div className="font-medium text-[#1A1F2C]">Projects Gallery</div>
                        <div className="text-sm text-gray-500">Explore student projects and achievements</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#9b87f5]/10">
                  <Link to="/tutorials" className="w-full">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-[#9b87f5] mt-0.5" />
                      <div>
                        <div className="font-medium text-[#1A1F2C]">Learning Resources</div>
                        <div className="text-sm text-gray-500">Access comprehensive learning materials</div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/about" className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors">
              About Us
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-x-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/parents/login" className="w-full">Parent Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/teachers/login" className="w-full">Teacher Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline"
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </Button>
            
            <Button 
              size="sm"
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              onClick={handleTrialClick}
            >
              Book FREE Trial Now
            </Button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#9b87f5] p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
};
