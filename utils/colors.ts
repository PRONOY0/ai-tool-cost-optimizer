export const TOOL_COLORS: Record<string, string> = {
  claude: "#D97706",
  chatgpt: "#171717",
  cursor: "#6B7280",
  copilot: "#7C3AED",
  windsurf: "#0EA5E9",
  gemini: "#2563EB",
};

export function getToolColor(tool: string): string {
  return TOOL_COLORS[tool.toLowerCase()] || "#10B981";
}
