import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { summerCampModules } from "@/data/summerCampModules";
import { PythonPlayground } from "@/components/PythonPlayground";
import { TugOfWarGame } from "@/components/TugOfWarGame";
import { useCampAuth } from "@/context/CampAuthContext";
import { Loader2 } from "lucide-react";

/* ─── Design tokens (matches SummerCamp.tsx palette) ──────────────── */
const C = {
  yellow: "#FFC72C", yellowD: "#F2B705", yellowSoft: "#FFFBEA",
  ink: "#0E1116", ink2: "#3A4150", ink3: "#6A7180",
  paper: "#FFFEF9", bg2: "#F5F4EF", line: "#E5E3DC",
  green: "#22A55C", greenSoft: "#E8F8EE", greenDeep: "#15803D",
  red: "#E0124F", redSoft: "#FEE2EC",
  blue: "#1E5BB7", blueSoft: "#EEF4FF",
  purple: "#5B2BC7", purpleSoft: "#F2EDFF",
  wa: "#25D366", codeBg: "#1A1E2A",
} as const;

const WA_NUMBER = "919996465023";

/* ─── useWindowWidth ───────────────────────────────────────────────── */
function useWindowWidth() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return vw;
}

/* ─── 15-day sidebar data ──────────────────────────────────────────── */
interface DayInfo { n: number; title: string; track: "P" | "A"; project?: boolean; bonus?: boolean; }
const ALL_DAYS: DayInfo[] = [
  { n: 1,   title: "Meet Python",                  track: "P" },
  { n: 2,   title: "Variables — Python remembers", track: "P" },
  { n: 3,   title: "Strings, numbers & maths",     track: "P" },
  { n: 4,   title: "Asking the user (input)",       track: "P" },
  { n: 5,   title: "If / else — decisions",         track: "P" },
  { n: 6,   title: "Loops — repeat yourself",       track: "P" },
  { n: 6.5, title: "Colab & Replit Setup",          track: "P", bonus: true },
  { n: 7,   title: "Mini-project: Quiz game",       track: "P", project: true },
  { n: 8,   title: "Lists & data",                  track: "P" },
  { n: 9,   title: "Functions — make your own",     track: "P" },
  { n: 10,  title: "Hello, AI 🤖",                  track: "A" },
  { n: 11,  title: "Prompting like a pro",           track: "A" },
  { n: 12,  title: "Build a chatbot",               track: "A", project: true },
  { n: 13,  title: "Image AI",                      track: "A" },
  { n: 14,  title: "Capstone build",                track: "A" },
  { n: 15,  title: "Demo Day 🎉",                   track: "A", project: true },
];

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════ */

/* ─── GreetStrip ───────────────────────────────────────────────────── */
function GreetStrip({ username, savedPct, onLogout }: {
  username: string; savedPct: number; onLogout: () => void;
}) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
      height: 40, background: C.ink,
      display: "flex", alignItems: "center", padding: "0 20px", gap: 10,
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.yellow }}>
        👋 Hi, <strong>{username}</strong>
      </span>
      <span style={{ fontSize: 13, color: "#ffffff55" }}>— progress auto-saved</span>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12, color: C.green, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
          {savedPct}% saved
        </span>
        <button onClick={onLogout} style={{
          fontSize: 12, color: "#ffffff80", fontWeight: 700,
          background: "none", border: "1px solid #ffffff25", borderRadius: 6,
          padding: "2px 10px", cursor: "pointer",
        }}>Logout</button>
      </div>
    </div>
  );
}

