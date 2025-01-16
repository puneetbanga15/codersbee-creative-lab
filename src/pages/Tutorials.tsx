import { Lock, BookOpen, Code, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const TutorialCard = ({ 
  title, 
  description, 
  isLocked = true,
  status = "Lesson coming soon!"
}: { 
  title: string;
  description: string;
  isLocked?: boolean;
  status?: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {isLocked ? <Lock className="w-5 h-5 text-orange-400" /> : <BookOpen className="w-5 h-5 text-green-500" />}
      </div>
      <p className="text-gray-600 text-sm mb-4">{status}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className={`text-sm ${isLocked ? 'text-orange-500' : 'text-green-500'}`}>
        {isLocked ? 'This content is available for enrolled students' : 'Free access'}
      </p>
    </div>
  );
};

const TutorialSection = ({ 
  title, 
  icon: Icon,
  children 
}: { 
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-6 h-6 text-[#9b87f5]" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Learning <span className="text-[#9b87f5]">Resources</span>
            </h1>
          </div>

          <TutorialSection title="Scratch" icon={Code}>
            <TutorialCard
              title="Introduction to Scratch"
              description="Learn the basics of Scratch programming"
              isLocked={false}
              status="Learn basic structure and elements"
            />
            <TutorialCard
              title="Game Development with Scratch"
              description="Learn to create your first game using Scratch"
            />
            <TutorialCard
              title="Advanced Scratch Projects"
              description="Explore complex projects and animations"
            />
          </TutorialSection>

          <TutorialSection title="HTML and CSS" icon={BookOpen}>
            <TutorialCard
              title="HTML Fundamentals"
              description="Learn basic structure and elements"
            />
            <TutorialCard
              title="CSS Styling"
              description="Make your websites beautiful"
            />
            <TutorialCard
              title="Responsive Design"
              description="Master advanced layouts and media queries"
            />
          </TutorialSection>

          <TutorialSection title="JavaScript" icon={Code}>
            <TutorialCard
              title="JavaScript Basics"
              description="Learn variables, functions, and control flow"
            />
            <TutorialCard
              title="DOM Manipulation"
              description="Learn to interact with web pages"
            />
            <TutorialCard
              title="Advanced JavaScript"
              description="Master objects, classes, and modern features"
            />
          </TutorialSection>

          <TutorialSection title="Cloud and Hosting" icon={Cloud}>
            <TutorialCard
              title="Introduction to Cloud"
              description="Understanding cloud computing"
            />
            <TutorialCard
              title="Website Deployment"
              description="Learn to host your first website"
            />
          </TutorialSection>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;