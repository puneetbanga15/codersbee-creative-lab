import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useCampAuth } from "@/context/CampAuthContext";
import { Loader2, Lock, User, Eye, EyeOff, Sun, ArrowLeft } from "lucide-react";

export default function SummerCampLogin() {
  const { isAuthenticated, login, isLoading } = useCampAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") ?? "/summer-camp/module/2";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already logged in → go straight through
  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate(next, { replace: true });
  }, [isAuthenticated, isLoading, navigate, next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both your username and password.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = await login(username.trim(), password);
    setSubmitting(false);
    if (result.success) {
      navigate(next, { replace: true });
    } else {
      setError(result.error ?? "Something went wrong. Try again!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          to="/summer-camp"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Summer Camp
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/96665488-c73d-4daf-a6f2-5dc7d468a820.png"
            alt="CodersBee"
            className="h-8"
          />
          <span className="text-sm font-semibold text-[#9b87f5]">CodersBee</span>
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4 shadow-sm">
              <Sun className="h-8 w-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Log in to continue your Python + AI Summer Camp journey.
              <br />
              <span className="text-green-600 font-medium">Day 1 is free</span> — Days 2–15 need your login.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-5"
          >
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. arjun42"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 text-gray-800 text-sm outline-none focus:border-orange-400 transition placeholder-gray-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 text-gray-800 text-sm outline-none focus:border-orange-400 transition placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
                <span className="text-base flex-shrink-0">😕</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3.5 rounded-xl text-sm hover:scale-[1.01] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in…
                </>
              ) : (
                "Log in to Summer Camp 🚀"
              )}
            </button>

            {/* Forgot password */}
            <p className="text-center text-xs text-gray-400 pt-1">
              Forgot your password?{" "}
              <a
                href="https://wa.me/919996465023?text=Hi! I need help with my Summer Camp login password."
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                Message us on WhatsApp
              </a>
            </p>
          </form>

          {/* Day 1 nudge */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 text-center">
            <p className="text-sm text-green-700">
              <span className="font-bold">Not enrolled yet?</span>{" "}
              <Link
                to="/summer-camp/module/1"
                className="underline hover:text-green-800"
              >
                Try Day 1 free
              </Link>{" "}
              — no login needed! 🐍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
