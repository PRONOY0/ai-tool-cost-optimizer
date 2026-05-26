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

## Day 5 — 2026-05-24

**Hours worked:** 4

**What I did:** Today I was confused on what design to select and what do I do should I just copy paste copy paste ai generated code from google studio ai or should I use v0 dev for this purpose I spent around 1hr on deciding what design scheme should I choose or should I just make my own then I finally came up with an idea where I just copied credex website hero section it was straight to point what to make and what not so it was more easier than deciding an ui. So I made navbar then designed the hero section used ai to generate that beautiful grid and used magic UI for use components like shinyButton then Made the floating icons of tools. After completing hero section then I built the popup dialog box for the audit form used shadcn for that easy no need to think too much simple and clean. Checked the post route too from shadcn form it worked.

**What I learned:** Copying a design you admire is faster than deciding from scratch stopped wasting time on design decisions and just shipped. Also learned that CSS mask-image clips and moving the overlay outside the masked div fixed it.

**Blockers / what I'm stuck on:** Was stuck at part where my popup dialog box is being covered by the mask I was pretty confused what to do and what not then I thought maybe it's because of that class which I've added on top of the homepage parent div so I moved the audit form dialog box at top and moved the classname for grid and mask into it's children div. Today I was stuck on this part.

**Plan for tomorrow:** Will make the audit/[id] page tomorrow and I'll modify the popup dialog box a bit will try to match the color schema if it looks good then I'll keep that if not then back to basics black & white from shadcn. Will finish results page, wire up email capture modal, and deploy to Vercel. WIll also reach out to 2-3 people for user interviews - cannot leave this day to 6.

## Day 6 — 2026-05-25

**Hours worked:** 6

**What I did:** Today I was pretty confused on the ui design for the result page first I was searching on dribble and behance but later I got this idea of showing the result one by one animated form it enhances the User experience and better than any simple plain page. Made this result page step by step where it shows each page differently and each page has its own info. 

**What I learned:** None currently.

**Blockers / what I'm stuck on:** Was stuck at conditionally rendering the icons for each tools and fixing the animation.

**Plan for tomorrow:** Will fix the summary page UI and probably I'll have the replies by tomorrow. And will add those user interviews.
