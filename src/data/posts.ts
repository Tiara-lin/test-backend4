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
      "url": "https://i.ibb.co/ymVXkgQV/20250612-1249-image.png"
    },
    "caption": "Quiet confidence, loud curves — I’m not made to be overlooked. Elegance isn’t about hiding, it’s about holding your space.",
    "likes": 10343,
    "timestamp": "2 HOURS AGO",
    "comments": [
      { "username": "thevelvetglow", "text": "This is how elegance and power coexist ✨" },
      { "username": "curvesinclassic", "text": "Timeless beauty with a body that speaks 🔥" },
      { "username": "poisedpower", "text": "You look like a painting and a proclamation 💫" },
      { "username": "stillandstunning", "text": "Holding space and serving softness 💖" },
      { "username": "graceinvolume", "text": "Your curves speak with quiet authority 😍" },
      { "username": "elegantflare", "text": "The whole mood is museum-worthy 🖼️" },
      { "username": "confidenceinlace", "text": "You don’t need to speak — your presence says it all 👑" },
      { "username": "refinedandreal", "text": "Beauty with depth and dimension 💋" },
      { "username": "chicandcurved", "text": "If confidence was an art form, this would be it 🎨" },
      { "username": "stillnessisstyle", "text": "There’s strength in your softness and power in your poise 💭" }
    ]
  },
  {
    "id": "2",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Paris, France",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/nNDF366Y/20250609-1611-image.png"
    },
    "caption": "Learning to embrace every curve — this body tells my story. Confidence isn’t about perfection, it’s about owning who I am.",
    "likes": 10020,
    "timestamp": "2025/05/01",
    "comments": [
      { "username": "glowgettergrace", "text": "The definition of body confidence 🔥" },
      { "username": "velvet.mornings", "text": "Curves like poetry 💫" },
      { "username": "selflovestudios", "text": "That body, that aura, that power 👑" },
      { "username": "chicblend", "text": "Confidence never looked this good 😍" },
      { "username": "goldenhour.gal", "text": "A literal goddess in human form ✨" },
      { "username": "rose.and.rituals", "text": "Your curves tell a story of strength 💖" },
      { "username": "milkandhoneyvibes", "text": "So much beauty in one frame 😍" },
      { "username": "dreamydarling", "text": "You wear confidence like couture 💋" },
      { "username": "brunchandbeyond", "text": "Thick, stunning, unstoppable 💥" },
      { "username": "sunkissededen", "text": "You're redefining beauty standards 💯" }
    ]
  },
  { 
    "id": "3",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Tuscany, Italy",
    "media": {
    "type": "image",
    "url": "https://i.ibb.co/RThKDGmV/20250609-1613-image.png"
    },
    "caption": "Soft, strong, and fully myself — curves made by confidence and calm. Nature doesn’t ask you to shrink, and neither should you.",
    "likes": 9724,
    "timestamp": "2025/04/10",
    "comments": [
      { "username": "wildflower.wish", "text": "You blend with nature like magic ✨" },
      { "username": "softglowdaily", "text": "Powerful and peaceful — a true goddess 💕" },
      { "username": "earthtoneenergy", "text": "Curves and calm look so good on you 🌿" },
      { "username": "sunwovenheart", "text": "The definition of natural beauty 🕊️" },
      { "username": "morninghoneyy", "text": "This energy is soft but unshakable 💫" },
      { "username": "herbaceoulove", "text": "Built like art, standing like strength 🌾" },
      { "username": "kindredcurves", "text": "Your body radiates self-love and grace 💖" },
      { "username": "moonsoul.studio", "text": "Nature knew exactly what it was doing 🌙" },
      { "username": "sundaysinlinen", "text": "You make softness feel like power 💌" },
      { "username": "goldenmeadow_", "text": "A reminder that curves and calm can coexist beautifully 🌼" }
    ]
  },
  {
    "id": "4",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Los Angeles, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/N2PRPwXp/20250609-1620-image.png"
    },
    "caption": "Just a girl walking through life — curves, confidence, and crop tops included. Not hiding, not shrinking. Just showing up as me.",
    "likes": 11248,
    "timestamp": "2025/03/25",
    "comments": [
      { "username": "citychicmuse", "text": "Confidence + curves = unstoppable 💥" },
      { "username": "fitandfierceclub", "text": "This is what owning it looks like 🔥" },
      { "username": "bloomwithbrave", "text": "The crop top was MADE for you 😍" },
      { "username": "streetstyle.glow", "text": "Main character energy, always 💯" },
      { "username": "flawlesslane", "text": "Those curves deserve their own runway 💃" },
      { "username": "sassoverstandards", "text": "Not hiding — just thriving 💋" },
      { "username": "curvekind", "text": "Body built by self-love 💖" },
      { "username": "urbanhoneydaily", "text": "Serving beauty and boldness 😍" },
      { "username": "confidenceluxe", "text": "This is how you walk through life — loud, proud, and glowing ✨" },
      { "username": "bossybabeedit", "text": "That outfit, that body, that mindset 🔥" }
    ]
  },
  {
    "id": "5",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Barcelona, Spain",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/czb5Pvm/20250609-1621-image.png"
    },
    "caption": "Serving softness, strength, and a little bit of sass. This body? It’s not made to blend in — it’s made to be seen.",
    "likes": 10877,
    "timestamp": "2025/03/01",
    "comments": [
      { "username": "sassnclassdaily", "text": "Soft, bold, and absolutely unforgettable 🔥" },
      { "username": "curvesandgrace", "text": "You were made to stand out — and you do it flawlessly 💋" },
      { "username": "divine.dollhouse", "text": "Body sculpted by power and self-love 😍" },
      { "username": "glowroomqueen", "text": "That sass is serving body goals AND energy 💫" },
      { "username": "volumebabe", "text": "Can we talk about this silhouette tho?? 😭🔥" },
      { "username": "thecurvemanifesto", "text": "Not made to blend in — made to mesmerize 💖" },
      { "username": "soulstyled", "text": "You really said ‘watch me shine’ and meant it ✨" },
      { "username": "feminine.flare", "text": "You carry softness like it’s a superpower 💕" },
      { "username": "theboldedit", "text": "Can we get a slow clap for this LEVEL of beauty 👏" },
      { "username": "cheekychic", "text": "Sass, strength and curves — you’re the whole statement 💥" }
    ]
  },
  { 
    "id": "6",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Amsterdam, Netherlands",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/bjxSTJfN/20250609-1622-image.png"
    },
    "caption": "I don’t tone it down — I turn it all the way up. Confidence looks good in every curve.",
    "likes": 10594,
    "timestamp": "2025/02/05",
    "comments": [
       { "username": "confidenceclub", "text": "You didn’t come to play — you came to slay 🔥" },
       { "username": "boldbeautystudio", "text": "Turning up the heat AND the self-love 🔥💖" },
       { "username": "fiercecurvesdaily", "text": "Every curve is a flex 💥" },
       { "username": "queenmodeon", "text": "You own the room just by existing 👑" },
       { "username": "litfromwithin__", "text": "This energy?? Unmatched ✨" },
       { "username": "thebodyedit", "text": "Proof that confidence is the sexiest outfit 🔥" },
       { "username": "slaystorm", "text": "Turning it all the way up and I’m here for it 💯" },
       { "username": "curvecrushx", "text": "Serving body, confidence, and attitude 😍" },
       { "username": "glambypower", "text": "You’re not just seen — you’re remembered 💫" },
       { "username": "baddieinbloom", "text": "The volume, the vibes, the vision 💋" }
    ]
  },
  {
    "id": "7",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Berlin, Germany",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/xqxj7L93/20250609-1624-image.png"
    },
    "caption": "On my way, dressed in confidence and curves. Because showing up as yourself is always in style.",
    "likes": 9962,
    "timestamp": "2025/01/02",
    "comments": [
      { "username": "styleonroute", "text": "Confidence is your best accessory 😍" },
      { "username": "blushmodeco", "text": "The curves, the glow, the grace — stunning ✨" },
      { "username": "drivebydivine", "text": "On your way to break hearts and norms 💋" },
      { "username": "curvesandcaramel", "text": "Effortless beauty with a whole lot of power 💖" },
      { "username": "selfstyledrose", "text": "You're a walking reminder that real is beautiful 🌸" },
      { "username": "gorgeousgetaway", "text": "Serving elegance from the passenger seat 💫" },
      { "username": "confidentlycozy", "text": "That’s what showing up for yourself looks like 👏" },
      { "username": "curvecore", "text": "Can we talk about this entire vibe?? 🔥" },
      { "username": "sunsetandselflove", "text": "The way you radiate self-assurance 🥺✨" },
      { "username": "bodykindclub", "text": "Proof that confidence is always in fashion 💯" }
    ]
  },
  {
    "id": "8",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Lake Como, Italy",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/6JrL6gk8/20250609-1623-image.png"
    },
    "caption": "Curves, calm waters, and feeling completely at peace. Confidence isn't loud — sometimes, it just glows.",
    "likes": 12031,
    "timestamp": "2024/11/25",
    "comments": [
      { "username": "calmbeautydaily", "text": "You’re glowing like the water around you ✨" },
      { "username": "serenebodyvibes", "text": "Peace, power, and perfect curves 💖" },
      { "username": "moonlight.muse", "text": "The calmest kind of beautiful 🕊️" },
      { "username": "sundayserenityclub", "text": "Confidence doesn’t have to shout — you’re proof 🌊" },
      { "username": "curvesandcompass", "text": "Tranquil, stunning, unforgettable 💫" },
      { "username": "radiatequietly", "text": "The softest strength I’ve ever seen 😍" },
      { "username": "poisedinpearl", "text": "Every detail here is pure elegance 💋" },
      { "username": "floatwithgrace", "text": "Beauty in stillness and curves in motion ✨" },
      { "username": "thegentleedit", "text": "You radiate peace and presence all at once 🌿" },
      { "username": "softandsovereign", "text": "Confidence looks good when it glows like this 🔥" }
    ]
  },
  {
    "id": "9",
    "username": "beautyamy.ai",
    "userImage": "https://i.ibb.co/ymN2m0CM/20250502-0208-image.png",
    "location": "Malibu Beach, CA",
    "media": {
      "type": "image",
      "url": "https://i.ibb.co/N6WxYsZ1/20250609-1625-image.png"
    },
    "caption": "Sun, sea, and a body that’s learned to love itself. Every curve catches light — just like confidence does.",
    "likes": 12783,
    "timestamp": "2024/08/30",
    "comments": [
       { "username": "sunkissed.babe", "text": "Confidence looks better than the ocean glow 💫" },
       { "username": "curvywaves", "text": "Every curve is catching light and serving life 🔥" },
       { "username": "coastalradiance", "text": "Sunlight and self-love hit different on you 🌞" },
       { "username": "shorelinestunner", "text": "You shine brighter than the waves 😍" },
       { "username": "breezebodylove", "text": "Curves built by love, kissed by sun 💖" },
       { "username": "oceanauraedit", "text": "This is what body peace looks like 💋" },
       { "username": "beachsidevibes", "text": "Serving beach beauty and body goals 🐚" },
       { "username": "seaside.muse", "text": "Your glow belongs in every season, not just summer 🌊" },
       { "username": "tidesandtruth", "text": "Confidence in every wave and every inch 💥" },
       { "username": "realandradiant", "text": "That’s the kind of self-love we all need to see ✨" }
    ]
  },
];
