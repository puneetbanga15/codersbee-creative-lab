import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Blocks, Music, Lightbulb, Brain, Share2, Sparkles, Code, Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ScratchIntro = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
              <Blocks className="h-6 w-6 text-[#9b87f5]" />
            </span>
            <h1 className="text-4xl font-bold mb-4">
              Introduction to <span className="text-[#9b87f5]">Scratch!</span> 🐱
            </h1>
            <p className="text-xl text-gray-600">A fun guide for young programmers</p>
          </div>

          <Card className="mb-8 border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-[#9b87f5]" />
                Welcome to Scratch!
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg">
                Scratch is like building with LEGO blocks, but instead of physical blocks, 
                you use coding blocks to create games, stories, and animations! It's a fun way 
                to learn programming concepts while creating amazing projects.
              </p>
              
              <Alert className="my-4 bg-purple-50 border-purple-200">
                <InfoIcon className="h-4 w-4 text-[#9b87f5]" />
                <AlertDescription className="text-purple-900">
                  <strong>Teacher/Parent Tip:</strong> Start with simple projects that spark creativity. 
                  Let kids experiment freely before introducing specific concepts.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  <CardTitle>Motion Blocks (Blue)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-blue-900">Make sprites move and dance!</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    Move 10 steps
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    Turn clockwise/counterclockwise
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    Go to x,y position
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <CardTitle>Looks Blocks (Purple)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-purple-900">Change how sprites appear!</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    Say "Hello!"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    Change costume
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    Change size
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-2 border-yellow-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-yellow-500" />
                <CardTitle>Sound & Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Events Blocks (Yellow)</h3>
              <p className="mb-4 text-yellow-900">Make things happen when something else happens!</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-500" />
                  When green flag clicked
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-500" />
                  When space key pressed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-500" />
                  When sprite clicked
                </li>
              </ul>
              <Alert className="bg-yellow-50 border-yellow-200">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-900">
                  <strong>Fun Fact:</strong> You can make your own music in Scratch using the Sound blocks!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-orange-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-orange-500" />
                  <CardTitle>Loops & Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-orange-900">Make decisions and repeat actions!</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    Repeat blocks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    If...then blocks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    Wait blocks
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-500" />
                  <CardTitle>Variables & Lists</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-orange-900">Store and track information!</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    Create a score counter
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    Keep track of lives
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    Remember player names
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-2 border-[#9b87f5]/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-[#9b87f5]" />
                <CardTitle>Tips for Success</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">For Kids:</h3>
                  <ul className="space-y-2">
                    {[
                      "Start small and build up",
                      "Don't be afraid to experiment",
                      "Use comments to remember what your blocks do",
                      "Share your projects with friends!"
                    ].map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-[#9b87f5]/10 text-[#9b87f5]">
                          {index + 1}
                        </Badge>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">For Teachers/Parents:</h3>
                  <ul className="space-y-2">
                    {[
                      "Encourage experimentation and creativity",
                      "Use pair programming to develop collaboration skills",
                      "Connect projects to other subjects (art, music, math)",
                      "Celebrate both success and failures as learning opportunities"
                    ].map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-[#9b87f5]/10 text-[#9b87f5]">
                          {index + 1}
                        </Badge>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>First Project Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  {[
                    "Make a cat dance to music",
                    "Create an interactive greeting card"
                  ].map((idea, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-[#9b87f5]" />
                      {idea}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {[
                    "Build a simple maze game",
                    "Design an animated story"
                  ].map((idea, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-[#9b87f5]" />
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
              <Alert className="mt-6 bg-gradient-to-r from-[#9b87f5]/10 to-purple-50">
                <Lightbulb className="h-4 w-4 text-[#9b87f5]" />
                <AlertDescription>
                  <strong>Remember:</strong> Every great programmer started with small steps. 
                  Encourage persistence and creativity!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScratchIntro;