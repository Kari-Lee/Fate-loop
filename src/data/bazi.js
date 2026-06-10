var TIAN = ["Jia","Yi","Bing","Ding","Wu","Ji","Geng","Xin","Ren","Gui"];
var DI = ["Zi","Chou","Yin","Mao","Chen","Si","Wu","Wei","Shen","You","Xu","Hai"];
var TIAN_ZH = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
var DI_ZH = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
var WUXING_T = ["Wood","Wood","Fire","Fire","Earth","Earth","Metal","Metal","Water","Water"];
var WUXING_D = ["Water","Earth","Wood","Wood","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"];
export var SHENGXIAO = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];

var ELEM = {
  Wood: { zh: "木", en: "Wood" }, Fire: { zh: "火", en: "Fire" }, Earth: { zh: "土", en: "Earth" },
  Metal: { zh: "金", en: "Metal" }, Water: { zh: "水", en: "Water" },
};
var SX_MAP = {
  Rat: { zh: "鼠", en: "Rat" }, Ox: { zh: "牛", en: "Ox" }, Tiger: { zh: "虎", en: "Tiger" },
  Rabbit: { zh: "兔", en: "Rabbit" }, Dragon: { zh: "龙", en: "Dragon" }, Snake: { zh: "蛇", en: "Snake" },
  Horse: { zh: "马", en: "Horse" }, Goat: { zh: "羊", en: "Goat" }, Monkey: { zh: "猴", en: "Monkey" },
  Rooster: { zh: "鸡", en: "Rooster" }, Dog: { zh: "狗", en: "Dog" }, Pig: { zh: "猪", en: "Pig" },
};

