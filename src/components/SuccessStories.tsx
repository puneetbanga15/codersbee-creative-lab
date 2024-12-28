import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award } from "lucide-react";

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-codersbee-purple/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/50 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="bg-codersbee-orange/30 p-3 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ayan's Smart Recipe Generator</h3>
                <p className="text-gray-600 mb-4">
                  Built an AI-powered recipe generator that suggests personalized recipes based on 
                  available ingredients. A perfect example of practical AI application.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};