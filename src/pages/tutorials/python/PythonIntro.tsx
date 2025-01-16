import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Code, Terminal, Variable, 
  BrainCircuit, Lightbulb, BookOpen, Rocket 
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const PythonIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <Code className="h-6 w-6 text-blue-500" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              Python for <span className="text-blue-500">Young Coders!</span> 🚀
            </h1>
            <p className="text-xl text-gray-600">Where coding meets creativity and fun!</p>
          </div>

          <Card className="mb-8 border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-blue-500" />
                Your First Python Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>print("Hello, Young Coder!")</code>
              </pre>
              <p className="mt-4 text-gray-700">
                When you run this, Python will show the message on your screen!
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Variable className="h-5 w-5 text-blue-500" />
                <CardTitle>Variables - Your Code's Memory Boxes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Variables are like labeled boxes where you can store things:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <code>{`age = 10
name = "Alex"
print("Hi! I'm " + name)
print("I am " + str(age) + " years old")`}</code>
              </pre>
              <Alert className="bg-blue-50 border-blue-200">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  <strong>Cool Trick:</strong> You can store any type of information in variables!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">🎮 Project Ideas:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-purple-500" />
                      Create a digital pet that responds to commands
                    </li>
                    <li className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-purple-500" />
                      Build a simple quiz game
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">📚 Learning Tips:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Practice typing code instead of copy-pasting
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Keep a coding journal to track what you learn
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonIntro;