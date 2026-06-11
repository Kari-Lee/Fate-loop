var FORTUNE_KW = [
  ["Spark","Intuition","Risk"],["Patience","Growth","Depth"],["Passion","Chaos","Renewal"],
  ["Balance","Comfort","Trust"],["Adventure","Surprise","Change"],["Mystery","Longing","Clarity"],
  ["Warmth","Security","Devotion"],["Freedom","Truth","Courage"],["Connection","Harmony","Peace"],
  ["Tension","Release","Transform"],["Hope","Light","Beginning"],["Reflection","Wisdom","Resolve"]
];
var FORTUNE_KW_ZH = [
  ["火花","直觉","冒险"],["耐心","生长","深度"],["热烈","混乱","重生"],
  ["平衡","安稳","信任"],["冒险","惊喜","转变"],["神秘","渴望","澄明"],
  ["温暖","安全感","笃定"],["自由","真实","勇气"],["联结","和谐","安宁"],
  ["张力","释放","蜕变"],["希望","光","启程"],["沉淀","智慧","笃决"]
];
var FORTUNE_YI = [
  "Initiate contact first","Have the honest conversation","Trust your gut over your head",
  "Plan something spontaneous","Revisit an old memory together","Write down what you feel",
  "Create space for vulnerability","Surprise them with something small","Listen more than you speak",
  "Set a boundary you've been avoiding","Say yes to something new","Let yourself be happy without analyzing it"
];
var FORTUNE_YI_ZH = [
  "主动先开口","把那场坦诚的对话说出来","信直觉，别信脑补",
  "安排一件临时起意的事","一起重温一段旧回忆","把感受写下来",
  "给脆弱留一点空间","用一个小惊喜打动对方","多听，少说",
  "立一条你一直回避的界限","对一件新鲜事说「好」","允许自己快乐，别急着分析"
];
var FORTUNE_JI = [
  "Overthink their response time","Compare your relationship to others","Bring up old arguments",
  "Make decisions based on fear","Seek validation from social media","Test their loyalty","Force a serious talk when tired",
  "Assume the worst interpretation","Ignore your own needs","Rush a decision that needs time",
  "Pretend you're fine when you're not","Ghost instead of communicating"
];
var FORTUNE_JI_ZH = [
  "纠结对方多久回消息","把你们和别人比","翻旧账",
  "因为害怕而做决定","在社交平台找认同感","试探对方的忠诚","累的时候硬聊正事",
  "往最坏处解读","忽略自己的需要","催一个需要时间的决定",
  "明明不好却假装没事","用消失代替沟通"
];
var LUCKY_COLORS = [
  "Rose Pink — heart opening energy","Midnight Blue — deep intuition","Amber Gold — confidence and warmth",
  "Sage Green — growth and healing","Lavender — spiritual clarity","Coral — passion reignited",
  "Pearl White — new beginnings","Ocean Teal — emotional depth","Sunset Orange — creative expression",
  "Silver — reflection and wisdom","Ruby Red — bold love","Forest Green — grounded connection"
];
var LUCKY_COLORS_ZH = [
  "玫瑰粉 — 打开心扉的能量","午夜蓝 — 深层的直觉","琥珀金 — 自信与暖意",
  "鼠尾草绿 — 生长与疗愈","薰衣草紫 — 灵性的澄澈","珊瑚色 — 重燃的热情",
  "珍珠白 — 全新的开始","深海青 — 情感的深度","落日橘 — 创造的表达",
  "银色 — 沉淀与智慧","宝石红 — 炽烈的爱","森林绿 — 踏实的联结"
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
var FORTUNE_MSG_ZH = [
  "今天宇宙站在你这边。那件你一直犹豫的事——把这当作绿灯吧。",
  "今天的情绪格外清明。相信你的感受，哪怕它和你的想法相反。",
  "今天，一个小小的举动会有超出预期的分量。别低估「出现」本身的力量。",
  "今天宜接收，不宜追逐。让一切来找你——你昨天散出的能量，正在回流。",
  "今天你的情绪铠甲薄了一点——这是好事。让某个人看到你不加修饰的样子。",
  "那些混乱的信号，其实就是清晰的信号。如果你觉得困惑，困惑本身就是答案。",
  "今天的能量偏爱坦率，而非圆滑。想说什么就说什么，说了就算数。",
  "过去在试图教你一些东西。听懂那个教训，但别再搬回去住。",
  "此刻有人正在想你。你要不要联系 TA——这个选择，会改写两条时间线。",
  "今天，安静本身很有力量。别急着填满每一段沉默，最重要的事往往发生在停顿里。",
  "你的心其实早就知道答案，只是脑子在拖后腿。相信第一直觉。",
  "今天是一个转折点，你要过后才会认出它。留意那些微小的瞬间。"
];

export function calcFortune(m, d) {
  var today = new Date();
  var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  var personal = (m * 31 + d + seed) % 12;
  var stars = (personal % 5) + 1;
  return {
    stars,
    kw: { en: FORTUNE_KW[personal], zh: FORTUNE_KW_ZH[personal] },
    yi: { en: FORTUNE_YI[personal], zh: FORTUNE_YI_ZH[personal] },
    ji: { en: FORTUNE_JI[personal], zh: FORTUNE_JI_ZH[personal] },
    color: { en: LUCKY_COLORS[personal], zh: LUCKY_COLORS_ZH[personal] },
    msg: { en: FORTUNE_MSG[personal], zh: FORTUNE_MSG_ZH[personal] },
  };
}
