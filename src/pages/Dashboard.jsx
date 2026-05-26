import { useState, useMemo } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  navy:"#07192E",navyMid:"#0D2B4A",blue:"#1565C0",blueMid:"#1976D2",blueAcc:"#2196F3",
  bluePale:"#E3F2FD",blueSoft:"#BBDEFB",white:"#FFFFFF",offWhite:"#F7FAFF",
  border:"#DDEAFC",gray:"#6B7A99",grayLight:"#EEF2F7",grayDark:"#3D4A63",
  green:"#15803D",greenPale:"#DCFCE7",greenBd:"#BBF7D0",
  amber:"#B45309",amberPale:"#FEF3C7",amberBd:"#FDE68A",
  red:"#DC2626",redPale:"#FEF2F2",redBd:"#FECACA",
  purple:"#7C3AED",purplePale:"#EDE9FE",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const USER = { name:"Alex Johnson", role:"Senior React Developer", avatar:"AJ", email:"alex@email.com", location:"San Francisco, CA", resume:"resume_alex_johnson.pdf", profilePct:78 };

const APPLICATIONS = [
  { id:1, title:"Senior React Developer",   company:"Google",    logo:"G",  lc:"#4285F4", applied:"May 20, 2025", status:"Interview",  salary:"$130k–$160k", type:"Full Time", loc:"San Francisco" },
  { id:2, title:"Frontend Engineer",        company:"Stripe",    logo:"S",  lc:"#635BFF", applied:"May 18, 2025", status:"Applied",    salary:"$120k–$150k", type:"Hybrid",    loc:"New York" },
  { id:3, title:"UI Engineer",              company:"Figma",     logo:"Fi", lc:"#F24E1E", applied:"May 15, 2025", status:"Rejected",   salary:"$100k–$130k", type:"Remote",    loc:"Remote" },
  { id:4, title:"React Native Developer",   company:"Airbnb",    logo:"Ab", lc:"#FF5A5F", applied:"May 12, 2025", status:"Offered",    salary:"$125k–$155k", type:"Hybrid",    loc:"San Francisco" },
  { id:5, title:"Software Engineer II",     company:"Microsoft", logo:"Ms", lc:"#00A4EF", applied:"May 10, 2025", status:"Applied",    salary:"$115k–$145k", type:"Full Time", loc:"Redmond, WA" },
  { id:6, title:"Product Engineer",         company:"Notion",    logo:"No", lc:"#191919", applied:"May 8, 2025",  status:"Screening",  salary:"$110k–$140k", type:"Remote",    loc:"Remote" },
];

const SAVED_JOBS = [
  { id:7,  title:"Staff Engineer",          company:"OpenAI",    logo:"AI", lc:"#10a37f", salary:"$180k+",        type:"Full Time", loc:"SF" },
  { id:8,  title:"Frontend Architect",      company:"Netflix",   logo:"N",  lc:"#E50914", salary:"$160k–$200k",   type:"Full Time", loc:"LA" },
  { id:9,  title:"Senior Engineer",         company:"Shopify",   logo:"Sh", lc:"#96BF48", salary:"$130k–$160k",   type:"Remote",    loc:"Remote" },
];

const RECOMMENDED = [
  { id:10, title:"Senior Frontend Dev",     company:"Meta",      logo:"M",  lc:"#0866FF", salary:"$140k–$175k",   type:"Remote",    match:96 },
  { id:11, title:"React Lead",              company:"Amazon",    logo:"Az", lc:"#FF9900", salary:"$150k–$185k",   type:"Full Time", match:91 },
  { id:12, title:"Principal Engineer",      company:"Apple",     logo:"🍎", lc:"#555",    salary:"$170k–$210k",   type:"Full Time", match:88 },
  { id:13, title:"UI/UX Engineer",          company:"Airbnb",    logo:"Ab", lc:"#FF5A5F", salary:"$120k–$150k",   type:"Hybrid",    match:85 },
];

const INTERVIEWS = [
  { id:1, company:"Google",  logo:"G",  lc:"#4285F4", role:"Senior React Developer", date:"May 28, 2025", time:"2:00 PM PST", round:"Technical Round 2", type:"Video Call" },
  { id:2, company:"Airbnb",  logo:"Ab", lc:"#FF5A5F", role:"React Native Developer", date:"May 30, 2025", time:"11:00 AM PST", round:"HR Discussion",     type:"Video Call" },
];

