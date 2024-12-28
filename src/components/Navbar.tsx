import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src="/CodersBeeLogo.png" alt="CodersBee Logo" className="h-10" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/#courses" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Courses</a>
            <Link to="/about" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">About Us</Link>
            
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
                  <Link to="/parents/login" className="w-full">Teacher Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              className="bg-codersbee-vivid hover:bg-codersbee-vivid/90"
              onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
            >
              Book Trial Class
            </Button>
          </div>
          
          <button className="md:hidden text-codersbee-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};