export var BAZI_MATCH = [
  { range: [90, 100], type: { zh: "天作之合", en: "Celestial Bond" }, intro: {
    zh: "你们的命盘契合得罕见地精准。在旧时的合婚里，这样的格局被看作上天落下的吉兆——彼此之间有天然的扶持、不必多言的理解，和一种「本就该是你」的归属感。这样的缘分不必刻意经营就已足够温柔，但也正因为来得太顺，要记得别把对方的好当成理所当然。",
    en: "Your charts align with rare precision. In old Chinese matchmaking, this configuration was read as a sign from heaven — natural mutual support, wordless understanding, and an effortless sense of belonging. A bond this gentle barely needs effort to feel right; just take care not to mistake their kindness for something owed.",
  }, advice: {
    zh: "这样的契合容易让人放松警惕。你们最大的功课不是磨合，而是别因为太合拍就停止用心——再天作之合的缘分，也要靠日常的看见与回应来续命。把对方的好说出口，别只放在心里；把习以为常的陪伴，重新当成礼物。",
    en: "A match this easy can make you drop your guard. Your real work isn't friction but attention — even a heaven-sent bond needs daily noticing and response to stay alive. Say their goodness out loud instead of only feeling it; treat the company you've grown used to as a gift again.",
  }, closing: {
    zh: "你们之间已有难得的底色，剩下的，是把这份幸运，活成长久。",
    en: "You already share a rare foundation; what's left is turning this luck into something that lasts.",
  } },
  { range: [75, 89], type: { zh: "琴瑟和鸣", en: "Harmonious Match" }, intro: {
    zh: "你们的能量彼此补位——你弱的地方，恰好是对方强的地方。这种天然的平衡未必毫无摩擦，但那是把两块石头都磨得更亮的那种摩擦。你们更像是一起变好的同行者，而不是要去改造对方的人。",
    en: "Your energies complement each other — where one is weak, the other is strong. This natural balance isn't free of friction, but it's the kind that polishes both stones brighter. You're fellow travelers growing better together, not people trying to remake each other.",
  }, advice: {
    zh: "你们的相处之道在于「分工而不计较」。让擅长的人做擅长的事，别用同一把尺子量彼此。意见不合时，记得你们本就是来互补的——对方的不同，恰恰是你缺的那一块。学会欣赏那份不一样，摩擦就会变成默契。",
    en: "Your way forward is 'divide the work without keeping score.' Let each do what they're good at, and stop measuring each other by the same ruler. When you disagree, remember you came here to complement — their difference is often the very piece you lack. Learn to admire it, and friction turns into rhythm.",
  }, closing: {
    zh: "你们不必成为同一种人，只要愿意朝同一个方向走。",
    en: "You don't have to become the same person — only to keep walking the same way.",
  } },
  { range: [60, 74], type: { zh: "渐入佳境", en: "Compatible Pair" }, intro: {
    zh: "你们有一个扎实的底子，也有继续生长的空间。这段关系需要你们主动去读懂彼此的节奏，但潜力是真实存在的。大多数好的关系都不是一开始就完美的——它们是被一点点建起来的。耐心，会是你们最好的盟友。",
    en: "You have a solid foundation with real room to grow. This pairing asks you to actively learn each other's rhythms, but the potential is genuine. Most good relationships aren't born perfect — they're built, slowly. Patience will be your best ally.",
  }, advice: {
    zh: "这段关系最怕的是「想当然」。你们需要把话说清楚、把节奏对明白——很多隔阂不是因为不爱，而是因为没问、没说。定期留一段只属于彼此的时间，把误会消化在它变大之前。慢慢地，你们会越来越合拍。",
    en: "The biggest risk here is assumption. You need to say things plainly and sync your rhythms — most distance comes not from a lack of love but from things unasked and unsaid. Keep a regular pocket of time that's only yours, and clear up misreadings before they grow. Slowly, you'll fall more in step.",
  }, closing: {
    zh: "好的关系是建出来的，而你们手里，有足够的砖。",
    en: "Good relationships are built — and you have plenty of bricks in hand.",
  } },
  { range: [40, 59], type: { zh: "刚柔相济", en: "Challenging Union" }, intro: {
    zh: "你们的五行之间带着张力。这不是判决书——一些最炽烈、最能让人脱胎换骨的关系，恰恰发生在这种「不那么顺」的配置里。它需要清醒的努力、足够的耐心，以及愿意在不适里继续成长的勇气。走得通，你们会比顺风顺水的人更懂彼此。",
    en: "There's tension between your elements. This isn't a verdict — some of the most passionate, transformative relationships happen in exactly these 'not-so-easy' configurations. It asks for conscious effort, real patience, and the courage to keep growing through discomfort. If you make it work, you'll know each other more deeply than easier couples ever do.",
  }, advice: {
    zh: "你们之间的张力需要被「翻译」，而不是被压下去。冲突来临时，先别急着赢——试着问一句「你其实在怕什么」。很多争执的底下，藏着一个没被听见的需要。能把张力转成理解，你们会强韧得超乎想象。",
    en: "The tension between you needs to be translated, not suppressed. When conflict comes, don't rush to win — try asking, 'what are you actually afraid of?' Beneath most arguments hides a need that went unheard. Turn that tension into understanding, and you'll be tougher than you ever imagined.",
  }, closing: {
    zh: "难走的路，往往通向最深的懂得。",
    en: "The harder road often leads to the deepest understanding.",
  } },
  { range: [0, 39], type: { zh: "针锋相对", en: "Opposing Forces" }, intro: {
    zh: "你们的五行能量正面相冲。在中国的宇宙观里，这是「相克」之局——一种元素天然压制着另一种。这并不意味着爱不可能，而是意味着这段关系会不断地考验你们。真正的问题从来不是「合不合」，而是「你们俩，愿不愿意为彼此下这份功夫」。",
    en: "Your elemental energies clash head-on. In Chinese cosmology this is the overcoming cycle — one element naturally suppresses the other. It doesn't make love impossible; it means the relationship will keep testing you. The real question was never 'are you compatible' — it's whether the two of you are willing to do the work.",
  }, advice: {
    zh: "相克的关系不是不能爱，而是要爱得更清醒。你们需要大量的边界感，和退让的智慧——知道什么时候坚持、什么时候放手。如果你们都愿意把「赢过对方」换成「一起赢」，这段看似艰难的缘分，反而能磨出最深的羁绊。",
    en: "An overcoming match isn't unlovable — it just has to be loved more consciously. You'll need strong boundaries and the wisdom to yield — knowing when to hold and when to let go. If you both trade 'beating each other' for 'winning together,' this seemingly hard bond can forge the deepest tie of all.",
  }, closing: {
    zh: "最烈的火，也能炼出最真的金——前提是，你们都不逃。",
    en: "The fiercest fire can still refine the truest gold — as long as neither of you runs.",
  } },
];

