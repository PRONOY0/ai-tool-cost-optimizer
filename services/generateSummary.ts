import { AuditResult } from "@/types/audit";

export async function generateSummary(
  auditResult: AuditResult,
  useCase: string,
): Promise<string> {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are an AI spend analyst.

Your job is to summarize audit results accurately.

Rules:
- Only make claims supported by the audit data.
- Do not say spending is excessive, wasteful, inefficient, or overpriced unless explicitly supported by the audit.
- Focus on optimization opportunities, savings, and recommended actions.
- Be concise, professional, and specific.
- Do not invent recommendations.`,
            },
            {
              role: "user",
              content: `Generate a personalized audit summary for a ${useCase} team.

Total monthly savings: $${auditResult.totalMonthlySavings}
Total annual savings: $${auditResult.totalAnnualSavings}

Tools analyzed:
${auditResult.recommendation
  .map((r) => `- ${r.tool}`)
  .join("\n")}

Recommendations:
${auditResult.recommendation
  .map(
    (r) =>
      `- ${r.tool}: ${r.currentPlan} → ${r.recommendedPlan}. Savings: $${r.monthlySavings}/month. Reason: ${r.reason}`,
  )
  .join("\n")}

Warnings:
${
  auditResult.warnings.length > 0
    ? auditResult.warnings.map((w) => `- ${w}`).join("\n")
    : "- None"
}

Write directly to the user.
Keep it between 80 and 120 words.
Mention the potential savings when applicable.
Do not use bullet points.
Do not use marketing language or hype.`,
            },
          ],
          temperature: 0.2,
          max_tokens: 200,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.status}`);
    }

    const data = await response.json();

    return (
      data.choices?.[0]?.message?.content?.trim() ??
      generateFallback(auditResult, useCase)
    );
  } catch (error) {
    console.error("Summary generation failed:", error);
    return generateFallback(auditResult, useCase);
  }
}

function generateFallback(
  auditResult: AuditResult,
  useCase: string,
): string {
  if (auditResult.totalMonthlySavings > 0) {
    return `Based on this audit, your ${useCase} team could save approximately $${auditResult.totalMonthlySavings.toFixed(
      2,
    )} per month ($${auditResult.totalAnnualSavings.toFixed(
      2,
    )} annually) by adjusting plan selections and removing unnecessary costs. Review the recommendations above to identify the highest-impact opportunities and determine which changes best fit your team's workflow.`;
  }

  return `Based on this audit, your ${useCase} team appears to be using AI tools efficiently. No significant savings opportunities were identified, and your current subscriptions generally align with the reported usage and team requirements.`;
}