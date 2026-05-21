export const CHATGPT_PRICING = {
  free: 0,

  plus: {
    monthly: 20,
  },

  pro: {
    monthly: 200,
  },

  team: {
    annual: 30,
    monthly: 37.5,
    minSeats: 2,
  },

  enterprise: {
    customPricing: true,
  },
};

export const CURSOR_PRICING = {
  hobby: 0,

  pro: {
    monthly: 20,
  },

  proPlus: {
    monthly: 60,
  },

  ultra: {
    monthly: 200,
  },

  teams: {
    monthly: 40,
  },

  enterprise: {
    customPricing: true,
  },
};

export const WINDSURF_PRICING = {
  free: 0,

  pro: {
    monthly: 20,
  },

  max: {
    monthly: 200,
  },

  teams: {
    monthly: 40,
  },

  enterprise: {
    customPricing: true,
  },
};

export const COPILOT_PRICING = {
  free: 0,

  pro: {
    monthly: 10,
  },

  proPlus: {
    monthly: 39,
  },

  business: {
    monthly: 19,
  },

  enterprise: {
    monthly: 39,
  },
};

export const CLAUDE_SUBSCRIPTION_PRICING = {
  free: 0,

  pro: {
    monthly: 20,
    annual: 17,
  },

  max5x: {
    monthly: 100,
  },

  max20x: {
    monthly: 200,
  },

  teamStandard: {
    monthly: 25,
    annual: 20,
    minSeats: 5,
  },

  teamPremium: {
    monthly: 125,
    annual: 100,
    minSeats: 5,
  },

  enterprise: {
    customPricing: true,
  },
};

export const OPENAI_API_PRICING = {
  gpt4oMini: {
    input: 0.15,
    output: 0.6,
  },

  gpt4o: {
    input: 2.5,
    output: 10,
  },

  gpt41: {
    input: 2,
    output: 8,
  },
};

export const CLAUDE_API_PRICING = {
  haiku45: {
    input: 1,
    output: 5,

    batch: {
      input: 0.5,
      output: 2.5,
    },
  },

  sonnet46: {
    input: 3,
    output: 15,

    batch: {
      input: 1.5,
      output: 7.5,
    },
  },

  opus47: {
    input: 5,
    output: 25,

    batch: {
      input: 2.5,
      output: 12.5,
    },
  },
};

export const GEMINI_API_PRICING = {
  gemini25Flash: {
    input: 0.3,
    output: 2.5,
  },

  gemini35Flash: {
    input: 1.5,
    output: 9,
  },
};
