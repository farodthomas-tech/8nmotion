import { useState, useEffect, useRef } from "react";
import { CREW, DEFAULT_EVENTS, DEFAULT_SPOTLIGHTS, DEFAULT_UPDATES, PARENTS } from "./data.js";

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "Infinite";
const STORAGE_KEY    = "8nm-v1";

const TAG_STYLES = {
  track:   { bg: "rgba(212,168,67,0.15)",  color: "#D4A843", border: "rgba(212,168,67,0.3)"   },
  sports:  { bg: "rgba(212,168,67,0.15)",  color: "#D4A843", border: "rgba(212,168,67,0.3)"   },
  school:  { bg: "rgba(80,120,220,0.12)",  color: "#7AADFF", border: "rgba(80,120,220,0.25)"  },
  family:  { bg: "rgba(220,120,60,0.12)",  color: "#F0A060", border: "rgba(220,120,60,0.25)"  },
  special: { bg: "rgba(180,60,220,0.12)",  color: "#D080FF", border: "rgba(180,60,220,0.25)"  },
};

const G = {
  black:  "#0D0D0D",
  black2: "#181818",
  black3: "#242424",
  gold:   "#D4A843",
  goldL:  "#F0CC72",
  gray:   "#888888",
  white:  "#FAFAFA",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useInterval(fn, ms) {
  const ref = useRef();
  useEffect(() => { ref.current = fn; }, [fn]);
  useEffect(() => { const t = setInterval(() => ref.current(), ms); return () => clearInterval(t); }, [ms]);
}

function SectionHead({ title, extra }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", letterSpacing:"0.06em", color:G.white, whiteSpace:"nowrap" }}>{title}</h2>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(212,168,67,0.3),transparent)" }} />
      {extra}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const now = new Date();
  return (
    <div style={{ background:G.black, position:"relative", overflow:"hidden", minHeight:300, display:"flex", flexDirection:"column" }}>
      <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(180px,38vw,520px)", color:"transparent", WebkitTextStroke:"1.5px rgba(212,168,67,0.11)", lineHeight:1, right:-30, top:-80, pointerEvents:"none", userSelect:"none" }}>8</div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,transparent,#D4A843,transparent)" }} />
      <div style={{ position:"relative", maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px) clamp(28px,4vw,48px)", width:"100%", flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={{ position:"absolute", top:"clamp(16px,3vw,36px)", right:"clamp(20px,4vw,40px)", textAlign:"right" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", color:G.gold, lineHeight:1 }}>{now.getDate()}</div>
          <div style={{ fontSize:"0.7rem", color:G.gray, letterSpacing:"0.08em" }}>{now.toLocaleDateString("en-US",{month:"short",year:"numeric"}).toUpperCase()}</div>
        </div>
        <div style={{ fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", color:G.gold, fontWeight:500, marginBottom:10 }}>8NMotion · Family Hub · Est. 2025</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,9vw,7.5rem)", lineHeight:0.92, letterSpacing:"0.02em" }}>
          <span style={{ color:G.gold }}>8N</span>Motion
        </h1>
        <p style={{ marginTop:16, fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"1rem", color:G.gray, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ display:"block", width:32, height:1, background:G.gold, flexShrink:0 }} />
          Always moving. Always together.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:28 }}>
          {CREW.map(m => (
            <span key={m.name} style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.2)", borderRadius:100, padding:"5px 14px", fontSize:"0.78rem", color:G.goldL, display:"flex", alignItems:"center", gap:6 }}>
              {m.icon} {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ view, setView, onAdmin }) {
  const links = [
    { id:"home",    label:"Home"     },
    { id:"crew",    label:"The Crew" },
    { id:"parents", label:"The OGs"  },
    { id:"events",  label:"Events"   },
    { id:"updates", label:"Updates"  },
    { id:"photos",  label:"Photos"   },
  ];
  return (
    <div style={{ background:G.black2, borderBottom:"1px solid rgba(212,168,67,0.15)", position:"sticky", top:0, zIndex:100 }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 clamp(20px,4vw,40px)", display:"flex", alignItems:"center", overflowX:"auto", scrollbarWidth:"none" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", color:G.gold, marginRight:20, padding:"12px 0", flexShrink:0, letterSpacing:"0.06em" }}>8NM</div>
        {links.map(l => (
          <button key={l.id} onClick={() => setView(l.id)} style={{ background:"none", border:"none", cursor:"pointer", color: view===l.id ? G.gold : "rgba(250,250,250,0.5)", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", padding:"14px 14px", whiteSpace:"nowrap", borderBottom: view===l.id ? `2px solid ${G.gold}` : "2px solid transparent", transition:"all 0.2s", fontFamily:"inherit" }}>
            {l.label}
          </button>
        ))}
        <button onClick={onAdmin} style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.25)", borderRadius:100, cursor:"pointer", color:G.gold, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 16px", whiteSpace:"nowrap", marginLeft:"auto", flexShrink:0, fontFamily:"inherit" }}>
          ✏️ Update Site
        </button>
      </div>
    </div>
  );
}

