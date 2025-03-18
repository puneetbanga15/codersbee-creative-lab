
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, GraduationCap, Code, Brain, Award, ChevronRight } from 'lucide-react';
import { useInterval } from '@/hooks/useInterval';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Step types and data
type JourneyStep = {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    description?: string;
  }[];
  type: 'age' | 'experience' | 'interests' | 'time' | 'learning_style';
};

type CourseRecommendation = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  path: TrackType;
  milestones: string[];
  timeToComplete: string;
  projectExample: string;
};

type TrackType = 'scratch' | 'web' | 'python' | 'ai';

type UserProfile = {
  age?: string;
  experience?: string;
  interests?: string[];
  time?: string;
  learningStyle?: string;
};

// Journey steps data
const journeySteps: JourneyStep[] = [
  {
    id: 'age',
    question: 'How old is your child?',
    options: [
      { label: '6-8 years', value: '6-8' },
      { label: '9-11 years', value: '9-11' },
      { label: '12-14 years', value: '12-14' },
      { label: '15-18 years', value: '15-18' },
    ],
    type: 'age',
  },
  {
    id: 'experience',
    question: 'What is your child\'s experience with coding?',
    options: [
      { label: 'Complete beginner', value: 'beginner', description: 'Never tried coding before' },
      { label: 'Some exposure', value: 'some', description: 'Has tried a few coding activities' },
      { label: 'Intermediate', value: 'intermediate', description: 'Completed at least one course' },
      { label: 'Advanced', value: 'advanced', description: 'Has built multiple projects' },
    ],
    type: 'experience',
  },
  {
    id: 'interests',
    question: 'What is your child interested in? (Select all that apply)',
    options: [
      { label: 'Games & Animation', value: 'games' },
      { label: 'Apps & Websites', value: 'apps' },
      { label: 'AI & Machine Learning', value: 'ai' },
      { label: 'Science & Math', value: 'science' },
      { label: 'Art & Design', value: 'art' },
    ],
    type: 'interests',
  },
  {
    id: 'time',
    question: 'How much time can your child dedicate to learning each week?',
    options: [
      { label: '1-2 hours', value: '1-2' },
      { label: '3-4 hours', value: '3-4' },
      { label: '5+ hours', value: '5+' },
    ],
    type: 'time',
  },
  {
    id: 'learning_style',
    question: 'How does your child prefer to learn?',
    options: [
      { label: 'Visual - learns by seeing', value: 'visual' },
      { label: 'Hands-on - learns by doing', value: 'hands-on' },
      { label: 'Project-based - learns by creating', value: 'project' },
      { label: 'Problem-solving - learns by figuring things out', value: 'problem' },
    ],
    type: 'learning_style',
  },
];

// Course recommendations data
const courseRecommendations: CourseRecommendation[] = [
  {
    id: 'scratch-basics',
    title: 'Scratch Fundamentals',
    description: 'Perfect for beginners to learn coding concepts through visual blocks',
    level: 'beginner',
    path: 'scratch',
    milestones: ['Basic Animations', 'Interactive Stories', 'Simple Games', 'Scratch Challenge Projects'],
    timeToComplete: '2-3 months',
    projectExample: 'Interactive space adventure game with multiple levels'
  },
  {
    id: 'web-intro',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS and basic JavaScript to create your own web pages',
    level: 'beginner',
    path: 'web',
    milestones: ['HTML Structure', 'CSS Styling', 'Basic JavaScript', 'Simple Web Projects'],
    timeToComplete: '3-4 months',
    projectExample: 'Personal portfolio website with interactive elements'
  },
  {
    id: 'python-starter',
    title: 'Python Programming Basics',
    description: 'Introduction to Python for those who want to learn text-based coding',
    level: 'intermediate',
    path: 'python',
    milestones: ['Python Syntax', 'Data Structures', 'Loops & Functions', 'Small Python Projects'],
    timeToComplete: '3-4 months',
    projectExample: 'Text-based adventure game with saving/loading features'
  },
  {
    id: 'ai-explorer',
    title: 'AI Explorer Program',
    description: 'Discover AI tools and basic machine learning concepts',
    level: 'intermediate',
    path: 'ai',
    milestones: ['AI Fundamentals', 'Machine Learning Basics', 'AI Tools', 'Simple AI Projects'],
    timeToComplete: '4-5 months',
    projectExample: 'Image recognition system that can identify objects'
  },
  {
    id: 'advanced-web',
    title: 'Advanced Web Development',
    description: 'Build complex web applications with modern frameworks',
    level: 'advanced',
    path: 'web',
    milestones: ['Advanced JavaScript', 'React Basics', 'Databases', 'Full Stack Projects'],
    timeToComplete: '5-6 months',
    projectExample: 'Social media platform with user authentication and database'
  },
  {
    id: 'advanced-ai',
    title: 'AI Application Development',
    description: 'Create sophisticated AI systems and applications',
    level: 'advanced',
    path: 'ai',
    milestones: ['Advanced AI Concepts', 'Neural Networks', 'NLP Projects', 'AI Integration'],
    timeToComplete: '6 months',
    projectExample: 'AI chatbot that can learn from conversations and provide smart responses'
  }
];