var SHENG = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
var KE = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

function elementPara(ey, ty) {
  var Ey = ELEM[ey], Ty = ELEM[ty];
  if (ey === ty) return {
    zh: "你们同属" + Ey.zh + "，五行上是「比和」。同气相求，你们看世界的方式天然同频，常常一个眼神就懂对方；只是太相像也少了互补，遇事容易一起钻进同一个死角，需要有人先松一口气、退半步。",
    en: "You share the " + Ey.en + " element — a resonant 'like-attracts-like' pairing. You read the world on the same frequency and often understand each other without words; the catch is that too much sameness lacks balance, and you may both dig into the same corner at once. Someone has to be the first to ease up.",
  };
  if (SHENG[ey] === ty) return {
    zh: "你的" + Ey.zh + "生对方的" + Ty.zh + "，是「相生」之局。你天然成为对方的养分与底气，付出与接纳之间流动得很顺——在这段关系里，你常是那个托举对方的人。记得，托举久了也要让自己被接住。",
    en: "Your " + Ey.en + " nourishes their " + Ty.en + " — a generating cycle. You naturally become their fuel and ground, and giving flows easily into receiving; you're often the one lifting them. Just remember to let yourself be caught, too.",
  };
  if (SHENG[ty] === ey) return {
    zh: "对方的" + Ty.zh + "生你的" + Ey.zh + "，是「相生」之局。对方天然滋养着你，在他身边你更容易松弛、更有安全感。这份被照顾是难得的福气——别忘了也让对方感到被你回应、被你看见。",
    en: "Their " + Ty.en + " nourishes your " + Ey.en + " — a generating cycle. They naturally feed and steady you; around them you relax and feel safe. Being cared for like this is a quiet gift — just be sure they feel met and seen by you in return.",
  };
  if (KE[ey] === ty) return {
    zh: "你的" + Ey.zh + "克对方的" + Ty.zh + "，落在「相克」之位。相克不是相杀，而是一种张力——你推动，对方收束。用得对，是势均力敌的彼此成全；用得不对，就容易在小事上较劲。多一分让，多十分顺。",
    en: "Your " + Ey.en + " overcomes their " + Ty.en + " — a controlling position. This isn't destruction but tension: you push, they contain. Aimed well it's matched, mutual growth; aimed poorly you'll spar over small things. A little more yielding goes a long way.",
  };
  if (KE[ty] === ey) return {
    zh: "对方的" + Ty.zh + "克你的" + Ey.zh + "，落在「相克」之位。你可能时常觉得被对方「压」着一点——但这股张力若朝对的方向使，反而能逼出你的成长。关键是别把它读成贬低，而是看作一面照见自己的镜子。",
    en: "Their " + Ty.en + " overcomes your " + Ey.en + " — a controlling position. You may often feel slightly pressed by them; but aimed in the right direction, that tension can force your growth. The key is not to read it as being diminished, but as a mirror that shows you yourself.",
  };
  return {
    zh: "你们的五行各自独立，既不相生也不相克，像两条并行的河。关系的走向更多取决于你们后天怎么经营，而非命里早已写定——这其实是好事：你们手里握着更多的主动权。",
    en: "Your elements run independently — neither generating nor controlling, like two parallel rivers. Where this goes depends more on how you tend it than on anything fated — which is good news: more of the steering wheel is in your hands.",
  };
}

