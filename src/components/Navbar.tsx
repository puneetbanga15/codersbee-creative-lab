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
          
          <div className="hidden md:flex items-center space-x-6">
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
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book Trial Class
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
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
                >
                  Book Trial Class
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};