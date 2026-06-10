import { useState, useEffect, useRef, useCallback } from "react";
import { CREW, DEFAULT_EVENTS, DEFAULT_SPOTLIGHTS, DEFAULT_UPDATES, PARENTS, DEFAULT_MEDIA, ATLANTA_UNBOXED } from "./data.js";

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "Infinite";
const STORAGE_KEY    = "8nm-v2";
const MESSAGES_KEY   = "8nm-davian-messages";
const MEDIA_KEY      = "8nm-media-v1";
const VISITS_KEY     = "8nm-visits";

// ─── Seasonal Themes ──────────────────────────────────────────────────────────
function getSeasonalTheme() {
  const mo = new Date().getMonth(); // 0-11
  if (mo >= 5 && mo <= 7) return { // Summer Jun-Aug
    name:"Summer", accent:"#E07820", accent2:"#F0A040", accentDim:"rgba(224,120,32,0.15)",
    border:"rgba(224,120,32,0.3)", tag:"Softball & Travel Ball Season 🥎",
  };
  if (mo >= 8 && mo <= 10) return { // Fall Sep-Nov
    name:"Fall", accent:"#8B2252", accent2:"#C45A8A", accentDim:"rgba(139,34,82,0.15)",
    border:"rgba(139,34,82,0.3)", tag:"Softball · Baseball · Flag Football Season 🏈",
  };
  if (mo >= 11 || mo <= 1) return { // Winter Dec-Feb
    name:"Winter", accent:"#1A6B3A", accent2:"#2EA05A", accentDim:"rgba(26,107,58,0.15)",
    border:"rgba(26,107,58,0.3)", tag:"Basketball & Indoor Track Season 🏀",
  };
  // Spring Mar-May
  return {
    name:"Spring", accent:"#2A8B2A", accent2:"#4DB84D", accentDim:"rgba(42,139,42,0.15)",
    border:"rgba(42,139,42,0.3)", tag:"Track & Field · Peak Performance South 🏃",
  };
}

const SEASON = getSeasonalTheme();

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

// ─── Family Quotes ────────────────────────────────────────────────────────────
const FAMILY_QUOTES = [
  { text:"Infinite Love. Endless Motion.", attr:"8NMotion Family" },
  { text:"We don't just show up. We show out.", attr:"The 8NMotion Crew" },
  { text:"Every number 8 on this field carries a whole family with them.", attr:"Rod" },
  { text:"In this family we cheer the loudest and love the hardest.", attr:"8NMotion, Est. 2008" },
  { text:"From the track to the diamond to the court, we are always moving.", attr:"8NMotion" },
  { text:"Davian showed us what it means to wear 8 with pride. The rest followed.", attr:"The Family" },
  { text:"Family is not always blood. It is the people who show up.", attr:"8NMotion" },
  { text:"No off season when you are built different.", attr:"Blaize, Age 5" },
  { text:"BeautMode does not slow down for anyone.", attr:"Bailee" },
  { text:"She is literally a Rae of Sunshine.", attr:"Everyone who knows Raelyn" },
];

