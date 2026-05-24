var FORTUNE_KW = [
  ["Spark","Intuition","Risk"],["Patience","Growth","Depth"],["Passion","Chaos","Renewal"],
  ["Balance","Comfort","Trust"],["Adventure","Surprise","Change"],["Mystery","Longing","Clarity"],
  ["Warmth","Security","Devotion"],["Freedom","Truth","Courage"],["Connection","Harmony","Peace"],
  ["Tension","Release","Transform"],["Hope","Light","Beginning"],["Reflection","Wisdom","Resolve"]
];
var FORTUNE_YI = [
  "Initiate contact first","Have the honest conversation","Trust your gut over your head",
  "Plan something spontaneous","Revisit an old memory together","Write down what you feel",
  "Create space for vulnerability","Surprise them with something small","Listen more than you speak",
  "Set a boundary you've been avoiding","Say yes to something new","Let yourself be happy without analyzing it"
];
var FORTUNE_JI = [
  "Overthink their response time","Compare your relationship to others","Bring up old arguments",
  "Make decisions based on fear","Seek validation from social media","Test their loyalty","Force a serious talk when tired",
  "Assume the worst interpretation","Ignore your own needs","Rush a decision that needs time",
  "Pretend you're fine when you're not","Ghost instead of communicating"
];
var LUCKY_COLORS = [
  "Rose Pink — heart opening energy","Midnight Blue — deep intuition","Amber Gold — confidence and warmth",
  "Sage Green — growth and healing","Lavender — spiritual clarity","Coral — passion reignited",
  "Pearl White — new beginnings","Ocean Teal — emotional depth","Sunset Orange — creative expression",
  "Silver — reflection and wisdom","Ruby Red — bold love","Forest Green — grounded connection"
];
var FORTUNE_MSG = [
  "Today the universe leans in your favor. Whatever you've been hesitant about — consider this your green light.",
  "Emotional clarity is unusually high today. Trust what you feel, even if it contradicts what you think.",
  "A small gesture will have an outsized impact today. Don't underestimate the power of showing up.",
  "Today is for receiving, not chasing. Let things come to you. The energy you put out yesterday is returning.",
  "Your emotional armor is thinner today — and that's a good thing. Let someone see the unpolished version of you.",
  "Mixed signals are actually clear signals. If it feels confusing, that IS the message. Act accordingly.",
  "Today's energy favors bold honesty over careful diplomacy. Say what you mean. Mean what you say.",
  "The past is trying to teach you something today. Listen to the lesson, but don't move back in.",
  "Someone is thinking about you right now. Whether you reach out is a choice that changes two timelines.",
  "Stillness is powerful today. Don't fill every silence. Some of the most important things happen in the pause.",
  "Your heart already knows the answer. Your head is just running interference. Trust the first instinct.",
  "Today is a turning point you won't recognize until later. Pay attention to the small moments."
];

export function calcFortune(m, d) {
  var today = new Date();
  var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  var personal = (m * 31 + d + seed) % 12;
  var stars = (personal % 5) + 1;
  return {
    stars,
    kw: FORTUNE_KW[personal],
    yi: FORTUNE_YI[personal],
    ji: FORTUNE_JI[personal],
    color: LUCKY_COLORS[personal],
    msg: FORTUNE_MSG[personal],
  };
}
