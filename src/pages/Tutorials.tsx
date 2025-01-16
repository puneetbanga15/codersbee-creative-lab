import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock } from "lucide-react";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Scratch Programming",
      description: "Learn the basics of programming with Scratch",
      link: "/tutorials/scratch/intro",
      image: "/lovable-uploads/c1e84c5f-12aa-4831-a887-a6b604413634.png",
      isAvailable: true
    },
    {
      title: "Python Fundamentals",
      description: "Get started with Python programming",
      link: "/tutorials/python/intro",
      image: "/lovable-uploads/46805c37-e644-4a18-b088-33f4ba8edc10.png",
      isAvailable: true
    },
    {
      title: "Web Development",
      description: "Create your first website with HTML and CSS",
      link: "/tutorials/web/intro",
      image: "/lovable-uploads/b37583a8-ad04-4359-b609-3e1d79a7097c.png",
      isAvailable: true
    },
    {
      title: "AI Basics",
      description: "Introduction to Artificial Intelligence",
      link: "/tutorials/ai/intro",
      image: "/lovable-uploads/5fc57204-8f93-46fc-8741-f12cb6e4069b.png",
      isAvailable: true
    }
  ];

  const premiumTutorials = [
    {
      title: "Game Development with Scratch",
      description: "Learn to create your first game using Scratch",
      category: "Advanced Scratch"
    },
    {
      title: "CSS Styling",
      description: "Make your websites beautiful with CSS",
      category: "Web Development"
    },
    {
      title: "Python Games",
      description: "Create interactive games with Python",
      category: "Python Advanced"
    },
    {
      title: "ChatGPT Integration",
      description: "Build AI-powered applications",
      category: "AI Projects"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-codersbee-dark">
            Learning <span className="text-codersbee-vivid">Resources</span>
          </h1>
          <p className="text-lg text-gray-700">
            Access our comprehensive collection of tutorials and learning materials.
            These resources are designed to help you master programming concepts at your own pace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 mb-4">{tutorial.description}</p>
                <Link to={tutorial.link}>
                  <Button className="w-full bg-codersbee-vivid hover:bg-codersbee-vivid/90">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Content Section */}
        <div className="mt-20">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-codersbee-dark">
                Premium Content
              </h2>
            </div>
            <p className="text-lg text-gray-700">
              Exclusive advanced tutorials available for enrolled students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {premiumTutorials.map((tutorial, index) => (
              <Card key={index} className="bg-gray-50 border-dashed">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-500">{tutorial.title}</CardTitle>
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {tutorial.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">{tutorial.description}</p>
                  <div className="text-sm text-amber-600">
                    This content is available for enrolled students
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorials;