
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface MeetAIFriendCodeProps {
  onComplete?: () => void;
}

export const MeetAIFriendCode = ({ onComplete }: MeetAIFriendCodeProps) => {
  // Call onComplete when component mounts
  useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Behind the Scenes: AI Friend Code</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Here's a simplified version of how an AI Friend might work in code. Don't worry if you don't understand everything - 
              the important part is seeing how the AI learns from examples!
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`
// Define our AI Friend's personality
const aiFriend = {
  name: "Luna",
  personality: "friendly, magical, loves stars",
  examples: []  // This will store our training examples
};

// Add training examples
function trainAIFriend(question, answer) {
  aiFriend.examples.push({ 
    question: question, 
    answer: answer 
  });
  console.log(\`AI Friend learned: \${question} → \${answer}\`);
}

// Train with some examples
trainAIFriend(
  "What's your name?", 
  "I'm Luna! I love looking at the stars in the night sky."
);

trainAIFriend(
  "Do you like magic?", 
  "Oh yes! Magic is wonderful. I know lots of magical stories!"
);

trainAIFriend(
  "What's your favorite animal?", 
  "Dragons are my favorite! They're magical and can fly high in the sky."
);

// Function to find the best answer when asked a question
function askAIFriend(question) {
  // In a real AI, this would use complex algorithms!
  // This is a simplified version
  
  // Look through our examples for the closest match
  let bestMatch = null;
  let highestScore = 0;
  
  for (const example of aiFriend.examples) {
    // Calculate how similar the question is to our example
    // (In real AI, this is much more sophisticated)
    const score = calculateSimilarity(question, example.question);
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = example;
    }
  }
  
  // If we found a match, return the answer
  if (bestMatch && highestScore > 0.5) {
    return bestMatch.answer;
  } else {
    return "I'm not sure how to answer that yet. Can you teach me?";
  }
}

// A very simple function to calculate text similarity
// (Real AI uses much more advanced methods)
function calculateSimilarity(text1, text2) {
  // Convert both texts to lowercase
  const a = text1.toLowerCase();
  const b = text2.toLowerCase();
  
  // Count how many words they share
  const wordsA = a.split(' ');
  const wordsB = b.split(' ');
  
  let matchCount = 0;
  for (const word of wordsA) {
    if (wordsB.includes(word)) {
      matchCount++;
    }
  }
  
  // Calculate a simple similarity score
  const totalWords = Math.max(wordsA.length, wordsB.length);
  return matchCount / totalWords;
}

// Let's try asking our AI Friend some questions
console.log(askAIFriend("What is your name?"));
// Output: "I'm Luna! I love looking at the stars in the night sky."

console.log(askAIFriend("Do you like magical things?"));
// Output: "Oh yes! Magic is wonderful. I know lots of magical stories!"
              `}</pre>
            </div>
            
            <h3 className="font-semibold mt-6">Key Points:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI Friends learn from examples (question-answer pairs)</li>
              <li>When asked a question, they look for the closest matching example</li>
              <li>Real AI systems use much more complex methods to understand and respond</li>
              <li>The more examples you provide, the better your AI Friend becomes!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
