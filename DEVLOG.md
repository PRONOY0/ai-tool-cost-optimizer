## Day 2 — 2026-05-21

**Hours worked:** 6

**What I did:** Set up pricing constants, defined TypeScript types, designed audit and lead schema in Prisma, researched plan logic for each tool.

**What I learned:** Team plans only make economic sense at 3+ seats for most tools. Cursor Teams at $40/seat breaks even vs Pro at 3 seats.Today I learnt perfect git commits.

**Blockers / what I'm stuck on:** Generalizing the audit logic into one clean function without massive if/else chains.

**Plan for tomorrow:** Write audit rules on paper first, then I'll implement the logic in runAudit.ts. Get the engine returning real Recommendation objects. Will create the prompt tomorrow and then post route for ai analyze.

## Day 3 — 2026-05-22

**Hours worked:** 3

**What I did:** Finished the audit logic with 7 rules. Covered all scenarios like team vs solo plans etc. Moved all pricing data into one object so no need to export different price for different tools. Added warning list to track redundant tools.

**What I learned:** Writing explicit if/else logic over generalized abstractions for shipping speed is the right trade-off. Each rule is independently defensible with concrete numbers. Pricing consolidation made constants reusable across the audit function.

**Blockers / what I'm stuck on:** None currently.

**Plan for tomorrow:** Build API route to handle form submission. It will run the audit logic and save results to database. Then start the frontend input form and results page.

## Day 4 — 2026-05-23

**Hours worked:** 7

**What I did:** Finished all routes. Tried to integrate anthropic api but it was not free no free plan nor even any trial so I had to opt out and choose groq for this task and choosing groq was a personal choice because I've worked with groq more than once and integrated within the project it's faster,free and lot more easier to implement. And the prompt was not upto the point like it had some issues for example it's criticizing on it's own like "Your current spend is excessive." so I had to make some changes. Then after finishing prompt, routes. I had to remove isPublic because if user marks the view as private and turn isPublic to true then later when he try to see it he won't be able to see it. So this feature is impossible to add unless the user is authenticated so I had to remove this field it was redundant. Then I added rate limiting usually I use userId to add rate limiting but since this time user is not authenticated what else i have other than ip address so I added rate limiting based on that. Funny thing happend is I totally forgot to commit I was like I'll add it later then I clutched at last moment lol.

**What I learned:** Today I learnt how to implement rate limiting based on ip address, then I learnt prompt optimizing based on result and tinkered with temperature understood it properly. Also understood that not every field is utilized some fields has to be removed.

**Blockers / what I'm stuck on:** Unsure about UI approach deciding between building from scratch vs scaffolding with v0/google-studio-ai and customizing. Need to balance polish with shipping speed.

**Plan for tomorrow:** Design Frontend Design Ideas Inspiration based on that I'll build homepage and results page too and fix the resend problem. After finishing the frontend probably will interview 3 users.
