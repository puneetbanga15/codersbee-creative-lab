import { motion } from "framer-motion";
import { BookOpen, Users, Lightbulb, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ScratchFundamentals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-codersbee-purple/50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-codersbee-dark">
            Let's Learn <span className="text-codersbee-vivid">Scratch! 🐱</span>
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">A fun guide for young programmers</p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-codersbee-dark flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-codersbee-vivid" />
                  Welcome to Scratch!
                </h2>
                <div className="bg-white rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-700">
                    Scratch is like building with LEGO blocks, but instead of physical blocks, 
                    you use coding blocks to create games, stories, and animations!
                  </p>
                </div>
                <div className="bg-codersbee-yellow p-4 rounded-lg">
                  <p className="flex items-start gap-2">
                    <Users className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-codersbee-dark">Teacher/Parent Tip:</strong>{" "}
                      Start with simple projects that spark creativity. Let kids experiment freely 
                      before introducing specific concepts.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Building Blocks */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-codersbee-dark flex items-center gap-2">
                  <Target className="h-6 w-6 text-codersbee-vivid" />
                  Basic Building Blocks
                </h2>
                
                <div className="space-y-6">
                  {/* Motion Blocks */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Motion Blocks (Blue)</h3>
                    <p className="mb-3">Make sprites move and dance!</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Move 10 steps</li>
                      <li>Turn clockwise/counterclockwise</li>
                      <li>Go to x,y position</li>
                    </ul>
                  </div>

                  {/* Looks Blocks */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-purple-700 mb-3">Looks Blocks (Purple)</h3>
                    <p className="mb-3">Change how sprites appear!</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Say "Hello!"</li>
                      <li>Change costume</li>
                      <li>Change size</li>
                    </ul>
                  </div>

                  <div className="bg-codersbee-green p-4 rounded-lg">
                    <p className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 mt-1 flex-shrink-0" />
                      <span>
                        <strong className="text-codersbee-dark">Learning Tip:</strong>{" "}
                        Use the "say" block to help debug programs - it's like having your sprite 
                        tell you what's happening!
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Success */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-codersbee-dark flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-codersbee-vivid" />
                  Tips for Success
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* For Kids */}
                  <div className="bg-codersbee-purple/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-codersbee-dark mb-4">For Kids:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Start small and build up
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Don't be afraid to experiment
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Use comments to remember what your blocks do
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Share your projects with friends!
                      </li>
                    </ul>
                  </div>

                  {/* For Teachers/Parents */}
                  <div className="bg-codersbee-orange/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-codersbee-dark mb-4">For Teachers/Parents:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Encourage experimentation and creativity
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Use pair programming to develop collaboration
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Connect projects to other subjects
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                        Celebrate both success and failures
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* First Project Ideas */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-codersbee-dark flex items-center gap-2">
                  <Target className="h-6 w-6 text-codersbee-vivid" />
                  First Project Ideas
                </h2>
                <div className="bg-gradient-to-r from-codersbee-purple/20 to-transparent p-6 rounded-lg mb-6">
                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                      Make a cat dance to music
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                      Create an interactive greeting card
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                      Build a simple maze game
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-codersbee-vivid rounded-full"></div>
                      Design an animated story
                    </li>
                  </ul>
                </div>
                <div className="bg-codersbee-yellow p-4 rounded-lg">
                  <p className="flex items-start gap-2">
                    <Users className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-codersbee-dark">Remember:</strong>{" "}
                      Every great programmer started with small steps. Encourage persistence and creativity!
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};