function zodiacPara(d1, d2, sx1, sx2) {
  var liuhe = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var liuchong = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var A = SX_MAP[sx1], B = SX_MAP[sx2];
  var isHe = liuhe.some(function(p){ return (d1===p[0]&&d2===p[1])||(d1===p[1]&&d2===p[0]); });
  var isChong = liuchong.some(function(p){ return (d1===p[0]&&d2===p[1])||(d1===p[1]&&d2===p[0]); });
  if (isHe) return {
    zh: "更难得的是，你们的生肖" + A.zh + "与" + B.zh + "正是「六合」——十二生肖里最亲密的暗合之一，自古被当作良配的吉兆。相处中往往有一种说不清的安稳与默契，像是早就认识。",
    en: "Rarer still, your signs — " + A.en + " and " + B.en + " — form a Six Harmony, one of the closest hidden bonds among the twelve animals, long taken as an auspicious match. Between you there's often an unspoken ease, as if you'd met long ago.",
  };
  if (isChong) return {
    zh: "要留意，你们的生肖" + A.zh + "与" + B.zh + "相「冲」。六冲未必是坏事，它带来强烈的吸引与碰撞，却也意味着你们的节奏天生不同步，需要更多耐心去对齐彼此——爱得热烈的人，往往也吵得热烈。",
    en: "Note that your signs — " + A.en + " and " + B.en + " — are in Clash. A clash isn't doom; it brings strong attraction and collision, but your rhythms are naturally out of sync and will need patience to align — those who love loudly often argue loudly too.",
  };
  return {
    zh: "你们的生肖之间没有特别的合或冲，相处会更平稳，也更看你们自己怎么去塑造。没有命定的牵引，反倒留给了你们更多书写自己的余地。",
    en: "Your signs hold no special harmony or clash, making things steadier and more in your own hands to shape. With no fated pull either way, there's all the more room to write your own story.",
  };
}

export function calcBazi(y, m, d) {
  var tIdx = ((y - 4) % 10 + 10) % 10;
  var dIdx = ((y - 4) % 12 + 12) % 12;
  var gz = TIAN[tIdx] + "-" + DI[dIdx];
  var gzZh = TIAN_ZH[tIdx] + DI_ZH[dIdx];
  var wuxing = WUXING_T[tIdx];
  var sx = SHENGXIAO[dIdx];
  return { gz, gzZh, wuxing, sx, tIdx, dIdx };
}

export function baziCompat(b1, b2) {
  var s = 50;
  var liuhe = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var liuchong = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  liuhe.forEach(function(p){ if ((b1.dIdx===p[0]&&b2.dIdx===p[1])||(b1.dIdx===p[1]&&b2.dIdx===p[0])) s+=35; });
  liuchong.forEach(function(p){ if ((b1.dIdx===p[0]&&b2.dIdx===p[1])||(b1.dIdx===p[1]&&b2.dIdx===p[0])) s-=25; });
  if (b1.wuxing === b2.wuxing) s += 15;
  if (SHENG[b1.wuxing] === b2.wuxing || SHENG[b2.wuxing] === b1.wuxing) s += 20;
  if (KE[b1.wuxing] === b2.wuxing || KE[b2.wuxing] === b1.wuxing) s -= 15;
  s = Math.max(10, Math.min(98, s));
  var tier = BAZI_MATCH.find(function(m){ return s >= m.range[0] && s <= m.range[1]; });

  var ep = elementPara(b1.wuxing, b2.wuxing);
  var zp = zodiacPara(b1.dIdx, b2.dIdx, b1.sx, b2.sx);
  var analysis = {
    zh: [tier.intro.zh, ep.zh, zp.zh, tier.advice.zh, tier.closing.zh].join("\n\n"),
    en: [tier.intro.en, ep.en, zp.en, tier.advice.en, tier.closing.en].join("\n\n"),
  };

  return {
    score: s,
    type: tier.type,
    analysis: analysis,
    gz1: { zh: b1.gzZh, en: b1.gz }, gz2: { zh: b2.gzZh, en: b2.gz },
    w1: ELEM[b1.wuxing], w2: ELEM[b2.wuxing],
    sx1: SX_MAP[b1.sx], sx2: SX_MAP[b2.sx],
  };
}
