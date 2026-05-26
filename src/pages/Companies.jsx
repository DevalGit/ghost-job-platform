import { useState, useMemo } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:     "#07192E",
  navyMid:  "#0D2B4A",
  blue:     "#1565C0",
  blueMid:  "#1976D2",
  blueAcc:  "#2196F3",
  bluePale: "#E3F2FD",
  blueSoft: "#BBDEFB",
  white:    "#FFFFFF",
  offWhite: "#F7FAFF",
  border:   "#DDEAFC",
  gray:     "#6B7A99",
  grayLight:"#EEF2F7",
  grayDark: "#3D4A63",
  green:    "#15803D",
  greenPale:"#DCFCE7",
  greenBd:  "#BBF7D0",
  amber:    "#B45309",
  amberPale:"#FEF3C7",
  amberBd:  "#FDE68A",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COMPANIES = [
  {
    id: 1,
    name: "Google",
    initials: "G",
    color: "#4285F4",
    industry: "Technology",
    size: "100,000+",
    location: "Mountain View, CA",
    rating: 4.9,
    reviews: 12400,
    openings: 234,
    type: "Public",
    founded: 1998,
    tags: ["Remote Friendly", "Top Payer", "Best Culture"],
    desc: "Google builds products and services that organize the world's information and make it universally accessible and useful.",
    perks: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budgetsst"],
  },
  {
    id: 2,
    name: "Microsoft",
    initials: "Ms",
    color: "#00A4EF",
    industry: "Technology",
    size: "50,000–100,000",
    location: "Redmond, WA",
    rating: 4.8,
    reviews: 9800,
    openings: 189,
    type: "Public",
    founded: 1975,
    tags: ["Remote Friendly", "Top Payer"],
    desc: "Microsoft empowers every person and organization on the planet to achieve more through intelligent cloud and AI.",
    perks: ["Health Insurance", "401k Match", "Parental Leave", "Gym Subsidy"],
  },
  {
    id: 3,
    name: "Amazon",
    initials: "Az",
    color: "#FF9900",
    industry: "E-Commerce / Cloud",
    size: "100,000+",
    location: "Seattle, WA",
    rating: 4.7,
    reviews: 18200,
    openings: 456,
    type: "Public",
    founded: 1994,
    tags: ["Fast Growth", "Top Payer"],
    desc: "Amazon is guided by four principles: customer obsession, passion for invention, commitment to excellence, and long-term thinking.",
    perks: ["Health Insurance", "RSUs", "Relocation Support", "Tuition Assistance"],
  },
  {
    id: 4,
    name: "Apple",
    initials: "🍎",
    color: "#555555",
    industry: "Consumer Technology",
    size: "100,000+",
    location: "Cupertino, CA",
    rating: 4.9,
    reviews: 8700,
    openings: 167,
    type: "Public",
    founded: 1976,
    tags: ["Top Payer", "Best Culture", "Prestigious"],
    desc: "Apple creates products that enrich people's lives and help them do the things they love in new ways.",
    perks: ["Product Discounts", "Stock Options", "Health Insurance", "On-site Wellness"],
  },
  {
    id: 5,
    name: "Meta",
    initials: "M",
    color: "#0866FF",
    industry: "Social Media",
    size: "50,000–100,000",
    location: "Menlo Park, CA",
    rating: 4.6,
    reviews: 7300,
    openings: 234,
    type: "Public",
    founded: 2004,
    tags: ["Remote Friendly", "Fast Growth"],
    desc: "Meta builds technologies that help people connect, find communities, and grow businesses across its family of apps.",
    perks: ["Free Meals", "Stock Options", "Childcare", "Wellness Credits"],
  },
  {
    id: 6,
    name: "Stripe",
    initials: "S",
    color: "#635BFF",
    industry: "FinTech",
    size: "5,000–10,000",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 3100,
    openings: 98,
    type: "Private",
    founded: 2010,
    tags: ["Remote Friendly", "Top Payer", "Best Culture"],
    desc: "Stripe builds economic infrastructure for the internet, helping businesses of every size accept payments and grow revenue.",
    perks: ["Remote Work", "Home Office Budget", "Stock Options", "Learning Stipend"],
  },
  {
    id: 7,
    name: "OpenAI",
    initials: "AI",
    color: "#10a37f",
    industry: "Artificial Intelligence",
    size: "1,000–5,000",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 1900,
    openings: 87,
    type: "Private",
    founded: 2015,
    tags: ["Fast Growth", "Top Payer", "Cutting Edge"],
    desc: "OpenAI's mission is to ensure that artificial general intelligence benefits all of humanity — safely and responsibly.",
    perks: ["Equity", "Research Budget", "Health Insurance", "Flexible Hours"],
  },
  {
    id: 8,
    name: "Airbnb",
    initials: "Ab",
    color: "#FF5A5F",
    industry: "Travel & Hospitality",
    size: "5,000–10,000",
    location: "San Francisco, CA",
    rating: 4.6,
    reviews: 4200,
    openings: 74,
    type: "Public",
    founded: 2008,
    tags: ["Remote Friendly", "Best Culture"],
    desc: "Airbnb connects hosts and guests to create a world where anyone can belong anywhere, in over 220 countries worldwide.",
    perks: ["Travel Credits", "Stock Options", "Remote First", "Wellness Budget"],
  },
  {
    id: 9,
    name: "Netflix",
    initials: "N",
    color: "#E50914",
    industry: "Entertainment / Streaming",
    size: "10,000–50,000",
    location: "Los Gatos, CA",
    rating: 4.8,
    reviews: 5600,
    openings: 112,
    type: "Public",
    founded: 1997,
    tags: ["Top Payer", "Best Culture", "Prestigious"],
    desc: "Netflix is the world's leading streaming entertainment service, with 260+ million paid memberships in 190+ countries.",
    perks: ["Unlimited PTO", "Top-tier Salary", "Freedom & Responsibility", "Health Benefits"],
  },
  {
    id: 10,
    name: "Shopify",
    initials: "Sh",
    color: "#96BF48",
    industry: "E-Commerce",
    size: "10,000–50,000",
    location: "Ottawa, Canada",
    rating: 4.7,
    reviews: 3800,
    openings: 143,
    type: "Public",
    founded: 2006,
    tags: ["Remote Friendly", "Fast Growth"],
    desc: "Shopify provides essential internet infrastructure for commerce, giving merchants tools to build businesses online and offline.",
    perks: ["Remote First", "Equity", "Learning Budget", "Annual Retreat"],
  },
  {
    id: 11,
    name: "Figma",
    initials: "Fi",
    color: "#F24E1E",
    industry: "Design Tools",
    size: "1,000–5,000",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 1400,
    openings: 55,
    type: "Private",
    founded: 2012,
    tags: ["Best Culture", "Fast Growth", "Remote Friendly"],
    desc: "Figma is a collaborative interface design tool that helps teams design, prototype, and handoff work all in one place.",
    perks: ["Equity", "Remote Work", "Creative Culture", "Conference Budget"],
  },
  {
    id: 12,
    name: "Notion",
    initials: "No",
    color: "#191919",
    industry: "Productivity SaaS",
    size: "500–1,000",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 920,
    openings: 38,
    type: "Private",
    founded: 2016,
    tags: ["Remote Friendly", "Best Culture", "Fast Growth"],
    desc: "Notion is a connected workspace for teams — combining docs, wikis, databases, and project management in one product.",
    perks: ["Remote Work", "Equity", "Catered Lunches", "Learning Stipend"],
  },
];

