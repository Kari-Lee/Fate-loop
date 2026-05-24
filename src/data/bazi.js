var TIAN = ["Jia","Yi","Bing","Ding","Wu","Ji","Geng","Xin","Ren","Gui"];
var DI = ["Zi","Chou","Yin","Mao","Chen","Si","Wu","Wei","Shen","You","Xu","Hai"];
var WUXING_T = ["Wood","Wood","Fire","Fire","Earth","Earth","Metal","Metal","Water","Water"];
var WUXING_D = ["Water","Earth","Wood","Wood","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"];
export var SHENGXIAO = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
export var BAZI_MATCH = [
  { type:"Celestial Bond", range:[90,100], desc:"Your elements align with rare precision. In ancient Chinese matchmaking, this configuration was considered a sign from heaven — the kind of pairing that fortune tellers would celebrate. Strong mutual support, natural understanding, and an effortless sense of belonging." },
  { type:"Harmonious Match", range:[75,89], desc:"Your energies complement each other well. Where one is weak, the other is strong. This creates a natural balance — not without friction, but the kind of friction that polishes both stones brighter." },
  { type:"Compatible Pair", range:[60,74], desc:"A solid foundation with room for growth. You'll need to actively work on understanding each other's rhythms, but the potential is genuinely there. Most great relationships aren't born perfect — they're built." },
  { type:"Challenging Union", range:[40,59], desc:"Your elements create tension. This isn't a death sentence — some of the most passionate, transformative relationships happen between challenging configurations. But it requires conscious effort, patience, and a willingness to grow through discomfort." },
  { type:"Opposing Forces", range:[0,39], desc:"Your elemental energies clash. In Chinese cosmology, this is the overcoming cycle — one element naturally suppresses the other. This doesn't mean love is impossible, but it means the relationship will constantly test you. The question is whether you're both willing to do the work." },
];

export function calcBazi(y, m, d) {
  var tIdx = ((y - 4) % 10 + 10) % 10;
  var dIdx = ((y - 4) % 12 + 12) % 12;
  var gz = TIAN[tIdx] + "-" + DI[dIdx];
  var wuxing = WUXING_T[tIdx];
  var sx = SHENGXIAO[dIdx];
  return { gz, wuxing, sx, tIdx, dIdx };
}

export function baziCompat(b1, b2) {
  var s = 50;
  var liuhe = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var liuchong = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  liuhe.forEach(function(p){ if ((b1.dIdx===p[0]&&b2.dIdx===p[1])||(b1.dIdx===p[1]&&b2.dIdx===p[0])) s+=35; });
  liuchong.forEach(function(p){ if ((b1.dIdx===p[0]&&b2.dIdx===p[1])||(b1.dIdx===p[1]&&b2.dIdx===p[0])) s-=25; });
  if (b1.wuxing === b2.wuxing) s += 15;
  var sheng = { Wood:"Fire", Fire:"Earth", Earth:"Metal", Metal:"Water", Water:"Wood" };
  if (sheng[b1.wuxing] === b2.wuxing || sheng[b2.wuxing] === b1.wuxing) s += 20;
  var ke = { Wood:"Earth", Earth:"Water", Water:"Fire", Fire:"Metal", Metal:"Wood" };
  if (ke[b1.wuxing] === b2.wuxing || ke[b2.wuxing] === b1.wuxing) s -= 15;
  s = Math.max(10, Math.min(98, s));
  var info = BAZI_MATCH.find(function(m){ return s >= m.range[0] && s <= m.range[1]; });
  return { score: s, info, gz1: b1.gz, gz2: b2.gz, w1: b1.wuxing, w2: b2.wuxing, sx1: b1.sx, sx2: b2.sx };
}
