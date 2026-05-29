import { useState, useRef, useEffect } from "react";
import type { TugOfWarChallengeData } from "@/data/summerCampModules";

/* ─── Design tokens ────────────────────────────────────────────────── */
const C = {
  yellow: "#FFC72C", yellowD: "#F2B705", ink: "#0E1116",
  green: "#22A55C", red: "#E0124F", blue: "#1E5BB7",
  paper: "#FFFEF9",
} as const;

/* ─── Helpers ──────────────────────────────────────────────────────── */
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* ─── Rope ─────────────────────────────────────────────────────────── */
function Rope({ pos, shake }: { pos: number; shake: boolean }) {
  // pos: 0=far left (computer wins) … 100=far right (kids win)
  // Flag sits at pos%
  const ropeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: 64,
        animation: shake ? "tug-shake .35s ease" : undefined,
      }}
    >
      {/* Rope segments */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 10,
          borderRadius: 5,
          background: "linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)",
          transform: "translateY(-50%)",
          boxShadow: "0 2px 4px rgba(0,0,0,.4)",
        }}
      />
      {/* Knot marks */}
      {[20, 40, 60, 80].map((p) => (
        <div
          key={p}
          style={{
            position: "absolute",
            left: `${p}%`,
            top: "50%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#5C2D0A",
            border: "2px solid #3B1A05",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Centre mark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          border: "3px solid #E0124F",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      />
      {/* Flag */}
      <div
        style={{
          position: "absolute",
          left: `${pos}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          transition: "left .6s cubic-bezier(.34,1.56,.64,1)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pure-CSS flag — never breaks if /tug/flag.png is missing */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{
            width: 20, height: 14,
            background: "#E0124F",
            clipPath: "polygon(0 0, 100% 30%, 0 100%)",
            marginLeft: 3,
          }} />
          <div style={{
            width: 3, height: 20,
            background: "#fff",
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,.5)",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Status bar above rope ────────────────────────────────────────── */
function StatusBar({ pos, round, total }: { pos: number; round: number; total: number }) {
  const pct = Math.round(pos);
  const label =
    pos >= 80 ? "🎉 Kids crushing it!" :
    pos >= 60 ? "😤 Kids pulling ahead!" :
    pos >= 45 ? "⚖️ Neck and neck!" :
    pos >= 30 ? "😰 Computer gaining!" :
    "💻 Computer dominating!";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8, flexWrap: "wrap" }}>
      <div style={{
        flex: 1, height: 10, borderRadius: 5, background: "#e2e8f0",
        overflow: "hidden", border: "1.5px solid #c7c7c7",
        minWidth: 100,
      }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: pos >= 50
            ? `linear-gradient(90deg, ${C.green}, #16a34a)`
            : `linear-gradient(90deg, ${C.red}, #be185d)`,
          borderRadius: 5,
          transition: "width .6s cubic-bezier(.34,1.56,.64,1)",
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, color: "#6A7180",
        background: "#F5F4EF", padding: "3px 10px",
        borderRadius: 20, border: "1.5px solid #E5E3DC",
        whiteSpace: "nowrap",
      }}>Round {round}/{total}</span>
    </div>
  );
}

/* ─── Emoji fallbacks when PNG sprites aren't in /tug/ yet ─────────── */
const SPRITE_EMOJI: Record<string, string> = {
  "kids-pull":      "🧒💪",
  "kids-win":       "🎉🧒",
  "kids-lose":      "😱🧒",
  "computer-strain":"💻😤",
  "computer-win":   "💻😈",
  "computer-lose":  "💻😵",
};

/* ─── Sprite display ───────────────────────────────────────────────── */
function Sprite({
  src, alt, flip, shake, bounce,
}: {
  src: string; alt: string; flip?: boolean; shake?: boolean; bounce?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  // Extract sprite key from path e.g. "/tug/kids-pull.png" → "kids-pull"
  const key = src.replace(/^.*\//, "").replace(/\.png$/, "");
  const emoji = SPRITE_EMOJI[key] ?? "🎮";

  const wrapStyle: React.CSSProperties = {
    width: 120, height: 120, flexShrink: 0,
    animation: shake ? "tug-shake .35s ease" : bounce ? "tug-bounce 1.2s ease infinite" : undefined,
    display: "flex", alignItems: "flex-end", justifyContent: "center",
  };

  if (broken) {
    return (
      <div style={{ ...wrapStyle, fontSize: 56, paddingBottom: 6, userSelect: "none" }}>
        {emoji}
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <img
        src={src}
        alt={alt}
        onError={() => setBroken(true)}
        style={{
          maxWidth: "100%", maxHeight: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,.2))",
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      />
    </div>
  );
}

/* ─── Feedback bubble ──────────────────────────────────────────────── */
function Feedback({ ok, msg }: { ok: boolean; msg: string }) {
  return (
    <div style={{
      padding: "10px 16px", borderRadius: 12,
      background: ok ? "#E8F8EE" : "#FEE2EC",
      border: `2px solid ${ok ? C.green : C.red}`,
      color: ok ? "#15803D" : "#9F1239",
      fontWeight: 700, fontSize: 14,
      display: "flex", alignItems: "center", gap: 10,
      animation: "tug-pop .25s ease",
    }}>
      <span style={{ fontSize: 20 }}>{ok ? "✅" : "❌"}</span>
      {msg}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────── */
export function TugOfWarGame({ data }: { data: TugOfWarChallengeData }) {
  const WIN_POS  = 82;
  const LOSE_POS = 18;
  const START_POS = 38;

  const [ropePos,  setRopePos]  = useState(START_POS);
  const [round,    setRound]    = useState(0);           // 0-indexed
  const [phase,    setPhase]    = useState<"intro" | "playing" | "won" | "lost">("intro");
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [shake,    setShake]    = useState(false);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [roundResults, setRoundResults] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentRound = data.rounds[round];

  // Auto-focus input when playing
  useEffect(() => {
    if (phase === "playing") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase, round]);

  function doShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  function handleSubmit() {
    if (!inputVal.trim() || feedback || phase !== "playing") return;

    const result = currentRound.validate(inputVal.trim());

    if (result.ok) {
      // Correct!
      const newPos = clamp(ropePos + currentRound.strength, 0, 100);
      setRopePos(newPos);
      setFeedback({ ok: true, msg: currentRound.winMsg });
      setWrongStreak(0);
      const newResults = [...roundResults, true];
      setRoundResults(newResults);

      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        if (newPos >= WIN_POS || round === data.rounds.length - 1) {
          // Check final result
          const correctCount = newResults.filter(Boolean).length;
          setTimeout(() => {
            setPhase(correctCount >= Math.ceil(data.rounds.length / 2) ? "won" : "lost");
          }, 300);
        } else {
          setRound(r => r + 1);
        }
      }, 1400);

    } else {
      // Wrong!
      doShake();
      const penalty = Math.min(10 + wrongStreak * 2, 18);
      const newPos  = clamp(ropePos - penalty, 0, 100);
      setRopePos(newPos);
      setWrongStreak(s => s + 1);
      setFeedback({
        ok: false,
        msg: result.hint ?? "Not quite — check your syntax and try again!",
      });
      const newResults = [...roundResults, false];

      if (newPos <= LOSE_POS) {
        setRoundResults(newResults);
        setTimeout(() => setPhase("lost"), 1400);
      } else {
        setTimeout(() => {
          setFeedback(null);
          // After wrong, they get another try on same round (don't advance)
        }, 2000);
      }
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  // Sprite selection
  const kidsImg = ropePos >= WIN_POS
    ? "/tug/kids-win.png"
    : ropePos <= LOSE_POS
    ? "/tug/kids-lose.png"
    : "/tug/kids-pull.png";

  const compImg = ropePos >= WIN_POS
    ? "/tug/computer-lose.png"
    : ropePos <= LOSE_POS
    ? "/tug/computer-win.png"
    : "/tug/computer-strain.png";

  const isShaking = shake;

  // ─── Screens ───────────────────────────────────────────────────── //

  if (phase === "intro") {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif" }}>
        <style>{`
          @keyframes tug-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          @keyframes tug-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes tug-pop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes tug-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        `}</style>
        <div style={{
          background: "linear-gradient(135deg, #0E1116 0%, #1a2235 100%)",
          borderRadius: 20, overflow: "hidden",
          border: "2.5px solid #FFC72C",
          boxShadow: "0 8px 0 #FFC72C",
        }}>
          {/* Header band */}
          <div style={{
            background: C.yellow, padding: "16px 24px",
            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
          }}>
            <div style={{
              background: C.ink, color: C.yellow, borderRadius: 12,
              padding: "6px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em",
              flexShrink: 0,
            }}>🎮 CHALLENGE 4 — GAME</div>
            <h3 style={{
              fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900,
              color: C.ink, margin: 0, flex: 1,
            }}>{data.title}</h3>
          </div>

          {/* Body */}
          <div style={{ padding: "28px 28px 32px" }}>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 24px" }}>
              {data.subtitle}
            </p>

            {/* Preview arena */}
            <div style={{
              background: "rgba(255,255,255,.04)", borderRadius: 16,
              border: "1px solid rgba(255,255,255,.1)",
              padding: "20px 24px", marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                <Sprite src="/tug/kids-pull.png" alt="Kids team" bounce />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ textAlign: "center", color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 700 }}>
                    VS
                  </div>
                  <div style={{
                    height: 10, borderRadius: 5,
                    background: "linear-gradient(90deg, #22A55C 38%, #E0124F 38%)",
                    border: "1.5px solid rgba(255,255,255,.15)",
                  }} />
                  <div style={{ textAlign: "center", color: "rgba(255,255,255,.5)", fontSize: 11 }}>
                    Type Python → Pull the rope!
                  </div>
                </div>
                <Sprite src="/tug/computer-strain.png" alt="Computer team" flip bounce />
              </div>
            </div>

            {/* Round previews */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {data.rounds.map((r, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "rgba(255,255,255,.04)", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,.08)",
                  padding: "10px 16px",
                }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: C.yellow, color: C.ink,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)", flex: 1 }}>{r.challenge}</span>
                  <span style={{ fontSize: 11, color: C.yellow, fontWeight: 700 }}>+{r.strength} pull</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("playing")}
              style={{
                width: "100%", padding: "18px 24px",
                background: C.yellow, color: C.ink,
                border: `2px solid ${C.ink}`, borderRadius: 14,
                fontWeight: 900, fontSize: 18, cursor: "pointer",
                boxShadow: `0 5px 0 ${C.yellowD}`,
                fontFamily: "'Fraunces', serif",
                letterSpacing: "-0.02em",
              }}
            >
              🎮 Start the Battle!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "won") {
    const code = data.rounds.map(r => r.exampleAnswer).join("\n");
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif" }}>
        <style>{`
          @keyframes tug-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          @keyframes tug-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes tug-pop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes confetti-fall { from{transform:translateY(-40px) rotate(0deg);opacity:1} to{transform:translateY(120px) rotate(360deg);opacity:0} }
        `}</style>
        <div style={{
          background: `linear-gradient(135deg, ${C.yellow} 0%, #FFD700 100%)`,
          borderRadius: 20, overflow: "hidden",
          border: `2.5px solid ${C.ink}`,
          boxShadow: `0 8px 0 ${C.yellowD}`,
          padding: "32px 28px",
          position: "relative",
        }}>
          {/* Confetti dots */}
          {["🎉","🐍","⭐","🏆","✨"].map((e, i) => (
            <span key={i} style={{
              position: "absolute",
              left: `${10 + i * 20}%`,
              top: 0,
              fontSize: 22,
              animation: `confetti-fall ${1.2 + i * 0.3}s ease forwards`,
              animationDelay: `${i * 0.15}s`,
              pointerEvents: "none",
            }}>{e}</span>
          ))}

          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 24, justifyContent: "center" }}>
            <Sprite src="/tug/kids-win.png" alt="Kids win!" bounce />
            <Sprite src="/tug/computer-lose.png" alt="Computer loses" flip />
          </div>

          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 900,
            color: C.ink, margin: "0 0 10px", textAlign: "center",
          }}>You beat the computer! 🏆</h2>

          <p style={{ fontSize: 15, color: "#3A4150", lineHeight: 1.65, margin: "0 0 24px", textAlign: "center" }}>
            You just wrote a real Python program. Three commands, three rounds, zero excuses.
            The computer never stood a chance.
          </p>

          {/* Code reveal */}
          <div style={{
            background: "#0E1116", borderRadius: 14,
            border: "2px solid rgba(255,255,255,.15)",
            padding: "20px 22px", marginBottom: 20,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 800, color: C.yellow,
              letterSpacing: "0.1em", marginBottom: 12,
            }}>🐍 YOUR FIRST PYTHON PROGRAM</div>
            <pre style={{
              margin: 0, fontSize: 15, color: "#e2e8f0",
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              lineHeight: 1.8, whiteSpace: "pre",
            }}>
              {code}
            </pre>
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: "rgba(34,165,92,.12)", borderRadius: 8,
              border: "1px solid rgba(34,165,92,.3)",
              fontSize: 13, color: "#86efac", fontWeight: 600,
            }}>
              That's {data.rounds.length} lines. {data.rounds.length} commands. Your first real Python program. 🎉
            </div>
          </div>

          <button
            onClick={() => {
              setRopePos(START_POS);
              setRound(0);
              setRoundResults([]);
              setInputVal("");
              setFeedback(null);
              setWrongStreak(0);
              setPhase("intro");
            }}
            style={{
              width: "100%", padding: "14px",
              background: C.ink, color: C.yellow,
              border: `2px solid ${C.ink}`, borderRadius: 12,
              fontWeight: 800, fontSize: 15, cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowD}`,
            }}
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  if (phase === "lost") {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif" }}>
        <style>{`
          @keyframes tug-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          @keyframes tug-pop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        `}</style>
        <div style={{
          background: "linear-gradient(135deg, #1a0a1a 0%, #2d1a2d 100%)",
          borderRadius: 20, overflow: "hidden",
          border: `2.5px solid ${C.red}`,
          boxShadow: `0 8px 0 ${C.red}80`,
          padding: "32px 28px",
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 24, justifyContent: "center" }}>
            <Sprite src="/tug/kids-lose.png" alt="Kids lose" />
            <Sprite src="/tug/computer-win.png" alt="Computer wins" flip />
          </div>

          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 900,
            color: "#fff", margin: "0 0 10px", textAlign: "center",
          }}>Computer wins… this time. 💻</h2>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.65, margin: "0 0 24px", textAlign: "center" }}>
            Syntax errors are the computer's best weapon. Don't worry —
            every pro coder has been here. Take another shot!
          </p>

          {/* Hint box */}
          <div style={{
            background: "rgba(255,199,44,.1)", borderRadius: 12,
            border: `1px solid ${C.yellow}40`,
            padding: "14px 18px", marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.yellow, letterSpacing: "0.08em", marginBottom: 8 }}>
              💡 QUICK REMINDER
            </div>
            {data.rounds.map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginBottom: 5 }}>
                <strong style={{ color: C.yellow }}>Round {i + 1}:</strong>{" "}
                <code style={{ fontFamily: "monospace", color: "#e2e8f0" }}>{r.exampleAnswer}</code>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setRopePos(START_POS);
              setRound(0);
              setRoundResults([]);
              setInputVal("");
              setFeedback(null);
              setWrongStreak(0);
              setPhase("playing");
            }}
            style={{
              width: "100%", padding: "16px",
              background: C.yellow, color: C.ink,
              border: `2px solid ${C.yellowD}`, borderRadius: 12,
              fontWeight: 900, fontSize: 16, cursor: "pointer",
              boxShadow: `0 4px 0 ${C.yellowD}`,
              fontFamily: "'Fraunces', serif",
            }}
          >
            💪 Try Again — Beat That Computer!
          </button>
        </div>
      </div>
    );
  }

  // ─── Playing screen ─────────────────────────────────────────────── //
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @keyframes tug-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        @keyframes tug-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes tug-pop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{
        background: "linear-gradient(135deg, #0E1116 0%, #1a2235 100%)",
        borderRadius: 20, overflow: "hidden",
        border: "2.5px solid #FFC72C",
        boxShadow: "0 8px 0 #FFC72C",
      }}>
        {/* Top band */}
        <div style={{
          background: C.yellow, padding: "10px 20px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🎮</span>
          <span style={{
            fontFamily: "'Fraunces', serif", fontWeight: 900,
            fontSize: 17, color: C.ink, flex: 1,
          }}>Coder vs Computer — Tug of War</span>
          <span style={{
            background: C.ink, color: C.yellow,
            borderRadius: 20, padding: "3px 12px",
            fontSize: 11, fontWeight: 800,
          }}>Round {round + 1} / {data.rounds.length}</span>
        </div>

        <div style={{ padding: "20px 24px" }}>

          {/* Status bar */}
          <StatusBar pos={ropePos} round={round + 1} total={data.rounds.length} />

          {/* Arena */}
          <div style={{
            background: "rgba(255,255,255,.03)", borderRadius: 16,
            border: "1px solid rgba(255,255,255,.08)",
            padding: "16px 18px", marginBottom: 18,
          }}>
            {/* Sprites + rope */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 10 }}>
              <Sprite src={kidsImg} alt="Kids team" shake={isShaking} />
              <div style={{ flex: 1, paddingBottom: 28 }}>
                <Rope pos={ropePos} shake={isShaking} />
              </div>
              <Sprite src={compImg} alt="Computer team" flip shake={isShaking} />
            </div>

            {/* Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: -4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.green }}>👩‍💻 You</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.red }}>💻 Computer</span>
            </div>
          </div>

          {/* Round challenge card */}
          <div style={{
            background: "rgba(255,199,44,.08)", borderRadius: 14,
            border: `1.5px solid ${C.yellow}40`,
            padding: "16px 18px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", marginBottom: 8 }}>
              🐍 ROUND {round + 1} CHALLENGE — TYPE THIS PYTHON COMMAND
            </div>
            <div style={{
              fontSize: 17, fontWeight: 700, color: "#fff",
              lineHeight: 1.5, marginBottom: 8,
            }}>
              {currentRound.challenge}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>
              {currentRound.instruction}
            </div>
          </div>

          {/* Input field */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{
              flex: 1, display: "flex", alignItems: "center",
              background: "#0d1117", borderRadius: 10,
              border: `2px solid ${feedback ? (feedback.ok ? C.green : C.red) : "rgba(255,255,255,.2)"}`,
              padding: "0 14px", overflow: "hidden",
              transition: "border-color .2s",
            }}>
              <span style={{
                color: C.yellow, fontFamily: "monospace",
                fontSize: 14, marginRight: 8, userSelect: "none",
              }}>{">"}</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={e => {
                  if (!feedback) setInputVal(e.target.value);
                }}
                onKeyDown={handleKey}
                placeholder={currentRound.placeholder}
                disabled={!!feedback}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: 14, padding: "14px 0",
                  caretColor: C.yellow,
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!!feedback || !inputVal.trim()}
              style={{
                padding: "0 22px",
                background: feedback ? "#333" : C.yellow,
                color: C.ink, border: "none", borderRadius: 10,
                fontWeight: 900, fontSize: 14, cursor: feedback ? "default" : "pointer",
                fontFamily: "'Fraunces', serif",
                transition: "background .2s",
                flexShrink: 0,
                opacity: (!inputVal.trim() && !feedback) ? 0.5 : 1,
              }}
            >
              Pull! 💪
            </button>
          </div>

          {/* Hint / press Enter note */}
          {!feedback && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 12, textAlign: "center" }}>
              Press Enter or click Pull to tug the rope
            </div>
          )}

          {/* Feedback */}
          {feedback && <Feedback ok={feedback.ok} msg={feedback.msg} />}

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
            {data.rounds.map((_, i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: i < round
                  ? (roundResults[i] ? C.green : C.red)
                  : i === round
                  ? C.yellow
                  : "rgba(255,255,255,.2)",
                border: `2px solid ${i === round ? C.yellowD : "transparent"}`,
                transition: "background .3s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
