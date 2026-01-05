# RaceFuelPlan

A SaaS web application that generates personalized race-day fueling plans for runners. Built with Next.js 14, TypeScript, Prisma, and Stripe.

## Features

- **Free Calculator**: Generate race fueling plans instantly without signup
- **Personalized Plans**: Customized based on distance, pace, body weight, temperature, and fuel preferences
- **Science-Backed**: Recommendations based on sports nutrition research
- **Printable Race Cards**: Download and print your fueling schedule
- **Save & Manage**: Dashboard to save and manage multiple plans
- **Flexible Pricing**: One-time purchase ($29) or annual subscription ($49/year)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (local) / PostgreSQL (production)
- **Authentication**: NextAuth v5 (Auth.js) with credentials provider
- **Payments**: Stripe (one-time payments + subscriptions)
- **Email**: Resend (transactional emails)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Stripe account (for payments)
- Resend account (optional, for emails)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd RaceFuelPlan
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # From Stripe webhook setup
STRIPE_PRICE_ONE_TIME="price_..."  # Create product in Stripe for $29
STRIPE_PRICE_ANNUAL="price_..."    # Create product in Stripe for $49/year

# Resend (optional, for emails - get from https://resend.com)
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

4. **Set up the database**

```bash
npm run db:generate
npm run db:push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Stripe Setup

1. **Create Products in Stripe Dashboard**

   - Product 1: "Single Plan Download" - One-time payment of $29
   - Product 2: "Unlimited Plans (Annual)" - Recurring subscription of $49/year

2. **Get Price IDs**

   After creating products, copy their `price_xxx` IDs to your `.env` file.

3. **Set up Webhooks**

   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

4. **Test Locally with Stripe CLI**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Project Structure

```
RaceFuelPlan/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Landing page
│   │   ├── calculator/           # Free calculator
│   │   ├── pricing/              # Pricing page
│   │   ├── login/                # Auth page
│   │   ├── terms/                # Terms of service
│   │   └── privacy/              # Privacy policy
│   ├── app/                      # Protected dashboard
│   │   ├── page.tsx              # User dashboard
│   │   ├── plans/[id]/           # View plan
│   │   │   └── print/            # Printable race card
│   │   └── account/              # Account settings
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handlers
│   │   ├── register/             # User registration
│   │   ├── plans/                # Plan CRUD
│   │   └── stripe/               # Stripe checkout & webhooks
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   ├── planGenerator.ts          # Core plan generation logic
│   ├── planGenerator.test.ts     # Unit tests
│   ├── types.ts                  # TypeScript types
│   └── format.ts                 # Formatting utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── components/                   # Reusable components
├── middleware.ts                 # Auth middleware
└── package.json
```

## Database Schema

- **User**: Email/password auth, Stripe customer ID
- **Plan**: User's fueling plans with inputs/outputs JSON
- **Purchase**: One-time purchases and subscription records
- **Subscription**: Active subscription tracking

## Running Tests

```bash
npm test
```

Tests cover the core plan generation logic with various scenarios.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (same as `.env`)

3. **Set up Production Database**

   - Use Neon, Supabase, or any PostgreSQL provider
   - Update `DATABASE_URL` in Vercel environment variables
   - Example: `postgresql://user:password@host:5432/dbname`

4. **Run migrations**

```bash
npx prisma migrate deploy
```

### Stripe Production Setup

- Switch to live mode in Stripe Dashboard
- Update environment variables with live keys (`sk_live_`, `pk_live_`)
- Update webhook endpoint to production URL

## API Routes

### Public Routes

- `GET /` - Landing page
- `GET /calculator` - Free calculator
- `GET /pricing` - Pricing page
- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Protected Routes (Require Auth)

- `GET /app` - Dashboard
- `GET /app/plans/[id]` - View plan
- `GET /app/plans/[id]/print` - Print race card (requires unlock)
- `POST /api/plans` - Save plan
- `GET /api/plans/[id]` - Get plan details
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler

## Environment Variables Reference

| Variable                   | Description                           | Required |
| -------------------------- | ------------------------------------- | -------- |
| `DATABASE_URL`             | Database connection string            | Yes      |
| `NEXTAUTH_URL`             | App URL (e.g., http://localhost:3000) | Yes      |
| `NEXTAUTH_SECRET`          | Secret for JWT signing                | Yes      |
| `STRIPE_SECRET_KEY`        | Stripe secret key                     | Yes      |
| `STRIPE_PUBLISHABLE_KEY`   | Stripe publishable key                | Yes      |
| `STRIPE_WEBHOOK_SECRET`    | Stripe webhook signing secret         | Yes      |
| `STRIPE_PRICE_ONE_TIME`    | Price ID for one-time purchase        | Yes      |
| `STRIPE_PRICE_ANNUAL`      | Price ID for annual subscription      | Yes      |
| `RESEND_API_KEY`           | Resend API key (for emails)           | No       |
| `RESEND_FROM_EMAIL`        | From email address                    | No       |

## Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio

# Testing
npm test                 # Run unit tests
```

## Algorithm Details

The plan generator uses evidence-based guidelines:

### Carbohydrate Recommendations

- **<1.5 hours**: 30-60g/hr (target: 45g)
- **1.5-3 hours**: 45-75g/hr (target: 60g)
- **3-5 hours**: 60-90g/hr (target: 75g)
- **>5 hours**: 70-100g/hr (target: 85g)

Adjustments:

- +5g/hr if body weight > 82kg
- -5g/hr if body weight < 60kg
- -5g/hr if low stomach tolerance
- Capped at 100g/hr

### Sodium Recommendations

- **Base**: 300-600 mg/hr
- **Temp ≥70°F**: +200 mg/hr
- **Temp ≥85°F**: +400 mg/hr
- **High preference**: +200 mg/hr
- **Low preference**: -100 mg/hr
- Capped at 1200 mg/hr

### Fueling Schedule

- First fuel at 20 minutes
- Then every 25 minutes
- Actions based on fuel type preference

## License

MIT

## Support

For questions or issues, please open a GitHub issue or contact support@racefuelplan.com

## Disclaimer

This tool provides general nutrition guidance based on sports science research. It is not medical advice. Always consult your healthcare provider before making changes to your nutrition strategy.
