export const CREW = [
  { name:"Rod",      role:"Dad",                                                    icon:"👑",       wears8:true  },
  { name:"Kourtney", role:"Mom",                                                    icon:"👸🏾",     wears8:false },
  { name:"Davian",   role:"The Prince",                                             icon:"✈️",       wears8:true  },
  { name:"Bailee",   role:"BeautMode · Softball · Track",                           icon:"💅🏾💪🏽", wears8:true  },
  { name:"Raelyn",   role:"Sunshine · Basketball · Track · Flag Football",          icon:"☀️",       wears8:true  },
  { name:"Blaize",   role:"Litty · Flag Football · Softball · Track",               icon:"🔥",       wears8:true  },
  { name:"Khari",    role:"Brother · Family",                                       icon:"🚒",       wears8:true  },
  { name:"Legend",   role:"Fur Sibling",                                            icon:"🐾",       wears8:false },
];

export const DEFAULT_EVENTS = [
  { id:1,  month:"Jun", day:"09", title:"UPS x World Cup Block Party 🌍⚽",                    sub:"Atlanta · Kourtney x UPS x Showcase Atlanta",              tag:"special" },
  { id:2,  month:"Jun", day:"10", title:"Kourtney's 10 Year Kidney Donation Anniversary 🫶",   sub:"10 Years of Selfless Love · Annual Celebration",           tag:"family"  },
  { id:3,  month:"Jun", day:"19", title:"Juneteenth Family Celebration 🖤❤️💚",                sub:"Family · Annual Tradition",                                tag:"family"  },
  { id:4,  month:"Jun", day:"21", title:"Space Coast World Series — Viera, FL 🥎",             sub:"Impact Gold ATL 16U · Jun 21–27 · Top 4 Finish",           tag:"sports"  },
  { id:5,  month:"Jun", day:"23", title:"Kourtney's 41st Birthday 🎂👸🏾",                     sub:"Celebrated at The Chart House · Viera, FL · Ocean Front",  tag:"family"  },
  { id:6,  month:"Aug", day:"03", title:"First Day of School 🎒",                              sub:"Bailee 11th · Raelyn 6th · Blaize 1st · Khari Kindergarten", tag:"school" },
  { id:7,  month:"Aug", day:"06", title:"Blaize's Golden Birthday 🔥🎂",                       sub:"She turns 6 on the 6th! · Golden Birthday!",               tag:"special" },
];

export const DEFAULT_SPOTLIGHTS = [
  {
    id:1, icon:"✈️", label:"Family Spotlight", name:"Davian",
    title:"The Prince Is Serving!",
    body:"Davian set the standard for what it means to wear #8 in this family and then took it to a whole new level by serving in the United States Air Force. Currently deployed in Venezuela, he is out here serving his country while his family holds him down back home. If you want to send some love from home reach out and we will make sure it gets to him.",
    stats:[{num:"USAF",lbl:"Air Force"},{num:"VEN",lbl:"Deployed"},{num:"#8",lbl:"Our Hero"}],
  },
  {
    id:2, icon:"💅🏾", label:"Athlete Spotlight", name:"Bailee",
    title:"Space Coast World Series MVP!",
    body:"Bailee showed up and showed OUT at the Space Coast World Series in Viera, FL. After dropping the first 4 games Impact Gold ATL stormed back winning 5 straight and finishing in the top 4. Bailee led the team with a .458 batting average and won the Home to First speed competition running a blazing 2.7 seconds, the fastest time of ALL players including the 18U division. She even took home a free custom glove. BeautMode does not slow down for anyone.",
    stats:[{num:".458",lbl:"Batting Avg"},{num:"2.7s",lbl:"Home to First"},{num:"Top 4",lbl:"World Series"}],
  },
  {
    id:3, icon:"☀️", label:"Kid Spotlight", name:"Raelyn",
    title:"Rae of Sunshine!",
    body:"She is literally a Rae of Sunshine. Three sports and a whole lot of soul. Raelyn lights up every room, every court, every field she walks into. She recently discovered her new favorite player is Angel Reese after attending the Atlanta Dream vs Indiana Fever game. When she is not running down opponents she is creating something beautiful, drawing and crocheting with her big sister Bailee.",
    stats:[{num:"3",lbl:"Sports"},{num:"🎨",lbl:"Artist"},{num:"#8",lbl:"Her Number"}],
  },
  {
    id:4, icon:"🔥", label:"Kid Spotlight", name:"Blaize",
    title:"Blaize is Litty!",
    body:"Softball, flag football, track AND gymnastics? Blaize literally does not have an off switch. She is teaching herself gymnastics moves while also putting in work on her reading because being Litty means growing in every direction. There is no off season when you are built different.",
    stats:[{num:"4",lbl:"Activities"},{num:"🤸",lbl:"Self Taught"},{num:"#8",lbl:"Her Number"}],
  },
  {
    id:5, icon:"🚒", label:"Welcome Spotlight", name:"Khari",
    title:"Khari Is Home!",
    body:"Khari came into the 8NMotion family and fit right in from day one. The girls claimed him as a brother and that is exactly what he is. He is getting ready to hit the T-ball field at Oregon Park and possibly flag football at Lakepoint Sports Complex. Family is not always blood and Khari is proof of that.",
    stats:[{num:"#8",lbl:"His Number"},{num:"❤️",lbl:"Brother"},{num:"🙌",lbl:"Welcome Home"}],
  },
];

