import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Python, Code, Terminal, Variable, 
  BrainCircuit, Lightbulb, BookOpen, Sparkles 
} from "lucide-react";
import { Footer } from "@/components/Footer";

const PythonIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <Python className="h-6 w-6 text-blue-500" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              Python for <span className="text-blue-500">Young Coders!</span> 🚀
            </h1>
            <p className="text-xl text-gray-600">Where coding meets creativity and fun!</p>
          </div>

          <Card className="mb-8 border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                Welcome to Python!
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg">
                Python is like having a robot friend who does exactly what you tell it to do! 
                It's one of the easiest programming languages to learn because it uses simple English-like words.
              </p>
              
              <Alert className="my-4 bg-blue-50 border-blue-200">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  <strong>Fun Fact:</strong> Python is named after the TV show "Monty Python," not the snake! 
                  Though we still use a snake as its symbol. 🐍
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-500" />
                  <CardTitle>Your First Python Program</CardTitle>
                </div>
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

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Variable className="h-5 w-5 text-purple-500" />
                  <CardTitle>Variables - Code's Memory Boxes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`age = 10
name = "Alex"
print("Hi! I'm " + name)`}</code>
                </pre>
                <p className="mt-4 text-gray-700">
                  Variables are like labeled boxes where you can store things!
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-pink-500" />
                <CardTitle>Making Decisions with If Statements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <code>{`temperature = 30
if temperature > 25:
    print("It's hot! Get some ice cream! 🍦")
else:
    print("It's cool! Maybe hot chocolate? ☕")`}</code>
              </pre>
              <Alert className="bg-yellow-50 border-yellow-200">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <AlertDescription>
                  <strong>Cool Trick:</strong> You can use if statements to make your program respond differently based on conditions!
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
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Create a digital pet that responds to commands
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Build a simple quiz game
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🎯 Tips for Success:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Type code carefully - spelling matters!
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Save your code often
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