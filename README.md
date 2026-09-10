# MergeLens

**RAG-native AI code reviewer that understands your entire codebase, not just the diff.**

MergeLens is a self-hosted pull request review system that embeds your repository into a vector database and uses retrieval-augmented generation to produce architecture-aware code reviews. It installs as a GitHub App, listens for pull request events via webhooks, and posts review comments directly on the PR — fully automated, zero manual intervention.

---

## Why MergeLens

Traditional AI code reviewers analyze diffs in isolation. They see eleven changed lines, not the 400-line module those lines interact with. This leads to surface-level feedback that misses architectural violations, broken invariants, and cross-module regressions.

MergeLens solves this by indexing your codebase into Pinecone and retrieving the exact functions, types, and modules a diff touches before generating a review. The result is feedback that reads like it came from a staff engineer who actually knows your codebase.

---

## How It Works

```
PR Opened / Updated
        │
        ▼
GitHub Webhook ──► Signature Verification ──► Rate Limit Check
                                                     │
                                                     ▼
                                              Inngest Function
                                                     │
                          ┌──────────────────────────┼──────────────────────────┐
                          ▼                          ▼                          ▼
                   Fetch PR Files            Query Repo Vectors          Query Diff Vectors
                   & Chunk Diffs             (codebase context)          (diff context)
                          │                          │                          │
                          └──────────────────────────┼──────────────────────────┘
                                                     ▼
                                              Generate Review
                                              (OpenRouter LLM)
                                                     │
                                                     ▼
                                         Post Comment on GitHub PR
                                         & Update Review Status
```

**Step-by-step:**

1. A developer opens or updates a pull request on a connected repository.
2. GitHub sends a webhook event to MergeLens. The handler verifies the HMAC-SHA256 signature, saves the PR record, and checks the user's review quota.
3. An Inngest background function picks up the event. It fetches the PR's changed files via the GitHub API and splits diffs into reviewable chunks.
4. Diff chunks are embedded into a per-PR Pinecone namespace. If the repository has been synced, the system also queries the repo-wide namespace for architectural context — related functions, types, and modules the changes interact with.
5. Both context sets are passed to an LLM (via OpenRouter) alongside a structured system prompt that enforces severity-classified, actionable review output.
6. The generated review is posted as a comment on the pull request and persisted in the database.

### Codebase Sync

Before MergeLens can provide architecture-aware reviews, a repository's codebase must be synced:

1. The user triggers a sync from the dashboard.
2. An Inngest function fetches the repository tree, filters by supported file extensions, and retrieves file contents via the GitHub blob API.
3. Files are split into fixed-size chunks and upserted into a dedicated Pinecone namespace using integrated inference (server-side embedding).
4. During reviews, this namespace is queried to retrieve the most relevant code surrounding the PR's changes.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 5 (strict) |
| Database | PostgreSQL via Prisma ORM (PrismaPg adapter) |
| Vector DB | Pinecone (integrated inference, server-side embedding) |
| Auth | BetterAuth (GitHub OAuth) |
| AI | OpenRouter (model-agnostic LLM routing) + Vercel AI SDK |
| Background Jobs | Inngest (step functions with automatic retries) |
| Payments | Razorpay (subscription billing, webhook-driven lifecycle) |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Base UI, Hugeicons |

---

## Prerequisites

- **Node.js** 20+
- **PostgreSQL** 15+ (local or hosted)
- **Pinecone** account with an index configured for integrated inference
- **GitHub App** registered with webhook URL pointed to your deployment
- **OpenRouter** API key
- **Razorpay** account (for subscription billing)
- **Inngest** account or local dev server

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/mergelens.git
cd mergelens
npm install
```

### 2. Configure environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mergelens"

# Auth
BETTER_AUTH_SECRET="your-auth-secret"
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"

# GitHub App
GITHUB_APP_ID="your-github-app-id"
GITHUB_APP_PRIVATE_KEY="your-github-app-private-key"
GITHUB_WEBHOOK_SECRET="your-webhook-secret"
NEXT_PUBLIC_GITHUB_APP_NAME="your-github-app-name"

# AI
OPENROUTER_API_KEY="your-openrouter-api-key"
REVIEW_MODEL="google/gemini-2.0-flash-001"

# Vector DB
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_INDEX="your-pinecone-index-name"

# Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-razorpay-webhook-secret"
RAZORPAY_PLAN_ID="your-razorpay-plan-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Run the development server

```bash
npm run dev
```

In a separate terminal, start the Inngest dev server:

```bash
npx inngest-cli@latest dev
```

The app will be available at `http://localhost:3000`.

---

## Architecture

MergeLens follows a **feature-based modular architecture**. Each domain (auth, billing, reviews, repo-sync, GitHub integration) is fully encapsulated under `features/` with its own server logic, actions, components, types, and utilities.

**Key design decisions:**

- **Server Components by default.** All dashboard pages are async Server Components that fetch data directly. Client Components are used only where interactivity is required (forms, mutations, real-time state).
- **Server Actions for mutations.** All user-initiated writes (sign in, sync repo, cancel subscription) go through Next.js Server Actions with session validation.
- **Inngest for async workflows.** Long-running operations (PR review generation, codebase sync) are executed as durable step functions with built-in retries and failure handlers — never in the request/response cycle.
- **Webhook-driven payment lifecycle.** Subscription state is managed entirely through Razorpay webhook events (activated, charged, cancelled, halted, completed), ensuring the database always reflects the payment provider's source of truth.
- **Dual-namespace vector search.** PR diffs and repo codebases are stored in separate Pinecone namespaces. During review, both are queried to provide localized diff context and broader architectural context.

---

## Billing

| Plan | Limit | Price |
|------|-------|-------|
| Free | 5 AI reviews per month | ₹0 |
| Pro | Unlimited reviews | ₹299/month |

Subscription lifecycle is managed via Razorpay webhooks. Canceled subscriptions retain Pro access until the end of the billing period.

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Generate Prisma client + production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## License

This project is licensed under the [MIT License](LICENSE).
