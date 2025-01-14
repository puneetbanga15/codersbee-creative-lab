import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const Resources = () => {
  const resources = {
    "Scratch": [
      { title: "Introduction to Scratch", description: "Learn the basics of Scratch programming", locked: false },
      { title: "Game Development with Scratch", description: "Create your first game using Scratch", locked: false },
      { title: "Advanced Scratch Projects", description: "Complex projects and animations", locked: true }
    ],
    "HTML and CSS": [
      { title: "HTML Fundamentals", description: "Basic structure and elements", locked: false },
      { title: "CSS Styling", description: "Make your websites beautiful", locked: false },
      { title: "Responsive Design", description: "Advanced layouts and media queries", locked: true }
    ],
    "JavaScript": [
      { title: "JavaScript Basics", description: "Variables, functions, and control flow", locked: false },
      { title: "DOM Manipulation", description: "Interact with web pages", locked: true },
      { title: "Advanced JavaScript", description: "Objects, classes, and modern features", locked: true }
    ],
    "Cloud and Hosting": [
      { title: "Introduction to Cloud", description: "Understanding cloud computing", locked: false },
      { title: "Website Deployment", description: "Host your first website", locked: true }
    ],
    "Generative AI": [
      { title: "AI Basics", description: "Understanding AI and its applications", locked: false },
      { title: "ChatGPT Integration", description: "Building with AI APIs", locked: true },
      { title: "Advanced AI Projects", description: "Complex AI implementations", locked: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-codersbee-dark">
          Learning <span className="text-codersbee-vivid">Resources</span>
        </h1>
        
        <div className="space-y-8">
          {Object.entries(resources).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 text-codersbee-dark">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        {item.locked && <Lock className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {item.locked ? (
                        <p className="text-sm text-yellow-600">
                          This content is available for enrolled students
                        </p>
                      ) : (
                        <p className="text-sm text-green-600">
                          Free access
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;