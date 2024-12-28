import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const SuccessStories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-codersbee-dark">
          Meet Our <span className="text-codersbee-vivid">AI and Coding Champions</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-gradient-to-br from-codersbee-yellow/30 to-white backdrop-blur h-full">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shuvam's Coding Journey</h3>
                  <p className="text-gray-600 mb-4">
                    Starting his journey at age 8, Shuvam mastered Scratch, Python, and Javascript over 3 years. 
                    He's now utilizing AI tools to create books and is developing what he calls "world's best AI travel planner".
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full flex items-center gap-2 hover:bg-yellow-50" disabled>
                      <ExternalLink className="w-4 h-4" />
                      Video Demo Coming Soon
                    </Button>
                    <Button variant="outline" className="w-full flex items-center gap-2 hover:bg-yellow-50" disabled>
                      <ExternalLink className="w-4 h-4" />
                      Project Showcase Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-gradient-to-br from-codersbee-green/30 to-white backdrop-blur h-full">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Vamshika's Coding Victory</h3>
                  <p className="text-gray-600 mb-4">
                    From having no initial interest in coding, Vamshika's journey with Manisha ma'am transformed her into 
                    a passionate coder. Her dedication led to winning a $100 coding competition, showcasing her remarkable growth.
                  </p>
                  <Button variant="outline" className="w-full flex items-center gap-2 hover:bg-green-50" disabled>
                    <ExternalLink className="w-4 h-4" />
                    Success Story Coming Soon
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-gradient-to-br from-codersbee-orange/30 to-white backdrop-blur h-full">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ayan's AI Innovation</h3>
                  <p className="text-gray-600 mb-4">
                    A brilliant coder with a hacker mindset, Ayan mastered coding fundamentals and continues his journey into 
                    advanced AI. His innovative AI-powered recipe generator showcases his technical prowess.
                  </p>
                  <Button variant="outline" className="w-full flex items-center gap-2 hover:bg-orange-50" disabled>
                    <ExternalLink className="w-4 h-4" />
                    Project Demo Coming Soon
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-xl text-codersbee-dark">
            Your child could be our next champion! Join us in creating the future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};