const NAV_ITEMS = [
  { key:"overview",      icon:"⊞",  label:"Overview"        },
  { key:"applications",  icon:"📋", label:"Applications"    },
  { key:"interviews",    icon:"📅", label:"Interviews"      },
  { key:"saved",         icon:"🔖", label:"Saved Jobs"      },
  { key:"recommended",   icon:"✨", label:"Recommended"     },
  { key:"profile",       icon:"👤", label:"My Profile"      },
];

const STATUS_META = {
  Applied:   { color:C.blue,   bg:C.bluePale,  border:C.blueSoft, icon:"📩" },
  Screening: { color:C.amber,  bg:C.amberPale, border:C.amberBd,  icon:"🔍" },
  Interview: { color:C.purple, bg:C.purplePale,border:"#C4B5FD",  icon:"🎙️" },
  Offered:   { color:C.green,  bg:C.greenPale, border:C.greenBd,  icon:"🎉" },
  Rejected:  { color:C.red,    bg:C.redPale,   border:C.redBd,    icon:"✕"  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META["Applied"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"3px 10px", borderRadius:"20px", background:m.bg, border:`1px solid ${m.border}`, color:m.color, fontSize:"11px", fontWeight:700, whiteSpace:"nowrap" }}>
      {m.icon} {status}
    </span>
  );
}

