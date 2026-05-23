const QUOTES = [
  "They're not ignoring you. Their element is just incompatible with yours.",
  "You didn't fall in love. The Five Elements pushed you into each other.",
  "Your ex wasn't toxic. They were Fire and you were Metal. Do the math.",
  "The Red Thread doesn't care about your feelings. It just ties.",
  "Wood feeds Fire. Fire creates Earth. Earth produces Metal. Metal collects Water. Water nourishes Wood. Now explain your relationship.",
  "You keep dating the same person because the zodiac cycle is a loop.",
  "They said 'I need space.' In Five Elements terms: you're Earth. They're Water. You're literally absorbing them.",
  "Compatibility isn't about love. It's about which element you are when nobody's watching.",
  "The ancient Chinese figured out your relationship problems 3,000 years ago. You just weren't listening.",
  "Fate doesn't repeat itself. It loops.",
  "If they ghost you during Mercury retrograde, that's astrology. If they ghost you during a Metal year, that's destiny.",
  "Your attachment style is just your element wearing a psychology costume.",
  "Stop reading their texts. Start reading their birth chart.",
  "The universe paired you two for a reason. That reason might be suffering.",
  "Water doesn't fight Fire. It just... wins. Quietly.",
  "You're not overthinking. You're just a Metal type doing Metal things.",
  "Three thousand years of Chinese wisdom and you still texted them back.",
  "The Oracle Sticks don't lie. You just don't like the answer.",
  "Some threads are red. Some are tangled. Yours is both.",
  "They're not 'complicated.' They're a Snake. Read the manual.",
  "Earth types build walls and call it love. Water types flood everything and call it passion.",
  "The zodiac predicted this breakup 12 years ago. You just had to live through it.",
  "Your Five Elements profile explains more about your love life than three years of therapy.",
  "Fate loops. That's why you keep meeting the same soul in different bodies.",
  "The ancients didn't have dating apps. They had something better: math.",
];

export function getDailyQuote() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return QUOTES[seed % QUOTES.length];
}

export default QUOTES;
