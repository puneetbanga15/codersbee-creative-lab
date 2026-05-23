import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { summerCampModules } from "@/data/summerCampModules";

/* ── Design tokens (matching the design file) ─────────────────────────── */
const C = {
  yellow:    "#FFC72C",
  yellowD:   "#F2B705",
  ink:       "#0E1116",
  ink2:      "#3A4150",
  ink3:      "#6A7180",
  blue:      "#1E5BB7",
  blueD:     "#154695",
  green:     "#22A55C",
  wa:        "#25D366",
  waD:       "#128C7E",
  bg:        "#FBFAF5",
  bg2:       "#F4F1E8",
  paper:     "#FFFFFF",
  line:      "rgba(14,17,22,0.08)",
};

const WA_NUMBER = "919996465023";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

/* ── Shared primitives ───────────────────────────────────────────────── */

function Check() {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: 999, background: C.green,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: 11, fontWeight: 800, flexShrink: 0,
    }}>✓</span>
  );
}

interface CTAProps {
  kind?: "yellow" | "primary" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: string;
  sub?: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function CTA({ kind = "primary", size = "md", icon, sub, onClick, href, children, style }: CTAProps) {
  const pad = { sm: "10px 16px", md: "14px 22px", lg: "18px 26px", xl: "22px 32px" }[size];
  const fs  = { sm: 14, md: 15, lg: 17, xl: 19 }[size];
  const br  = { sm: 10, md: 12, lg: 14, xl: 16 }[size];

  const variants: Record<string, React.CSSProperties> = {
    primary:  { background: C.ink, color: "#fff", boxShadow: `0 5px 0 #000` },
    yellow:   { background: C.yellow, color: C.ink, boxShadow: `0 5px 0 ${C.yellowD}` },
    whatsapp: { background: C.wa, color: "#fff", boxShadow: `0 5px 0 ${C.waD}` },
    outline:  { background: "#fff", color: C.ink, border: `2px solid ${C.ink}` },
  };

  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: pad, fontSize: fs, borderRadius: br,
    fontWeight: 800, cursor: "pointer", border: "none",
    fontFamily: "inherit", letterSpacing: "-0.01em",
    transition: "transform .12s",
    ...variants[kind], ...style,
  };

  const inner = (
    <>
      {icon && <span style={{ fontSize: fs * 1.1 }}>{icon}</span>}
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1 }}>
        {children}
        {sub && <span style={{ fontSize: fs * 0.65, fontWeight: 600, opacity: 0.8, marginTop: 2 }}>{sub}</span>}
      </span>
    </>
  );

  if (href) return <Link to={href} style={{ ...base, textDecoration: "none" }}>{inner}</Link>;
  return <button style={base} onClick={onClick}>{inner}</button>;
}

function Stars({ n = 5 }: { n?: number }) {
  return <span style={{ color: C.yellowD, letterSpacing: 2, fontSize: 14 }}>{"★".repeat(n)}</span>;
}

/* ── Modal shell ─────────────────────────────────────────────────────── */
function ModalShell({ children, onClose, width = 540 }: { children: React.ReactNode; onClose: () => void; width?: number }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(14,17,22,.7)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width, maxWidth: "100%", background: C.paper,
        borderRadius: 24, padding: 32, position: "relative",
        border: `2.5px solid ${C.ink}`,
        boxShadow: `10px 10px 0 rgba(0,0,0,.35)`,
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          width: 32, height: 32, borderRadius: 999,
          background: C.bg2, border: `1.5px solid ${C.ink}`,
          fontSize: 18, cursor: "pointer",
        }}>×</button>
        {children}
      </div>
    </div>
  );
}

/* ── WhatsApp modal ──────────────────────────────────────────────────── */
function WhatsAppModal({ onClose }: { onClose: () => void }) {
  const [msg, setMsg] = useState("Hi Manisha! I saw the Summer Coding Camp. Can my kid try the free lesson?");
  const suggestions = [
    "I want the free first lesson.",
    "What time are the live classes?",
    "My kid is 10 — is this OK?",
    "Can I pay via UPI?",
  ];
  return (
    <ModalShell onClose={onClose} width={520}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: C.yellow,
          border: `2px solid ${C.ink}`, overflow: "hidden", flexShrink: 0,
        }}>
          <img src="/manisha.png" alt="Manisha Mam" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Manisha Mam</div>
          <div style={{ fontSize: 12, color: C.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: C.green, display: "inline-block" }}/>
            usually replies in &lt;1 hour
          </div>
        </div>
      </div>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} style={{
        width: "100%", padding: 14, fontSize: 14, borderRadius: 12,
        border: `2px solid ${C.ink}`, fontFamily: "inherit", lineHeight: 1.5,
        background: C.bg, resize: "vertical", minHeight: 90, boxSizing: "border-box",
      }}/>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => setMsg(s)} style={{
            background: C.bg2, padding: "6px 12px", borderRadius: 999,
            fontSize: 12, fontWeight: 600, color: C.ink2, border: `1.5px solid ${C.line}`,
            cursor: "pointer",
          }}>{s}</button>
        ))}
      </div>
      <button onClick={() => { window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, "_blank"); onClose(); }}
        style={{
          marginTop: 18, width: "100%", padding: "16px 20px",
          background: C.wa, color: "#fff", border: `2px solid ${C.ink}`,
          borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer",
          boxShadow: `0 4px 0 ${C.waD}`, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 10,
        }}>💬 Send on WhatsApp →</button>
      <p style={{ fontSize: 11, color: C.ink3, marginTop: 8, textAlign: "center" }}>
        Opens WhatsApp with your message pre-filled. You hit send. Done.
      </p>
    </ModalShell>
  );
}

