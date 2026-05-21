import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { summerCampModules } from "@/data/summerCampModules";
import {
  Sun,
  Rocket,
  Star,
  Trophy,
  Clock,
  BookOpen,
  ChevronRight,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "15 Daily Modules",
    desc: "One module per day — perfectly paced for summer",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Learn by Doing",
    desc: "Every module has hands-on coding challenges",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Teacher Check-ins",
    desc: "2× weekly teacher sessions for guidance & review",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Real AI Projects",
    desc: "Build actual AI apps — chatbots, image tools & more",
  },
];

const phases = [
  {
    label: "Phase 1",
    title: "Python Foundations",
    days: "Days 1–9",
    color: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-500",
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    desc: "From zero to confident Python programmer",
  },
  {
    label: "Phase 2",
    title: "AI & Real Projects",
    days: "Days 10–15",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    dotColor: "bg-violet-500",
    modules: [10, 11, 12, 13, 14, 15],
    desc: "Apply Python to build real AI-powered apps",
  },
];

export default function SummerCamp() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-yellow-50 via-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sun className="h-4 w-4" />
            Summer 2025 · 15 Modules · Self-Paced
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-tight">
            Python + AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Summer Camp
            </span>{" "}
            🐍🤖
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            15 days. From printing "Hello World" to building your own AI chatbot.
            Kids aged 10–14 learn Python the fun way — one module a day, at
            their own pace, with a teacher steering every few days.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/summer-camp/module/1"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-8 py-3.5 rounded-xl text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Rocket className="h-5 w-5" />
              Start Day 1 — Free!
            </Link>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-xl text-lg border-2 border-gray-200 hover:border-orange-300 transition-all duration-200"
            >
              Browse All 15 Modules
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { num: "15", label: "Modules" },
              { num: "10–14", label: "Age Group" },
              { num: "2×/week", label: "Teacher Reviews" },
              { num: "1", label: "AI App Built" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-orange-500">
                  {s.num}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            How the Camp Works
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Designed for kids who learn best when they drive their own journey
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gradient-to-b from-orange-50 to-white border border-orange-100 rounded-2xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Phase breakdown */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <div
                key={phase.label}
                className={`border-2 rounded-2xl p-6 ${phase.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                    {phase.label}
                  </span>
                  <span className="text-xs font-semibold bg-white/60 px-2 py-0.5 rounded-full">
                    {phase.days}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold mb-1">{phase.title}</h3>
                <p className="text-sm opacity-80 mb-4">{phase.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.modules.map((m) => (
                    <Link
                      key={m}
                      to={`/summer-camp/module/${m}`}
                      className="inline-flex items-center gap-1 bg-white/70 hover:bg-white text-xs font-semibold px-2.5 py-1 rounded-full transition"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${phase.dotColor}`}
                      />
                      Day {m}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section id="modules" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            All 15 Modules
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Click any module to start — or follow them in order for the best
            experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {summerCampModules.map((mod) => (
              <Link
                key={mod.id}
                to={`/summer-camp/module/${mod.id}`}
                className={`group block rounded-2xl border-2 ${mod.borderColor} ${mod.bgColor} p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {mod.duration}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl">{mod.emoji}</span>
                      <h3 className={`font-extrabold text-lg ${mod.color}`}>
                        {mod.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{mod.tagline}</p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity mt-1`}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mod.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-white/80 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100"
                    >
                      {t}
                    </span>
                  ))}
                  {mod.topics.length > 3 && (
                    <span className="text-xs bg-white/80 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
                      +{mod.topics.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What kids will build */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            What You'll Build 🏗️
          </h2>
          <p className="text-gray-500 mb-10">
            Real projects — not just exercises!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                emoji: "🎮",
                title: "Number Guessing Game",
                desc: "A fully playable game with hints, lives, and high scores",
                day: "Day 9",
              },
              {
                emoji: "💬",
                title: "AI Chatbot",
                desc: "Your own chatbot with a custom name and personality",
                day: "Day 12",
              },
              {
                emoji: "🎨",
                title: "AI Image Generator",
                desc: "Generate images from text descriptions using DALL-E",
                day: "Day 13",
              },
              {
                emoji: "📖",
                title: "Story Generator",
                desc: "Type a genre and get a unique AI-written story",
                day: "Day 14",
              },
              {
                emoji: "🧠",
                title: "AI Quiz Master",
                desc: "A quiz bot that makes questions on any topic you choose",
                day: "Day 14",
              },
              {
                emoji: "🚀",
                title: "Your Dream App",
                desc: "Design and build your own original AI app!",
                day: "Day 14–15",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 rounded-2xl p-5 text-left"
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <div className="text-xs font-semibold text-orange-500 mb-1">
                  {p.day}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-14 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              What Do I Need to Start? 🎒
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Almost nothing — seriously!
            </p>
            <div className="space-y-3">
              {[
                {
                  ok: true,
                  text: "A computer or laptop (Windows, Mac, or Chromebook)",
                },
                {
                  ok: true,
                  text: "Internet connection",
                },
                {
                  ok: true,
                  text: "A free account on replit.com (no install needed!)",
                },
                {
                  ok: true,
                  text: "Curiosity and excitement — that's the most important thing!",
                },
                {
                  ok: false,
                  text: "Previous coding experience — NOT required! We start from zero.",
                },
                {
                  ok: false,
                  text: "Advanced maths — we only use basic arithmetic.",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      item.ok
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-400"
                    }`}
                  >
                    {item.ok ? "✓" : "✗"}
                  </div>
                  <p
                    className={`text-sm ${
                      item.ok ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Start Coding?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Day 1 is completely free. No sign-up needed. Just click and start
            coding right now!
          </p>
          <Link
            to="/summer-camp/module/1"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-extrabold px-10 py-4 rounded-2xl text-xl shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <Rocket className="h-6 w-6" />
            Start Day 1 — Meet Python! 🐍
          </Link>
          <p className="mt-5 text-sm opacity-70">
            Questions? WhatsApp us — we're happy to help!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
