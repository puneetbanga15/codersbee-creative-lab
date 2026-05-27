import { useState, useRef, useCallback } from "react";
import { runPythonCode, validateChallenge } from "@/lib/perplexity";
import {
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Loader2,
  Terminal,
  Code,
  Lightbulb,
  AlertTriangle,
  Bug,
  PenLine,
} from "lucide-react";

type PlaygroundVariant = "challenge" | "debug" | "blank";

interface PythonPlaygroundProps {
  starterCode: string;
  challengeDescription: string;
  moduleColor: string;
  moduleBgColor: string;
  moduleBorderColor: string;
  variant?: PlaygroundVariant;
  hint?: string;
  /** Deterministic bug checks for debug challenges — skips LLM validation when provided */
  debugBugs?: { must: string; hint: string }[];
}

type RunState = "idle" | "running" | "validating" | "done";

const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY as string | undefined;

const VARIANT_META: Record<
  PlaygroundVariant,
  { filename: string; icon: React.ReactNode; label: string; runLabel: string }
> = {
  challenge: {
    filename: "challenge.py",
    icon: <Code className="h-3.5 w-3.5" />,
    label: "Challenge",
    runLabel: "Run",
  },
  debug: {
    filename: "debug_me.py",
    icon: <Bug className="h-3.5 w-3.5 text-red-400" />,
    label: "Debug",
    runLabel: "Test Fix",
  },
  blank: {
    filename: "my_program.py",
    icon: <PenLine className="h-3.5 w-3.5 text-blue-400" />,
    label: "Blank Canvas",
    runLabel: "Run & Check",
  },
};