function LogoBox({ logo, lc, size=40 }) {
  return (
    <div style={{ width:`${size}px`, height:`${size}px`, borderRadius:`${size/4}px`, background:lc+"18", border:`1.5px solid ${lc}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:`${size/3}px`, fontWeight:800, color:lc, flexShrink:0 }}>
      {logo}
    </div>
  );
}

function StatCard({ icon, value, label, sub, color=C.blue, bg=C.bluePale }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"20px", display:"flex", alignItems:"center", gap:"14px", boxShadow:"0 2px 10px rgba(10,30,60,0.05)" }}>
      <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:"26px", fontWeight:800, color:C.navy, lineHeight:1, fontFamily:"'Georgia', serif" }}>{value}</div>
        <div style={{ fontSize:"13px", fontWeight:600, color:C.grayDark, marginTop:"2px" }}>{label}</div>
        {sub && <div style={{ fontSize:"11px", color:C.gray, marginTop:"2px" }}>{sub}</div>}
      </div>
    </div>
  );
}

function SectionHeader({ title, sub, action, onAction }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
      <div>
        <div style={{ fontSize:"18px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif" }}>{title}</div>
        {sub && <div style={{ fontSize:"13px", color:C.gray, marginTop:"2px" }}>{sub}</div>}
      </div>
      {action && <button onClick={onAction} style={{ padding:"7px 16px", borderRadius:"8px", border:`1.5px solid ${C.border}`, background:"transparent", color:C.blue, fontSize:"12px", fontWeight:700, cursor:"pointer" }}>{action}</button>}
    </div>
  );
}

// ─── VIEWS ────────────────────────────────────────────────────────────────────
function Overview({ setPage }) {
  const counts = useMemo(() => {
    const r = { Applied:0, Screening:0, Interview:0, Offered:0, Rejected:0 };
    APPLICATIONS.forEach(a => r[a.status]++);
    return r;
  }, []);

  return (
    <div>
      {/* Welcome banner */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #1565C0 100%)`, borderRadius:"16px", padding:"28px 32px", marginBottom:"24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:"200px", height:"200px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.07)", right:"-40px", top:"-40px" }} />
        <div style={{ position:"relative", zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", marginBottom:"4px" }}>Good morning 👋</div>
            <div style={{ fontSize:"26px", fontWeight:700, color:"#fff", fontFamily:"'Georgia', serif", marginBottom:"6px" }}>Welcome back, {USER.name.split(" ")[0]}!</div>
            <div style={{ fontSize:"14px", color:"rgba(255,255,255,0.65)" }}>You have <strong style={{color:"#90CAF9"}}>{INTERVIEWS.length} interviews</strong> coming up this week.</div>
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={()=>setPage("applications")} style={{ padding:"10px 20px", borderRadius:"9px", border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.1)", color:"#fff", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>View Applications</button>
            <button style={{ padding:"10px 20px", borderRadius:"9px", border:"none", background:C.white, color:C.blue, fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Browse Jobs →</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginBottom:"24px" }}>
        <StatCard icon="📋" value={APPLICATIONS.length} label="Total Applied" sub="Last 30 days" />
        <StatCard icon="🎙️" value={counts.Interview}    label="Interviews"   sub="Scheduled"   color={C.purple} bg={C.purplePale} />
        <StatCard icon="🎉" value={counts.Offered}      label="Offers"       sub="Active"      color={C.green}  bg={C.greenPale}  />
        <StatCard icon="🔖" value={SAVED_JOBS.length}   label="Saved Jobs"   sub="In watchlist" />
      </div>

      {/* Application pipeline */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px 24px", marginBottom:"24px" }}>
        <SectionHeader title="Application Pipeline" />
        <div style={{ display:"flex", gap:"0" }}>
          {Object.entries(STATUS_META).map(([status, m], i, arr) => {
            const cnt = counts[status] || 0;
            return (
              <div key={status} style={{ flex:1, position:"relative" }}>
                <div style={{ background:m.bg, border:`1px solid ${m.border}`, borderRadius: i===0?"10px 0 0 10px":i===arr.length-1?"0 10px 10px 0":"0", padding:"14px 16px", textAlign:"center", borderRight: i<arr.length-1 ? "none" : `1px solid ${m.border}` }}>
                  <div style={{ fontSize:"20px", marginBottom:"4px" }}>{m.icon}</div>
                  <div style={{ fontSize:"22px", fontWeight:800, color:m.color, fontFamily:"'Georgia', serif" }}>{cnt}</div>
                  <div style={{ fontSize:"11px", fontWeight:600, color:m.color, marginTop:"2px" }}>{status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-col: upcoming interviews + recent apps */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"24px" }}>
        {/* Upcoming interviews */}
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px 24px" }}>
          <SectionHeader title="Upcoming Interviews" action="View All" onAction={()=>setPage("interviews")} />
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {INTERVIEWS.map(iv => (
              <div key={iv.id} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"12px", borderRadius:"10px", background:C.offWhite, border:`1px solid ${C.border}` }}>
                <LogoBox logo={iv.logo} lc={iv.lc} size={40} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"14px", fontWeight:700, color:C.navy }}>{iv.role}</div>
                  <div style={{ fontSize:"12px", color:C.gray }}>{iv.company} · {iv.round}</div>
                  <div style={{ display:"flex", gap:"10px", marginTop:"6px" }}>
                    <span style={{ fontSize:"11px", color:C.blue, fontWeight:600 }}>📅 {iv.date}</span>
                    <span style={{ fontSize:"11px", color:C.gray }}>🕐 {iv.time}</span>
                  </div>
                </div>
                <span style={{ padding:"3px 8px", borderRadius:"6px", background:C.purplePale, color:C.purple, fontSize:"10px", fontWeight:700, border:`1px solid #C4B5FD`, whiteSpace:"nowrap" }}>{iv.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent applications */}
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px 24px" }}>
          <SectionHeader title="Recent Applications" action="View All" onAction={()=>setPage("applications")} />
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {APPLICATIONS.slice(0,4).map(app => (
              <div key={app.id} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <LogoBox logo={app.logo} lc={app.lc} size={36} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"13px", fontWeight:700, color:C.navy }}>{app.title}</div>
                  <div style={{ fontSize:"11px", color:C.gray }}>{app.company} · {app.applied}</div>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px 24px" }}>
        <SectionHeader title="Recommended for You" sub="Based on your profile and preferences" action="View All" onAction={()=>setPage("recommended")} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
          {RECOMMENDED.map(job => (
            <div key={job.id} style={{ border:`1px solid ${C.border}`, borderRadius:"12px", padding:"16px", position:"relative" }}>
              <div style={{ position:"absolute", top:"10px", right:"10px", background:C.greenPale, border:`1px solid ${C.greenBd}`, color:C.green, fontSize:"10px", fontWeight:800, padding:"2px 7px", borderRadius:"20px" }}>{job.match}% match</div>
              <LogoBox logo={job.logo} lc={job.lc} size={38} />
              <div style={{ fontSize:"13px", fontWeight:700, color:C.navy, marginTop:"10px", marginBottom:"3px" }}>{job.title}</div>
              <div style={{ fontSize:"11px", color:C.gray, marginBottom:"8px" }}>{job.company}</div>
              <div style={{ fontSize:"12px", fontWeight:700, color:C.blue, marginBottom:"10px" }}>{job.salary}</div>
              <button style={{ width:"100%", padding:"8px 0", borderRadius:"7px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplicationsView() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", ...Object.keys(STATUS_META)];
  const filtered = filter === "All" ? APPLICATIONS : APPLICATIONS.filter(a => a.status === filter);

  return (
    <div>
      <SectionHeader title="My Applications" sub={`${APPLICATIONS.length} total applications`} />
      {/* Filter tabs */}
      <div style={{ display:"flex", gap:"6px", marginBottom:"20px", flexWrap:"wrap" }}>
        {statuses.map(s => {
          const m = STATUS_META[s];
          const active = filter === s;
          return (
            <button key={s} onClick={()=>setFilter(s)} style={{ padding:"6px 16px", borderRadius:"20px", border:`1.5px solid ${active ? (m?.border || C.border) : C.border}`, background: active ? (m?.bg || C.bluePale) : "transparent", color: active ? (m?.color || C.blue) : C.gray, fontSize:"13px", fontWeight: active ? 700 : 500, cursor:"pointer", transition:"all 0.15s" }}>
              {s !== "All" && m?.icon + " "}{s} {s === "All" ? `(${APPLICATIONS.length})` : `(${APPLICATIONS.filter(a=>a.status===s).length})`}
            </button>
          );
        })}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {filtered.map(app => (
          <div key={app.id} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"20px 24px", display:"flex", alignItems:"center", gap:"16px", boxShadow:"0 2px 8px rgba(10,30,60,0.04)" }}>
            <LogoBox logo={app.logo} lc={app.lc} size={50} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                <span style={{ fontSize:"17px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif" }}>{app.title}</span>
                <StatusBadge status={app.status} />
              </div>
              <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
                {[["🏢",app.company],["📍",app.loc],["💼",app.type],["💰",app.salary],["📅","Applied "+app.applied]].map(([ic,v])=>(
                  <span key={v} style={{ fontSize:"12px", color:C.gray, display:"flex", alignItems:"center", gap:"3px" }}><span>{ic}</span>{v}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:"8px", flexShrink:0 }}>
              <button style={{ padding:"8px 16px", borderRadius:"8px", border:`1.5px solid ${C.border}`, background:"transparent", color:C.grayDark, fontSize:"12px", fontWeight:600, cursor:"pointer" }}>View Details</button>
              {app.status !== "Rejected" && <button style={{ padding:"8px 16px", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Message HR</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewsView() {
  return (
    <div>
      <SectionHeader title="Scheduled Interviews" sub={`${INTERVIEWS.length} upcoming interviews`} />
      <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
        {INTERVIEWS.map(iv => (
          <div key={iv.id} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"24px", display:"flex", gap:"20px", alignItems:"flex-start", boxShadow:"0 2px 10px rgba(10,30,60,0.05)" }}>
            <LogoBox logo={iv.logo} lc={iv.lc} size={54} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"19px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif", marginBottom:"4px" }}>{iv.role}</div>
              <div style={{ fontSize:"13px", color:C.gray, marginBottom:"12px" }}>{iv.company} · {iv.round}</div>
              <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
                {[["📅",iv.date],["🕐",iv.time],["📹",iv.type]].map(([ic,v])=>(
                  <div key={v} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", borderRadius:"8px", background:C.offWhite, border:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:"13px" }}>{ic}</span>
                    <span style={{ fontSize:"13px", fontWeight:600, color:C.grayDark }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", minWidth:"130px" }}>
              <button style={{ padding:"10px 0", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Join Call 📹</button>
              <button style={{ padding:"10px 0", borderRadius:"8px", border:`1.5px solid ${C.border}`, background:"transparent", color:C.grayDark, fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Add to Calendar</button>
              <button style={{ padding:"10px 0", borderRadius:"8px", border:`1.5px solid ${C.redBd}`, background:C.redPale, color:C.red, fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Reschedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedView() {
  const [saved, setSaved] = useState(SAVED_JOBS.map(j=>j.id));
  return (
    <div>
      <SectionHeader title="Saved Jobs" sub={`${saved.length} jobs in your watchlist`} />
      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {SAVED_JOBS.map(job => (
          <div key={job.id} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"20px 24px", display:"flex", alignItems:"center", gap:"16px" }}>
            <LogoBox logo={job.logo} lc={job.lc} size={50} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"17px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif", marginBottom:"4px" }}>{job.title}</div>
              <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
                {[["🏢",job.company],["📍",job.loc],["💼",job.type],["💰",job.salary]].map(([ic,v])=>(
                  <span key={v} style={{ fontSize:"12px", color:C.gray, display:"flex", alignItems:"center", gap:"3px" }}><span>{ic}</span>{v}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:"8px" }}>
              <button onClick={()=>setSaved(s=>s.filter(x=>x!==job.id))} style={{ padding:"8px 14px", borderRadius:"8px", border:`1.5px solid ${C.redBd}`, background:C.redPale, color:C.red, fontSize:"12px", fontWeight:600, cursor:"pointer" }}>🗑 Remove</button>
              <button style={{ padding:"8px 18px", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Apply Now →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedView() {
  return (
    <div>
      <SectionHeader title="Recommended Jobs" sub="AI-matched based on your profile and preferences" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"16px" }}>
        {RECOMMENDED.map(job => (
          <div key={job.id} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px", position:"relative" }}>
            <div style={{ position:"absolute", top:"14px", right:"14px", background:C.greenPale, border:`1px solid ${C.greenBd}`, color:C.green, fontSize:"11px", fontWeight:800, padding:"3px 10px", borderRadius:"20px" }}>{job.match}% match</div>
            <div style={{ display:"flex", gap:"14px", alignItems:"center", marginBottom:"12px" }}>
              <LogoBox logo={job.logo} lc={job.lc} size={48} />
              <div>
                <div style={{ fontSize:"17px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif" }}>{job.title}</div>
                <div style={{ fontSize:"12px", color:C.gray }}>{job.company} · {job.loc || "Remote"}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
              <span style={{ padding:"3px 10px", borderRadius:"20px", background:C.bluePale, border:`1px solid ${C.blueSoft}`, color:C.blue, fontSize:"11px", fontWeight:700 }}>{job.type}</span>
              <span style={{ padding:"3px 10px", borderRadius:"20px", background:C.grayLight, border:`1px solid ${C.border}`, color:C.grayDark, fontSize:"11px", fontWeight:600 }}>{job.salary}</span>
            </div>
            <div style={{ display:"flex", gap:"8px" }}>
              <button style={{ flex:1, padding:"9px 0", borderRadius:"8px", border:`1.5px solid ${C.border}`, background:"transparent", color:C.grayDark, fontSize:"12px", fontWeight:600, cursor:"pointer" }}>Save 🔖</button>
              <button style={{ flex:2, padding:"9px 0", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Apply Now →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView() {
  const skills = ["React","TypeScript","Node.js","GraphQL","CSS/SASS","Jest","Figma","AWS"];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"20px" }}>
      {/* Left card */}
      <div>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"24px", textAlign:"center", marginBottom:"16px" }}>
          <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:800, color:"#fff", margin:"0 auto 12px" }}>{USER.avatar}</div>
          <div style={{ fontSize:"18px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif" }}>{USER.name}</div>
          <div style={{ fontSize:"13px", color:C.gray, marginBottom:"12px" }}>{USER.role}</div>
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", flexWrap:"wrap", marginBottom:"14px" }}>
            {["📍 "+USER.location, "✉️ "+USER.email].map(t=><span key={t} style={{ fontSize:"11px", color:C.grayDark }}>{t}</span>)}
          </div>
          <div style={{ height:"6px", borderRadius:"6px", background:C.grayLight, marginBottom:"6px", overflow:"hidden" }}>
            <div style={{ width:`${USER.profilePct}%`, height:"100%", borderRadius:"6px", background:`linear-gradient(90deg,${C.blue},${C.blueAcc})` }} />
          </div>
          <div style={{ fontSize:"11px", color:C.gray }}>Profile {USER.profilePct}% complete</div>
          <button style={{ marginTop:"14px", width:"100%", padding:"9px", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Edit Profile</button>
        </div>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"20px" }}>
          <div style={{ fontSize:"14px", fontWeight:700, color:C.navy, marginBottom:"12px" }}>📄 Resume</div>
          <div style={{ padding:"12px", borderRadius:"8px", background:C.offWhite, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"22px" }}>📄</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"12px", fontWeight:600, color:C.navy }}>{USER.resume}</div>
              <div style={{ fontSize:"11px", color:C.gray }}>Uploaded May 1, 2025</div>
            </div>
          </div>
          <button style={{ marginTop:"10px", width:"100%", padding:"8px", borderRadius:"8px", border:`1.5px solid ${C.border}`, background:"transparent", color:C.blue, fontSize:"12px", fontWeight:700, cursor:"pointer" }}>Upload New</button>
        </div>
      </div>

      {/* Right: details */}
      <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px" }}>
          <div style={{ fontSize:"16px", fontWeight:700, color:C.navy, marginBottom:"14px", fontFamily:"'Georgia', serif" }}>Skills & Expertise</div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {skills.map(s=><span key={s} style={{ padding:"5px 14px", borderRadius:"20px", background:C.bluePale, border:`1px solid ${C.blueSoft}`, color:C.blue, fontSize:"12px", fontWeight:700 }}>{s}</span>)}
            <button style={{ padding:"5px 14px", borderRadius:"20px", border:`1.5px dashed ${C.border}`, background:"transparent", color:C.gray, fontSize:"12px", fontWeight:600, cursor:"pointer" }}>+ Add Skill</button>
          </div>
        </div>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"22px" }}>
          <div style={{ fontSize:"16px", fontWeight:700, color:C.navy, marginBottom:"14px", fontFamily:"'Georgia', serif" }}>Work Preferences</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            {[["💼","Job Type","Full Time, Hybrid"],["📍","Location","San Francisco, Remote"],["💰","Salary Expectation","$120k – $160k"],["🗓","Availability","Immediately"]].map(([ic,label,val])=>(
              <div key={label} style={{ padding:"12px", borderRadius:"10px", background:C.offWhite, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:"11px", fontWeight:700, color:C.gray, letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"4px" }}>{ic} {label}</div>
                <div style={{ fontSize:"13px", fontWeight:600, color:C.navy }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function UserDashboard() {
  const [page, setPage] = useState("overview");

  const views = { overview:<Overview setPage={setPage}/>, applications:<ApplicationsView/>, interviews:<InterviewsView/>, saved:<SavedView/>, recommended:<RecommendedView/>, profile:<ProfileView/> };

  return (
    <div style={{ minHeight:"100vh", background:C.offWhite, fontFamily:"'Segoe UI', system-ui, sans-serif", display:"flex" }}>
      {/* ── SIDEBAR ─────────────────────────────── */}
      <div style={{ width:"230px", background:C.navy, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", flexShrink:0 }}>
        {/* Logo */}
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"linear-gradient(135deg,#42A5F5,#1565C0)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:800, color:"#fff" }}>C</div>
            <span style={{ color:"#fff", fontFamily:"'Georgia', serif", fontSize:"18px", fontWeight:700 }}>CareerHub</span>
          </div>
        </div>

        {/* User */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:800, color:"#fff", flexShrink:0 }}>{USER.avatar}</div>
          <div style={{ overflow:"hidden" }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{USER.name}</div>
            <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Job Seeker</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
          {NAV_ITEMS.map(item => {
            const active = page === item.key;
            return (
              <button key={item.key} onClick={()=>setPage(item.key)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"9px", border:"none", background: active ? "rgba(66,165,245,0.18)" : "transparent", color: active ? "#90CAF9" : "rgba(255,255,255,0.6)", fontSize:"13px", fontWeight: active ? 700 : 400, cursor:"pointer", marginBottom:"2px", textAlign:"left", transition:"all 0.15s", borderLeft: active ? `3px solid ${C.blueAcc}` : "3px solid transparent" }}>
                <span style={{ fontSize:"16px" }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:"14px 10px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <button style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"9px", border:"none", background:"rgba(220,38,38,0.12)", color:"rgba(248,113,113,0.9)", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
            <span style={{ fontSize:"16px" }}>🚪</span> Sign Out
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────── */}
      <div style={{ flex:1, overflow:"auto" }}>
        {/* Topbar */}
        <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"16px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:20 }}>
          <div>
            <div style={{ fontSize:"20px", fontWeight:700, color:C.navy, fontFamily:"'Georgia', serif" }}>{NAV_ITEMS.find(n=>n.key===page)?.label}</div>
            <div style={{ fontSize:"12px", color:C.gray }}>CareerHub · Job Seeker Portal</div>
          </div>
          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            <button style={{ position:"relative", padding:"8px 12px", borderRadius:"8px", border:`1px solid ${C.border}`, background:"transparent", cursor:"pointer", fontSize:"16px" }}>
              🔔
              <span style={{ position:"absolute", top:"5px", right:"5px", width:"7px", height:"7px", borderRadius:"50%", background:C.red, border:"1.5px solid #fff" }} />
            </button>
            <button style={{ padding:"8px 18px", borderRadius:"8px", border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueAcc})`, color:"#fff", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Browse Jobs</button>
          </div>
        </div>

        <div style={{ padding:"28px 32px" }}>
          {views[page]}
        </div>
      </div>
    </div>
  );
}