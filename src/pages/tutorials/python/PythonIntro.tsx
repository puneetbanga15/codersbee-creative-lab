import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Terminal, Lightbulb, Star } from "lucide-react";

const PythonIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <Code className="h-6 w-6 text-green-500" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              Python for Young Coders! <span className="text-green-500">🚀</span>
            </h1>
            <p className="text-xl text-gray-600">Where coding meets creativity and fun!</p>
          </div>

          <Card className="mb-8 border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-green-500" />
                Getting Started with Python
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg mb-4">
                Python is like having a robot friend who does exactly what you tell it to do! 
                It's one of the easiest programming languages to learn because it uses simple English-like words.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Your First Python Program:</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  print("Hello, Young Coder!")
                </pre>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Fun Things You Can Do with Python:</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-500" />
                    Create your own games and animations
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-500" />
                    Build calculators and problem solvers
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-500" />
                    Make art with code
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <Lightbulb className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <strong>Remember:</strong> The best way to learn Python is by trying things out yourself!
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonIntro;