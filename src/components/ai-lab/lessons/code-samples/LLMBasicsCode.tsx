
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LLMBasicsCodeProps {
  onComplete?: () => void;
}

export const LLMBasicsCode = ({ onComplete }: LLMBasicsCodeProps) => {
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
          <h2 className="text-xl font-bold mb-4">Behind the Scenes: Language Model Code</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Here's a simplified example of how you might interact with a language model through code. 
              This shows how prompts are sent to the AI and how responses are received.
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`
// Example of using a language model API in JavaScript

// This function sends a prompt to a language model and gets a response
async function askLanguageModel(prompt, options = {}) {
  // In a real application, this would make an API call to an LLM service
  console.log("Sending prompt to language model:", prompt);
  
  // Define default options for our request
  const defaultOptions = {
    temperature: 0.7,       // Controls randomness (0 = deterministic, 1 = creative)
    maxTokens: 100,         // Maximum length of response
    topP: 0.9,              // Controls diversity
    presencePenalty: 0.0,   // Discourages repetition
    frequencyPenalty: 0.0,  // Discourages frequent tokens
  };
  
  // Combine default options with any user-provided options
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    // In a real app, we would make an API call like this:
    // const response = await fetch('https://api.languagemodel.com/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt,
    //     ...requestOptions
    //   })
    // });
    // const data = await response.json();
    // return data.text;
    
    // For this example, we'll simulate a response
    return simulateLanguageModelResponse(prompt, requestOptions);
  } catch (error) {
    console.error("Error calling language model:", error);
    return "Sorry, I couldn't process your request.";
  }
}

// This is a simplified simulation of how a language model might respond
// Real language models are much more sophisticated!
function simulateLanguageModelResponse(prompt, options) {
  // In reality, language models use billions of parameters
  // and complex neural networks to generate text
  
  if (prompt.includes("hello") || prompt.includes("hi")) {
    return "Hello! How can I help you today?";
  }
  
  if (prompt.includes("poem") || prompt.includes("poetry")) {
    return "Here's a short poem for you:\n\nDigital dreams in code,\nSilicon thoughts unfold,\nLanguage models learn and grow,\nIn the data's endless flow.";
  }
  
  if (prompt.includes("explain") || prompt.includes("what is")) {
    return "I'd be happy to explain that topic! When providing explanations, I analyze relevant information and present it in a clear, structured way that's easy to understand.";
  }
  
  return "I've processed your request. Is there anything specific you'd like to know more about?";
}

// Example usage:
async function demonstrateLLM() {
  console.log("Example 1: Basic question");
  const response1 = await askLanguageModel("Hello, how are you?");
  console.log("Response:", response1);
  
  console.log("\nExample 2: Creative request");
  const response2 = await askLanguageModel(
    "Write a short poem about coding", 
    { temperature: 0.9, maxTokens: 150 }
  );
  console.log("Response:", response2);
  
  console.log("\nExample 3: Specific instructions");
  const response3 = await askLanguageModel(
    "Explain how language models work in 3 simple points", 
    { temperature: 0.2 }  // Lower temperature for more focused response
  );
  console.log("Response:", response3);
}

// Run the demonstration
demonstrateLLM();
              `}</pre>
            </div>
            
            <h3 className="font-semibold mt-6">Key Points:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Language models are accessed through APIs (Application Programming Interfaces)</li>
              <li>You send a prompt and receive a response</li>
              <li>You can control various parameters to adjust how the AI responds</li>
              <li>Real language models are much more complex than this simplified example</li>
              <li>The quality of the response depends greatly on the quality of the prompt</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
