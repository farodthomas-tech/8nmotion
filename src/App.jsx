import { useState, useEffect, useRef } from "react";
import { CREW, DEFAULT_EVENTS, DEFAULT_SPOTLIGHTS, DEFAULT_UPDATES, PARENTS } from "./data.js";

const ADMIN_PASSWORD = "Infinite";
const STORAGE_KEY    = "8nm-v1";
const MESSAGES_KEY   = "8nm-davian-messages";

const TAG_STYLES = {
  track:   { bg:"rgba(212,168,67,0.15)",  color:"#D4A843", border:"rgba(212,168,67,0.3)"  },
  sports:  { bg:"rgba(212,168,67,0.15)",  color:"#D4A843", border:"rgba(212,168,67,0.3)"  },
  school:  { bg:"rgba(80,120,220,0.12)",  color:"#7AADFF", border:"rgba(80,120,220,0.25)" },
  family:  { bg:"rgba(220,120,60,0.12)",  color:"#F0A060", border:"rgba(220,120,60,0.25)" },
  special: { bg:"rgba(180,60,220,0.12)",  color:"#D080FF", border:"rgba(180,60,220,0.25)" },
};

const G = {
  black:"#0D0D0D", black2:"#181818", black3:"#242424",
  gold:"#D4A843",  goldL:"#F0CC72",  gray:"#888888", white:"#FAFAFA",
};

const PROFILES = {
  Rod: {
    icon:"👑", color:"#D4A843", wears8:true,
    bio:"Behind the lens and building something new. Rod is growing Pharod Thomas Photography while stepping into an exciting new chapter with CNA. The same eye for detail that makes him a great dad shows up in every shot he takes. More chapters coming soon.",
    sports:[], activities:["📸 Pharod Thomas Photography","💼 CNA","🏃 Peak Performance South Track Club (Coming Soon)"],
    accomplishments:["Founded Peak Performance South Track Club","Building Pharod Thomas Photography brand","Starting new chapter with CNA"],
  },
  Kourtney: {
    icon:"👸🏾", color:"#F0CC72", wears8:false,
    bio:"Kourtney holds this family together while making major moves at UPS Brands and Partnerships. She is bringing something special to Atlanta tied to the FIFA World Cup, spotlighting local Black owned businesses and Atlanta staples on a global stage. Details dropping soon. Watch this space.",
    sports:[], activities:["💼 UPS Brands and Partnerships","🌍 FIFA World Cup ATL Events","🫶 10 Year Kidney Donation Anniversary"],
    accomplishments:["10 Years since kidney donation — a selfless act of love","FIFA World Cup Atlanta event series coming soon","Spotlighting Black owned businesses on a global stage"],
  },
  Davian: {
    icon:"✈️", color:"#7AADFF", wears8:true,
    bio:"Davian set the standard for what it means to wear #8 in this family and then took it to a whole new level by serving in the United States Air Force. Currently deployed in Venezuela until October, he is out here serving his country while his family holds him down back home. The Prince is always with us no matter the distance.",
    sports:[], activities:["✈️ United States Air Force","🌍 Deployed — Venezuela","📅 Returns October 2025"],
    accomplishments:["Serving in the United States Air Force","Currently deployed in Venezuela","Set the #8 standard for the whole family"],
    deployed:true,
  },
  Bailee: {
    icon:"💅🏾💪🏽", color:"#D4A843", wears8:true,
    bio:"Nails done, cleats on, let's go! Bailee is out here doing it ALL. Throwing down on the softball diamond with Impact Gold ATL and Hillgrove, flying down the track for Hillgrove HS and Peak Performance South, and still showing up looking good every step of the way. BeautMode does not slow down for anyone.",
    sports:["🥎 Softball — Impact Gold ATL","🥎 Softball — Hillgrove High School","🏃 Track — Hillgrove High School","🏃 Track — Peak Performance South"],
    activities:["💅🏾 BeautMode","🧶 Crocheting","✨ Big Sister Energy"],
    accomplishments:["GHSA State Track and Field Championships — 8th Place","All American Recognition — GHSA Track and Field","11th Grade at Hillgrove High School","Dual sport athlete — Softball and Track"],
  },
  Raelyn: {
    icon:"☀️", color:"#F0CC72", wears8:true,
    bio:"She is literally a Rae of Sunshine. Three sports and a whole lot of soul. Raelyn lights up every room, every court, every field she walks into. When she is not running down opponents in basketball, track, or flag football she is creating something beautiful, drawing and crocheting with her big sister Bailee's crafty energy.",
    sports:["🏀 Basketball","🏃 Track","🏈 Flag Football"],
    activities:["☀️ Rae of Sunshine","🎨 Drawing and Art","🧶 Crocheting","✨ Creative Soul"],
    accomplishments:["3 sport athlete — Basketball, Track, Flag Football","6th Grade at Hillgrove Middle School","Most creative kid in the family","Carries that sunshine everywhere she goes"],
  },
  Blaize: {
    icon:"🔥", color:"#F0A060", wears8:true,
    bio:"Softball, flag football, track AND gymnastics? Blaize literally does not have an off switch. She is teaching herself gymnastics moves while also putting in work on her reading because being Litty means growing in every direction. There is no off season when you are built different.",
    sports:["🏈 Flag Football","🥎 Softball","🏃 Track","🤸 Gymnastics (Self Taught)"],
    activities:["🔥 Litty","📚 Working on Reading","🤸 Teaching herself gymnastics"],
    accomplishments:["4 sport athlete including self-taught gymnastics","1st Grade — just getting started","Golden Birthday coming up — turns 6 on August 6th","No off season, no excuses"],
  },
  Khari: {
    icon:"🚒", color:"#FF6B6B", wears8:true,
    bio:"Khari came into the 8NMotion family and fit right in from day one. The girls claimed him as a brother and that is exactly what he is. He is getting ready to hit the flag football field and baseball diamond when the time comes and best believe the whole family will be there. Family is not always blood and Khari is proof of that.",
    sports:["🏈 Flag Football — Coming Soon","⚾ Baseball — Coming Soon"],
    activities:["🚒 Brother · Family","🏠 Living with the 8NMotion crew through October"],
    accomplishments:["Joined the 8NMotion family June 2025","Starting Kindergarten this fall","Sports registration coming soon","Already one of us"],
  },
  Legend: {
    icon:"🐾", color:"#888888", wears8:false,
    bio:"Legend is the official fur sibling of the 8NMotion family. Always the first to greet you at the door, always the last to leave your side. Legend does not wear the number 8 but he holds it down for this family every single day just by being Legend.",
    sports:[], activities:["🐾 Professional Greeter","🛋️ Chief Nap Officer","❤️ Fur Sibling"],
    accomplishments:["Beloved fur sibling of the 8NMotion family","Expert at making everyone feel welcome","Holds it down at the house every day"],
  },
};

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

