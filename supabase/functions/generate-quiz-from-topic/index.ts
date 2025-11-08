/// <reference lib="deno.unstable" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizGenerationRequest {
  topicId: string;
  title: string;
  description?: string;
  content: string;
  quizType: string;
  difficulty: 'easy' | 'intermediate' | 'complex';
  numQuestions: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    // Get Perplexity API Key
    const perplexityKey = Deno.env.get('PERPLEXITYKEY') || Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) {
      throw new Error('Perplexity API key not configured');
    }

    // Get Supabase credentials
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request
    const requestData = await req.json() as QuizGenerationRequest;
    console.log('Generating quiz for topic:', requestData.title);

    // Update status to generating
    await supabase
      .from('quiz_topics')
      .update({ generation_status: 'generating' })
      .eq('id', requestData.topicId);

    // Generate quiz using Perplexity
    const questions = await generateQuizQuestions(
      perplexityKey,
      requestData.content,
      requestData.title,
      requestData.difficulty,
      requestData.numQuestions
    );

    // Create quiz in database
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title: requestData.title,
        description: requestData.description || `AI-generated quiz on ${requestData.title}`,
        quiz_type: requestData.quizType,
        difficulty: requestData.difficulty,
        is_premium: false
      })
      .select()
      .single();

    if (quizError) throw quizError;

    // Insert questions
    const questionsToInsert = questions.map((q) => ({
      quiz_id: quiz.id,
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation
    }));

    const { error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert);

    if (questionsError) throw questionsError;

    // Update topic with generated quiz ID and status
    await supabase
      .from('quiz_topics')
      .update({
        generated_quiz_id: quiz.id,
        generation_status: 'completed'
      })
      .eq('id', requestData.topicId);

    return new Response(
      JSON.stringify({
        success: true,
        quiz: quiz,
        questionsCount: questions.length
      }),
      {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error generating quiz:', error);

    // Try to update status to failed if we have topicId
    try {
      const requestData = await req.json() as QuizGenerationRequest;
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('quiz_topics')
        .update({ generation_status: 'failed' })
        .eq('id', requestData.topicId);
    } catch (e) {
      console.error('Error updating failed status:', e);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

async function generateQuizQuestions(
  apiKey: string,
  content: string,
  title: string,
  difficulty: string,
  numQuestions: number
): Promise<QuizQuestion[]> {

  const difficultyInstructions = {
    easy: 'Create simple, straightforward questions suitable for beginners. Use clear language and basic concepts.',
    intermediate: 'Create moderately challenging questions that require understanding of key concepts and relationships.',
    complex: 'Create advanced questions that require deep understanding, critical thinking, and application of concepts.'
  };

  const systemPrompt = `You are an expert educational quiz creator. Generate ${numQuestions} multiple-choice questions based on the provided topic content.

Requirements:
- Difficulty Level: ${difficulty.toUpperCase()} - ${difficultyInstructions[difficulty as keyof typeof difficultyInstructions]}
- Each question must have exactly 4 options
- Only ONE option should be correct
- Include a brief explanation for the correct answer (1-2 sentences)
- Questions should test understanding, not just memorization
- Make questions engaging and age-appropriate for children (ages 8-14)

IMPORTANT: Respond ONLY with valid JSON in this exact format, no additional text:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option A",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}`;

  const userPrompt = `Topic: ${title}

Content:
${content}

Generate ${numQuestions} ${difficulty} difficulty quiz questions in JSON format.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in API response');
    }

    // Parse JSON response
    let parsedResponse;
    try {
      // Try to find JSON in the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = JSON.parse(content);
      }
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', content);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate response structure
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error('Invalid response structure from AI');
    }

    // Validate each question
    const validatedQuestions: QuizQuestion[] = parsedResponse.questions.map((q: any, index: number) => {
      if (!q.question || !q.options || !q.correct_answer || !q.explanation) {
        throw new Error(`Question ${index + 1} is missing required fields`);
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question ${index + 1} must have exactly 4 options`);
      }
      if (!q.options.includes(q.correct_answer)) {
        throw new Error(`Question ${index + 1} correct answer not in options`);
      }
      return {
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation
      };
    });

    console.log(`Successfully generated ${validatedQuestions.length} questions`);
    return validatedQuestions;

  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw error;
  }
}
