import { useMemo, useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:      "#07192E",
  navyMid:   "#0D2B4A",
  blue:      "#1565C0",
  blueMid:   "#1976D2",
  blueAcc:   "#2196F3",
  bluePale:  "#E3F2FD",
  blueSoft:  "#BBDEFB",
  blueChip:  "#EBF4FF",
  white:     "#FFFFFF",
  offWhite:  "#F7FAFF",
  border:    "#DDEAFC",
  gray:      "#6B7A99",
  grayLight: "#EEF2F7",
  grayDark:  "#3D4A63",
  green:     "#16A34A",
  greenPale: "#DCFCE7",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Google",
    location: "Remote",
    salary: 120,
    type: "Full Time",
    category: "Development",
    logo: "G",
    logoColor: "#4285F4",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "GraphQL"],
    desc: "Join the Chrome DevTools team to build developer-facing tooling at internet scale.",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "LinkedIn",
    location: "Berlin",
    salary: 92,
    type: "Hybrid",
    category: "Design",
    logo: "in",
    logoColor: "#0077B5",
    posted: "1 day ago",
    skills: ["Figma", "UX Research", "Design Systems"],
    desc: "Shape the future of professional networking through thoughtful, user-centered product design.",
  },
  {
    id: 3,
    title: "AI / ML Engineer",
    company: "OpenAI",
    location: "San Francisco",
    salary: 165,
    type: "Full Time",
    category: "AI/ML",
    logo: "AI",
    logoColor: "#10a37f",
    posted: "5 hours ago",
    skills: ["Python", "LLMs", "PyTorch"],
    desc: "Architect and deploy large language model systems that are powering the next generation of AI assistants.",
  },
  {
    id: 4,
    title: "Cybersecurity Analyst",
    company: "Microsoft",
    location: "London",
    salary: 105,
    type: "Remote",
    category: "Cybersecurity",
    logo: "Ms",
    logoColor: "#00A4EF",
    posted: "4 days ago",
    skills: ["SOC Operations", "SIEM", "Azure Security"],
    desc: "Protect enterprise infrastructure and respond to evolving threat landscapes across Microsoft's global network.",
  },
  {
    id: 5,
    title: "Frontend Engineer",
    company: "Stripe",
    location: "New York",
    salary: 138,
    type: "Hybrid",
    category: "Development",
    logo: "S",
    logoColor: "#635BFF",
    posted: "3 days ago",
    skills: ["Vue.js", "TypeScript", "CSS"],
    desc: "Build the world's best payment UI at Stripe's NY engineering hub.",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Airbnb",
    location: "Remote",
    salary: 118,
    type: "Remote",
    category: "Data",
    logo: "Ai",
    logoColor: "#FF5A5F",
    posted: "6 hours ago",
    skills: ["Python", "SQL", "ML Pipelines"],
    desc: "Use data to influence product strategy and optimize the traveler experience globally.",
  },
];

const JOB_TYPES  = ["Full Time", "Remote", "Hybrid"];
const CATEGORIES = ["Development", "Design", "AI/ML", "Cybersecurity", "Data", "Finance"];
const SORT_OPTS  = [
  { value: "latest",      label: "Sort: Latest" },
  { value: "salary-high", label: "Sort: Salary ↓" },
  { value: "salary-low",  label: "Sort: Salary ↑" },
];

// ─── TINY COMPONENTS ──────────────────────────────────────────────────────────
function Badge({ children, color = C.blue, bg = C.blueChip, border = C.blueSoft }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "20px",
      border: `1px solid ${border}`,
      background: bg,
      color,
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.3px",
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function SkillPill({ label }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "6px",
      background: C.offWhite,
      border: `1px solid ${C.border}`,
      color: C.grayDark,
      fontSize: "12px",
      fontWeight: 600,
    }}>
      {label}
    </span>
  );
}

