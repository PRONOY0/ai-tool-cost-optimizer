export type ToolName =
  | "chatgpt"
  | "claude"
  | "cursor"
  | "copilot"
  | "gemini"
  | "windsurf";

export interface ToolInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats?: number;
}

export interface Recommendation {
  tool: string;
  currentPLan: string;
  recommendedPlan: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  recommendation: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}