// ─── THIS WEEK ────────────────────────────────────────────────────────────────
function ThisWeek({ events }) {
  const now   = new Date();
  const in7   = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const upcoming = events.filter(ev => {
    const d = new Date(`${ev.month} ${ev.day}, ${now.getFullYear()}`);
    return d >= now && d <= in7;
  }).sort((a,b) => {
    const da = new Date(`${a.month} ${a.day}, ${now.getFullYear()}`);
    const db = new Date(`${b.month} ${b.day}, ${now.getFullYear()}`);
    return da - db;
  });

  if (!upcoming.length) return null;

  return (
    <section style={{ marginBottom:40 }}>
      <div style={{ background:"linear-gradient(135deg,#0A1A00,#0D0D0D)", border:"1px solid rgba(110,226,110,0.2)", borderRadius:16, padding:"24px 28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#6EE26E", boxShadow:"0 0 8px #6EE26E" }} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em", color:"#6EE26E" }}>THIS WEEK</span>
          <span style={{ fontSize:"0.72rem", color:G.gray, marginLeft:4 }}>{upcoming.length} event{upcoming.length > 1 ? "s" : ""} coming up</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {upcoming.map(ev => {
            const t = TAG_STYLES[ev.tag] || TAG_STYLES.family;
            return (
              <div key={ev.id} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 14px" }}>
                <div style={{ textAlign:"center", minWidth:36, flexShrink:0 }}>
                  <div style={{ fontSize:"0.55rem", textTransform:"uppercase", letterSpacing:"0.1em", color:G.gold }}>{ev.month}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", color:G.white, lineHeight:1 }}>{ev.day}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"0.85rem", fontWeight:500, color:G.white, lineHeight:1.3, wordBreak:"break-word" }}>{ev.title}</div>
                  <div style={{ fontSize:"0.72rem", color:G.gray, fontWeight:300, marginTop:2, wordBreak:"break-word" }}>{ev.sub}</div>
                </div>
                <span style={{ fontSize:"0.62rem", padding:"2px 8px", borderRadius:100, fontWeight:600, whiteSpace:"nowrap", flexShrink:0, background:t.bg, color:t.color, border:`1px solid ${t.border}` }}>{ev.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onSelectMember }) {
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
        <div style={{ fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", color:G.gold, fontWeight:500, marginBottom:10 }}>Est. 2008 · Family Hub</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,9vw,7.5rem)", lineHeight:0.92, letterSpacing:"0.02em" }}>
          <span style={{ color:G.gold }}>8N</span>Motion
        </h1>
        <p style={{ marginTop:16, fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"1rem", color:G.gold, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ display:"block", width:32, height:1, background:G.gold, flexShrink:0 }} />
          Infinite Love. Endless Motion.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:28 }}>
          {CREW.map(m => (
            <span key={m.name} onClick={() => onSelectMember(m.name)} style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.2)", borderRadius:100, padding:"5px 14px", fontSize:"0.78rem", color:G.goldL, display:"flex", alignItems:"center", gap:6, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(212,168,67,0.18)"; e.currentTarget.style.borderColor="rgba(212,168,67,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(212,168,67,0.08)"; e.currentTarget.style.borderColor="rgba(212,168,67,0.2)"; }}
            >
              {m.icon} {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
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
          <button key={l.id} onClick={() => setView(l.id)} style={{ background:"none", border:"none", cursor:"pointer", color:view===l.id?G.gold:"rgba(250,250,250,0.5)", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", padding:"14px 14px", whiteSpace:"nowrap", borderBottom:view===l.id?`2px solid ${G.gold}`:"2px solid transparent", transition:"all 0.2s", fontFamily:"inherit" }}>
            {l.label}
          </button>
        ))}
        <button onClick={onAdmin} style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.25)", borderRadius:100, cursor:"pointer", color:G.gold, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 16px", whiteSpace:"nowrap", marginLeft:"auto", flexShrink:0, fontFamily:"inherit" }}>
          Update Site
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ name, onBack, messages, onAddMessage }) {
  const p    = PROFILES[name];
  const crew = CREW.find(c => c.name === name);
  const [msgForm, setMsgForm] = useState({ from:"", text:"" });
  const [msgSent, setMsgSent] = useState(false);

  if (!p) return null;

  const handleSendMsg = () => {
    if (!msgForm.from.trim() || !msgForm.text.trim()) return;
    onAddMessage({ from: msgForm.from, text: msgForm.text, ts: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) });
    setMsgForm({ from:"", text:"" });
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"clamp(24px,4vw,48px) clamp(20px,4vw,40px)" }}>
      {/* Back */}
      <button onClick={onBack} style={{ background:"none", border:"1px solid rgba(212,168,67,0.25)", borderRadius:100, color:G.gold, padding:"7px 18px", fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", marginBottom:28, display:"flex", alignItems:"center", gap:8 }}>
        ← Back to Crew
      </button>

      {/* Profile Header */}
      <div style={{ background:"linear-gradient(160deg,#1A1200,#0D0D0D)", border:`1px solid ${p.color}30`, borderRadius:20, padding:"36px 32px", marginBottom:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:20, top:10, fontFamily:"'Bebas Neue',sans-serif", fontSize:"8rem", color:`${p.color}08`, pointerEvents:"none", lineHeight:1 }}>8</div>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20, flexWrap:"wrap" }}>
          <div style={{ position:"relative", flexShrink:0 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#242424,#2E2800)", border:`3px solid ${p.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem" }}>{p.icon}</div>
            {crew?.wears8 && <div style={{ position:"absolute", bottom:-4, right:-4, background:G.gold, color:G.black, fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", width:22, height:22, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid #181818` }}>8</div>}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:p.color, fontWeight:600, marginBottom:6 }}>{crew?.role}</div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2rem,6vw,3rem)", color:G.white, lineHeight:1, letterSpacing:"0.03em", marginBottom:12 }}>{name}</h1>
            <p style={{ color:"rgba(250,250,250,0.65)", fontSize:"0.9rem", lineHeight:1.75, fontWeight:300 }}>{p.bio}</p>
          </div>
        </div>

        {/* Deployed banner for Davian */}
        {p.deployed && (
          <div style={{ marginTop:20, background:"rgba(122,173,255,0.08)", border:"1px solid rgba(122,173,255,0.25)", borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:"1.2rem" }}>✈️</span>
            <div>
              <div style={{ fontSize:"0.78rem", color:"#7AADFF", fontWeight:600 }}>Currently Deployed — Venezuela</div>
              <div style={{ fontSize:"0.74rem", color:G.gray, fontWeight:300 }}>Returns October 2025. Send some love from home!</div>
            </div>
          </div>
        )}
      </div>

      {/* Sports */}
      {p.sports.length > 0 && (
        <div style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.gold, marginBottom:14 }}>Sports</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {p.sports.map((s,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:"0.88rem", color:"rgba(250,250,250,0.7)", fontWeight:300 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:p.color, flexShrink:0 }} />{s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {p.activities.length > 0 && (
        <div style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.gold, marginBottom:14 }}>Activities</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {p.activities.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:"0.88rem", color:"rgba(250,250,250,0.7)", fontWeight:300 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:p.color, flexShrink:0 }} />{a}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accomplishments */}
      <div style={{ background:G.black2, border:`1px solid ${p.color}25`, borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.gold, marginBottom:14 }}>Accomplishments</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {p.accomplishments.map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <span style={{ color:p.color, fontSize:"0.9rem", flexShrink:0, marginTop:2 }}>★</span>
              <span style={{ fontSize:"0.88rem", color:"rgba(250,250,250,0.75)", fontWeight:300, lineHeight:1.5 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.gold, marginBottom:14 }}>Photos</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ aspectRatio:"1", borderRadius:10, background:"linear-gradient(135deg,#1A1200,#2A2000)", border:`1px solid ${p.color}20`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
              <span style={{ fontSize:"1.6rem", opacity:0.25 }}>{p.icon}</span>
              <span style={{ fontSize:"0.62rem", color:`${p.color}50`, textAlign:"center" }}>Add Photo</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize:"0.72rem", color:G.gray, marginTop:12, fontWeight:300 }}>Drop photos into <code style={{ background:"rgba(255,255,255,0.06)", padding:"1px 5px", borderRadius:4 }}>public/photos/{name.toLowerCase()}/</code> to populate this gallery.</p>
      </div>

      {/* Davian Message Wall */}
      {p.deployed && (
        <div style={{ background:"linear-gradient(135deg,#0A1020,#0D0D0D)", border:"1px solid rgba(122,173,255,0.25)", borderRadius:14, padding:"24px 28px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:"#7AADFF", marginBottom:6 }}>Messages from Home ✈️</div>
          <p style={{ fontSize:"0.8rem", color:G.gray, marginBottom:20, fontWeight:300 }}>Leave Davian a message. He will see every single one when he gets back. Let him know we are with him.</p>

          {/* Existing messages */}
          {messages.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {messages.map((m,i) => (
                <div key={i} style={{ background:"rgba(122,173,255,0.06)", border:"1px solid rgba(122,173,255,0.12)", borderRadius:10, padding:"14px 16px" }}>
                  <div style={{ fontSize:"0.72rem", color:"#7AADFF", fontWeight:600, marginBottom:6 }}>{m.from} · {m.ts}</div>
                  <div style={{ fontSize:"0.88rem", color:"rgba(250,250,250,0.7)", lineHeight:1.6, fontWeight:300 }}>{m.text}</div>
                </div>
              ))}
            </div>
          )}

          {msgSent ? (
            <div style={{ background:"rgba(110,226,110,0.08)", border:"1px solid rgba(110,226,110,0.2)", borderRadius:10, padding:"14px 16px", textAlign:"center" }}>
              <span style={{ color:"#6EE26E", fontSize:"0.88rem" }}>Message sent! Davian will see it when he gets home. Thank you. 🙏</span>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <input type="text" placeholder="Your name" value={msgForm.from} onChange={e => setMsgForm(f=>({...f,from:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(122,173,255,0.2)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <textarea placeholder="Write something for Davian..." value={msgForm.text} onChange={e => setMsgForm(f=>({...f,text:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(122,173,255,0.2)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", minHeight:80 }} />
              <button onClick={handleSendMsg} disabled={!msgForm.from.trim()||!msgForm.text.trim()} style={{ background:"rgba(122,173,255,0.15)", border:"1px solid rgba(122,173,255,0.35)", color:"#7AADFF", borderRadius:8, padding:"11px 24px", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", fontFamily:"inherit" }}>
                Send Message to Davian →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CREW SECTION ─────────────────────────────────────────────────────────────
function CrewSection({ onSelectMember }) {
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="The Crew" extra={<span style={{ fontSize:"0.72rem", color:G.gray }}>Tap a card to view profile</span>} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:12 }}>
        {CREW.map(m => (
          <div key={m.name} onClick={() => onSelectMember(m.name)} style={{ background:G.black2, border:`1px solid rgba(212,168,67,0.3)`, borderRadius:14, padding:"20px 12px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor=G.gold; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor=m.wears8?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.06)"; }}
          >
            <div style={{ position:"relative" }}>
              <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#242424,#2E2800)", border:`2px solid ${G.gold}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{m.icon}</div>
              {m.wears8 && <div style={{ position:"absolute", bottom:-4, right:-4, background:G.gold, color:G.black, fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.65rem", width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${G.black2}` }}>8</div>}
            </div>
            <div style={{ fontSize:"0.82rem", fontWeight:600, color:G.white, textAlign:"center" }}>{m.name}</div>
            <div style={{ fontSize:"0.65rem", color:G.gray, textAlign:"center", fontWeight:300, lineHeight:1.5 }}>{m.role}</div>
            <div style={{ fontSize:"0.62rem", color:"rgba(212,168,67,0.5)", letterSpacing:"0.06em" }}>View Profile →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PARENTS SECTION ──────────────────────────────────────────────────────────
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

// ─── EVENTS SECTION ───────────────────────────────────────────────────────────
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
                <div key={ev.id} style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ textAlign:"center", minWidth:46, flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.08)", paddingRight:14 }}>
                    <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.1em", color:G.gold, fontWeight:500 }}>{ev.month}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", color:G.white, lineHeight:1 }}>{ev.day}</div>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"0.9rem", fontWeight:500, color:G.white, marginBottom:4, wordBreak:"break-word", lineHeight:1.3 }}>{ev.title}</div>
                    <div style={{ fontSize:"0.76rem", color:G.gray, fontWeight:300, lineHeight:1.5, wordBreak:"break-word" }}>{ev.sub}</div>
                  </div>
                  <span style={{ fontSize:"0.65rem", padding:"3px 9px", borderRadius:100, fontWeight:600, letterSpacing:"0.04em", whiteSpace:"nowrap", flexShrink:0, background:t.bg, color:t.color, border:`1px solid ${t.border}`, marginTop:2 }}>{ev.tag}</span>
                </div>
              );
            })}
          </div>
        )
      }
    </section>
  );
}

// ─── SPOTLIGHT ────────────────────────────────────────────────────────────────
function Spotlight({ spotlights }) {
  const [idx,    setIdx]    = useState(() => Math.floor(Math.random() * spotlights.length));
  const [fading, setFading] = useState(false);

  const go = (i) => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 250); };
  useInterval(() => go((idx + 1) % spotlights.length), 6000);

  if (!spotlights.length) return null;
  const s = spotlights[idx % spotlights.length];

  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Spotlight" extra={
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => go((idx-1+spotlights.length)%spotlights.length)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.3)", color:G.gold, borderRadius:"50%", width:26, height:26, cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
          <button onClick={() => go((idx+1)%spotlights.length)} style={{ background:"none", border:"1px solid rgba(212,168,67,0.3)", color:G.gold, borderRadius:"50%", width:26, height:26, cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
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

// ─── UPDATES FEED ─────────────────────────────────────────────────────────────
function UpdatesFeed({ updates }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://8nmotion.com";
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Family Updates" />
      {updates.map(u => (
        <div key={u.id} style={{ display:"flex", gap:18, padding:"22px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(212,168,67,0.1)", border:"1px solid rgba(212,168,67,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>{u.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"0.76rem", color:G.gray, marginBottom:5 }}><strong style={{ color:G.goldL, fontWeight:500 }}>{u.category}</strong> · {u.time}</div>
            <div style={{ fontSize:"0.9rem", lineHeight:1.7, color:"rgba(250,250,250,0.75)", fontWeight:300, marginBottom:10 }}>{u.text}</div>
            {/* Share buttons */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[
                { label:"Share on X", color:"#1DA1F2", url:`https://twitter.com/intent/tweet?text=${encodeURIComponent(u.category+" update from 8NMotion!")}&url=${encodeURIComponent(shareUrl)}` },
                { label:"Share on Facebook", color:"#1877F2", url:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                { label:"Copy Link", color:G.gold, copy:true },
              ].map((btn,i) => (
                <button key={i} onClick={() => { if (btn.copy) { navigator.clipboard.writeText(shareUrl); } else { window.open(btn.url,"_blank"); } }} style={{ background:`${btn.color}15`, border:`1px solid ${btn.color}35`, color:btn.color, borderRadius:100, padding:"4px 12px", fontSize:"0.68rem", cursor:"pointer", fontFamily:"inherit", fontWeight:500, letterSpacing:"0.04em" }}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── PHOTOS SECTION ───────────────────────────────────────────────────────────
function PhotosSection() {
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
          📸 <strong style={{ color:G.goldL }}>To add photos:</strong> Drop image files into <code style={{ background:"rgba(255,255,255,0.08)", padding:"1px 6px", borderRadius:4 }}>public/photos/</code> in your project and use the Update Site panel to link them.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10 }}>
        {placeholders.map((p,i) => (
          <div key={i} style={{ aspectRatio:"1", borderRadius:10, background:i===0?"linear-gradient(135deg,#1A1200,#2A2000)":G.black2, border:`1px solid ${i===0?"rgba(212,168,67,0.3)":"rgba(255,255,255,0.06)"}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, gridColumn:i===0?"span 2":"span 1", gridRow:i===0?"span 2":"span 1" }}>
            <span style={{ fontSize:i===0?"2.5rem":"1.5rem", opacity:0.35 }}>{p.icon}</span>
            <span style={{ fontSize:"0.7rem", color:i===0?"rgba(212,168,67,0.5)":G.gray, textAlign:"center", padding:"0 10px", lineHeight:1.4 }}>{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SUBSCRIBE FORM ───────────────────────────────────────────────────────────
function SubscribeForm() {
  const [form,    setForm]    = useState({ firstName:"", lastName:"", email:"" });
  const [status,  setStatus]  = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!form.email.trim()) return;
    setStatus("loading");
    try {
      const res  = await fetch("/.netlify/functions/subscribe", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus("success"); setMessage(data.message); }
      else              { setStatus("error");   setMessage(data.error || "Something went wrong."); }
    } catch { setStatus("error"); setMessage("Connection error. Please try again."); }
  };

  if (status === "success") return (
    <div style={{ background:"linear-gradient(135deg,#0A1A00,#0D0D0D)", border:"1px solid rgba(110,226,110,0.3)", borderRadius:16, padding:"40px 32px", textAlign:"center", marginBottom:56 }}>
      <div style={{ fontSize:"2.5rem", marginBottom:12 }}>🎉</div>
      <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", color:"#6EE26E", letterSpacing:"0.04em", marginBottom:8 }}>You're In!</h3>
      <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.9rem", fontWeight:300 }}>{message} You will get an email every time 8NMotion posts a new update.</p>
    </div>
  );

  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Stay in the Loop" />
      <div style={{ background:"linear-gradient(135deg,#1A1200,#0D0D0D)", border:"1px solid rgba(212,168,67,0.25)", borderRadius:16, padding:"36px clamp(20px,4vw,40px)" }}>
        <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.9rem", fontWeight:300, marginBottom:24, lineHeight:1.7 }}>Subscribe to get email updates every time we post something new. Games, milestones, family news, and everything 8NMotion. No spam, just family.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginBottom:12 }}>
          <input type="text" placeholder="First name" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(212,168,67,0.2)", borderRadius:8, padding:"12px 16px", color:G.white, fontSize:"0.9rem", fontFamily:"inherit", outline:"none" }} />
          <input type="text" placeholder="Last name" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(212,168,67,0.2)", borderRadius:8, padding:"12px 16px", color:G.white, fontSize:"0.9rem", fontFamily:"inherit", outline:"none" }} />
          <input type="email" placeholder="Email address *" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} style={{ background:"#0D0D0D", border:"1px solid rgba(212,168,67,0.2)", borderRadius:8, padding:"12px 16px", color:G.white, fontSize:"0.9rem", fontFamily:"inherit", outline:"none" }} />
        </div>
        {status==="error" && <p style={{ fontSize:"0.78rem", color:"#FF6B6B", marginBottom:10 }}>{message}</p>}
        <button onClick={handleSubmit} disabled={status==="loading"||!form.email.trim()} style={{ background:status==="loading"?"rgba(212,168,67,0.4)":G.gold, color:G.black, border:"none", borderRadius:8, padding:"12px 32px", fontWeight:700, fontSize:"0.9rem", cursor:status==="loading"?"not-allowed":"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>
          {status==="loading" ? "Subscribing…" : "Subscribe for Updates →"}
        </button>
        <p style={{ fontSize:"0.72rem", color:G.gray, marginTop:12, fontWeight:300 }}>We will email you when new updates are posted. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const check = () => { if (val===ADMIN_PASSWORD) onSuccess(); else { setErr(true); setVal(""); setTimeout(()=>setErr(false),1800); } };
  return (
    <div style={{ maxWidth:420, margin:"80px auto", padding:"0 24px" }}>
      <div style={{ background:G.black2, border:"1px solid rgba(212,168,67,0.25)", borderRadius:16, padding:36, textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"3rem", color:G.gold, marginBottom:8 }}>8NM</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.06em", color:G.white, marginBottom:6 }}>Admin Access</h2>
        <p style={{ fontSize:"0.82rem", color:G.gray, marginBottom:24, fontWeight:300 }}>Enter your password to update the site</p>
        <input type="password" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} placeholder="Password" style={{ width:"100%", background:"#0D0D0D", border:`1px solid ${err?"rgba(255,80,80,0.5)":"rgba(212,168,67,0.2)"}`, borderRadius:8, padding:"12px 16px", color:G.white, fontSize:"1rem", fontFamily:"inherit", marginBottom:12, outline:"none", textAlign:"center", letterSpacing:"0.1em" }} />
        {err && <p style={{ fontSize:"0.78rem", color:"#FF6B6B", marginBottom:12 }}>Incorrect password. Try again.</p>}
        <button onClick={check} style={{ width:"100%", background:G.gold, color:G.black, border:"none", borderRadius:8, padding:"12px", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>Enter →</button>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ siteData, setSiteData, onSave }) {
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [log,        setLog]        = useState([{ msg:"Ready. Type your update below.", type:"info", ts:"" }]);
  const [notifyMsg,  setNotifyMsg]  = useState("");
  const [notifySubj, setNotifySubj] = useState("");
  const [notifyType, setNotifyType] = useState("general");
  const [notifying,  setNotifying]  = useState(false);
  const logRef = useRef(null);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const addLog = (msg, type="info") => setLog(l => [...l, { msg, type, ts:new Date().toLocaleTimeString() }]);

  const handleNotify = async () => {
    if (!notifySubj.trim()||!notifyMsg.trim()) return;
    setNotifying(true);
    addLog("Sending email to all subscribers...","info");
    try {
      const res  = await fetch("/.netlify/functions/notify", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ subject:notifySubj, message:notifyMsg, updateType:notifyType }) });
      const data = await res.json();
      if (data.success) { addLog(`Email sent! ${data.message}`,"success"); setNotifySubj(""); setNotifyMsg(""); }
      else addLog(`Email error: ${data.error}`,"error");
    } catch (err) { addLog(`Email error: ${err.message}`,"error"); }
    setNotifying(false);
  };

  const examples = [
    "Add a flag football game for Khari on July 12th at 10am at East Cobb Park",
    "Add a spotlight for Raelyn — she won her basketball tournament this weekend",
    "Blaize's golden birthday is August 6th, she turns 6 on the 6th",
    "Add an update: the family had an amazing time at Londan's Sweet 16",
    "Add Kourtney's FIFA World Cup event details for July 15th at State Farm Arena",
  ];

  const handleUpdate = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput(""); setLoading(true);
    addLog(`You: "${userMsg}"`,"user");

    const systemPrompt = `You are the update engine for the 8NMotion family website.
FAMILY: Rod (Dad, CNA, Pharod Thomas Photography), Kourtney (Mom, UPS Brands and Partnerships, FIFA World Cup ATL), Davian (oldest, Air Force, deployed Venezuela until October, "The Prince"), Bailee (11th grade, softball: Impact Gold ATL + Hillgrove HS, track: Hillgrove HS + Peak Performance South, GHSA State 8th All American, "BeautMode"), Raelyn (6th grade, basketball + track + flag football, artist, crochets, "Rae of Sunshine"), Blaize (1st grade, flag football + softball + track + self-taught gymnastics, golden birthday Aug 6 turns 6, "Litty"), Khari (Kindergarten, cousin treated as brother, flag football and baseball coming soon, #8), Legend (family dog, "Fur Sibling").
Spotlight order: Davian, Bailee, Raelyn, Blaize, Khari. No em dashes. Fun personal tone.
CURRENT DATA: ${JSON.stringify(siteData, null, 2)}
Return ONLY valid JSON (no markdown, no backticks):
{ "action":"brief summary", "events":[...full array if changed...], "spotlights":[...full array if changed...], "updates":[...full array if changed...] }
Event fields: id, month (3-letter), day (2-char string), title, sub, tag (track/sports/school/family/special)
Spotlight: id, icon, label, name, title, body, stats ([{num,lbl}])
Update: id, icon, category, time, text
New items: id = max+1. Keep all existing unless told to remove.`;

    try {
      const res  = await fetch("/.netlify/functions/anthropic", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-5", max_tokens:3000, system:systemPrompt, messages:[{role:"user",content:userMsg}] }) });
      const data = await res.json();
      const raw  = data.content?.find(b=>b.type==="text")?.text || "";
      if (!raw) { addLog(`API error: ${JSON.stringify(data).slice(0,200)}`,"error"); setLoading(false); return; }

      let parsed;
      try {
        const cleaned = raw.replace(/```json|```/g,"").trim();
        const start = cleaned.indexOf("{"), end = cleaned.lastIndexOf("}");
        if (start===-1||end===-1) throw new Error("No JSON found");
        parsed = JSON.parse(cleaned.slice(start,end+1));
      } catch(e) { addLog(`Parse error: ${e.message}`,"error"); if(raw) addLog(`Preview: ${raw.slice(0,200)}`,"info"); setLoading(false); return; }

      const newData = {...siteData};
      if (parsed.events)     newData.events     = parsed.events;
      if (parsed.spotlights) newData.spotlights = parsed.spotlights;
      if (parsed.updates)    newData.updates    = parsed.updates;
      setSiteData(newData); onSave(newData);
      addLog(`Done: ${parsed.action||"Site updated!"}`,"success");
    } catch(err) { addLog(`Error: ${err.message}`,"error"); }
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
          <button onClick={() => { setSiteData({events:DEFAULT_EVENTS,spotlights:DEFAULT_SPOTLIGHTS,updates:DEFAULT_UPDATES}); addLog("Site reset to defaults.","info"); }} style={{ background:"none", border:"1px solid rgba(255,100,100,0.3)", color:"rgba(255,100,100,0.7)", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontSize:"0.75rem", fontFamily:"inherit" }}>Reset to defaults</button>
        </div>
        <div style={{ padding:"28px 32px", display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            <label style={{ fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gold, fontWeight:500, display:"block", marginBottom:10 }}>What do you want to update?</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))handleUpdate();}} placeholder='e.g. "Bailee won her softball tournament in Viera!" or "Add Khari flag football game July 12th at East Cobb Park 10am"' style={{ width:"100%", background:"#0D0D0D", border:"1px solid rgba(212,168,67,0.2)", borderRadius:10, padding:"14px 16px", color:G.white, fontSize:"0.9rem", fontFamily:"inherit", lineHeight:1.6, resize:"vertical", minHeight:90, outline:"none" }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <span style={{ fontSize:"0.72rem", color:G.gray }}>Tip: Cmd/Ctrl + Enter to submit</span>
              <button onClick={handleUpdate} disabled={loading||!input.trim()} style={{ background:loading?"rgba(212,168,67,0.4)":G.gold, color:G.black, border:"none", borderRadius:8, padding:"10px 28px", fontWeight:700, fontSize:"0.88rem", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>{loading?"Updating…":"Update Site →"}</button>
            </div>
          </div>
          <div>
            <div style={{ fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gray, marginBottom:10 }}>Quick examples:</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {examples.map((ex,i)=>(
                <button key={i} onClick={()=>setInput(ex)} style={{ background:"rgba(212,168,67,0.06)", border:"1px solid rgba(212,168,67,0.15)", borderRadius:8, padding:"6px 12px", color:"rgba(250,250,250,0.6)", fontSize:"0.74rem", cursor:"pointer", fontFamily:"inherit", textAlign:"left", lineHeight:1.5 }}>{ex}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color:G.gray, marginBottom:8 }}>Activity log</div>
            <div ref={logRef} style={{ background:"#0D0D0D", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"14px 16px", maxHeight:160, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 }}>
              {log.map((l,i)=>(
                <div key={i} style={{ fontSize:"0.78rem", color:logColors[l.type]||G.gray, display:"flex", gap:10 }}>
                  {l.ts&&<span style={{ color:"rgba(255,255,255,0.2)", flexShrink:0 }}>{l.ts}</span>}
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"rgba(212,168,67,0.04)", border:"1px solid rgba(212,168,67,0.1)", borderRadius:10, padding:"16px 20px" }}>
            <div style={{ fontSize:"0.75rem", letterSpacing:"0.06em", textTransform:"uppercase", color:G.gold, marginBottom:10, fontWeight:500 }}>What you can update</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
              {[["📅 Events","Add, edit, or remove games, meets, school events, celebrations"],["⭐ Spotlights","Feature any family member's accomplishments or milestones"],["📢 Updates","Post news, shoutouts, or announcements to the family feed"]].map(([t,d])=>(
                <div key={t}><div style={{ fontSize:"0.82rem", color:G.white, fontWeight:500, marginBottom:3 }}>{t}</div><div style={{ fontSize:"0.75rem", color:G.gray, fontWeight:300, lineHeight:1.5 }}>{d}</div></div>
              ))}
            </div>
          </div>
          <div style={{ background:"rgba(110,226,110,0.04)", border:"1px solid rgba(110,226,110,0.15)", borderRadius:12, padding:"24px 28px" }}>
            <div style={{ fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase", color:"#6EE26E", fontWeight:600, marginBottom:16 }}>📧 Notify Subscribers</div>
            <p style={{ fontSize:"0.82rem", color:G.gray, marginBottom:16, fontWeight:300, lineHeight:1.6 }}>Send an email blast to everyone subscribed to 8NMotion updates.</p>
            <div style={{ display:"flex", gap:10, marginBottom:10, flexWrap:"wrap" }}>
              {["general","events","spotlights","updates"].map(t=>(
                <button key={t} onClick={()=>setNotifyType(t)} style={{ background:notifyType===t?"rgba(110,226,110,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${notifyType===t?"rgba(110,226,110,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:100, padding:"5px 14px", color:notifyType===t?"#6EE26E":G.gray, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit", textTransform:"capitalize" }}>{t}</button>
              ))}
            </div>
            <input type="text" placeholder="Email subject line" value={notifySubj} onChange={e=>setNotifySubj(e.target.value)} style={{ width:"100%", background:"#0D0D0D", border:"1px solid rgba(110,226,110,0.15)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none", marginBottom:10 }} />
            <textarea placeholder="Message body" value={notifyMsg} onChange={e=>setNotifyMsg(e.target.value)} style={{ width:"100%", background:"#0D0D0D", border:"1px solid rgba(110,226,110,0.15)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", minHeight:80, marginBottom:12 }} />
            <button onClick={handleNotify} disabled={notifying||!notifySubj.trim()||!notifyMsg.trim()} style={{ background:notifying?"rgba(110,226,110,0.3)":"rgba(110,226,110,0.15)", border:"1px solid rgba(110,226,110,0.4)", color:"#6EE26E", borderRadius:8, padding:"10px 24px", fontWeight:700, fontSize:"0.85rem", cursor:notifying?"not-allowed":"pointer", fontFamily:"inherit", letterSpacing:"0.04em" }}>
              {notifying?"Sending…":"Send Email to All Subscribers →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div style={{ background:G.black2, borderTop:"1px solid rgba(212,168,67,0.12)", padding:"clamp(24px,4vw,36px) 40px", textAlign:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.4rem", letterSpacing:"0.1em", color:G.gold, marginBottom:6 }}>8NMOTION</div>
      <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"0.95rem", color:G.gold, marginBottom:6 }}>Infinite Love. Endless Motion.</p>
      <p style={{ fontSize:"0.78rem", color:G.gray, fontWeight:300, letterSpacing:"0.04em" }}>Est. 2008 · Share the link, not the texts.</p>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,         setView]         = useState("home");
  const [authed,       setAuthed]       = useState(false);
  const [loaded,       setLoaded]       = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(null);
  const [siteData,     setSiteData]     = useState({ events:DEFAULT_EVENTS, spotlights:DEFAULT_SPOTLIGHTS, updates:DEFAULT_UPDATES });
  const [davianMsgs,   setDavianMsgs]   = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSiteData(JSON.parse(saved));
      const msgs = localStorage.getItem(MESSAGES_KEY);
      if (msgs) setDavianMsgs(JSON.parse(msgs));
    } catch {}
    setLoaded(true);
  }, []);

  const handleSave = (data) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {} };

  const handleAddMessage = (msg) => {
    const updated = [...davianMsgs, msg];
    setDavianMsgs(updated);
    try { localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated)); } catch {}
  };

  const openAdmin = () => setView("admin");

  if (!loaded) return (
    <div style={{ background:G.black, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"4rem", color:G.gold, opacity:0.4 }}>8NM</div>
    </div>
  );

  const showSection = (id) => view==="home" || view===id;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:G.black, color:G.white, minHeight:"100vh", overflowX:"hidden" }}>
      <Hero onSelectMember={setProfileOpen} />
      <Nav view={view} setView={(v) => { setView(v); setProfileOpen(null); }} onAdmin={openAdmin} />

      {view === "admin" ? (
        authed
          ? <AdminPanel siteData={siteData} setSiteData={setSiteData} onSave={handleSave} />
          : <PasswordGate onSuccess={() => setAuthed(true)} />
      ) : profileOpen ? (
        <ProfilePage name={profileOpen} onBack={() => setProfileOpen(null)} messages={davianMsgs} onAddMessage={handleAddMessage} />
      ) : (
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px)" }}>
          {showSection("home")    && <ThisWeek events={siteData.events} />}
          {showSection("crew")    && <CrewSection onSelectMember={setProfileOpen} />}
          {showSection("parents") && <ParentsSection />}
          {showSection("events")  && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,380px),1fr))", gap:32, marginBottom:56 }}>
              <EventsSection events={siteData.events} />
              <Spotlight spotlights={siteData.spotlights} />
            </div>
          )}
          {showSection("updates") && <UpdatesFeed updates={siteData.updates} />}
          {showSection("photos")  && <PhotosSection />}
          {view==="home"          && <SubscribeForm />}
        </div>
      )}

      <Footer />
    </div>
  );
}
