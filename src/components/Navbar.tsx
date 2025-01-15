import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Trophy, BookOpen, GraduationCap, Star, Facebook } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917087884023', '_blank');
  };

  const handleTrialClick = () => {
    window.open('https://calendly.com/codersbee/class-slot', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://facebook.com/codersbee', '_blank');
  };

  return (
    <nav className="bg-white border-b fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b50fbc0a-2707-4d3e-867a-240d788493a0.png" 
                alt="CodersBee Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-800">CodersBee</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={isActive("/") ? "text-blue-600" : ""}
                  >
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-[250px] bg-white rounded-lg shadow-lg">
                      <Link
                        to="/"
                        className="block p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Homepage
                      </Link>
                      <Link
                        to="/about-us"
                        className="block p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        About Us
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={
                      ["/quizzes", "/projects", "/resources"].some((path) =>
                        isActive(path)
                      )
                        ? "text-blue-600"
                        : ""
                    }
                  >
                    Student's Corner
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6 w-[400px] bg-white rounded-lg shadow-lg">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/quizzes" 
                          className="block p-4 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="flex items-center">
                            <Trophy className="w-5 h-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium">
                                Quizzes
                                <Star className="w-4 h-4 text-yellow-500 ml-2 inline-block" />
                              </div>
                              <div className="text-xs text-gray-500">
                                Test your knowledge with interactive quizzes
                              </div>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link 
                          to="/projects" 
                          className="block p-4 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="flex items-center">
                            <BookOpen className="w-5 h-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium">Projects Gallery</div>
                              <div className="text-xs text-gray-500">
                                Explore student projects and achievements
                              </div>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link 
                          to="/resources" 
                          className="block p-4 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="flex items-center">
                            <GraduationCap className="w-5 h-5 text-[#9b87f5] mr-3 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium">Learning Resources</div>
                              <div className="text-xs text-gray-500">
                                Access educational materials and guides
                              </div>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={isActive("/courses") ? "text-blue-600" : ""}
                  >
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-[250px] bg-white rounded-lg shadow-lg">
                      <Link
                        to="/courses"
                        className="block p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        All Courses
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleFacebookClick}
            >
              <Facebook className="h-4 w-4" />
              Message on Facebook
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Message on WhatsApp
            </Button>
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              onClick={handleTrialClick}
            >
              Book Trial Class
            </Button>
            <Link to="/parents">
              <Button variant="outline">Parent Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};