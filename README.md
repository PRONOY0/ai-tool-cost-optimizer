# StackAudit

AI-powered audit tool that analyzes your team's AI subscriptions and finds
where you're overpaying.

Built as an internship assignment for [Credex](https://credex.rocks) in 7 days.

**Live:** https://ai-tool-cost-optimizer.vercel.app

## What it does

You fill in your team's AI tools, plans, and seats. StackAudit runs your
stack through 7 audit rules, calculates your actual vs optimal spend, and
generates an AI summary of where the waste is. You get a shareable report URL,
a PDF export, and optionally a Credex consultation if the savings are worth it.

## Tech Stack

- **Next.js 14** - frontend + backend in one repo, no separate server
- **TypeScript** - type safety across the audit engine
- **MongoDB + Prisma 6.19** - document storage for JSON-heavy audit data
- **Groq API** - AI summary generation, fast and free
- **Resend** - transactional email for lead capture
- **ioredis** - rate limiting on the audit endpoint
- **jsPDF** - client-side PDF export

## Quick Start

**1. Clone the repo**

```bash
git clone https://github.com/PRONOYO/ai-tool-cost-optimizer.git
cd ai-tool-cost-optimizer
```

**2. Install dependencies**

```bash
npm install
```

This project requires Prisma 6.19 exactly, don't upgrade it.

**3. Set up environment variables**

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL="your MongoDB connection string"
REDIS_URL="your Redis connection string"
GROQ_API_KEY="your Groq API key"
RESEND_API_KEY="your Resend API key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Don't create a `prisma.config.ts` file. Prisma 6.19 doesn't use it and it'll break things.

**4. Set up the database**

```bash
npx prisma generate
npx prisma db push
```

**5. Run it**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5 Decisions Worth Explaining

**1. Groq over Anthropic or OpenAI**
Groq is free, fast, and I'd already integrated it twice before so I knew
exactly how it behaved. The others would've worked fine but cost money for
no real quality difference on a one-paragraph summary.

**2. MongoDB over Postgres**
Every audit is a nested JSON document - tools, plans, seats, results,
recommendations. Nothing here screams relational data. MongoDB just fits
the shape of what we're storing.

**3. Removed the isPublic toggle**
Early on I had a button to make audits private or public. Pulled it because
there's no auth in this app - if someone marks their audit private and comes
back later, they have no way to find it again. The shareable URL is the only
access mechanism, so a private mode would've just been a way to lose your
own report.

**4. Removed top-level teamSize**
The form originally had a separate teamSize field. Removed it because every
tool already collects seats - the team size is already in the data. Keeping
both just made the form longer for no reason.

**5. Rate limiting by IP instead of user ID**
No login, no signup - StackAudit is frictionless by design. So there's no
user ID to rate limit against. IP-based limiting is the only thing that
makes sense here.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── audit/          # POST audit, GET by shareId
│   │   └── leads/          # POST lead capture
│   ├── audit/[shareId]/    # Results page
│   └── page.tsx            # Landing + audit form
├── services/
│   └── audit/
│       └── runAudit.ts     # 7-rule audit engine
├── prisma/
│   └── schema.prisma
└── __tests__/
    └── runAudit.test.ts
```

## Running Tests

```bash
npm test
```

5 tests covering the core audit logic in `runAudit.ts`.

Built by [Pronoyo](https://github.com/PRONOYO) for Credex - May 2026.