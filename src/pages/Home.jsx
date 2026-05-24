import { useState, useEffect, useRef } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  navy:      "#07192E",
  navyMid:   "#0D2B4A",
  blue:      "#1565C0",
  blueMid:   "#1976D2",
  blueAcc:   "#2196F3",
  bluePale:  "#E3F2FD",
  blueSoft:  "#BBDEFB",
  white:     "#FFFFFF",
  offWhite:  "#F7FAFF",
  border:    "#DDEAFC",
  gray:      "#6B7A99",
  grayLight: "#EEF2F7",
  grayDark:  "#3D4A63",
  green:     "#16A34A",
  greenPale: "#DCFCE7",
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function Counter({ end, suffix = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= end) { setVal(end); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ value }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: "13px", color: i <= Math.round(value) ? "#F59E0B" : C.border }}>★</span>
      ))}
    </div>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: C.bluePale,
      border: `1px solid ${C.blueSoft}`,
      color: C.blueMid,
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "1.3px",
      textTransform: "uppercase",
      padding: "5px 16px",
      borderRadius: "20px",
      marginBottom: "14px",
    }}>{children}</span>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { val: 15000, label: "Active Jobs",       icon: "💼" },
  { val: 5000,  label: "Verified Companies",icon: "🏢" },
  { val: 100000,label: "Job Seekers",       icon: "🎓" },
  { val: 75000, label: "Successful Hires",  icon: "📈" },
];

const CATEGORIES = [
  { name: "Development",   icon: "⌨️",  jobs: 1245, color: "#1565C0", bg: "#E3F2FD", border: "#BBDEFB" },
  { name: "Design",        icon: "🎨",  jobs: 892,  color: "#7B1FA2", bg: "#F3E5F5", border: "#CE93D8" },
  { name: "Marketing",     icon: "📣",  jobs: 654,  color: "#2E7D32", bg: "#E8F5E9", border: "#A5D6A7" },
  { name: "AI / ML",       icon: "🤖",  jobs: 432,  color: "#6A1B9A", bg: "#EDE7F6", border: "#B39DDB" },
  { name: "Cybersecurity", icon: "🔒",  jobs: 321,  color: "#E65100", bg: "#FFF3E0", border: "#FFCC80" },
  { name: "Finance",       icon: "💰",  jobs: 567,  color: "#00695C", bg: "#E0F2F1", border: "#80CBC4" },
];

const COMPANIES = [
  { name: "Google",    initials: "G",  color: "#4285F4", rating: 4.9, openings: 234 },
  { name: "Microsoft", initials: "Ms", color: "#00A4EF", rating: 4.8, openings: 189 },
  { name: "Amazon",    initials: "A",  color: "#FF9900", rating: 4.7, openings: 456 },
  { name: "Apple",     initials: "🍎", color: "#555",    rating: 4.9, openings: 167 },
  { name: "Meta",      initials: "M",  color: "#0866FF", rating: 4.6, openings: 234 },
  { name: "Netflix",   initials: "N",  color: "#E50914", rating: 4.8, openings: 98  },
];

const JOBS = [
  { title: "Senior React Developer", company: "Google",    loc: "San Francisco",  type: "Full Time", sal: "$130k–$160k", logo: "G",  lc: "#4285F4" },
  { title: "Product Designer",       company: "LinkedIn",  loc: "Remote",         type: "Remote",    sal: "$95k–$120k",  logo: "in", lc: "#0077B5" },
  { title: "AI / ML Engineer",       company: "OpenAI",    loc: "San Francisco",  type: "Full Time", sal: "$155k–$185k", logo: "AI", lc: "#10a37f" },
  { title: "Cybersecurity Analyst",  company: "Microsoft", loc: "London",         type: "Hybrid",    sal: "$100k–$130k", logo: "Ms", lc: "#00A4EF" },
  { title: "Frontend Engineer",      company: "Stripe",    loc: "New York",       type: "Hybrid",    sal: "$120k–$150k", logo: "S",  lc: "#635BFF" },
  { title: "Data Scientist",         company: "Airbnb",    loc: "Remote",         type: "Remote",    sal: "$115k–$140k", logo: "Ai", lc: "#FF5A5F" },
];

const TESTIMONIALS = [
  { name: "Sarah Johnson",   role: "Senior Developer at Google",     initials: "SJ", color: "#1565C0", rating: 5, text: "CareerHub helped me land my dream role at Google. The platform's job recommendations were spot-on and the process was incredibly smooth." },
  { name: "Michael Chen",    role: "Product Manager at Amazon",      initials: "MC", color: "#FF9900", rating: 5, text: "Best job portal I've ever used. I had interviews within days and received multiple competing offers — couldn't be happier." },
  { name: "Emily Rodriguez", role: "UX Designer at Microsoft",       initials: "ER", color: "#00A4EF", rating: 5, text: "The AI job matching is genuinely impressive. It found positions that perfectly matched my skills and long-term career goals." },
];

