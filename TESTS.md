# Tests

All tests cover the audit engine (`services/audit/runAudit.ts`).

## How to run

```bash
npm test
```

## Test file: `__tests__/runAudit.test.ts`

| # | Test name | Input | Expected output |
|---|-----------|-------|-----------------|
| 1 | team plan for solo user → downgrade to solo | chatgpt, plan: team, seats: 1 | recommendedPlan: "plus", savings > 0 |
| 2 | coding use case, free plan → upgrade to pro | cursor, plan: hobby, seats: 1, useCase: coding | recommendedPlan: "pro", savings < 0 |
| 3 | cursor for school use case → recommend free | cursor, plan: pro, seats: 1, useCase: school | recommendedPlan: "free", totalMonthlySavings: 20 |
| 4 | already optimal plan → 0 savings | chatgpt, plan: plus, seats: 1, useCase: general_chat | monthlySavings: 0 |
| 5 | cross-tool redundancy → warning generated | cursor + copilot both on pro, useCase: coding | warnings.length > 0, warnings[0] contains "Cursor and Copilot" |