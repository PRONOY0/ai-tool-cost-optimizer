# USER_INTERVIEWS.md

Three conversations I had during the week while building StackAudit. All were informal  WhatsApp or in-person, roughly 10–15 minutes each. I took notes right after.

---

## Interview 1  Ayush, CS student (same batch), building side projects with AI APIs

**Background:** Ayush is in my college batch and actively uses AI APIs for personal projects. Not a startup founder yet, but exactly the kind of person who will be  he's already thinking about multi-agent architectures and token costs.

**What he pays for:** He doesn't pay for subscriptions if he can avoid it. His exact words: *"If you don't want to pay then prefer bring your own key function."* He routes through Gemini, Grok, and ChatGPT depending on the task, and also uses open-source models. His actual paid spend goes through Google Cloud  he showed me his GCP billing dashboard on the spot.

**The number he didn't know:** When I asked if he knew his monthly spend off the top of his head, he said not really  and then pulled out his phone and showed me. His Gemini API spend was ₹765 over a longer period, with Compute Engine and Artifact Registry adding another ₹130+. The interesting thing was he hadn't looked at it broken down like that before. He knew roughly what he was spending but not which service was eating most of it.

**What surprised me:** He said he tracks all his personal finances manually  writes down every transaction by hand  and showed me a screenshot of a finance app with category breakdowns (BITS Pilani CS courses at 54% of outgoing, tech hardware at 14%, etc.). He said: *"I don't put that much AI in personal finance."* I'd assumed someone building multi-agent systems would be obsessive about API costs. He was the opposite  careful with rupees in a spreadsheet, but the API spend was just... somewhere in the cloud, not really accounted for.

**The most useful feedback:** When I showed him the audit summary page, he said the tool would be more useful if it showed category-wise breakdowns  not just "you spent X on AI" but "you spent X on image generation, Y on code completion, Z on writing." He specifically said *"AI can do this best"* for categorization, and that the interface needed work on that summary view.

**What it changed:** I hadn't thought hard enough about the summary page being the shareable moment. Ayush instinctively wanted to screenshot his breakdown by category  that's the viral unit, not the total savings number.

---

## Interview 2  [Name withheld], Freelancer, sells custom software to clients

**Background:** A friend who freelances  builds and sells software products to small businesses. He pays for AI tools out of pocket and bills some of it back to clients, which means he thinks about cost more carefully than most.

**What he pays for:** Multiple tools, used differently per project. He thinks about his AI spend not as one number but as several separate use cases  image generation for one client, code completion for another, writing/copy for a third.

**What he said about the tool:** His feedback was sharp. He said the spend input form was missing something important: *"It would be much better if you added a feature like  how much I use it for this, like I rate from 1 to 5 how much I use it for image generation, and how much for every different task."*

His point was that two people can be on the same Claude Pro plan and have completely different value from it. Someone using it 80% for image generation is in the wrong place entirely. Someone using it 80% for long-form writing is probably fine. The plan alone doesn't tell you if you're overspending  the usage pattern does.

**What surprised me:** He brought this up without me prompting it. I'd been thinking about the audit engine in terms of plan vs. team size vs. price. He immediately reframed it as: the mismatch between *what you use a tool for* and *what that tool is actually optimized for* is the real waste. That's a more sophisticated take than I expected.

**The most surprising thing:** He mentioned he sometimes pays for tools on a client's behalf, bills it through, and then forgets to cancel after the project ends. That's a whole category of waste I hadn't built any logic for  "zombie subscriptions" that survive past the project that justified them.

**What it changed:** I added a use-case weighting field to the input form after this conversation. The 1–5 intensity slider per use case didn't make it into the MVP (scope), but the primary use case selector got more weight in the audit logic as a direct result of this conversation.

---

## Interview 3  Hirakh Das, Motion Designer, Freelance

**Background:** Hirakh is a motion designer  primarily works in Adobe After Effects. Not a developer, not a startup founder. I reached out because I wanted at least one person outside the engineering bubble, and motion designers are increasingly heavy AI users in ways that aren't obvious from the outside.

**What he pays for:** His core tool is Adobe After Effects, which comes bundled with Creative Cloud  and Creative Cloud already includes Adobe Firefly. But on top of that he has a handful of other AI subscriptions he's accumulated over time for different parts of his workflow. He couldn't list them all immediately, which was itself the point.

**His words:** He said StackAudit seemed *"genuinely useful for me as a motion designer juggling way too many AI subscriptions and constantly losing track of what I'm actually using."* He followed that with something that stuck with me: *"I end up wasting a lot of money on tools I forgot I even subscribed to."*

**What surprised me:** I'd been building this tool with developers and startup teams in mind  people who are at least somewhat deliberate about their AI stack. Hirakh's situation is the opposite. He subscribes to things when he needs them for a project, and then they just... keep billing. He's not making a cost decision every month, he's making no decision, which is its own kind of decision. The waste isn't from choosing the wrong plan  it's from not knowing what's still running.

**The most surprising thing:** He already has AI image generation through Adobe Firefly via his Creative Cloud subscription. There's a real chance he's also paying separately for Midjourney or something similar for the same use case, without realizing the overlap. When I mentioned that, he paused and said he'd have to check. That moment  someone realizing they might be double-paying for a capability they already own  is exactly the "aha" the tool should be delivering.

**What it changed:** It pushed me to think harder about the "already paying for this" detection in the audit engine. The Adobe CC case is a good example: if someone lists Firefly or a similar image tool separately but is already on Creative Cloud, the audit should flag that. It also reinforced that the tool needs to work for non-technical users  Hirakh's feedback on the interface was essentially "keep it simple, I don't want to think too hard about this."