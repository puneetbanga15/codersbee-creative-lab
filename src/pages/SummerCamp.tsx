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

/* ── Enroll modal ────────────────────────────────────────────────────── */
function EnrollModal({ onClose, defaultBatch = "June 7" }: { onClose: () => void; defaultBatch?: string }) {
  const [parentName, setParentName] = useState("");
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const [childName,  setChildName]  = useState("");
  const [childAge,   setChildAge]   = useState("");
  const [batch,      setBatch]      = useState(defaultBatch);

  const isValid = parentName.trim() && email.trim() && phone.trim() && childName.trim() && childAge.trim();

  const handleSubmit = () => {
    const msg = [
      `Hi Manisha! I'd like to enroll my child in the Python & AI Summer Camp 🎉`,
      ``,
      `👨‍👩‍👧 Parent : ${parentName}`,
      `📧 Email  : ${email}`,
      `📱 Phone  : ${phone}`,
      ``,
      `👦 Child  : ${childName}, Age ${childAge}`,
      `📅 Batch  : ${batch} 2026`,
      ``,
      `Please share payment details and login credentials. Thank you!`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 10,
    border: `2px solid ${C.line}`, fontFamily: "inherit", background: C.bg,
    boxSizing: "border-box" as const, outline: "none",
    transition: "border-color .15s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: C.ink2, marginBottom: 5, display: "block",
  };

  return (
    <ModalShell onClose={onClose} width={520}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: C.yellow,
          border: `2px solid ${C.ink}`, overflow: "hidden", flexShrink: 0,
        }}>
          <img src="/manisha.png" alt="Manisha" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Enroll in Summer Camp 🎉</div>
          <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>Manisha replies within a few hours with payment link + login</div>
        </div>
      </div>

      {/* Parent section */}
      <div style={{ background: C.bg2, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.ink3, letterSpacing: "0.05em", marginBottom: 12 }}>PARENT DETAILS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input value={parentName} onChange={e => setParentName(e.target.value)}
              placeholder="e.g. Priya Sharma" style={fieldStyle}/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" style={fieldStyle}/>
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number *</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210" style={fieldStyle}/>
            </div>
          </div>
        </div>
      </div>

      {/* Child section */}
      <div style={{ background: C.bg2, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.ink3, letterSpacing: "0.05em", marginBottom: 12 }}>CHILD DETAILS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={labelStyle}>Child's Name *</label>
            <input value={childName} onChange={e => setChildName(e.target.value)}
              placeholder="e.g. Arjun" style={fieldStyle}/>
          </div>
          <div>
            <label style={labelStyle}>Age *</label>
            <input type="number" min="8" max="15" value={childAge} onChange={e => setChildAge(e.target.value)}
              placeholder="8 – 15" style={fieldStyle}/>
          </div>
        </div>
      </div>

      {/* Batch selection */}
      <div style={{ background: C.bg2, borderRadius: 12, padding: "14px 16px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.ink3, letterSpacing: "0.05em", marginBottom: 12 }}>CHOOSE BATCH</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {/* June 1 — FULL */}
          <div style={{
            padding: "12px 10px", borderRadius: 10, textAlign: "center",
            background: "#F5F5F5", border: `2px solid ${C.line}`,
            opacity: 0.55, cursor: "not-allowed",
          }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.ink3 }}>June 1</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E05C00", marginTop: 4 }}>🔴 FULL</div>
          </div>
          {/* June 7 */}
          {["June 7", "June 15"].map(b => (
            <button key={b} onClick={() => setBatch(b)} style={{
              padding: "12px 10px", borderRadius: 10, textAlign: "center",
              background: batch === b ? C.yellow : C.paper,
              border: `2px solid ${batch === b ? C.ink : C.line}`,
              boxShadow: batch === b ? `3px 3px 0 ${C.ink}` : "none",
              cursor: "pointer", fontFamily: "inherit",
              transition: "all .15s",
            }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.ink }}>{b}</div>
              <div style={{ fontSize: 11, color: C.ink3, marginTop: 4 }}>
                {b === "June 7" ? "5 seats left" : "8 seats left"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={!isValid} style={{
        width: "100%", padding: "16px 20px",
        background: isValid ? C.wa : C.line,
        color: isValid ? "#fff" : C.ink3,
        border: `2px solid ${isValid ? C.ink : C.line}`,
        borderRadius: 12, fontWeight: 800, fontSize: 16,
        cursor: isValid ? "pointer" : "not-allowed",
        boxShadow: isValid ? `0 4px 0 ${C.waD}` : "none",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        transition: "all .15s",
      }}>
        💬 Send Enrollment to Manisha →
      </button>
      <p style={{ fontSize: 11, color: C.ink3, marginTop: 8, textAlign: "center" }}>
        Opens WhatsApp with your details pre-filled. You hit send. Manisha replies with payment link + login.
      </p>
    </ModalShell>
  );
}

/* ── WhatsApp modal ──────────────────────────────────────────────────── */
function WhatsAppModal({ onClose }: { onClose: () => void }) {
  const [msg, setMsg] = useState("Hi Manisha! My kid tried Day 1 of the Summer Coding Camp and loved it. Can we get the 7-day free trial?");
  const suggestions = [
    "We'd like the 7-day free trial please!",
    "I want the free first lesson.",
    "What time are the live classes?",
    "My kid is 10 — is this OK?",
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
  const [modal, setModal] = useState<null | "free" | "wa" | "enroll">(null);
  const [enrollBatch, setEnrollBatch] = useState("June 7");
  const [faqOpen, setFaqOpen] = useState<number>(-1);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [dayExpanded, setDayExpanded] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const mob = vw < 768;

  const openFree   = () => setModal("free");
  const openWA     = () => setModal("wa");
  const openEnroll = (batch = "June 7") => { setEnrollBatch(batch); setModal("enroll"); };
  // Direct, one-tap trial: opens WhatsApp pre-filled with the trial request —
  // no manual "ask for the trial" step for the parent.
  const openTrial  = () => {
    const msg = "Hi Manisha! My kid finished Day 1 of the Summer Coding Camp 🎉 We'd like to start the 7-day FREE trial — full access to all 15 lessons + challenges. Please send our login credentials. Thank you!";
    window.open(`${WA_URL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const lessons = [
    { n: 1,   t: "Hello, Python!",                      track: "P", kind: "F" },
    { n: 2,   t: "Strings & Numbers",                   track: "P", kind: "F" },
    { n: 3,   t: "Variables — give Python a memory",    track: "P", kind: "F" },
    { n: 4,   t: "Input & Making Decisions",             track: "P", kind: "F" },
    { n: 5,   t: "Loops — do it again!",                track: "P", kind: "F" },
    { n: 6,   t: "Lists & Collections",                 track: "P", kind: "F" },
    { n: 6.5, t: "🛠️ Bonus: Google Colab & Replit Setup", track: "P", kind: "Bonus" },
    { n: 7,   t: "Functions — reusable code",           track: "P", kind: "F" },
    { n: 8,   t: "Project: Number-guessing game",       track: "P", kind: "Proj" },
    { n: 9,   t: "Project: Story generator",            track: "P", kind: "Proj" },
    { n: 10,  t: "What is AI, really?",                 track: "A", kind: "F" },
    { n: 11,  t: "Talking to AI — prompting",           track: "A", kind: "F" },
    { n: 12,  t: "AI Safety & Ethics for Kids",         track: "A", kind: "F" },
    { n: 13,  t: "Project: Homework helper chatbot",    track: "A", kind: "Proj" },
    { n: 14,  t: "Project: AI Image Generator",         track: "A", kind: "Proj" },
    { n: 15,  t: "Demo Day — show your family!",        track: "A", kind: "Proj" },
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
    ["What is the 7-day free trial — and how do I get it?",
     "After your kid finishes Day 1, tap 'Start my 7-day free trial' in the pricing section — it opens WhatsApp with your request ready, so you just hit send. Manisha replies with login credentials within minutes. The trial gives full access to all 15 lessons and coding challenges for 7 days — completely free. What's not included: live sessions with Manisha, WhatsApp teacher support, and the completion certificate. Those come with the full camp."],
    ["How much does the full camp cost?",
     "$49 (₹4,000) for all 15 lessons, 6 live sessions with Manisha, personal WhatsApp support, project reviews, and a completion certificate. UPI, cards, or WhatsApp invoice — whatever is easiest. And if your kid doesn't love it, full refund, no questions."],
    ["What if my kid doesn't enjoy it after the first week?",
     "Full refund, no questions, no forms. Just message Manisha. We can say that because almost nobody asks."],
  ];

  const sep = { borderRight: `1.5px solid ${C.ink}` };

  return (
    <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: C.bg, color: C.ink, overflowX: "hidden" }}>

      {/* ── Promo strip — fixed on desktop, hidden on mobile ────────── */}
      {!mob && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: C.ink, color: C.yellow,
          padding: "8px 24px", fontSize: 13, fontWeight: 600,
          display: "flex", justifyContent: "center", alignItems: "center", gap: 16,
          height: 36,
        }}>
          <span>🎁 Day 1 <strong style={{ color: "#fff" }}>FREE</strong> · 7-day trial after · full camp <strong style={{ color: C.yellow }}>$49</strong> <span style={{ opacity: 0.6 }}>(₹4,000)</span></span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Money-back guarantee · Summer 2026 · June 1, 7 &amp; 15</span>
        </div>
      )}

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: mob ? 0 : 36, left: 0, right: 0, zIndex: 40,
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
              {[["#what","What you'll build"],["#curriculum","15 lessons"],["#reviews","Reviews"],["#pricing","Pricing"],["#teacher","Meet Manisha"],["#faq","FAQ"]].map(([h,l]) => (
                <a key={h} href={h} style={{ color: C.ink2, textDecoration: "none" }}>{l}</a>
              ))}
            </nav>
          )}
          <div style={{ display: "flex", gap: mob ? 8 : 14, alignItems: "center", marginLeft: mob ? "auto" : undefined }}>
            {!mob && (
              <button onClick={openWA} style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: 14, fontWeight: 600, color: C.ink2, whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: 5,
              }}>💬 Questions? Ask Manisha</button>
            )}
            <CTA kind="yellow" size="sm" icon="▶" onClick={openFree}>{mob ? "Free lesson →" : "Try free lesson →"}</CTA>
            {mob && (
              <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen} style={{
                background: "none", border: `1px solid ${C.line}`, borderRadius: 8,
                width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 18, color: C.ink, flexShrink: 0,
              }}>{menuOpen ? "✕" : "☰"}</button>
            )}
          </div>
        </div>
        {mob && menuOpen && (
          <nav style={{ borderTop: `1px solid ${C.line}`, background: "rgba(251,250,245,.98)", padding: "8px 16px 14px" }}>
            {[["#what","What you'll build"],["#curriculum","15 lessons"],["#reviews","⭐ Reviews"],["#pricing","Pricing"],["#teacher","Meet Manisha"],["#faq","FAQ"]].map(([h,l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "12px 4px", fontSize: 16, fontWeight: 600,
                color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.line}`,
              }}>{l}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); openWA(); }} style={{
              width: "100%", marginTop: 12, padding: "12px", borderRadius: 10, border: "none",
              background: "#25D366", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>💬 Questions? Ask Manisha</button>
          </nav>
        )}
      </header>

      {/* ── Sticky enroll bar (appears after hero scrolls away) ─────── */}
      {scrolled && !mob && (
        <div style={{
          position: "fixed", top: mob ? 0 : 36, left: 0, right: 0, zIndex: 35,
          background: C.ink, color: "#fff",
          padding: "0 32px", height: 48,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,.3)",
          animation: "slideDown .2s ease",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            🐝 <strong style={{ color: C.yellow }}>Summer Coding Camp 2026</strong> · Python + AI · Ages 8–15
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ fontSize: 13 }}>Full camp <strong style={{ color: C.yellow }}>$49</strong> <span style={{ opacity: 0.55 }}>(₹4,000)</span> · 7-day free trial available</span>
          <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
            <button onClick={openFree} style={{
              background: C.yellow, color: C.ink, border: "none",
              padding: "7px 16px", borderRadius: 8, fontWeight: 800,
              fontSize: 12, cursor: "pointer",
            }}>▶ Try free →</button>
            <button onClick={() => openEnroll()} style={{
              background: C.wa, color: "#fff", border: "none",
              padding: "7px 16px", borderRadius: 8, fontWeight: 800,
              fontSize: 12, cursor: "pointer",
            }}>🎉 Enroll — $49</button>
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: mob ? "100px 20px 48px" : "172px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1.1fr 1fr", gap: mob ? 32 : 56, alignItems: "center" }}>
          {/* Left copy */}
          <div>
            <div style={{ marginBottom: 18, display: "flex", gap: 8 }}>
              <span style={{ background: "#fff", color: C.ink, border: `1px solid ${C.line}`, padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}>
                SUMMER 2026 · 15 DAYS · AGES 8–15
              </span>
              <span style={{ background: C.yellow, color: C.ink, padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
                🗓 Pick your start: June 1, 7 or 15
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
              <CTA kind="yellow" size="xl" icon="▶" sub="No signup · no card · starts in 30 sec" onClick={openFree}>
                Start free lesson
              </CTA>
            </div>

            {/* WhatsApp #1 — questions (distinct label) */}
            <div style={{ marginTop: 14 }}>
              <button onClick={openWA} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: C.ink3, fontWeight: 600,
                fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6,
                padding: 0, textDecoration: "underline", textUnderlineOffset: 3,
              }}>
                💬 Questions first? Chat with Manisha on WhatsApp →
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, fontSize: 13, color: C.ink2, flexWrap: "wrap" }}>
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

      {/* ── Why not YouTube / Udemy ─────────────────────────────────── */}
      <section style={{ padding: mob ? "48px 20px" : "88px 32px", background: C.bg2 }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              Fair question
            </span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              "Why not just use YouTube or Udemy?"
            </h2>
            <p style={{ fontSize: 16, color: C.ink2, marginTop: 12 }}>
              Great question. Here's the honest answer.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16 }}>
            {[
              {
                icon: "👩‍🏫",
                title: "No live teacher who knows your kid",
                them: "YouTube & Udemy give you a recorded instructor who has never seen your child's face.",
                us: "Manisha knows every student by name. She watches quiz scores, reviews projects, and sends WhatsApp notes after every live class. That's 8+ years of teaching kids 8–15 — not a generic video.",
                color: C.blue,
              },
              {
                icon: "💻",
                title: "No place to actually practise",
                them: "You watch a video, then open a separate editor, then try to remember what you just saw. Kids lose interest in that gap.",
                us: "Watch → Read → Code → Quiz — all on one page, no tab-switching. The coding challenges run right in the browser. Zero setup, zero friction.",
                color: C.green,
              },
              {
                icon: "💬",
                title: "Stuck at 9pm? You're on your own",
                them: "Got a bug you can't crack at night? Post in a forum and hope someone replies in 3 days.",
                us: "Snap a photo of the screen and message Manisha on WhatsApp. She replies within the hour — evenings included. That's the difference between a kid who gives up and one who ships.",
                color: C.wa,
              },
              {
                icon: "⭐",
                title: "Generic content, not built for kids",
                them: "Most online courses are built for adults who can sit and focus for 2-hour lectures. Kids aged 8–15 learn completely differently.",
                us: "Every lesson is designed for short attention spans: 15-minute chunks, visuals, interactive coding, quizzes, and a project at the end. Manisha has a 5.0★ rating from 1,000+ students for a reason.",
                color: "#5B2BC7",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: C.paper, borderRadius: 20,
                border: `2px solid ${C.ink}`,
                overflow: "hidden",
                boxShadow: `6px 6px 0 ${C.ink}`,
              }}>
                <div style={{
                  padding: "16px 20px", background: item.color,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#fff", lineHeight: 1.3 }}>{item.title}</h3>
                </div>
                <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{
                    padding: "12px 14px", borderRadius: 10,
                    background: "#FFF5F5", border: "1.5px solid #FFD0D0",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#CC0000", letterSpacing: "0.08em", marginBottom: 5 }}>YOUTUBE / UDEMY</div>
                    <p style={{ fontSize: 13, color: "#5A3030", lineHeight: 1.5, margin: 0 }}>{item.them}</p>
                  </div>
                  <div style={{
                    padding: "12px 14px", borderRadius: 10,
                    background: "#F0FFF4", border: "1.5px solid #B2EFD0",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: C.green, letterSpacing: "0.08em", marginBottom: 5 }}>CODERSBEE CAMP</div>
                    <p style={{ fontSize: 13, color: "#1A3A26", lineHeight: 1.5, margin: 0 }}>{item.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontSize: 15, color: C.ink2, marginBottom: 16 }}>
              Don't take our word for it — try Day 1 completely free and feel the difference.
            </p>
            <CTA kind="yellow" size="lg" icon="▶" sub="No signup · no card" onClick={openFree}>
              Start free lesson →
            </CTA>
          </div>
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

      {/* ── A typical day (collapsible) ─────────────────────────────── */}
      <section style={{ padding: mob ? "24px 20px" : "48px 32px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: C.paper, border: `2px solid ${C.ink}`, borderRadius: 28, overflow: "hidden", boxShadow: `6px 6px 0 ${C.ink}` }}>
          <button
            onClick={() => setDayExpanded(x => !x)}
            style={{
              width: "100%", textAlign: "left", padding: mob ? "20px 24px" : "22px 48px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: mob ? 22 : 28, fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              📅 How a typical camp day works
            </h2>
            <span style={{
              width: 32, height: 32, borderRadius: 999, border: `2px solid ${C.ink}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: C.ink2, flexShrink: 0, background: C.bg2,
              transition: "transform .2s",
              transform: dayExpanded ? "rotate(45deg)" : "none",
            }}>+</span>
          </button>
          {dayExpanded && (
            <div style={{ padding: mob ? "0 24px 28px" : "0 48px 40px" }}>
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
                    {i < 3 && <span style={{ position: "absolute", right: -10, top: 18, fontSize: 18, color: C.ink3 }}>›</span>}
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>{step}</div>
                    <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.4 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            {(showAllLessons ? lessons : lessons.slice(0, 6)).map(l => {
              const isBonus = l.kind === "Bonus";
              const isProj  = l.kind === "Proj";
              const bg      = isBonus ? "#FFF8E1" : isProj ? C.yellow : "rgba(255,255,255,.06)";
              const clr     = isBonus ? "#7B5800" : isProj ? C.ink   : "#fff";
              const bdr     = isBonus ? "#F2B705" : isProj ? C.yellow : "rgba(255,255,255,.12)";
              const badgeBg = isBonus ? "#F2B705" : isProj ? C.ink   : "rgba(255,255,255,.12)";
              const badgeClr= isBonus ? C.ink     : isProj ? C.yellow : "#fff";
              const label   = isBonus ? "BONUS"   : isProj ? "PROJECT" : "LESSON";
              return (
                <Link key={l.n} to={`/summer-camp/module/${l.n}`} style={{
                  padding: "14px 18px", borderRadius: 12, textDecoration: "none",
                  background: bg, color: clr,
                  border: `1px solid ${bdr}`,
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "opacity .15s",
                  ...(isBonus ? { gridColumn: mob ? "1" : "span 1", boxShadow: `0 0 0 2px ${C.yellow}` } : {}),
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: badgeBg, color: badgeClr,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontSize: isBonus ? 14 : 12, fontWeight: 700,
                  }}>{isBonus ? "⭐" : String(l.n).padStart(2, "0")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{l.t}</div>
                    <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
                      {l.track === "P" ? "PYTHON" : "AI"} · {label}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {!showAllLessons && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button
                onClick={() => setShowAllLessons(true)}
                style={{
                  background: "rgba(255,255,255,.08)", color: "#fff",
                  border: "1.5px solid rgba(255,255,255,.2)",
                  padding: "12px 28px", borderRadius: 10, cursor: "pointer",
                  fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                }}
              >
                Show all 15 lessons ↓
              </button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <CTA kind="yellow" size="md" onClick={openFree} icon="▶">Try Day 1 free — no signup needed</CTA>
          </div>
        </div>
      </section>

      {/* ── Batch Picker ────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: mob ? "48px 20px" : "72px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ display: "inline-block", background: C.yellow, color: C.ink, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                🎉 Inaugural offer · Summer 2026
              </span>
              <span style={{ display: "inline-block", background: C.ink, color: C.yellow, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                3 batches · limited seats
              </span>
            </div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              Try before you pay a rupee.
            </h2>
            <p style={{ fontSize: 16, color: C.ink2, marginTop: 12, maxWidth: 540, margin: "12px auto 0" }}>
              We're so confident in what Manisha delivers, we built a path where your kid can experience the full camp before you decide.
            </p>
          </div>

          {/* 3-tier plan comparison */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 14 : 18 }}>
              {/* Tier 1 — Free Day */}
              <div style={{
                background: C.paper, border: `2px solid ${C.line}`,
                borderRadius: 20, padding: "24px 22px",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: "0.1em" }}>STEP 1</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 900 }}>Free Day 1</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 900, color: C.green }}>₹0</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.ink2, flex: 1 }}>
                  <li style={{ display: "flex", gap: 8 }}><Check/>1 full lesson — watch, read, code</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>3 coding challenges in browser</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>10-question quiz</li>
                  <li style={{ display: "flex", gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: 999, background: C.bg2, border: `1.5px solid ${C.line}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, color: C.ink3 }}>–</span>No signup at all</li>
                </ul>
                <button onClick={openFree} style={{
                  marginTop: "auto", width: "100%", padding: "12px 16px",
                  background: C.ink, color: "#fff", border: `2px solid ${C.ink}`,
                  borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
                }}>▶ Start free now →</button>
              </div>

              {/* Tier 2 — 7-day Trial */}
              <div style={{
                background: C.paper, border: `2.5px solid ${C.yellow}`,
                borderRadius: 20, padding: "24px 22px",
                display: "flex", flexDirection: "column", gap: 12,
                boxShadow: `6px 6px 0 ${C.ink}`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: C.yellow, color: C.ink, padding: "4px 16px",
                  borderRadius: 999, fontSize: 11, fontWeight: 800,
                  border: `2px solid ${C.ink}`, whiteSpace: "nowrap",
                }}>⭐ Our trust guarantee</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: "0.1em" }}>STEP 2 · AFTER DAY 1</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 900 }}>7-Day Free Trial</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 900, color: C.green }}>₹0</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.ink2, flex: 1 }}>
                  <li style={{ display: "flex", gap: 8 }}><Check/>All 15 lessons — full access</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>All coding challenges</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>Quizzes + progress tracking</li>
                  <li style={{ display: "flex", gap: 8, color: C.ink3 }}><span style={{ width: 20, height: 20, borderRadius: 999, background: C.bg2, border: `1.5px solid ${C.line}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>–</span>Live sessions not included</li>
                  <li style={{ display: "flex", gap: 8, color: C.ink3 }}><span style={{ width: 20, height: 20, borderRadius: 999, background: C.bg2, border: `1.5px solid ${C.line}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>–</span>No teacher WhatsApp support</li>
                  <li style={{ display: "flex", gap: 8, color: C.ink3 }}><span style={{ width: 20, height: 20, borderRadius: 999, background: C.bg2, border: `1.5px solid ${C.line}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>–</span>No completion certificate</li>
                </ul>
                <button onClick={openTrial} style={{
                  marginTop: "auto", width: "100%", padding: "12px 16px",
                  background: C.wa, color: "#fff", border: `2px solid ${C.ink}`,
                  borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
                  boxShadow: `0 3px 0 ${C.waD}`,
                }}>🚀 Start my 7-day free trial →</button>
                <p style={{ fontSize: 11, color: C.ink3, textAlign: "center", margin: 0 }}>
                  One tap — opens WhatsApp with your request ready. Manisha sends your login in minutes.
                </p>
              </div>

              {/* Tier 3 — Full Camp */}
              <div style={{
                background: C.ink, border: `2.5px solid ${C.ink}`,
                borderRadius: 20, padding: "24px 22px",
                display: "flex", flexDirection: "column", gap: 12,
                boxShadow: `6px 6px 0 ${C.yellowD}`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -14, right: 20,
                  background: "#E05C00", color: "#fff", padding: "4px 12px",
                  borderRadius: 999, fontSize: 11, fontWeight: 800,
                  border: `2px solid ${C.ink}`, whiteSpace: "nowrap",
                }}>🎉 Inaugural price</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.5)", letterSpacing: "0.1em" }}>STEP 3 · FULL EXPERIENCE</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 900, color: "#fff" }}>Full Camp</div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: "'Fraunces',serif", fontSize: 42, fontWeight: 900, color: C.yellow, lineHeight: 1 }}>$49</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 3 }}>₹4,000 · one-time · no recurring</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "rgba(255,255,255,.8)", flex: 1 }}>
                  <li style={{ display: "flex", gap: 8 }}><Check/>Everything in trial</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>6 live sessions with Manisha</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>WhatsApp teacher support</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>Manisha reviews your projects</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>Completion certificate</li>
                  <li style={{ display: "flex", gap: 8 }}><Check/>Full refund if not happy</li>
                </ul>
                <button onClick={() => openEnroll()} style={{
                  marginTop: "auto", width: "100%", padding: "12px 16px",
                  background: C.yellow, color: C.ink, border: "none",
                  borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
                  boxShadow: `0 3px 0 ${C.yellowD}`,
                }}>🎉 Enroll Now →</button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {[
              { date: "June 1",  day: "Sunday",   seats: 0,  badge: "Earliest batch", badgeBg: C.yellow, full: true  },
              { date: "June 7",  day: "Saturday",  seats: 5,  badge: "Most popular",   badgeBg: C.green,  full: false },
              { date: "June 15", day: "Sunday",   seats: 8,  badge: "Last batch",     badgeBg: C.ink,    full: false },
            ].map(({ date, day, seats, badge, badgeBg, full }) => {
              const isCritical = !full && seats <= 2;
              const isLow      = !full && seats <= 5;
              const seatsColor  = full ? C.ink3 : isCritical ? "#E05C00" : isLow ? "#B36B00" : C.green;
              const seatsBg     = full ? C.bg2  : isCritical ? "#FFF3E0" : isLow ? "#FFFBEA" : "#F0FFF4";
              return (
                <div key={date} style={{
                  background: full ? C.bg2 : C.paper,
                  border: `2.5px solid ${full ? C.line : isCritical ? "#E05C00" : C.ink}`,
                  borderRadius: 22, padding: "32px 28px",
                  boxShadow: full ? "none" : isCritical ? `8px 8px 0 #E05C00` : `8px 8px 0 ${C.ink}`,
                  display: "flex", flexDirection: "column", gap: 16,
                  position: "relative", opacity: full ? 0.7 : 1,
                }}>
                  <div style={{
                    position: "absolute", top: -14, left: 24,
                    background: full ? "#E05C00" : badgeBg,
                    color: (full || badgeBg !== C.yellow) ? "#fff" : C.ink,
                    padding: "4px 12px", borderRadius: 999,
                    fontSize: 11, fontWeight: 700, border: `2px solid ${C.ink}`,
                  }}>{full ? "🔴 FULL" : badge}</div>

                  <div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>{date}</div>
                    <div style={{ fontSize: 13, color: C.ink3, marginTop: 4 }}>{day} · 2026</div>
                  </div>

                  {/* Seats counter */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: seatsBg, borderRadius: 8, padding: "8px 12px",
                    border: `1.5px solid ${seatsColor}30`,
                  }}>
                    <span style={{ fontSize: 18 }}>{full ? "⛔" : isCritical ? "🔴" : isLow ? "🟡" : "🟢"}</span>
                    <div>
                      {full
                        ? <span style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900, color: C.ink3 }}>Batch Full</span>
                        : <>
                            <span style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900, color: seatsColor }}>{seats} seats</span>
                            <span style={{ fontSize: 12, color: seatsColor, fontWeight: 700 }}> remaining</span>
                          </>
                      }
                    </div>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.ink2 }}>
                    {["15 self-paced lessons", "2× live sessions / week", "WhatsApp support", "5 real projects to keep"].map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Check/>{f}
                      </li>
                    ))}
                  </ul>

                  {/* Price line inside card */}
                  <div style={{
                    padding: "10px 14px", borderRadius: 10,
                    background: C.bg2, border: `1.5px dashed ${C.ink}`,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <span style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 900 }}>$49</span>
                      <span style={{ fontSize: 11, color: C.ink3, marginLeft: 6 }}>₹4,000</span>
                    </div>
                    <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>↩ full refund</span>
                  </div>

                  {full ? (
                    <div style={{
                      marginTop: "auto", width: "100%", padding: "14px 18px",
                      background: C.bg2, color: C.ink3,
                      border: `2px solid ${C.line}`, borderRadius: 12,
                      fontWeight: 800, fontSize: 15, textAlign: "center",
                      boxSizing: "border-box",
                    }}>
                      ⛔ Batch Closed
                    </div>
                  ) : (
                    <button onClick={() => openEnroll(date)} style={{
                      marginTop: "auto", width: "100%", padding: "14px 18px",
                      background: isCritical ? "#E05C00" : C.wa,
                      color: "#fff", border: `2px solid ${C.ink}`,
                      borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
                      boxShadow: `0 4px 0 ${isCritical ? "#a03d00" : C.waD}`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                      🎉 Enroll for {date}
                    </button>
                  )}
                </div>
              );
            })}
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
              <CTA kind="yellow" size="lg" icon="▶" onClick={openFree}>Try the free lesson →</CTA>
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
      <section id="reviews" style={{ padding: mob ? "48px 20px" : "88px 32px", background: C.bg }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ display: "inline-block", background: C.ink, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
              Real parent feedback — unedited
            </span>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              Parents don't just recommend us —<br/>they send us these.
            </h2>
            <p style={{ fontSize: 15, color: C.ink3, marginTop: 10 }}>
              Facebook reviews · WhatsApp messages · All unedited, all real.
            </p>
          </div>

          {/* 3 featured Facebook reviews */}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 18, marginBottom: 48 }}>
            {[
              {
                q: "Highly recommend Manisha as an exceptional teacher for children to learn coding. She is soft spoken, gentle and understands her students individual needs. My child looks forward to this class every week and is thrilled at how much she is able to learn and apply.",
                n: "Aradhana Vineeth", date: "May 2024", avatarBg: C.yellow, avatarColor: C.ink,
                badge: null,
              },
              {
                q: "My 9 year old took web development class during his summer break. His final project was creating his own website and uploading to GitHub. Manisha is very professional, patient, always available and flexible. I highly recommend Manisha.",
                n: "Asha Manu", date: "Aug 2022", avatarBg: "#9B59B6", avatarColor: "#fff",
                badge: "Built real website → deployed to GitHub 🚀",
              },
              {
                q: "My 10 year old daughter Aarini had no previous programming experience. Ms Manisha is very patient and keeps the lessons interesting. Aarini is looking forward to her class very eagerly each week. We couldn't ask for a better teacher to introduce our kid to programming.",
                n: "Pink Floyd", date: "Jul 2025", avatarBg: C.green, avatarColor: "#fff",
                badge: "Zero experience → loves coding 💚",
              },
            ].map((r, i) => (
              <blockquote key={i} style={{
                margin: 0, background: C.paper, padding: 26, borderRadius: 18,
                border: `2px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 5, background: "#1877F2",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 13, fontWeight: 900, flexShrink: 0,
                  }}>f</div>
                  <span style={{ fontSize: 11, color: C.ink3, fontWeight: 600 }}>
                    recommends CodersBee · {r.date}
                  </span>
                  <Stars n={5}/>
                </div>
                {r.badge && (
                  <div style={{ background: "#F0FFF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: "#166534" }}>
                    {r.badge}
                  </div>
                )}
                <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, fontWeight: 500, flex: 1 }}>"{r.q}"</p>
                <footer style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: `1px dashed ${C.line}` }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 999,
                    background: r.avatarBg, color: r.avatarColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 16, border: `2px solid ${C.ink}`, flexShrink: 0,
                  }}>{r.n[0]}</div>
                  <div style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 700 }}>{r.n}</div>
                    <div style={{ color: C.ink2, fontSize: 12 }}>Verified parent · Facebook</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* WhatsApp messages section */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999, background: C.wa, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L0 24l6.29-1.513A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.369l-.359-.214-3.727.897.934-3.62-.235-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>What parents message Manisha directly</div>
                <div style={{ fontSize: 12, color: C.ink3 }}>Private WhatsApp conversations — shared with permission</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2,1fr)", gap: 16 }}>
              {[
                {
                  n: "Kavitha", child: "Yashwin", date: "Jul 2022",
                  q: "Yashwin said he wants to have you as his teacher for his whole lifetime 😀 What awesome feedback from the kids. Kudos to you 👏👏👏",
                },
                {
                  n: "Ramya", child: "Siddhu", date: "Recent",
                  q: "He is enjoying your classes thoroughly. He told you are the best coding teacher he has had 😄",
                },
                {
                  n: "Deepthi Renati", child: "Vamshika", date: "Dec 2022",
                  q: "Vamshika said she had so much fun in d class today. Thank u very much Manisha for making her interested in coding 🙏",
                },
                {
                  n: "Swagata Dutta", child: "Shuvam", date: "Jul 2022",
                  q: "Shuvam is very happy to do the work with you. Shuvam likes your class so much — built a Chatbot AND Rock Paper Scissors in Python! Looks so much fun 😀",
                },
              ].map((r, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, border: `1.5px solid ${C.line}`, overflow: "hidden" }}>
                  {/* WA-style header bar */}
                  <div style={{ background: C.waD, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 999,
                      background: "rgba(255,255,255,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 15, color: "#fff", flexShrink: 0,
                    }}>{r.n[0]}</div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{r.n}</div>
                      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Parent of {r.child} · {r.date}</div>
                    </div>
                  </div>
                  {/* Chat bubble area */}
                  <div style={{ padding: "14px 16px", background: "#ECE5DD" }}>
                    <div style={{
                      background: "#fff",
                      borderRadius: "0 12px 12px 12px",
                      padding: "10px 14px",
                      maxWidth: "88%",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      fontSize: 14, lineHeight: 1.55, color: C.ink,
                    }}>
                      {r.q}
                      <div style={{ textAlign: "right", fontSize: 10, color: C.ink3, marginTop: 4 }}>
                        {r.date} ✓✓
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling marquee — all 9 Facebook reviews */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: C.ink3, fontWeight: 600 }}>
              More from our Facebook page ↓
            </span>
          </div>
          <div style={{
            overflow: "hidden", borderRadius: 16,
            border: `1.5px solid ${C.line}`, background: C.paper,
            padding: "18px 0", position: "relative",
          }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(to right, ${C.paper}, transparent)`, zIndex: 2, pointerEvents: "none" }}/>
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(to left, ${C.paper}, transparent)`, zIndex: 2, pointerEvents: "none" }}/>
            <div style={{ display: "flex", gap: 16, animation: "marquee-scroll 60s linear infinite", width: "max-content" }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
            >
              {[...Array(2)].flatMap(() => [
                { n: "Ramya Abhishek",   date: "May 2024", q: "Highly recommend Manisha. She is soft spoken, very clear in her instructions and teaching method. My son thoroughly enjoys her classes." },
                { n: "Aradhana Vineeth", date: "May 2024", q: "She has a genuine passion for coding and makes complex concepts accessible for young learners. My child looks forward to every class!" },
                { n: "Ji Hyun Chang",   date: "Feb 2024", q: "My child's skills have significantly improved by online class. I truly thank Ms. Manisha for her patience and dedication." },
                { n: "Deepthi Reddy",   date: "Dec 2022", q: "Manisha makes coding fun. My daughter went from Scratch to Java to Python! Definitely recommend for anyone wanting to try programming." },
                { n: "Puja Verma Saxena", date: "Aug 2022", q: "My son has developed interest in coding and is now truly enjoying it. Great teacher who always encourages kids!" },
                { n: "Asha Manu",       date: "Aug 2022", q: "My 9 yr old built his own website and uploaded to GitHub — in just one summer! Manisha is professional, patient and always available." },
                { n: "Sonia Sda",       date: "Jun 2022", q: "Ms. Manisha has been a great teacher for my 10 year old. Her courses are very structured and classes have been really effective." },
                { n: "Pink Floyd",      date: "Jul 2025", q: "Aarini had no previous programming experience. Manisha is very patient and keeps the lessons interesting. We couldn't ask for a better teacher." },
                { n: "Akhila Kallakuri", date: "",        q: "Manisha has been great in creating a fun classroom. Our kid thoroughly enjoys the class and creates interesting games. Will definitely recommend her." },
              ]).map((r, i) => (
                <div key={i} style={{
                  flexShrink: 0, width: mob ? 260 : 300,
                  background: C.bg2, borderRadius: 12,
                  border: `1.5px solid ${C.line}`,
                  padding: "14px 16px",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, background: "#1877F2",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 11, fontWeight: 900, flexShrink: 0,
                    }}>f</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.ink }}>{r.n}</span>
                    {r.date && <span style={{ fontSize: 10, color: C.ink3, marginLeft: "auto" }}>{r.date}</span>}
                  </div>
                  <p style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5, margin: 0 }}>"{r.q}"</p>
                  <Stars n={5}/>
                </div>
              ))}
            </div>
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
            <CTA kind="whatsapp" size="xl" icon="🎉" sub="June 7 · 5 seats left" onClick={() => openEnroll()}>Enroll Now — $49</CTA>
          </div>

          {/* Pricing reassurance line */}
          <div style={{
            marginTop: 32, display: "inline-flex", alignItems: "center", gap: 14,
            background: "rgba(14,17,22,.08)", borderRadius: 14,
            padding: "14px 22px", flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 900 }}>$49</span>
              <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.7 }}>full camp · ₹4,000</span>
            </div>
            <span style={{ width: 1, height: 32, background: "rgba(14,17,22,.2)" }}/>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>15 lessons · 6 live sessions with Manisha · certificate</span>
              <span style={{ fontSize: 12, opacity: 0.7 }}>Try Day 1 free → 7-day trial → enroll. Full refund if not happy.</span>
            </div>
          </div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>🗓 Pick your start date:</span>
            {/* June 1 — FULL */}
            <button disabled style={{
              background: "rgba(14,17,22,.08)", color: C.ink3,
              border: `2px solid rgba(14,17,22,.2)`,
              padding: "8px 16px", borderRadius: 999,
              fontWeight: 700, fontSize: 13, cursor: "not-allowed", opacity: 0.55,
            }}>June 1 🔴 FULL</button>
            {["June 7", "June 15"].map((d) => (
              <button key={d} onClick={() => openEnroll(d)} style={{
                background: "rgba(14,17,22,.12)", color: C.ink,
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
                {(items as string[]).map(it => {
                  // WhatsApp #3 — the footer link (distinct label)
                  if (it === "WhatsApp Manisha") return (
                    <li key={it}>
                      <button onClick={openWA} style={{
                        background: "none", border: "none", padding: 0, cursor: "pointer",
                        font: "inherit", color: C.wa, fontWeight: 700, opacity: 1,
                        display: "inline-flex", alignItems: "center", gap: 6,
                      }}>💬 WhatsApp Manisha</button>
                    </li>
                  );
                  if (it === "Day 1 — free lesson") return (
                    <li key={it}>
                      <button onClick={openFree} style={{
                        background: "none", border: "none", padding: 0, cursor: "pointer",
                        font: "inherit", color: "inherit", opacity: 0.65,
                      }}>{it}</button>
                    </li>
                  );
                  return <li key={it} style={{ opacity: 0.65 }}>{it}</li>;
                })}
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
        @keyframes slideDown {
          from{transform:translateY(-100%);opacity:0}
          to{transform:translateY(0);opacity:1}
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
      `}</style>

      {/* ── Modals ───────────────────────────────────────────────────── */}
      {modal === "free"   && <FreeLessonModal onClose={() => setModal(null)} openWA={openWA}/>}
      {modal === "wa"     && <WhatsAppModal   onClose={() => setModal(null)}/>}
      {modal === "enroll" && <EnrollModal     onClose={() => setModal(null)} defaultBatch={enrollBatch}/>}
    </div>
  );
}
