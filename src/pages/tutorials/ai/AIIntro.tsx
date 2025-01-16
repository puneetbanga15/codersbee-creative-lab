import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BrainCircuit, Bot, Sparkles, Camera, 
  MessageSquare, Lightbulb, Shield, Rocket
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const AIIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-violet-100 rounded-full mb-4">
              <BrainCircuit className="h-6 w-6 text-violet-500" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              AI Adventures: Your Guide to <span className="text-violet-500">Artificial Intelligence!</span> 🚀
            </h1>
            <p className="text-xl text-gray-600">Discover the amazing world of AI and how it shapes our future!</p>
          </div>

          <Card className="mb-8 border-2 border-violet-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-violet-500" />
                What is Artificial Intelligence?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg">
                Imagine teaching a computer to think and learn, just like you do! That's what AI is all about. 
                It's like giving computers a super-smart brain that can:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-violet-500" />
                  Recognize pictures and faces 🖼️
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-violet-500" />
                  Understand and speak languages 🗣️
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Create art and music 🎨
                </li>
              </ul>
              
              <Alert className="my-4 bg-violet-50 border-violet-200">
                <Lightbulb className="h-4 w-4 text-violet-500" />
                <AlertDescription>
                  <strong>Fun Fact:</strong> The term "Artificial Intelligence" was first used in 1956 - 
                  that's before your parents were born!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-violet-500" />
                <CardTitle>AI Safety and Ethics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4">Important Things to Remember:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-violet-500" />
                  Always have a grown-up help you when using AI tools
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-violet-500" />
                  Don't share personal information with AI
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-violet-500" />
                  Remember that AI can make mistakes
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-violet-500" />
                <CardTitle>The Future of AI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Amazing Things AI Might Do in the Future:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Help solve big world problems like climate change
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Create new medicines to help sick people
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Make school learning more fun and personal
                </li>
              </ul>
              <Alert className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50">
                <Lightbulb className="h-4 w-4 text-violet-500" />
                <AlertDescription>
                  <strong>Remember:</strong> You might be the one who creates these amazing AI tools in the future!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIIntro;
