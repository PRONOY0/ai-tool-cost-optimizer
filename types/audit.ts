export type ToolName =
  | "chatgpt"
  | "claude"
  | "cursor"
  | "copilot"
  | "gemini"
  | "geminiApi"
  | "windsurf";

export interface ToolInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats?: number;
}

export interface Recommendation {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  recommendation: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  warnings: string[];
}

export type useCase =
  | "coding"
  | "school"
  | "content"
  | "research"
  | "customer_support"
  | "general_chat"
  | "image_generation";

export interface Audit {
  id: string;
  shareId: string;
  tools: ToolInput[];
  teamSize: number;
  useCase: useCase;
  results: {
    auditResult: AuditResult;
    summary: string;
  };
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuditResponse {
  audit: Audit;
}
