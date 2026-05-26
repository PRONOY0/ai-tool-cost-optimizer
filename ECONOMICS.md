# ECONOMICS.md

I'll be upfront: some of these numbers are estimates. But I've tried to make them _reasoned_ estimates the kind where if you poke at an assumption, I can tell you why I picked it and what changes if it's wrong.

---

## What's a converted lead worth to Credex?

Credex's business is selling discounted AI credits things like Cursor Business, Claude Team, or ChatGPT Enterprise sourced from companies that over-bought or pivoted. The discount to the end customer is real (the assignment says so), which means Credex is buying low and selling at a margin somewhere in the middle.

My target user for StackAudit is a 15–50 person startup spending somewhere between $2,000–$10,000/month on AI tools. Let's anchor on $4,000/month that's a 20-person team with a mix of Cursor Pro, Claude Team, and maybe some direct API spend. That's $48,000/year in AI infrastructure.

Credex likely sources credits at 30–40% below retail (that's the "overforecast" discount) and passes maybe 15–20% of that on to the customer to make the switch worthwhile, keeping the rest as margin. So on a customer spending $48k/year through Credex, a conservative 15% margin = **~$7,200/year per customer**.

Not all of that customer's spend will flow through Credex immediately they probably migrate gradually, and they might not use Credex for every tool. Cut it in half to be realistic: **~$3,600/year, or $300/month per converted customer.**

If a customer stays 18 months (reasonable for a startup that just optimized their stack and is happy), lifetime value is roughly **$5,400**.

I think $3,000–$5,000 LTV is a defensible range. I'm using $4,000 as my working number.

---

## CAC at each channel

The GTM plan leans on zero-budget organic distribution, so CAC is low the cost is time, not money.

| Channel                                           | Estimated CAC                                  |
| ------------------------------------------------- | ---------------------------------------------- |
| Hacker News / Product Hunt launch                 | ~$0 cash, ~2 days of founder time              |
| Twitter/X organic (sharing audit results)         | ~$0, built into the viral loop                 |
| Indie Hackers / relevant Slack communities        | ~$0–$20 (coffee chats, maybe a sponsored post) |
| Referral program (if bonus feature ships)         | ~$30–$60 per referred user (cost of the perk)  |
| Paid ads (not in initial plan, but for reference) | ~$200–$500 per qualified lead                  |

The viral sharing mechanic every audit result has a unique public URL designed to be screenshot-worthy is the real CAC suppressor. Someone shares "we were spending $6,400/month and StackAudit found $1,800 in savings" and that tweet does distribution work for free.

Blended CAC across all organic channels: I'd estimate **$15–$40 per audit completed** (accounting for the time cost of community seeding spread across total audits). At $4,000 LTV, that's a payback period measured in weeks, not months.

---

## What conversion rate makes this profitable?

The funnel has three steps:

1. **Audit completed** someone uses the tool and gets a result
2. **Consultation booked** they click through to talk to Credex (only surfaced for >$500/mo savings cases)
3. **Credit purchase** they actually buy

I'm assuming:

- Audit → consultation: **~2–3%** (most people are curious, not buyers; but the ones who see $800/mo in savings are motivated)
- Consultation → purchase: **~15–20%** (sales calls convert at this rate for a motivated inbound lead with a clear problem)

So end-to-end: roughly **0.3–0.6% of completed audits become paying Credex customers**.

At $4,000 LTV and $25 blended CAC: you need the audit→customer rate to stay above roughly 0.6% to be comfortably profitable. Even at 0.3%, revenue per audit ($12) still exceeds cost per audit ($25 at scale drops to maybe $5–$10 once the flywheel is spinning). The economics get better the more audits you do.

---

## What would have to be true for this to drive $1M ARR in 18 months?

$1M ARR at $3,600/customer/year = **~278 paying customers**.

Getting 278 customers in 18 months means closing roughly **15–17 new customers per month** by month 12 (ramping slowly at first).

At 0.4% overall conversion, you need **~4,200 completed audits per month** at steady state. That sounds like a lot, but:

- A single HN "Show HN" post for a useful free tool routinely drives 3,000–8,000 visitors in 48 hours
- If 25% of visitors complete an audit, one good HN launch = 750–2,000 audits in a weekend
- The viral URL sharing compounds this over time

So the model requires: **2–3 meaningful distribution events in the first 3 months**, then the viral loop sustaining 1,000–2,000 audits/month organically, growing to 4,000+ by month 12.

That's not guaranteed, but it's not fantasy either. Free tools with a clear "wow, I didn't know that" moment spread. The risk is that audits complete but consultations don't convert which would mean the audit results aren't surfacing Credex compellingly enough, or the savings estimates aren't trusted. Both are fixable product problems.

---

## The honest version of all this

These numbers have real uncertainty baked in. I don't know Credex's actual margin structure, I don't know their current close rate on inbound leads, and I've never run a B2B SaaS funnel myself. What I'm confident in:

- The LTV is large relative to acquisition cost, so this can work even at low conversion rates
- The viral loop is the most important variable if the shareable URL mechanic doesn't work, the whole model gets expensive fast
- The $1M ARR target in 18 months is achievable but requires things to go reasonably right on distribution, not just on product

If I had to bet on one number being wrong, it's the consultation → purchase rate. 15–20% assumes a warm inbound lead with a real problem. If the people booking consultations are mostly curious rather than ready to buy, that rate drops to 5–8%, and the whole funnel needs 3x more volume to hit the same revenue. Worth monitoring early.
