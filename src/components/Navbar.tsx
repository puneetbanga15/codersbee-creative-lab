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
import { Trophy, BookOpen, GraduationCap, Star } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800">
              CodersBee
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
            <Link to="/parents">
              <Button variant="outline">Parent Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};