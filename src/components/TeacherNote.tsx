import { useState } from "react";
import { Copy, Check, Send } from "lucide-react";

interface TeacherNoteProps {
  moduleId: number;
  moduleTitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const CONFIDENCE_OPTIONS = [
  { emoji: "😕", label: "I'm confused", value: 1 },
  { emoji: "🤔", label: "Sort of got it", value: 2 },
  { emoji: "😊", label: "I understood it", value: 3 },
  { emoji: "🤩", label: "I loved it!", value: 4 },
];

export function TeacherNote({
  moduleId,
  moduleTitle,
  color,
  bgColor,
  borderColor,
}: TeacherNoteProps) {
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [helpWith, setHelpWith] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedConfidence = CONFIDENCE_OPTIONS.find((o) => o.value === confidence);

  const buildMessage = () => {
    const conf = selectedConfidence
      ? `${selectedConfidence.emoji} ${selectedConfidence.label}`
      : "not rated";
    const help = helpWith.trim()
      ? `\n\n🙋 I need a little help with:\n${helpWith.trim()}`
      : "";

    return `Hi! 👋 I just finished Day ${moduleId}: ${moduleTitle} on the CodersBee Summer Camp.

Here's what I learned, in my own words:
${learned.trim() || "(I'll fill this in!)"}

How confident I feel: ${conf}${help}

— Sent from the CodersBee Summer Camp 🐝`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = buildMessage();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isReady = learned.trim().length > 10 && confidence !== null;

  return (
    <div className={`rounded-2xl border-2 ${borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`${bgColor} px-6 py-5`}>
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">💌</span>
          <div>
            <h3 className={`font-extrabold text-lg ${color} leading-tight`}>
              Note to Your Teacher
            </h3>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Your teacher genuinely wants to know how today went for you — the good bits and the tricky bits.
              There are no wrong answers here. Just write in your own words, like you're telling a friend.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-6 space-y-6">

        {/* What did you learn */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            In your own words — what did you learn today? ✍️
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Don't worry about sounding technical. Just explain it like you'd tell a friend what was cool about today.
          </p>
          <textarea
            value={learned}
            onChange={(e) => setLearned(e.target.value)}
            placeholder="e.g. Today I learned that print() is like telling the computer to speak out loud. You have to put your words in quotes or Python gets confused..."
            rows={4}
            className={`w-full text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border-2 rounded-xl px-4 py-3 resize-none outline-none focus:border-current transition leading-relaxed ${borderColor}`}
          />
          <div className="text-right text-xs text-gray-300 mt-1">
            {learned.length} characters
          </div>
        </div>

        {/* Confidence meter */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            How confident do you feel after today? 🎯
          </label>
          <p className="text-xs text-gray-400 mb-3">
            Be honest — it helps your teacher know where to focus next time.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONFIDENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setConfidence(opt.value)}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all text-center ${
                  confidence === opt.value
                    ? `${bgColor} ${borderColor} ${color}`
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-xs font-semibold leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Help needed */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">
            Is there anything you'd like help with? 🙋 <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <p className="text-xs text-gray-400 mb-2">
            No question is too small. If something felt confusing or you want to explore something more — just say so!
          </p>
          <textarea
            value={helpWith}
            onChange={(e) => setHelpWith(e.target.value)}
            placeholder="e.g. I got confused about why you need quotes around text. Can we go over that next time?"
            rows={2}
            className={`w-full text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border-2 rounded-xl px-4 py-3 resize-none outline-none focus:border-current transition leading-relaxed ${borderColor}`}
          />
        </div>

        {/* Preview + copy */}
        {isReady && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Send className="h-3 w-3" />
              Your message preview
            </div>
            <pre className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed font-sans">
              {buildMessage()}
            </pre>
          </div>
        )}

        <button
          onClick={handleCopy}
          disabled={!isReady}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
            isReady
              ? copied
                ? "bg-green-500 text-white"
                : `bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-[1.01] shadow-md`
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied! Paste it into WhatsApp or email 📲
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {isReady
                ? "Copy message to send teacher"
                : "Fill in what you learned + pick a confidence level first"}
            </>
          )}
        </button>

        {!isReady && (
          <p className="text-center text-xs text-gray-400">
            Write at least a sentence about what you learned, and pick how confident you feel — then the copy button activates!
          </p>
        )}
      </div>
    </div>
  );
}
