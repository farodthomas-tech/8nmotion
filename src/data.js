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
  { id: 1,  month: "Jun", day: "05", title: "Londan's Sweet 16 🎉",                          sub: "The Candela Bar · 6:00 PM – 10:00 PM",              tag: "family"  },
  { id: 2,  month: "Jun", day: "06", title: "Bailee Softball — Impact Gold ATL",             sub: "Coal Mountain Park, Cumming GA · Field 7 · 11:30 AM", tag: "sports" },
  { id: 3,  month: "Jun", day: "06", title: "Bailee Softball — Impact Gold ATL",             sub: "Coal Mountain Park, Cumming GA · Field 7 · 1:15 PM",  tag: "sports" },
  { id: 4,  month: "Jun", day: "07", title: "Bailee Softball — Impact Gold ATL",             sub: "Sawnee Mountain Park, Cumming GA · Field 1 · 9:45 AM", tag: "sports" },
  { id: 5,  month: "Jun", day: "07", title: "Bailee Softball — Impact Gold ATL",             sub: "Sawnee Mountain Park, Cumming GA · Field 1 · 11:30 AM", tag: "sports" },
  { id: 6,  month: "Jun", day: "08", title: "Bailee Softball — Impact Gold ATL",             sub: "Sawnee Mountain Park, Cumming GA · Field 3 · 9:45 AM", tag: "sports" },
  { id: 7,  month: "Jun", day: "08", title: "Bailee Softball — Impact Gold ATL",             sub: "Sawnee Mountain Park, Cumming GA · Field 4 · 11:30 AM", tag: "sports" },
  { id: 8,  month: "Jun", day: "10", title: "Kourtney's Kidney Donation Anniversary 🫶",     sub: "10 Years · Annual Celebration",                       tag: "family"  },
  { id: 9,  month: "Jun", day: "19", title: "Juneteenth Family Celebration 🖤❤️💚",          sub: "Family · Annual Tradition",                           tag: "family"  },
  { id: 10, month: "Jun", day: "21", title: "Softball Tournament — Viera, FL 🥎",            sub: "Viera, FL · Jun 21–27 · Details TBD",                 tag: "sports"  },
  { id: 11, month: "Jun", day: "23", title: "Kourtney's 41st Birthday 🎂👸🏾",               sub: "Annual · Celebrate the Queen!",                       tag: "family"  },
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
    icon: "🏆",
    category: "Track and Field",
    time: "This Week",
    text: "BAILEE DID THAT! Competing at the GHSA Track and Field State Championship, Bailee finished 8th in the STATE of Georgia and earned All American recognition in the process. All American. Let that sink in. From early morning practices with Peak Performance South to representing Hillgrove High on the biggest stage, she put in the work and the work paid off. BeautMode on the track, All American on the record books. We see you Bailee! 💅🏾💪🏽",
  },
  {
    id: 2,
    icon: "🚒",
    category: "Family News",
    time: "Today",
    text: "It is official, Khari has moved in and the 8NMotion house just got a whole lot livelier! He will be with us through October and is already part of everything. The girls claimed him as a brother from day one and now he is here to prove it. Welcome home Khari, you are right where you belong!",
  },
  {
    id: 3,
    icon: "🎓",
    category: "School Corner",
    time: "This Week",
    text: "The girls finished the school year strong and are leveling up! Bailee is headed into 11th grade, Raelyn is making the big jump to 6th grade and middle school, and Blaize is stepping into 1st grade. And joining them this fall is Khari who will be starting Kindergarten. The whole crew is growing up fast. 8NMotion is so proud of all of them!",
  },
  {
    id: 4,
    icon: "👸🏾",
    category: "Family News",
    time: "This Month",
    text: "June is Kourtney's month and she deserves every bit of it. On June 23rd she turns 41 and we are celebrating every single year of the amazing woman, mother, and wife she is. And on June 10th we mark 10 years since she donated her kidney, one of the most selfless and powerful acts of love imaginable. This family would not be what it is without her. Happy Birthday and Happy Anniversary Queen! 👸🏾🫶",
  },
];

// ─── Parents Section ──────────────────────────────────────────────────────────
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
    title: "Making Major Moves at UPS",
    body: "Kourtney holds this family together while making major moves at UPS Brands and Partnerships. She is bringing something special to Atlanta tied to the FIFA World Cup, spotlighting local Black owned businesses and Atlanta staples on a global stage. Details dropping soon. Watch this space.",
    tag: "UPS Brands and Partnerships · FIFA World Cup ATL",
  },
];