function TypeBadge({ type }) {
  const map = {
    "Full Time": { bg: C.bluePale,  color: C.blue,  border: C.blueSoft },
    "Remote":    { bg: "#DCFCE7",   color: "#15803D", border: "#BBF7D0" },
    "Hybrid":    { bg: "#FEF3C7",   color: "#B45309", border: "#FDE68A" },
  };
  const t = map[type] || { bg: C.blueChip, color: C.blue, border: C.blueSoft };
  return <Badge color={t.color} bg={t.bg} border={t.border}>{type}</Badge>;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: "12px",
      padding: "20px 24px",
      minWidth: "120px",
    }}>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Georgia', serif" }}>{value}</div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "5px" }}>{label}</div>
    </div>
  );
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [hov, setHov] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1.5px solid ${hov ? C.blueAcc : C.border}`,
        borderRadius: "14px",
        padding: "24px 28px",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 40px rgba(21,101,192,0.13)" : "0 2px 10px rgba(10,30,60,0.05)",
        position: "relative",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        {/* Logo + title block */}
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flex: 1 }}>
          {/* Logo */}
          <div style={{
            width: "54px", height: "54px", borderRadius: "12px",
            background: job.logoColor + "18",
            border: `1.5px solid ${job.logoColor}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", fontWeight: 800, color: job.logoColor,
            flexShrink: 0, letterSpacing: "-0.5px",
          }}>
            {job.logo}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>
                {job.title}
              </span>
              <Badge color={C.green} bg={C.greenPale} border="#BBF7D0">✓ Verified</Badge>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
              {[
                { icon: "🏢", val: job.company },
                { icon: "📍", val: job.location },
                { icon: "🕐", val: job.posted },
              ].map((m, i) => (
                <span key={i} style={{ fontSize: "13px", color: C.gray, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "12px" }}>{m.icon}</span> {m.val}
                </span>
              ))}
            </div>

            <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.65, margin: "0 0 12px" }}>
              {job.desc}
            </p>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <Badge color={C.blueMid} bg={C.bluePale} border={C.blueSoft}>${job.salary}k / yr</Badge>
              <TypeBadge type={job.type} />
              {job.skills.map(s => <SkillPill key={s} label={s} />)}
            </div>
          </div>
        </div>

        {/* Action column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "stretch", minWidth: "130px" }}>
          <button
            onClick={() => setApplied(!applied)}
            style={{
              padding: "10px 0",
              borderRadius: "8px",
              border: "none",
              background: applied
                ? C.greenPale
                : `linear-gradient(135deg, ${C.blue} 0%, ${C.blueAcc} 100%)`,
              color: applied ? C.green : C.white,
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.2px",
              transition: "all 0.18s",
            }}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </button>
          <button
            style={{
              padding: "10px 0",
              borderRadius: "8px",
              border: `1.5px solid ${C.border}`,
              background: "transparent",
              color: C.grayDark,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blueAcc; e.currentTarget.style.color = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.grayDark; }}
          >
            View Details
          </button>
          <button
            onClick={() => setSaved(!saved)}
            style={{
              padding: "9px 0",
              borderRadius: "8px",
              border: `1.5px solid ${saved ? C.blueSoft : C.border}`,
              background: saved ? C.bluePale : "transparent",
              color: saved ? C.blue : C.gray,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            {saved ? "🔖 Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RANGE SLIDER ─────────────────────────────────────────────────────────────
function RangeSlider({ min, max, value, onChange }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", height: "20px", display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%", height: "4px", background: C.border, borderRadius: "4px" }}>
        <div style={{
          position: "absolute",
          left: `${pct(value[0])}%`,
          right: `${100 - pct(value[1])}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${C.blue}, ${C.blueAcc})`,
          borderRadius: "4px",
        }} />
      </div>
      {[0, 1].map((i) => (
        <input
          key={i}
          type="range" min={min} max={max} value={value[i]}
          onChange={e => {
            const v = Number(e.target.value);
            const next = [...value];
            next[i] = v;
            if (i === 0 && v < value[1]) onChange(next);
            if (i === 1 && v > value[0]) onChange(next);
          }}
          style={{
            position: "absolute",
            width: "100%",
            appearance: "none",
            background: "transparent",
            height: "4px",
            pointerEvents: "none",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function JobBoard() {
  const [search,        setSearch]        = useState("");
  const [location,      setLocation]      = useState("");
  const [sort,          setSort]          = useState("latest");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [salary,        setSalary]        = useState([70, 180]);
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = useMemo(() => {
    let r = JOBS.filter(j => {
      const q = search.toLowerCase();
      const kw = j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
      const loc = j.location.toLowerCase().includes(location.toLowerCase());
      const type = selectedTypes.length === 0 || selectedTypes.includes(j.type);
      const sal  = j.salary >= salary[0] && j.salary <= salary[1];
      const cat  = !activeCategory || j.category === activeCategory;
      return kw && loc && type && sal && cat;
    });
    if (sort === "salary-high") r = [...r].sort((a, b) => b.salary - a.salary);
    if (sort === "salary-low")  r = [...r].sort((a, b) => a.salary - b.salary);
    return r;
  }, [search, location, selectedTypes, salary, sort, activeCategory]);

  const toggleType = t => setSelectedTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  const inputBase = {
    width: "100%",
    padding: "13px 16px 13px 44px",
    borderRadius: "10px",
    border: `1.5px solid ${C.border}`,
    background: C.white,
    fontSize: "14px",
    color: C.navy,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.18s",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

 

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(150deg, ${C.navy} 0%, #0D2B4A 55%, #1565C0 100%)`,
        padding: "72px 48px 90px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative rings */}
        {[380, 260, 160].map((sz, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${sz}px`, height: `${sz}px`,
            borderRadius: "50%",
            border: `1px solid rgba(66,165,245,${0.06 + i * 0.04})`,
            right: `${-60 + i * 20}px`, top: `${-60 + i * 20}px`,
          }} />
        ))}

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Eyebrow */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(66,165,245,0.15)", border: "1px solid rgba(66,165,245,0.3)",
              color: "#90CAF9", fontSize: "12px", fontWeight: 700,
              letterSpacing: "1.2px", textTransform: "uppercase",
              padding: "6px 16px", borderRadius: "20px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#42A5F5", display: "inline-block" }} />
              Enterprise Verified Job Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 700, color: "#fff", lineHeight: 1.12,
            letterSpacing: "-1.5px", margin: "0 0 18px",
            maxWidth: "680px",
          }}>
            Discover Premium Roles<br />
            <span style={{
              background: "linear-gradient(90deg, #42A5F5, #90CAF9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              from Global Companies
            </span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", lineHeight: 1.75, maxWidth: "540px", margin: "0 0 40px" }}>
            Search curated opportunities across engineering, design, AI, security, and business — verified by our team.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {[["25K+", "Active Jobs"], ["4.8K+", "Companies"], ["120K+", "Candidates"], ["18K+", "Hires Made"]].map(([v, l]) => (
              <StatCard key={l} value={v} label={l} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH BAR ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "-32px auto 0", padding: "0 48px", position: "relative", zIndex: 10 }}>
        <div style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: "14px",
          padding: "16px 20px",
          boxShadow: "0 16px 60px rgba(7,25,46,0.14)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: "12px",
          alignItems: "center",
        }}>
          {/* Keyword */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Job title, company, or skill…"
              style={inputBase}
              onFocus={e => e.target.style.borderColor = C.blueAcc}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
          {/* Location */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>📍</span>
            <input
              value={location} onChange={e => setLocation(e.target.value)}
              placeholder="Location or Remote…"
              style={inputBase}
              onFocus={e => e.target.style.borderColor = C.blueAcc}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
          <button style={{
            padding: "13px 32px", borderRadius: "10px", border: "none",
            background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueAcc} 100%)`,
            color: C.white, fontSize: "15px", fontWeight: 700, cursor: "pointer",
            whiteSpace: "nowrap", letterSpacing: "0.2px",
            boxShadow: "0 8px 24px rgba(21,101,192,0.3)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Search Jobs
          </button>
        </div>
      </div>

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 48px 72px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "28px", alignItems: "flex-start" }}>

        {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
        <div style={{
          background: C.white, border: `1px solid ${C.border}`,
          borderRadius: "14px", padding: "24px 20px",
          position: "sticky", top: "80px",
          boxShadow: "0 4px 20px rgba(10,30,60,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <span style={{ fontSize: "16px" }}>⚙️</span>
            <span style={{ fontSize: "17px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>Filters</span>
          </div>

          {/* Job Type */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: C.gray, marginBottom: "12px" }}>Job Type</div>
            {JOB_TYPES.map(type => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer" }}>
                <div
                  onClick={() => toggleType(type)}
                  style={{
                    width: "17px", height: "17px", borderRadius: "4px",
                    border: `2px solid ${selectedTypes.includes(type) ? C.blue : C.border}`,
                    background: selectedTypes.includes(type) ? C.blue : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.15s", cursor: "pointer",
                  }}
                >
                  {selectedTypes.includes(type) && <span style={{ color: "#fff", fontSize: "10px", fontWeight: 800 }}>✓</span>}
                </div>
                <span style={{ fontSize: "14px", color: selectedTypes.includes(type) ? C.navy : C.grayDark, fontWeight: selectedTypes.includes(type) ? 600 : 400 }}>{type}</span>
              </label>
            ))}
          </div>

          <div style={{ height: "1px", background: C.border, margin: "16px 0" }} />

          {/* Salary */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: C.gray, marginBottom: "8px" }}>Salary Range</div>
            <div style={{ fontSize: "13px", color: C.blue, fontWeight: 700, marginBottom: "14px" }}>
              ${salary[0]}k — ${salary[1]}k / year
            </div>
            <RangeSlider min={50} max={200} value={salary} onChange={setSalary} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "11px", color: C.gray }}>$50k</span>
              <span style={{ fontSize: "11px", color: C.gray }}>$200k</span>
            </div>
          </div>

          <div style={{ height: "1px", background: C.border, margin: "16px 0" }} />

          {/* Categories */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: C.gray, marginBottom: "12px" }}>Category</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: `1.5px solid ${activeCategory === cat ? C.blueAcc : C.border}`,
                    background: activeCategory === cat ? C.bluePale : "transparent",
                    color: activeCategory === cat ? C.blue : C.grayDark,
                    fontSize: "13px",
                    fontWeight: activeCategory === cat ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          {(selectedTypes.length > 0 || activeCategory) && (
            <button
              onClick={() => { setSelectedTypes([]); setActiveCategory(null); setSalary([70, 180]); }}
              style={{
                marginTop: "18px",
                width: "100%",
                padding: "9px",
                borderRadius: "8px",
                border: `1.5px solid ${C.border}`,
                background: "transparent",
                color: C.gray,
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* ── JOB LIST ─────────────────────────────────────────────────── */}
        <div>
          {/* Results header */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: "14px", padding: "18px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "18px",
            boxShadow: "0 2px 10px rgba(10,30,60,0.04)",
          }}>
            <div>
              <span style={{ fontSize: "22px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>{filtered.length} jobs found</span>
              <span style={{ fontSize: "13px", color: C.gray, marginLeft: "10px" }}>matching your criteria</span>
            </div>
            <select
              value={sort} onChange={e => setSort(e.target.value)}
              style={{
                padding: "9px 14px", borderRadius: "8px",
                border: `1.5px solid ${C.border}`,
                background: C.white, color: C.grayDark,
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                outline: "none",
              }}
            >
              {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: "14px", padding: "60px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: C.navy, marginBottom: "6px" }}>No jobs found</div>
              <div style={{ fontSize: "14px", color: C.gray }}>Try adjusting your filters or search terms.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filtered.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </div>

 
    </div>
  );
}