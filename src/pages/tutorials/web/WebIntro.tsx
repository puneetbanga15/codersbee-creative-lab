import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Palette, Lightbulb, Star } from "lucide-react";

const WebIntro = () => {
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
              Web Development for Kids! <span className="text-blue-500">🌈</span>
            </h1>
            <p className="text-xl text-gray-600">Build your own amazing websites!</p>
          </div>

          <Card className="mb-8 border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-500" />
                The Building Blocks of the Web
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg mb-4">
                Web development is like building a digital house with three main tools:
                HTML (structure), CSS (style), and JavaScript (behavior)!
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Your First HTML Code:</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  {`<h1>Welcome to My Website!</h1>
<p>This is my first webpage.</p>`}
                </pre>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">What You Can Create:</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    Your own personal website
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    Interactive games and animations
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    Beautiful designs with CSS
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <Lightbulb className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Start small and build up to bigger projects!
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WebIntro;