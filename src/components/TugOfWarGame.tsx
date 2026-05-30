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

/**
 * Tiny Python simulator for the win screen — runs the kid's own lines so we can
 * show the real output Python would print. Handles just the three command shapes
 * this game teaches: print("literal"), name = "literal", and print(variable).
 */
function simulatePython(lines: string[]): string {
  const vars: Record<string, string> = {};
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    let m = line.match(/^([A-Za-z_]\w*)\s*=\s*(['"])([\s\S]*)\2\s*$/);   // name = "value"
    if (m) { vars[m[1]] = m[3]; continue; }
    m = line.match(/^print\s*\(\s*(['"])([\s\S]*)\1\s*\)\s*$/);          // print("literal")
    if (m) { out.push(m[2]); continue; }
    m = line.match(/^print\s*\(\s*([A-Za-z_]\w*)\s*\)\s*$/);             // print(variable)
    if (m) { out.push(vars[m[1]] ?? ""); continue; }
  }
  return out.join("\n");
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
function Feedback({ ok, msg, example }: { ok: boolean; msg: string; example?: string }) {
  return (
    <div style={{
      padding: "12px 16px", borderRadius: 12,
      background: ok ? "#E8F8EE" : "#FEE2EC",
      border: `2px solid ${ok ? C.green : C.red}`,
      color: ok ? "#15803D" : "#9F1239",
      animation: "tug-pop .25s ease",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 20, lineHeight: 1.2 }}>{ok ? "✅" : "💡"}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: ok ? 0 : 3 }}>
            {ok ? msg : "Not quite — let's fix it together!"}
          </div>
          {!ok && (
            <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.5 }}>
              {msg}
            </div>
          )}
          {!ok && example && (
            <div style={{
              marginTop: 8, padding: "6px 10px", borderRadius: 8,
              background: "rgba(159,18,57,.08)",
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: 13, fontWeight: 700, color: "#9F1239",
            }}>
              Type it like this →&nbsp; {example}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sound engine ─────────────────────────────────────────────────── */
// Sounds are SYNTHESIZED in-browser via the Web Audio API, so the game needs
// zero audio asset files today. To swap in real recordings later, add a URL to
// SOUND_FILES below — any name with a file plays that instead of the synth.
type SfxName = "pull" | "win" | "lose" | "wrong";

const SOUND_FILES: Partial<Record<SfxName, string>> = {
  // pull:  "/tug/sfx/pull.mp3",   // ← uncomment + drop the file in to use a real clip
  // win:   "/tug/sfx/win.mp3",
  // lose:  "/tug/sfx/lose.mp3",
  // wrong: "/tug/sfx/wrong.mp3",
};

const Sfx = (() => {
  let ctx: AudioContext | null = null;
  let muted = false;
  const elements: Partial<Record<SfxName, HTMLAudioElement>> = {};

  function ensureCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === "suspended") void ctx.resume();
    return ctx;
  }

  // One synthesized note with a quick attack and exponential decay.
  function note(c: AudioContext, freq: number, start: number, dur: number, type: OscillatorType, peak: number) {
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function synth(name: SfxName, c: AudioContext) {
    switch (name) {
      case "pull":  // quick rising pluck — satisfying tug
        note(c, 440, 0, 0.12, "triangle", 0.20);
        note(c, 660, 0.06, 0.14, "triangle", 0.20);
        break;
      case "win":   // happy ascending arpeggio C-E-G-C
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(c, f, i * 0.12, 0.22, "triangle", 0.20));
        break;
      case "lose":  // gentle descending "aww"
        [392, 329.63, 261.63].forEach((f, i) => note(c, f, i * 0.16, 0.30, "sine", 0.18));
        break;
      case "wrong": // soft low nudge — not harsh
        note(c, 196, 0, 0.16, "square", 0.10);
        break;
    }
  }

  return {
    setMuted(m: boolean) { muted = m; },
    // Call from a user gesture (e.g. a button click) to unlock audio on iOS/Safari.
    unlock() { ensureCtx(); },
    play(name: SfxName) {
      if (muted || typeof window === "undefined") return;
      const url = SOUND_FILES[name];
      if (url) {
        let el = elements[name];
        if (!el) { el = new Audio(url); elements[name] = el; }
        el.currentTime = 0;
        void el.play().catch(() => {});
        return;
      }
      const c = ensureCtx();
      if (c) synth(name, c);
    },
  };
})();

/* ─── Sound on/off toggle ──────────────────────────────────────────── */
function SoundToggle({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={muted ? "Sound off — click to turn on" : "Sound on — click to mute"}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      style={{
        flexShrink: 0, width: 34, height: 34, borderRadius: 9,
        border: `1.5px solid ${C.ink}`,
        background: "rgba(14,17,22,.06)", color: C.ink,
        cursor: "pointer", fontSize: 16, lineHeight: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {muted ? "🔇" : "🔊"}
    </button>
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
  const [submissions, setSubmissions] = useState<string[]>([]);  // the kid's actual typed code, per round
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("tug-muted") === "1";
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const currentRound = data.rounds[round];

  // Keep the sound engine in sync with the kid's mute choice.
  useEffect(() => { Sfx.setMuted(muted); }, [muted]);

  function toggleMute() {
    setMuted(m => {
      const next = !m;
      try { window.localStorage.setItem("tug-muted", next ? "1" : "0"); } catch { /* ignore */ }
      if (!next) Sfx.unlock();  // we're inside a click — a good moment to unlock audio
      return next;
    });
  }

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
    // Block only while a SUCCESS animation is playing; errors stay editable.
    if (!inputVal.trim() || (feedback && feedback.ok) || phase !== "playing") return;

    const result = currentRound.validate(inputVal.trim());

    if (result.ok) {
      // Correct!
      const newPos = clamp(ropePos + currentRound.strength, 0, 100);
      setRopePos(newPos);
      setFeedback({ ok: true, msg: currentRound.winMsg });
      setWrongStreak(0);
      const newResults = [...roundResults, true];
      setRoundResults(newResults);
      setSubmissions(prev => [...prev, inputVal.trim()]);  // remember exactly what the kid typed
      Sfx.play("pull");

      setTimeout(() => {
        setFeedback(null);
        setInputVal("");
        if (newPos >= WIN_POS || round === data.rounds.length - 1) {
          // Check final result
          const correctCount = newResults.filter(Boolean).length;
          const didWin = correctCount >= Math.ceil(data.rounds.length / 2);
          setTimeout(() => {
            Sfx.play(didWin ? "win" : "lose");
            setPhase(didWin ? "won" : "lost");
          }, 300);
        } else {
          setRound(r => r + 1);
        }
      }, 1400);

    } else {
      // Wrong! Keep the error + hint on screen until the kid edits their code.
      doShake();
      Sfx.play("wrong");
      const penalty = Math.min(10 + wrongStreak * 2, 18);
      const newPos  = clamp(ropePos - penalty, 0, 100);
      setRopePos(newPos);
      setWrongStreak(s => s + 1);
      setFeedback({
        ok: false,
        msg: result.hint ?? "Not quite — check your spelling, quotes and brackets, then try again!",
      });

      if (newPos <= LOSE_POS) {
        // Computer wins — lock and show the lose screen after a beat.
        setRoundResults([...roundResults, false]);
        setTimeout(() => { Sfx.play("lose"); setPhase("lost"); }, 1600);
      } else {
        // Stay on this round. Error message persists; refocus so they can fix it.
        setTimeout(() => inputRef.current?.focus(), 50);
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
            }}>🎮 GAME</div>
            <h3 style={{
              fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900,
              color: C.ink, margin: 0, flex: 1,
            }}>{data.title}</h3>
            <SoundToggle muted={muted} onToggle={toggleMute} />
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
                <Sprite src="/tug/computer-strain.png" alt="Computer team" bounce />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ textAlign: "center", color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 700 }}>
                    VS
                  </div>
                  <div style={{
                    height: 10, borderRadius: 5,
                    background: "linear-gradient(90deg, #E0124F 50%, #22A55C 50%)",
                    border: "1.5px solid rgba(255,255,255,.15)",
                  }} />
                  <div style={{ textAlign: "center", color: "rgba(255,255,255,.5)", fontSize: 11 }}>
                    Type Python → Pull the rope!
                  </div>
                </div>
                <Sprite src="/tug/kids-pull.png" alt="Kids team" bounce />
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
              onClick={() => { Sfx.unlock(); setPhase("playing"); }}
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
    // Use exactly what the kid typed; fall back to the model answer if missing.
    const lines = data.rounds.map((r, i) => submissions[i] ?? r.exampleAnswer);
    const code = lines.join("\n");
    const programOutput = simulatePython(lines);
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
            <Sprite src="/tug/computer-lose.png" alt="Computer loses" />
            <Sprite src="/tug/kids-win.png" alt="Kids win!" bounce />
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

            {/* What the computer printed when it ran your code */}
            <div style={{
              marginTop: 16, paddingTop: 14,
              borderTop: "1px dashed rgba(255,255,255,.15)",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: "#7dd3fc",
                letterSpacing: "0.1em", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 6,
              }}>▶ OUTPUT — WHAT PYTHON PRINTED</div>
              <pre style={{
                margin: 0, fontSize: 15, color: "#86efac",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                lineHeight: 1.8, whiteSpace: "pre-wrap",
                background: "#06090d", borderRadius: 8,
                border: "1px solid rgba(125,211,252,.18)",
                padding: "12px 14px",
              }}>{programOutput || " "}</pre>
            </div>

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
              setSubmissions([]);
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
            <Sprite src="/tug/computer-win.png" alt="Computer wins" />
            <Sprite src="/tug/kids-lose.png" alt="Kids lose" />
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
              setSubmissions([]);
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
          <SoundToggle muted={muted} onToggle={toggleMute} />
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
              <Sprite src={compImg} alt="Computer team" shake={isShaking} />
              <div style={{ flex: 1, paddingBottom: 28 }}>
                <Rope pos={ropePos} shake={isShaking} />
              </div>
              <Sprite src={kidsImg} alt="Kids team" shake={isShaking} />
            </div>

            {/* Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: -4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.red }}>💻 Computer</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.green }}>👩‍💻 You</span>
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
                  // Lock only while a SUCCESS animation plays. During an error,
                  // let the kid keep typing — and clear the red error as soon
                  // as they start fixing it, so the hint stays until they act.
                  if (!(feedback && feedback.ok)) {
                    setInputVal(e.target.value);
                    if (feedback && !feedback.ok) setFeedback(null);
                  }
                }}
                onKeyDown={handleKey}
                placeholder={currentRound.placeholder}
                disabled={!!feedback && feedback.ok}
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
              disabled={(!!feedback && feedback.ok) || !inputVal.trim()}
              style={{
                padding: "0 22px",
                background: (!!feedback && feedback.ok) ? "#333" : C.yellow,
                color: C.ink, border: "none", borderRadius: 10,
                fontWeight: 900, fontSize: 14,
                cursor: (!!feedback && feedback.ok) ? "default" : "pointer",
                fontFamily: "'Fraunces', serif",
                transition: "background .2s",
                flexShrink: 0,
                opacity: (!inputVal.trim() && !(feedback && feedback.ok)) ? 0.5 : 1,
              }}
            >
              {feedback && !feedback.ok ? "Try again 💪" : "Pull! 💪"}
            </button>
          </div>

          {/* Hint / press Enter note */}
          {!feedback && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 12, textAlign: "center" }}>
              Press Enter or click Pull to tug the rope
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <Feedback
              ok={feedback.ok}
              msg={feedback.msg}
              example={!feedback.ok ? currentRound.exampleAnswer : undefined}
            />
          )}

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