/* ─── TopBar ───────────────────────────────────────────────────────── */
function TopBar({ dayNum, totalDays, onToggleSidebar, onWhatsApp }: {
  dayNum: number; totalDays: number;
  onToggleSidebar: () => void; onWhatsApp: () => void;
}) {
  return (
    <div style={{
      position: "sticky", top: 40, zIndex: 50,
      background: "rgba(255,254,249,0.94)", backdropFilter: "blur(12px)",
      borderBottom: `1.5px solid ${C.line}`,
      display: "flex", alignItems: "center", gap: 10,
      padding: "0 20px", height: 60, flexShrink: 0,
    }}>
      {/* Hamburger */}
      <button onClick={onToggleSidebar} style={{
        width: 36, height: 36, borderRadius: 8,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
        background: C.bg2, border: `1.5px solid ${C.line}`, cursor: "pointer", flexShrink: 0,
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 16, height: 2, background: C.ink, borderRadius: 2, display: "block" }} />
        ))}
      </button>

      {/* Logo */}
      <div style={{
        width: 32, height: 32, background: C.yellow, borderRadius: 8,
        border: `2px solid ${C.ink}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 15, color: C.ink, flexShrink: 0,
      }}>B</div>
      <span style={{ fontWeight: 800, fontSize: 15, color: C.ink, flexShrink: 0 }}>
        Coders<strong style={{ color: C.yellow }}>Bee</strong>
      </span>

      <span style={{ color: C.ink3, fontSize: 13 }}>›</span>
      <Link to="/summer-camp" style={{ fontSize: 13, color: C.ink3, textDecoration: "none" }}>Summer Camp</Link>
      <span style={{ color: C.ink3, fontSize: 13 }}>›</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Day {dayNum}</span>

      {/* Journey progress */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontSize: 10, fontWeight: 800, color: C.ink3, letterSpacing: "0.1em",
          fontFamily: "'JetBrains Mono', monospace",
        }}>JOURNEY</span>
        <div style={{ display: "flex", gap: 2 }}>
          {Array.from({ length: totalDays }).map((_, i) => (
            <div key={i} style={{
              height: 6, borderRadius: 3,
              width: i < dayNum ? 10 : 6,
              background: i < dayNum ? C.yellow : C.line,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: C.ink3, fontFamily: "'JetBrains Mono', monospace" }}>
          {dayNum - 1}/{totalDays}
        </span>
      </div>

      {/* WA button */}
      <button onClick={onWhatsApp} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: C.wa, color: "#fff",
        border: `2px solid ${C.ink}`, borderRadius: 10,
        padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0,
      }}>💬 WhatsApp</button>
    </div>
  );
}

/* ─── DayRow (used inside Sidebar) ────────────────────────────────── */
function DayRow({ day, currentDay }: { day: DayInfo; currentDay: number }) {
  const isCurrent = day.n === currentDay;
  const isDone    = day.n < currentDay;
  const isLocked  = day.n > currentDay;

  const inner = (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "9px 16px",
      background: isCurrent ? C.yellowSoft : day.bonus ? "rgba(251,191,36,0.08)" : "transparent",
      borderLeft: `3px solid ${isCurrent ? C.yellow : day.bonus ? C.yellow : "transparent"}`,
      opacity: isLocked ? 0.45 : 1,
      cursor: isLocked ? "default" : "pointer",
      transition: "background 0.15s",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: isCurrent ? C.yellow : day.bonus ? "#FFF8E1" : isDone ? C.green : C.bg2,
        border: `1.5px solid ${isCurrent ? C.yellowD : day.bonus ? C.yellow : isDone ? C.greenDeep : C.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: day.bonus ? 13 : 10, fontWeight: 800,
        color: isCurrent ? C.ink : isDone ? "#fff" : C.ink3,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {day.bonus ? "⭐" : isDone ? "✓" : String(day.n).padStart(2, "0")}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12, fontWeight: isCurrent ? 700 : 500,
          color: isCurrent ? C.ink : C.ink2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{day.title}</div>
        {day.project && (
          <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginTop: 1 }}>🎯 Project</div>
        )}
        {day.bonus && (
          <div style={{ fontSize: 10, color: "#92620A", fontWeight: 700, marginTop: 1 }}>🛠️ Bonus</div>
        )}
      </div>
      {isLocked && <span style={{ fontSize: 11, flexShrink: 0 }}>🔒</span>}
    </div>
  );

  if (!isLocked) {
    return (
      <Link to={`/summer-camp/module/${day.n}`} style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

/* ─── Sidebar ──────────────────────────────────────────────────────── */
function Sidebar({ open, currentDay, mob, onClose }: {
  open: boolean; currentDay: number; mob: boolean; onClose: () => void;
}) {
  const pythonDays = ALL_DAYS.filter(d => d.track === "P");
  const aiDays     = ALL_DAYS.filter(d => d.track === "A");

  const style = mob
    ? {
        position: "fixed" as const, top: 0, left: 0, bottom: 0, zIndex: 70,
        width: 280,
        background: C.paper, borderRight: `2px solid ${C.line}`,
        overflowY: "auto" as const,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s ease",
        boxShadow: open ? "4px 0 24px rgba(0,0,0,0.15)" : "none",
      }
    : {
        width: open ? 280 : 0,
        minWidth: open ? 280 : 0,
        flexShrink: 0,
        position: "sticky" as const,
        top: 100,
        height: "calc(100vh - 100px)",
        overflowY: "auto" as const,
        overflowX: "hidden" as const,
        background: C.paper,
        borderRight: open ? `2px solid ${C.line}` : "none",
        transition: "width 0.28s ease, min-width 0.28s ease",
      };

  const trackLabel = (label: string) => (
    <div style={{
      padding: "12px 16px 5px",
      fontSize: 10, fontWeight: 800, color: C.ink3,
      letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace",
    }}>{label}</div>
  );

  return (
    <>
      {mob && open && (
        <div onClick={onClose} style={{
          position: "fixed", inset: 0, background: "rgba(14,17,22,0.5)", zIndex: 65,
        }} />
      )}
      <div style={style}>
        {/* Header */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1.5px solid ${C.line}`, flexShrink: 0 }}>
          {mob && (
            <button onClick={onClose} style={{
              marginBottom: 12, fontSize: 12, color: C.ink3,
              background: "none", border: `1.5px solid ${C.line}`,
              borderRadius: 6, padding: "4px 10px", cursor: "pointer",
            }}>✕ Close</button>
          )}
          <div style={{
            display: "inline-flex", alignItems: "center",
            background: C.ink, color: C.paper, borderRadius: 20,
            padding: "4px 12px", fontSize: 11, fontWeight: 700, marginBottom: 10,
          }}>Summer Camp · 15 Days</div>
          <div style={{
            fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 800,
            color: C.ink, lineHeight: 1.2,
          }}>Python & AI</div>
          <div style={{ fontSize: 12, color: C.ink3, marginTop: 4 }}>Ages 8–15 · with Manisha</div>
        </div>

        {/* Day list */}
        <div>
          {trackLabel("PYTHON FOUNDATIONS")}
          {pythonDays.map(d => <DayRow key={d.n} day={d} currentDay={currentDay} />)}
          {trackLabel("AI TRACK")}
          {aiDays.map(d => <DayRow key={d.n} day={d} currentDay={currentDay} />)}
        </div>

        {/* Manisha help card */}
        <div style={{ margin: "12px 12px 24px", padding: 14, background: C.greenSoft, borderRadius: 14, border: `1.5px solid ${C.green}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <img src="/manisha.png" alt="Manisha" style={{
              width: 36, height: 36, borderRadius: "50%",
              border: `2px solid ${C.green}`, objectFit: "cover",
            }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Manisha</div>
              <div style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>● online · &lt; 1hr reply</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5, marginBottom: 10 }}>
            Stuck on something? Drop me a message and I'll help you out!
          </div>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{
            display: "block", textAlign: "center",
            background: C.wa, color: "#fff", borderRadius: 8,
            padding: "8px", fontSize: 12, fontWeight: 700, textDecoration: "none",
            border: `1.5px solid ${C.ink}`,
          }}>💬 Ask Manisha</a>
        </div>
      </div>
    </>
  );
}

/* ─── LessonHero ───────────────────────────────────────────────────── */
function LessonHero({ dayNum, totalDays, emoji, title, subtitle, topics, completedDays }: {
  dayNum: number; totalDays: number; emoji: string;
  title: string; subtitle: string; topics: string[]; completedDays: number;
}) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.yellowSoft} 0%, #fff8d6 100%)`,
      padding: "44px 40px 32px",
      borderBottom: `2px solid ${C.line}`,
      flexShrink: 0,
    }}>
      <div style={{
        fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800,
        color: C.ink3, letterSpacing: "0.14em", marginBottom: 18,
      }}>DAY {dayNum} OF {totalDays}</div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 18 }}>
        <span style={{ fontSize: 60, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
        <div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900, color: C.ink, margin: 0, lineHeight: 1.05,
          }}>{title}</h1>
          <p style={{
            fontStyle: "italic", fontSize: 17, color: C.ink2,
            margin: "8px 0 0", fontFamily: "'Fraunces', serif", fontWeight: 400,
          }}>{subtitle}</p>
        </div>
      </div>

      {/* Topic pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {topics.map((t, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.paper, border: `1.5px solid ${C.line}`,
            borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: C.ink2,
          }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: C.yellowD,
              fontFamily: "'JetBrains Mono', monospace",
            }}>{i + 1}.</span>
            {t}
          </span>
        ))}
      </div>

      {/* 15-dot progress stamp */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {Array.from({ length: totalDays }).map((_, i) => (
          <div key={i} style={{
            height: 8, borderRadius: 4,
            width: i === completedDays ? 18 : 8,
            background: i < completedDays ? C.green : i === completedDays ? C.yellow : C.line,
            transition: "all 0.3s",
          }} />
        ))}
        <span style={{
          fontSize: 11, color: C.ink3, marginLeft: 8,
          fontFamily: "'JetBrains Mono', monospace",
        }}>{completedDays}/{totalDays} days complete</span>
      </div>
    </div>
  );
}

