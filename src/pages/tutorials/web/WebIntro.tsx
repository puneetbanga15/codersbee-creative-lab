import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  InfoIcon, Code, Palette, Sparkles, 
  Layout, Globe, Lightbulb, BookOpen 
} from "lucide-react";
import { Footer } from "@/components/Footer";

const WebIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-pink-100 rounded-full mb-4">
              <Globe className="h-6 w-6 text-pink-500" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              Web Development for <span className="text-pink-500">Kids!</span> 🚀
            </h1>
            <p className="text-xl text-gray-600">Build your own amazing websites!</p>
          </div>

          <Card className="mb-8 border-2 border-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5 text-pink-500" />
                What is Web Development?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg">
                Web development is like building a digital house with three main tools:
              </p>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Code className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">HTML</h3>
                  <p className="text-sm">The building blocks</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg text-center">
                  <Palette className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                  <h3 className="font-semibold">CSS</h3>
                  <p className="text-sm">The paint and decorations</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <Sparkles className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold">JavaScript</h3>
                  <p className="text-sm">The magic that makes things move</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  <CardTitle>HTML - Building Your Website</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>My Awesome Website</title>
  </head>
  <body>
    <h1>Welcome!</h1>
    <p>This is my first website.</p>
  </body>
</html>`}</code>
                </pre>
                <p className="mt-4 text-gray-700">
                  Think of HTML tags as containers. Each container can hold text, images, or even other containers!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  <CardTitle>CSS - Making it Pretty!</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`body {
  background-color: lightblue;
  font-family: Arial;
}

h1 {
  color: purple;
  text-align: center;
}`}</code>
                </pre>
                <p className="mt-4 text-gray-700">
                  CSS is like having a magic paintbrush - you can change how anything looks!
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <CardTitle>JavaScript - Adding Magic!</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <code>{`function changeText() {
  document.getElementById("message")
    .innerHTML = "Wow, you clicked me!";
}`}</code>
              </pre>
              <Alert className="bg-yellow-50 border-yellow-200">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <AlertDescription>
                  <strong>Fun Fact:</strong> With JavaScript, you can make your website respond when visitors click, type, or move their mouse!
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
                  <h3 className="font-semibold mb-2">🎨 Design Tips:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-pink-500" />
                      Keep your design simple and clean
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-pink-500" />
                      Use colors that work well together
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">💡 Learning Tips:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Start with simple projects
                    </li>
                    <li className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Practice coding every day
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

export default WebIntro;