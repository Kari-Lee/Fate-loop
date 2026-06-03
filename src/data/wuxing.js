// Five Elements (Wu Xing) system — bilingual (en/zh)
// Text fields that need translation use { en, zh }. Read with a helper: L(field, lang).

export const ELEMENTS = {
  木: {
    en: "Wood",
    symbol: "木",
    emoji: "🌿",
    color: "#4A7C59",
    gradient: "linear-gradient(135deg, #2D5A3D, #6B9B7A)",
    bg: "#1A2F22",
    traits: {
      en: ["Growth-oriented", "Flexible but resilient", "Deeply empathetic", "Restless energy"],
      zh: ["向上生长", "柔韧而坚定", "共情至深", "不安于停滞"],
    },
    loveStyle: {
      en: "You love by growing alongside someone. You need space to stretch, but your roots run deep. When you commit, you intertwine your entire life with theirs.",
      zh: "你以并肩生长的方式去爱。你需要伸展的空间，但根扎得很深。一旦认定，你便将整个人生与对方缠绕在一起。",
    },
    shadow: {
      en: "You avoid confrontation until you snap like a branch. You confuse independence with emotional unavailability.",
      zh: "你回避冲突，直到像枝条一样骤然折断。你把独立误认成了情感上的疏离。",
    },
  },
  火: {
    en: "Fire",
    symbol: "火",
    emoji: "🔥",
    color: "#C75B3A",
    gradient: "linear-gradient(135deg, #8B2E16, #D4724A)",
    bg: "#2A1510",
    traits: {
      en: ["Passionate & intense", "Quick to ignite", "Magnetic presence", "Burns bright, burns fast"],
      zh: ["热烈而炽盛", "一点就燃", "天生的吸引力", "燃得明亮，也燃得迅疾"],
    },
    loveStyle: {
      en: "You love like a wildfire — consuming, illuminating, impossible to ignore. You make people feel alive. The problem is you sometimes burn through relationships the same way.",
      zh: "你爱得像一场野火——吞噬、照亮、无法被忽视。你让人感到鲜活。问题是，你有时也会用同样的方式把一段关系烧尽。",
    },
    shadow: {
      en: "You mistake intensity for intimacy. When the spark fades, you assume the love is gone — but maybe you just need to learn to tend embers.",
      zh: "你把炽烈误认成亲密。当火花褪去，你便以为爱已不在——可也许，你只是还没学会守护余烬。",
    },
  },
  土: {
    en: "Earth",
    symbol: "土",
    emoji: "🏔",
    color: "#A08050",
    gradient: "linear-gradient(135deg, #6B5535, #C4A06A)",
    bg: "#231E15",
    traits: {
      en: ["Grounded & stable", "Nurturing by nature", "Overthinks everything", "Loyal to a fault"],
      zh: ["沉稳踏实", "天生懂得滋养", "凡事都想太多", "忠诚到近乎固执"],
    },
    loveStyle: {
      en: "You are the person people come home to. Steady, warm, endlessly patient. You build love like you build anything — brick by brick, with care.",
      zh: "你是那个让人想要归来的人。沉稳、温暖、有着无尽的耐心。你筑造爱，就像筑造一切——一砖一瓦，悉心而为。",
    },
    shadow: {
      en: "You give and give until you resent the giving. You confuse being needed with being loved.",
      zh: "你不停地付出，直到对付出本身心生怨怼。你把被需要，误认成了被爱。",
    },
  },
  金: {
    en: "Metal",
    symbol: "金",
    emoji: "⚔️",
    color: "#8A8A8A",
    gradient: "linear-gradient(135deg, #4A4A4A, #A0A0A0)",
    bg: "#1A1A1E",
    traits: {
      en: ["Sharp-minded", "High standards", "Emotionally guarded", "Values structure"],
      zh: ["头脑锐利", "标准极高", "情感设防", "重视秩序"],
    },
    loveStyle: {
      en: "You love precisely. You know exactly what you want and refuse to settle. When you let someone in, it means something — because you don't let just anyone past your walls.",
      zh: "你爱得精准。你清楚地知道自己要什么，绝不将就。你放一个人进来，是有分量的——因为你不会让任何人轻易越过你的城墙。",
    },
    shadow: {
      en: "Your standards are so high they become a wall. You cut people off cleanly when they disappoint you, and you call it self-respect.",
      zh: "你的标准高到成了一堵墙。当别人让你失望，你便干脆利落地斩断关系，还称之为自尊。",
    },
  },
  水: {
    en: "Water",
    symbol: "水",
    emoji: "🌊",
    color: "#4A6FA5",
    gradient: "linear-gradient(135deg, #1E3A5F, #6B8FC4)",
    bg: "#121D2A",
    traits: {
      en: ["Deeply intuitive", "Emotionally fluid", "Mysterious depth", "Adapts to everything"],
      zh: ["直觉极深", "情绪流动", "深不可测", "随境而变"],
    },
    loveStyle: {
      en: "You feel everything. You absorb your partner's emotions like a sponge. You love by understanding — sometimes you know what they need before they do.",
      zh: "你感知一切。你像海绵一样吸纳着伴侣的情绪。你以理解去爱——有时，在对方察觉之前，你便已懂得他们的需要。",
    },
    shadow: {
      en: "You lose yourself in other people. You're so busy reading their emotions that you forget to check your own.",
      zh: "你在他人之中迷失了自己。你忙于读懂别人的情绪，却忘了照看自己的内心。",
    },
  },
};

