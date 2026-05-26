import {
  AuditResult,
  Recommendation,
  ToolInput,
  ToolName,
} from "@/types/audit";
import { useCase } from "@prisma/client";
import { PRICING } from "@/lib/pricing";

const SOLO_PLAN_PRICE: Record<ToolName, number> = {
  chatgpt: PRICING.chatgpt.plus.monthly,
  claude: PRICING.claude.pro.monthly,
  copilot: PRICING.copilot.pro.monthly,
  cursor: PRICING.cursor.pro.monthly,
  gemini: PRICING.gemini.pro.monthly,
  geminiApi: 0,
  windsurf: PRICING.windsurf.pro.monthly,
};

const soloAlterNative: Record<ToolName, string> = {
  chatgpt: "plus",
  claude: "pro",
  copilot: "pro",
  cursor: "pro",
  gemini: "pro",
  geminiApi: "",
  windsurf: "pro",
};

const TEAM_PLAN: Record<ToolName, string> = {
  chatgpt: "team",
  claude: "teamStandard",
  copilot: "business",
  cursor: "teams",
  gemini: "enterprise",
  geminiApi: "none",
  windsurf: "teams",
};

const TEAM_PLAN_PRICE: Record<ToolName, number> = {
  chatgpt: PRICING.chatgpt.team.monthly,
  claude: PRICING.claude.teamStandard.monthly,
  copilot: PRICING.copilot.business.monthly,
  cursor: PRICING.cursor.teams.monthly,
  gemini: 0,
  geminiApi: 0,
  windsurf: PRICING.windsurf.teams.monthly,
};

export function runAudit(inputs: ToolInput[], useCase: useCase): AuditResult {
  const recommendation = inputs.map((input) => auditSingleTool(input, useCase));

  const toolNames = inputs.map((t) => t.tool);
  const hasCursor = toolNames.includes("cursor");
  const hasCopilot = toolNames.includes("copilot");
  const hasWindsurf = toolNames.includes("windsurf");
  const hasChatGpt = toolNames.includes("chatgpt");
  const hasClaude = toolNames.includes("claude");

  const warnings: string[] = [];

  if (hasCursor && hasCopilot) {
    warnings.push(
      "Cursor and Copilot overlap heavily for coding. Consider dropping the cheaper one.",
    );
  }

  if (hasCursor && hasWindsurf) {
    warnings.push(
      "Cursor and Windsurf are redundant. Pick one based on your workflow.",
    );
  }

  if (hasChatGpt && hasClaude) {
    warnings.push(
      "ChatGPT and Claude overlap for most use cases. Consider switching to one.",
    );
  }

  const totalMonthlySavings = recommendation.reduce(
    (sum, r) => sum + r.monthlySavings,
    0,
  );

  return {
    recommendation,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    warnings,
  };
}

function auditSingleTool(input: ToolInput, useCase: useCase): Recommendation {
  //! 1) plan is team and user is less than 1
  if (input.plan === TEAM_PLAN[input.tool] && (input.seats ?? 1) <= 1) {
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: soloAlterNative[input.tool],
      monthlySavings: input.monthlySpend - SOLO_PLAN_PRICE[input.tool],
      reason:
        "Team plan for a single user is wasteful. A solo plan covers your needs.",
    };
  }

  //! 2) seat is more than 3 and the plan is not team then convert it to team

  if ((input.seats ?? 1) >= 3 && input.plan !== TEAM_PLAN[input.tool]) {
    const currentCostPerSeat = input.monthlySpend / (input.seats ?? 1);
    const teamCostPerSeat = TEAM_PLAN_PRICE[input.tool];

    if (teamCostPerSeat < currentCostPerSeat) {
      const teamTotalSpend = teamCostPerSeat * (input.seats ?? 1);

      return {
        tool: input.tool,
        currentPlan: input.plan,
        recommendedPlan: TEAM_PLAN[input.tool],
        monthlySavings: input.monthlySpend - teamTotalSpend,
        reason: `At ${input.seats} seats, ${TEAM_PLAN[input.tool]} costs $${teamCostPerSeat}/seat vs your current $${currentCostPerSeat.toFixed(2)}/seat. Saves $${(input.monthlySpend - teamTotalSpend).toFixed(0)}/month.`,
      };
    }
  }

  //! 3) seat is more than 3 and usecase is not coding or reasearch and the plan is team then downgrade it to pro
  if (
    (input.seats ?? 1) >= 3 &&
    useCase !== "coding" &&
    useCase !== "research" &&
    input.plan === TEAM_PLAN[input.tool]
  ) {
    const currentTotalSpend = input.monthlySpend;
    const soloTotalSpend = SOLO_PLAN_PRICE[input.tool] * (input.seats ?? 1);
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: soloAlterNative[input.tool],
      monthlySavings: currentTotalSpend - soloTotalSpend,
      reason: `Team plan controls aren't needed for ${useCase}. ${input.seats} individual plans saves $${currentTotalSpend - soloTotalSpend}/month.`,
    };
  }

  //! 4) if usecase is coding or research and the plan is free then upgrade to pro only if seat is 1 or less than 2 or equal 2 but if more thn 2 well that part is handled already
  if (
    (useCase === "coding" || useCase === "research") &&
    (input.plan === "free" || input.plan === "hobby") &&
    (input.seats ?? 1) <= 2
  ) {
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: soloAlterNative[input.tool],
      monthlySavings: -(SOLO_PLAN_PRICE[input.tool] * (input.seats ?? 1)),
      reason: `For ${useCase} work, upgrade to ${soloAlterNative[input.tool]} to unlock full model access and higher limits.`,
    };
  }

  //! 5) if usecase is for general purpose but using ai which is made for coding only
  if (
    input.tool === "cursor" &&
    useCase !== "coding" &&
    useCase !== "research" &&
    input.plan !== "hobby"
  ) {
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: "free",
      monthlySavings: input.monthlySpend,
      reason: `You don't need cursor for ${useCase} you can use Chatgpt or Claude`,
    };
  }

  //! 6) if usecase is for general purpose but using ai which is made for coding only
  if (
    input.tool === "windsurf" &&
    useCase !== "coding" &&
    useCase !== "research" &&
    input.plan !== "free"
  ) {
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: "free",
      monthlySavings: input.monthlySpend,
      reason: `You don't need windSurf for ${useCase} you can use Chatgpt or Claude instead.`,
    };
  }

  //! 7) if usecase is very general and plan is like plus or team then change it to basic like pro or maybe free
  if (
    (input.seats ?? 1) === 1 &&
    useCase !== "coding" &&
    useCase !== "research" &&
    input.plan !== soloAlterNative[input.tool] &&
    input.plan !== "free" &&
    input.plan !== "hobby" &&
    input.monthlySpend > 0
  ) {
    const currentTotalSpend = input.monthlySpend;
    const recommendedPlanSpend =
      SOLO_PLAN_PRICE[input.tool] * (input.seats ?? 1);
    return {
      tool: input.tool,
      currentPlan: input.plan,
      recommendedPlan: soloAlterNative[input.tool],
      monthlySavings: currentTotalSpend - recommendedPlanSpend,
      reason: `${input.plan} is overkill for ${useCase}. Downgrade to ${soloAlterNative[input.tool]} and save $${currentTotalSpend - recommendedPlanSpend}/month.`,
    };
  }

  return {
    tool: input.tool,
    currentPlan: input.plan,
    recommendedPlan: input.plan,
    monthlySavings: 0,
    reason: "You're on the right plan for your use case.",
  };
}