const INDUSTRIES = ["All", "Technology", "FinTech", "Artificial Intelligence", "E-Commerce", "Design Tools", "Entertainment / Streaming", "Social Media", "Productivity SaaS", "Travel & Hospitality", "Consumer Technology"];
const SIZES      = ["All Sizes", "500–1,000", "1,000–5,000", "5,000–10,000", "10,000–50,000", "50,000–100,000", "100,000+"];
const TYPES      = ["All Types", "Public", "Private"];
const SORT_OPTS  = [
  { v: "top",      l: "Top Rated"     },
  { v: "openings", l: "Most Openings" },
  { v: "reviews",  l: "Most Reviews"  },
  { v: "newest",   l: "Newest"        },
];
const TAGS       = ["Remote Friendly", "Top Payer", "Best Culture", "Fast Growth", "Cutting Edge", "Prestigious"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Stars({ value, size = 13 }) {
  return (
    <div style={{ display: "flex", gap: "1px" }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: `${size}px`, color: i <= Math.round(value) ? "#F59E0B" : C.border, lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

function TagBadge({ label, active, onClick }) {
  const tagColors = {
    "Remote Friendly": { bg: C.bluePale,  color: C.blue,  border: C.blueSoft },
    "Top Payer":       { bg: "#FEF3C7",   color: "#B45309", border: "#FDE68A" },
    "Best Culture":    { bg: "#DCFCE7",   color: "#15803D", border: "#BBF7D0" },
    "Fast Growth":     { bg: "#F3E5F5",   color: "#7B1FA2", border: "#CE93D8" },
    "Cutting Edge":    { bg: "#E0F2F1",   color: "#00695C", border: "#80CBC4" },
    "Prestigious":     { bg: "#FFF3E0",   color: "#E65100", border: "#FFCC80" },
  };
  const t = tagColors[label] || { bg: C.grayLight, color: C.gray, border: C.border };
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        background: active ? t.color : t.bg,
        border: `1px solid ${t.border}`,
        color: active ? "#fff" : t.color,
        fontSize: "11px",
        fontWeight: 700,
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >{label}</span>
  );
}

function PerkBadge({ label }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "6px",
      background: C.grayLight,
      border: `1px solid ${C.border}`,
      color: C.grayDark,
      fontSize: "11px",
      fontWeight: 600,
    }}>{label}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: C.bluePale,
      border: `1px solid ${C.blueSoft}`,
      color: C.blueMid,
      fontSize: "11px", fontWeight: 700,
      letterSpacing: "1.2px", textTransform: "uppercase",
      padding: "5px 16px", borderRadius: "20px",
      marginBottom: "12px",
    }}>{children}</span>
  );
}


// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ search, setSearch }) {
  return (
    <section style={{
      background: `linear-gradient(150deg, ${C.navy} 0%, #0D2B4A 55%, #1565C0 100%)`,
      padding: "72px 48px 88px",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      {[480, 340, 200].map((sz, i) => (
        <div key={i} style={{
          position: "absolute", width: `${sz}px`, height: `${sz}px`,
          borderRadius: "50%", border: `1px solid rgba(66,165,245,${0.05 + i * 0.04})`,
          top: `${-sz/2 + i*25}px`, right: `${-sz/2 + i*25}px`,
        }} />
      ))}
      <div style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(33,150,243,0.1)", filter: "blur(70px)", bottom: "-80px", left: "-60px" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(66,165,245,0.15)", border: "1px solid rgba(66,165,245,0.3)",
            color: "#90CAF9", fontSize: "11px", fontWeight: 700,
            letterSpacing: "1.2px", textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#42A5F5", display: "inline-block" }} />
            4,800+ Verified Companies
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(34px, 5vw, 56px)",
          fontWeight: 700, color: "#fff",
          lineHeight: 1.12, letterSpacing: "-1.5px",
          margin: "0 0 16px",
        }}>
          Explore Top Companies
          <br />
          <span style={{ background: "linear-gradient(90deg, #42A5F5, #90CAF9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Hiring Right Now
          </span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "17px", lineHeight: 1.75, marginBottom: "36px" }}>
          Research company culture, salaries, reviews and open roles — all in one place.
        </p>

        {/* Search */}
        <div style={{
          maxWidth: "540px", margin: "0 auto",
          background: C.white, borderRadius: "12px",
          padding: "6px 6px 6px 0",
          display: "flex", gap: "0",
          boxShadow: "0 20px 60px rgba(7,25,46,0.25)",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search company name or industry…"
              style={{
                width: "100%", padding: "13px 14px 13px 44px",
                border: "none", background: "transparent",
                fontSize: "14px", color: C.navy, outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>
          <button style={{
            padding: "0 28px", borderRadius: "8px", border: "none",
            background: `linear-gradient(135deg, ${C.blue}, ${C.blueAcc})`,
            color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(21,101,192,0.3)",
          }}>Search</button>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "32px" }}>
          {[["4,800+", "Companies"], ["25,000+", "Open Roles"], ["18,000+", "Hires Made"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff", fontFamily: "'Georgia', serif", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED STRIP ───────────────────────────────────────────────────────────
function FeaturedStrip() {
  const featured = COMPANIES.slice(0, 6);
  return (
    <section style={{ background: C.bluePale, borderBottom: `1px solid ${C.blueSoft}`, padding: "28px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.gray, whiteSpace: "nowrap" }}>Featured</span>
          <div style={{ width: "1px", height: "20px", background: C.border }} />
          {featured.map(co => (
            <div key={co.id} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "6px",
                background: co.color + "18", border: `1px solid ${co.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: 800, color: co.color,
              }}>{co.initials}</div>
              <span style={{ fontSize: "13px", fontWeight: 600, color: C.navy }}>{co.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPANY CARD ─────────────────────────────────────────────────────────────
function CompanyCard({ co, view }) {
  const [hov, setHov] = useState(false);
  const [following, setFollowing] = useState(false);

  if (view === "list") {
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: C.white,
          border: `1.5px solid ${hov ? C.blueAcc : C.border}`,
          borderRadius: "14px",
          padding: "20px 24px",
          display: "flex", alignItems: "center", gap: "20px",
          transition: "all 0.2s",
          transform: hov ? "translateX(4px)" : "none",
          boxShadow: hov ? "0 6px 28px rgba(21,101,192,0.1)" : "0 2px 8px rgba(10,30,60,0.04)",
        }}
      >
        {/* Logo */}
        <div style={{
          width: "56px", height: "56px", borderRadius: "12px",
          background: co.color + "15", border: `1.5px solid ${co.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 800, color: co.color, flexShrink: 0,
        }}>{co.initials}</div>

        {/* Main info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "17px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>{co.name}</span>
            <span style={{
              padding: "2px 8px", borderRadius: "4px",
              background: co.type === "Public" ? C.bluePale : C.greenPale,
              border: `1px solid ${co.type === "Public" ? C.blueSoft : C.greenBd}`,
              color: co.type === "Public" ? C.blue : C.green,
              fontSize: "10px", fontWeight: 700,
            }}>{co.type}</span>
          </div>
          <div style={{ fontSize: "12px", color: C.gray, marginBottom: "6px" }}>
            {co.industry} · 📍 {co.location} · Est. {co.founded}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {co.tags.slice(0, 3).map(t => <TagBadge key={t} label={t} />)}
          </div>
        </div>

        {/* Rating */}
        <div style={{ textAlign: "center", minWidth: "80px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: C.navy, lineHeight: 1 }}>{co.rating}</div>
          <Stars value={co.rating} size={12} />
          <div style={{ fontSize: "11px", color: C.gray, marginTop: "2px" }}>{(co.reviews / 1000).toFixed(1)}k reviews</div>
        </div>

        {/* Openings */}
        <div style={{ textAlign: "center", minWidth: "80px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: C.blue, lineHeight: 1 }}>{co.openings}</div>
          <div style={{ fontSize: "11px", color: C.gray, marginTop: "2px" }}>open roles</div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={() => setFollowing(!following)}
            style={{
              padding: "9px 16px", borderRadius: "8px",
              border: `1.5px solid ${following ? C.blueSoft : C.border}`,
              background: following ? C.bluePale : "transparent",
              color: following ? C.blue : C.grayDark,
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              transition: "all 0.15s",
            }}
          >{following ? "✓ Following" : "+ Follow"}</button>
          <button style={{
            padding: "9px 20px", borderRadius: "8px", border: "none",
            background: `linear-gradient(135deg, ${C.blue}, ${C.blueAcc})`,
            color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer",
          }}>View Jobs</button>
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1.5px solid ${hov ? C.blueAcc : C.border}`,
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.22s",
        transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? "0 14px 44px rgba(21,101,192,0.13)" : "0 2px 10px rgba(10,30,60,0.05)",
        display: "flex", flexDirection: "column", gap: "14px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "54px", height: "54px", borderRadius: "13px",
          background: co.color + "15", border: `1.5px solid ${co.color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 800, color: co.color,
        }}>{co.initials}</div>
        <span style={{
          padding: "3px 10px", borderRadius: "6px",
          background: co.type === "Public" ? C.bluePale : C.greenPale,
          border: `1px solid ${co.type === "Public" ? C.blueSoft : C.greenBd}`,
          color: co.type === "Public" ? C.blue : C.green,
          fontSize: "10px", fontWeight: 700,
        }}>{co.type}</span>
      </div>

      {/* Name + meta */}
      <div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif", marginBottom: "4px" }}>{co.name}</div>
        <div style={{ fontSize: "12px", color: C.gray }}>{co.industry}</div>
      </div>

      {/* Desc */}
      <p style={{ fontSize: "13px", color: C.grayDark, lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {co.desc}
      </p>

      {/* Meta row */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
        {[["📍", co.location], ["👥", co.size], ["📅", `Est. ${co.founded}`]].map(([icon, val]) => (
          <span key={val} style={{ fontSize: "11px", color: C.gray, display: "flex", alignItems: "center", gap: "3px" }}>
            <span>{icon}</span> {val}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {co.tags.slice(0, 2).map(t => <TagBadge key={t} label={t} />)}
      </div>

      {/* Perks */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {co.perks.slice(0, 3).map(p => <PerkBadge key={p} label={p} />)}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: C.border }} />

      {/* Rating + openings */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, color: C.navy }}>{co.rating}</span>
            <Stars value={co.rating} size={13} />
          </div>
          <div style={{ fontSize: "11px", color: C.gray, marginTop: "1px" }}>{(co.reviews/1000).toFixed(1)}k reviews</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: C.blue, lineHeight: 1 }}>{co.openings}</div>
          <div style={{ fontSize: "11px", color: C.gray }}>open roles</div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setFollowing(!following)}
          style={{
            flex: 1, padding: "9px 0", borderRadius: "8px",
            border: `1.5px solid ${following ? C.blueSoft : C.border}`,
            background: following ? C.bluePale : "transparent",
            color: following ? C.blue : C.grayDark,
            fontSize: "12px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >{following ? "✓ Following" : "+ Follow"}</button>
        <button style={{
          flex: 2, padding: "9px 0", borderRadius: "8px", border: "none",
          background: `linear-gradient(135deg, ${C.blue}, ${C.blueAcc})`,
          color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer",
        }}>View {co.openings} Jobs →</button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CompaniesPage() {
  const [search,       setSearch]       = useState("");
  const [industry,     setIndustry]     = useState("All");
  const [size,         setSize]         = useState("All Sizes");
  const [type,         setType]         = useState("All Types");
  const [activeTag,    setActiveTag]    = useState(null);
  const [sort,         setSort]         = useState("top");
  const [view,         setView]         = useState("grid"); // "grid" | "list"

  const filtered = useMemo(() => {
    let r = COMPANIES.filter(co => {
      const q   = search.toLowerCase();
      const kw  = co.name.toLowerCase().includes(q) || co.industry.toLowerCase().includes(q) || co.location.toLowerCase().includes(q);
      const ind = industry === "All" || co.industry === industry;
      const sz  = size === "All Sizes" || co.size === size;
      const tp  = type === "All Types" || co.type === type;
      const tag = !activeTag || co.tags.includes(activeTag);
      return kw && ind && sz && tp && tag;
    });
    if (sort === "top")      r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "openings") r = [...r].sort((a, b) => b.openings - a.openings);
    if (sort === "reviews")  r = [...r].sort((a, b) => b.reviews - a.reviews);
    if (sort === "newest")   r = [...r].sort((a, b) => b.founded - a.founded);
    return r;
  }, [search, industry, size, type, activeTag, sort]);

  const selectStyle = {
    padding: "9px 14px", borderRadius: "8px",
    border: `1.5px solid ${C.border}`,
    background: C.white, color: C.grayDark,
    fontSize: "13px", fontWeight: 600,
    cursor: "pointer", outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* <Navbar /> */}
      <Hero search={search} setSearch={setSearch} />
      <FeaturedStrip />

      {/* ── TAG PILLS ─────────────────────────────────────────────── */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "16px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: C.gray, letterSpacing: "0.5px" }}>Filter by:</span>
          {TAGS.map(tag => (
            <TagBadge
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
          {activeTag && (
            <button onClick={() => setActiveTag(null)} style={{ padding: "3px 10px", borderRadius: "20px", border: `1px solid ${C.border}`, background: "transparent", color: C.gray, fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 48px 80px", display: "grid", gridTemplateColumns: "240px 1fr", gap: "28px", alignItems: "flex-start" }}>

        {/* ── SIDEBAR ─────────────────────────────────────────────── */}
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

          {/* Industry */}
     

          <div style={{ height: "1px", background: C.border, margin: "16px 0" }} />

          {/* Company Size */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: C.gray, marginBottom: "10px" }}>Company Size</div>
            {SIZES.map(s => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
                <div
                  onClick={() => setSize(s)}
                  style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: `2px solid ${size === s ? C.blue : C.border}`,
                    background: size === s ? C.blue : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, cursor: "pointer",
                  }}
                >
                  {size === s && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
                </div>
                <span style={{ fontSize: "13px", color: size === s ? C.navy : C.grayDark, fontWeight: size === s ? 600 : 400 }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ height: "1px", background: C.border, margin: "16px 0" }} />

          {/* Type */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: C.gray, marginBottom: "10px" }}>Company Type</div>
            {TYPES.map(t => (
              <label key={t} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
                <div
                  onClick={() => setType(t)}
                  style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: `2px solid ${type === t ? C.blue : C.border}`,
                    background: type === t ? C.blue : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, cursor: "pointer",
                  }}
                >
                  {type === t && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
                </div>
                <span style={{ fontSize: "13px", color: type === t ? C.navy : C.grayDark, fontWeight: type === t ? 600 : 400 }}>{t}</span>
              </label>
            ))}
          </div>

          {/* Clear all */}
          {(industry !== "All" || size !== "All Sizes" || type !== "All Types" || activeTag) && (
            <button
              onClick={() => { setIndustry("All"); setSize("All Sizes"); setType("All Types"); setActiveTag(null); }}
              style={{
                marginTop: "20px", width: "100%", padding: "9px",
                borderRadius: "8px", border: `1.5px solid ${C.border}`,
                background: "transparent", color: C.gray,
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}
            >✕ Clear All Filters</button>
          )}
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
        <div>
          {/* Results bar */}
          <div style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: "12px", padding: "14px 20px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "18px",
          }}>
            <div>
              <span style={{ fontSize: "20px", fontWeight: 700, color: C.navy, fontFamily: "'Georgia', serif" }}>{filtered.length} companies</span>
              <span style={{ fontSize: "13px", color: C.gray, marginLeft: "8px" }}>match your criteria</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
                {SORT_OPTS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
              {/* View toggle */}
              <div style={{ display: "flex", borderRadius: "8px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {[["grid", "⊞"], ["list", "☰"]].map(([v, icon]) => (
                  <button key={v} onClick={() => setView(v)} style={{
                    padding: "8px 12px", border: "none",
                    background: view === v ? C.bluePale : C.white,
                    color: view === v ? C.blue : C.gray,
                    fontSize: "16px", cursor: "pointer",
                    borderRight: v === "grid" ? `1px solid ${C.border}` : "none",
                    fontWeight: view === v ? 700 : 400,
                  }}>{icon}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div style={{
              background: C.white, border: `1px solid ${C.border}`, borderRadius: "14px",
              padding: "64px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏢</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: C.navy, marginBottom: "6px" }}>No companies found</div>
              <div style={{ fontSize: "14px", color: C.gray }}>Try adjusting your search or filters.</div>
            </div>
          ) : (
            <div style={view === "grid" ? {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "18px",
            } : {
              display: "flex", flexDirection: "column", gap: "12px",
            }}>
              {filtered.map(co => <CompanyCard key={co.id} co={co} view={view} />)}
            </div>
          )}

          {/* Load more */}
          {filtered.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <button style={{
                padding: "13px 40px", borderRadius: "10px",
                border: `1.5px solid ${C.border}`, background: C.white,
                color: C.blue, fontSize: "14px", fontWeight: 700, cursor: "pointer",
              }}>Load More Companies</button>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <section style={{ padding: "0 48px 72px" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          background: `linear-gradient(135deg, ${C.navy} 0%, #1565C0 100%)`,
          borderRadius: "20px", padding: "52px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", right: "-80px", top: "-80px" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", marginBottom: "8px" }}>
              Is your company hiring?
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", margin: 0 }}>
              Reach 120,000+ qualified candidates. Post your first role today.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexShrink: 0, position: "relative", zIndex: 2 }}>
            <button style={{
              padding: "13px 28px", borderRadius: "10px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              background: "transparent", color: "#fff",
              fontSize: "14px", fontWeight: 600, cursor: "pointer",
            }}>Learn More</button>
            <button style={{
              padding: "13px 28px", borderRadius: "10px", border: "none",
              background: C.white, color: C.blue,
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
            }}>Post a Job →</button>
          </div>
        </div>
      </section>


    </div>
  );
}