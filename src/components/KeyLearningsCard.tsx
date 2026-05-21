import { CheckCircle, Download } from "lucide-react";

interface KeyLearningsCardProps {
  moduleId: number;
  moduleTitle: string;
  moduleEmoji: string;
  moduleDuration: string;
  learnings: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

export function KeyLearningsCard({
  moduleId,
  moduleTitle,
  moduleEmoji,
  moduleDuration,
  learnings,
  color,
  bgColor,
  borderColor,
}: KeyLearningsCardProps) {
  return (
    <div className={`rounded-2xl border-2 ${borderColor} overflow-hidden`}>
      {/* Header */}
      <div className={`${bgColor} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{moduleEmoji}</span>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {moduleDuration} · Key Learnings
            </div>
            <h3 className={`font-extrabold text-lg ${color}`}>
              Today I Learned…
            </h3>
          </div>
        </div>
        <div className={`text-4xl font-black ${color} opacity-10 select-none`}>
          {moduleId}
        </div>
      </div>

      {/* Learning tiles */}
      <div className="bg-white px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {learnings.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full ${bgColor} ${borderColor} border flex items-center justify-center mt-0.5`}>
                <CheckCircle className={`h-3.5 w-3.5 ${color}`} />
              </div>
              <p className="text-sm text-gray-700 leading-snug">{item}</p>
            </div>
          ))}
        </div>

        {/* Screenshot nudge */}
        <div className={`mt-5 flex items-center gap-2 ${bgColor} rounded-xl px-4 py-3 border ${borderColor}`}>
          <Download className={`h-4 w-4 ${color} flex-shrink-0`} />
          <p className="text-xs text-gray-600">
            <span className={`font-bold ${color}`}>Take a screenshot!</span>{" "}
            Save this card — it's your proof of what you learned today. Share it with a friend or parent. 📸
          </p>
        </div>
      </div>
    </div>
  );
}
