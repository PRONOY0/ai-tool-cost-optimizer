export const PRICING = {
  chatgpt: {
    free: 0,
    plus: { monthly: 20 },
    pro: { monthly: 200 },
    team: { monthly: 37.5, annual: 30, minSeats: 2 },
    enterprise: { customPricing: true },
  },

  cursor: {
    hobby: 0,
    pro: { monthly: 20 },
    proPlus: { monthly: 60 },
    ultra: { monthly: 200 },
    teams: { monthly: 40 },
    enterprise: { customPricing: true },
  },

  windsurf: {
    free: 0,
    pro: { monthly: 20 },
    max: { monthly: 200 },
    teams: { monthly: 40 },
    enterprise: { customPricing: true },
  },

  copilot: {
    free: 0,
    pro: { monthly: 10 },
    proPlus: { monthly: 39 },
    business: { monthly: 19 },
    enterprise: { monthly: 39 },
  },

  claude: {
    free: 0,
    pro: { monthly: 20, annual: 17 },
    max5x: { monthly: 100 },
    max20x: { monthly: 200 },
    teamStandard: { monthly: 25, annual: 20, minSeats: 5 },
    teamPremium: { monthly: 125, annual: 100, minSeats: 5 },
    enterprise: { customPricing: true },
  },

  openaiApi: {
    gpt4oMini: { input: 0.15, output: 0.6 },
    gpt4o: { input: 2.5, output: 10 },
    gpt41: { input: 2, output: 8 },
  },

  claudeApi: {
    haiku45: { input: 1, output: 5, batch: { input: 0.5, output: 2.5 } },
    sonnet46: { input: 3, output: 15, batch: { input: 1.5, output: 7.5 } },
    opus47: { input: 5, output: 25, batch: { input: 2.5, output: 12.5 } },
  },

  geminiApi: {
    gemini25Flash: { input: 0.3, output: 2.5 },
    gemini35Flash: { input: 1.5, output: 9 },
  },

  gemini: {
    free: 0,
    pro: { monthly: 19.99 },
    ultra: { monthly: 99.99 },
    enterprise: { customPricing: true },
  },
} as const;