export function PythonPlayground({
  starterCode,
  challengeDescription,
  moduleColor,
  moduleBgColor,
  moduleBorderColor,
  variant = "challenge",
  hint,
  debugBugs,
}: PythonPlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunState>("idle");
  const [hasError, setHasError] = useState(false);
  const [hasInputCall, setHasInputCall] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [validation, setValidation] = useState<{
    passed: boolean;
    message: string;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const meta = VARIANT_META[variant];
  const isLoading = runState === "running" || runState === "validating";

  const handleRun = useCallback(async () => {
    if (!code.trim() || isLoading) return;

    setRunState("running");
    setOutput(null);
    setValidation(null);
    setHasError(false);
    setHasInputCall(false);

    if (!API_KEY) {
      setOutput("⚠️ No API key configured. Add VITE_PERPLEXITY_API_KEY to your .env file.");
      setHasError(true);
      setRunState("idle");
      return;
    }

    try {
      const result = await runPythonCode(code, API_KEY);
      setOutput(result.output);
      setHasError(result.hasError);
      setHasInputCall(result.hasInputCall);

      if (result.hasError) {
        // After first failure in debug mode, offer the hint
        setFailCount((n) => n + 1);
      }

      // Validate if code ran cleanly
      if (!result.hasError && !result.hasInputCall && result.output) {
        // Debug challenges with explicit bug definitions → deterministic string check
        // (more reliable than LLM for fixed-answer problems)
        if (variant === "debug" && debugBugs && debugBugs.length > 0) {
          const remaining = debugBugs.filter(b => !code.includes(b.must));
          if (remaining.length === 0) {
            setValidation({ passed: true, message: "All bugs squashed! Great debugging work. 🐛✅" });
          } else {
            const bugList = remaining.map(b => `• ${b.hint}`).join("\n");
            setValidation({
              passed: false,
              message: `${remaining.length} bug${remaining.length > 1 ? "s" : ""} still to fix:\n${bugList}`,
            });
            setFailCount((n) => n + 1);
          }
        } else {
          // All other challenges → LLM validation
          setRunState("validating");
          const val = await validateChallenge(result.output, challengeDescription, API_KEY);
          setValidation(val);
          if (!val.passed) setFailCount((n) => n + 1);
        }
      }
    } catch (err) {
      setOutput(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      setHasError(true);
    } finally {
      setRunState("done");
    }
  }, [code, challengeDescription, isLoading]);

  const handleReset = () => {
    setCode(starterCode);
    setOutput(null);
    setValidation(null);
    setHasError(false);
    setHasInputCall(false);
    setRunState("idle");
    setShowHint(false);
    setFailCount(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      setCode(newValue);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleRun();
    }
  };

  // Top accent colour per variant
  const accentBar =
    variant === "debug"
      ? "bg-red-600"
      : variant === "blank"
      ? "bg-blue-600"
      : "bg-green-600";

  const runBtnColor =
    variant === "debug"
      ? "bg-red-600 hover:bg-red-500"
      : variant === "blank"
      ? "bg-blue-600 hover:bg-blue-500"
      : "bg-green-600 hover:bg-green-500";

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-950">
      {/* Variant accent stripe */}
      <div className={`h-1 ${accentBar}`} />

      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 ml-3 text-gray-400">
            {meta.icon}
            <span className="text-xs font-medium">{meta.filename}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition px-2 py-1 rounded hover:bg-gray-800"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isLoading || !code.trim()}
            className={`flex items-center gap-1.5 text-xs font-bold ${runBtnColor} disabled:bg-gray-700 disabled:text-gray-500 text-white px-3 py-1.5 rounded transition`}
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
            {runState === "running"
              ? "Running…"
              : runState === "validating"
              ? "Checking…"
              : `${meta.runLabel}  ⌘↵`}
          </button>
        </div>
      </div>

      {/* Code editor */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-10 bg-gray-900/60 border-r border-gray-800/60 pointer-events-none select-none"
          aria-hidden
        >
          {code.split("\n").map((_, i) => (
            <div
              key={i}
              className="text-right pr-2 text-gray-600 text-xs leading-6 font-mono"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder={
            variant === "blank" ? "# Start typing your Python code here…" : undefined
          }
          className="w-full pl-12 pr-4 py-3 bg-gray-950 text-gray-100 font-mono text-sm leading-6 resize-none outline-none min-h-[200px] caret-green-400 placeholder-gray-700"
          rows={Math.max(8, code.split("\n").length + 1)}
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Output panel */}
      {(output !== null || isLoading) && (
        <div className="border-t border-gray-800">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-gray-800">
            <Terminal className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">Output</span>
            {hasError && (
              <span className="ml-auto text-xs text-red-400 font-semibold flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Error detected
              </span>
            )}
            {hasInputCall && (
              <span className="ml-auto text-xs text-yellow-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Needs input()
              </span>
            )}
            {!hasError && !hasInputCall && output && (
              <span className="ml-auto text-xs text-green-400 font-semibold flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Ran successfully
              </span>
            )}
          </div>

          <pre
            className={`px-4 py-3 font-mono text-sm leading-6 whitespace-pre-wrap min-h-[60px] ${
              isLoading && output === null
                ? "text-gray-500 animate-pulse"
                : hasError
                ? "text-red-400"
                : hasInputCall
                ? "text-yellow-400"
                : "text-green-300"
            }`}
          >
            {isLoading && output === null
              ? runState === "running"
                ? "Running your code…"
                : "Checking your answer…"
              : output}
          </pre>

          {/* Error nudge — with hint reveal for debug mode */}
          {hasError && output && (
            <div className="mx-4 mb-3 space-y-2">
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-900/50 rounded-lg px-3 py-2">
                <Lightbulb className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">
                  {variant === "debug"
                    ? "There's still an error — read the message carefully. It tells you the line number and what went wrong."
                    : "There's an error in your code. Read the message above — it tells you exactly what to fix!"}
                </p>
              </div>

              {/* Hint button — shown after first failure in debug/blank mode */}
              {hint && failCount >= 1 && !showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-yellow-500 underline underline-offset-2 hover:text-yellow-400 transition ml-1"
                >
                  💡 Show me a hint
                </button>
              )}
              {showHint && hint && (
                <div className="flex items-start gap-2 bg-yellow-950/40 border border-yellow-900/50 rounded-lg px-3 py-2">
                  <Lightbulb className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-300">{hint}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hint for blank canvas after failed validation */}
      {validation && !validation.passed && hint && !showHint && (
        <div className="px-4 pb-3">
          <button
            onClick={() => setShowHint(true)}
            className="text-xs text-yellow-500 underline underline-offset-2 hover:text-yellow-400 transition"
          >
            💡 Show me a hint
          </button>
        </div>
      )}
      {showHint && hint && !hasError && (
        <div className="mx-4 mb-3 flex items-start gap-2 bg-yellow-950/40 border border-yellow-900/50 rounded-lg px-3 py-2">
          <Lightbulb className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300">{hint}</p>
        </div>
      )}

      {/* Validation result */}
      {validation && (
        <div
          className={`border-t border-gray-800 px-4 py-4 ${
            validation.passed ? "bg-green-950/40" : "bg-yellow-950/30"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">
              {validation.passed ? (variant === "debug" ? "🐛✅" : "🏆") : "💡"}
            </span>
            <div>
              <div
                className={`text-sm font-bold mb-0.5 ${
                  validation.passed ? "text-green-300" : "text-yellow-300"
                }`}
              >
                {validation.passed
                  ? variant === "debug"
                    ? "All bugs fixed!"
                    : variant === "blank"
                    ? "You wrote it from scratch!"
                    : "Challenge Complete!"
                  : "Not quite — keep tweaking!"}
              </div>
              <p
                className={`text-xs ${
                  validation.passed ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {validation.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-800/50 flex items-center justify-between">
        <span className="text-xs text-gray-600">
          <kbd className="bg-gray-800 text-gray-400 px-1 py-0.5 rounded text-[10px]">Tab</kbd>
          {" "}indent &nbsp;·&nbsp;
          <kbd className="bg-gray-800 text-gray-400 px-1 py-0.5 rounded text-[10px]">⌘ ↵</kbd>
          {" "}run
        </span>
        <span className="text-xs text-gray-700">AI-powered ✨</span>
      </div>
    </div>
  );
}
