import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { summerCampModules } from "@/data/summerCampModules";
import { PythonPlayground } from "@/components/PythonPlayground";
import { KeyLearningsCard } from "@/components/KeyLearningsCard";
import { TeacherNote } from "@/components/TeacherNote";
import { useCampAuth } from "@/context/CampAuthContext";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  Code,
  Zap,
  BookOpen,
  Star,
  ArrowRight,
  Lock,
  Loader2,
} from "lucide-react";

export default function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, token } = useCampAuth();
  const id = parseInt(moduleId || "1", 10);
  const mod = summerCampModules.find((m) => m.id === id);

  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // ── Auth guard: module 1 is free, 2-15 require login ──────────────────────
  const requiresAuth = id > 1;

  useEffect(() => {
    if (requiresAuth && !isLoading && !isAuthenticated) {
      navigate(`/summer-camp/login?next=/summer-camp/module/${id}`, { replace: true });
    }
  }, [requiresAuth, isLoading, isAuthenticated, id, navigate]);

  // Show spinner while we check auth
  if (requiresAuth && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  // Block render until redirect fires (avoids flash of content)
  if (requiresAuth && !isAuthenticated) return null;

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">Module not found.</p>
        <Link to="/summer-camp" className="mt-4 text-orange-500 underline">
          Back to Summer Camp
        </Link>
      </div>
    );
  }

  const prevMod = summerCampModules.find((m) => m.id === id - 1);
  const nextMod = summerCampModules.find((m) => m.id === id + 1);

  const handleAnswerSelect = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    const updated = [...quizAnswers];
    updated[qIndex] = optIndex;
    setQuizAnswers(updated);
  };

  const handleQuizSubmit = () => {
    if (quizAnswers.filter((a) => a !== null && a !== undefined).length < mod.quiz.length) return;
    const score = mod.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
    setQuizSubmitted(true);
    // Save progress to server (fire-and-forget — don't block the UI)
    if (token) {
      fetch("/.netlify/functions/camp-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ moduleId: id, score, total: mod.quiz.length }),
      }).catch(() => { /* silent — progress saving is best-effort */ });
    }
  };

  const quizScore = quizSubmitted
    ? mod.quiz.filter((q, i) => quizAnswers[i] === q.correct).length
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Top bar */}
      <div className={`pt-20 ${mod.bgColor} border-b ${mod.borderColor}`}>
        <div className="container mx-auto px-4 max-w-4xl py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/summer-camp" className="hover:text-orange-500 transition">
              Summer Camp
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className={`font-semibold ${mod.color}`}>{mod.duration}</span>
          </div>

          {/* Module header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{mod.emoji}</span>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {mod.duration} of 15
                  </div>
                  <h1 className={`text-3xl font-extrabold ${mod.color}`}>
                    {mod.title}
                  </h1>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{mod.tagline}</p>
            </div>

            {/* Progress pill */}
            <div className="flex items-center gap-2 bg-white/80 border border-white rounded-xl px-4 py-2 self-start">
              <div className="flex gap-1">
                {summerCampModules.map((m) => (
                  <div
                    key={m.id}
                    className={`h-1.5 rounded-full transition-all ${
                      m.id < id
                        ? "bg-green-400 w-3"
                        : m.id === id
                        ? "bg-orange-400 w-4"
                        : "bg-gray-200 w-3"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                {id}/15
              </span>
            </div>
          </div>

          {/* Topic chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {mod.topics.map((t) => (
              <span
                key={t}
                className="text-xs bg-white/70 text-gray-600 px-3 py-1 rounded-full border border-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-4xl py-10">

        {/* ── Video Section ── */}
        {mod.videoUrl && (
          <div className="mb-8">
            {/* Parent / kid instruction banner */}
            <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 mb-4">
              <span className="text-2xl flex-shrink-0">🎬</span>
              <div>
                <p className="font-bold text-amber-800 text-sm mb-0.5">
                  Start here — watch the video first!
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Before reading or coding anything, watch this short video all the way through.
                  It will make everything below much easier to understand.
                  <span className="block mt-1 text-amber-600 text-xs font-medium">
                    👨‍👩‍👧 For parents: help your child get settled, press play, and let them watch independently. The lesson and coding exercises follow below.
                  </span>
                </p>
              </div>
            </div>

            {/* Video player — responsive 16:9 wrapper works across all browsers */}
            <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg bg-black relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={mod.videoUrl}
                title="Day 1 — Your First Line of Python"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* After-video prompt */}
            <div className={`mt-3 flex items-center gap-2 ${mod.bgColor} border ${mod.borderColor} rounded-xl px-4 py-2.5`}>
              <span className="text-lg">✅</span>
              <p className={`text-sm ${mod.color} font-medium`}>
                Finished the video? Great — now scroll down to read the lesson and try the coding challenges!
              </p>
            </div>
          </div>
        )}

        {/* Intro */}
        <div className={`rounded-2xl border-2 ${mod.borderColor} ${mod.bgColor} p-6 mb-8`}>
          <div className="flex items-start gap-3">
            <Lightbulb className={`h-6 w-6 ${mod.color} flex-shrink-0 mt-0.5`} />
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Today's Adventure</h2>
              <p className="text-gray-700 leading-relaxed">{mod.intro}</p>
            </div>
          </div>
        </div>

        {/* Section nav tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {mod.sections.map((sec, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeSection === i
                  ? `${mod.bgColor} ${mod.color} border-2 ${mod.borderColor}`
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {i + 1}. {sec.title.split("—")[0].split(" ").slice(0, 3).join(" ")}
            </button>
          ))}
        </div>

        {/* Active section content */}
        {mod.sections.map((section, sIdx) => (
          <div
            key={sIdx}
            className={sIdx === activeSection ? "block" : "hidden"}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className={`h-5 w-5 ${mod.color}`} />
                {section.title}
              </h2>

              {/* Main content */}
              <p className="text-gray-700 leading-relaxed mb-5">{section.content}</p>

              {/* Analogy box */}
              {section.analogy && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💡</span>
                  <div>
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                      Think of it this way
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      {section.analogy}
                    </p>
                  </div>
                </div>
              )}

              {/* Code block */}
              {section.code && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-t-xl">
                    <Code className="h-3.5 w-3.5" />
                    <span>Python</span>
                    <div className="ml-auto flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                    </div>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-5 rounded-b-xl text-sm overflow-x-auto leading-relaxed font-mono">
                    {section.code}
                  </pre>
                </div>
              )}

              {/* Tip box */}
              {section.tip && (
                <div className={`${mod.bgColor} border ${mod.borderColor} rounded-xl p-4 flex items-start gap-3`}>
                  <Zap className={`h-4 w-4 ${mod.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <div className={`text-xs font-bold ${mod.color} uppercase tracking-wider mb-1`}>
                      Pro Tip
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{section.tip}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Section navigation */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setActiveSection(Math.max(0, sIdx - 1))}
                disabled={sIdx === 0}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Section
              </button>
              <span className="text-xs text-gray-400">
                Section {sIdx + 1} of {mod.sections.length}
              </span>
              <button
                onClick={() => setActiveSection(Math.min(mod.sections.length - 1, sIdx + 1))}
                disabled={sIdx === mod.sections.length - 1}
                className={`flex items-center gap-1.5 text-sm font-semibold ${mod.color} disabled:opacity-30 disabled:cursor-not-allowed transition`}
              >
                Next Section
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* ── Challenge 1 — Guided ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Challenge 1 — Guided
            </h2>
            <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold border border-yellow-200">
              Starter code provided
            </span>
          </div>
          <div className={`${mod.bgColor} border-2 ${mod.borderColor} rounded-2xl p-5 mb-4`}>
            <h3 className={`text-lg font-bold ${mod.color} mb-1`}>
              {mod.challenge.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {mod.challenge.description}
            </p>
          </div>
          {mod.challenge.code && (
            <PythonPlayground
              starterCode={mod.challenge.code}
              challengeDescription={mod.challenge.description}
              moduleColor={mod.color}
              moduleBgColor={mod.bgColor}
              moduleBorderColor={mod.borderColor}
              variant="challenge"
            />
          )}
        </div>

        {/* ── Challenge 2 — Debug Zone ── */}
        {mod.debugChallenge && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🐛</span>
              <h2 className="text-xl font-bold text-gray-900">
                Challenge 2 — Debug Zone
              </h2>
              <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold border border-red-200">
                Fix the errors
              </span>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-4">
              <h3 className="text-lg font-bold text-red-700 mb-1">
                {mod.debugChallenge.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {mod.debugChallenge.description}
              </p>
            </div>
            <PythonPlayground
              starterCode={mod.debugChallenge.brokenCode}
              challengeDescription={mod.debugChallenge.expectedOutputDescription}
              moduleColor="text-red-600"
              moduleBgColor="bg-red-50"
              moduleBorderColor="border-red-200"
              variant="debug"
              hint={mod.debugChallenge.hint}
            />
          </div>
        )}

        {/* ── Challenge 3 — Blank Canvas ── */}
        {mod.blankChallenge && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✍️</span>
              <h2 className="text-xl font-bold text-gray-900">
                Challenge 3 — Your Turn!
              </h2>
              <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                Write from scratch
              </span>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-4">
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                {mod.blankChallenge.title}
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {mod.blankChallenge.task}
              </div>
            </div>
            <PythonPlayground
              starterCode={mod.blankChallenge.starterComment}
              challengeDescription={mod.blankChallenge.validationGoal}
              moduleColor="text-blue-600"
              moduleBgColor="bg-blue-50"
              moduleBorderColor="border-blue-200"
              variant="blank"
            />
          </div>
        )}

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <span className="text-3xl flex-shrink-0">🤯</span>
          <div>
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
              Did You Know?
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{mod.funFact}</p>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Quick Quiz</h2>
            <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
              {mod.quiz.length} Questions
            </span>
          </div>

          <div className="space-y-6">
            {mod.quiz.map((q, qIdx) => (
              <div key={qIdx}>
                <p className="font-semibold text-gray-900 mb-3">
                  <span className="text-orange-500">Q{qIdx + 1}.</span>{" "}
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[qIdx] === oIdx;
                    const isCorrect = oIdx === q.correct;
                    let optClass =
                      "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ";

                    if (!quizSubmitted) {
                      optClass += isSelected
                        ? `${mod.bgColor} ${mod.borderColor} ${mod.color}`
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";
                    } else {
                      if (isCorrect) {
                        optClass += "bg-green-50 border-green-400 text-green-700";
                      } else if (isSelected && !isCorrect) {
                        optClass += "bg-red-50 border-red-400 text-red-700";
                      } else {
                        optClass += "bg-gray-50 border-gray-200 text-gray-500";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerSelect(qIdx, oIdx)}
                        className={optClass}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current">
                            {["A", "B", "C", "D"][oIdx]}
                          </span>
                          {opt}
                          {quizSubmitted && isCorrect && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-red-400 ml-auto" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submit */}
                {quizSubmitted && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">
                    <span className="font-semibold">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={quizAnswers.filter((a) => a !== null && a !== undefined).length < mod.quiz.length}
              className={`mt-6 w-full py-3 rounded-xl font-bold text-white transition-all ${
                quizAnswers.filter((a) => a !== null && a !== undefined).length < mod.quiz.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-[1.01]"
              }`}
            >
              {quizAnswers.filter((a) => a !== null && a !== undefined).length < mod.quiz.length
                ? `Answer all ${mod.quiz.length} questions to submit`
                : "Submit My Answers →"}
            </button>
          ) : (
            <div
              className={`mt-6 rounded-xl p-5 text-center ${
                quizScore === mod.quiz.length
                  ? "bg-green-50 border-2 border-green-300"
                  : quizScore >= Math.ceil(mod.quiz.length / 2)
                  ? "bg-yellow-50 border-2 border-yellow-300"
                  : "bg-red-50 border-2 border-red-200"
              }`}
            >
              <div className="text-4xl mb-2">
                {quizScore === mod.quiz.length
                  ? "🏆"
                  : quizScore >= Math.ceil(mod.quiz.length / 2)
                  ? "⭐"
                  : "💪"}
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-1">
                {quizScore}/{mod.quiz.length} correct!
              </div>
              <p className="text-gray-600 text-sm">
                {quizScore === mod.quiz.length
                  ? "Perfect score! You're a Python genius! 🎉"
                  : quizScore >= Math.ceil(mod.quiz.length / 2)
                  ? "Great job! Review the explanations above and try again!"
                  : "Keep going! Re-read the sections and try the quiz again!"}
              </p>
              {quizScore < mod.quiz.length && (
                <button
                  onClick={() => {
                    setQuizAnswers([]);
                    setQuizSubmitted(false);
                  }}
                  className="mt-3 text-sm font-semibold text-orange-500 underline"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>

        {/* Key Learnings Card */}
        <div className="mb-8">
          <KeyLearningsCard
            moduleId={mod.id}
            moduleTitle={mod.title}
            moduleEmoji={mod.emoji}
            moduleDuration={mod.duration}
            learnings={mod.keyLearnings}
            color={mod.color}
            bgColor={mod.bgColor}
            borderColor={mod.borderColor}
          />
        </div>

        {/* Teacher Note */}
        <div className="mb-8">
          <TeacherNote
            moduleId={mod.id}
            moduleTitle={mod.title}
            color={mod.color}
            bgColor={mod.bgColor}
            borderColor={mod.borderColor}
          />
        </div>

        {/* Next preview */}
        {nextMod && (
          <div className={`${nextMod.bgColor} border-2 ${nextMod.borderColor} rounded-2xl p-5 mb-8`}>
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className={`h-4 w-4 ${nextMod.color}`} />
              <span className={`text-xs font-bold uppercase tracking-widest ${nextMod.color}`}>
                Coming Up Next
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-3">{mod.nextPreview}</p>
            <Link
              to={`/summer-camp/module/${nextMod.id}`}
              className={`inline-flex items-center gap-2 text-sm font-bold ${nextMod.color} hover:underline`}
            >
              {nextMod.emoji} Day {nextMod.id}: {nextMod.title}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {prevMod ? (
            <Link
              to={`/summer-camp/module/${prevMod.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <div>
                <div className="text-xs text-gray-400">Previous</div>
                <div>
                  {prevMod.emoji} Day {prevMod.id}: {prevMod.title}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              to="/summer-camp"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              All Modules
            </Link>
          )}

          {nextMod ? (
            <Link
              to={`/summer-camp/module/${nextMod.id}`}
              className={`flex items-center gap-2 text-sm font-bold ${nextMod.color} hover:underline transition`}
            >
              <div className="text-right">
                <div className="text-xs text-gray-400">Next Up</div>
                <div>
                  {nextMod.emoji} Day {nextMod.id}: {nextMod.title}
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to="/summer-camp"
              className="flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:underline"
            >
              🎓 Back to Camp Home
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
