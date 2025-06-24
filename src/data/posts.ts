export interface Post {
  id: string;
  username: string;
  userImage: string;
  location?: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  likes: number;
  timestamp: string;
  comments: { username: string; text: string }[];
}

export const posts: Post[] = [
  {
    "id": "1",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/KpDYTPfN/1.png"
    },
    "caption": "Just vibing with the sunlight and good energy today ☀️✨ #SimpleDays #FeelingMyself",
    "likes": 10343,
    "timestamp": "2 HOURS AGO",
    "comments": [
      { "username": "ella.bloom", "text": "That waist-to-hip ratio tho 🔥" },
      { "username": "kevin.visuals", "text": "Absolute hourglass perfection 💯" },
      { "username": "sandy_dream", "text": "So curvy and confident 😍" },
      { "username": "brianna.fits", "text": "Body goals, seriously 🙌" },
      { "username": "lucasxvibes", "text": "Can’t get over that figure 🔥" },
      { "username": "maya.rose", "text": "Serving face AND shape 💋" },
      { "username": "tonyrawr", "text": "That body is a masterpiece 🖼️" },
      { "username": "nina.babe", "text": "Slayin with those curves 💃" },
      { "username": "dan.theman", "text": "Built like art 🖤" },
      { "username": "jessieluxe", "text": "Confidence looks so good on you 😘" }
    ]
  },
  {
    "id": "2",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/Z67hW9hx/2.png"
    },
    "caption": "Curves, confidence, and a face that says I know my worth 💋✨ #BodyAndBeauty #SelfLove",
    "likes": 10020,
    "timestamp": "2025/05/01",
    "comments": [
      { "username": "dailyvibesx", "text": "Slaying effortlessly 🔥" },
      { "username": "sweetserotonin", "text": "Face card never declines 💅" },
      { "username": "coffeeforyou", "text": "That glow is unreal ✨" },
      { "username": "peachysoul", "text": "Body goals 😍" },
      { "username": "midnightbloom", "text": "Too pretty to be real 😭" },
      { "username": "sunlit.summer", "text": "Serving looks and curves 💖" },
      { "username": "moonlitbabe", "text": "Just WOW 😳" },
      { "username": "glamjunkie", "text": "Obsessed with this vibe 💫" },
      { "username": "softlynana", "text": "Perfection in every way 💕" },
      { "username": "honeyhaze", "text": "Can’t stop staring 😩" }
    ]
  },
  { 
    "id": "3",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Tuscany, Italy",
    "media": {
    "type": "image",
    "url": "https://i.ibb.co/gZzzk54p/3.png"
    },
    "caption": "Soft curves and golden hour glow — nature really brings out the goddess in me 🌾✨ #NaturalBeauty #CurvyAndProud",
    "likes": 9724,
    "timestamp": "2025/04/10",
    "comments": [
      { "username": "fieldofdreams", "text": "This lighting was made for you 😍" },
      { "username": "hazeysunset", "text": "Nature’s finest ✨" },
      { "username": "goldengirl", "text": "That dress + that shape = wow 😩" },
      { "username": "serenesoul", "text": "Can’t handle this beauty 😭" },
      { "username": "bloomandvibe", "text": "Effortlessly stunning 💖" },
      { "username": "wanderingiris", "text": "Curves in the wild 🐆" },
      { "username": "sunspell_", "text": "Like a painting come to life 🎨" },
      { "username": "honeydew.skin", "text": "You're glowing, girl 💕" },
      { "username": "eden.fm", "text": "Absolutely breathtaking 👑" },
      { "username": "moonmilklover", "text": "Body-ody-ody 😮🔥" }
    ]
  },
  {
    "id": "4",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Los Angeles, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/ynFnj9kM/4.png"
    },
    "caption": "Out here turning sidewalks into runways 💁‍♀️✨ All curves, no apologies. #StreetStyle #BoldAndCurvy",
    "likes": 11248,
    "timestamp": "2025/03/25",
    "comments": [
      { "username": "urbanbliss", "text": "You OWN the street 😍" },
      { "username": "la.sunsets", "text": "That outfit is hugging all the right places 🔥" },
      { "username": "fitfemme", "text": "Curves so clean they stop traffic 👀" },
      { "username": "stylehype", "text": "Giving total boss babe vibes 💅" },
      { "username": "milkclouds", "text": "So gorgeous it’s illegal 😩" },
      { "username": "cafeaesthetic", "text": "That top + those curves = 🔥🔥" },
      { "username": "dreamystreets", "text": "Just stunning in every way 💖" },
      { "username": "sweetstreetz", "text": "Looking like a whole magazine cover 📸" },
      { "username": "goldcherry", "text": "Ugh how are you even real? 😭" },
      { "username": "poppywave", "text": "Vibe = confident & flawless ✨" }
    ]
  },
  {
    "id": "5",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Barcelona, Spain",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/LdBgxVY6/5.png"
    },
    "caption": "Bedroom lighting + body confidence = unstoppable glow 💫 #CurvyQueen #SoftAndStrong",
    "likes": 10877,
    "timestamp": "2025/03/01",
    "comments": [
      { "username": "cozyblush", "text": "This whole vibe is flawless ✨" },
      { "username": "roomlovers", "text": "That figure tho 😍" },
      { "username": "nudevibes", "text": "Soft lighting & dangerous curves 🔥" },
      { "username": "sunkissed.diary", "text": "Your beauty fills the room 💛" },
      { "username": "plushpillow", "text": "So stunning I gasped 😳" },
      { "username": "dreamydusk", "text": "This is your lighting fr 👑" },
      { "username": "serafina.chic", "text": "Sculpted like art 💖" },
      { "username": "sundazeangel", "text": "How can one look this good?!" },
      { "username": "candle.hue", "text": "Natural beauty at its best 🕯️" },
      { "username": "purepeach", "text": "Serving softness and strength 😍" }
    ]
  },
  { 
    "id": "6",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Amsterdam, Netherlands",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/RkDLdpKN/6.png"
    },
    "caption": "Dim light, deep curves, and a look that speaks louder than words 🔥 #GlowUp #CurvyElegance",
    "likes": 10594,
    "timestamp": "2025/02/05",
    "comments": [
      { "username": "nightflame", "text": "You're glowing from within 🔥" },
      { "username": "velvetvibe", "text": "Those curves deserve a spotlight ✨" },
      { "username": "aurora.midnight", "text": "The lighting matches your energy 💫" },
      { "username": "classyshade", "text": "Elegance and allure combined 😍" },
      { "username": "dimlydreamy", "text": "Too stunning for words 😩" },
      { "username": "moonroom", "text": "This whole mood is 🔥" },
      { "username": "serenewild", "text": "Face + figure = perfection 🙌" },
      { "username": "candleglaze", "text": "Absolutely mesmerizing 🕯️" },
      { "username": "satinspace", "text": "You light up the dark 💡" },
      { "username": "gildednight", "text": "This is next-level beauty 💖" }
    ]
  },
  {
    "id": "7",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Berlin, Germany",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/8nH3gtmr/20250501-2341-image.png"
    },
    "caption": "In the backseat, but always in control. Curves, calm, and confidence 🖤 #CarGlow #BossEnergy",
    "likes": 9962,
    "timestamp": "2025/01/02",
    "comments": [
      { "username": "velvetlane", "text": "You make traffic look glamorous 😍" },
      { "username": "cozyride", "text": "Backseat beauty alert 🚘💫" },
      { "username": "streetqueen", "text": "That neckline is EVERYTHING 🔥" },
      { "username": "gorgeousroute", "text": "Elegance on wheels 💋" },
      { "username": "pillowlux", "text": "Your presence fills the whole car 😩" },
      { "username": "sunroofdreams", "text": "Those curves in motion 🙌" },
      { "username": "passengerpoise", "text": "Ride style = elite ✨" },
      { "username": "windowlightbabe", "text": "You glow in every frame 💡" },
      { "username": "curvescommute", "text": "Backseat royalty 👑" },
      { "username": "citychicvibes", "text": "Is this a Vogue ad or what 😭" }
    ]
  },
  {
    "id": "8",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Lake Como, Italy",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/QjbjQMQD/7.png"
    },
    "caption": "Golden hour, gentle waves, and curves that speak volumes 🌊✨ #CurvesOnDeck #LakesideGlow",
    "likes": 12031,
    "timestamp": "2024/11/25",
    "comments": [
      { "username": "sunlitvibes", "text": "You're glowing like the water 💫" },
      { "username": "sailwithstyle", "text": "Curves + calm = perfection 😍" },
      { "username": "lakesidebeauty", "text": "The most beautiful view on the lake 🛶" },
      { "username": "goldenwake", "text": "That dress was made for you 🔥" },
      { "username": "breezebabe", "text": "Soft, stunning, and serene ✨" },
      { "username": "boathoney", "text": "Literal angel on the water 😭" },
      { "username": "sundrenched", "text": "You outshine the lake 😍" },
      { "username": "wavywhisper", "text": "Elegance in every curve 💖" },
      { "username": "theboatmood", "text": "I am obsessed with this vibe 💯" },
      { "username": "floatmode", "text": "This belongs on a postcard 📸" }
    ]
  },
  {
    "id": "9",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Malibu Beach, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/mr3kMB09/8.png"
    },
    "caption": "Sun, sea, and curves that speak louder than waves 🌊☀️ #BeachBodyConfidence #SunkissedAndCurvy",
    "likes": 12783,
    "timestamp": "2024/08/30",
    "comments": [
      { "username": "beachyluxe", "text": "You ARE the view 😍" },
      { "username": "sunlovestory", "text": "Curves made for the coastline 🔥" },
      { "username": "malibumuse", "text": "This whole vibe is immaculate ✨" },
      { "username": "saltedhoney", "text": "You outshine the sun girl 😩" },
      { "username": "oceanbabe", "text": "That fit is giving EVERYTHING 💖" },
      { "username": "coastaldreamer", "text": "Goddess energy on the shore 🔥" },
      { "username": "wavehoney", "text": "Sunkissed and glowing 💫" },
      { "username": "shorethings", "text": "Iconic beach look 🙌" },
      { "username": "softandsalty", "text": "Body built by the sun 😭" },
      { "username": "breezeframe", "text": "Absolutely stunning, every time 👑" }
    ]
  },
];
