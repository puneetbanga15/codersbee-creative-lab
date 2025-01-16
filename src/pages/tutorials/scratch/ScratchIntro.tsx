import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Blocks, Music, Lightbulb, Brain, Share2 } from "lucide-react";

const ScratchIntro = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Introduction to <span className="text-[#9b87f5]">Scratch!</span> 🐱
            </h1>
            <p className="text-xl text-gray-600">A fun guide for young programmers</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Welcome to Scratch!</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Scratch is like building with LEGO blocks, but instead of physical blocks, 
                you use coding blocks to create games, stories, and animations! It's a fun way 
                to learn programming concepts while creating amazing projects.
              </p>
              
              <Alert className="my-4">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  <strong>Teacher/Parent Tip:</strong> Start with simple projects that spark creativity. 
                  Let kids experiment freely before introducing specific concepts.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Blocks className="h-5 w-5 text-blue-500" />
                  <CardTitle>Motion Blocks (Blue)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Make sprites move and dance!</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Move 10 steps</li>
                  <li>Turn clockwise/counterclockwise</li>
                  <li>Go to x,y position</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Blocks className="h-5 w-5 text-purple-500" />
                  <CardTitle>Looks Blocks (Purple)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Change how sprites appear!</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Say "Hello!"</li>
                  <li>Change costume</li>
                  <li>Change size</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-yellow-500" />
                <CardTitle>Sound & Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Events Blocks (Yellow)</h3>
              <p className="mb-4">Make things happen when something else happens!</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>When green flag clicked</li>
                <li>When space key pressed</li>
                <li>When sprite clicked</li>
              </ul>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Fun Fact:</strong> You can make your own music in Scratch using the Sound blocks!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Blocks className="h-5 w-5 text-orange-500" />
                  <CardTitle>Loops & Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Make decisions and repeat actions!</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Repeat blocks</li>
                  <li>If...then blocks</li>
                  <li>Wait blocks</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-500" />
                  <CardTitle>Variables & Lists</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Store and track information!</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create a score counter</li>
                  <li>Keep track of lives</li>
                  <li>Remember player names</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
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
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start small and build up</li>
                    <li>Don't be afraid to experiment</li>
                    <li>Use comments to remember what your blocks do</li>
                    <li>Share your projects with friends!</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">For Teachers/Parents:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encourage experimentation and creativity</li>
                    <li>Use pair programming to develop collaboration skills</li>
                    <li>Connect projects to other subjects (art, music, math)</li>
                    <li>Celebrate both success and failures as learning opportunities</li>
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
                <ul className="list-disc pl-6 space-y-2">
                  <li>Make a cat dance to music</li>
                  <li>Create an interactive greeting card</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Build a simple maze game</li>
                  <li>Design an animated story</li>
                </ul>
              </div>
              <Alert className="mt-6">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Remember: Every great programmer started with small steps. 
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