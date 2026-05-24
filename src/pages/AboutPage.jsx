
const colors = {
  navy: "#0A2540",
  blue: "#1565C0",
  blueMid: "#1976D2",
  blueLight: "#42A5F5",
  bluePale: "#E3F2FD",
  blueSoft: "#BBDEFB",
  white: "#FFFFFF",
  offWhite: "#F7FAFF",
  gray: "#6B7A99",
  grayLight: "#EEF2F7",
  grayDark: "#3D4A63",
  border: "#DDEAFC",
};

const teamMembers = [
  {
    name: "Alexandra Morgan",
    title: "Chief Executive Officer",
    initials: "AM",
    bio: "20+ years leading enterprise technology firms across North America and Europe.",
  },
  {
    name: "David Chen",
    title: "Chief Technology Officer",
    initials: "DC",
    bio: "Former Google engineer. Architect of our core infrastructure and product roadmap.",
  },
  {
    name: "Priya Nair",
    title: "Head of Design",
    initials: "PN",
    bio: "Award-winning designer with a passion for human-centered product experiences.",
  },
  {
    name: "Marcus Williams",
    title: "VP of Operations",
    initials: "MW",
    bio: "Operational strategist ensuring seamless delivery for 200+ enterprise clients.",
  },
];

const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "200+", label: "Enterprise Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "40+", label: "Countries Served" },
];

const values = [
  {
    icon: "⬡",
    title: "Integrity First",
    desc: "We hold ourselves to the highest ethical standards in every engagement.",
  },
  {
    icon: "◈",
    title: "Innovation-Driven",
    desc: "Constant reinvention keeps our clients ahead in rapidly changing markets.",
  },
  {
    icon: "◎",
    title: "Client-Centric",
    desc: "Every decision is guided by the measurable outcomes we deliver for clients.",
  },
  {
    icon: "⬟",
    title: "Global Perspective",
    desc: "Diverse teams. Inclusive solutions. A truly worldwide footprint.",
  },
];

const offices = [
  { city: "New York", address: "350 Fifth Avenue, Suite 4200", country: "USA" },
  { city: "London", address: "30 St Mary Axe, Level 12", country: "UK" },
  { city: "Singapore", address: "1 Raffles Place, Tower 2", country: "SG" },
];

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ background: colors.white, minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(150deg, ${colors.navy} 0%, #0D3A6E 60%, #1565C0 100%)`,
          padding: "90px 48px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            border: "1px solid rgba(66,165,245,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(66,165,245,0.08)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(66,165,245,0.15)",
              border: "1px solid rgba(66,165,245,0.3)",
              color: colors.blueLight,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              padding: "5px 16px",
              borderRadius: "20px",
              marginBottom: "22px",
            }}
          >
            Our Story
          </span>
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "52px",
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.15,
              margin: "0 0 20px",
              letterSpacing: "-1px",
            }}
          >
            Building the Future of
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #42A5F5, #90CAF9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Enterprise Technology
            </span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "17px",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Since 2012, Nexvara has partnered with the world's most ambitious organizations
            to design, build, and scale transformative digital platforms.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          background: colors.bluePale,
          borderTop: `1px solid ${colors.blueSoft}`,
          borderBottom: `1px solid ${colors.blueSoft}`,
          padding: "40px 48px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "16px 24px",
                borderRight: i < 3 ? `1px solid ${colors.blueSoft}` : "none",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: colors.blue,
                  fontFamily: "'Georgia', serif",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: colors.gray, letterSpacing: "0.3px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: colors.blueMid,
                display: "block",
                marginBottom: "14px",
              }}
            >
              Our Mission
            </span>
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "36px",
                fontWeight: 700,
                color: colors.navy,
                lineHeight: 1.25,
                margin: "0 0 20px",
                letterSpacing: "-0.5px",
              }}
            >
              Accelerating growth through intelligent technology
            </h2>
            <p
              style={{
                color: colors.gray,
                fontSize: "16px",
                lineHeight: 1.8,
                margin: "0 0 16px",
              }}
            >
              We believe technology should be an accelerant for human ambition — not a barrier.
              Our teams embed deeply with clients, co-creating solutions that compound in value
              over time.
            </p>
            <p style={{ color: colors.gray, fontSize: "16px", lineHeight: 1.8, margin: 0 }}>
              From strategy to execution, we operate as true partners — invested in outcomes,
              transparent in process, and relentless in delivery.
            </p>
          </div>
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.navy} 0%, #1A4A8A 100%)`,
              borderRadius: "16px",
              padding: "40px 36px",
              color: colors.white,
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: i < 3 ? "28px" : 0,
                  paddingBottom: i < 3 ? "28px" : 0,
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "8px",
                    background: "rgba(66,165,245,0.2)",
                    border: "1px solid rgba(66,165,245,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                    color: colors.blueLight,
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: colors.white,
                      marginBottom: "4px",
                    }}
                  >
                    {v.title}
                  </div>
                  <div
                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}
                  >
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          background: colors.offWhite,
          borderTop: `1px solid ${colors.border}`,
          padding: "72px 48px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: colors.blueMid,
                display: "block",
                marginBottom: "12px",
              }}
            >
              Leadership
            </span>
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "34px",
                fontWeight: 700,
                color: colors.navy,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Meet the Team
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {teamMembers.map((m, i) => (
              <div
                key={i}
                style={{
                  background: colors.white,
                  borderRadius: "12px",
                  border: `1px solid ${colors.border}`,
                  padding: "28px 24px",
                  textAlign: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(21,101,192,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: colors.bluePale,
                    border: `2px solid ${colors.blueSoft}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: colors.blue,
                    margin: "0 auto 14px",
                  }}
                >
                  {m.initials}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: colors.navy,
                    marginBottom: "4px",
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.blueMid,
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {m.title}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.gray,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
