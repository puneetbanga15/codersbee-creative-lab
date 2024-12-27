import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-codersbee-purple/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-codersbee-vivid">AI Champions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our students are building remarkable AI projects and winning competitions. 
            Here's what they've achieved:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-white/50 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-codersbee-yellow/30 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Shuvam's AI Travel Planner</h3>
                <p className="text-gray-600 mb-4">
                  Created an intelligent travel planner that crafts personalized itineraries using 
                  advanced AI. His project showcases the perfect blend of creativity and technical skills.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {/* Add Shuvam's project video here */}
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
                    alt="Shuvam's AI Project"
                    className="w-full h-full object-cover"
                  />
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
                  Won a $100 coding competition! Under Manisha ma'am's guidance, 
                  Vamshika developed the skills and confidence to compete and win at a national level.
                </p>
                <div className="bg-codersbee-green/10 p-4 rounded-lg">
                  <blockquote className="text-gray-700 italic">
                    "The personalized attention and structured learning approach at CodersBee 
                    helped my daughter achieve this milestone."
                  </blockquote>
                  <p className="text-sm text-gray-600 mt-2">- Vamshika's Parent</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};