# Cadence — Enterprise Goal-Management System

## Overview
Cadence is an enterprise-grade OKR (Objectives and Key Results) lifecycle
management platform. It helps organizations define, cascade, track, and audit
goals across teams with strict data isolation and real-time analytics.

## Tech Stack
- React 18 with TypeScript for the frontend
- Tailwind CSS for styling
- Supabase as a serverless backend (PostgreSQL plus auth plus storage)
- PostgreSQL with Row-Level Security and custom triggers for business logic
- Resend API for transactional notifications and escalation emails
- Vercel for deployment

## Architecture
Cadence uses a serverless, zero-custom-backend layout. All business logic that
must be trusted lives at the database layer. PostgreSQL Row-Level Security
enforces a zero-trust perimeter so each organization can only ever see its own
rows, even if a client bug or malicious request tries otherwise. Cascading
target weight computations and OKR scoring are implemented as database triggers
and functions, not as application code, so they cannot be bypassed.

## How It Works
1. Users sign in via Supabase auth and are scoped to their organization.
2. Admins define objectives and key results with one of five Units of Measure
   variants. Custom database triggers validate structural weights as parents
   and children are added.
3. Automated scoring algorithms compute progress against each Unit of Measure
   variant correctly (percentage, currency, count, boolean, milestone, etc.).
4. RLS policies guarantee row-level isolation per organization on every table.
5. Configurable escalation rules trigger transactional emails through the
   Resend API when targets fall behind or deadlines approach.
6. Action audit logs record every meaningful change for compliance.
7. Real-time analytics graphs visualize organization-wide progress.

## Challenges and Solutions
- Trustworthy multi-tenant isolation: enforced directly at the database layer
  using PostgreSQL Row-Level Security so the perimeter cannot be bypassed by
  client-side bugs.
- Correct scoring across heterogeneous Units of Measure: encoded the rules in
  database triggers and stored functions so all clients use the same logic.
- Cascading weights: structural weight computations on parent and child OKRs
  are validated and recomputed inside triggers as the tree changes.
- Notification reliability: integrated Resend for transactional delivery with
  configurable escalation rules.

## Outcomes
- Deployed live on Vercel at https://cadence-growth.vercel.app/
- Demonstrates production-grade database design, RLS, triggers, and serverless
  architecture, not just CRUD UI work.

## Links
- Live demo: https://cadence-growth.vercel.app/
