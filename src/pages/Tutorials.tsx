import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Scratch Programming",
      description: "Learn the basics of programming with Scratch",
      link: "/tutorials/scratch/intro",
      image: "/scratch-tutorial.png"
    },
    {
      title: "Python Fundamentals",
      description: "Get started with Python programming",
      link: "/tutorials/python/intro",
      image: "/python-tutorial.png"
    },
    {
      title: "Web Development",
      description: "Create your first website with HTML and CSS",
      link: "/tutorials/web/intro",
      image: "/web-tutorial.png"
    },
    {
      title: "AI Basics",
      description: "Introduction to Artificial Intelligence",
      link: "/tutorials/ai/intro",
      image: "/ai-tutorial.png"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover rounded-lg"
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
      </div>
      <Footer />
    </div>
  );
};

export default Tutorials;