export const SHENG = {
  木: "火", 火: "土", 土: "金", 金: "水", 水: "木",
};
export const SHENG_DESC = {
  "木→火": { en: "Wood feeds Fire", zhTitle: "木生火", desc: { en: "You fuel their passion. They light up around you. This is the relationship where you both become more alive — but be careful you don't burn yourself out keeping their flame going.", zh: "你为对方的热情添柴。他们在你身边熠熠发光。这是一段让你们都更鲜活的关系——但小心，别为了维持对方的火焰，把自己燃尽。" } },
  "火→土": { en: "Fire creates Earth", zhTitle: "火生土", desc: { en: "Your intensity grounds into something lasting through them. They take your chaotic energy and turn it into something stable, real, buildable.", zh: "你的炽烈，透过对方沉淀成了某种长久的东西。他们接住你纷乱的能量，把它化作稳定、真实、可以筑造的存在。" } },
  "土→金": { en: "Earth produces Metal", zhTitle: "土生金", desc: { en: "Your steadiness gives them the foundation to be their sharpest self. You believe in them so consistently that they start believing in themselves.", zh: "你的沉稳，给了对方成为最锋利自己的根基。你始终如一地相信他们，直到他们也开始相信自己。" } },
  "金→水": { en: "Metal collects Water", zhTitle: "金生水", desc: { en: "Your clarity gives shape to their emotional depth. Without you, they'd overflow. With you, their feelings find direction.", zh: "你的清晰，为对方深沉的情感赋予了形状。没有你，他们会泛滥；有了你，他们的情绪终于有了方向。" } },
  "水→木": { en: "Water nourishes Wood", zhTitle: "水生木", desc: { en: "Your emotional intelligence feeds their growth. You understand them in ways nobody else does. This is quiet love — the kind that shows up every day.", zh: "你的情绪智慧，滋养着对方的成长。你以无人能及的方式懂得他们。这是一种安静的爱——那种每一天都会如约而至的爱。" } },
};

