import { Navbar } from "@/components/Navbar";
import { Lock, BookOpen, Code, Cloud, Sparkles, Blocks } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TutorialCardProps = {
  title: string;
  description: string;
  isLocked?: boolean;
  status?: string;
  icon?: React.ReactNode;
  link?: string;
};

const TutorialCard = ({ 
  title, 
  description, 
  isLocked = true,
  status = "Lesson coming soon!",
  icon,
  link
}: TutorialCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {isLocked ? 
            <Lock className="w-5 h-5 text-orange-400" /> : 
            <BookOpen className="w-5 h-5 text-green-500" />
          }
        </div>
        <CardDescription>{status}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant={isLocked ? "outline" : "default"} className={isLocked ? "text-orange-500 border-orange-500" : "bg-green-500"}>
            {isLocked ? "Enrolled Students Only" : "Free Access"}
          </Badge>
          {link && (
            <Button variant="outline" size="sm" asChild>
              <Link to={link}>Start Learning</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive learning materials designed to help students master programming concepts.
              From basic to advanced topics, we provide structured content to support your learning journey.
            </p>
          </div>

          <TutorialSection title="Scratch Programming" icon={Blocks}>
            <TutorialCard
              title="Introduction to Scratch"
              description="Learn the basics of Scratch programming in a fun and interactive way"
              isLocked={false}
              status="Ready to start learning!"
              icon={<Blocks className="w-5 h-5 text-[#9b87f5]" />}
              link="/tutorials/scratch/intro"
            />
            <TutorialCard
              title="Game Development with Scratch"
              description="Create your first game using Scratch with step-by-step guidance"
              icon={<Blocks className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="Advanced Scratch Projects"
              description="Explore complex projects and animations using advanced Scratch concepts"
              icon={<Blocks className="w-5 h-5 text-[#9b87f5]" />}
            />
          </TutorialSection>

          <TutorialSection title="Web Development" icon={Code}>
            <TutorialCard
              title="HTML Fundamentals"
              description="Learn basic structure and elements of HTML"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="CSS Styling"
              description="Make your websites beautiful with CSS"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="Responsive Design"
              description="Master advanced layouts and media queries"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
          </TutorialSection>

          <TutorialSection title="JavaScript" icon={Code}>
            <TutorialCard
              title="JavaScript Basics"
              description="Learn variables, functions, and control flow"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="DOM Manipulation"
              description="Learn to interact with web pages using JavaScript"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="Advanced JavaScript"
              description="Master objects, classes, and modern features"
              icon={<Code className="w-5 h-5 text-[#9b87f5]" />}
            />
          </TutorialSection>

          <TutorialSection title="Cloud and Hosting" icon={Cloud}>
            <TutorialCard
              title="Introduction to Cloud"
              description="Understanding cloud computing fundamentals"
              icon={<Cloud className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="Website Deployment"
              description="Learn to host your first website"
              icon={<Cloud className="w-5 h-5 text-[#9b87f5]" />}
            />
          </TutorialSection>

          <TutorialSection title="Generative AI" icon={Sparkles}>
            <TutorialCard
              title="AI Basics"
              description="Understanding AI and its applications"
              icon={<Sparkles className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="ChatGPT Integration"
              description="Building with AI APIs"
              icon={<Sparkles className="w-5 h-5 text-[#9b87f5]" />}
            />
            <TutorialCard
              title="Advanced AI Projects"
              description="Complex AI implementations"
              icon={<Sparkles className="w-5 h-5 text-[#9b87f5]" />}
            />
          </TutorialSection>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;