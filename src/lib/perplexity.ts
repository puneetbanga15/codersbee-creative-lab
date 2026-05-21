const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const MODEL = "sonar";

const PYTHON_EXECUTOR_PROMPT = `You are a Python 3.11 interpreter for a kids' coding platform.

When given Python code, your job is to simulate running it and return the output.

Rules:
1. Return ONLY what Python would print to stdout — nothing else.
2. If there's a runtime error (TypeError, NameError, SyntaxError, etc.), return the exact Python error message — e.g. "TypeError: can only concatenate str (not \"int\") to str".
3. If the code has input() calls, return this exact message: "⚠️ This code uses input() which needs user interaction. Try it on replit.com!"
4. Do NOT add explanations, markdown, backticks, or commentary of any kind.
5. Preserve newlines in the output exactly as Python would produce them.
6. For random numbers, pick a reasonable value and use it consistently throughout the execution.

Only respond with the raw output text.`;

const CHALLENGE_VALIDATOR_PROMPT = (challengeDescription: string) =>
  `You are a friendly coding coach for kids aged 10-14.

A kid just completed a Python coding challenge. Here is the challenge description:
"${challengeDescription}"

Here is the output their code produced:
`;

export interface RunResult {
  output: string;
  hasError: boolean;
  hasInputCall: boolean;
}

export interface ValidationResult {
  passed: boolean;
  message: string;
}

export async function runPythonCode(
  code: string,
  apiKey: string
): Promise<RunResult> {
  const hasInputCall = /\binput\s*\(/.test(code);

  if (hasInputCall) {
    return {
      output: "⚠️ This code uses input() which needs user interaction. Try it on replit.com!",
      hasError: false,
      hasInputCall: true,
    };
  }

  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: PYTHON_EXECUTOR_PROMPT },
        { role: "user", content: `Run this Python code:\n\n${code}` },
      ],
      temperature: 0,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const output: string = data.choices?.[0]?.message?.content ?? "";

  const errorKeywords = ["Error", "Traceback", "SyntaxError", "NameError", "TypeError", "ValueError", "IndentationError"];
  const hasError = errorKeywords.some((kw) => output.includes(kw));

  return { output: output.trim(), hasError, hasInputCall: false };
}

export async function validateChallenge(
  output: string,
  challengeDescription: string,
  apiKey: string
): Promise<ValidationResult> {
  const prompt =
    CHALLENGE_VALIDATOR_PROMPT(challengeDescription) +
    `\n"${output}"\n\n` +
    `Did the kid's code output show that they completed the challenge? ` +
    `Reply with a JSON object: { "passed": true/false, "message": "one encouraging sentence for a kid, max 15 words, with an emoji" }. ` +
    `Only reply with the JSON — nothing else.`;

  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    return { passed: false, message: "Could not validate — but great effort! 🌟" };
  }

  const data = await response.json();
  const raw: string = data.choices?.[0]?.message?.content ?? "{}";

  try {
    // Strip any markdown fences the model might add
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return {
      passed: !!parsed.passed,
      message: parsed.message ?? "Nice work! 🎉",
    };
  } catch {
    return { passed: false, message: "Could not validate — but great effort! 🌟" };
  }
}