export const KE = {
  木: "土", 土: "水", 水: "火", 火: "金", 金: "木",
};
export const KE_DESC = {
  "木→土": { en: "Wood penetrates Earth", zhTitle: "木克土", desc: { en: "You destabilize them. Your need for growth uproots their need for stability. They feel like they can never settle down when you're around.", zh: "你动摇着对方。你对生长的渴求，连根拔起了他们对安定的需要。有你在，他们仿佛永远无法安顿下来。" } },
  "土→水": { en: "Earth absorbs Water", zhTitle: "土克水", desc: { en: "You contain them until they feel suffocated. Your need for control dams up their emotional flow. They feel trapped.", zh: "你将对方圈住，直到他们感到窒息。你对掌控的需要，筑坝拦截了他们情绪的流动。他们觉得自己被困住了。" } },
  "水→火": { en: "Water extinguishes Fire", zhTitle: "水克火", desc: { en: "You cool their passion. Your emotional heaviness puts out their spark. They start dimming themselves to match your energy.", zh: "你浇熄了对方的热情。你情绪的沉重，掐灭了他们的火花。他们开始黯淡自己，去迁就你的能量。" } },
  "火→金": { en: "Fire melts Metal", zhTitle: "火克金", desc: { en: "Your intensity overwhelms their structure. You're so much that their carefully built walls collapse — and not always in a good way.", zh: "你的炽烈压垮了对方的秩序。你过于汹涌，让他们精心筑起的城墙轰然倒塌——而这并不总是好事。" } },
  "金→木": { en: "Metal chops Wood", zhTitle: "金克木", desc: { en: "Your criticism cuts their growth short. Every time they try to expand, you prune them back. You call it realism. They call it suffocating.", zh: "你的批评，斩断了对方的生长。每当他们想要伸展，你便将他们修剪回去。你称之为现实，他们却觉得窒息。" } },
};

export const SAME_DESC = {
  木: { en: "Two Woods tangled together — growing in the same direction, fighting for the same sunlight. Beautiful and competitive.", zh: "两棵木缠绕在一起——朝着同一个方向生长，争夺着同一缕阳光。既美好，又彼此较量。" },
  火: { en: "Two Fires. Twice the heat, twice the passion, twice the chance of burning the whole thing down. Spectacular while it lasts.", zh: "两团火。双倍的炽热，双倍的激情，也有双倍的几率把一切烧成灰烬。燃烧时，蔚为壮观。" },
  土: { en: "Two Earths. So stable it might actually get boring. You'll build a beautiful life and forget to live in it.", zh: "两片土。稳定到或许会有些乏味。你们会筑起一份美好的生活，却忘了住进去。" },
  金: { en: "Two Metals. Both sharp, both proud, both refusing to bend first. Respect is high. Warmth is... being negotiated.", zh: "两块金。都锋利，都骄傲，都不肯先低头。敬重很多，温度……还在协商之中。" },
  水: { en: "Two Waters. You understand each other on a level that's almost telepathic. The danger is drowning in each other's emotions.", zh: "两汪水。你们彼此理解得近乎心灵相通。危险在于，会溺死在对方的情绪里。" },
};

export const ZODIAC = [
  { zh: "鼠", en: "Rat", emoji: "🐀", years: "1984, 1996, 2008, 2020" },
  { zh: "牛", en: "Ox", emoji: "🐂", years: "1985, 1997, 2009, 2021" },
  { zh: "虎", en: "Tiger", emoji: "🐅", years: "1986, 1998, 2010, 2022" },
  { zh: "兔", en: "Rabbit", emoji: "🐇", years: "1987, 1999, 2011, 2023" },
  { zh: "龙", en: "Dragon", emoji: "🐉", years: "1988, 2000, 2012, 2024" },
  { zh: "蛇", en: "Snake", emoji: "🐍", years: "1989, 2001, 2013, 2025" },
  { zh: "马", en: "Horse", emoji: "🐎", years: "1990, 2002, 2014, 2026" },
  { zh: "羊", en: "Goat", emoji: "🐐", years: "1991, 2003, 2015, 2027" },
  { zh: "猴", en: "Monkey", emoji: "🐒", years: "1992, 2004, 2016, 2028" },
  { zh: "鸡", en: "Rooster", emoji: "🐓", years: "1993, 2005, 2017, 2029" },
  { zh: "狗", en: "Dog", emoji: "🐕", years: "1994, 2006, 2018, 2030" },
  { zh: "猪", en: "Pig", emoji: "🐖", years: "1995, 2007, 2019, 2031" },
];

