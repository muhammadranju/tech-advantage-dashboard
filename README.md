# TechAdvantage — Dashboard (Next.js + Tailwind + TypeScript)

A starter dashboard application built with Next.js 15 page router, TypeScript, Tailwind CSS and a small Redux store. The project contains authentication pages, a multi-section dashboard (bootcamps, coaching, mock interviews, users, notifications, etc.), shared UI components and lightweight local data fixtures for development. This project is a good starting point for your own dashboard application. It's also a great way to learn Next.js and TypeScript. 🚀

This README explains how to run the project locally, build for production, the repository layout, environment variables you may need, and a short contribution guide.

## Key features

- Next.js (page router) + TypeScript
- Tailwind CSS utility-first styling
- Small Redux toolkit store with typed hooks
- Reusable component library (ui/, sidebar/, dashboard/ components)
- Auth flows (login, forgot/reset password, OTP verify)
- Pages for dashboard sections: users, bootcamp, coaching, courses, mock interviews, notifications, profile
- Local fixtures for faster development (data/\*.json)

## Prerequisites

- Node.js 18+ or Bun (this project was developed with Bun in README but works with Node/npm or pnpm)
- Recommended: Git for cloning the repo

If using Bun, you can run the commands below with the `bun` binary. For npm/pnpm replace commands accordingly (example given below).

## Quick start — development

1. Clone the repository

```bash
git clone https://github.com/muhammadranju/tech-advantage-dashboard.git
cd tech-advantage-dashboard
```

2. Install dependencies

Using Bun (recommended by original project):

```bash
bun install
```

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

3. Run the development server

```bash
bun run dev
# or
npm run dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser. The app uses the Next.js app router, so server and client components are mixed across `app/`.

## Available scripts

Look at `package.json` for the canonical list. Common scripts you should expect:

- dev: Start the app in development mode
- build: Build the app for production
- start: Run the production build locally
- lint: Run linting

Example (npm):

```bash
npm run build
npm start
```

## Environment variables

The repo may expect environment variables for real API integration. For local development the app includes fixtures under `data/` and often works without additional env values. If you wire a backend/API, add a `.env.local` file at the project root and include variables like:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXTAUTH_URL=http://localhost:3000
# Add any other API keys or secrets your backend needs
```

Never commit secrets to Git. Use `.env.local` which is ignored by git by default.

## Project structure (top-level)

- `app/` — Next.js App Router routes and layouts
- `components/` — Reusable UI and feature components
- `data/` — Local JSON fixtures used for development
- `hooks/` — Custom React hooks (e.g., auth checks)
- `lib/` — Utility helpers
- `types/` and `interface/` — TypeScript type definitions
- `public/` — Static assets
- `components/ui` — Primitive UI building blocks (input, button, dialog, etc.)
- `components/sidebar` — Application sidebar and navigation

This project organizes pages (routes) and layouts inside `app/`. Look for `app/layout.tsx` and nested layout files that scope UI to specific route sections (for example `app/dashboard/layout.tsx`).

## Authentication & Data

- The repo contains an `auth` flow under `app/(auth)` and `components/auth` including `LoginForm.tsx`, protected route wrappers and redirect helpers.
- For development, `data/users.json` and `data/success-assessment.json` provide sample datasets used across the dashboard.

## Tests

This repository does not include a test runner out of the box. If you want to add tests, consider adding Jest or Vitest with React Testing Library. A minimal suggestion:

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom
```

Then add a `test` script to `package.json` and place tests under `__tests__` or `tests/`.

## Linting & Formatting

- ESLint configuration is present in `eslint.config.mjs`.
- Tailwind configuration is present in `postcss.config.mjs` and the Tailwind directives are used in `app/globals.css`.

Run the project's lint script (if present) or install and run ESLint locally:

```bash
npm run lint
```

## Contributing

If you'd like to contribute:

1. Fork the project and create a feature branch.
2. Follow the existing TypeScript and Tailwind patterns.
3. Add tests for new features where applicable.
4. Open a PR describing the feature, changes and any migration steps.

Maintain code style consistent with existing files. Small, focused PRs are easiest to review.

## Troubleshooting

- If the app fails to start, check that your Node/Bun version matches the expected engine. If using Node, delete `node_modules` and run `npm install` again.
- If the UI shows no data, the app may be configured to call a remote API — verify `NEXT_PUBLIC_API_BASE_URL` or switch to local fixtures in `data/`.

## Helpful commands recap

```bash
# install deps (bun)
bun install

# dev server
bun run dev

# build + start
bun run build
bun run start

# lint (if available)

```

Replace `bun` with `npm` or `pnpm` where appropriate.

## License

This repository does not include an explicit license file. Add a `LICENSE` file (MIT, Apache-2.0, etc.) if you plan to publish or share the project.

## Acknowledgements

This project was created by the original repository author and follows common Next.js + Tailwind patterns. If you use or extend it, please credit the original author.

---

If you'd like, I can also:

- Add a short CONTRIBUTING.md
- Add a minimal test setup (Vitest + RTL)
- Add a Dockerfile for local development

Tell me which of these you'd like next and I'll implement it.
