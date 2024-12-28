import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white/50 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-codersbee-yellow/30 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Shuvam's Coding Journey</h3>
                <p className="text-gray-600 mb-4">
                  Starting his journey at age 8, Shuvam mastered Scratch, Python, and Javascript over 3 years. 
                  He's now utilizing AI tools to create books and is developing what he calls "world's best AI travel planner".
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                    <ExternalLink className="w-4 h-4" />
                    Video Demo Coming Soon
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                    <ExternalLink className="w-4 h-4" />
                    Project Showcase Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-codersbee-green/30 p-3 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Vamshika's Coding Victory</h3>
                <p className="text-gray-600 mb-4">
                  From having no initial interest in coding, Vamshika's journey with Manisha ma'am transformed her into 
                  a passionate coder. Her dedication led to winning a $100 coding competition, showcasing her remarkable growth.
                </p>
                <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                  <ExternalLink className="w-4 h-4" />
                  Success Story Coming Soon
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-codersbee-orange/30 p-3 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ayan's AI Innovation</h3>
                <p className="text-gray-600 mb-4">
                  A brilliant coder with a hacker mindset, Ayan mastered coding fundamentals and continues his journey into 
                  advanced AI. His innovative AI-powered recipe generator showcases his technical prowess.
                </p>
                <Button variant="outline" className="w-full flex items-center gap-2" disabled>
                  <ExternalLink className="w-4 h-4" />
                  Project Demo Coming Soon
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};