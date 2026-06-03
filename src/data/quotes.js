const QUOTES = [
  { en: "They're not ignoring you. Their element is just incompatible with yours.", zh: "他们不是在无视你。只是他们的五行，跟你相克。" },
  { en: "You didn't fall in love. The Five Elements pushed you into each other.", zh: "你不是坠入爱河。是五行把你们推向了彼此。" },
  { en: "Your ex wasn't toxic. They were Fire and you were Metal. Do the math.", zh: "你前任不是有毒。他们是火，你是金。自己算算。" },
  { en: "The Red Thread doesn't care about your feelings. It just ties.", zh: "红线不在乎你的感受。它只负责把人系上。" },
  { en: "Wood feeds Fire. Fire creates Earth. Earth produces Metal. Metal collects Water. Water nourishes Wood. Now explain your relationship.", zh: "木生火，火生土，土生金，金生水，水生木。现在，解释一下你这段关系。" },
  { en: "You keep dating the same person because the zodiac cycle is a loop.", zh: "你总在和同一种人谈恋爱——因为生肖本就是个循环。" },
  { en: "They said 'I need space.' In Five Elements terms: you're Earth. They're Water. You're literally absorbing them.", zh: "他们说「我需要空间」。用五行讲：你是土，他们是水。你确实正在吸干他们。" },
  { en: "Compatibility isn't about love. It's about which element you are when nobody's watching.", zh: "合不合，无关爱。关乎的是，没人看着时，你究竟是哪一行。" },
  { en: "The ancient Chinese figured out your relationship problems 3,000 years ago. You just weren't listening.", zh: "你的感情问题，古人三千年前就参透了。只是你没在听。" },
  { en: "Fate doesn't repeat itself. It loops.", zh: "命运不会重演。它循环。" },
  { en: "If they ghost you during Mercury retrograde, that's astrology. If they ghost you during a Metal year, that's destiny.", zh: "水逆时被已读不回，那是星座。金年里被已读不回，那是命。" },
  { en: "Your attachment style is just your element wearing a psychology costume.", zh: "你的依恋类型，不过是你的五行，套了件心理学的外衣。" },
  { en: "Stop reading their texts. Start reading their birth chart.", zh: "别再翻他们的聊天记录了。去看他们的命盘吧。" },
  { en: "The universe paired you two for a reason. That reason might be suffering.", zh: "天意让你俩相遇，自有缘由。那缘由，或许就是受苦。" },
  { en: "Water doesn't fight Fire. It just... wins. Quietly.", zh: "水不与火相争。它只是……静静地，赢了。" },
  { en: "You're not overthinking. You're just a Metal type doing Metal things.", zh: "你不是想太多。你只是个金命，在做金命该做的事。" },
  { en: "Three thousand years of Chinese wisdom and you still texted them back.", zh: "三千年的东方智慧，到头来你还是回了他们消息。" },
  { en: "The Oracle Sticks don't lie. You just don't like the answer.", zh: "灵签从不说谎。只是你不喜欢这个答案。" },
  { en: "Some threads are red. Some are tangled. Yours is both.", zh: "有的姻缘线是红的，有的是乱的。你的，两样都占。" },
  { en: "They're not 'complicated.' They're a Snake. Read the manual.", zh: "他们不是「很复杂」。他们属蛇。说明书读一读。" },
  { en: "Earth types build walls and call it love. Water types flood everything and call it passion.", zh: "土命的人筑起高墙，称之为爱。水命的人淹没一切，称之为热情。" },
  { en: "The zodiac predicted this breakup 12 years ago. You just had to live through it.", zh: "这场分手，生肖十二年前就预言了。你只是不得不亲身走一遭。" },
  { en: "Your Five Elements profile explains more about your love life than three years of therapy.", zh: "你的五行命格，比三年心理咨询更能解释你的感情生活。" },
  { en: "Fate loops. That's why you keep meeting the same soul in different bodies.", zh: "命运循环。所以你总在不同的躯壳里，遇见同一个灵魂。" },
  { en: "The ancients didn't have dating apps. They had something better: math.", zh: "古人没有交友软件。他们有更厉害的东西：算术。" },
];

export function getDailyQuote(lang) {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const q = QUOTES[seed % QUOTES.length];
  if (!q) return "";
  return (lang === "zh" ? q.zh : q.en) || q.en;
}

export default QUOTES;
