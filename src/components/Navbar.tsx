import { Button } from "@/components/ui/button";
import { User, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
            <Link to="/" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Home</Link>
            <Link to="/courses" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Courses</Link>
            <Link to="/about" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">About Us</Link>
            <Link to="/blogs" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Blogs</Link>
            
            {/* New menu items */}
            <Link to="/parents" className="flex items-center space-x-1 text-codersbee-dark hover:text-codersbee-vivid transition-colors">
              <User className="h-4 w-4" />
              <span>Parent's Corner</span>
            </Link>
            <Link to="/showcase" className="flex items-center space-x-1 text-codersbee-dark hover:text-codersbee-vivid transition-colors">
              <Trophy className="h-4 w-4" />
              <span>Showcase</span>
            </Link>
            <Link to="/ai-corner" className="flex items-center space-x-1 text-codersbee-dark hover:text-codersbee-vivid transition-colors">
              <Sparkles className="h-4 w-4" />
              <span>AI Corner</span>
            </Link>
            
            <Button className="bg-codersbee-vivid hover:bg-codersbee-vivid/90">Book a FREE trial</Button>
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