// Recommendation algorithm - simplified for this example
const getRecommendation = (profile: UserProfile): CourseRecommendation => {
  let recommendations = [...courseRecommendations];
  
  // Filter by age
  if (profile.age === '6-8' || profile.age === '9-11') {
    recommendations = recommendations.filter(r => r.path === 'scratch' || (r.level === 'beginner' && r.path === 'web'));
  }
  
  // Filter by experience
  if (profile.experience === 'beginner') {
    recommendations = recommendations.filter(r => r.level === 'beginner');
  } else if (profile.experience === 'some') {
    recommendations = recommendations.filter(r => r.level === 'beginner' || r.level === 'intermediate');
  } else if (profile.experience === 'intermediate') {
    recommendations = recommendations.filter(r => r.level === 'intermediate' || r.level === 'advanced');
  } else if (profile.experience === 'advanced') {
    recommendations = recommendations.filter(r => r.level === 'advanced');
  }
  
  // If we have interests, prioritize matching
  if (profile.interests && profile.interests.length > 0) {
    // Map interests to paths
    const interestToPath: Record<string, TrackType[]> = {
      'games': ['scratch', 'python'],
      'apps': ['web', 'python'],
      'ai': ['ai', 'python'],
      'science': ['python', 'ai'],
      'art': ['web', 'scratch'],
    };
    
    const relevantPaths: TrackType[] = [];
    profile.interests.forEach(interest => {
      if (interestToPath[interest]) {
        relevantPaths.push(...interestToPath[interest]);
      }
    });
    
    // If we have relevant paths from interests, prioritize those
    if (relevantPaths.length > 0) {
      const prioritizedRecs = recommendations.filter(r => relevantPaths.includes(r.path));
      if (prioritizedRecs.length > 0) {
        recommendations = prioritizedRecs;
      }
    }
  }
  
  // If no suitable recommendation, return a default
  return recommendations[0] || courseRecommendations[0];
};