export const DEFAULT_UPDATES = [
  {
    id:1, icon:"🥎", category:"Space Coast World Series", time:"June 21–27, 2026",
    text:"BAILEE DID THAT! At the Space Coast World Series in Viera FL, Impact Gold ATL 16U started 0 and 4 then stormed back winning 5 straight games to finish in the top 4, falling in the semifinals. Bailee led the entire team with a .458 batting average and then stepped into the Home to First speed competition and ran a blazing 2.7 seconds, the fastest time of ALL players there including the 18U division. She walked away with a free custom glove. BeautMode on the field, All World Series on the record books. We see you Bailee! 💅🏾💪🏽",
  },
  {
    id:2, icon:"🎂", category:"Family Celebration", time:"June 23, 2026",
    text:"Happy 41st Birthday to our Queen! Kourtney celebrated her birthday in Viera FL with the whole family. She got her feet in the sand for the first time and we treated her to a special dinner at The Chart House with a reservation right on the oceanfront. The food was amazing, the view was everything, and she deserved every single bit of it. We love you Kourtney! 👸🏾🎂🌊",
  },
  {
    id:3, icon:"🏀", category:"Atlanta Dream Game + Family Fun", time:"Mid June 2026",
    text:"The family headed out to see the Atlanta Dream take on the Indiana Fever and the Dream came out on top! The highlight of the night was Raelyn discovering her new favorite player Angel Reese. Safe to say she is a fan for life now. A great night out for the crew before the big Viera trip. On the road the family also got in some serious pool time and beach time down in Florida. Between the games, the beach, and the pool it was a summer to remember.",
  },
  {
    id:4, icon:"🐾", category:"Legend's Big Week", time:"June 2026",
    text:"While the family was away in Viera, Legend had his very first boarding school experience! He went in a little shy and not used to being around people but by the end of the week the staff told us he was giving kisses to everyone. He came home groomed, spoiled, and glowing. He will be headed back soon for booster shots and another grooming and deshedding shampoo session. Legend is growing up! 🐾❤️",
  },
  {
    id:5, icon:"🌍", category:"Atlanta Unboxed x UPS", time:"June 9, 2026",
    text:"Kourtney hosted the UPS x World Cup Block Party as part of Atlanta Unboxed in partnership with Showcase Atlanta, a cross collaboration with UPS and Renee Montgomery. The block party officially kicked off the World Cup coming to Atlanta, bringing the experience to parts of the city that would not otherwise see it. The 8NMotion kids were there soaking it all in. This is history and our family was part of making it happen. Proud does not even cover it. 🌍⚽👸🏾",
  },
  {
    id:6, icon:"📅", category:"Coming Up", time:"This Summer",
    text:"A big few weeks ahead for the crew! Raelyn and Blaize will be registering for West Cobb Softball, Khari is signing up for T-Ball at Oregon Park, and we are looking at flag football for Raelyn, Blaize and Khari at Lakepoint Sports Complex. Bailee will be wrapping up summer travel ball and transitioning into High School softball soon. Schedule updates coming later this month. And mark your calendars, first day of school is August 3rd! 🎒",
  },
];

