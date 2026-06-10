// ─── Crew ────────────────────────────────────────────────────────────────────
export const CREW = [
  { name: "Rod",      role: "Dad",                                        icon: "👑",       wears8: true  },
  { name: "Kourtney", role: "Mom",                                        icon: "👸🏾",     wears8: false },
  { name: "Davian",   role: "The Prince",                                 icon: "✈️",       wears8: true  },
  { name: "Bailee",   role: "BeautMode · Softball · Track",               icon: "💅🏾💪🏽", wears8: true  },
  { name: "Raelyn",   role: "Sunshine · Basketball · Track · Flag Football", icon: "☀️",    wears8: true  },
  { name: "Blaize",   role: "Litty · Flag Football · Softball · Track",   icon: "🔥",       wears8: true  },
  { name: "Khari",    role: "Brother · Family",                           icon: "🚒",       wears8: true  },
  { name: "Legend",   role: "Fur Sibling",                                icon: "🐾",       wears8: false },
];

// ─── Default Events ───────────────────────────────────────────────────────────
export const DEFAULT_EVENTS = [
  { id: 1,  month: "Jun", day: "09", title: "UPS x World Cup Block Party 🌍⚽",              sub: "Atlanta · Kourtney x UPS x Showcase Atlanta · Today!",  tag: "special" },
  { id: 2,  month: "Jun", day: "10", title: "Kourtney's 10 Year Kidney Donation Anniversary 🫶", sub: "10 Years of Selfless Love · Annual Celebration",        tag: "family"  },
  { id: 3,  month: "Jun", day: "19", title: "Juneteenth Family Celebration 🖤❤️💚",          sub: "Family · Annual Tradition",                            tag: "family"  },
  { id: 4,  month: "Jun", day: "21", title: "Softball Tournament — Viera, FL 🥎",            sub: "Viera, FL · Jun 21–27 · Details TBD",                  tag: "sports"  },
  { id: 5,  month: "Jun", day: "23", title: "Kourtney's Birthday 🎂👸🏾",                    sub: "Turning 41 · Celebrate the Queen!",                    tag: "family"  },
  { id: 6,  month: "Aug", day: "06", title: "Blaize's Golden Birthday 🔥🎂",                 sub: "She turns 6 on the 6th! · Golden Birthday!",           tag: "special" },
];

// ─── Default Spotlights (age order: Davian, Bailee, Raelyn, Blaize, Khari) ───
export const DEFAULT_SPOTLIGHTS = [
  {
    id: 1,
    icon: "✈️",
    label: "Family Spotlight",
    name: "Davian",
    title: "The Prince Is Serving!",
    body: "Davian set the standard for what it means to wear #8 in this family and then took it to a whole new level by serving in the United States Air Force. Currently deployed in Venezuela until October, he is out here serving his country while his family holds him down back home. If you want to send some love from home reach out and we will make sure it gets to him. The Prince is always with us no matter the distance.",
    stats: [{ num: "USAF", lbl: "Air Force" }, { num: "VEN", lbl: "Deployed" }, { num: "#8", lbl: "Our Hero" }],
  },
  {
    id: 2,
    icon: "💅🏾",
    label: "Athlete Spotlight",
    name: "Bailee",
    title: "All American! Bailee Did That!",
    body: "Nails done, cleats on, let's go! Bailee finished 8th in the STATE of Georgia at the GHSA Track and Field State Championship and earned All American recognition in the process. All American. Let that sink in. On top of that she is throwing down on the softball diamond with Impact Gold ATL and Hillgrove HS. BeautMode does not slow down for anyone.",
    stats: [{ num: "8th", lbl: "State Finish" }, { num: "AA", lbl: "All American" }, { num: "#8", lbl: "Her Number" }],
  },
  {
    id: 3,
    icon: "☀️",
    label: "Kid Spotlight",
    name: "Raelyn",
    title: "Rae of Sunshine!",
    body: "She is literally a Rae of Sunshine. Three sports and a whole lot of soul. Raelyn lights up every room, every court, every field she walks into. When she is not running down opponents in basketball, track, or flag football she is creating something beautiful, drawing and crocheting with her big sister Bailee's crafty energy. Rae of Sunshine is not just a nickname. It is exactly who she is.",
    stats: [{ num: "3", lbl: "Sports" }, { num: "🎨", lbl: "Artist" }, { num: "#8", lbl: "Her Number" }],
  },
  {
    id: 4,
    icon: "🔥",
    label: "Kid Spotlight",
    name: "Blaize",
    title: "Blaize is Litty!",
    body: "Softball, flag football, track AND gymnastics? Blaize literally does not have an off switch. She is teaching herself gymnastics moves while also putting in work on her reading because being Litty means growing in every direction. There is no off season when you are built different. Every field, every mat, every page knows her name.",
    stats: [{ num: "4", lbl: "Activities" }, { num: "🤸", lbl: "Self Taught" }, { num: "#8", lbl: "Her Number" }],
  },
  {
    id: 5,
    icon: "🚒",
    label: "Welcome Spotlight",
    name: "Khari",
    title: "Khari Is Home!",
    body: "Khari came into the 8NMotion family and fit right in from day one. The girls claimed him as a brother and that is exactly what he is. He is getting ready to hit the flag football field and baseball diamond when the time comes and best believe the whole family will be there. Family is not always blood and Khari is proof of that.",
    stats: [{ num: "#8", lbl: "His Number" }, { num: "❤️", lbl: "Brother" }, { num: "🙌", lbl: "Welcome Home" }],
  },
];

