
import { BuzzyChat } from "@/components/buzzy-ai/BuzzyChat";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

const BuzzyAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => window.open("https://wa.me/919996465023", "_blank")}
            >
              <MessageSquareText className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => window.open("https://calendly.com/codersbee/class-slot", "_blank")}
            >
              <Calendar className="h-4 w-4" />
              Book Trial
            </Button>
          </div>
        </div>
      </div>
      
      <main>
        <BuzzyChat />
      </main>
      
      <footer className="mt-12 pb-8 text-center text-sm text-gray-500">
        <p>© 2023 CodersBee. All rights reserved.</p>
        <p className="mt-1">Have questions? Reach out on WhatsApp: +919996465023</p>
      </footer>
    </div>
  );
};

export default BuzzyAI;