// 六冲 Six Clashes
export const TOXIC_COMBOS = [
  { a: 0, b: 6, level: "☠️",
    label: { en: "CATASTROPHIC", zh: "天雷地火" },
    title: { en: "Rat × Horse", zh: "鼠 × 马" },
    desc: { en: "The classic control-freak meets free-spirit collision. Rat wants to plan everything. Horse wants to burn the plan and run. You'll have explosive chemistry and even more explosive arguments. The makeup sex is legendary. The breakup texts are novels.", zh: "经典的控制狂撞上自由灵魂。鼠想把一切都规划好，马想烧掉计划撒腿就跑。你们会有爆炸般的吸引力，和更爆炸的争吵。和好时惊天动地，分手时的短信能写成长篇小说。" },
    advice: { en: "If you're in this: stop trying to change each other. That's not love, that's a renovation project.", zh: "若你身处其中：别再试图改造对方。那不是爱，那是一项翻新工程。" } },
  { a: 1, b: 7, level: "☠️",
    label: { en: "CATASTROPHIC", zh: "天雷地火" },
    title: { en: "Ox × Goat", zh: "牛 × 羊" },
    desc: { en: "Ox builds a fortress of routine. Goat fills it with chaos and art supplies. Ox calls Goat irresponsible. Goat calls Ox boring. Both are right. Neither will admit the other has a point.", zh: "牛筑起一座规律的堡垒，羊往里塞满了混乱和画材。牛说羊不负责任，羊说牛无趣。两人都对，可谁也不肯承认对方有理。" },
    advice: { en: "The Ox needs to learn that not everything needs a spreadsheet. The Goat needs to learn that some things do.", zh: "牛要学会：不是一切都得列进表格。羊要学会：有些事，确实得列。" } },
  { a: 2, b: 8, level: "💀",
    label: { en: "VOLATILE", zh: "势均力敌" },
    title: { en: "Tiger × Monkey", zh: "虎 × 猴" },
    desc: { en: "Two alpha energies in one relationship. Tiger is raw power. Monkey is cunning strategy. They both think they're in charge. Nobody is in charge. It's anarchy with occasional tenderness.", zh: "一段关系里挤进两个王者。虎是蛮力，猴是机谋。两人都以为自己说了算，结果谁也不算。这是一场偶尔夹着温柔的无政府状态。" },
    advice: { en: "This works ONLY if you both find each other's power attractive instead of threatening.", zh: "这段关系成立的唯一前提：你们都觉得对方的强大是吸引，而非威胁。" } },
  { a: 3, b: 9, level: "💀",
    label: { en: "VOLATILE", zh: "势均力敌" },
    title: { en: "Rabbit × Rooster", zh: "兔 × 鸡" },
    desc: { en: "Rabbit is soft-spoken, indirect, reads the room. Rooster says exactly what they think, loudly, at dinner with your parents. Rabbit silently builds resentment. Rooster has no idea anything is wrong until Rabbit vanishes.", zh: "兔说话温软、含蓄、善于察言观色。鸡想什么说什么，大声地，在和你父母的饭桌上。兔默默积攒怨气，鸡却浑然不觉，直到兔消失无踪。" },
    advice: { en: "Rooster: ask before you 'fix' things. Rabbit: open your mouth before it's too late.", zh: "鸡：动手「解决」之前，先问一句。兔：在为时已晚之前，开口说出来。" } },
  { a: 4, b: 10, level: "🔥",
    label: { en: "INTENSE", zh: "针锋相对" },
    title: { en: "Dragon × Dog", zh: "龙 × 狗" },
    desc: { en: "Dragon demands to be admired. Dog demands to be trusted. Dragon's grand gestures feel performative to Dog. Dog's loyalty feels boring to Dragon. It's a fundamental disagreement about what love should look like.", zh: "龙渴望被仰慕，狗渴望被信任。龙的盛大姿态，在狗看来像是表演；狗的忠诚，在龙看来又太过平淡。这是一场关于「爱该是什么模样」的根本分歧。" },
    advice: { en: "Dragon needs to understand that quiet devotion IS love. Dog needs to let Dragon shine without feeling threatened.", zh: "龙要懂得：安静的守护，也是爱。狗要学会：让龙发光，而不感到被威胁。" } },
  { a: 5, b: 11, level: "🔥",
    label: { en: "INTENSE", zh: "针锋相对" },
    title: { en: "Snake × Pig", zh: "蛇 × 猪" },
    desc: { en: "Snake is private, calculating, plays 4D chess with emotions. Pig is open, generous, wears their heart on their sleeve. Snake finds Pig naive. Pig finds Snake exhausting. The irony? They're both deeply emotional — just in completely opposite ways.", zh: "蛇隐秘、精于盘算，把情感下成一盘四维棋。猪坦荡、慷慨，把心事都挂在脸上。蛇觉得猪天真，猪觉得蛇累人。讽刺的是？他们都极重感情——只是方式截然相反。" },
    advice: { en: "Snake: vulnerability isn't weakness. Pig: not everyone who's guarded is hiding something bad.", zh: "蛇：示弱并非软弱。猪：不是每个设防的人，都藏着坏心思。" } },
];