// ─── Profiles ─────────────────────────────────────────────────────────────────
const PROFILES = {
  Rod: {
    icon:"👑", color:"#D4A843", wears8:true,
    bio:"Behind the lens and building something new. Rod is growing Pharod Thomas Photography while stepping into an exciting new chapter with CNA. The same eye for detail that makes him a great dad shows up in every shot he takes. More chapters coming soon.",
    sports:[], activities:["📸 Pharod Thomas Photography","💼 CNA","🏃 Peak Performance South Track Club (Coming Soon)"],
    accomplishments:["Founded Peak Performance South Track Club","Building Pharod Thomas Photography brand","Starting new chapter with CNA"],
    hasMedia:true,
  },
  Kourtney: {
    icon:"👸🏾", color:"#F0CC72", wears8:false,
    bio:"Kourtney holds this family together while making major moves at UPS Brands and Partnerships. She is the force behind Atlanta Unboxed in partnership with Showcase Atlanta, a cross collaboration with UPS and Renee Montgomery that puts a spotlight on local Black owned businesses and the brands that make Atlanta authentically Atlanta. Events, features, and highlights dropping soon. Watch this space.",
    sports:[], activities:["💼 UPS Brands and Partnerships","🎯 Atlanta Unboxed x Showcase Atlanta","🤝 Cross Collaboration with Renee Montgomery","🫶 10 Year Kidney Donation Anniversary — June 10, 2026"],
    accomplishments:["10 Year kidney donation anniversary June 10, 2026","Leading Atlanta Unboxed digital campaign at UPS","Cross collaboration with Renee Montgomery and Showcase Atlanta","Spotlighting Black owned businesses and Atlanta staples"],
    hasMedia:true,
  },
  Davian: {
    icon:"✈️", color:"#7AADFF", wears8:true,
    bio:"Davian set the standard for what it means to wear #8 in this family and then took it to a whole new level by serving in the United States Air Force. Currently deployed in Venezuela, he is out here serving his country while his family holds him down back home. Beyond the uniform Davian is also a talented artist. The Prince is always with us no matter the distance.",
    sports:[], activities:["✈️ United States Air Force","🌍 Currently Deployed — Venezuela","🎨 Artist"],
    accomplishments:["Serving in the United States Air Force","Currently deployed in Venezuela","Set the #8 standard for the whole family","Talented visual artist"],
    deployed:true, hasMedia:true, hasArtwork:true,
  },
  Bailee: {
    icon:"💅🏾💪🏽", color:"#D4A843", wears8:true,
    bio:"Nails done, cleats on, let's go! Bailee is out here doing it ALL. Throwing down on the softball diamond with Impact Gold ATL and Hillgrove, flying down the track for Hillgrove HS and Peak Performance South, and still showing up looking good every step of the way. BeautMode does not slow down for anyone.",
    sports:["🥎 Softball — Impact Gold ATL","🥎 Softball — Hillgrove High School","🏃 Track — Hillgrove High School","🏃 Track — Peak Performance South"],
    activities:["💅🏾 BeautMode","🧶 Crocheting","✨ Big Sister Energy"],
    accomplishments:["GHSA State Track and Field Championships — 8th Place","All American Recognition — GHSA Track and Field","11th Grade at Hillgrove High School","Dual sport athlete — Softball and Track"],
    hasMedia:true,
  },
  Raelyn: {
    icon:"☀️", color:"#F0CC72", wears8:true,
    bio:"She is literally a Rae of Sunshine. Three sports and a whole lot of soul. Raelyn lights up every room, every court, every field she walks into. When she is not running down opponents in basketball, track, or flag football she is creating something beautiful, drawing and crocheting with her big sister Bailee's crafty energy.",
    sports:["🏀 Basketball","🏃 Track","🏈 Flag Football"],
    activities:["☀️ Rae of Sunshine","🎨 Drawing and Art","🧶 Crocheting","✨ Creative Soul"],
    accomplishments:["3 sport athlete — Basketball, Track, Flag Football","6th Grade — Middle School","Most creative kid in the family","Carries that sunshine everywhere she goes"],
    hasMedia:true,
  },
  Blaize: {
    icon:"🔥", color:"#F0A060", wears8:true,
    bio:"Softball, flag football, track AND gymnastics? Blaize literally does not have an off switch. She is teaching herself gymnastics moves while also putting in work on her reading because being Litty means growing in every direction. There is no off season when you are built different.",
    sports:["🏈 Flag Football","🥎 Softball","🏃 Track","🤸 Gymnastics (Self Taught)"],
    activities:["🔥 Litty","📚 Working on Reading","🤸 Teaching herself gymnastics"],
    accomplishments:["4 sport athlete including self-taught gymnastics","1st Grade — just getting started","Golden Birthday August 6, 2026 — turns 6 on the 6th","No off season, no excuses"],
    hasMedia:true,
  },
  Khari: {
    icon:"🚒", color:"#FF6B6B", wears8:true,
    bio:"Khari came into the 8NMotion family and fit right in from day one. The girls claimed him as a brother and that is exactly what he is. He is getting ready to hit the flag football field and baseball diamond when the time comes and best believe the whole family will be there. Family is not always blood and Khari is proof of that.",
    sports:["🏈 Flag Football — Coming Soon","⚾ Baseball — Coming Soon"],
    activities:["🚒 Brother · Family","🏠 Living with the 8NMotion crew through October 2026"],
    accomplishments:["Joined the 8NMotion family June 2026","Starting Kindergarten Fall 2026","Sports registration coming soon","Already one of us"],
    hasMedia:true,
  },
  Legend: {
    icon:"🐾", color:"#888888", wears8:false,
    bio:"Legend is the official fur sibling of the 8NMotion family. Always the first to greet you at the door, always the last to leave your side. Legend does not wear the number 8 but he holds it down for this family every single day just by being Legend.",
    sports:[], activities:["🐾 Professional Greeter","🛋️ Chief Nap Officer","❤️ Fur Sibling"],
    accomplishments:["Beloved fur sibling of the 8NMotion family","Expert at making everyone feel welcome","Holds it down at the house every day"],
    hasMedia:false,
  },
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
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${SEASON.border},transparent)` }} />
      {extra}
    </div>
  );
}

// ─── GOLDEN BIRTHDAY COUNTDOWN ────────────────────────────────────────────────
function BlaizeCountdown() {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const now     = new Date();
      const bday    = new Date(now.getFullYear(), 7, 6); // Aug 6
      if (now > bday) bday.setFullYear(bday.getFullYear() + 1);
      const diff    = bday - now;
      const days    = Math.floor(diff / (1000*60*60*24));
      const hours   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
      const seconds = Math.floor((diff % (1000*60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  if (timeLeft.days > 60) return null; // only show within 60 days

  return (
    <div style={{ background:"linear-gradient(135deg,#1A0800,#0D0D0D)", border:"1px solid rgba(240,120,32,0.4)", borderRadius:16, padding:"24px 28px", marginBottom:40 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, flexWrap:"wrap" }}>
        <span style={{ fontSize:"1.5rem" }}>🔥</span>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", color:"#F0A060", letterSpacing:"0.06em" }}>Blaize's Golden Birthday Countdown</div>
        <div style={{ fontSize:"0.78rem", color:G.gray, fontWeight:300 }}>She turns 6 on August 6th!</div>
      </div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        {[["Days", timeLeft.days], ["Hours", timeLeft.hours], ["Minutes", timeLeft.minutes], ["Seconds", timeLeft.seconds]].map(([lbl, val]) => (
          <div key={lbl} style={{ background:"rgba(240,120,32,0.08)", border:"1px solid rgba(240,120,32,0.2)", borderRadius:12, padding:"14px 20px", textAlign:"center", minWidth:70 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"#F0A060", lineHeight:1 }}>{String(val).padStart(2,"0")}</div>
            <div style={{ fontSize:"0.65rem", color:G.gray, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:4 }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROTATING QUOTE ───────────────────────────────────────────────────────────
function RotatingQuote() {
  const [idx, setIdx]     = useState(() => Math.floor(Math.random() * FAMILY_QUOTES.length));
  const [fading, setFading] = useState(false);
  useInterval(() => {
    setFading(true);
    setTimeout(() => { setIdx(i => (i+1) % FAMILY_QUOTES.length); setFading(false); }, 400);
  }, 7000);
  const q = FAMILY_QUOTES[idx];
  return (
    <div style={{ textAlign:"center", padding:"24px 20px", marginBottom:40, opacity:fading?0:1, transition:"opacity 0.4s ease" }}>
      <div style={{ fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"clamp(1rem,2.5vw,1.3rem)", color:"rgba(212,168,67,0.85)", lineHeight:1.6, marginBottom:8 }}>"{q.text}"</div>
      <div style={{ fontSize:"0.72rem", color:G.gray, letterSpacing:"0.1em", textTransform:"uppercase" }}>{q.attr}</div>
    </div>
  );
}

// ─── MEDIA STRIP ─────────────────────────────────────────────────────────────
function MediaStrip({ media }) {
  const [expanded, setExpanded] = useState(null);
  // Newest first, then duplicate for loop
  const sorted = [...media].sort((a,b) => b.id - a.id);
  const doubled = [...sorted, ...sorted];

  const getEmbedUrl = (item) => {
    if (!item.url) return null;
    if (item.type === "youtube") {
      const id = item.url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
    }
    if (item.type === "tiktok") return item.url;
    return null;
  };

  return (
    <>
      <style>{`
        @keyframes scrollLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .media-strip-track { animation: scrollLeft 40s linear infinite; }
        .media-strip-track:hover { animation-play-state: paused; }
      `}</style>

      {expanded && (
        <div onClick={() => setExpanded(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:G.black2, border:"1px solid rgba(212,168,67,0.3)", borderRadius:16, maxWidth:600, width:"100%", overflow:"hidden" }}>
            {expanded.type === "photo" && expanded.url && (
              <img src={`/photos/${expanded.url}`} alt={expanded.label} style={{ width:"100%", maxHeight:400, objectFit:"cover" }} />
            )}
            {(expanded.type === "youtube" || expanded.type === "tiktok") && getEmbedUrl(expanded) && (
              <div style={{ position:"relative", paddingBottom:"56.25%", height:0 }}>
                <iframe src={getEmbedUrl(expanded)} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%" }} frameBorder="0" allowFullScreen title={expanded.label} />
              </div>
            )}
            {expanded.type === "instagram" && expanded.url && (
              <div style={{ padding:20, textAlign:"center" }}>
                <p style={{ color:G.goldL, fontSize:"0.9rem", marginBottom:12 }}>View on Instagram</p>
                <a href={expanded.url} target="_blank" rel="noreferrer" style={{ background:G.gold, color:G.black, padding:"10px 24px", borderRadius:8, fontWeight:700, fontSize:"0.85rem", textDecoration:"none" }}>Open Post →</a>
              </div>
            )}
            {expanded.type === "highlight" && (
              <div style={{ padding:32, textAlign:"center" }}>
                <div style={{ fontSize:"3rem", marginBottom:12 }}>{expanded.icon}</div>
              </div>
            )}
            <div style={{ padding:"16px 20px 20px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", color:G.gold, letterSpacing:"0.04em", marginBottom:6 }}>{expanded.label}</div>
              <p style={{ color:"rgba(250,250,250,0.65)", fontSize:"0.85rem", lineHeight:1.6, fontWeight:300 }}>{expanded.caption}</p>
              <button onClick={() => setExpanded(null)} style={{ marginTop:16, background:"none", border:"1px solid rgba(212,168,67,0.3)", color:G.gold, borderRadius:8, padding:"8px 20px", cursor:"pointer", fontFamily:"inherit", fontSize:"0.78rem" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ overflow:"hidden", background:G.black2, borderTop:"1px solid rgba(212,168,67,0.1)", borderBottom:"1px solid rgba(212,168,67,0.1)", padding:"16px 0", position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:60, background:`linear-gradient(to right,${G.black2},transparent)`, zIndex:2, pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:60, background:`linear-gradient(to left,${G.black2},transparent)`, zIndex:2, pointerEvents:"none" }} />
        <div className="media-strip-track" style={{ display:"flex", gap:12, width:"max-content", paddingLeft:12 }}>
          {doubled.map((item, i) => (
            <div key={i} onClick={() => setExpanded(item)} style={{ flexShrink:0, width:200, background:G.black, border:"1px solid rgba(212,168,67,0.15)", borderRadius:12, overflow:"hidden", cursor:"pointer", transition:"border-color 0.2s", position:"relative" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(212,168,67,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(212,168,67,0.15)"}
            >
              <div style={{ height:110, background:"linear-gradient(135deg,#1A1200,#2A2000)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                {item.type === "photo" && item.url
                  ? <img src={`/photos/${item.url}`} alt={item.label} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : item.type === "youtube" && item.url
                  ? <img src={`https://img.youtube.com/vi/${item.url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]}/mqdefault.jpg`} alt={item.label} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <span style={{ fontSize:"2.5rem", opacity:0.4 }}>{item.icon || "8️⃣"}</span>
                }
                {(item.type === "youtube" || item.type === "tiktok" || item.type === "instagram") && (
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.3)" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(212,168,67,0.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:"0.9rem", marginLeft:3 }}>▶</span>
                    </div>
                  </div>
                )}
                <div style={{ position:"absolute", top:6, right:6, background:"rgba(0,0,0,0.7)", borderRadius:100, padding:"2px 8px", fontSize:"0.58rem", color:G.gold, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  {item.type === "youtube" ? "YouTube" : item.type === "instagram" ? "Instagram" : item.type === "tiktok" ? "TikTok" : item.type === "photo" ? "Photo" : "Highlight"}
                </div>
              </div>
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:600, color:G.white, lineHeight:1.3, marginBottom:3, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.label}</div>
                <div style={{ fontSize:"0.68rem", color:G.gray, lineHeight:1.4, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{item.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ATLANTA UNBOXED ──────────────────────────────────────────────────────────
function AtlantaUnboxedFeature() {
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Atlanta Unboxed" />
      <div style={{ background:"linear-gradient(135deg,#0A0A1A,#0D0D0D)", border:"1px solid rgba(240,204,114,0.3)", borderRadius:16, overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(90deg,rgba(240,204,114,0.12),rgba(240,204,114,0.04))", borderBottom:"1px solid rgba(240,204,114,0.15)", padding:"20px 32px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", color:G.goldL, letterSpacing:"0.06em" }}>Atlanta Unboxed</div>
          <div style={{ width:1, height:24, background:"rgba(240,204,114,0.25)", flexShrink:0 }} />
          <div style={{ fontSize:"0.78rem", color:"rgba(240,204,114,0.7)" }}>x Showcase Atlanta</div>
          <div style={{ width:1, height:24, background:"rgba(240,204,114,0.25)", flexShrink:0 }} />
          <div style={{ fontSize:"0.78rem", color:"rgba(240,204,114,0.7)" }}>UPS Brands and Partnerships</div>
          <div style={{ marginLeft:"auto", background:"rgba(240,204,114,0.1)", border:"1px solid rgba(240,204,114,0.25)", borderRadius:100, padding:"4px 14px", fontSize:"0.68rem", color:G.goldL, fontWeight:600, letterSpacing:"0.06em", whiteSpace:"nowrap" }}>COMING SOON</div>
        </div>
        <div style={{ padding:"28px 32px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:28 }}>
          <div>
            <div style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:G.goldL, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ display:"inline-block", width:20, height:2, background:G.goldL }} />👸🏾 The Campaign
            </div>
            <p style={{ color:"rgba(250,250,250,0.65)", fontSize:"0.9rem", lineHeight:1.75, fontWeight:300 }}>{ATLANTA_UNBOXED.body}</p>
          </div>
          <div>
            <div style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:G.goldL, fontWeight:600, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ display:"inline-block", width:20, height:2, background:G.goldL }} />🤝 The Collaboration
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { icon:"📦", name:"UPS Brands and Partnerships", role:"Campaign Partner" },
                { icon:"👸🏾", name:"Kourtney", role:"UPS Lead · Campaign Force" },
                { icon:"🏀", name:"Renee Montgomery", role:"Cross Collaboration Partner" },
                { icon:"🏙️", name:"Showcase Atlanta", role:"Platform Partner" },
              ].map((p,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 14px" }}>
                  <span style={{ fontSize:"1.2rem" }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize:"0.82rem", fontWeight:500, color:G.white }}>{p.name}</div>
                    <div style={{ fontSize:"0.7rem", color:G.gray, fontWeight:300 }}>{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(240,204,114,0.1)", padding:"24px 32px" }}>
          {/* Block Party Recap */}
          <div style={{ background:"rgba(240,204,114,0.06)", border:"1px solid rgba(240,204,114,0.2)", borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <span style={{ fontSize:"1.3rem" }}>🌍⚽</span>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:G.goldL, letterSpacing:"0.04em" }}>World Cup Block Party — June 9, 2026</div>
              <div style={{ marginLeft:"auto", background:"rgba(110,226,110,0.1)", border:"1px solid rgba(110,226,110,0.3)", borderRadius:100, padding:"3px 12px", fontSize:"0.65rem", color:"#6EE26E", fontWeight:600 }}>IT HAPPENED</div>
            </div>
            <p style={{ color:"rgba(250,250,250,0.65)", fontSize:"0.88rem", lineHeight:1.75, fontWeight:300, marginBottom:16 }}>
              Kourtney hosted the UPS x World Cup Block Party as part of Atlanta Unboxed in partnership with Showcase Atlanta, officially kicking off the World Cup coming to Atlanta. The event brought the World Cup experience to parts of the city that would not otherwise see it. The 8NMotion kids were there soaking in every moment. This is history and our family was part of making it happen.
            </p>
            {/* Photo placeholders */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:8 }}>
              {["IMG_0038 (2).jpg","IMG_0073.jpg"].map((file,i) => (
                <div key={i} style={{ aspectRatio:"1", borderRadius:8, overflow:"hidden", border:"1px solid rgba(240,204,114,0.2)" }}>
                  <img src={`/photos/blockparty/${file}`} alt={`Block Party ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
              {[3,4,5,6].map(i => (
                <div key={i} style={{ aspectRatio:"1", borderRadius:8, background:"linear-gradient(135deg,#0A0A1A,#1A1A2A)", border:"1px solid rgba(240,204,114,0.15)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
                  <span style={{ fontSize:"1.2rem", opacity:0.25 }}>📸</span>
                  <span style={{ fontSize:"0.58rem", color:"rgba(240,204,114,0.3)" }}>Photo {i}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize:"0.7rem", color:G.gray, marginTop:10, fontWeight:300 }}>Photos coming soon — drop block party photos into <code style={{ background:"rgba(255,255,255,0.06)", padding:"1px 5px", borderRadius:4 }}>public/photos/blockparty/</code></p>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(240,204,114,0.1)", padding:"16px 32px", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:G.goldL, boxShadow:`0 0 8px ${G.goldL}`, flexShrink:0 }} />
          <span style={{ fontSize:"0.8rem", color:"rgba(240,204,114,0.6)", fontStyle:"italic", fontFamily:"'Lora',serif" }}>More event highlights, featured businesses, and campaign updates dropping soon. Watch this space.</span>
        </div>
      </div>
    </section>
  );
}

// ─── THIS WEEK ────────────────────────────────────────────────────────────────
function ThisWeek({ events }) {
  const now  = new Date();
  const in7  = new Date(now.getTime() + 7*24*60*60*1000);
  const mos  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const yr   = now.getFullYear();
  const upcoming = events.filter(ev => {
    const d = new Date(`${ev.month} ${ev.day}, ${yr}`);
    return d >= now && d <= in7;
  }).sort((a,b) => new Date(`${a.month} ${a.day}, ${yr}`) - new Date(`${b.month} ${b.day}, ${yr}`));
  if (!upcoming.length) return null;
  return (
    <section style={{ marginBottom:40 }}>
      <div style={{ background:"linear-gradient(135deg,#0A1A00,#0D0D0D)", border:`1px solid ${SEASON.border}`, borderRadius:16, padding:"24px 28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:SEASON.accent, boxShadow:`0 0 8px ${SEASON.accent}` }} />
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em", color:SEASON.accent2 }}>THIS WEEK</span>
          <span style={{ fontSize:"0.72rem", color:G.gray, marginLeft:4 }}>{upcoming.length} event{upcoming.length>1?"s":""} coming up</span>
          <span style={{ marginLeft:"auto", fontSize:"0.68rem", color:SEASON.accent2, fontWeight:500 }}>{SEASON.tag}</span>
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
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${G.gold},transparent)` }} />
      <div style={{ position:"relative", maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px) clamp(28px,4vw,48px)", width:"100%", flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div style={{ position:"absolute", top:"clamp(16px,3vw,36px)", right:"clamp(20px,4vw,40px)", textAlign:"right" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", color:G.gold, lineHeight:1 }}>{now.getDate()}</div>
          <div style={{ fontSize:"0.7rem", color:G.gray, letterSpacing:"0.08em" }}>{now.toLocaleDateString("en-US",{month:"short",year:"numeric"}).toUpperCase()}</div>
        </div>
        <div style={{ fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", color:G.gold, fontWeight:500, marginBottom:10 }}>Est. 2008 · Family Hub · {SEASON.name} Season</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,9vw,7.5rem)", lineHeight:0.92, letterSpacing:"0.02em" }}>
          <span style={{ color:G.gold }}>8N</span>Motion
        </h1>
        <p style={{ marginTop:16, fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"1rem", color:G.gold, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ display:"block", width:32, height:1, background:G.gold, flexShrink:0 }} />
          Infinite Love. Endless Motion.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:28 }}>
          {CREW.map(m => (
            <span key={m.name} onClick={() => onSelectMember(m.name)}
              style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.2)", borderRadius:100, padding:"5px 14px", fontSize:"0.78rem", color:G.goldL, display:"flex", alignItems:"center", gap:6, cursor:"pointer", transition:"all 0.2s" }}
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

// ─── PROFILE MEDIA GALLERY ────────────────────────────────────────────────────
function ProfileMediaGallery({ name, p }) {
  const [expanded, setExpanded] = useState(null);
  const placeholders = Array(4).fill(null);
  const artPlaceholders = Array(3).fill(null);

  const getEmbedUrl = (item) => {
    if (!item?.url) return null;
    if (item.type === "youtube") {
      const id = item.url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
    }
    return null;
  };

  return (
    <div style={{ background:G.black2, border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.gold, marginBottom:6 }}>Photos and Videos</div>
      <p style={{ fontSize:"0.72rem", color:G.gray, marginBottom:16, fontWeight:300 }}>
        Drop files into <code style={{ background:"rgba(255,255,255,0.06)", padding:"1px 5px", borderRadius:4 }}>public/photos/{name.toLowerCase()}/</code> to populate this gallery.
      </p>

      {/* Artwork section for Davian */}
      {p.hasArtwork && (
        <>
          <div style={{ fontSize:"0.78rem", color:"#7AADFF", fontWeight:600, marginBottom:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>🎨 Davian's Artwork</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8, marginBottom:20 }}>
            {artPlaceholders.map((_, i) => (
              <div key={i} style={{ aspectRatio:"1", borderRadius:10, background:"linear-gradient(135deg,#0A1020,#1A2030)", border:"1px solid rgba(122,173,255,0.2)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
                <span style={{ fontSize:"1.4rem", opacity:0.25 }}>🎨</span>
                <span style={{ fontSize:"0.62rem", color:"rgba(122,173,255,0.4)", textAlign:"center" }}>Artwork {i+1}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Block Party section for Kourtney */}
      {name === "Kourtney" && (
        <div style={{ background:G.black2, border:"1px solid rgba(240,204,114,0.25)", borderRadius:14, padding:"24px 28px", marginBottom:16 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:G.goldL, marginBottom:6 }}>🌍 World Cup Block Party — June 9, 2026</div>
          <p style={{ fontSize:"0.78rem", color:G.gray, marginBottom:14, fontWeight:300, lineHeight:1.6 }}>UPS x Atlanta Unboxed x Showcase Atlanta. Kourtney brought the World Cup to Atlanta communities. The 8NMotion kids were there for every moment.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:8 }}>
            {["IMG_0038 (2).jpg","IMG_0073.jpg"].map((file,i) => (
              <div key={i} style={{ aspectRatio:"1", borderRadius:8, overflow:"hidden", border:"1px solid rgba(240,204,114,0.2)" }}>
                <img src={`/photos/blockparty/${file}`} alt={`Block Party ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            ))}
            {[3,4,5,6].map(i => (
              <div key={i} style={{ aspectRatio:"1", borderRadius:8, background:"linear-gradient(135deg,#0A0A1A,#1A1A2A)", border:"1px solid rgba(240,204,114,0.15)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
                <span style={{ fontSize:"1.2rem", opacity:0.25 }}>📸</span>
                <span style={{ fontSize:"0.58rem", color:"rgba(240,204,114,0.3)" }}>Photo {i}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize:"0.7rem", color:G.gray, marginTop:10, fontWeight:300 }}>Add photos to <code style={{ background:"rgba(255,255,255,0.06)", padding:"1px 5px", borderRadius:4 }}>public/photos/blockparty/</code></p>
        </div>
      )}

      {/* Photos and videos grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8 }}>
        {placeholders.map((_, i) => (
          <div key={i} style={{ aspectRatio:"1", borderRadius:10, background:"linear-gradient(135deg,#1A1200,#2A2000)", border:`1px solid ${p.color}20`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
            <span style={{ fontSize:"1.4rem", opacity:0.25 }}>{i % 2 === 0 ? p.icon : "🎥"}</span>
            <span style={{ fontSize:"0.62rem", color:`${p.color}40`, textAlign:"center" }}>{i % 2 === 0 ? "Add Photo" : "Add Video"}</span>
          </div>
        ))}
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
    onAddMessage({ from:msgForm.from, text:msgForm.text, ts:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) });
    setMsgForm({ from:"", text:"" });
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"clamp(24px,4vw,48px) clamp(20px,4vw,40px)" }}>
      <button onClick={onBack} style={{ background:"none", border:"1px solid rgba(212,168,67,0.25)", borderRadius:100, color:G.gold, padding:"7px 18px", fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", marginBottom:28, display:"flex", alignItems:"center", gap:8 }}>
        ← Back to Crew
      </button>

      {/* Header */}
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
        {p.deployed && (
          <div style={{ marginTop:20, background:"rgba(122,173,255,0.08)", border:"1px solid rgba(122,173,255,0.25)", borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:"1.2rem" }}>✈️</span>
            <div>
              <div style={{ fontSize:"0.78rem", color:"#7AADFF", fontWeight:600 }}>Currently Deployed — Venezuela</div>
              <div style={{ fontSize:"0.74rem", color:G.gray, fontWeight:300 }}>Send some love from home using the message wall below!</div>
            </div>
          </div>
        )}
      </div>

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

      {/* Photos and Videos — everyone except Legend */}
      {p.hasMedia && <ProfileMediaGallery name={name} p={p} />}

      {/* Davian Message Wall */}
      {p.deployed && (
        <div style={{ background:"linear-gradient(135deg,#0A1020,#0D0D0D)", border:"1px solid rgba(122,173,255,0.25)", borderRadius:14, padding:"24px 28px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", color:"#7AADFF", marginBottom:6 }}>Messages from Home ✈️</div>
          <p style={{ fontSize:"0.8rem", color:G.gray, marginBottom:20, fontWeight:300 }}>Leave Davian a message. He will see every single one when he gets back. Let him know we are with him.</p>
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
              <input type="text" placeholder="Your name" value={msgForm.from} onChange={e=>setMsgForm(f=>({...f,from:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(122,173,255,0.2)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <textarea placeholder="Write something for Davian..." value={msgForm.text} onChange={e=>setMsgForm(f=>({...f,text:e.target.value}))} style={{ background:"#0D0D0D", border:"1px solid rgba(122,173,255,0.2)", borderRadius:8, padding:"11px 14px", color:G.white, fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", minHeight:80 }} />
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
          <div key={m.name} onClick={() => onSelectMember(m.name)}
            style={{ background:G.black2, border:`1px solid rgba(212,168,67,0.3)`, borderRadius:14, padding:"20px 12px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor=G.gold; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(212,168,67,0.3)"; }}
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
  const members = ["All", ...CREW.filter(c => c.name !== "Legend" && c.name !== "Kourtney" && c.name !== "Rod").map(c => c.name),"Family"];
  const [filter, setFilter] = useState("All");

  const sorted = [...events].sort((a,b) => {
    const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mi = mo.indexOf(a.month) - mo.indexOf(b.month);
    return mi !== 0 ? mi : parseInt(a.day) - parseInt(b.day);
  });

  const filtered = filter === "All" ? sorted : sorted.filter(ev => {
    if (filter === "Family") return ev.tag === "family";
    return ev.title.toLowerCase().includes(filter.toLowerCase()) || (ev.member && ev.member === filter);
  });

  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Upcoming Events" />
      {/* Filter chips */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
        {members.map(m => (
          <button key={m} onClick={() => setFilter(m)} style={{ background:filter===m?`rgba(212,168,67,0.2)`:"rgba(255,255,255,0.04)", border:`1px solid ${filter===m?"rgba(212,168,67,0.5)":"rgba(255,255,255,0.1)"}`, borderRadius:100, padding:"5px 14px", color:filter===m?G.gold:G.gray, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit", fontWeight:filter===m?600:400, transition:"all 0.2s" }}>{m}</button>
        ))}
      </div>
      {filtered.length === 0
        ? <p style={{ color:G.gray, fontSize:"0.9rem" }}>No events found. Add some from the Update Site panel!</p>
        : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(ev => {
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
  useInterval(() => go((idx+1) % spotlights.length), 6000);
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
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://8nmotion.com";
  return (
    <section style={{ marginBottom:56 }}>
      <SectionHead title="Family Updates" />
      {updates.map(u => (
        <div key={u.id} style={{ display:"flex", gap:18, padding:"22px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(212,168,67,0.1)", border:"1px solid rgba(212,168,67,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>{u.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"0.76rem", color:G.gray, marginBottom:5 }}><strong style={{ color:G.goldL, fontWeight:500 }}>{u.category}</strong> · {u.time}</div>
            <div style={{ fontSize:"0.9rem", lineHeight:1.7, color:"rgba(250,250,250,0.75)", fontWeight:300, marginBottom:10 }}>{u.text}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[
                { label:"Share on X", color:"#1DA1F2", url:`https://twitter.com/intent/tweet?text=${encodeURIComponent(u.category+" update from 8NMotion!")}&url=${encodeURIComponent(shareUrl)}` },
                { label:"Share on Facebook", color:"#1877F2", url:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                { label:"Copy Link", color:G.gold, copy:true },
              ].map((btn,i) => (
                <button key={i} onClick={() => { if(btn.copy){navigator.clipboard.writeText(shareUrl);}else{window.open(btn.url,"_blank");} }} style={{ background:`${btn.color}15`, border:`1px solid ${btn.color}35`, color:btn.color, borderRadius:100, padding:"4px 12px", fontSize:"0.68rem", cursor:"pointer", fontFamily:"inherit", fontWeight:500, letterSpacing:"0.04em" }}>
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
          📸 <strong style={{ color:G.goldL }}>To add photos:</strong> Drop image files into <code style={{ background:"rgba(255,255,255,0.08)", padding:"1px 6px", borderRadius:4 }}>public/photos/</code> in your project and let Claude know what was uploaded.
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
        <p style={{ color:"rgba(250,250,250,0.6)", fontSize:"0.9rem", fontWeight:300, marginBottom:24, lineHeight:1.7 }}>Subscribe to get email updates every time we post something new. No spam, just family.</p>
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
  const check = () => { if(val===ADMIN_PASSWORD) onSuccess(); else { setErr(true); setVal(""); setTimeout(()=>setErr(false),1800); } };
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
function AdminPanel({ siteData, setSiteData, onSave, mediaItems, setMediaItems, onSaveMedia, visitCount }) {
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [log,        setLog]        = useState([{ msg:"Ready. Type your update below.", type:"info", ts:"" }]);
  const [notifyMsg,  setNotifyMsg]  = useState("");
  const [notifySubj, setNotifySubj] = useState("");
  const [notifyType, setNotifyType] = useState("general");
  const [notifying,  setNotifying]  = useState(false);
  const logRef = useRef(null);

  useEffect(() => { if(logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);
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
    } catch(err) { addLog(`Email error: ${err.message}`,"error"); }
    setNotifying(false);
  };

  const examples = [
    "Add a flag football game for Khari on July 12th at 10am at East Cobb Park",
    "Add a spotlight for Raelyn — she won her basketball tournament this weekend",
    "Add a YouTube video to the media strip: https://youtube.com/watch?v=xyz — Bailee tournament highlights",
    "Add an Instagram post to the media strip: https://instagram.com/p/xyz — Atlanta Unboxed event",
    "Bailee's softball tournament starts July 15th in Viera FL — add to events",
  ];

  const handleUpdate = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput(""); setLoading(true);
    addLog(`You: "${userMsg}"`,"user");
    const systemPrompt = `You are the update engine for the 8NMotion family website.
FAMILY: Rod (Dad, CNA, Pharod Thomas Photography), Kourtney (Mom, UPS, Atlanta Unboxed x Showcase Atlanta x Renee Montgomery), Davian (Air Force, deployed Venezuela, "The Prince"), Bailee (11th grade, softball+track, GHSA All American, "BeautMode"), Raelyn (6th grade, basketball+track+flag football, artist, "Rae of Sunshine"), Blaize (1st grade, 4 sports, golden bday Aug 6 2026, "Litty"), Khari (Kindergarten, brother, with family through Oct 2026, #8), Legend (fur sibling).
Spotlight order: Davian, Bailee, Raelyn, Blaize, Khari. No em dashes. Fun tone. Current year is 2026.
CURRENT DATA:${JSON.stringify(siteData)}
CURRENT MEDIA:${JSON.stringify(mediaItems)}
Return ONLY compact valid JSON (no markdown, no backticks):
{"action":"summary","events":[...only if changed...],"spotlights":[...only if changed...],"updates":[...only if changed...],"media":[...only if changed...]}
Only include sections that changed. Keep all existing items unless told to remove. New items id=max+1.
For media: newest items should have higher ids so they appear first in the strip.
Event: id,month(3-letter),day(2-char string),title,sub,tag(track/sports/school/family/special)
Spotlight: id,icon,label,name,title,body,stats([{num,lbl}])
Update: id,icon,category,time,text
Media: id,type(highlight/photo/youtube/instagram/tiktok),icon,label,caption,url(optional)`;
    try {
      const res  = await fetch("/.netlify/functions/anthropic", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-5", max_tokens:2500, system:systemPrompt, messages:[{role:"user",content:userMsg}] }) });
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
      if (parsed.media) { setMediaItems(parsed.media); onSaveMedia(parsed.media); }
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
          {/* Visitor Counter */}
          <div style={{ background:"rgba(212,168,67,0.08)", border:"1px solid rgba(212,168,67,0.2)", borderRadius:12, padding:"12px 20px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.8rem", color:G.gold, lineHeight:1 }}>{visitCount.toLocaleString()}</div>
            <div style={{ fontSize:"0.65rem", color:G.gray, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:2 }}>Site Visits</div>
          </div>
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
              {[["📅 Events","Add, edit, or remove games, meets, school events, celebrations"],["⭐ Spotlights","Feature any family member's accomplishments or milestones"],["📢 Updates","Post news, shoutouts, or announcements to the family feed"],["🎬 Media Strip","Add photos, YouTube, Instagram, or TikTok to the scrolling strip"]].map(([t,d])=>(
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
    <div style={{ background:G.black2, borderTop:`1px solid ${SEASON.border}`, padding:"clamp(24px,4vw,36px) 40px", textAlign:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.4rem", letterSpacing:"0.1em", color:G.gold, marginBottom:6 }}>8NMOTION</div>
      <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic", fontSize:"0.95rem", color:G.gold, marginBottom:6 }}>Infinite Love. Endless Motion.</p>
      <p style={{ fontSize:"0.78rem", color:G.gray, fontWeight:300, letterSpacing:"0.04em" }}>Est. 2008 · {SEASON.name} Season · Share the link, not the texts.</p>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,        setView]        = useState("home");
  const [authed,      setAuthed]      = useState(false);
  const [loaded,      setLoaded]      = useState(false);
  const [profileOpen, setProfileOpen] = useState(null);
  const [siteData,    setSiteData]    = useState({ events:DEFAULT_EVENTS, spotlights:DEFAULT_SPOTLIGHTS, updates:DEFAULT_UPDATES });
  const [mediaItems,  setMediaItems]  = useState(DEFAULT_MEDIA);
  const [davianMsgs,  setDavianMsgs]  = useState([]);
  const [visitCount,  setVisitCount]  = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSiteData(JSON.parse(saved));
      const msgs = localStorage.getItem(MESSAGES_KEY);
      if (msgs) setDavianMsgs(JSON.parse(msgs));
      const media = localStorage.getItem(MEDIA_KEY);
      if (media) setMediaItems(JSON.parse(media));
      // Visitor counter
      const visits = parseInt(localStorage.getItem(VISITS_KEY) || "0") + 1;
      localStorage.setItem(VISITS_KEY, visits);
      setVisitCount(visits);
    } catch {}
    setLoaded(true);
  }, []);

  const handleSave      = (data)  => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data));  } catch {} };
  const handleSaveMedia = (media) => { try { localStorage.setItem(MEDIA_KEY,   JSON.stringify(media)); } catch {} };

  const handleAddMessage = (msg) => {
    const updated = [...davianMsgs, msg];
    setDavianMsgs(updated);
    try { localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated)); } catch {}
  };

  if (!loaded) return (
    <div style={{ background:G.black, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"4rem", color:G.gold, opacity:0.4 }}>8NM</div>
    </div>
  );

  const showSection = (id) => view==="home" || view===id;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:G.black, color:G.white, minHeight:"100vh", overflowX:"hidden" }}>
      <Hero onSelectMember={setProfileOpen} />
      <Nav view={view} setView={(v) => { setView(v); setProfileOpen(null); }} onAdmin={() => setView("admin")} />
      {(view==="home"||view==="media") && <MediaStrip media={mediaItems} />}

      {view === "admin" ? (
        authed
          ? <AdminPanel siteData={siteData} setSiteData={setSiteData} onSave={handleSave} mediaItems={mediaItems} setMediaItems={setMediaItems} onSaveMedia={handleSaveMedia} visitCount={visitCount} />
          : <PasswordGate onSuccess={() => setAuthed(true)} />
      ) : profileOpen ? (
        <ProfilePage name={profileOpen} onBack={() => setProfileOpen(null)} messages={davianMsgs} onAddMessage={handleAddMessage} />
      ) : (
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"clamp(32px,5vw,56px) clamp(20px,4vw,40px)" }}>
          {showSection("home")    && <BlaizeCountdown />}
          {showSection("home")    && <RotatingQuote />}
          {showSection("home")    && <ThisWeek events={siteData.events} />}
          {showSection("crew")    && <CrewSection onSelectMember={setProfileOpen} />}
          {showSection("parents") && <ParentsSection />}
          {showSection("parents") && <AtlantaUnboxedFeature />}
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