/* ── Free lesson modal ───────────────────────────────────────────────── */
function FreeLessonModal({ onClose, openWA }: { onClose: () => void; openWA: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <div style={{ display: "inline-block", background: C.green, color: "#fff", padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
        No signup needed
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 8px", fontFamily: "'Fraunces', serif" }}>
        Day 1 is completely free.
      </h2>
      <p style={{ fontSize: 14, color: C.ink2, marginTop: 4, marginBottom: 20 }}>
        No login, no card, no email. Just click and start coding right now.
      </p>
      <Link to="/summer-camp/module/1" onClick={onClose} style={{
        display: "flex", alignItems: "center", gap: 14,
        background: C.yellow, color: C.ink, padding: "18px 22px",
        borderRadius: 14, border: `2px solid ${C.ink}`,
        boxShadow: `0 5px 0 ${C.yellowD}`,
        fontWeight: 800, fontSize: 17, textDecoration: "none", marginBottom: 12,
      }}>
        <span style={{ fontSize: 28 }}>🐍</span>
        <span>
          <span style={{ display: "block" }}>Day 1 — Hello, Python!</span>
          <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.7 }}>15 min · watch, read, code — all in one page</span>
        </span>
        <span style={{ marginLeft: "auto" }}>→</span>
      </Link>
      <div style={{
        marginTop: 16, padding: 14, background: C.bg2, borderRadius: 12,
        border: `1.5px dashed ${C.ink}`, display: "flex", justifyContent: "space-between",
        alignItems: "center", gap: 12,
      }}>
        <p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>Want Manisha to guide your kid personally?</p>
        <button onClick={() => { onClose(); openWA(); }} style={{
          background: C.wa, color: "#fff", padding: "10px 16px", borderRadius: 10,
          fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer",
        }}>💬 WhatsApp</button>
      </div>
    </ModalShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN PAGE
   ──────────────────────────────────────────────────────────────────── */

export default function SummerCamp() {
  const [modal, setModal] = useState<null | "free" | "wa">(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const mob = vw < 768;

  const openFree = () => setModal("free");
  const openWA   = () => setModal("wa");

  const lessons = [
    { n: 1,  t: "Hello, Python!",                      track: "P", kind: "F" },
    { n: 2,  t: "Strings & Numbers",                   track: "P", kind: "F" },
    { n: 3,  t: "Variables — give Python a memory",    track: "P", kind: "F" },
    { n: 4,  t: "Input & Making Decisions",             track: "P", kind: "F" },
    { n: 5,  t: "Loops — do it again!",                track: "P", kind: "F" },
    { n: 6,  t: "Lists & Collections",                 track: "P", kind: "F" },
    { n: 7,  t: "Functions — reusable code",           track: "P", kind: "F" },
    { n: 8,  t: "Project: Number-guessing game",       track: "P", kind: "Proj" },
    { n: 9,  t: "Project: Story generator",            track: "P", kind: "Proj" },
    { n: 10, t: "What is AI, really?",                 track: "A", kind: "F" },
    { n: 11, t: "Talking to AI — prompting",           track: "A", kind: "F" },
    { n: 12, t: "AI Safety & Ethics for Kids",         track: "A", kind: "F" },
    { n: 13, t: "Project: Homework helper chatbot",    track: "A", kind: "Proj" },
    { n: 14, t: "Project: AI Image Generator",         track: "A", kind: "Proj" },
    { n: 15, t: "Demo Day — show your family!",        track: "A", kind: "Proj" },
  ];

  const faq = [
    ["My kid has never coded before — is this right for them?",
     "Yes — this is built for first-timers. Day 1 starts at \"what is code?\" By Day 8 they ship their first game."],
    ["Is Day 1 really free? Do I need to sign up?",
     "Truly free. No signup, no card, no email. Click 'Start free lesson' and your kid is coding in 30 seconds. We ask for nothing until you're sure."],
    ["What does my child need to get started?",
     "Any laptop with Chrome. We provide the coding environment in-browser — no installs, no setup. Python runs right inside the lesson page."],
    ["How does the teacher track progress?",
     "Manisha has a live dashboard showing each student's quiz scores and completed modules. She also sends WhatsApp updates after live sessions."],
    ["Can I pay in INR?",
     "Yes — UPI, cards, or a WhatsApp invoice. Message Manisha and she'll send the right link in 2 minutes."],
    ["What if my kid doesn't enjoy it after the first week?",
     "Full refund, no questions, no forms. Just message Manisha. We can say that because almost nobody asks."],
  ];

  const sep = { borderRight: `1.5px solid ${C.ink}` };

  return (
    <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: C.bg, color: C.ink, overflowX: "hidden" }}>

      {/* ── Promo strip ─────────────────────────────────────────────── */}
      <div style={{
        background: C.ink, color: C.yellow,
        padding: "10px 24px", fontSize: 13, fontWeight: 600,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap",
      }}>
        <span>🎁 First lesson <strong style={{ color: "#fff" }}>FREE</strong> — no signup, no card. Just click &amp; start.</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ color: "#fff" }}>Summer 2026 · Batches: June 1, 8 &amp; 15</span>
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(251,250,245,.94)", backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.line}`,
      }}>
        <div style={{
          maxWidth: 1240, margin: "0 auto", padding: mob ? "12px 16px" : "14px 32px",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/lovable-uploads/96665488-c73d-4daf-a6f2-5dc7d468a820.png" alt="CodersBee" style={{ height: 32 }}/>
            <span style={{ fontWeight: 800, fontSize: mob ? 16 : 18, color: C.ink }}>
              Coders<span style={{ background: C.yellow, padding: "0 4px", borderRadius: 4 }}>Bee</span>
            </span>
          </Link>
          {!mob && (
            <nav style={{ marginLeft: "auto", display: "flex", gap: 28, fontSize: 14, fontWeight: 600, color: C.ink2 }}>
              {[["#what","What you'll build"],["#curriculum","15 lessons"],["#teacher","Meet Manisha"],["#faq","FAQ"]].map(([h,l]) => (
                <a key={h} href={h} style={{ color: C.ink2, textDecoration: "none" }}>{l}</a>
              ))}
            </nav>
          )}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: mob ? "auto" : undefined }}>
            <CTA kind="whatsapp" size="sm" icon="💬" onClick={openWA}>{mob ? "" : "WhatsApp"}</CTA>
            <CTA kind="primary" size="sm" onClick={openFree}>{mob ? "Free lesson →" : "Try free lesson →"}</CTA>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: mob ? "100px 20px 48px" : "136px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1.1fr 1fr", gap: mob ? 32 : 56, alignItems: "center" }}>
          {/* Left copy */}
          <div>
            <div style={{ marginBottom: 18, display: "flex", gap: 8 }}>
              <span style={{ background: "#fff", color: C.ink, border: `1px solid ${C.line}`, padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}>
                SUMMER 2026 · 15 DAYS · AGES 8–15
              </span>
              <span style={{ background: C.yellow, color: C.ink, padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
                🗓 Pick your start: June 1, 8 or 15
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Fraunces', serif", fontWeight: 900,
              fontSize: "clamp(60px, 7vw, 96px)", lineHeight: 0.93,
              letterSpacing: "-0.03em", marginBottom: 24,
            }}>
              SUMMER<br/>
              <span style={{ color: C.yellowD, WebkitTextStroke: `2px ${C.ink}` } as React.CSSProperties}>
                CODING CAMP
              </span>
            </h1>

            <p style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.35, marginBottom: 14, maxWidth: 520 }}>
              Build. Create. Think. With <strong style={{ color: C.blue }}>Python</strong> & <strong style={{ color: C.green }}>AI</strong>.
            </p>
            <p style={{ fontSize: 15, color: C.ink2, marginBottom: 28, maxWidth: 500 }}>
              15 lessons · self-paced + 2× live with Manisha · WhatsApp support · ages 8–15
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <CTA kind="yellow" size="xl" icon="▶" sub="No signup · no card" onClick={openFree}>
                Start free lesson
              </CTA>
              <CTA kind="whatsapp" size="xl" icon="💬" sub="Reply in &lt; 1 hour" onClick={openWA}>
                WhatsApp Manisha
              </CTA>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24, fontSize: 13, color: C.ink2, flexWrap: "wrap" }}>
              {["No signup required", "Live + self-paced", "Money-back guarantee"].map(t => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Check/>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — code window (hidden on mobile) */}
          {!mob && <div style={{ position: "relative", height: 560 }}>
            <div style={{
              position: "absolute", top: 30, right: 0, left: 10,
              background: "#fff", borderRadius: 18,
              border: `2.5px solid ${C.ink}`,
              boxShadow: `10px 10px 0 ${C.ink}`,
              overflow: "hidden",
            }}>
              <div style={{ background: C.ink, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                {["#FF5F57", C.yellow, C.green].map(c => (
                  <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }}/>
                ))}
                <span style={{ marginLeft: 10, fontSize: 12, color: "#FFEFC2", fontFamily: "'JetBrains Mono',monospace" }}>
                  lesson-13 — homework-helper.py · Aanya, 11
                </span>
              </div>
              <div style={{ padding: "20px 22px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
                <div style={{ color: C.ink3 }}># my AI homework helper</div>
                <div><span style={{ color: C.blue }}>from</span> codersbee <span style={{ color: C.blue }}>import</span> ai</div>
                <div style={{ marginTop: 6 }}>tutor = ai.chat(role=<span style={{ color: C.green }}>"kind maths teacher"</span>)</div>
                <div>tutor.ask(<span style={{ color: C.green }}>"What is 7 × 8?"</span>)</div>
                <div style={{ marginTop: 10, padding: "8px 10px", background: C.bg2, borderRadius: 8, borderLeft: `3px solid ${C.green}` }}>
                  <div style={{ color: C.green, fontWeight: 600 }}>&gt; 56!</div>
                  <div style={{ color: C.ink2 }}>&gt; Think of it as 7 + 7 eight times. Want me to show you?</div>
                </div>
                <div style={{ marginTop: 12, color: C.ink3 }}># shipped on Day 13 🎉</div>
              </div>
            </div>

            {/* floating sticker */}
            <div style={{
              position: "absolute", top: 0, left: 0, zIndex: 2,
              background: C.yellow, color: C.ink, padding: "7px 13px",
              borderRadius: 999, border: `2px solid ${C.ink}`,
              fontSize: 12, fontWeight: 800, transform: "rotate(-3deg)",
              boxShadow: "0 6px 14px -4px rgba(0,0,0,.2)",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: C.green, display: "inline-block" }}/>
              Real student · lesson 13
            </div>

            {/* floating chips — sit below the code window in a tidy row */}
            <div style={{
              position: "absolute", bottom: 16, left: 0, right: 0,
              display: "flex", gap: 10, justifyContent: "flex-start", flexWrap: "wrap",
              padding: "0 10px",
            }}>
              <div style={{
                background: C.blue, color: "#fff", padding: "10px 15px", borderRadius: 12,
                fontWeight: 700, fontSize: 13, transform: "rotate(-3deg)",
                border: `2px solid ${C.ink}`, boxShadow: "0 8px 18px -6px rgba(30,91,183,.4)",
                animation: "float 4s ease-in-out infinite", whiteSpace: "nowrap",
              }}>🐍 Python · 9 lessons</div>
              <div style={{
                background: C.green, color: "#fff", padding: "10px 15px", borderRadius: 12,
                fontWeight: 700, fontSize: 13, transform: "rotate(3deg)",
                border: `2px solid ${C.ink}`, boxShadow: "0 8px 18px -6px rgba(34,165,92,.4)",
                animation: "float 4.5s ease-in-out infinite", whiteSpace: "nowrap",
              }}>🤖 AI · 6 lessons</div>
              <div style={{
                background: "#fff", color: C.ink, padding: "10px 13px", borderRadius: 12,
                fontWeight: 700, fontSize: 12, transform: "rotate(-1.5deg)",
                border: `2px solid ${C.ink}`,
                display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
              }}>
                <img src="/manisha.png" alt="" style={{ width: 24, height: 24, borderRadius: 999, objectFit: "cover" }}/>
                Manisha reviews every project
              </div>
            </div>
          </div>}
        </div>

        {/* Trust strip */}
        <div style={{
          marginTop: mob ? 36 : 64, display: "grid",
          gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
          border: `1.5px solid ${C.ink}`, borderRadius: 18, overflow: "hidden",
          background: C.paper,
        }}>
          {[
            { big: "15",    sm: "lessons · project + quiz after each" },
            { big: "5.0★",  sm: "rated by 1,000+ students · Manisha" },
            { big: "2×/wk", sm: "live sessions + self-paced anytime" },
            { big: "Free",  sm: "Day 1 — no signup, no card" },
            { big: "June",  sm: "batches: 1st, 8th & 15th · 2026" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: mob ? "14px 16px" : "20px 22px",
              borderRight: mob ? (i % 2 === 0 ? `1.5px solid ${C.ink}` : "none") : (i < 4 ? `1.5px solid ${C.ink}` : "none"),
              borderBottom: mob && i < 4 ? `1.5px solid ${C.ink}` : "none",
              background: i === 1 ? C.yellow : C.paper,
            }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: mob ? 26 : 34, fontWeight: 900, lineHeight: 1 }}>{s.big}</div>
              <div style={{ fontSize: 11, color: C.ink2, marginTop: 5, lineHeight: 1.4 }}>{s.sm}</div>
            </div>
          ))}
        </div>

        {/* Decorative blobs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,#FFC72C55,transparent 70%)" }}/>
          <div style={{ position: "absolute", bottom: 80, left: -100, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,#1E5BB722,transparent 70%)" }}/>
        </div>
      </section>

      {/* ── Perfect Combo ───────────────────────────────────────────── */}
      <section style={{ padding: mob ? "56px 20px" : "88px 32px", background: C.bg2 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              The CodersBee Difference
            </span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(40px,5vw,62px)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
              Self-paced freedom <em style={{ fontStyle: "normal", color: C.yellowD }}>+</em> real teacher.
            </h2>
            <p style={{ fontSize: 17, color: C.ink2, marginTop: 14, maxWidth: 580, margin: "14px auto 0", lineHeight: 1.5 }}>
              Most online courses are one or the other. This camp is both — and that's why kids stick with it.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 16 : 24 }}>
            {[
              { icon: "🎬", color: C.blue,  t: "Self-paced lessons",        d: "Watch, read, code — all in one page. No installing anything. Replay anything anytime." },
              { icon: "👩‍🏫", color: C.green, t: "Live with Manisha · 2×/wk", d: "Two small-group sessions every week. Same teacher, same kids — they actually know each other by week 2." },
              { icon: "💬", color: C.wa,    t: "WhatsApp support",           d: "Stuck at 9pm? Send a photo of the screen. Manisha replies fast — usually within an hour." },
            ].map((it, i) => (
              <div key={i} style={{
                background: C.paper, borderRadius: 22, border: `2px solid ${C.ink}`,
                padding: 28, boxShadow: `8px 8px 0 ${C.ink}`,
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 14, background: it.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30, border: `2px solid ${C.ink}`,
                }}>{it.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{it.t}</h3>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.55, margin: 0 }}>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A typical day ───────────────────────────────────────────── */}
      <section style={{ padding: mob ? "48px 20px" : "88px 32px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: C.paper, border: `2px solid ${C.ink}`, borderRadius: 28, padding: mob ? "32px 24px" : "48px 48px", boxShadow: `8px 8px 0 ${C.ink}` }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: mob ? 28 : 36, fontWeight: 900, textAlign: "center", marginBottom: 28, letterSpacing: "-0.02em" }}>
            A typical camp day 👇
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: mob ? 20 : 8, textAlign: "center" }}>
            {[
              { emoji: "🎬", step: "Watch",  desc: "Short intro video to set the scene" },
              { emoji: "📖", step: "Read",   desc: "Go through the lesson at your own pace" },
              { emoji: "💻", step: "Code",   desc: "3 challenges with AI help — right in the browser" },
              { emoji: "📝", step: "Quiz",   desc: "10-question quiz — teacher sees your score" },
            ].map(({ emoji, step, desc }, i) => (
              <div key={step} style={{ position: "relative" }}>
                <div style={{
                  width: 56, height: 56, background: C.bg2, borderRadius: 16,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, margin: "0 auto 12px", border: `2px solid ${C.ink}`,
                }}>{emoji}</div>
                {i < 3 && <span style={{
                  position: "absolute", right: -10, top: 18,
                  fontSize: 18, color: C.ink3,
                }}>›</span>}
                <div style={{ fontWeight: 800, marginBottom: 4 }}>{step}</div>
                <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you'll build ───────────────────────────────────────── */}
      <section id="what" style={{ padding: mob ? "48px 20px" : "88px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <div>
              <span style={{ display: "inline-block", background: C.yellow, color: C.ink, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
                What your kid will actually build
              </span>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
                By the end, they'll have shipped<br/>5 real projects.
              </h2>
            </div>
            <p style={{ fontSize: 15, color: C.ink2, maxWidth: 340, lineHeight: 1.55 }}>
              Not theory. Not slides. Real code they run, break, fix, and show you at dinner.
            </p>
          </div>

          <div style={{ display: mob ? "flex" : "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, overflowX: mob ? "auto" : "visible", paddingBottom: mob ? 8 : 0 }}>
            {/* Project 1 — Number-guessing game */}
            {([
              {
                tag: "Python · Day 8", t: "Number-guessing game",
                d: "Variables, loops, randomness. The first thing they can show their family.",
                preview: (
                  <div style={{ height: 110, borderRadius: 10, background: "#0D1117", border: `2px solid ${C.ink}`, padding: "10px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, lineHeight: 1.6, overflow: "hidden" }}>
                    <div style={{ color: "#8B949E" }}>Guess a number 1–100:</div>
                    <div style={{ color: "#79C0FF" }}>&gt; 42</div>
                    <div style={{ color: "#FF7B72" }}>↑ too low</div>
                    <div style={{ color: "#79C0FF" }}>&gt; 73</div>
                    <div style={{ color: "#3FB950" }}>🎉 you got it!</div>
                  </div>
                ),
              },
              {
                tag: "Python · Day 9", t: "Story generator",
                d: "Mad-libs style — lists, input, string formatting. Hilarious every run.",
                preview: (
                  <div style={{ height: 110, borderRadius: 10, background: "#3B2F8F", border: `2px solid ${C.ink}`, padding: "10px 12px", fontSize: 11, lineHeight: 1.7, overflow: "hidden" }}>
                    <div style={{ color: "#fff" }}>The <span style={{ background: C.yellow, color: C.ink, borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>purple</span> cat ate a</div>
                    <div style={{ color: "#fff" }}><span style={{ background: C.yellow, color: C.ink, borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>taco</span> and flew to <span style={{ background: C.blue, color: "#fff", borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>Mars</span>.</div>
                    <div style={{ color: "#fff", marginTop: 4 }}>It said <span style={{ background: C.green, color: "#fff", borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>"meowza!"</span></div>
                  </div>
                ),
              },
              {
                tag: "AI · Day 13", t: "Homework helper chatbot",
                d: "Prompts, system roles, safety rails. Kid-built, kid-tested.",
                preview: (
                  <div style={{ height: 110, borderRadius: 10, background: "#1A5C3A", border: `2px solid ${C.ink}`, padding: "10px 12px", fontSize: 11, lineHeight: 1.5, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
                    <div style={{ background: "rgba(255,255,255,.15)", color: "#fff", padding: "5px 8px", borderRadius: "8px 8px 8px 2px", maxWidth: "80%" }}>What's a fraction, simply?</div>
                    <div style={{ background: C.yellow, color: C.ink, padding: "5px 8px", borderRadius: "8px 8px 2px 8px", maxWidth: "90%", alignSelf: "flex-end", fontWeight: 600, fontSize: 10 }}>🍕 1/4 = one of four slices. It's a slice of a whole!</div>
                  </div>
                ),
              },
              {
                tag: "AI · Day 14", t: "AI image generator",
                d: "Type a description, get an image. They see AI create something from words.",
                preview: (
                  <div style={{ height: 110, borderRadius: 10, background: "#2C7A4B", border: `2px solid ${C.ink}`, padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, overflow: "hidden" }}>
                    <div style={{ fontSize: 36 }}>🐕</div>
                    <div style={{ background: "rgba(255,255,255,.2)", color: "#fff", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontFamily: "'JetBrains Mono',monospace", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontWeight: 700, color: C.yellow }}>PREDICTION</span> dog · 94%
                    </div>
                  </div>
                ),
              },
              {
                tag: "Day 15", t: "Demo Day — their choice",
                d: "Design and build their own original AI app. Then demo it to family.",
                preview: (
                  <div style={{ height: 110, borderRadius: 10, background: C.yellow, border: `2px solid ${C.ink}`, padding: "10px 12px", overflow: "hidden" }}>
                    <div style={{ background: C.ink, borderRadius: 8, padding: "6px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: C.yellow, fontSize: 10, fontWeight: 700 }}>✦ Study Buddy</span>
                        <span style={{ color: "#555", fontSize: 9 }}>by Aanya · v1</span>
                        <span style={{ background: C.green, color: "#fff", padding: "2px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700 }}>● live</span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["quiz me", "explain"].map(btn => (
                          <span key={btn} style={{ background: "rgba(255,255,255,.1)", color: "#ccc", padding: "3px 8px", borderRadius: 4, fontSize: 9 }}>{btn}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
            ] as Array<{ tag: string; t: string; d: string; preview: React.ReactNode }>).map((p, i) => (
              <div key={i} style={{
                background: C.paper, borderRadius: 16, border: `2px solid ${C.ink}`,
                padding: 18, display: "flex", flexDirection: "column", gap: 10, minHeight: 280,
                minWidth: mob ? 240 : "auto", flexShrink: mob ? 0 : undefined,
              }}>
                {p.preview}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.ink3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.tag}</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, lineHeight: 1.25 }}>{p.t}</h3>
                <p style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5, margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ──────────────────────────────────────────────── */}
      <section id="curriculum" style={{ padding: mob ? "56px 20px" : "88px 32px", background: C.ink, color: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <span style={{ display: "inline-block", background: C.yellow, color: C.ink, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
                The 15-lesson journey
              </span>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, margin: 0, color: "#fff", letterSpacing: "-0.02em" }}>
                From <em style={{ fontStyle: "normal", color: C.yellow }}>print("hi")</em> to a working AI app.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", maxWidth: 340, lineHeight: 1.55 }}>
              Each lesson: short video + read + 3 coding challenges + 10-question quiz. Live sessions 2× a week with Manisha.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 10 }}>
            {lessons.map(l => (
              <Link key={l.n} to={`/summer-camp/module/${l.n}`} style={{
                padding: "14px 18px", borderRadius: 12, textDecoration: "none",
                background: l.kind === "Proj" ? C.yellow : "rgba(255,255,255,.06)",
                color: l.kind === "Proj" ? C.ink : "#fff",
                border: `1px solid ${l.kind === "Proj" ? C.yellow : "rgba(255,255,255,.12)"}`,
                display: "flex", alignItems: "center", gap: 12,
                transition: "opacity .15s",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: l.kind === "Proj" ? C.ink : "rgba(255,255,255,.12)",
                  color: l.kind === "Proj" ? C.yellow : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700,
                }}>{String(l.n).padStart(2, "0")}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{l.t}</div>
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
                    {l.track === "P" ? "PYTHON" : "AI"} · {l.kind === "Proj" ? "PROJECT" : "LESSON"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <CTA kind="yellow" size="md" onClick={openFree} icon="▶">Try Day 1 free — no signup needed</CTA>
          </div>
        </div>
      </section>

      {/* ── Batch Picker ────────────────────────────────────────────── */}
      <section style={{ padding: mob ? "48px 20px" : "72px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", background: C.yellow, color: C.ink, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              3 batches · limited seats each
            </span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              Pick your start date.
            </h2>
            <p style={{ fontSize: 16, color: C.ink2, marginTop: 12 }}>
              Same curriculum, same teacher — just pick what fits your summer.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {[
              { date: "June 1",  day: "Sunday",   urgency: "⚡ Filling fast", urgencyColor: "#E05C00", badge: "Earliest batch", badgeBg: C.yellow },
              { date: "June 8",  day: "Sunday",   urgency: "✅ Spots open",    urgencyColor: C.green,   badge: "Most popular",  badgeBg: C.green },
              { date: "June 15", day: "Sunday",   urgency: "✅ Spots open",    urgencyColor: C.green,   badge: "Last batch",    badgeBg: C.ink },
            ].map(({ date, day, urgency, urgencyColor, badge, badgeBg }) => (
              <div key={date} style={{
                background: C.paper, border: `2.5px solid ${C.ink}`,
                borderRadius: 22, padding: "32px 28px",
                boxShadow: `8px 8px 0 ${C.ink}`,
                display: "flex", flexDirection: "column", gap: 16,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -14, left: 24,
                  background: badgeBg, color: badgeBg === C.yellow ? C.ink : "#fff",
                  padding: "4px 12px", borderRadius: 999,
                  fontSize: 11, fontWeight: 700, border: `2px solid ${C.ink}`,
                }}>{badge}</div>

                <div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>{date}</div>
                  <div style={{ fontSize: 13, color: C.ink3, marginTop: 4 }}>{day} · 2026</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: urgencyColor }}>
                  {urgency}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.ink2 }}>
                  {["15 self-paced lessons", "2× live sessions / week", "WhatsApp support"].map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Check/>{f}
                    </li>
                  ))}
                </ul>

                <button onClick={openWA} style={{
                  marginTop: "auto", width: "100%", padding: "14px 18px",
                  background: C.wa, color: "#fff", border: `2px solid ${C.ink}`,
                  borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
                  boxShadow: `0 4px 0 ${C.waD}`,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  💬 Reserve a spot for {date}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Manisha ────────────────────────────────────────────── */}
      <section id="teacher" style={{ padding: mob ? "48px 20px" : "88px 32px" }}>
        <div style={{
          maxWidth: 1160, margin: "0 auto",
          background: C.paper, border: `2px solid ${C.ink}`,
          borderRadius: 30, padding: mob ? "32px 24px" : "52px 52px",
          boxShadow: `10px 10px 0 ${C.ink}`,
          display: "grid", gridTemplateColumns: mob ? "1fr" : "300px 1fr", gap: mob ? 28 : 48, alignItems: "center",
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 260, height: 260, borderRadius: "50%",
              background: C.yellow, border: `3px solid ${C.ink}`,
              boxShadow: `6px 6px 0 ${C.ink}`,
              overflow: "hidden",
            }}>
              <img src="/manisha.png" alt="Manisha Mam" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div style={{
              position: "absolute", bottom: -8, left: -8,
              background: C.green, color: "#fff", padding: "8px 14px",
              borderRadius: 999, border: `2px solid ${C.ink}`,
              fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fff", display: "inline-block" }}/>
              Online now
            </div>
            <div style={{
              position: "absolute", top: -8, right: 0,
              background: C.yellow, color: C.ink, padding: "8px 14px",
              borderRadius: 999, border: `2px solid ${C.ink}`,
              fontSize: 12, fontWeight: 800, transform: "rotate(6deg)",
            }}>★ 5.0 / 5</div>
          </div>

          <div>
            <span style={{ display: "inline-block", background: C.blue, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              Your kid's teacher
            </span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 50, fontWeight: 900, margin: "0 0 12px", lineHeight: 1 }}>
              Meet Manisha Mam.
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Stars n={5}/>
              <span style={{ fontWeight: 700 }}>5.0 / 5</span>
              <span style={{ color: C.ink2, fontSize: 14 }}>· loved by 1,000+ students</span>
            </div>
            <blockquote style={{
              margin: "0 0 24px", padding: "18px 22px",
              background: C.bg2, borderLeft: `4px solid ${C.yellowD}`,
              borderRadius: 12, fontSize: 18, lineHeight: 1.45, fontWeight: 500,
            }}>
              "AI is shaping the future, and every child deserves the chance to <strong style={{ color: C.blue }}>understand it</strong>, <strong style={{ color: C.green }}>create with it</strong>, and lead with confidence."
              <footer style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: C.ink2 }}>— Manisha Mam</footer>
            </blockquote>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <CTA kind="whatsapp" size="lg" icon="💬" onClick={openWA}>Say hi on WhatsApp</CTA>
              <CTA kind="outline" size="lg" onClick={openFree}>Try the free lesson →</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parent dashboard preview ─────────────────────────────────── */}
      <section style={{ padding: mob ? "48px 20px" : "88px 32px", background: C.bg2 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.2fr", gap: mob ? 32 : 56, alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>For parents</span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              See what they're learning — every week.
            </h2>
            <p style={{ fontSize: 16, color: C.ink2, lineHeight: 1.55, marginBottom: 24 }}>
              Manisha tracks each student's quiz scores and completed modules in a live dashboard. You'll know exactly where your child is at.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {[
                ["📊", "Module completion & quiz scores"],
                ["🎯", "What they built each week"],
                ["📝", "Teacher notes after each live class"],
                ["🔔", "WhatsApp updates — no app required"],
              ].map(([ico, txt]) => (
                <li key={txt} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15 }}>
                  <span style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: C.paper, border: `2px solid ${C.ink}`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
                  }}>{ico}</span>
                  {txt}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard mock */}
          <div style={{ background: C.paper, borderRadius: 18, border: `2px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}`, overflow: "hidden" }}>
            <div style={{ padding: "11px 15px", background: C.ink, color: "#fff", display: "flex", alignItems: "center", gap: 7 }}>
              {["#FF5F57", C.yellow, C.green].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }}/>)}
              <span style={{ marginLeft: 8, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>codersbee.com/summer-camp/teacher</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.ink3 }}>WEEK 3 OF 3</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900 }}>Arjun is on lesson 8/15</div>
                </div>
                <Stars/>
              </div>
              <div style={{ height: 9, background: C.bg2, borderRadius: 999, overflow: "hidden", marginBottom: 22 }}>
                <div style={{ width: "53%", height: "100%", background: `linear-gradient(90deg, ${C.yellow}, ${C.yellowD})` }}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
                {[{ v: "8/15", l: "lessons done", c: C.blue }, { v: "2", l: "projects shipped", c: C.green }, { v: "9/10", l: "quiz avg", c: C.yellowD }].map(s => (
                  <div key={s.l} style={{ padding: 12, borderRadius: 10, border: `1.5px solid ${C.ink}`, background: "#fff" }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900, color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: C.ink2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 14, borderRadius: 10, background: C.bg2, border: `1.5px dashed ${C.ink}`, fontSize: 13, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <img src="/manisha.png" alt="" style={{ width: 22, height: 22, borderRadius: 999, objectFit: "cover" }}/>
                  Manisha · 2 days ago
                </div>
                "Arjun nailed loops this week! He rebuilt the number-guess game with three difficulty levels — totally his own idea. Pushing him into functions next."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section style={{ padding: mob ? "48px 20px" : "88px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>Parents talking</span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              Specific things they say after week 3.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 18 }}>
            {[
              { q: "Aarav was glued to YouTube before. Now he's glued to his code editor. Worth every rupee for the screen-time pivot alone.", n: "Priya M.", r: "parent · Aarav, 10", loc: "Bengaluru" },
              { q: "Manisha Mam knows my daughter by name. She sends me a WhatsApp note after every session. Magical for an online course.", n: "Rohan S.", r: "parent · Anaya, 12", loc: "Mumbai" },
              { q: "My son built a chatbot to help with his maths homework. I had words with him — but I was also kind of impressed.", n: "Sarah K.", r: "parent · Theo, 13", loc: "London" },
            ].map((r, i) => (
              <blockquote key={i} style={{
                margin: 0, background: C.paper, padding: 26, borderRadius: 18,
                border: `2px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                <Stars/>
                <p style={{ fontSize: 16, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>"{r.q}"</p>
                <footer style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: `1px dashed ${C.line}` }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 999,
                    background: [C.yellow, C.blue, C.green][i],
                    color: [C.ink, "#fff", "#fff"][i],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, border: `2px solid ${C.ink}`, flexShrink: 0,
                  }}>{r.n[0]}</div>
                  <div style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 700 }}>{r.n}</div>
                    <div style={{ color: C.ink2 }}>{r.r} · {r.loc}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: mob ? "48px 20px" : "88px 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <span style={{ display: "inline-block", background: C.yellow, color: C.ink, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>Parent questions</span>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: "0 0 36px", letterSpacing: "-0.02em" }}>
            What parents ask before clicking enroll.
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {faq.map(([q, a], i) => (
              <div key={i} style={{ background: C.paper, borderRadius: 14, border: `2px solid ${C.ink}`, overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} style={{
                  width: "100%", textAlign: "left", padding: "18px 22px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontSize: 16, fontWeight: 700, cursor: "pointer",
                  background: "none", border: "none", fontFamily: "inherit",
                }}>
                  {q}
                  <span style={{ fontSize: 22, color: C.ink2, flexShrink: 0, marginLeft: 16 }}>{faqOpen === i ? "−" : "+"}</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 22px 18px", fontSize: 15, color: C.ink2, lineHeight: 1.6 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: mob ? "40px 20px 48px" : "88px 32px 64px" }}>
        <div style={{
          maxWidth: 1060, margin: "0 auto",
          background: C.yellow, border: `3px solid ${C.ink}`,
          borderRadius: 30, padding: mob ? "36px 24px" : "64px 52px",
          position: "relative", overflow: "hidden",
          boxShadow: `14px 14px 0 ${C.ink}`,
        }}>
          <div aria-hidden style={{ position: "absolute", right: -30, bottom: -30, fontSize: 200, opacity: 0.12, lineHeight: 1, transform: "rotate(-15deg)" }}>🐝</div>
          <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>Last thing.</span>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(42px,6vw,68px)", fontWeight: 900, margin: "0 0 20px", maxWidth: 720, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
            Just try the first lesson.<br/>
            <em style={{ fontStyle: "normal", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: C.ink, textUnderlineOffset: 10 } as React.CSSProperties}>
              That's all we're asking.
            </em>
          </h2>
          <p style={{ fontSize: 18, maxWidth: 560, lineHeight: 1.5, marginBottom: 36, opacity: 0.85 }}>
            No signup. No card. No email. If your kid loves it, enroll. If they don't, you've lost 45 minutes — and gained a fun afternoon.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <CTA kind="primary" size="xl" icon="▶" sub="No signup needed" onClick={openFree}>Start free lesson now</CTA>
            <CTA kind="whatsapp" size="xl" icon="💬" sub="Talk to a human first" onClick={openWA}>WhatsApp Manisha</CTA>
          </div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>🗓 Pick your start date:</span>
            {["June 1", "June 8", "June 15"].map((d, i) => (
              <button key={d} onClick={openWA} style={{
                background: i === 0 ? C.ink : "rgba(14,17,22,.12)",
                color: i === 0 ? "#fff" : C.ink,
                border: `2px solid ${C.ink}`,
                padding: "8px 16px", borderRadius: 999,
                fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>{d}</button>
            ))}
            <span style={{ fontSize: 12, opacity: 0.6 }}>· limited seats per batch</span>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ background: C.ink, color: "rgba(255,255,255,.75)", padding: mob ? "40px 20px 24px" : "48px 32px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: mob ? 28 : 40 }}>
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <img src="/lovable-uploads/96665488-c73d-4daf-a6f2-5dc7d468a820.png" alt="" style={{ height: 32 }}/>
              <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>
                Coders<span style={{ background: C.yellow, color: C.ink, padding: "0 4px", borderRadius: 4 }}>Bee</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, marginTop: 14, maxWidth: 300, lineHeight: 1.6, opacity: 0.75 }}>
              Live + self-paced coding for kids 8–15. Built around a real teacher who actually knows your kid's name.
            </p>
          </div>
          {[
            ["Camp", ["Day 1 — free lesson", "15 lessons", "Meet Manisha", "How it works"]],
            ["Help", ["FAQ", "WhatsApp Manisha", "Login", "Refund policy"]],
            ["CodersBee", ["About us", "All courses", "Contact", "Privacy"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 13, marginBottom: 14 }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, fontSize: 13 }}>
                {(items as string[]).map(it => <li key={it} style={{ opacity: 0.65 }}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1160, margin: "28px auto 0", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.45, flexWrap: "wrap", gap: 8 }}>
          <span>© 2025 CodersBee</span>
          <Link to="/summer-camp/login" style={{ color: "inherit", textDecoration: "none" }}>Teacher / Student Login</Link>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ─────────────────────────────────── */}
      <button onClick={openWA} style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 30,
        width: 60, height: 60, borderRadius: "50%",
        background: C.wa, color: "#fff", border: `3px solid ${C.ink}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, cursor: "pointer",
        boxShadow: "0 10px 28px -6px rgba(37,211,102,.55)",
        animation: "wa-pulse 2.2s infinite",
      }} title="Chat with Manisha on WhatsApp">
        💬
      </button>

      {/* ── CSS animations ───────────────────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0) rotate(var(--r,0deg))}
          50%{transform:translateY(-7px) rotate(var(--r,0deg))}
        }
        @keyframes wa-pulse {
          0%{box-shadow:0 0 0 0 rgba(37,211,102,.55)}
          70%{box-shadow:0 0 0 14px rgba(37,211,102,0)}
          100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}
        }
      `}</style>

      {/* ── Modals ───────────────────────────────────────────────────── */}
      {modal === "free" && <FreeLessonModal onClose={() => setModal(null)} openWA={openWA}/>}
      {modal === "wa"   && <WhatsAppModal   onClose={() => setModal(null)}/>}
    </div>
  );
}
