import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
export const AnnouncementBar = () => {
  return <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#9b87f5] to-[#b3a4f7] py-2.5 w-full z-[10000]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-white">
          <div className="hidden md:flex items-center gap-2">
            <Bell className="h-4 w-4 animate-bounce" />
            <span className="font-medium">NEW!</span>
          </div>
          <Link to="/buzzy-ai" className="group flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span>🐝</span>
            <span className="text-sm md:text-base">Meet Buzzy Bee AI - Ask me Anything</span>
            <span className="hidden md:inline-block bg-white/20 px-2 py-1 rounded text-sm group-hover:bg-white/30 transition-colors">
              Try it now →
            </span>
          </Link>
        </div>
      </div>
    </div>;
};