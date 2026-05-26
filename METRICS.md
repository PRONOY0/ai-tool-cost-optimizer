# Metrics

## North Star Metric

**Qualified leads captured per week**

StackAudit's whole job is to generate leads for Credex. So the one number
that actually matters: how many people finished an audit showing >$100/month
in savings *and* left their email. That's it. Everything else is a distraction.

DAU would be the wrong thing to track nobody audits their AI stack every
morning. "Audits completed" is vanity too. Someone who finishes with $0
savings and closes the tab isn't useful to anyone. The qualified lead is the
only event that connects to real Credex revenue. That's what we're watching.

---

## 3 Input Metrics

**1. Audit completion rate**
Of everyone who lands on the page, how many actually finish the form? If
this is low, the form's too long or too confusing. Aiming for >60%.

**2. Email capture rate**
Of everyone who finished an audit, how many left their email? This is the
line between "used the tool" and "became a lead." Targeting >25% for users
who saw real savings, >10% for users who were already running lean.

**3. Share rate**
Of everyone who saw their final report, how many copied the share link?
Shared audits are free distribution someone else's problem, new user for
us. Targeting >15%.

---

## What I'd Instrument First

Five events, in order:

1. Form started vs. completed where are people dropping off?
2. Time to finish over 5 minutes means the form's too heavy
3. Email submitted vs. skipped, cut by savings amount does a bigger number
   make people more likely to convert?
4. Share URL copied vs. not
5. Credex CTA clicked especially for audits over $500 in savings

Posthog or Mixpanel, five custom events. You could set this up in an
afternoon.

---

## Pivot Trigger

After 500 completed audits, three things would worry me:

- Email capture under 10% across the board → the results page isn't landing.
  Fix the copy first, nothing else.
- Average savings under $50/audit → the audit logic is too conservative.
  Go back and challenge the assumptions.
- Zero Credex consultations booked → the handoff from "here's your savings"
  to "talk to us" is broken somewhere.

The hard line: **if 500 audits produce fewer than 20 qualified leads**, the
tool isn't doing its job. That's when you stop tweaking and rethink the whole
approach.