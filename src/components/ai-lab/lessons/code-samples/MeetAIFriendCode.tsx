import React, { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MeetAIFriendCodeProps {
  onComplete?: () => void;
}

export const MeetAIFriendCode = ({ onComplete }: MeetAIFriendCodeProps) => {
  // Emit event when component mounts to indicate we're at the end of the section
  useEffect(() => {
    // Create and dispatch a custom event to notify the parent component
    const event = new CustomEvent('sectionEndReached', { 
      detail: { isAtEnd: true }
    });
    window.dispatchEvent(event);
    
    return () => {
      // Reset when unmounting
      const resetEvent = new CustomEvent('sectionEndReached', { 
        detail: { isAtEnd: false }
      });
      window.dispatchEvent(resetEvent);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <p className="mb-4">
        Here's the code that powers our AI Friend chatbot. This is a simplified version that shows the basic concepts
        of how AI chatbots work through pattern matching and response selection.
      </p>

      <Tabs defaultValue="javascript" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="scratch">Scratch-like</TabsTrigger>
        </TabsList>
        
        <TabsContent value="javascript" className="mt-4">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{`// AI Friend Chatbot - JavaScript Version

// Character class to create different AI personalities
class AICharacter {
  constructor(name, personality, responses) {
    this.name = name;
    this.personality = personality;
    this.responses = responses;
    this.defaultResponse = "I'm not sure how to respond to that.";
  }
  
  // Method to generate a response based on user input
  respond(userInput) {
    // Convert input to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Check each keyword in our responses object
    for (const [keyword, response] of Object.entries(this.responses)) {
      // If the input contains this keyword, return the matching response
      if (input.includes(keyword)) {
        return response;
      }
    }
    
    // If no keywords matched, return the default response
    return this.defaultResponse;
  }
  
  // Method to add new responses to the character
  train(keyword, response) {
    this.responses[keyword] = response;
    console.log(\`\${this.name} has learned a new response for "\${keyword}"\`);
  }
}

// Create Harry Potter character
const harryPotter = new AICharacter(
  "Harry Potter",
  "Brave young wizard from Hogwarts",
  {
    "hello": "Hello there! Ready for some magic?",
    "who are you": "I'm Harry Potter, the Boy Who Lived!",
    "hogwarts": "Hogwarts is my home, the best wizarding school there is!",
    "magic": "I could teach you some spells, but we'd need to get you a wand first.",
    "voldemort": "Let's not talk about He-Who-Must-Not-Be-Named...",
    "friends": "Ron and Hermione are my best friends. We've been through a lot together."
  }
);

// Create Einstein character
const einstein = new AICharacter(
  "Albert Einstein",
  "Brilliant physicist with a curious mind",
  {
    "hello": "Greetings! It's all relative, including our conversation.",
    "who are you": "I am Albert Einstein, physicist and thinker of thought experiments.",
    "physics": "Physics is the poetry of nature, written in the language of mathematics.",
    "relativity": "Time and space are not as constant as they appear. That's the essence of relativity.",
    "energy": "E=mc², perhaps my most famous equation, showing the equivalence of mass and energy.",
    "universe": "The most incomprehensible thing about the universe is that it is comprehensible."
  }
);

// Example usage
console.log(harryPotter.respond("Hello, who are you?"));
// Output: "Hello there! Ready for some magic?"

console.log(einstein.respond("Can you tell me about relativity?"));
// Output: "Time and space are not as constant as they appear. That's the essence of relativity."

// Training example
harryPotter.train("quidditch", "Quidditch is the best sport ever! I'm a pretty good Seeker, if I do say so myself.");
console.log(harryPotter.respond("Do you like quidditch?"));
// Output: "Quidditch is the best sport ever! I'm a pretty good Seeker, if I do say so myself."
`}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="python" className="mt-4">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{`# AI Friend Chatbot - Python Version

class AICharacter:
    """A class to create different AI character personalities"""
    
    def __init__(self, name, personality, responses):
        self.name = name
        self.personality = personality
        self.responses = responses
        self.default_response = "I'm not sure how to respond to that."
    
    def respond(self, user_input):
        """Generate a response based on user input"""
        # Convert input to lowercase for easier matching
        input_text = user_input.lower()
        
        # Check each keyword in our responses dictionary
        for keyword, response in self.responses.items():
            # If the input contains this keyword, return the matching response
            if keyword in input_text:
                return response
        
        # If no keywords matched, return the default response
        return self.default_response
    
    def train(self, keyword, response):
        """Add a new response to the character"""
        self.responses[keyword] = response
        print(f"{self.name} has learned a new response for '{keyword}'")


# Create Krishna character
krishna = AICharacter(
    "Krishna",
    "Divine guide with wisdom and compassion",
    {
        "hello": "Namaste! I am here to guide you on your journey.",
        "who are you": "I am Krishna, a divine being who guides those who seek wisdom.",
        "life": "Life is a precious gift. Focus on your dharma - your purpose and duty.",
        "worried": "Do not worry about the results, focus only on your actions with devotion.",
        "purpose": "Your purpose is to fulfill your potential while serving others.",
        "happiness": "True happiness comes from within, not from external possessions or achievements."
    }
)

# Create Shakespeare character
shakespeare = AICharacter(
    "William Shakespeare",
    "Eloquent playwright with a flair for drama",
    {
        "hello": "What light through yonder window breaks? 'Tis a greeting, and a fair one at that!",
        "who are you": "I am the Bard of Avon, William Shakespeare, weaver of words and tales.",
        "love": "Love looks not with the eyes, but with the mind, and therefore is winged Cupid painted blind.",
        "life": "All the world's a stage, and all the men and women merely players.",
        "death": "To be, or not to be, that is the question that haunts all mortal souls.",
        "writing": "The pen is mightier than the sword, especially when dipped in the ink of imagination."
    }
)

# Example usage
print(krishna.respond("Hello, who are you?"))
# Output: "Namaste! I am here to guide you on your journey."

print(shakespeare.respond("What do you think about life?"))
# Output: "All the world's a stage, and all the men and women merely players."

# Training example
krishna.train("meditation", "Meditation is the path to inner peace. When the mind is still, wisdom arises.")
print(krishna.respond("How do I practice meditation?"))
# Output: "Meditation is the path to inner peace. When the mind is still, wisdom arises."
`}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="scratch" className="mt-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <p className="mb-4 text-gray-700">
              Here's how you might create an AI Friend in a block-based coding environment like Scratch:
            </p>
            <img 
              src="/placeholder-scratch-blocks.png" 
              alt="Placeholder for Scratch-like blocks" 
              className="w-full max-w-lg mx-auto border border-gray-300 rounded-md"
            />
            <div className="mt-4 bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                Note: This is a visual representation. In Scratch, you would create lists for keywords and responses,
                then use "if" blocks to check if the user's message contains items from the keyword list.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-blue-50 p-5 rounded-lg">
        <h3 className="font-medium text-lg mb-3 text-blue-800">Code Explanation:</h3>
        <ol className="list-decimal pl-5 space-y-3 text-blue-700">
          <li>
            <strong>Character Class/Object:</strong> We create a blueprint for our AI characters with properties like name, personality, and a list of responses.
          </li>
          <li>
            <strong>Response Matching:</strong> When a user sends a message, the AI looks for keywords in the message and returns the matching response.
          </li>
          <li>
            <strong>Training Method:</strong> We can add new keyword-response pairs to teach our AI new responses.
          </li>
          <li>
            <strong>Different Personalities:</strong> By creating different response sets, we give each character their unique "personality."
          </li>
        </ol>
      </div>

      <div className="mt-4 bg-purple-50 p-5 rounded-lg">
        <h3 className="font-medium text-lg mb-3 text-purple-800">Try It Yourself:</h3>
        <p className="text-purple-700 mb-3">
          You can copy this code and modify it to create your own AI character with a unique personality!
          Try adding new responses or creating an entirely new character.
        </p>
        <p className="text-purple-700">
          Challenge: Can you improve the code to handle multiple keywords in a single message? Or make it
          remember previous messages in the conversation?
        </p>
      </div>
    </div>
  );
};