// ─── Default Updates (most recent first) ─────────────────────────────────────
export const DEFAULT_UPDATES = [
  {
    id: 1,
    icon: "🌍",
    category: "Atlanta Unboxed x UPS",
    time: "Today · June 9, 2026",
    text: "Kourtney did that! Today she hosted the UPS x World Cup Block Party as part of Atlanta Unboxed in partnership with Showcase Atlanta, a cross collaboration with UPS and Renee Montgomery. The block party officially kicked off the World Cup coming to Atlanta, bringing the experience to parts of the city that would not otherwise see it. And yes the kids were there too soaking it all in. This is history and our family was part of it. Proud does not even cover it. Photos coming soon!",
  },
  {
    id: 2,
    icon: "🏆",
    category: "Track and Field",
    time: "This Week",
    text: "BAILEE DID THAT! Competing at the GHSA Track and Field State Championship, Bailee finished 8th in the STATE of Georgia and earned All American recognition in the process. All American. Let that sink in. From early morning practices with Peak Performance South to representing Hillgrove High on the biggest stage, she put in the work and the work paid off. BeautMode on the track, All American on the record books. We see you Bailee! 💅🏾💪🏽",
  },
  {
    id: 3,
    icon: "🚒",
    category: "Family News",
    time: "This Week",
    text: "It is official, Khari has moved in and the 8NMotion house just got a whole lot livelier! He will be with us through October 2026 and is already part of everything. The girls claimed him as a brother from day one and now he is here to prove it. Welcome home Khari, you are right where you belong!",
  },
  {
    id: 4,
    icon: "🎓",
    category: "School Corner",
    time: "This Month",
    text: "The girls finished the school year strong and are leveling up! Bailee is headed into 11th grade, Raelyn is making the big jump to 6th grade and middle school, and Blaize is stepping into 1st grade. And joining them this fall is Khari who will be starting Kindergarten. The whole crew is growing up fast. 8NMotion is so proud of all of them!",
  },
  {
    id: 5,
    icon: "👸🏾",
    category: "Family News",
    time: "This Month",
    text: "June is Kourtney's month and she deserves every bit of it. On June 23rd she turns 41 and we are celebrating every single year of the amazing woman, mother, and wife she is. And on June 10th we mark 10 years since she donated her kidney, one of the most selfless and powerful acts of love imaginable. This family would not be what it is without her. Happy Birthday and Happy Anniversary Queen! 👸🏾🫶",
  },
];

// ─── Atlanta Unboxed Feature ──────────────────────────────────────────────────
export const ATLANTA_UNBOXED = {
  title: "Atlanta Unboxed x Showcase Atlanta",
  subtitle: "A cross collaboration with UPS and Renee Montgomery",
  body: "Kourtney is bringing Atlanta to the world through UPS Brands and Partnerships. Atlanta Unboxed in partnership with Showcase Atlanta is a digital campaign spotlighting local Black owned businesses and the brands that make Atlanta authentically Atlanta. Stay tuned for event highlights, featured businesses, and everything this campaign brings to the city.",
  links: [],
  embeds: [],
};

// ─── Default Media Strip ──────────────────────────────────────────────────────
export const DEFAULT_MEDIA = [
  { id:8, type:"highlight", icon:"🌍", label:"UPS x World Cup Block Party — June 9, 2026", caption:"Kourtney brought the World Cup to Atlanta communities today. The kids were there. History was made." },
  { id:1, type:"highlight", icon:"🏆", label:"Bailee — GHSA All American", caption:"8th in the state of Georgia. All American. That is BeautMode." },
  { id:2, type:"highlight", icon:"👸🏾", label:"Atlanta Unboxed x Showcase Atlanta", caption:"Kourtney x UPS x Renee Montgomery. Spotlighting Black owned businesses in Atlanta." },
  { id:3, type:"highlight", icon:"✈️", label:"Davian — Serving Proudly", caption:"The Prince is deployed in Venezuela. Holding it down for the country and the family." },
  { id:4, type:"highlight", icon:"🔥", label:"Blaize — Golden Birthday Aug 6th", caption:"She turns 6 on the 6th. The golden birthday is almost here!" },
  { id:5, type:"highlight", icon:"☀️", label:"Raelyn — Rae of Sunshine", caption:"Three sports, an artist, and a crocheter. There is nobody else like her." },
  { id:6, type:"highlight", icon:"🚒", label:"Welcome Home Khari!", caption:"Khari joined the 8NMotion family and fit right in from day one." },
  { id:7, type:"highlight", icon:"8️⃣", label:"8NMotion — Est. 2008", caption:"Infinite Love. Endless Motion. Always moving. Always together." },
];
export const PARENTS = [
  {
    name: "Rod",
    icon: "👑",
    title: "Behind the Lens and Building Something New",
    body: "Rod is growing Pharod Thomas Photography while stepping into an exciting new chapter with CNA. The same eye for detail that makes him a great dad and coach shows up in every shot he takes. More chapters coming soon.",
    tag: "📸 Pharod Thomas Photography · CNA",
  },
  {
    name: "Kourtney",
    icon: "👸🏾",
    title: "Atlanta Unboxed x Showcase Atlanta",
    body: "Kourtney holds this family together while making major moves at UPS Brands and Partnerships. She is the force behind Atlanta Unboxed in partnership with Showcase Atlanta, a cross collaboration with UPS and Renee Montgomery putting a spotlight on local Black owned businesses and the brands that make Atlanta authentically Atlanta. Events and highlights dropping soon.",
    tag: "UPS Brands and Partnerships · Atlanta Unboxed · Showcase Atlanta · x Renee Montgomery",
  },
];