// Track visualization component
const Track: React.FC<{
  type: TrackType;
  isActive: boolean;
  milestones: string[];
  isRecommended: boolean;
}> = ({ type, isActive, milestones, isRecommended }) => {
  const trackColors: Record<TrackType, string> = {
    'scratch': 'bg-amber-100 border-amber-300',
    'web': 'bg-blue-100 border-blue-300',
    'python': 'bg-green-100 border-green-300',
    'ai': 'bg-purple-100 border-purple-300',
  };
  
  const trackIcons: Record<TrackType, React.ReactNode> = {
    'scratch': <GraduationCap className="w-5 h-5 text-amber-600" />,
    'web': <Code className="w-5 h-5 text-blue-600" />,
    'python': <Code className="w-5 h-5 text-green-600" />,
    'ai': <Brain className="w-5 h-5 text-purple-600" />,
  };
  
  const trackNames: Record<TrackType, string> = {
    'scratch': 'Scratch',
    'web': 'Web Development',
    'python': 'Python',
    'ai': 'AI',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        y: 0,
        scale: isRecommended ? 1.03 : 1
      }}
      transition={{ duration: 0.5 }}
      className={`relative ${trackColors[type]} p-4 rounded-lg border-2 ${isRecommended ? 'border-[#9b87f5] shadow-lg' : ''} transition-all`}
    >
      <div className="flex items-center gap-2 mb-3">
        {trackIcons[type]}
        <h3 className="font-semibold">{trackNames[type]} Track</h3>
        {isRecommended && (
          <span className="ml-auto bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" /> Recommended
          </span>
        )}
      </div>
      
      <div className="relative">
        {milestones.map((milestone, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-2 mb-2"
          >
            <div className={`w-6 h-6 rounded-full ${isActive ? 'bg-white' : 'bg-gray-100'} flex items-center justify-center text-xs`}>
              {index + 1}
            </div>
            <div className="text-sm">{milestone}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main component
export const LearningJourneyVisualizer: React.FC<{
  onComplete: (recommendation: CourseRecommendation, profile: UserProfile) => void;
  onClose: () => void;
}> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<CourseRecommendation | null>(null);
  
  // Handle response for multiple selection (interests)
  const handleMultiSelect = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(item => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    const currentQuestion = journeySteps[currentStep];
    
    // Save response to user profile
    if (currentQuestion.id === 'interests') {
      setUserProfile(prev => ({ ...prev, interests: selectedOptions }));
    } else {
      setUserProfile(prev => ({ ...prev, [currentQuestion.id]: selectedOption }));
    }
    
    // Reset selection
    setSelectedOption(null);
    
    // Move to next question or finish
    if (currentStep < journeySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate recommendation
      const updatedProfile = currentQuestion.id === 'interests' 
        ? { ...userProfile, interests: selectedOptions }
        : { ...userProfile, [currentQuestion.id]: selectedOption };
        
      const rec = getRecommendation(updatedProfile);
      setRecommendation(rec);
      setShowResult(true);
      
      // Call the onComplete callback with the recommendation
      onComplete(rec, updatedProfile);
    }
  };
  
  // Reset the interests when reaching that step
  useEffect(() => {
    if (journeySteps[currentStep]?.id === 'interests') {
      setSelectedOptions(userProfile.interests || []);
    } else if (journeySteps[currentStep]) {
      const stepId = journeySteps[currentStep].id as keyof UserProfile;
      setSelectedOption(userProfile[stepId] as string || null);
    }
  }, [currentStep]);

  // Animation for the progress indicator
  const progressPercentage = ((currentStep + 1) / journeySteps.length) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {!showResult ? (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Personalized Learning Journey</h2>
            <p className="text-gray-600 text-sm">Let's find the perfect learning path for your child</p>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4">
              <motion.div 
                className="h-full bg-[#9b87f5] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Start</span>
              <span>Step {currentStep + 1} of {journeySteps.length}</span>
              <span>Finish</span>
            </div>
          </div>
          
          {/* Question */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-lg font-medium mb-4">{journeySteps[currentStep]?.question}</h3>
            
            {journeySteps[currentStep]?.id === 'interests' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {journeySteps[currentStep].options.map((option) => (
                  <div 
                    key={option.value}
                    onClick={() => handleMultiSelect(option.value)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOptions.includes(option.value) 
                        ? 'border-[#9b87f5] bg-[#9b87f5]/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        selectedOptions.includes(option.value) 
                          ? 'bg-[#9b87f5] border-[#9b87f5]' 
                          : 'border-gray-300'
                      }`}>
                        {selectedOptions.includes(option.value) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="ml-2 font-medium">{option.label}</span>
                    </div>
                    {option.description && (
                      <p className="text-xs text-gray-500 mt-1 ml-7">{option.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={selectedOption || ''}
                onValueChange={setSelectedOption}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {journeySteps[currentStep].options.map((option) => (
                  <div 
                    key={option.value}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === option.value 
                        ? 'border-[#9b87f5] bg-[#9b87f5]/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    <div className="flex items-center">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label htmlFor={option.value} className="ml-2 font-medium cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                    {option.description && (
                      <p className="text-xs text-gray-500 mt-1 ml-7">{option.description}</p>
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
          </motion.div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                journeySteps[currentStep]?.id === 'interests'
                  ? selectedOptions.length === 0
                  : !selectedOption
              }
              className="bg-[#9b87f5] hover:bg-[#8a78e0]"
            >
              {currentStep < journeySteps.length - 1 ? 'Next' : 'See My Recommendation'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Your Personalized Learning Journey</h2>
                <p className="text-gray-600">Based on your responses, we recommend:</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
            
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 p-4 border-2 border-[#9b87f5] rounded-lg bg-[#9b87f5]/5"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#9b87f5] p-3 rounded-lg text-white">
                    {recommendation.path === 'scratch' && <GraduationCap className="w-6 h-6" />}
                    {recommendation.path === 'web' && <Code className="w-6 h-6" />}
                    {recommendation.path === 'python' && <Code className="w-6 h-6" />}
                    {recommendation.path === 'ai' && <Brain className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{recommendation.title}</h3>
                    <p className="text-gray-600 mb-2">{recommendation.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        Level: {recommendation.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {recommendation.timeToComplete}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-medium">Project Example:</span> {recommendation.projectExample}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <h3 className="font-medium text-lg mb-3">Learning Path Visualization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {(['scratch', 'web', 'python', 'ai'] as TrackType[]).map(trackType => (
                <Track 
                  key={trackType}
                  type={trackType}
                  isActive={true}
                  milestones={
                    trackType === recommendation?.path
                      ? recommendation.milestones
                      : courseRecommendations.find(r => r.path === trackType)?.milestones || []
                  }
                  isRecommended={trackType === recommendation?.path}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8a78e0]"
                onClick={() => window.open('https://calendly.com/codersbee/class-slot', '_blank')}
              >
                Book a Free Trial Class
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