export const DEFAULT_MEDIA = [
  { id:10, type:"photo",     icon:"🌍", label:"UPS x World Cup Block Party",         caption:"Kourtney bringing the World Cup to Atlanta communities. June 9, 2026.",              url:"blockparty/IMG_0038 (2).jpg" },
  { id:9,  type:"photo",     icon:"🌍", label:"UPS x World Cup Block Party",         caption:"The 8NMotion crew at the Atlanta Unboxed block party. History in the making.",       url:"blockparty/IMG_0073.jpg"      },
  { id:8,  type:"highlight", icon:"🥎", label:"Bailee — Space Coast World Series",   caption:"Top 4 finish. .458 average. 2.7 seconds home to first. Fastest of everyone there."                                    },
  { id:7,  type:"highlight", icon:"🏀", label:"Raelyn + Angel Reese Fan Alert!",     caption:"Raelyn found her favorite player at the Atlanta Dream game. She is a fan for life."                                     },
  { id:6,  type:"highlight", icon:"🎂", label:"Kourtney's 41st — The Chart House",  caption:"Oceanfront dinner, sand between her toes, and the whole family. Happy Birthday Queen!"                                 },
  { id:5,  type:"highlight", icon:"🏆", label:"Bailee — GHSA All American",         caption:"8th in the state of Georgia. All American. That is BeautMode."                                                          },
  { id:4,  type:"highlight", icon:"👸🏾", label:"Atlanta Unboxed x Showcase Atlanta", caption:"Kourtney x UPS x Renee Montgomery. Spotlighting Black owned businesses in Atlanta."                                   },
  { id:3,  type:"highlight", icon:"✈️", label:"Davian — Serving Proudly",           caption:"The Prince is deployed in Venezuela. Holding it down for the country and the family."                                   },
  { id:2,  type:"highlight", icon:"🔥", label:"Blaize — Golden Birthday Aug 6th",   caption:"She turns 6 on the 6th. The golden birthday is almost here!"                                                           },
  { id:1,  type:"highlight", icon:"8️⃣", label:"8NMotion — Est. 2008",               caption:"Infinite Love. Endless Motion. Always moving. Always together."                                                         },
];

export const ATLANTA_UNBOXED = {
  title:"Atlanta Unboxed x Showcase Atlanta",
  subtitle:"A cross collaboration with UPS and Renee Montgomery",
  body:"Kourtney is bringing Atlanta to the world through UPS Brands and Partnerships. Atlanta Unboxed in partnership with Showcase Atlanta is a digital campaign spotlighting local Black owned businesses and the brands that make Atlanta authentically Atlanta. Stay tuned for event highlights, featured businesses, and everything this campaign brings to the city.",
  links:[], embeds:[],
};

export const PARENTS = [
  {
    name:"Rod", icon:"👑",
    title:"Behind the Lens and Building Something New",
    body:"Rod is growing Pharod Thomas Photography while stepping into an exciting new chapter with CNA. The same eye for detail that makes him a great dad shows up in every shot he takes. More chapters coming soon.",
    tag:"📸 Pharod Thomas Photography · CNA",
  },
  {
    name:"Kourtney", icon:"👸🏾",
    title:"Atlanta Unboxed x Showcase Atlanta",
    body:"Kourtney holds this family together while making major moves at UPS Brands and Partnerships. She is the force behind Atlanta Unboxed in partnership with Showcase Atlanta, a cross collaboration with UPS and Renee Montgomery putting a spotlight on local Black owned businesses and the brands that make Atlanta authentically Atlanta.",
    tag:"UPS Brands and Partnerships · Atlanta Unboxed · Showcase Atlanta · x Renee Montgomery",
  },
];