// ─── Crew Section ─────────────────────────────────────────────────────────────
function CrewSection() {
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="The Crew" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:12 }}>
        {CREW.map(m => (
          <div key={m.name} style={{ background:G.black2, border:`1px solid ${m.wears8?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.06)"}`, borderRadius:14, padding:"20px 12px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
            <div style={{ position:"relative" }}>
              <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#242424,#2E2800)", border:`2px solid ${m.wears8?G.gold:"rgba(212,168,67,0.15)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{m.icon}</div>
              {m.wears8 && <div style={{ position:"absolute", bottom:-4, right:-4, background:G.gold, color:G.black, fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.65rem", width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${G.black2}` }}>8</div>}
            </div>
            <div style={{ fontSize:"0.82rem", fontWeight:600, color:G.white, textAlign:"center" }}>{m.name}</div>
            <div style={{ fontSize:"0.65rem", color:G.gray, textAlign:"center", fontWeight:300, lineHeight:1.5 }}>{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Parents Section ──────────────────────────────────────────────────────────
function ParentsSection() {
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="The OGs" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
        {PARENTS.map(p => (
          <div key={p.name} style={{ background:"linear-gradient(160deg,#1A1200,#0D0D0D)", border:"1px solid rgba(212,168,67,0.25)", borderRadius:16, padding:32, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:16, top:12, fontSize:"5rem", color:"rgba(212,168,67,0.06)", pointerEvents:"none" }}>{p.icon}</div>
            <div style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:G.gold, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ display:"inline-block", width:20, height:2, background:G.gold }} />{p.icon} Spotlight
            </div>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", color:G.white, marginBottom:12, lineHeight:1.15, letterSpacing:"0.03em" }}>{p.title}</h3>
            <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.88rem", lineHeight:1.75, fontWeight:300 }}>{p.body}</p>
            <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid rgba(212,168,67,0.12)", fontSize:"0.72rem", color:G.gold, letterSpacing:"0.04em" }}>{p.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Events Section ───────────────────────────────────────────────────────────
function EventsSection({ events }) {
  const sorted = [...events].sort((a,b) => {
    const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mi = mo.indexOf(a.month) - mo.indexOf(b.month);
    return mi !== 0 ? mi : parseInt(a.day) - parseInt(b.day);
  });
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Upcoming Events" />
      {sorted.length === 0
        ? <p style={{ color:G.gray, fontSize:"0.9rem" }}>No upcoming events. Add some from the Update Site panel!</p>
        : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {sorted.map(ev => {
              const t = TAG_STYLES[ev.tag] || TAG_STYLES.family;
              return (
                <div key={ev.id} style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ textAlign:"center", minWidth:46, flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.08)", paddingRight:14 }}>
                    <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.1em", color:G.gold, fontWeight:500 }}>{ev.month}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", color:G.white, lineHeight:1 }}>{ev.day}</div>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"0.9rem", fontWeight:500, color:G.white, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ev.title}</div>
                    <div style={{ fontSize:"0.76rem", color:G.gray, fontWeight:300 }}>{ev.sub}</div>
                  </div>
                  <span style={{ fontSize:"0.65rem", padding:"3px 9px", borderRadius:100, fontWeight:600, letterSpacing:"0.04em", whiteSpace:"nowrap", flexShrink:0, background:t.bg, color:t.color, border:`1px solid ${t.border}` }}>{ev.tag}</span>
                </div>
              );
            })}
          </div>
        )
      }
    </section>
  );
}

// ─── Spotlight ────────────────────────────────────────────────────────────────
function Spotlight({ spotlights }) {
  const [idx, setIdx]     = useState(() => Math.floor(Math.random() * spotlights.length));
  const [fading, setFading] = useState(false);

  const go = (i) => {
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 250);
  };

  useInterval(() => go((idx + 1) % spotlights.length), 6000);

  if (!spotlights.length) return null;
  const s = spotlights[idx % spotlights.length];

  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Spotlight" extra={
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => go((idx - 1 + spotlights.length) % spotlights.length)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.3)", color:G.gold, borderRadius:"50%", width:26, height:26, cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
          <button onClick={() => go((idx + 1) % spotlights.length)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.3)", color:G.gold, borderRadius:"50%", width:26, height:26, cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
        </div>
      }/>
      <div style={{ background:"linear-gradient(160deg,#1A1200,#0D0D0D)", border:"1px solid rgba(212,168,67,0.3)", borderRadius:16, padding:32, position:"relative", overflow:"hidden", opacity:fading?0:1, transform:fading?"translateY(8px)":"translateY(0)", transition:"opacity 0.25s ease,transform 0.25s ease" }}>
        <div style={{ position:"absolute", right:16, top:12, fontSize:"6rem", color:"rgba(212,168,67,0.07)", pointerEvents:"none" }}>★</div>
        <div style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:G.gold, fontWeight:600, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ display:"inline-block", width:20, height:2, background:G.gold }} />{s.icon} {s.label}
        </div>
        <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", letterSpacing:"0.04em", color:G.white, marginBottom:12, lineHeight:1.1 }}>{s.title}</h3>
        <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.88rem", lineHeight:1.75, fontWeight:300 }}>{s.body}</p>
        <div style={{ display:"flex", gap:20, marginTop:24, paddingTop:20, borderTop:"1px solid rgba(212,168,67,0.12)", flexWrap:"wrap" }}>
          {s.stats.map((st,i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", color:G.gold, letterSpacing:"0.04em", lineHeight:1 }}>{st.num}</div>
              <div style={{ fontSize:"0.68rem", color:G.gray, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:2 }}>{st.lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, marginTop:18 }}>
          {spotlights.map((_,i) => (
            <div key={i} onClick={() => go(i)} style={{ width:i===idx?20:7, height:7, borderRadius:100, background:i===idx?G.gold:"rgba(212,168,67,0.25)", cursor:"pointer", transition:"all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Updates Feed ─────────────────────────────────────────────────────────────
function UpdatesFeed({ updates }) {
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Family Updates" />
      {updates.map(u => (
        <div key={u.id} style={{ display:"flex", gap:18, padding:"22px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(212,168,67,0.1)", border:"1px solid rgba(212,168,67,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>{u.icon}</div>
          <div>
            <div style={{ fontSize:"0.76rem", color:G.gray, marginBottom:5 }}><strong style={{ color:G.goldL, fontWeight:500 }}>{u.category}</strong> · {u.time}</div>
            <div style={{ fontSize:"0.9rem", lineHeight:1.7, color:"rgba(250,250,250,0.75)", fontWeight:300 }}>{u.text}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── Photos Section ───────────────────────────────────────────────────────────
function PhotosSection({ photos }) {
  const placeholders = [
    { icon:"🏆", label:"Bailee · All American State Meet" },
    { icon:"💅🏾", label:"Bailee · BeautMode" },
    { icon:"☀️", label:"Raelyn · Sunshine" },
    { icon:"🔥", label:"Blaize · Litty" },
    { icon:"🚒", label:"Khari · Welcome Home" },
    { icon:"✈️", label:"Davian · The Prince" },
    { icon:"👸🏾", label:"Kourtney · The Queen" },
    { icon:"🐾", label:"Legend · Fur Sibling" },
    { icon:"👑", label:"Rod · Pharod Thomas Photography" },
    { icon:"8️⃣", label:"8NMotion Family" },
  ];

  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Family Moments" />
      <div style={{ background:"rgba(212,168,67,0.04)", border:"1px solid rgba(212,168,67,0.1)", borderRadius:12, padding:"16px 20px", marginBottom:20 }}>
        <p style={{ fontSize:"0.8rem", color:G.gray, lineHeight:1.7 }}>
          📸 <strong style={{ color:G.goldL }}>To add photos:</strong> Replace the placeholder tiles by dropping your image files into the <code style={{ background:"rgba(255,255,255,0.08)", padding:"1px 6px", borderRadius:4 }}>public/photos/</code> folder in your project, then use the Update Site panel to link them. See the README for step-by-step instructions.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10 }}>
        {placeholders.map((p,i) => (
          <div key={i} style={{ aspectRatio:"1", borderRadius:10, background: i===0 ? "linear-gradient(135deg,#1A1200,#2A2000)" : G.black2, border:`1px solid ${i===0?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.06)"}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, gridColumn: i===0?"span 2":"span 1", gridRow: i===0?"span 2":"span 1" }}>
            <span style={{ fontSize: i===0?"2.5rem":"1.5rem", opacity:0.35 }}>{p.icon}</span>
            <span style={{ fontSize:"0.7rem", color: i===0?"rgba(212,168,67,0.5)":G.gray, textAlign:"center", padding:"0 10px", lineHeight:1.4 }}>{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }) {
  const [val, setVal]   = useState("");
  const [err, setErr]   = useState(false);

  const check = () => {
    if (val === ADMIN_PASSWORD) { onSuccess(); }
    else { setErr(true); setVal(""); setTimeout(() => setErr(false), 1800); }
  };

  return (
    <div style={{ maxWidth:420, margin:"80px auto", padding:"0 24px" }}>
      <div style={{ background:G.black2, border:"1px solid rgba(212,168,67,0.25)", borderRadius:16, padding:36, textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"3rem", color:G.gold, marginBottom:8 }}>8NM</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.06em", color:G.white, marginBottom:6 }}>Admin Access</h2>
        <p style={{ fontSize:"0.82rem", color:G.gray, marginBottom:24, fontWeight:300 }}>Enter your password to update the site</p>
        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && check()}
          placeholder="Password"
          style={{ width:"100%", background:"#0D0D0D", border:`1px solid ${err?"rgba(255,80,80,0.5)":"rgba(212,168,67,0.2)"}`, borderRadius:8, padding:"12px 16px", color:G.white, fontSize:"1rem", fontFamily:"inherit", marginBottom:12, outline:"none", textAlign:"center", letterSpacing:"0.1em" }}
        />
        {err && <p style={{ fontSize:"0.78rem", color:"#FF6B6B", marginBottom:12 }}>Incorrect password. Try again.</p>}
        <button onClick={check} style={{ width:"100%", background:G.gold, color:G.black, border:"none", borderRadius:8, padding:"12px", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>
          Enter →
        </button>
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ siteData, setSiteData, onSave }) {
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [log, setLog]       = useState([{ msg:"Ready. Type your update below.", type:"info", ts:"" }]);
  const logRef              = useRef(null);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const addLog = (msg, type="info") => setLog(l => [...l, { msg, type, ts: new Date().toLocaleTimeString() }]);

  const examples = [
    "Add a flag football game for Khari on July 12th at 10am at East Cobb Park",
    "Add a spotlight for Raelyn — she won her basketball tournament this weekend",
    "Bailee's softball game on June 6th moved to 12pm",
    "Add an update: the family had an amazing time at Londan's Sweet 16",
    "Add Kourtney's FIFA World Cup event details for July 15th at State Farm Arena",
    "Remove the Viera tournament placeholder and add the real schedule",
  ];

  const handleUpdate = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setLoading(true);
    addLog(`You: "${userMsg}"`, "user");

    const systemPrompt = `You are the update engine for the 8NMotion family website.

FAMILY:
- Rod (Dad, CNA, Pharod Thomas Photography)
- Kourtney (Mom, UPS Brands and Partnerships, FIFA World Cup ATL events)
- Davian (oldest, Air Force, deployed Venezuela until October, "The Prince")
- Bailee (11th grade, softball: Impact Gold ATL + Hillgrove HS, track: Hillgrove HS + Peak Performance South, GHSA State 8th place All American, "BeautMode")
- Raelyn (6th grade, basketball + track + flag football, artist, crochets, "Rae of Sunshine")
- Blaize (1st grade, flag football + softball + track + self-taught gymnastics, "Litty")
- Khari (Kindergarten, cousin treated as brother, joining flag football and baseball soon, #8)
- Legend (family dog, "Fur Sibling")
Spotlight order: Davian first, then Bailee, Raelyn, Blaize, Khari (age order oldest to youngest).
No em dashes anywhere. Fun and personal tone for each kid.

CURRENT DATA:
${JSON.stringify(siteData, null, 2)}

Based on the user's plain-English request return ONLY valid JSON with this structure (only include sections that changed):
{
  "action": "brief summary of change",
  "events": [...full updated array...],
  "spotlights": [...full updated array...],
  "updates": [...full updated array...]
}

Event fields: id (number), month (3-letter), day (2-char string), title, sub (location/time details), tag (track/sports/school/family/special)
Spotlight fields: id, icon (emoji), label, name, title, body (no em dashes), stats ([{num,lbl}])
Update fields: id (number), icon (emoji), category, time (e.g. "Today","This Week"), text (no em dashes)
New items get id = max existing id + 1. Keep all existing items unless told to remove/replace.
Respond ONLY with the JSON object. No markdown, no explanation, no backticks.`;

    try {
      const res  = await fetch("/.netlify/functions/anthropic", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:3000,
          system: systemPrompt,
          messages:[{ role:"user", content:userMsg }],
        }),
      });
      const data = await res.json();
      const raw  = data.content?.find(b => b.type==="text")?.text || "";

      let parsed;
      try {
        const cleaned = raw.replace(/```json|```/g,"").trim();
        const start   = cleaned.indexOf("{");
        const end     = cleaned.lastIndexOf("}");
        if (start === -1 || end === -1) throw new Error("No JSON found");
        parsed = JSON.parse(cleaned.slice(start, end + 1));
      } catch (parseErr) {
        addLog(`Parse error: ${parseErr.message}`, "error");
        if (raw) addLog(`Response preview: ${raw.slice(0,200)}`, "info");
        setLoading(false);
        return;
      }

      const newData = { ...siteData };
      if (parsed.events)     newData.events     = parsed.events;
      if (parsed.spotlights) newData.spotlights = parsed.spotlights;
      if (parsed.updates)    newData.updates    = parsed.updates;

      setSiteData(newData);
      onSave(newData);
      addLog(`Done: ${parsed.action || "Site updated!"}`, "success");
    } catch (err) {
      addLog(`Error: ${err.message}`, "error");
    }
    setLoading(false);
  };

  const logColors = { user:G.goldL, success:"#6EE26E", error:"#FF6B6B", info:G.gray };

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px)" }}>
      <div style={{ background:G.black2, border:"1px solid rgba(212,168,67,0.25)", borderRadius:16, overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(135deg,#1A1200,#0D0D0D)", padding:"28px 32px", borderBottom:"1px solid rgba(212,168,67,0.15)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", letterSpacing:"0.06em", color:G.gold }}>Update Site Panel</h2>
            <p style={{ fontSize:"0.82rem", color:G.gray, marginTop:4, fontWeight:300 }}>Type what you want to change in plain English. AI handles the rest.</p>
          </div>
          <button onClick={() => { setSiteData({ events:DEFAULT_EVENTS, spotlights:DEFAULT_SPOTLIGHTS, updates:DEFAULT_UPDATES }); addLog("Site reset to defaults.","info"); }} style={{ background:"none", border:"1px solid rgba(255,100,100,0.3)", color:"rgba(255,100,100,0.7)", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontSize:"0.75rem", fontFamily:"inherit" }}>Reset to defaults</button>
        </div>

        <div style={{ padding:"28px 32px", display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            <label style={{ fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gold, fontWeight:500, display:"block", marginBottom:10 }}>What do you want to update?</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter" && (e.metaKey||e.ctrlKey)) handleUpdate(); }}
              placeholder='e.g. "Add Khari flag football game July 12th at East Cobb Park 10am" or "Bailee won her softball tournament in Viera!"'
              style={{ width:"100%", background:"#0D0D0D", border:"1px solid rgba(212,168,67,0.2)", borderRadius:10, padding:"14px 16px", color:G.white, fontSize:"0.9rem", fontFamily:"inherit", lineHeight:1.6, resize:"vertical", minHeight:90, outline:"none" }}
            />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <span style={{ fontSize:"0.72rem", color:G.gray }}>Tip: Cmd/Ctrl + Enter to submit</span>
              <button onClick={handleUpdate} disabled={loading||!input.trim()} style={{ background:loading?"rgba(212,168,67,0.4)":G.gold, color:G.black, border:"none", borderRadius:8, padding:"10px 28px", fontWeight:700, fontSize:"0.88rem", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>
                {loading ? "Updating…" : "Update Site →"}
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gray, marginBottom:10 }}>Quick examples:</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {examples.map((ex,i) => (
                <button key={i} onClick={() => setInput(ex)} style={{ background:"rgba(212,168,67,0.06)", border:"1px solid rgba(212,168,67,0.15)", borderRadius:8, padding:"6px 12px", color:"rgba(250,250,250,0.6)", fontSize:"0.74rem", cursor:"pointer", fontFamily:"inherit", textAlign:"left", lineHeight:1.5 }}>{ex}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gray, marginBottom:8 }}>Activity log</div>
            <div ref={logRef} style={{ background:"#0D0D0D", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"14px 16px", maxHeight:160, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 }}>
              {log.map((l,i) => (
                <div key={i} style={{ fontSize:"0.78rem", color:logColors[l.type]||G.gray, display:"flex", gap:10 }}>
                  {l.ts && <span style={{ color:"rgba(255,255,255,0.2)", flexShrink:0 }}>{l.ts}</span>}
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"rgba(212,168,67,0.04)", border:"1px solid rgba(212,168,67,0.1)", borderRadius:10, padding:"16px 20px" }}>
            <div style={{ fontSize:"0.75rem", letterSpacing:"0.06em", textTransform:"uppercase", color:G.gold, marginBottom:10, fontWeight:500 }}>What you can update</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
              {[
                ["📅 Events","Add, edit, or remove games, meets, school events, celebrations"],
                ["⭐ Spotlights","Feature any family member's accomplishments or milestones"],
                ["📢 Updates","Post news, shoutouts, or announcements to the family feed"],
              ].map(([t,d]) => (
                <div key={t}>
                  <div style={{ fontSize:"0.82rem", color:G.white, fontWeight:500, marginBottom:3 }}>{t}</div>
                  <div style={{ fontSize:"0.75rem", color:G.gray, fontWeight:300, lineHeight:1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div style={{ background:G.black2, borderTop:"1px solid rgba(212,168,67,0.12)", padding:"clamp(24px,4vw,36px) 40px", textAlign:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.4rem", letterSpacing:"0.1em", color:G.gold, marginBottom:8 }}>8NMOTION</div>
      <p style={{ fontSize:"0.8rem", color:G.gray, fontWeight:300, letterSpacing:"0.04em" }}>Always moving. Always together. Share the link, not the texts.</p>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,      setView]      = useState("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [authed,    setAuthed]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [siteData,  setSiteData]  = useState({
    events:     DEFAULT_EVENTS,
    spotlights: DEFAULT_SPOTLIGHTS,
    updates:    DEFAULT_UPDATES,
  });

  // Load persisted data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSiteData(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  const handleSave = (data) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  };

  const openAdmin = () => {
    setAdminOpen(true);
    setView("admin");
  };

  if (!loaded) return (
    <div style={{ background:G.black, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"4rem", color:G.gold, opacity:0.4 }}>8NM</div>
    </div>
  );

  const showSection = (id) => view === "home" || view === id;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:G.black, color:G.white, minHeight:"100vh", overflowX:"hidden" }}>
      <Hero />
      <Nav view={view} setView={(v) => { setView(v); setAdminOpen(false); }} onAdmin={openAdmin} />

      {view === "admin" ? (
        authed
          ? <AdminPanel siteData={siteData} setSiteData={setSiteData} onSave={handleSave} />
          : <PasswordGate onSuccess={() => setAuthed(true)} />
      ) : (
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px)" }}>
          {showSection("crew")    && <CrewSection />}
          {showSection("parents") && <ParentsSection />}
          {showSection("events")  && (
            <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1.1fr) minmax(0,0.9fr)", gap:32, marginBottom:56, flexWrap:"wrap" }}>
              <EventsSection events={siteData.events} />
              <Spotlight spotlights={siteData.spotlights} />
            </div>
          )}
          {showSection("updates") && <UpdatesFeed updates={siteData.updates} />}
          {showSection("photos")  && <PhotosSection />}
        </div>
      )}

      <Footer />
    </div>
  );
}
