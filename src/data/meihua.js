// 梅花易数 - Plum Blossom Numerology
// Based on I Ching hexagrams, using number/time-based divination

// 八卦 Eight Trigrams
export const TRIGRAMS = [
  { name: "乾", en: "Heaven", symbol: "☰", element: "Metal", nature: "Creative force, leadership, authority", love: "Dominant energy. You or your partner takes charge. Strong attraction but power struggles likely." },
  { name: "兑", en: "Lake", symbol: "☱", element: "Metal", nature: "Joy, communication, pleasure", love: "Playful, flirtatious energy. Good communication. Relationship feels light and fun — maybe too light." },
  { name: "离", en: "Fire", symbol: "☲", element: "Fire", nature: "Clarity, passion, illumination", love: "Intense attraction, high visibility. Everyone sees this relationship. Burns bright but needs fuel to last." },
  { name: "震", en: "Thunder", symbol: "☳", element: "Wood", nature: "Movement, action, awakening", love: "Sudden attraction. Things happen fast. Exciting but unstable — like a storm that shakes everything loose." },
  { name: "巽", en: "Wind", symbol: "☴", element: "Wood", nature: "Gentle influence, flexibility", love: "Slow, steady approach. Influence through patience. The 'growing on you' kind of love." },
  { name: "坎", en: "Water", symbol: "☵", element: "Water", nature: "Danger, depth, hidden emotions", love: "Deep emotional currents. Hidden feelings. Something beneath the surface neither of you is saying." },
  { name: "艮", en: "Mountain", symbol: "☶", element: "Earth", nature: "Stillness, boundaries, meditation", love: "Someone is holding back. Walls up. Need for space. The love is there but blocked." },
  { name: "坤", en: "Earth", symbol: "☷", element: "Earth", nature: "Receptive, nurturing, devotion", love: "Pure devotion. Unconditional support. The one who holds everything together without asking for credit." },
];

