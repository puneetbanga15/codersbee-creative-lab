import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LabsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors flex items-center gap-2">
        <ChevronRight className="h-4 w-4" />
        <span>Student Labs</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white z-50">
        <DropdownMenuItem className="focus:bg-[#9b87f5]/10">
          <Link to="/ai-lab" className="w-full">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-[#9b87f5] mt-0.5" />
              <div>
                <div className="font-medium text-[#1A1F2C]">AI Lab</div>
                <div className="text-sm text-gray-500">Learn AI through interactive lessons</div>
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#23c55e]/10">
          <Link to="/coding-lab" className="w-full">
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 text-[#23c55e] mt-0.5" />
              <div>
                <div className="font-medium text-[#1A1F2C]">Coding Lab</div>
                <div className="text-sm text-gray-500">Interactive coding games with pioneer stories</div>
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MobileLabsMenu = () => {
  return (
    <div className="py-2 space-y-2">
      <span className="block text-[#9b87f5] font-medium">Student Labs</span>
      <Link 
        to="/ai-lab" 
        className="block text-[#9b87f5] hover:text-[#7E69AB] pl-4"
      >
        <div className="flex items-start gap-3 py-2">
          <Brain className="h-5 w-5 text-[#9b87f5] mt-0.5" />
          <div>
            <div>AI Lab</div>
            <div className="text-sm text-gray-500">Learn AI through interactive lessons</div>
          </div>
        </div>
      </Link>
      <Link 
        to="/coding-lab" 
        className="block text-[#23c55e] hover:text-green-700 pl-4"
      >
        <div className="flex items-start gap-3 py-2">
          <Code className="h-5 w-5 text-[#23c55e] mt-0.5" />
          <div>
            <div>Coding Lab</div>
            <div className="text-sm text-gray-500">Interactive coding games with pioneer stories</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
