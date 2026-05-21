import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCampAuth } from "@/context/CampAuthContext";
import {
  Loader2, Sun, LogOut, RefreshCw, CheckCircle2, XCircle, Minus, Trophy, Users, BookOpen,
} from "lucide-react";
import { summerCampModules } from "@/data/summerCampModules";

// ── types ─────────────────────────────────────────────────────────────────────

interface ModuleProgress {
  moduleId: number;
  score: number;
  total: number;
  completedAt: string;
}

interface StudentProgress {
  username: string;
  modules: Record<number, ModuleProgress>;
}

// ── helpers ───────────────────────────────────────────────────────────────────

const PHASE1 = summerCampModules.filter((m) => m.id <= 9);
const PHASE2 = summerCampModules.filter((m) => m.id > 9);

function ScoreCell({ prog }: { prog?: ModuleProgress }) {
  if (!prog) return <Minus className="h-4 w-4 text-gray-300 mx-auto" />;
  const pct = Math.round((prog.score / prog.total) * 100);
  const colour =
    pct === 100 ? "text-green-600 bg-green-50" :
    pct >= 60   ? "text-amber-600 bg-amber-50" :
                  "text-red-500 bg-red-50";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${colour}`}>
      {pct === 100 && <CheckCircle2 className="h-3 w-3" />}
      {pct < 100 && pct >= 60 && <Trophy className="h-3 w-3" />}
      {pct < 60 && <XCircle className="h-3 w-3" />}
      {prog.score}/{prog.total}
    </span>
  );
}

// ── component ─────────────────────────────────────────────────────────────────

export default function TeacherDashboard() {
  const { isAuthenticated, isLoading, role, username, token, logout } = useCampAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Auth guard — only teachers
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) navigate("/summer-camp/login", { replace: true });
      else if (role !== "teacher") navigate("/summer-camp/module/1", { replace: true });
    }
  }, [isLoading, isAuthenticated, role, navigate]);

  const fetchProgress = async () => {
    if (!token) return;
    setFetching(true);
    setError(null);
    try {
      const res = await fetch("/.netlify/functions/camp-progress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setStudents(data.students ?? []);
      setLastRefresh(new Date());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load progress");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && role === "teacher") fetchProgress();
  }, [isLoading, isAuthenticated, role]);

  if (isLoading || (fetching && students.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  // Stats
  const totalStudents = students.length;
  const completedAnyModule = students.filter((s) => Object.keys(s.modules).length > 0).length;
  const totalQuizzesDone = students.reduce((sum, s) => sum + Object.keys(s.modules).length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/summer-camp" className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-orange-600">Summer Camp</span>
            <span className="text-gray-400 text-sm ml-1">— Teacher View</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Hi, <strong>{username}</strong> 👋</span>
            <button
              onClick={() => fetchProgress()}
              disabled={fetching}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => { logout(); navigate("/summer-camp/login"); }}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* ── Title ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Student Progress Tracker</h1>
          {lastRefresh && (
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Users className="h-5 w-5 text-blue-500" />, label: "Students enrolled", value: totalStudents },
            { icon: <BookOpen className="h-5 w-5 text-green-500" />, label: "Started learning", value: completedAnyModule },
            { icon: <Trophy className="h-5 w-5 text-amber-500" />, label: "Quizzes completed", value: totalQuizzesDone },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
              {icon}
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
            <Sun className="h-10 w-10 mx-auto mb-3 text-orange-200" />
            <p className="font-medium">No student data yet</p>
            <p className="text-sm mt-1">Progress appears here after students complete their first quiz.</p>
          </div>
        ) : (
          <>
            {/* ── Phase 1 table ── */}
            <ProgressTable title="🐍 Phase 1 — Python Foundations (Days 1–9)" modules={PHASE1} students={students} />
            <div className="mt-6" />
            {/* ── Phase 2 table ── */}
            <ProgressTable title="🤖 Phase 2 — AI Projects (Days 10–15)" modules={PHASE2} students={students} />
          </>
        )}

        {/* ── Legend ── */}
        <div className="mt-8 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Full marks</span>
          <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-amber-500" /> Passed (≥ 60%)</span>
          <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-400" /> Needs help</span>
          <span className="flex items-center gap-1"><Minus className="h-3.5 w-3.5 text-gray-300" /> Not attempted</span>
        </div>
      </div>
    </div>
  );
}

// ── Reusable table ────────────────────────────────────────────────────────────

function ProgressTable({
  title,
  modules,
  students,
}: {
  title: string;
  modules: typeof summerCampModules;
  students: StudentProgress[];
}) {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-700 mb-3">{title}</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-600 sticky left-0 bg-gray-50 z-10 min-w-[130px]">
                Student
              </th>
              {modules.map((m) => (
                <th key={m.id} className="px-3 py-3 text-center font-semibold text-gray-500 whitespace-nowrap min-w-[80px]">
                  <div>{m.emoji}</div>
                  <div className="text-xs font-normal">Day {m.id}</div>
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold text-gray-500 min-w-[80px]">Total</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => {
              const phaseModules = modules.map((m) => student.modules[m.id]);
              const done = phaseModules.filter(Boolean).length;
              return (
                <tr key={student.username} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 font-medium text-gray-800 sticky left-0 bg-inherit z-10 border-r border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
                        {student.username.slice(0, 2).toUpperCase()}
                      </span>
                      {student.username}
                    </div>
                  </td>
                  {modules.map((m) => (
                    <td key={m.id} className="px-3 py-3 text-center">
                      <ScoreCell prog={student.modules[m.id]} />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center font-bold text-gray-700">
                    {done}/{modules.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
