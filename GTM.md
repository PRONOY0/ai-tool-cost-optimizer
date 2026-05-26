# Go-To-Market
 
## Who exactly
 
Not "startups." The specific person is an engineering manager at a company with 20–50 people probably Series A, maybe late seed. They joined when the team was 8 people and now they're the one who gets CC'd on the AWS bill, the GitHub invoice, the Cursor renewal, and six other things they didn't sign up for. They're not the CFO. They're the person the CFO pings saying "can you look at this line item?"
 
They use at least 3–4 AI tools across the team. Some were picked by individual engineers, some by the EM themselves, one was a founder decision from 2022 that nobody's revisited. They have a rough sense of the total but no breakdown of what's actually being used vs. what's just auto-renewing.
 
They're not going to build a spreadsheet to figure this out. They will use a tool that takes 5 minutes and hands them something they can paste into Slack or attach to an email.
 
**The trigger moment:** their CFO just asked about AI spend, or they just got the renewal email for a tool three people on the team stopped using two months ago. That's when they'd Google something like "are we overspending on AI tools" or "github copilot vs cursor cost comparison team."
 
**Where they actually hang out:**
- r/ExperiencedDevs, r/cscareerquestions (lurking, not posting)
- Their company's eng Slack (obviously)
- Twitter/X — they follow a handful of indie builders and eng leaders, don't post much
- Their college batch WhatsApp group where someone will occasionally share a useful tool
---
 
## First 100 users in 30 days, $0 budget
 
### Week 1 — 0 to 25 users
 
**The move:** Post a build thread on Twitter/X. Not "I built a thing, check it out." A thread that leads with the finding.
 
Something like: *"I audited a typical 15-person eng team's AI stack. Found $340/month in waste in about 4 minutes. Here's where it came from — [thread]"*
 
Walk through 3–4 real examples from the audit engine: the team paying for Copilot Business when half the seats haven't opened it in 6 weeks, the startup paying for Claude Team when 2 people use it, the overlap between Cursor and Copilot. Real numbers, real logic. Link to the tool at the end as "I built this to automate the audit."
 
The thread is the content. The tool is the CTA. Don't lead with the product.
 
**Also this week:** Go through my college network and personally message 10–15 people who are at startups or know someone at one. Not a mass message. Individual DMs: *"Hey, I built this AI spend audit tool for my internship — would you run it on your stack and tell me if the numbers look right to you?"* Frame it as asking for feedback, not asking them to use a product. Both things are true.
 
Expected from week 1: 20–30 people, mostly from the Twitter thread and direct messages.
 
---
 
### Week 2 — 25 to 55 users
 
**Hacker News Show HN.** This is a lottery but the expected value is high for exactly this kind of tool. The HN audience skews toward the EM/CTO persona who reads it on Tuesday morning. Title would be something like: *"Show HN: StackAudit – paste your AI tool stack, get a savings estimate and PDF"*
 
The key is being ready: respond to every comment within an hour, have the tool actually working cleanly, and have a shareable result URL that demonstrates the output without someone needing to fill out the form. A pre-run example audit as a demo link.
 
**Also:** ask the 10–15 people from Week 1 who actually used it to share the link if they found it useful. Not a broadcast, a personal ask. "Hey did this seem useful? Would you mind sending it to one other person who might care?"
 
Expected: 30 more users. HN is spikey — could be 5, could be 150.
 
---
 
### Week 3–4 — 55 to 100 users
 
**The shareable URL does the work here if the product is good.** Every audit result has a public link. The results page has a share button with pre-filled text: *"Just ran an AI spend audit on our stack — found $X/month in waste. Takes 5 minutes: [link]"*
 
The organic loop only fires if the savings number is real and surprising. That's the product's job.
 
**One more channel:** find 2–3 newsletters that reach the indie founder / early-stage eng audience (TLDR, Bytes, any India-focused startup newsletter) and send a short pitch. Not asking to be featured asking if they want to give their readers a free tool. This costs nothing and has a long tail.
 
---
 
## The unfair distribution channel
 
Credex already has relationships with companies that are buying or have bought AI credits. Those customers have already demonstrated they care about AI tool costs. A short email from Credex to existing customers — *"we built a free audit tool, takes 5 minutes, here's your link"* — converts at a completely different rate than cold traffic. That's the channel no one else has.
 
---
 
## What week-1 traction looks like if this works
 
- 40–60 audits completed (not visits — completions)
- Average savings identified: $150–350/audit
- 15–20 email captures
- At least 3–4 people who share the link unprompted
- One HN comment or reply that says something like "this is actually useful"
If the Twitter thread gets zero engagement and direct messages get zero responses after a week, the problem isn't distribution it's that the savings numbers aren't surprising enough to share. That's the product question to investigate first.