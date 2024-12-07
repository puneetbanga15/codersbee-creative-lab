import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/CodersBeeLogo.png" alt="CodersBee Logo" className="h-10" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Home</a>
            <a href="#courses" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Courses</a>
            <a href="#about" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">About Us</a>
            <a href="#blogs" className="text-codersbee-dark hover:text-codersbee-vivid transition-colors">Blogs</a>
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