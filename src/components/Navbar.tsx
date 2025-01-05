import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919996465023', '_blank');
  };

  const handleTrialClick = () => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/b50fbc0a-2707-4d3e-867a-240d788493a0.png" 
                alt="CodersBee Logo" 
                className="h-12" 
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="/#courses" className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors">Courses</a>
            <Link to="/about" className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors">About Us</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </Button>
            
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              onClick={handleTrialClick}
            >
              Book FREE Trial Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#9b87f5] p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4">
                <a href="/#courses" className="block text-[#9b87f5] hover:text-[#7E69AB]">Courses</a>
                <Link to="/about" className="block text-[#9b87f5] hover:text-[#7E69AB]">About Us</Link>
                <Link to="/parents/login" className="block text-[#9b87f5] hover:text-[#7E69AB]">Parent Login</Link>
                <Link to="/teachers/login" className="block text-[#9b87f5] hover:text-[#7E69AB]">Teacher Login</Link>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleWhatsAppClick}
                >
                  Message on WhatsApp
                </Button>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={handleTrialClick}
                >
                  Book FREE Trial Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};