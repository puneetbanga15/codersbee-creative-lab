
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LLMBasicsCode: React.FC = () => {
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
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
        <h2 className="text-xl font-bold text-purple-900 mb-3">Behind the Code: How LLMs Work</h2>
        <p className="text-gray-700 mb-4">
          Let's take a peek at some simplified code that represents how large language models work.
          Remember that real LLMs are much more complex, but these examples will help you understand the basic concepts!
        </p>
      </div>
      
      <Tabs defaultValue="prediction">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prediction">Text Prediction</TabsTrigger>
          <TabsTrigger value="tokenization">Tokenization</TabsTrigger>
          <TabsTrigger value="prompt-processing">Prompt Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prediction" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Next Word Prediction (Simplified)</h3>
            <p className="text-gray-700">
              At its core, an LLM predicts the next token (usually a word or part of a word) based on what came before it.
              Here's a very simplified example of how this might work:
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{`// A very simplified example of next word prediction

// Imagine this is our training data
const trainingExamples = [
  "The cat sat on the mat",
  "The dog sat on the floor",
  "The bird flew in the sky"
];

// Build a simple prediction model based on word pairs
function buildModel(examples) {
  const model = {};
  
  examples.forEach(example => {
    const words = example.split(' ');
    
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      
      if (!model[currentWord]) {
        model[currentWord] = {};
      }
      
      if (!model[currentWord][nextWord]) {
        model[currentWord][nextWord] = 0;
      }
      
      model[currentWord][nextWord] += 1;
    }
  });
  
  return model;
}

// Predict the next word based on the current word
function predictNextWord(model, currentWord) {
  if (!model[currentWord]) {
    return "I don't know what comes next";
  }
  
  // Find the most likely next word
  let bestNextWord = null;
  let highestCount = 0;
  
  for (const [word, count] of Object.entries(model[currentWord])) {
    if (count > highestCount) {
      highestCount = count;
      bestNextWord = word;
    }
  }
  
  return bestNextWord;
}

// Build our simple model
const simpleModel = buildModel(trainingExamples);

// Use it to predict
console.log(predictNextWord(simpleModel, "The")); // Might return "cat" or "dog" or "bird"
console.log(predictNextWord(simpleModel, "sat")); // Would return "on"
console.log(predictNextWord(simpleModel, "the")); // Might return "mat" or "floor" or "sky"

// Real LLMs are much more complex, with billions of parameters,
// but the basic idea of predicting what comes next based on patterns
// in training data is similar`}</pre>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">Why This Matters:</h4>
              <p className="text-gray-700">
                Real LLMs don't just look at the previous word - they consider the entire context. 
                They also use much more sophisticated neural networks with billions of parameters. 
                But this simple example helps you understand that fundamentally, LLMs are making predictions
                based on patterns they've seen during training.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tokenization" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tokenization</h3>
            <p className="text-gray-700">
              Before processing text, LLMs break it down into "tokens" - these can be words, parts of words, 
              or even individual characters. Here's a simplified example of tokenization:
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{`// A simplified tokenization example

// This is a very basic tokenizer that splits text into words
function simpleTokenizer(text) {
  // Remove punctuation and convert to lowercase
  const cleanedText = text.toLowerCase().replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_\`~()]/g, "");
  
  // Split into words
  const tokens = cleanedText.split(' ');
  
  return tokens;
}

// Real tokenizers are more complex and might split words into subwords
function subwordTokenizer(text) {
  // This is just a demonstration, real subword tokenizers use algorithms
  // like Byte-Pair Encoding (BPE) or WordPiece
  
  // For example, "playing" might be split into "play" + "ing"
  const madeUpVocabulary = {
    "play": 1,
    "ing": 2,
    "super": 3,
    "hero": 4,
    "dog": 5,
    "s": 6,
    "like": 7,
    "bone": 8
  };
  
  // Pretend we're doing proper subword tokenization
  // In reality, this is much more complex
  let result = [];
  const words = text.toLowerCase().split(' ');
  
  words.forEach(word => {
    // Check if the word is in our vocabulary
    if (madeUpVocabulary[word]) {
      result.push(word);
    } else {
      // Pretend we're breaking it down
      // (This is not how real subword tokenization works)
      result.push("[UNKNOWN_TOKEN]");
    }
  });
  
  return result;
}

// Example usage
const sentence = "Superheroes like playing with dogs";

console.log("Word tokens:", simpleTokenizer(sentence));
// Would output: ["superheroes", "like", "playing", "with", "dogs"]

// In real subword tokenization, it might output something like:
// ["super", "hero", "es", "like", "play", "ing", "with", "dog", "s"]
// depending on the vocabulary and algorithm used`}</pre>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-800 mb-2">Why Tokenization Matters:</h4>
              <p className="text-gray-700">
                Breaking text into tokens helps the AI process language more efficiently. It allows the model 
                to handle words it hasn't seen before by breaking them into familiar parts. This is why LLMs 
                can sometimes understand made-up words if they're composed of familiar parts!
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prompt-processing" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Prompt Processing</h3>
            <p className="text-gray-700">
              When you send a prompt to an LLM, it goes through several processing steps. Here's a 
              simplified example of what might happen:
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{`// Simplified prompt processing

// This function represents how an AI might process your prompt
function processPrompt(prompt, maxTokens = 100) {
  // Step 1: Tokenize the prompt
  const tokens = tokenize(prompt);
  
  // Step 2: Add any system instructions or context
  const processedPrompt = [
    "You are a helpful AI assistant that provides accurate information.",
    prompt
  ];
  
  // Step 3: Generate a response
  const response = generateResponse(processedPrompt, maxTokens);
  
  return response;
}

// Pretend tokenizer
function tokenize(text) {
  return text.split(' ');
}

// Pretend response generator
function generateResponse(promptArray, maxTokens) {
  // In a real LLM, this would be where the neural network does its magic,
  // using billions of parameters to predict the most likely next tokens
  
  // For this example, we'll return a hardcoded response
  if (promptArray[1].includes("weather")) {
    return "I don't have access to real-time weather data, but I can tell you that weather is the state of the atmosphere at a particular place and time.";
  } else if (promptArray[1].includes("help")) {
    return "I'm here to help! Please let me know what you're looking for information about.";
  } else {
    return "I'm an AI assistant designed to provide helpful information. I don't have access to real-time data or the ability to browse the internet.";
  }
}

// Example usage
const userPrompt = "Can you help me understand how weather works?";
console.log(processPrompt(userPrompt));

// In reality, prompt processing includes much more:
// - Checking against safety guidelines
// - Adding conversation history for context
// - Temperature settings for creativity vs. accuracy
// - Complex neural network operations
// - Many more steps!`}</pre>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">Why This Matters for Prompt Engineering:</h4>
              <p className="text-gray-700">
                Understanding how your prompt is processed helps you write better prompts. For example, 
                knowing that the AI considers your prompt in context with system instructions helps explain 
                why being clear and specific is important. The better your prompt, the more accurately the 
                AI can generate the response you're looking for!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
        <h3 className="font-medium text-orange-800 mb-2">Remember:</h3>
        <p className="text-gray-700">
          These code examples are extremely simplified! Real large language models use:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>Neural networks with billions of parameters</li>
          <li>Attention mechanisms to focus on relevant parts of text</li>
          <li>Advanced tokenization algorithms</li>
          <li>Multiple layers of processing</li>
          <li>Sophisticated training techniques</li>
        </ul>
        <p className="mt-3 text-gray-700">
          The code here is meant to help you understand the basic concepts, but real LLMs are much
          more complex and powerful!
        </p>
      </div>
    </div>
  );
};