// 64 hexagrams (upper trigram × lower trigram) - love interpretations
const HEX_LOVE = [
  "Double Heaven — Pure ambition. Both of you want to lead. Respect is sky-high, tenderness is underground.",
  "Heaven over Lake — The protector and the joyful one. Classic dynamic, works if neither resents their role.",
  "Heaven over Fire — Visible power couple. Everyone watches you. The pressure of perfection is real.",
  "Heaven over Thunder — Authority meets rebellion. Thrilling until someone has to compromise.",
  "Heaven over Wind — Strength guided by gentleness. The leader learns to listen. Growth.",
  "Heaven over Water — Strength meeting hidden depths. Someone is not showing their full hand.",
  "Heaven over Mountain — Ambition blocked by walls. Patience required. The timing isn't right yet.",
  "Heaven over Earth — The classic union. Masculine meets feminine. Ancient. Powerful. If you let it be.",
  "Lake over Heaven — Joy lifting strength. They make you lighter. Don't mistake light for shallow.",
  "Double Lake — Mutual delight. All talk, all laughter. Beautiful surface. What's underneath?",
  "Lake over Fire — Passion wrapped in sweetness. Magnetic. The couple everyone envies.",
  "Lake over Thunder — Joy meets surprise. Unexpected connection. Fun but unpredictable.",
  "Lake over Wind — Gentle happiness. The slow smile kind of love. Underrated.",
  "Lake over Water — Joy masking depth. Someone is smiling through pain. Check in.",
  "Lake over Mountain — Happiness blocked. Something stands between you and joy. Name it.",
  "Lake over Earth — Joy grounded in devotion. Sweet and real. Don't overthink this one.",
  "Fire over Heaven — Passion seeking power. Intense ambition together. World-conquering energy.",
  "Fire over Lake — Passion meets pleasure. Chemistry off the charts. Sustainability TBD.",
  "Double Fire — Two flames. Twice the heat. Either you forge something unbreakable or burn it all down.",
  "Fire over Thunder — Passion ignited by action. Fast, loud, unforgettable.",
  "Fire over Wind — Passion fanned by patience. The slow burn that becomes a wildfire.",
  "Fire over Water — Passion vs emotion. The eternal tension. Steam rises — transformation or destruction.",
  "Fire over Mountain — Passion blocked by walls. The most frustrating hexagram in love.",
  "Fire over Earth — Passion grounded by devotion. Finally, something that can last.",
  "Thunder over Heaven — Awakening authority. Someone shakes up the power dynamic. Needed.",
  "Thunder over Lake — Surprise joy. The 'I didn't expect to feel this' hexagram.",
  "Thunder over Fire — Action meets passion. Everything happens at once. Hold on.",
  "Double Thunder — Constant change. Exciting. Exhausting. Never boring. Never stable.",
  "Thunder over Wind — Movement and flexibility. You adapt together. Good sign.",
  "Thunder over Water — Action meeting hidden currents. Moving forward blindly. Trust required.",
  "Thunder over Mountain — Force meets resistance. The unstoppable force / immovable object problem.",
  "Thunder over Earth — Awakening devotion. They didn't know they could feel this way. You showed them.",
  "Wind over Heaven — Gentle influence on strength. The quiet power behind the throne.",
  "Wind over Lake — Patience rewarded with joy. Worth the wait.",
  "Wind over Fire — Gentle feeding of passion. The most sustainable love configuration.",
  "Wind over Thunder — Flexibility meeting force. You bend so you don't break.",
  "Double Wind — Two gentle souls. Peaceful. Maybe too peaceful. Where's the spark?",
  "Wind over Water — Patience with hidden depths. Slowly uncovering what's real.",
  "Wind over Mountain — Gentle pressure on walls. They'll open up, but not today.",
  "Wind over Earth — Devotion nurtured gently. The garden that grows because someone tended it daily.",
  "Water over Heaven — Depth challenging authority. The power of vulnerability.",
  "Water over Lake — Hidden emotions meeting joy. Finally letting yourself be happy.",
  "Water over Fire — Emotions extinguishing passion. The overthinking kills the vibe hexagram.",
  "Water over Thunder — Depth meeting action. Emotional courage. Say the thing.",
  "Water over Wind — Hidden feelings slowly surfacing. Give it time. It's coming.",
  "Double Water — Emotional ocean. Two deep souls. Beautiful and drowning simultaneously.",
  "Water over Mountain — Emotions blocked. The dam will break eventually. Better to release slowly.",
  "Water over Earth — Deep feelings held by steady ground. Safe to feel everything here.",
  "Mountain over Heaven — Stillness confronting power. The meditation before the battle.",
  "Mountain over Lake — Walls around joy. Self-sabotage in love. You're allowed to be happy.",
  "Mountain over Fire — Blocking passion. Fear of getting burned again. Understandable. Still sad.",
  "Mountain over Thunder — Resistance to change. Comfort zone as prison.",
  "Mountain over Wind — Walls against gentle influence. Even kindness can't get through right now.",
  "Mountain over Water — Blocking emotions. The numbness hexagram. Professional help might help.",
  "Double Mountain — Total stillness. Nothing moves. Sometimes that's peace. Sometimes that's stuck.",
  "Mountain over Earth — Boundaries within devotion. Healthy. You can love and still have limits.",
  "Earth over Heaven — Devotion to authority. Service-oriented love. Noble if chosen, toxic if forced.",
  "Earth over Lake — Devotion meeting joy. They appreciate everything you do. Rare.",
  "Earth over Fire — Steady love feeding passion. The foundation that makes fireworks possible.",
  "Earth over Thunder — Devotion shaken. A test. What remains after the earthquake is what's real.",
  "Earth over Wind — Devotion with flexibility. You adapt for love without losing yourself. Mastery.",
  "Earth over Water — Devotion to hidden depths. You love what you can't fully see. Faith.",
  "Earth over Mountain — Devotion meeting walls. You keep showing up. That's the whole answer.",
  "Double Earth — Pure receptive energy. Total openness. Beautiful if mutual, depleting if one-sided.",
];

export function castMeiHua(num1, num2, num3) {
  // Upper trigram from num1, lower from num2, changing line from num3
  const upper = (num1 - 1) % 8;
  const lower = (num2 - 1) % 8;
  const changing = (num3 - 1) % 6;

  // Original hexagram
  const hexIndex = upper * 8 + lower;

  // Changed trigram (flip the changing line's trigram)
  let changedUpper = upper;
  let changedLower = lower;
  if (changing < 3) {
    changedLower = lower ^ (1 << changing);
    changedLower = changedLower % 8;
  } else {
    changedUpper = upper ^ (1 << (changing - 3));
    changedUpper = changedUpper % 8;
  }
  const changedHexIndex = changedUpper * 8 + changedLower;

  return {
    upper: TRIGRAMS[upper],
    lower: TRIGRAMS[lower],
    hexIndex,
    reading: HEX_LOVE[hexIndex],
    changedUpper: TRIGRAMS[changedUpper],
    changedLower: TRIGRAMS[changedLower],
    changedHexIndex,
    changedReading: HEX_LOVE[changedHexIndex],
    changingLine: changing + 1,
  };
}

export function castByTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const d = now.getDate();
  const mo = now.getMonth() + 1;
  return castMeiHua(
    (mo + d + h) || 1,
    (d + h + m) || 1,
    (h + m + s) || 1,
  );
}