const FEATURES = [
  { icon: "⚡", title: "Fast Hiring Process",  desc: "Get matched with top companies in record time and skip the endless waiting." },
  { icon: "✅", title: "Verified Companies",   desc: "Every company on our platform is thoroughly vetted for legitimacy and culture." },
  { icon: "🤖", title: "AI Job Matching",      desc: "Smart algorithms analyze your profile and surface your most relevant opportunities." },
  { icon: "🌐", title: "Remote Opportunities", desc: "Access thousands of remote-first positions from global leading companies." },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={{
      background: C.navy,
      height: "64px",
      display: "flex",
      alignItems: "center",
      padding: "0 48px",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 24px rgba(7,25,46,0.35)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "linear-gradient(135deg, #42A5F5, #1565C0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 800, color: "#fff",
        }}>C</div>
        <span style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.3px" }}>
          CareerHub
        </span>
      </div>
      <div style={{ display: "flex", gap: "32px" }}>
        {["Jobs", "Companies", "Salaries", "Blog"].map((l, i) => (
          <span key={l} style={{ color: i === 0 ? "#90CAF9" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: i === 0 ? 700 : 400, cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ padding: "8px 20px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Sign In</button>
        <button style={{ padding: "8px 20px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #1976D2, #42A5F5)", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Post a Job</button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [kw, setKw] = useState("");
  const [loc, setLoc] = useState("");

  return (
    <section style={{
      background: `linear-gradient(150deg, ${C.navy} 0%, #0D2B4A 55%, #1565C0 100%)`,
      padding: "80px 48px 100px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {[500, 360, 220].map((sz, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${sz}px`, height: `${sz}px`,
          borderRadius: "50%",
          border: `1px solid rgba(66,165,245,${0.05 + i * 0.04})`,
          top: `${-sz/2 + i*30}px`,
          right: `${-sz/2 + i*30}px`,
        }} />
      ))}
      <div style={{
        position: "absolute", width: "360px", height: "360px",
        borderRadius: "50%", background: "rgba(33,150,243,0.12)",
        filter: "blur(80px)", bottom: "-80px", left: "-80px",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(66,165,245,0.15)", border: "1px solid rgba(66,165,245,0.3)",
            color: "#90CAF9", fontSize: "11px", fontWeight: 700,
            letterSpacing: "1.3px", textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#42A5F5", display: "inline-block" }} />
            Trusted by 120,000+ professionals worldwide
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(38px, 5.5vw, 64px)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
          margin: "0 0 18px",
        }}>
          Find Your{" "}
          <span style={{ background: "linear-gradient(90deg, #42A5F5, #90CAF9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Dream Job
          </span>
          {" "}Today
        </h1>

        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "18px", lineHeight: 1.75, marginBottom: "40px" }}>
          Connect with top employers and discover opportunities that match your skills, ambitions, and lifestyle.
        </p>

        {/* Search pill */}
        <div style={{
          background: C.white,
          borderRadius: "14px",
          padding: "10px 10px 10px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: "0",
          maxWidth: "720px",
          margin: "0 auto 32px",
          boxShadow: "0 20px 60px rgba(7,25,46,0.25)",
          border: `1px solid ${C.border}`,
        }}>
          {[
            { icon: "🔍", ph: "Job title, company, or skill…", val: kw, set: setKw },
            { icon: "📍", ph: "City, state, or Remote…",       val: loc, set: setLoc, border: true },
          ].map(({ icon, ph, val, set, border }, i) => (
            <div key={i} style={{ position: "relative", borderRight: border ? `1px solid ${C.border}` : "none" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>{icon}</span>
              <input
                value={val} onChange={e => set(e.target.value)}
                placeholder={ph}
                style={{
                  width: "100%", padding: "14px 16px 14px 44px",
                  border: "none", background: "transparent",
                  fontSize: "14px", color: C.navy, outline: "none",
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <button style={{
            margin: "6px", padding: "0 28px", borderRadius: "10px",
            border: "none", background: `linear-gradient(135deg, ${C.blue}, ${C.blueAcc})`,
            color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 6px 20px rgba(21,101,192,0.35)",
          }}>
            Search
          </button>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {["React", "Python", "Product Design", "Remote", "AI/ML"].map(tag => (
            <span key={tag} style={{
              padding: "5px 14px", borderRadius: "20px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: 600, cursor: "pointer",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS STRIP ─────────────────────────────────────────────────────────────
function StatsStrip() {
  return (
    <section style={{ background: C.bluePale, borderTop: `1px solid ${C.blueSoft}`, borderBottom: `1px solid ${C.blueSoft}`, padding: "36px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: "0 24px",
            borderRight: i < 3 ? `1px solid ${C.blueSoft}` : "none",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: C.blue, fontFamily: "'Georgia', serif", lineHeight: 1 }}>
              <Counter end={s.val} />
            </div>
            <div style={{ fontSize: "13px", color: C.gray, marginTop: "5px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── JOB CARD ────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [hov, setHov] = useState(false);
  const typeColors = {
    "Full Time": { bg: C.bluePale,  color: C.blue,    border: C.blueSoft },
    "Remote":    { bg: "#DCFCE7",   color: "#15803D", border: "#BBF7D0" },
    "Hybrid":    { bg: "#FEF3C7",   color: "#B45309", border: "#FDE68A" },
  };
  const tc = typeColors[job.type] || typeColors["Full Time"];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1.5px solid ${hov ? C.blueAcc : C.border}`,
        borderRadius: "14px",
        padding: "22px 24px",
        transition: "all 0.22s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 12px 40px rgba(21,101,192,0.13)" : "0 2px 10px rgba(10,30,60,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "10px",
          background: job.lc + "18", border: `1.5px solid ${job.lc}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 800, color: job.lc, flexShrink: 0,
        }}>{job.logo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>{job.title}</div>
          <div style={{ fontSize: "12px", color: C.gray, marginTop: "2px" }}>
            🏢 {job.company} · 📍 {job.loc}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: C.blue }}>{job.sal}</span>
        <span style={{ flex: 1 }} />
        <span style={{
          padding: "3px 10px", borderRadius: "20px",
          background: tc.bg, border: `1px solid ${tc.border}`,
          color: tc.color, fontSize: "11px", fontWeight: 700,
        }}>{job.type}</span>
      </div>
      <button style={{
        width: "100%", padding: "10px", borderRadius: "8px",
        border: "none", background: `linear-gradient(135deg, ${C.blue}, ${C.blueAcc})`,
        color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer",
        transition: "opacity 0.18s", opacity: hov ? 1 : 0.88,
      }}>Apply Now →</button>
    </div>
  );
}

// ─── FEATURED JOBS ────────────────────────────────────────────────────────────
function FeaturedJobs() {
  return (
    <section style={{ padding: "80px 48px", background: C.white }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionLabel>Featured Roles</SectionLabel>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", fontWeight: 700, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.5px" }}>
            Featured Jobs
          </h2>
          <p style={{ color: C.gray, fontSize: "16px", margin: 0 }}>Discover exciting opportunities from top global companies</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {JOBS.map((j, i) => <JobCard key={i} job={j} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <button style={{
            padding: "13px 36px", borderRadius: "10px",
            border: `1.5px solid ${C.border}`,
            background: "transparent", color: C.blue,
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
          }}>View All Jobs →</button>
        </div>
      </div>
    </section>
  );
}

// ─── TOP COMPANIES ────────────────────────────────────────────────────────────
function TopCompanies() {
  return (
    <section style={{ padding: "80px 48px", background: C.offWhite, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionLabel>Hiring Now</SectionLabel>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", fontWeight: 700, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.5px" }}>Top Companies</h2>
          <p style={{ color: C.gray, fontSize: "16px", margin: 0 }}>Join industry leaders actively recruiting talent right now</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "16px" }}>
          {COMPANIES.map((co, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  background: C.white,
                  border: `1.5px solid ${hov ? C.blueAcc : C.border}`,
                  borderRadius: "14px",
                  padding: "20px 12px",
                  textAlign: "center",
                  transition: "all 0.2s",
                  transform: hov ? "translateY(-3px)" : "none",
                  boxShadow: hov ? "0 8px 28px rgba(21,101,192,0.12)" : "none",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "12px",
                  background: co.color + "18", border: `1.5px solid ${co.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: 800, color: co.color,
                  margin: "0 auto 10px",
                }}>{co.initials}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{co.name}</div>
                <Stars value={co.rating} />
                <div style={{ fontSize: "11px", color: C.gray, marginTop: "4px" }}>{co.openings} openings</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
function Categories() {
  return (
    <section style={{ padding: "80px 48px", background: C.white }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionLabel>Explore Fields</SectionLabel>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", fontWeight: 700, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.5px" }}>Browse by Category</h2>
          <p style={{ color: C.gray, fontSize: "16px", margin: 0 }}>Find roles in your field of expertise</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {CATEGORIES.map((cat, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  background: hov ? cat.bg : C.white,
                  border: `1.5px solid ${hov ? cat.color + "50" : C.border}`,
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex", alignItems: "center", gap: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: hov ? "translateY(-3px)" : "none",
                  boxShadow: hov ? `0 8px 28px ${cat.color}20` : "none",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "12px",
                  background: cat.bg, border: `1.5px solid ${cat.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", flexShrink: 0,
                }}>{cat.icon}</div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: C.navy, marginBottom: "4px" }}>{cat.name}</div>
                  <div style={{ fontSize: "13px", color: C.gray }}>{cat.jobs.toLocaleString()} open positions</div>
                </div>
                <span style={{ marginLeft: "auto", color: cat.color, fontSize: "20px", fontWeight: 700, opacity: hov ? 1 : 0.3 }}>→</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section style={{ padding: "80px 48px", background: C.offWhite, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionLabel>Our Edge</SectionLabel>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", fontWeight: 700, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.5px" }}>Why Choose CareerHub</h2>
          <p style={{ color: C.gray, fontSize: "16px", margin: 0 }}>We make your job search experience exceptional</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: "14px", padding: "28px 22px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(10,30,60,0.04)",
            }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px",
                background: C.bluePale, border: `1px solid ${C.blueSoft}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", margin: "0 auto 14px",
              }}>{f.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: C.navy, marginBottom: "8px" }}>{f.title}</div>
              <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  return (
    <section style={{ padding: "80px 48px", background: C.white }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Success Stories</SectionLabel>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", fontWeight: 700, color: C.navy, margin: "0 0 10px", letterSpacing: "-0.5px" }}>What Our Users Say</h2>
        <p style={{ color: C.gray, fontSize: "16px", marginBottom: "40px" }}>Real stories from real job seekers</p>

        <div style={{
          background: C.white, border: `1px solid ${C.border}`,
          borderRadius: "20px", padding: "40px 36px",
          boxShadow: "0 8px 40px rgba(21,101,192,0.08)",
        }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: t.color + "18", border: `2px solid ${t.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: 800, color: t.color,
            margin: "0 auto 14px",
          }}>{t.initials}</div>

          <Stars value={t.rating} />

          <p style={{
            fontSize: "17px", lineHeight: 1.8, color: C.grayDark,
            fontStyle: "italic", margin: "18px 0",
            fontFamily: "'Georgia', serif",
          }}>
            "{t.text}"
          </p>

          <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy }}>{t.name}</div>
          <div style={{ fontSize: "13px", color: C.gray, marginTop: "3px" }}>{t.role}</div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px", alignItems: "center" }}>
            <button onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: C.gray }}>‹</button>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                width: i === active ? "20px" : "7px", height: "7px",
                borderRadius: "4px", background: i === active ? C.blue : C.border,
                transition: "all 0.25s", cursor: "pointer",
              }} />
            ))}
            <button onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
              style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: C.gray }}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section style={{ padding: "0 48px 80px", background: C.white }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        background: `linear-gradient(135deg, ${C.navy} 0%, #1565C0 100%)`,
        borderRadius: "20px", padding: "56px 48px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", right: "-80px", top: "-80px" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "34px", fontWeight: 700, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
            Stay Ahead of the Market
          </h2>
          <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "16px", marginBottom: "32px" }}>
            Get curated job alerts and career insights delivered to your inbox weekly.
          </p>
          {done ? (
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "10px", padding: "14px 32px", color: "#fff", fontWeight: 600 }}>
              ✓ You're subscribed! Welcome aboard.
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>✉️</span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 14px 14px 42px",
                    borderRadius: "10px", border: "none",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: "14px",
                    outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <button
                onClick={() => email && setDone(true)}
                style={{
                  padding: "14px 28px", borderRadius: "10px",
                  border: "none", background: C.white,
                  color: C.blue, fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >Subscribe</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Quick Links", links: ["About Us", "Careers", "Blog", "Press"] },
    { title: "For Job Seekers", links: ["Browse Jobs", "Resume Builder", "Career Tips", "Salary Guide"] },
    { title: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"] },
  ];
  return (
    <footer style={{ background: C.navy, padding: "56px 48px 28px", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "48px", marginBottom: "40px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #42A5F5, #1565C0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800 }}>C</div>
              <span style={{ fontFamily: "'Georgia', serif", fontSize: "20px", fontWeight: 700 }}>CareerHub</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.75, marginBottom: "20px" }}>
              Connecting talent with opportunity since 2024. Your career journey starts here.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["𝕏", "in", "f", "📷"].map((icon, i) => (
                <div key={i} style={{
                  width: "34px", height: "34px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", cursor: "pointer", color: "rgba(255,255,255,0.7)",
                }}>{icon}</div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(l => (
                  <span key={l} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>© 2025 CareerHub. All rights reserved.</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["📍 123 Career St, San Francisco, CA", "✉️ info@careerhub.com", "📞 +1 (555) 123-4567"].map((item, i) => (
              <span key={i} style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginLeft: i > 0 ? "16px" : 0 }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      {/* <Navbar /> */}
      <Hero />
      <StatsStrip />
      <FeaturedJobs />
      <TopCompanies />
      <Categories />
      <WhyUs />
      <Testimonials />
      <Newsletter />
      {/* <Footer /> */}
    </div>
  );
}