/* ─── StartHereCard ────────────────────────────────────────────────── */
function StartHereCard() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowD})`,
      borderRadius: 16, border: `2.5px solid ${C.ink}`,
      boxShadow: `6px 6px 0 ${C.ink}`,
      padding: "18px 22px",
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <span style={{ fontSize: 34, flexShrink: 0 }}>🎬</span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontWeight: 800,
          fontSize: 19, color: C.ink, marginBottom: 4,
        }}>Start here — watch the video first!</div>
        <div style={{ fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>
          Before reading or coding anything, watch the video all the way through.
        </div>
      </div>
      <span style={{ fontSize: 26, flexShrink: 0, display: "inline-block", animation: "bob 1.5s ease-in-out infinite" }}>👇</span>
    </div>
  );
}

/* ─── ParentNote ───────────────────────────────────────────────────── */
function ParentNote() {
  return (
    <div style={{
      background: C.blueSoft, borderRadius: 14,
      border: `1.5px solid ${C.blue}30`,
      padding: "13px 18px",
      display: "flex", alignItems: "flex-start", gap: 12,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>👨‍👩‍👧</span>
      <p style={{ margin: 0, fontSize: 13, color: C.ink2, lineHeight: 1.6 }}>
        <strong style={{ color: C.blue }}>For parents: </strong>
        Watch the video <em>together</em> with your child — pause it to discuss key ideas
        and encourage them to take notes. The quiz and coding challenges below are
        directly based on the video, so focused watching makes a big difference!
      </p>
    </div>
  );
}

/* ─── VideoCard ────────────────────────────────────────────────────── */
function VideoCard({ videoUrl, dayNum }: { videoUrl: string; dayNum: number }) {
  return (
    <div style={{
      borderRadius: 16, border: `2.5px solid ${C.ink}`,
      boxShadow: `6px 6px 0 ${C.ink}`, overflow: "hidden",
    }}>
      {/* Dark header */}
      <div style={{
        background: C.codeBg, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 13, color: C.ink,
          flexShrink: 0,
        }}>CB</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            Summer Camp Python & AI — Day {dayNum}
          </div>
          <div style={{ fontSize: 11, color: "#ffffff70" }}>CodersBee</div>
        </div>
        <span style={{
          background: C.yellow, color: C.ink, borderRadius: 6,
          padding: "3px 10px", fontSize: 11, fontWeight: 800,
          fontFamily: "'JetBrains Mono', monospace", flexShrink: 0,
        }}>▶ 8:24</span>
      </div>

      {/* iframe — use nocookie domain for better browser compatibility */}
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
        <iframe
          src={videoUrl.replace("www.youtube.com", "www.youtube-nocookie.com")}
          title={`Day ${dayNum} — Summer Camp Python & AI`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>

      <div style={{ background: C.bg2, padding: "8px 16px", textAlign: "center" }}>
        <a href="https://youtu.be/2oVlYl1Wu8g" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, color: C.ink3, textDecoration: "none" }}>
          Video not showing? Watch directly on YouTube ↗
        </a>
      </div>
    </div>
  );
}

/* ─── AdventureCallout ─────────────────────────────────────────────── */
function AdventureCallout({ text }: { text: string }) {
  return (
    <div style={{
      background: C.greenSoft, borderRadius: 16,
      border: `2px solid ${C.green}`,
      boxShadow: `4px 4px 0 ${C.greenDeep}`,
      padding: "18px 22px",
      display: "flex", alignItems: "flex-start", gap: 14,
    }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: C.ink, marginBottom: 6 }}>Today's Adventure</div>
        <div style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>{text}</div>
      </div>
    </div>
  );
}

/* ─── SectionTabs ──────────────────────────────────────────────────── */
function SectionTabs({ sections, active, onTab, completedSections }: {
  sections: Array<{ title: string }>;
  active: number; onTab: (i: number) => void; completedSections: boolean[];
}) {
  return (
    <div style={{
      position: "sticky", top: 100, zIndex: 40,
      background: C.paper, borderBottom: `1.5px solid ${C.line}`,
      padding: "10px 40px",
      display: "flex", gap: 8, overflowX: "auto",
      flexShrink: 0,
    }}>
      {sections.map((s, i) => {
        const isActive = active === i;
        const isDone   = completedSections[i] && !isActive;
        return (
          <button key={i} onClick={() => onTab(i)} style={{
            flexShrink: 0, padding: "7px 16px", borderRadius: 20,
            border: `2px solid ${isActive ? C.ink : isDone ? C.green : C.line}`,
            background: isActive ? C.ink : isDone ? C.greenSoft : "transparent",
            color: isActive ? C.yellow : isDone ? C.greenDeep : C.ink3,
            fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            fontFamily: "'Manrope', sans-serif",
          }}>
            {isDone ? "✓ " : `${i + 1}. `}
            {s.title.split("—")[0].trim().split(" ").slice(0, 3).join(" ")}
          </button>
        );
      })}
    </div>
  );
}

/* ─── SectionCard ──────────────────────────────────────────────────── */
function SectionCard({ section, idx, total, onPrev, onNext, atStart, atEnd }: {
  section: { title: string; content: string; code?: string; analogy?: string; tip?: string };
  idx: number; total: number;
  onPrev: () => void; onNext: () => void;
  atStart: boolean; atEnd: boolean;
}) {
  return (
    <div style={{
      background: C.paper, borderRadius: 20,
      border: `2.5px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "18px 28px", background: C.bg2,
        borderBottom: `2px solid ${C.ink}`,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: C.yellow, border: `1.5px solid ${C.yellowD}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 12, color: C.ink,
          flexShrink: 0,
        }}>{String(idx + 1).padStart(2, "0")}</div>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 800,
          color: C.ink, margin: 0, flex: 1,
        }}>{section.title}</h2>
        <span style={{
          fontSize: 11, color: C.ink3, flexShrink: 0,
          fontFamily: "'JetBrains Mono', monospace",
        }}>Section {idx + 1} / {total}</span>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px" }}>
        <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: "0 0 20px" }}>
          {section.content}
        </p>

        {/* Code block */}
        {section.code && (
          <div style={{
            marginBottom: 20, borderRadius: 12, overflow: "hidden",
            border: `2px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`,
          }}>
            <div style={{
              background: C.codeBg, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 8,
              borderBottom: "1px solid #ffffff12",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.yellow, display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.green, display: "inline-block" }} />
              <span style={{
                marginLeft: 8, fontSize: 11, color: "#FFEFC2",
                fontFamily: "'JetBrains Mono', monospace",
              }}>&lt;/&gt; example.py</span>
            </div>
            <pre style={{
              background: C.codeBg, color: "#e2e8f0",
              padding: "16px 18px", margin: 0, fontSize: 13, lineHeight: 1.85,
              overflowX: "auto", fontFamily: "'JetBrains Mono', monospace",
            }}>{section.code}</pre>
          </div>
        )}

        {/* Think of it this way */}
        {section.analogy && (
          <div style={{
            background: C.yellowSoft, borderRadius: 12,
            border: `1.5px solid ${C.yellowD}`,
            padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 800, color: C.yellowD,
                marginBottom: 4, letterSpacing: "0.08em",
              }}>THINK OF IT THIS WAY</div>
              <div style={{ fontSize: 14, color: C.ink2, lineHeight: 1.65 }}>{section.analogy}</div>
            </div>
          </div>
        )}

        {/* Pro tip */}
        {section.tip && (
          <div style={{
            background: C.greenSoft, borderRadius: 12,
            border: `1.5px solid ${C.green}30`,
            padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚡</span>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 800, color: C.greenDeep,
                marginBottom: 4, letterSpacing: "0.08em",
              }}>PRO TIP</div>
              <div style={{ fontSize: 14, color: C.ink2, lineHeight: 1.65 }}>{section.tip}</div>
            </div>
          </div>
        )}

        {/* Prev / Next */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
          <button onClick={onPrev} disabled={atStart} style={{
            fontSize: 13, fontWeight: 700,
            color: atStart ? C.line : C.ink2,
            background: "none", border: "none",
            cursor: atStart ? "not-allowed" : "pointer",
          }}>← Previous</button>
          <span style={{ fontSize: 12, color: C.ink3, fontFamily: "'JetBrains Mono', monospace" }}>
            {idx + 1} / {total}
          </span>
          <button onClick={onNext} style={{
            fontSize: 13, fontWeight: 700, color: C.ink,
            background: atEnd ? C.yellow : C.bg2,
            border: `1.5px solid ${atEnd ? C.yellowD : C.line}`,
            borderRadius: 8, padding: "7px 16px", cursor: "pointer",
          }}>{atEnd ? "Go to Challenges →" : "Next →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── ChallengeWrapper ─────────────────────────────────────────────── */
function ChallengeWrapper({ n, icon, title, stamp, mission, tone, children, onWhatsApp, hints, solutionVideoUrl }: {
  n: number; icon: string; title: string; stamp: string; mission: string;
  tone: "green" | "red" | "blue" | "purple"; children: React.ReactNode;
  onWhatsApp: () => void; hints?: string[]; solutionVideoUrl?: string;
}) {
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const allHintsShown = hints ? hintsShown >= hints.length : false;

  const colors = {
    green:  { bg: C.greenSoft,  border: C.green,  deep: C.greenDeep },
    red:    { bg: C.redSoft,    border: C.red,    deep: "#a00735" },
    blue:   { bg: C.blueSoft,   border: C.blue,   deep: C.blue },
    purple: { bg: C.purpleSoft, border: C.purple, deep: C.purple },
  }[tone];

  const howToSteps = {
    green:  ["Read the mission above", "Replace every ___ with your own info", "Press ▶ Run to see your output", "Fix anything the output flags and run again"],
    red:    ["Read the buggy code carefully", "Spot each mistake (there are 4)", "Fix them one by one in the editor", "Press ▶ Test Fix to check your work"],
    blue:   ["Read the mission above", "Click inside the editor to start typing", "Write at least 3 print() statements", "Press ▶ Run to see your program run"],
    purple: ["Press ▶ Run to start the program", "A terminal box appears — type your name there", "Press Enter or the Submit button", "Watch Python say hello to you!"],
  }[tone];

  return (
    <div style={{
      background: C.paper, borderRadius: 20,
      border: `2.5px solid ${C.ink}`,
      boxShadow: `8px 8px 0 ${colors.deep}`,
      overflow: "hidden",
    }}>
      {/* Header band */}
      <div style={{
        padding: "18px 24px",
        background: colors.bg, borderBottom: `2px solid ${C.ink}`,
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: C.paper, border: `2px solid ${C.ink}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800,
            color: C.ink, margin: "0 0 3px",
          }}>{title}</h3>
          <div style={{ fontSize: 12, color: C.ink2, fontWeight: 600 }}>{n === 0 ? "Warm-up challenge" : `Challenge ${n} of 3`}</div>
        </div>
        <span style={{
          background: C.yellow, color: C.ink, borderRadius: 20,
          padding: "4px 14px", fontSize: 12, fontWeight: 700,
          border: `1.5px solid ${C.yellowD}`, flexShrink: 0,
        }}>{stamp}</span>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.65, margin: "0 0 16px" }}>{mission}</p>

        {/* How to do this guide */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap",
        }}>
          {howToSteps.map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              background: C.bg2, borderRadius: 10,
              border: `1.5px solid ${C.line}`,
              padding: "8px 12px", flex: "1 1 180px",
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: C.ink, color: C.yellow,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
              }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>

        {children}

        {/* Help escalation bar */}
        <div style={{
          marginTop: 14, padding: "11px 14px",
          background: C.bg2, borderRadius: 12,
          border: `1.5px solid ${C.line}`,
          display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 12, color: C.ink3, fontWeight: 600 }}>Need help?</span>

          {/* Step 1: text hints */}
          {hints && hints.length > 0 && (
            <button onClick={() => setHintsShown(h => Math.min(h + 1, hints.length))} style={{
              fontSize: 12, color: C.ink, fontWeight: 700,
              padding: "5px 12px", background: C.paper,
              borderRadius: 8, border: `1.5px solid ${C.line}`, cursor: "pointer",
            }}>
              💡 {hintsShown === 0 ? "Show a hint" : hintsShown < hints.length ? `Next hint (${hintsShown}/${hints.length})` : `All hints shown`}
            </button>
          )}

          {/* Step 2: solution video — only after all hints revealed */}
          {solutionVideoUrl && allHintsShown && !showSolution && (
            <button onClick={() => setShowSolution(true)} style={{
              fontSize: 12, color: "#fff", fontWeight: 700,
              padding: "5px 12px", background: C.ink,
              borderRadius: 8, border: `1.5px solid ${C.ink}`, cursor: "pointer",
            }}>🎬 Watch solution</button>
          )}

          {/* Step 3: WhatsApp — last resort */}
          {allHintsShown && (
            <button onClick={onWhatsApp} style={{
              fontSize: 12, color: "#fff", fontWeight: 700,
              padding: "5px 14px", background: C.wa,
              borderRadius: 8, border: `1.5px solid ${C.ink}`,
              cursor: "pointer", marginLeft: "auto",
            }}>💬 Ask Manisha</button>
          )}
        </div>

        {/* Current hint */}
        {hintsShown > 0 && hints && (
          <div style={{
            marginTop: 10, padding: "12px 16px",
            background: C.yellowSoft, borderRadius: 10,
            border: `1.5px solid ${C.yellowD}`,
            fontSize: 13, lineHeight: 1.6,
          }}>
            <strong>Hint {hintsShown}/{hints.length}: </strong>{hints[hintsShown - 1]}
            {hintsShown < hints.length && (
              <button onClick={() => setHintsShown(h => h + 1)} style={{
                marginLeft: 12, fontSize: 11, color: C.yellowD, fontWeight: 700,
                background: "none", border: "none", cursor: "pointer", textDecoration: "underline",
              }}>next hint →</button>
            )}
          </div>
        )}

        {/* Solution video link — shown after button click */}
        {showSolution && solutionVideoUrl && (
          <div style={{
            marginTop: 14, padding: "16px 18px",
            background: C.codeBg, borderRadius: 14,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.ink}`,
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10, flexShrink: 0,
              background: "#FF0000", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22,
            }}>▶</div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                Solution walkthrough — Manisha
              </div>
              <div style={{ fontSize: 12, color: "#ffffff80", lineHeight: 1.5 }}>
                Try to <strong style={{ color: C.yellow }}>follow along</strong> rather than just copying — pause and type each line yourself.
              </div>
            </div>
            <a
              href={solutionVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: C.yellow, color: C.ink,
                border: `2px solid ${C.yellowD}`, borderRadius: 10,
                padding: "10px 18px", fontSize: 13, fontWeight: 800,
                textDecoration: "none", flexShrink: 0,
                boxShadow: `3px 3px 0 ${C.yellowD}`,
              }}
            >
              Watch on YouTube ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── DayComplete ──────────────────────────────────────────────────── */
function DayComplete({ score, total, onNextDay }: {
  score: number; total: number; onNextDay: () => void;
}) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowD})`,
      borderRadius: 20, border: `2.5px solid ${C.ink}`,
      boxShadow: `8px 8px 0 ${C.ink}`,
      padding: "32px 36px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -24, top: -24,
        fontSize: 200, opacity: 0.1, lineHeight: 1,
        transform: "rotate(-15deg)", pointerEvents: "none",
        userSelect: "none",
      }}>🏆</div>
      <div style={{
        display: "inline-block", background: C.ink, color: C.yellow,
        borderRadius: 20, padding: "4px 14px",
        fontSize: 12, fontWeight: 700, marginBottom: 12,
      }}>Day 1 complete 🎉</div>
      <h2 style={{
        fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 900,
        color: C.ink, margin: "0 0 12px", lineHeight: 1.1,
      }}>You did it!</h2>
      <p style={{ fontSize: 15, color: C.ink2, maxWidth: 520, lineHeight: 1.65, margin: "0 0 22px" }}>
        You watched the video, read all the sections, and scored{" "}
        <strong>{score}/{total}</strong> on the quiz. That's a real Day 1.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={onNextDay} style={{
          background: C.ink, color: C.yellow,
          border: `2px solid ${C.ink}`, borderRadius: 12,
          padding: "12px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer",
          boxShadow: `4px 4px 0 ${C.yellowD}`,
        }}>Start Day 2 →</button>
      </div>
    </div>
  );
}

