import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BrainCircuit, Robot, Sparkles, Camera, 
  MessageSquare, Lightbulb, Shield, Rocket
} from "lucide-react";
import { Footer } from "@/components/Footer";

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
                <Robot className="h-5 w-5 text-violet-500" />
                What is Artificial Intelligence?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg">
                Imagine teaching a computer to think and learn, just like you do! That's what AI is all about.
                It's like giving computers a super-smart brain that can:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
                  <Camera className="h-5 w-5 text-violet-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Computer Vision</h3>
                    <p className="text-sm text-gray-600">Recognizes pictures and faces</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-violet-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Language Processing</h3>
                    <p className="text-sm text-gray-600">Understands and speaks languages</p>
                  </div>
                </div>
              </div>

              <Alert className="my-4 bg-violet-50 border-violet-200">
                <Lightbulb className="h-4 w-4 text-violet-500" />
                <AlertDescription>
                  <strong>Fun Fact:</strong> The term "Artificial Intelligence" was first used in 1956 - 
                  that's before your parents were born!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-pink-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  <CardTitle>Generative AI: The Creative Robot</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Generative AI is like having a super creative friend who can:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    Write stories and poems
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    Create pictures from descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    Compose music
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <CardTitle>AI Safety and Ethics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Important Things to Remember:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Always have a grown-up help you when using AI tools
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Don't share personal information with AI
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-green-500" />
                <CardTitle>The Future of AI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Amazing Things AI Might Do in the Future:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-green-500" />
                    Help solve big world problems
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-green-500" />
                    Create new medicines
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-green-500" />
                    Make school learning more fun
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-green-500" />
                    Help us explore space
                  </div>
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

export default AIIntro;