import { runAudit } from "@/services/audit/runAudit"
import { useCase } from "@prisma/client"

describe("runAudit", () => {
  test("1. team plan for solo user → downgrade to solo", () => {
    const result = runAudit([
      { tool: "chatgpt", plan: "team", seats: 1, monthlySpend: 37.5 }
    ], useCase.coding)
    expect(result.recommendation[0].recommendedPlan).toBe("plus")
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
  })

  test("2. coding use case, free plan → upgrade to pro", () => {
    const result = runAudit([
      { tool: "cursor", plan: "hobby", seats: 1, monthlySpend: 0 }
    ], useCase.coding)
    expect(result.recommendation[0].recommendedPlan).toBe("pro")
    expect(result.recommendation[0].monthlySavings).toBeLessThan(0)
  })

  test("3. cursor for school use case → recommend free", () => {
    const result = runAudit([
      { tool: "cursor", plan: "pro", seats: 1, monthlySpend: 20 }
    ], useCase.school)
    expect(result.recommendation[0].recommendedPlan).toBe("free")
    expect(result.totalMonthlySavings).toBe(20)
  })

  test("4. already optimal plan → 0 savings", () => {
    const result = runAudit([
      { tool: "chatgpt", plan: "plus", seats: 1, monthlySpend: 20 }
    ], useCase.general_chat)
    expect(result.recommendation[0].monthlySavings).toBe(0)
  })

  test("5. cross-tool redundancy → warning generated", () => {
    const result = runAudit([
      { tool: "cursor", plan: "pro", seats: 1, monthlySpend: 20 },
      { tool: "copilot", plan: "pro", seats: 1, monthlySpend: 10 }
    ], useCase.coding)
    expect(result.warnings.length).toBeGreaterThan(0)
    expect(result.warnings[0]).toContain("Cursor and Copilot")
  })
})