/* ─── WAModal ──────────────────────────────────────────────────────── */
function WAModal({ dayNum, onClose }: { dayNum: number; onClose: () => void }) {
  const [msg, setMsg] = useState(`Hi Manisha! I'm on Day ${dayNum} and I'm stuck. Can you help?`);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(14,17,22,.65)",
      zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 480, maxWidth: "100%", background: C.paper,
        borderRadius: 20, padding: 28,
        border: `2px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <img src="/manisha.png" alt="Manisha" style={{
            width: 52, height: 52, borderRadius: "50%",
            border: `2.5px solid ${C.green}`, objectFit: "cover",
          }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.ink }}>Manisha Mam</div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
              Online · usually replies in &lt; 1 hour
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: C.ink2, margin: "0 0 10px", lineHeight: 1.55 }}>
          Send a quick message — she'll see exactly which day you're on.
        </p>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} style={{
          width: "100%", padding: 12, fontSize: 14, borderRadius: 10,
          border: `2px solid ${C.line}`, minHeight: 90,
          fontFamily: "'Manrope', sans-serif", lineHeight: 1.5,
          resize: "vertical", boxSizing: "border-box",
        }} />
        <button onClick={() => {
          window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
          onClose();
        }} style={{
          marginTop: 12, width: "100%", padding: "14px",
          background: C.wa, color: "#fff",
          border: `2px solid ${C.ink}`, borderRadius: 12,
          fontWeight: 800, fontSize: 15, cursor: "pointer",
          boxShadow: `0 4px 0 ${C.ink}`,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>💬 Send on WhatsApp →</button>
        <button onClick={onClose} style={{
          marginTop: 8, width: "100%", fontSize: 13,
          color: C.ink3, background: "none", border: "none", cursor: "pointer", padding: "6px",
        }}>Close</button>
      </div>
    </div>
  );
}

/* ─── Toast ────────────────────────────────────────────────────────── */
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 3200);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", top: 110, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, background: C.ink, color: C.yellow,
      padding: "12px 22px", borderRadius: 14,
      border: `2px solid ${C.ink}`, boxShadow: "0 12px 32px -10px rgba(0,0,0,.45)",
      fontWeight: 700, fontSize: 14,
      display: "flex", alignItems: "center", gap: 10,
      whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 20 }}>🎉</span>{msg}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, token, username, logout } = useCampAuth();
  const vw = useWindowWidth();
  const mob = vw < 920;

  const id  = parseFloat(moduleId || "1");
  const mod = summerCampModules.find(m => m.id === id);

  /* ── State ── */
  const [sidebarOpen,    setSidebarOpen]    = useState(vw >= 920);
  const [activeSection,  setActiveSection]  = useState(0);
  const [sectionsDone,   setSectionsDone]   = useState<boolean[]>([]);
  const [quizAnswers,    setQuizAnswers]     = useState<(number | null)[]>([]);
  const [quizSubmitted,  setQuizSubmitted]   = useState(false);
  const [waOpen,         setWaOpen]         = useState(false);
  const [toast,          setToast]          = useState<string | null>(null);

  const sectionsRef  = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);

  /* ── Sync sidebar with viewport ── */
  useEffect(() => { setSidebarOpen(vw >= 920); }, [vw]);

  /* ── Init sectionsDone once module loads ── */
  useEffect(() => {
    if (mod && sectionsDone.length !== mod.sections.length) {
      setSectionsDone(mod.sections.map(() => false));
    }
  }, [mod?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Mark section visited when leaving ── */
  useEffect(() => {
    if (!mod || sectionsDone.length === 0) return;
    setSectionsDone(prev => {
      const next = [...prev];
      next[activeSection] = true;
      return next;
    });
  }, [activeSection]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Auth guard: modules 2+ require login ── */
  const requiresAuth = id > 1;
  useEffect(() => {
    if (requiresAuth && !isLoading && !isAuthenticated) {
      navigate(`/summer-camp/login?next=/summer-camp/module/${id}`, { replace: true });
    }
  }, [requiresAuth, isLoading, isAuthenticated, id, navigate]);

  if (requiresAuth && isLoading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: C.yellowSoft,
      }}>
        <Loader2 style={{ width: 32, height: 32, color: C.yellowD, animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }
  if (requiresAuth && !isAuthenticated) return null;

  if (!mod) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <p style={{ color: C.ink3, fontSize: 18 }}>Module not found.</p>
        <Link to="/summer-camp" style={{ color: C.yellow, fontWeight: 700 }}>← Back to Summer Camp</Link>
      </div>
    );
  }

  /* ── Derived values ── */
  const sortedMods = [...summerCampModules].sort((a, b) => a.id - b.id);
  const currentIdx = sortedMods.findIndex(m => m.id === id);
  const nextMod    = currentIdx >= 0 ? sortedMods[currentIdx + 1] : undefined;
  const savedPct = Math.round(
    ((sectionsDone.filter(Boolean).length + (quizSubmitted ? 1 : 0)) /
     (mod.sections.length + 1)) * 100
  );

  /* ── Quiz handlers ── */
  const handleAnswer = (qi: number, oi: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => { const n = [...prev]; n[qi] = oi; return n; });
  };

  const handleQuizSubmit = () => {
    const answered = quizAnswers.filter(a => a !== null && a !== undefined).length;
    if (answered < mod.quiz.length) return;
    const score = mod.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
    setQuizSubmitted(true);
    setToast(`Quiz done! ${score}/${mod.quiz.length} correct`);
    if (token) {
      fetch("/.netlify/functions/camp-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ moduleId: id, score, total: mod.quiz.length }),
      }).catch(() => {/* best-effort */});
    }
  };

  const quizScore = quizSubmitted
    ? mod.quiz.filter((q, i) => quizAnswers[i] === q.correct).length
    : 0;
  const answeredCount = quizAnswers.filter(a => a !== null && a !== undefined).length;

  /* ── Section nav ── */
  const goToSection = (i: number) => {
    setActiveSection(i);
    if (sectionsRef.current) {
      const y = sectionsRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  /* ── Challenge hints ── */
  const hints = {
    input: [
      "Press Run, then look for the terminal box that appears below the editor. Type your name there!",
      "Python's input() pauses and waits for you to type. Press Enter (or the Submit button) when done.",
    ],
    guided: [
      "Look for the ___ blanks — replace each with your real info.",
      'Keep the quotes! e.g. print("Name: Priya")',
      "Hit Run when every blank is filled — even silly answers work!",
    ],
    debug: [
      "Look at each line carefully. The errors are tiny: a quote, a capital letter, a parenthesis.",
      'Python is case-sensitive: "print" works, "Print" doesn\'t.',
      "Every open quote needs a close quote. Every open ( needs a close ).",
    ],
    scratch: [
      'Start each line with print( and end with ). Your message goes in "quotes" inside.',
      'Try: print("Hi! My friend is Maya."). Use any name or character.',
      "Need at least 3 print()s. Try one intro, one fact, one fun emoji line!",
    ],
  };

  const pad = mob ? "0 16px" : "0 40px";

  return (
    <div style={{ minHeight: "100vh", background: C.bg2, fontFamily: "'Manrope', sans-serif" }}>

      {/* Keyframes */}
      <style>{`
        @keyframes bob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* ── GreetStrip or plain top strip ── */}
      {isAuthenticated && username ? (
        <GreetStrip
          username={username}
          savedPct={savedPct}
          onLogout={() => { logout(); navigate("/summer-camp/login"); }}
        />
      ) : (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          height: 40, background: C.ink,
          display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.yellow }}>🐝 CodersBee Summer Camp</span>
          <Link to="/summer-camp/login?next=/summer-camp/module/1" style={{
            marginLeft: "auto", fontSize: 12, color: "#fff", fontWeight: 700,
            background: `${C.yellow}20`, border: `1px solid ${C.yellow}40`,
            borderRadius: 6, padding: "3px 12px", textDecoration: "none",
          }}>Log in to save progress →</Link>
        </div>
      )}

      {/* ── Main flex: sidebar + content ── */}
      <div style={{ paddingTop: 40, display: "flex", minHeight: "100vh" }}>

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          currentDay={id}
          mob={mob}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* TopBar */}
          <TopBar
            dayNum={id}
            totalDays={15}
            onToggleSidebar={() => setSidebarOpen(s => !s)}
            onWhatsApp={() => setWaOpen(true)}
          />

          {/* Hero */}
          <LessonHero
            dayNum={id}
            totalDays={15}
            emoji={mod.emoji}
            title={mod.title}
            subtitle={mod.tagline}
            topics={mod.topics}
            completedDays={id - 1}
          />

          {/* Intro cards */}
          <div style={{ padding: mob ? "20px 16px" : "24px 40px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>

            {/* Login nudge for free Day 1 */}
            {id === 1 && !isAuthenticated && (
              <div style={{
                background: C.blueSoft, borderRadius: 14,
                border: `1.5px solid ${C.blue}30`,
                padding: "14px 18px",
                display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
              }}>
                <span style={{ fontSize: 18 }}>💡</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 14, color: C.blue }}>Day 1 is free — no login needed!</strong>
                  <span style={{ fontSize: 13, color: C.ink2, marginLeft: 6 }}>
                    Log in so your teacher can track your progress across all 15 days.
                  </span>
                </div>
                <Link to="/summer-camp/login?next=/summer-camp/module/1" style={{
                  background: C.blue, color: "#fff", borderRadius: 10,
                  padding: "8px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none",
                  flexShrink: 0,
                }}>Log in →</Link>
              </div>
            )}

            <StartHereCard />
            <ParentNote />
            {mod.videoUrl && <VideoCard videoUrl={mod.videoUrl} dayNum={id} />}
            <AdventureCallout text={mod.intro} />
          </div>

          {/* Section tabs */}
          <div ref={sectionsRef}>
            <SectionTabs
              sections={mod.sections}
              active={activeSection}
              onTab={goToSection}
              completedSections={sectionsDone.length ? sectionsDone : mod.sections.map(() => false)}
            />
          </div>

          {/* Active section card */}
          <div style={{ padding: mob ? "16px 16px" : "20px 40px", maxWidth: 900 }}>
            <SectionCard
              section={mod.sections[activeSection]}
              idx={activeSection}
              total={mod.sections.length}
              onPrev={() => goToSection(Math.max(0, activeSection - 1))}
              onNext={() => {
                if (activeSection === mod.sections.length - 1) {
                  challengesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  goToSection(activeSection + 1);
                }
              }}
              atStart={activeSection === 0}
              atEnd={activeSection === mod.sections.length - 1}
            />
          </div>

          {/* ── Challenges ── */}
          <div ref={challengesRef} style={{ padding: mob ? "16px 16px" : "24px 40px", maxWidth: 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
              <span style={{
                background: C.ink, color: C.yellow, borderRadius: 20,
                padding: "4px 14px", fontSize: 12, fontWeight: 700,
              }}>{mod.tugOfWarChallenge ? "1 Game + 3 Challenges" : "3 Challenges"}</span>
              <h2 style={{
                fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 900,
                color: C.ink, margin: 0,
              }}>Time to code.</h2>
              <span style={{ fontSize: 13, color: C.ink3 }}>
                {mod.tugOfWarChallenge ? "Game → guided → debug → blank page." : "Easy → medium → blank page."} Take your time.
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* 🎮 Tug of War Game — shown FIRST when present */}
              {mod.tugOfWarChallenge && (
                <TugOfWarGame data={mod.tugOfWarChallenge} />
              )}

              {/* Challenge 0 — Warm-up with input() */}
              {mod.inputChallenge && (
                <ChallengeWrapper
                  n={0} icon="🗣️"
                  title="Challenge 0 — Warm-up"
                  stamp="Talk to Python!"
                  mission={mod.inputChallenge.description}
                  tone="purple"
                  onWhatsApp={() => setWaOpen(true)}
                  hints={hints.input}
                >
                  <PythonPlayground
                    starterCode={mod.inputChallenge.code ?? ""}
                    challengeDescription={mod.inputChallenge.description}
                    moduleColor="text-purple-600"
                    moduleBgColor="bg-purple-50"
                    moduleBorderColor="border-purple-200"
                    variant="challenge"
                  />
                </ChallengeWrapper>
              )}

              {/* Challenge 1 */}
              <ChallengeWrapper
                n={1} icon="🏆"
                title="Challenge 1 — Guided"
                stamp="Starter code provided"
                mission={mod.challenge.description}
                tone="green"
                onWhatsApp={() => setWaOpen(true)}
                hints={hints.guided}
                solutionVideoUrl={mod.challenge.solutionVideoUrl}
              >
                {mod.challenge.code && (
                  <PythonPlayground
                    starterCode={mod.challenge.code}
                    challengeDescription={mod.challenge.description}
                    moduleColor="text-green-600"
                    moduleBgColor="bg-green-50"
                    moduleBorderColor="border-green-200"
                    variant="challenge"
                  />
                )}
              </ChallengeWrapper>

              {/* Challenge 2 — Debug */}
              {mod.debugChallenge && (
                <ChallengeWrapper
                  n={2} icon="🐛"
                  title="Challenge 2 — Debug Zone"
                  stamp="Fix the errors"
                  mission={mod.debugChallenge.description}
                  tone="red"
                  onWhatsApp={() => setWaOpen(true)}
                  hints={hints.debug}
                  solutionVideoUrl={mod.debugChallenge.solutionVideoUrl}
                >
                  <PythonPlayground
                    starterCode={mod.debugChallenge.brokenCode}
                    challengeDescription={mod.debugChallenge.expectedOutputDescription}
                    moduleColor="text-red-600"
                    moduleBgColor="bg-red-50"
                    moduleBorderColor="border-red-200"
                    variant="debug"
                    hint={mod.debugChallenge.hint}
                    debugBugs={mod.debugChallenge.bugs}
                  />
                </ChallengeWrapper>
              )}

              {/* Challenge 3 — Blank canvas */}
              {mod.blankChallenge && (
                <ChallengeWrapper
                  n={3} icon="✍️"
                  title="Challenge 3 — Your Turn!"
                  stamp="Write from scratch"
                  mission={mod.blankChallenge.task}
                  tone="blue"
                  onWhatsApp={() => setWaOpen(true)}
                  hints={hints.scratch}
                  solutionVideoUrl={mod.blankChallenge.solutionVideoUrl}
                >
                  <PythonPlayground
                    starterCode={mod.blankChallenge.starterComment}
                    challengeDescription={mod.blankChallenge.validationGoal}
                    moduleColor="text-blue-600"
                    moduleBgColor="bg-blue-50"
                    moduleBorderColor="border-blue-200"
                    variant="blank"
                  />
                </ChallengeWrapper>
              )}

              {/* Colab / Replit Project Challenge */}
              {mod.colabChallenge && (() => {
                const cc = mod.colabChallenge!;
                const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(cc.whatsappText)}`;
                return (
                  <div style={{
                    background: "linear-gradient(135deg, #0E1116 0%, #1a2235 100%)",
                    borderRadius: 20, padding: mob ? "24px 20px" : "32px 36px",
                    border: "2.5px solid #FFC72C",
                    boxShadow: "0 8px 0 #FFC72C",
                    marginTop: 24,
                  }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: "#FFC72C", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 26, flexShrink: 0,
                        border: "2px solid rgba(255,255,255,0.2)",
                      }}>{cc.emoji}</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#FFC72C", letterSpacing: "0.1em", marginBottom: 4 }}>
                          🚀 COLAB / REPLIT PROJECT — SUBMIT FOR CERTIFICATE
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{cc.title}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 20 }}>
                      {cc.description}
                    </p>

                    {/* Steps */}
                    <div style={{
                      background: "rgba(255,255,255,0.05)", borderRadius: 14,
                      padding: "16px 20px", marginBottom: 20,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#FFC72C", letterSpacing: "0.08em", marginBottom: 12 }}>
                        📋 HOW TO COMPLETE
                      </div>
                      {cc.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                            background: i === cc.steps.length - 1 ? "#25D366" : "#FFC72C",
                            color: "#0E1116", display: "flex", alignItems: "center",
                            justifyContent: "center", fontSize: 11, fontWeight: 900,
                          }}>{i + 1}</div>
                          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, paddingTop: 3 }}>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Starter code */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#FFC72C", letterSpacing: "0.08em", marginBottom: 10 }}>
                        💻 STARTER CODE — COPY INTO COLAB / REPLIT
                      </div>
                      <div style={{
                        background: "#0d1117", borderRadius: 12,
                        padding: "16px 18px", overflowX: "auto",
                        border: "1px solid rgba(255,255,255,0.1)",
                        maxHeight: 320, overflowY: "auto",
                      }}>
                        <pre style={{ margin: 0, fontSize: 12, color: "#e2e8f0", fontFamily: "monospace", lineHeight: 1.6, whiteSpace: "pre" }}>
                          {cc.starterCode}
                        </pre>
                      </div>
                    </div>

                    {/* Expected output */}
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#25D366", letterSpacing: "0.08em", marginBottom: 10 }}>
                        ✅ YOUR OUTPUT SHOULD LOOK LIKE THIS
                      </div>
                      <div style={{
                        background: "#0d1117", borderRadius: 12,
                        padding: "14px 18px", border: "1px solid #25D36630",
                      }}>
                        <pre style={{ margin: 0, fontSize: 12, color: "#86efac", fontFamily: "monospace", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                          {cc.expectedOutput}
                        </pre>
                      </div>
                    </div>

                    {/* Submit button */}
                    <a href={waUrl} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                      width: "100%", padding: "18px 24px",
                      background: "#25D366", color: "#fff",
                      borderRadius: 14, fontWeight: 900, fontSize: 17,
                      textDecoration: "none", boxSizing: "border-box",
                      border: "2px solid rgba(255,255,255,0.3)",
                      boxShadow: "0 4px 0 #128C7E",
                      transition: "transform .12s",
                    }}>
                      📸 Screenshot done? Send to Manisha Mam →
                    </a>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: 10 }}>
                      Opens WhatsApp with your message pre-filled. Attach your screenshot and hit send. Manisha Mam will mark your module complete! 🏆
                    </p>

                  </div>
                );
              })()}
            </div>
          </div>

          {/* ── Fun fact ── */}
          <div style={{ padding: mob ? "0 16px 16px" : "0 40px 20px", maxWidth: 900 }}>
            <div style={{
              background: `linear-gradient(135deg, ${C.purpleSoft}, ${C.blueSoft})`,
              borderRadius: 16, border: `1.5px solid ${C.purple}25`,
              padding: "18px 22px",
              display: "flex", alignItems: "flex-start", gap: 16,
            }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>🤯</span>
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 800, color: C.purple,
                  letterSpacing: "0.1em", marginBottom: 5,
                }}>DID YOU KNOW?</div>
                <div style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>{mod.funFact}</div>
              </div>
            </div>
          </div>

          {/* ── Quiz ── */}
          <div style={{ padding: mob ? "0 16px 20px" : "0 40px 24px", maxWidth: 900 }}>
            <div style={{
              background: C.paper, borderRadius: 20,
              border: `2.5px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.purple}`,
              overflow: "hidden",
            }}>
              {/* Quiz header */}
              <div style={{
                padding: "18px 28px", background: C.purpleSoft,
                borderBottom: `2px solid ${C.ink}`,
                display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 12,
                  background: C.paper, border: `2px solid ${C.ink}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0,
                }}>⭐</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 800,
                    color: C.ink, margin: "0 0 3px",
                  }}>Quick Quiz</h3>
                  <div style={{ fontSize: 13, color: C.ink2 }}>
                    {mod.quiz.length} questions ·{" "}
                    {quizSubmitted
                      ? `You scored ${quizScore}/${mod.quiz.length}`
                      : "Answer all to unlock Day 2"}
                  </div>
                </div>
                <span style={{
                  background: C.purple, color: "#fff", borderRadius: 20,
                  padding: "4px 14px", fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>{answeredCount} / {mod.quiz.length} answered</span>
              </div>

              {/* Questions */}
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {mod.quiz.map((q, qi) => {
                    const picked  = (oi: number) => quizAnswers[qi] === oi;
                    const correct = (oi: number) => q.correct === oi;
                    return (
                      <div key={qi}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                          <span style={{
                            color: C.yellowD, fontSize: 12, fontWeight: 800, flexShrink: 0,
                            background: C.yellowSoft, padding: "3px 8px", borderRadius: 6,
                            border: `1.5px solid ${C.yellowD}`,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}>Q{qi + 1}</span>
                          <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.45 }}>
                            {q.question}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {q.options.map((opt, oi) => {
                            const sel = picked(oi);
                            const cor = correct(oi);
                            let bg = C.paper, border = C.line;
                            if (quizSubmitted && cor)            { bg = C.greenSoft; border = C.green; }
                            else if (quizSubmitted && sel && !cor){ bg = C.redSoft;   border = C.red;   }
                            else if (!quizSubmitted && sel)       { bg = C.yellowSoft; border = C.ink;  }
                            return (
                              <button key={oi}
                                onClick={() => handleAnswer(qi, oi)}
                                disabled={quizSubmitted}
                                style={{
                                  padding: "11px 16px", borderRadius: 12,
                                  background: bg, border: `1.5px solid ${border}`,
                                  display: "flex", alignItems: "center", gap: 12,
                                  textAlign: "left", fontSize: 14, fontWeight: 500, color: C.ink,
                                  cursor: quizSubmitted ? "default" : "pointer",
                                  boxShadow: !quizSubmitted && sel ? `3px 3px 0 ${C.ink}` : "none",
                                  transition: "all 0.15s",
                                }}>
                                <span style={{
                                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                                  background: sel || (quizSubmitted && cor) ? C.ink : C.bg2,
                                  color: sel || (quizSubmitted && cor) ? C.yellow : C.ink3,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontWeight: 800, fontSize: 11,
                                  fontFamily: "'JetBrains Mono', monospace",
                                  border: `1.5px solid ${C.line}`,
                                }}>
                                  {["A","B","C","D"][oi]}
                                </span>
                                <span style={{ flex: 1 }}>{opt}</span>
                                {quizSubmitted && cor && <span style={{ color: C.green, fontSize: 16 }}>✓</span>}
                                {quizSubmitted && sel && !cor && <span style={{ color: C.red, fontSize: 16 }}>✗</span>}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <div style={{
                            marginTop: 10, padding: "10px 14px",
                            background: C.bg2, borderRadius: 10,
                            borderLeft: `3px solid ${C.ink}`,
                            fontSize: 13, color: C.ink2, lineHeight: 1.6,
                          }}>
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit button */}
                {!quizSubmitted ? (
                  <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <button onClick={handleQuizSubmit} disabled={answeredCount < mod.quiz.length} style={{
                      background: answeredCount < mod.quiz.length ? C.line : C.ink,
                      color: answeredCount < mod.quiz.length ? C.ink3 : C.yellow,
                      border: `2px solid ${C.ink}`, borderRadius: 12,
                      padding: "12px 28px", fontSize: 15, fontWeight: 800,
                      cursor: answeredCount < mod.quiz.length ? "not-allowed" : "pointer",
                    }}>
                      {answeredCount < mod.quiz.length
                        ? `Answer all ${mod.quiz.length} to submit`
                        : "Submit my quiz →"}
                    </button>
                    <span style={{ fontSize: 13, color: C.ink3 }}>
                      You can change any answer before submitting.
                    </span>
                  </div>
                ) : (
                  /* Score reveal */
                  <div style={{
                    marginTop: 28, padding: "22px 26px",
                    background: C.ink, borderRadius: 16,
                    border: `2px solid ${C.ink}`,
                    boxShadow: `6px 6px 0 ${C.purple}`,
                    display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
                  }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
                      background: C.yellow, color: C.ink,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      border: `3px solid ${C.yellowD}`,
                    }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
                        {quizScore}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.6 }}>
                        / {mod.quiz.length}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{
                        fontFamily: "'Fraunces', serif", fontSize: 22, color: C.yellow, fontWeight: 800,
                      }}>
                        {quizScore >= mod.quiz.length * 0.8 ? "Top of the class!"
                         : quizScore >= mod.quiz.length * 0.5 ? "Solid first day!"
                         : "Keep going — you're getting there!"}
                      </div>
                      <div style={{ fontSize: 13, color: "#ffffffbb", marginTop: 4, lineHeight: 1.5 }}>
                        Your score is saved. Re-watch the video and retake any time.
                      </div>
                    </div>
                    <button onClick={() => { setQuizSubmitted(false); setQuizAnswers([]); }} style={{
                      background: C.yellowSoft, color: C.ink,
                      border: `2px solid ${C.yellowD}`, borderRadius: 10,
                      padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}>Retake quiz</button>
                  </div>
                )}

                {/* Login nudge after quiz */}
                {id === 1 && !isAuthenticated && quizSubmitted && (
                  <div style={{
                    marginTop: 20, padding: "16px 18px",
                    background: C.blueSoft, borderRadius: 14,
                    border: `1.5px solid ${C.blue}30`,
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.blue, marginBottom: 6 }}>
                      📊 Want your teacher to see this score?
                    </div>
                    <div style={{ fontSize: 13, color: C.ink3, marginBottom: 12 }}>
                      Log in so your progress is saved and Manisha can track how you're doing.
                    </div>
                    <Link to="/summer-camp/login?next=/summer-camp/module/1" style={{
                      display: "inline-block", background: C.blue, color: "#fff",
                      borderRadius: 10, padding: "8px 18px",
                      fontSize: 13, fontWeight: 700, textDecoration: "none",
                    }}>Log in to save my progress →</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Day complete banner ── */}
          {quizSubmitted && (
            <div style={{ padding: mob ? "0 16px 24px" : "0 40px 32px", maxWidth: 900 }}>
              <DayComplete
                score={quizScore}
                total={mod.quiz.length}
                onNextDay={() => nextMod
                  ? navigate(`/summer-camp/module/${nextMod.id}`)
                  : navigate("/summer-camp")}
              />
            </div>
          )}

          {/* ── Bottom nav ── */}
          <div style={{ padding: mob ? "16px 16px 64px" : "16px 40px 64px", maxWidth: 900 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderTop: `1.5px solid ${C.line}`, paddingTop: 20,
            }}>
              <Link to="/summer-camp" style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 600, color: C.ink3, textDecoration: "none",
              }}>← All Modules</Link>
              {nextMod && (
                <Link to={`/summer-camp/module/${nextMod.id}`} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 700, color: C.ink, textDecoration: "none",
                }}>
                  {nextMod.emoji} Day {nextMod.id}: {nextMod.title} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating WhatsApp FAB ── */}
      <button onClick={() => setWaOpen(true)} style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 30,
        width: 58, height: 58, borderRadius: "50%",
        background: C.wa, color: "#fff",
        border: `3px solid ${C.ink}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, cursor: "pointer",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
      }}>💬</button>

      {/* ── Overlays ── */}
      {waOpen  && <WAModal dayNum={id} onClose={() => setWaOpen(false)} />}
      {toast   && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
