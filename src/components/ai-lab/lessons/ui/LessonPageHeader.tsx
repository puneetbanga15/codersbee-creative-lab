
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export const LessonPageHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Link to="/ai-lab" className="inline-block">
          <Button variant="ghost" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to AI Lab</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#9b87f5]">AI Lab</h1>
        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Beta
        </Badge>
      </div>
    </div>
  );
};