// 六合 Six Harmonies
export const HARMONY_COMBOS = [
  { a: 0, b: 1, label: { en: "SOULMATE ENERGY", zh: "灵魂契合" }, title: { en: "Rat × Ox", zh: "鼠 × 牛" },
    desc: { en: "The strategist and the builder. Rat sees the opportunity, Ox makes it real. Low-drama, high-trust, annoyingly functional. Other couples hate you.", zh: "谋士与筑造者。鼠看见机会，牛把它变成现实。少有戏剧，高度信任，稳定得让人嫉妒。其他情侣都看你们不顺眼。" } },
  { a: 2, b: 11, label: { en: "SOULMATE ENERGY", zh: "灵魂契合" }, title: { en: "Tiger × Pig", zh: "虎 × 猪" },
    desc: { en: "Tiger's boldness meets Pig's warmth. Tiger protects, Pig nurtures. It's the relationship where you both feel safe enough to be your messiest selves.", zh: "虎的果敢遇上猪的温暖。虎守护，猪滋养。在这段关系里，你们都安心到敢于露出最狼狈的自己。" } },
  { a: 3, b: 10, label: { en: "DEEP BOND", zh: "深度羁绊" }, title: { en: "Rabbit × Dog", zh: "兔 × 狗" },
    desc: { en: "Two of the most loyal signs. You build a world together and never want to leave it. Quiet love, deep roots, matching pajamas by month three.", zh: "两个最忠诚的属相。你们一起筑起一个世界，再也不想离开。安静的爱，深扎的根，第三个月就穿上了情侣睡衣。" } },
  { a: 4, b: 9, label: { en: "POWER COUPLE", zh: "神仙眷侣" }, title: { en: "Dragon × Rooster", zh: "龙 × 鸡" },
    desc: { en: "Dragon's vision plus Rooster's execution. You look incredible together and you know it. The couple that walks into a room and everyone notices.", zh: "龙的远见，加上鸡的执行力。你们站在一起光彩照人，而你们也心知肚明。那种一走进房间，所有人都会注意到的情侣。" } },
  { a: 5, b: 8, label: { en: "DEEP BOND", zh: "深度羁绊" }, title: { en: "Snake × Monkey", zh: "蛇 × 猴" },
    desc: { en: "The intellectuals. You can talk for 12 hours straight and still have things to say. Mental connection so strong it becomes physical. Conversations that feel like foreplay.", zh: "两个智识型选手。你们能连聊十二个小时，还有说不完的话。精神共鸣强烈到化为身体的吸引。那种聊天本身就像前戏。" } },
  { a: 6, b: 7, label: { en: "NATURAL FIT", zh: "天然相契" }, title: { en: "Horse × Goat", zh: "马 × 羊" },
    desc: { en: "Horse runs, Goat wanders, they always find their way back to each other. Freedom-loving but deeply attached. The relationship that feels like a road trip with no destination.", zh: "马奔跑，羊游荡，却总能找到彼此回去的路。热爱自由，却又深深依恋。那种像一场没有目的地的公路旅行的关系。" } },
];

export function getZodiacIndex(year) {
  return ((year - 4) % 12 + 12) % 12;
}

export function getElement(year, month, day) {
  const t = ((year - 4) % 10 + 10) % 10;
  const dd = Math.floor((Date.UTC(year, month - 1, day) / 86400000) + 10) % 60;
  const dayT = dd % 10;
  const wuxingMap = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
  const zhMap = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
  return { en: wuxingMap[dayT], zh: zhMap[dayT], yearEn: wuxingMap[t], yearZh: zhMap[t] };
}

// Helper: pick language value from a bilingual field. Falls back to en.
export function L(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
}
