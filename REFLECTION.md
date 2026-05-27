# Reflection

## 1. The hardest bug I hit this week

The audit logic has 7 rules and I was testing it with ChatGPT Plus at 30
seats and Claude max20x at 20 users. The result came back with
totalMonthlySavings of -200 and a reason that said "save $-200/month." The
tool was telling the user they'd save negative money by downgrading. That
made no sense.

I dug into the logic and found the issue when calculating savings it was
doing `downgradedPlan * seats - oldPlan` but the old plan price wasn't being
multiplied by seats. So the math was completely off for multi-seat inputs.

Once I fixed that, a new problem showed up. The engine was recommending
Claude Pro for someone on max20x with 20 users. Technically that's a cheaper
plan so the savings math looked right, but max20x is a single-user plan
you can't legally share it across 20 people. So the recommendation was
financially correct but practically wrong.

That made me think about what the audit is actually for. Should it flag
legal issues or focus on money? I decided to focus on money and plan-fit for
now flagging ToS violations is a v2 problem. So I updated the logic to
check seats vs plan capacity first and only recommend a downgrade if the
cheaper plan actually supports the team size. After about 4-5 iterations of
testing different inputs the math started returning sane numbers.

The messy part is that runAudit.ts is still not pretty. It works, but any
developer reading it would need some courage. That's the honest version.

---

## 2. A decision I reversed mid-week

Early on I added an `isPublic` boolean field to the audit model. The idea was
to give users control they could make their report private if they didn't
want it publicly accessible via the share URL.

I built it out and then sat with it for a bit and realised it was completely
broken as a concept. There's no auth in this app. No login, no session,
nothing. So if someone marked their audit private and came back the next day,
there's no way for them to prove it's their audit. They'd just be locked out
of their own report permanently.

The shareable URL is the only access mechanism by design. Private mode would
have just been a way to accidentally lose your own data. Pulled the field,
removed the toggle from the UI, and moved on. Took maybe 20 minutes to
undo. The better decision was not building it in the first place but I didn't
see it until it was already there.

---

## 3. What I'd build in week 2

First thing fix the audit logic. Right now it doesn't catch everything.
The Claude max20x case I mentioned in the bug section still doesn't flag
correctly for school use cases. The logic works for the happy path but edge
cases slip through. I'd go tool by tool, plan by plan, and make the
recommendations actually defensible for every combination.

Beyond that I'd make the audit results feel more personalised. Right now
everyone gets the same structure per-tool breakdown, savings number, AI
summary. But a 2-person startup and a 50-person engineering team have
completely different problems. The recommendations should read differently
for each.

I'd also want to add a benchmark "your AI spend per developer is $X,
companies your size average $Y." That number makes the savings feel real.
Right now the savings figure is abstract. Comparing it to what similar teams
pay makes it land harder and gives the user a reason to share the report.

---

## 4. How I used AI tools

For the multi-step results page I used Google AI Studio. I described the
animation flow I wanted step by step reveal, bar chart, pie chart, savings
number and it gave me a starting point. The first version was off, so I
updated the prompt and kept going. Took about 4-5 iterations before the
structure was close enough to actually modify and use.

For the PDF export I used Claude. I described what data I had and how I
wanted the download to work and it gave me a clean jsPDF implementation. I
tested it and it worked well enough that I barely touched it.

I also tried v0.dev for the homepage. The output was honestly bad generic
layout, nothing that felt like StackAudit. Dropped it and built the homepage
myself.

For the backend I didn't trust AI at all. Defining types and schemas is fine
I'd describe the shape of the data and let it generate the Prisma schema
or TypeScript interfaces. But the actual API logic, the audit engine, the
rate limiting setup I wrote all of that myself. AI is good at boilerplate,
not at decisions.

The clearest moment it was wrong: Google AI Studio's first result page had
the animation steps firing in the wrong order and some state that just didn't
make sense. It wasn't a subtle bug the whole flow was off. I had to
re-prompt it several times with more specific instructions about what each
step should show and when before it got close to what I actually wanted.

---

## 5. Self-rating

**Discipline — 9/10**
Every day for 7 days: woke up, opened VSCode, coded until I ate, coded
after. No days off, no distractions.

**Code quality — 7.5/10**
Most of the codebase is clean and readable. The audit engine is the
exception it works but it's messy and would take another developer a
while to understand it. Code that's hard to read is hard to improve.

**Design sense — 8/10**
The homepage and results page both came out the way I wanted them to. I
have a clear idea of what looks good and I can execute it. Not a designer
but I'm not bad at it either.

**Problem solving — 8/10**
The negative savings bug took real debugging forming hypotheses, checking
the math, figuring out why the logic was wrong. The auditId vs shareId issue
too: instead of passing the auditId all the way to the frontend and storing
it in state, I realised the shareId is unique so I could just fetch the audit
by shareId and pull the auditId from there. That felt like a clean solution.

**Entrepreneurial thinking — 6/10**
I built something that solves a real problem and the lead gen angle makes
sense for Credex. But if I'm honest I couldn't tell you clearly why someone
would choose this over just Googling their tool's pricing page. The UI is
good, the UX is decent, the audit is useful but the thing that makes
someone tell their colleague about it? I don't have a strong answer for that
yet. That's the gap. If I had to guess it's the savings number on the shareable URL. But I haven't proven that yet.
