# AutoInspect Pro — Production PRD & Technical Specification

## Full-Stack SaaS Vehicle Inspection Platform

**Version:** 3.0 | **Date:** April 2026 | **Status:** Ready for Development  
**Classification:** Technical Specification for Production Build (Updated Stack & Complete Feature Spec)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Scope & Goals](#2-product-scope--goals)
3. [Recommended Tech Stack](#3-recommended-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Project Structure & Monorepo Setup](#5-project-structure--monorepo-setup)
6. [Multi-Tenancy & SaaS Infrastructure](#6-multi-tenancy--saas-infrastructure)
7. [Database Schema & Data Model](#7-database-schema--data-model)
8. [API Specification](#8-api-specification)
9. [Frontend Application (Angular 19)](#9-frontend-application-angular-19)
10. [Authentication & Authorization](#10-authentication--authorization)
11. [Core Feature Modules](#11-core-feature-modules)
12. [Billing & Subscription System](#12-billing--subscription-system)
13. [Media Pipeline](#13-media-pipeline)
14. [Real-Time Features](#14-real-time-features)
15. [Offline & PWA Support](#15-offline--pwa-support)
16. [OBD-II Integration](#16-obd-ii-integration)
17. [PDF Report Generation](#17-pdf-report-generation)
18. [Notification System](#18-notification-system)
19. [Search & Data Export](#19-search--data-export)
20. [Analytics & Business Intelligence](#20-analytics--business-intelligence)
21. [External Integrations](#21-external-integrations)
22. [Security & Compliance](#22-security--compliance)
23. [UI States & Error Handling](#23-ui-states--error-handling)
24. [Testing Strategy](#24-testing-strategy)
25. [DevOps & Infrastructure](#25-devops--infrastructure)
26. [Monitoring & Observability](#26-monitoring--observability)
27. [Go-to-Market Requirements](#27-go-to-market-requirements)
28. [Development Phases & Milestones](#28-development-phases--milestones)
29. [Appendices](#29-appendices)

---

## 1. Executive Summary

AutoInspect Pro is a multi-tenant SaaS vehicle inspection platform for automotive dealerships. This document specifies the complete production system — from database schema to deployment pipeline — covering every feature, integration, and infrastructure requirement needed to launch as a commercially viable SaaS product.

The prototype (static HTML/CSS/JS — 20 pages, ~2000 lines of JS) has been validated and covers the core UX. This PRD translates that prototype into a production-grade, scalable application built with Angular 19 (frontend), NestJS 11 (backend), PostgreSQL 17 (database), and deployed on AWS.

### What this PRD covers:
- Complete billing/subscription system with Stripe
- Self-service signup, onboarding, and tenant provisioning
- Customer-facing public report pages (no-auth)
- Profile, account settings, notification preferences
- Help & support system
- Empty states, error states, loading skeletons, and edge case handling
- Offline/PWA architecture
- Full API design with public API for Enterprise
- Webhook system
- Security, compliance, legal requirements
- Monitoring, observability, incident response
- Go-to-market website and content requirements
- Detailed database schema with RLS policies
- Project scaffolding structure (Nx monorepo)
- Docker & containerization setup
- CI/CD pipeline definitions
- Email verification & password reset flows
- Cookie consent & legal compliance
- Global search results page
- Inspection & vehicle editing flows
- Template builder interface
- Data export UI & backend jobs

---

## 2. Product Scope & Goals

### 2.1 Business Objectives
| Objective | Target | Measurement |
|-----------|--------|-------------|
| Reduce inspection time | < 25 minutes average | In-app timer |
| Inspection consistency | > 90% checklist completion | Backend analytics |
| SaaS revenue | 50 paying dealerships in 12 months | Stripe dashboard |
| Customer retention | < 5% monthly churn | Subscription analytics |
| System uptime | 99.9% (Enterprise), 99.5% (other) | Infrastructure monitoring |

### 2.2 User Roles

| Role | Access Level | Key Actions |
|------|-------------|-------------|
| **Super Admin** (internal) | Platform-wide | Manage all tenants, system config, feature flags |
| **Tenant Admin** | Full tenant access | Users, templates, settings, billing, analytics |
| **Sales Manager** | Review + analytics | Review inspections, generate reports, view analytics |
| **Inspector** | Inspection only | Conduct inspections, view own work |
| **Customer** (no auth) | Public report only | View shared report via link |

### 2.3 Pages (Complete List)

**Public (no auth required):**
- Landing/marketing page
- Pricing page (with annual/monthly toggle)
- Signup (3-step registration)
- Login
- Password reset (request + reset form)
- Email verification (verify link landing page)
- Public report viewer (shareable link, no auth)
- Terms of Service
- Privacy Policy
- Cookie Policy

**Authenticated (app shell with sidebar):**
- Onboarding wizard (first login only, multi-step)
- Dashboard (role-aware: admin/manager vs inspector)
- Inspections list (with filters, search, bulk actions)
- New inspection (multi-step wizard, 10+ steps)
- Edit inspection (resume draft or edit submitted)
- Inspection report viewer (internal, with approval actions)
- Vehicles list (table + grid views, search, filter)
- Vehicle detail/edit (edit vehicle info, view linked inspections)
- Vehicle history timeline
- Global search results page (cross-entity: vehicles, inspections, users)
- Analytics dashboard (admin/manager only)
- Admin: User management (invite, edit roles, deactivate)
- Admin: Checklist template builder (create/edit sections & items, drag-and-drop reorder)
- Admin: Settings (General, Branding, Reports, Notifications, Integrations, Security)
- Admin: Audit log (filterable, searchable)
- Admin: Webhook management (Enterprise — create, test, view delivery log)
- Admin: Data export (select entity, date range, format → async download)
- Profile & Account (Personal info, Security/2FA, Notification prefs)
- Billing & Subscription (current plan, usage meters, upgrade/downgrade, invoices via Stripe portal)
- Help & Support (KB articles, contact form, live chat widget)
- Offline fallback page (with sync status and pending queue count)

**Shared UI States (applicable across all pages):**
- Empty states (per entity: no inspections yet, no vehicles, etc.)
- Error states (API failure, 404, 403 forbidden)
- Loading skeletons (per page/component)
- Cookie consent banner (dismissable, persisted)
- Session expiry warning modal

---

## 3. Recommended Tech Stack

### 3.1 Frontend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | **Angular 19** | Standalone components by default, mature Signals API, built-in dependency injection, excellent form handling (critical for inspection checklists), lazy loading with `@defer`, service worker support via `@angular/pwa`, established enterprise patterns. |
| **UI Component Library** | **PrimeNG 18 + Custom Design System** | PrimeNG provides rich out-of-box data tables, charts, file uploaders, and form components — ideal for data-heavy inspection UIs. Extend with custom components matching the prototype's design tokens. |
| **State Management** | **NgRx 19 + Angular Signals** | NgRx for complex cross-cutting state (inspection wizard, offline sync queue, auth state). Angular Signals for component-local reactive state (UI toggles, filters, form state). |
| **Styling** | **Tailwind CSS 4.1 + CSS Custom Properties** | CSS-first configuration (no JS config file), matches prototype design tokens. Utility-first for rapid development. CSS custom properties for per-tenant branding injection. |
| **Charts** | **Apache ECharts via ngx-echarts** | Superior performance with large datasets, richer chart types for analytics dashboards (heatmaps, treemaps, gauges), better interactivity than Chart.js. |
| **Forms** | **Angular Reactive Forms + Typed Forms** | Type-safe, validation-rich forms for inspection checklists. Angular 19's typed FormGroup/FormControl for compile-time safety. |
| **HTTP** | **Angular HttpClient + Interceptors** | JWT token injection, error handling, retry logic, offline queue. Functional interceptors (Angular 19 pattern). |
| **PWA** | **@angular/service-worker** | Offline support, background sync, push notifications. |
| **PDF (client)** | **jsPDF + html2canvas** (fallback) | Client-side PDF for offline scenarios. Server-side PDF via Playwright is primary. |
| **i18n** | **@angular/localize** | Future multi-language support. |
| **Testing** | **Vitest + Playwright** | Vitest for unit/component tests (fast, ESM-native, Vite-compatible). Playwright for E2E tests (more reliable than Cypress, better cross-browser support, built-in PDF testing). |

### 3.2 Backend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | **NestJS 11** | TypeScript-native, modular architecture, built-in validation (class-validator), guards for RBAC, interceptors for tenant scoping, improved performance and ESM support. |
| **ORM** | **Prisma 6** | Type-safe queries, auto-generated migrations, improved query engine, edge runtime support, Prisma Client Extensions for automatic tenant_id injection. |
| **Database** | **PostgreSQL 17 (AWS RDS)** | Improved JSON handling, JSONB for flexible checklist schemas, Row-Level Security for tenant isolation, full-text search, better incremental backups. |
| **Cache** | **Valkey 8 (AWS ElastiCache)** | Fully open-source Redis-compatible fork (AWS default for ElastiCache). Session cache, VIN decode cache, rate limiting, real-time pub/sub. |
| **Auth** | **Passport.js + JWT + Refresh Tokens** | Email/password + SSO (SAML for Enterprise). Refresh token rotation. bcrypt cost factor 12. |
| **File Storage** | **AWS S3 + CloudFront CDN** | Presigned upload URLs, tenant-scoped paths, image transformation via Lambda@Edge or Sharp. |
| **PDF Generation** | **Playwright (headless Chromium)** | More reliable than Puppeteer for PDF generation, better resource management, actively maintained. Run as Lambda function or ECS task. |
| **Email** | **Resend + React Email** | Superior DX over SES, React Email for type-safe templates (replaces MJML), simple API, built-in analytics. Fallback: AWS SES for high volume. |
| **Search** | **PostgreSQL Full-Text Search** (Phase 1), **OpenSearch** (Phase 3) | PG FTS sufficient for single/small multi-tenant. OpenSearch for scale. |
| **Queue** | **BullMQ 5 (Valkey-backed)** | PDF generation, email sending, image processing, webhook delivery, data export. |
| **WebSockets** | **Socket.io via NestJS Gateway** | Real-time inspection status, dashboard updates, notifications. |
| **API Docs** | **Swagger/OpenAPI via @nestjs/swagger** | Auto-generated API documentation for public API. |
| **Validation** | **class-validator + class-transformer** | DTO validation on all inbound requests. Whitelist mode to strip unknown properties. |
| **Image Processing** | **Sharp** | High-performance image resizing, thumbnail generation, EXIF stripping. Runs in BullMQ worker. |

### 3.3 Infrastructure

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Monorepo** | **Nx 20** | Monorepo tooling for Angular + NestJS. Shared types/interfaces, dependency graph, affected-only builds, caching. |
| **Hosting (API)** | **AWS ECS Fargate** | Containerized, auto-scaling, no server management. |
| **Hosting (Frontend)** | **AWS CloudFront + S3** | Global CDN for Angular SPA. |
| **Database** | **AWS RDS PostgreSQL 17 (Multi-AZ)** | Managed, automatic failover, automated backups. |
| **Cache** | **AWS ElastiCache (Valkey 8)** | Managed Valkey cluster (Redis-compatible). |
| **Object Storage** | **AWS S3** | Photos, videos, generated PDFs, data exports. |
| **CDN** | **AWS CloudFront** | Media delivery, SPA hosting. |
| **DNS** | **AWS Route 53** | Wildcard DNS for `*.autoinspect.com` subdomain routing. |
| **SSL** | **AWS Certificate Manager** | Wildcard cert for `*.autoinspect.com`. |
| **CI/CD** | **GitHub Actions** | Build, test, deploy pipelines. Nx Cloud for remote caching. |
| **IaC** | **SST (Ion) v3** | Purpose-built for full-stack AWS apps. Simpler than raw CDK/Terraform. Manages ECS, RDS, S3, CloudFront as linked constructs. Fallback: AWS CDK if more control needed. |
| **Containerization** | **Docker + Docker Compose** | Local development environment, production container builds. Multi-stage Dockerfiles for optimized images. |
| **Monitoring** | **Sentry + AWS CloudWatch** | Sentry for error tracking (frontend + backend), CloudWatch for infrastructure metrics and logs. |
| **Secrets** | **AWS Secrets Manager** | API keys, database credentials, Stripe keys. Never in env files or code. |
| **Virus Scanning** | **ClamAV (containerized)** | Scan uploaded files before processing. Run as sidecar or Lambda. |

---

## 4. System Architecture

```
                                    ┌─────────────────────┐
                                    │   CloudFront CDN    │
                                    │  (SPA + Media)      │
                                    └─────────┬───────────┘
                                              │
┌──────────────┐      ┌───────────┐    ┌──────┴──────┐
│   Angular    │─────>│  Route 53 │───>│  ALB / API  │
│   SPA (PWA)  │      │  DNS      │    │  Gateway    │
└──────────────┘      └───────────┘    └──────┬──────┘
                                              │
                                    ┌─────────┴──────────┐
                                    │   NestJS API       │
                                    │   (ECS Fargate)    │
                                    │                    │
                                    │  ├─ Auth Module    │
                                    │  ├─ Inspection Mod │
                                    │  ├─ Vehicle Module │
                                    │  ├─ Report Module  │
                                    │  ├─ User Module    │
                                    │  ├─ Billing Module │
                                    │  ├─ Analytics Mod  │
                                    │  ├─ Webhook Module │
                                    │  └─ Admin Module   │
                                    └───┬──────┬─────┬───┘
                                        │      │     │
                          ┌─────────────┘      │     └──────────────┐
                          │                    │                    │
                   ┌──────┴──────┐    ┌───────┴───────┐   ┌───────┴───────┐
                   │  PostgreSQL │    │    Redis      │   │    AWS S3     │
                   │  (RDS)     │    │  (ElastiCache)│   │  (Media)     │
                   │            │    │               │   │              │
                   │  - RLS     │    │  - Sessions   │   │  - Photos    │
                   │  - JSONB   │    │  - Cache      │   │  - Videos    │
                   │  - FTS     │    │  - Rate Limit │   │  - PDFs      │
                   └────────────┘    │  - BullMQ     │   │  - Exports   │
                                     └───────────────┘   └──────────────┘
                                              │
                                    ┌─────────┴──────────┐
                                    │   Background Jobs  │
                                    │   (BullMQ Workers) │
                                    │                    │
                                    │  ├─ PDF Gen        │
                                    │  ├─ Image Process  │
                                    │  ├─ Email Send     │
                                    │  ├─ Webhook Fire   │
                                    │  └─ Data Export    │
                                    └────────────────────┘

External Services:
  ├─ Stripe (Billing)
  ├─ NHTSA API (VIN Decode)
  ├─ PPSR API (Vehicle History)
  ├─ Resend (Email)
  └─ Sentry (Error Tracking)
```

---

## 5. Project Structure & Monorepo Setup

### 5.1 Nx Monorepo Layout

```
autoinspect-pro/
├── apps/
│   ├── web/                              # Angular 19 SPA (frontend)
│   │   ├── src/
│   │   │   ├── app/                      # (see Section 9 for full module structure)
│   │   │   ├── assets/
│   │   │   ├── environments/
│   │   │   └── styles/
│   │   ├── project.json
│   │   └── tsconfig.app.json
│   │
│   ├── api/                              # NestJS 11 API (backend)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── tenants/
│   │   │   │   ├── vehicles/
│   │   │   │   ├── inspections/
│   │   │   │   ├── reports/
│   │   │   │   ├── media/
│   │   │   │   ├── billing/
│   │   │   │   ├── analytics/
│   │   │   │   ├── notifications/
│   │   │   │   ├── webhooks/
│   │   │   │   ├── admin/
│   │   │   │   └── search/
│   │   │   ├── common/
│   │   │   │   ├── guards/               # RolesGuard, TenantGuard
│   │   │   │   ├── interceptors/         # TenantInterceptor, LoggingInterceptor
│   │   │   │   ├── middleware/           # TenantMiddleware, PlanEnforcer
│   │   │   │   ├── decorators/           # @Roles(), @CurrentUser(), @Tenant()
│   │   │   │   ├── filters/             # HttpExceptionFilter, PrismaExceptionFilter
│   │   │   │   └── pipes/               # ValidationPipe config
│   │   │   └── config/
│   │   │       ├── app.config.ts
│   │   │       ├── database.config.ts
│   │   │       ├── redis.config.ts
│   │   │       ├── s3.config.ts
│   │   │       └── stripe.config.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── project.json
│   │   └── tsconfig.app.json
│   │
│   └── worker/                           # BullMQ background job workers
│       ├── src/
│       │   ├── main.ts
│       │   ├── processors/
│       │   │   ├── pdf.processor.ts
│       │   │   ├── image.processor.ts
│       │   │   ├── email.processor.ts
│       │   │   ├── webhook.processor.ts
│       │   │   ├── export.processor.ts
│       │   │   └── analytics.processor.ts
│       │   └── utils/
│       ├── project.json
│       └── tsconfig.app.json
│
├── libs/
│   ├── shared/                           # Shared types, interfaces, constants
│   │   ├── src/
│   │   │   ├── types/                    # DTOs, interfaces shared between frontend & backend
│   │   │   │   ├── inspection.types.ts
│   │   │   │   ├── vehicle.types.ts
│   │   │   │   ├── user.types.ts
│   │   │   │   ├── tenant.types.ts
│   │   │   │   ├── report.types.ts
│   │   │   │   ├── analytics.types.ts
│   │   │   │   └── api-response.types.ts
│   │   │   ├── constants/
│   │   │   │   ├── roles.ts
│   │   │   │   ├── plans.ts
│   │   │   │   ├── inspection-status.ts
│   │   │   │   └── grade.ts
│   │   │   └── utils/
│   │   │       ├── vin-validator.ts      # VIN check-digit validation (ported from prototype)
│   │   │       └── grade-calculator.ts   # Grading algorithm (ported from prototype)
│   │   └── project.json
│   │
│   └── ui/                               # Shared Angular UI components (if needed)
│       └── src/
│
├── docker/
│   ├── Dockerfile.api                    # Multi-stage NestJS build
│   ├── Dockerfile.worker                 # Multi-stage worker build
│   ├── Dockerfile.web                    # Multi-stage Angular build + nginx
│   └── docker-compose.yml               # Local dev: PostgreSQL, Valkey, S3 (MinIO)
│
├── infra/                                # Infrastructure as Code (SST v3 or CDK)
│   ├── sst.config.ts                     # SST v3 configuration
│   └── stacks/
│       ├── database.ts
│       ├── cache.ts
│       ├── storage.ts
│       ├── api.ts
│       ├── web.ts
│       └── worker.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml                        # Lint, test, build on PR
│       ├── deploy-staging.yml            # Deploy to staging on merge to main
│       └── deploy-production.yml         # Deploy to production (manual trigger)
│
├── nx.json
├── package.json
├── tsconfig.base.json
├── .env.example                          # Template for local development
├── .env.test                             # Test environment variables
└── README.md
```

### 5.2 Docker Compose (Local Development)

```yaml
# docker/docker-compose.yml
version: '3.9'
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: autoinspect_dev
      POSTGRES_USER: autoinspect
      POSTGRES_PASSWORD: localdev
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  valkey:
    image: valkey/valkey:8-alpine
    ports:
      - '6379:6379'

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - '9000:9000'
      - '9001:9001'
    volumes:
      - miniodata:/data

  mailpit:
    image: axllent/mailpit:latest
    ports:
      - '1025:1025'   # SMTP
      - '8025:8025'   # Web UI for viewing sent emails

volumes:
  pgdata:
  miniodata:
```

### 5.3 Shared Types Strategy

Types in `libs/shared/` are the single source of truth. Both frontend and backend import from `@autoinspect/shared`:

```typescript
// libs/shared/src/types/inspection.types.ts
export interface Inspection {
  id: string;
  tenantId: string;
  vehicleId: string;
  inspectorId: string;
  templateId: string;
  status: InspectionStatus;
  startedAt: string;
  completedAt?: string;
  overallScore?: number;
  overallGrade?: string;
  passCount: number;
  failCount: number;
  advisoryCount: number;
  naCount: number;
  totalItems: number;
}

export type InspectionStatus = 'draft' | 'in_progress' | 'pending_review' | 'approved' | 'archived';

// libs/shared/src/types/api-response.types.ts
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, string[]>;
}
```

### 5.4 Nx Commands (Development Workflow)

```bash
# Start local infrastructure
docker compose -f docker/docker-compose.yml up -d

# Run database migrations
npx nx run api:prisma-migrate

# Seed database with demo data
npx nx run api:prisma-seed

# Start API server (dev mode with hot reload)
npx nx serve api

# Start Angular frontend (dev mode)
npx nx serve web

# Start BullMQ worker (dev mode)
npx nx serve worker

# Run all unit tests
npx nx run-many -t test

# Run E2E tests
npx nx e2e web-e2e

# Lint everything
npx nx run-many -t lint

# Build for production
npx nx run-many -t build --configuration=production

# Generate a new NestJS module
npx nx g @nx/nest:module --name=vehicles --project=api
```

### 5.5 Database Seeding Strategy

The seed script (`apps/api/prisma/seed.ts`) creates demo data for local development and staging. It ports the validated data from the prototype's `mock-data.js` to ensure consistency.

**Seed data structure:**

```typescript
// apps/api/prisma/seed.ts
async function main() {
  // 1. Demo tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Prestige Auto Group',
      subdomain: 'prestige',
      plan: 'professional',
      status: 'active',
      branding: { primary_color: '#1a56db', logo_url: '' },
    },
  });

  // 2. Demo users (ported from prototype mock-data.js)
  const admin = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'sarah@prestige.com',
      passwordHash: await bcrypt.hash('demo123', 12),
      name: 'Sarah Mitchell',
      role: 'admin',
      status: 'active',
      emailVerified: true,
    },
  });

  const inspector = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'james@prestige.com',
      passwordHash: await bcrypt.hash('demo123', 12),
      name: 'James Cooper',
      role: 'inspector',
      status: 'active',
      emailVerified: true,
    },
  });

  const manager = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'david@prestige.com',
      passwordHash: await bcrypt.hash('demo123', 12),
      name: 'David Chen',
      role: 'manager',
      status: 'active',
      emailVerified: true,
    },
  });

  // 3. Default checklist templates (Standard Sedan, SUV, Quick Inspection)
  const templates = await seedChecklistTemplates(tenant.id);

  // 4. Demo vehicles (8 vehicles with full specs, ported from mock-data.js)
  const vehicles = await seedVehicles(tenant.id);

  // 5. Demo inspections (mix of statuses: 3 draft, 4 in_progress, 5 pending_review, 4 approved)
  const inspections = await seedInspections(tenant.id, vehicles, [admin, inspector, manager], templates);

  // 6. Demo damage markers (linked to inspections)
  await seedDamageMarkers(tenant.id, inspections);

  // 7. Demo notifications
  await seedNotifications(tenant.id, [admin, inspector, manager]);

  // 8. Demo audit log entries
  await seedAuditLogs(tenant.id, [admin, inspector, manager]);

  console.log(`Seeded tenant: ${tenant.subdomain}`);
  console.log(`Users: admin (sarah@prestige.com), inspector (james@prestige.com), manager (david@prestige.com)`);
  console.log(`Password for all: demo123`);
}
```

**Seed modes:**
- `npx nx run api:prisma-seed` — full seed for local dev (creates tenant + users + data)
- `npx nx run api:prisma-seed -- --minimal` — only tenant + admin user (for integration tests)
- Staging uses full seed. Production seed creates only the Super Admin user (internal platform admin).

**Important:** Seed is idempotent — running it twice should not create duplicates (upsert on unique fields).

---

## 6. Multi-Tenancy & SaaS Infrastructure

### 6.1 Tenant Isolation Strategy

**Approach: Shared database, shared schema, tenant_id column + RLS**

Every table has a `tenant_id UUID NOT NULL` column. Every query is scoped by tenant_id.

**Three layers of protection:**

1. **Application layer:** Prisma Client Extension automatically injects `WHERE tenant_id = ?` on all queries. The tenant_id comes from the authenticated user's JWT.

2. **Database layer:** PostgreSQL Row-Level Security (RLS) policies as a second safety net:
```sql
CREATE POLICY tenant_isolation ON inspections
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

3. **Storage layer:** S3 paths are scoped: `s3://autoinspect-media/{tenant_id}/inspections/{inspection_id}/photos/`

### 6.2 Tenant Provisioning Flow

1. User completes signup form (name, email, password, dealership name, subdomain)
2. Backend creates:
   - `Tenant` record with subdomain, plan='trial', trial_ends_at=now+14d
   - `User` record with role='admin', linked to tenant
   - Default `ChecklistTemplate` records (Standard Sedan, SUV, Truck, EV, Quick)
   - Default `TenantSettings` record with defaults
3. DNS: Route 53 wildcard `*.autoinspect.com` → ALB
4. SSL: ACM wildcard cert covers all subdomains
5. Welcome email sent via queue
6. User redirected to `{subdomain}.autoinspect.com/onboarding`

### 6.3 Subdomain Routing

```typescript
// NestJS middleware
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host;
    const subdomain = host.split('.')[0];
    
    if (subdomain === 'app' || subdomain === 'www') {
      // Main app or marketing site
      next();
      return;
    }
    
    const tenant = await this.tenantService.findBySubdomain(subdomain);
    if (!tenant) throw new NotFoundException('Dealership not found');
    if (tenant.status === 'suspended') throw new ForbiddenException('Account suspended');
    
    req['tenant'] = tenant;
    // Set PG session variable for RLS
    await this.prisma.$executeRaw`SELECT set_config('app.current_tenant', ${tenant.id}, true)`;
    next();
  }
}
```

---

## 7. Database Schema & Data Model

### 7.1 Core Tables

```sql
-- ==========================================
-- TENANTS & USERS
-- ==========================================

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(63) UNIQUE NOT NULL,
  plan plan_type NOT NULL DEFAULT 'trial',
  status tenant_status NOT NULL DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  settings JSONB NOT NULL DEFAULT '{}',
  branding JSONB NOT NULL DEFAULT '{}',  -- { logo_url, primary_color, secondary_color, accent_color }
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TYPE plan_type AS ENUM ('trial', 'starter', 'professional', 'enterprise');
CREATE TYPE tenant_status AS ENUM ('active', 'trial', 'suspended', 'cancelled');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role user_role NOT NULL DEFAULT 'inspector',
  avatar_url VARCHAR(512),
  status user_status NOT NULL DEFAULT 'active',
  notification_prefs JSONB NOT NULL DEFAULT '{}',
  timezone VARCHAR(50) DEFAULT 'Australia/Sydney',
  last_login_at TIMESTAMPTZ,
  invited_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE (tenant_id, email)
);

CREATE TYPE user_role AS ENUM ('admin', 'manager', 'inspector');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'invited');

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  device_info JSONB,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- VEHICLES
-- ==========================================

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  vin VARCHAR(17) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  trim VARCHAR(100),
  engine VARCHAR(100),
  transmission VARCHAR(50),
  body_type VARCHAR(50),
  color VARCHAR(50),
  drive_type VARCHAR(10),
  plate VARCHAR(20),
  odometer INTEGER,
  ppsr_status VARCHAR(20) DEFAULT 'unknown',
  ppsr_checked_at TIMESTAMPTZ,
  vin_decoded_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE (tenant_id, vin)
);

CREATE INDEX idx_vehicles_tenant_vin ON vehicles(tenant_id, vin);
CREATE INDEX idx_vehicles_tenant_search ON vehicles USING gin(
  to_tsvector('english', make || ' ' || model || ' ' || COALESCE(plate, '') || ' ' || vin)
);

-- ==========================================
-- INSPECTIONS
-- ==========================================

CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  sections JSONB NOT NULL DEFAULT '[]',
  -- sections: [{ key, title, icon, items: [{ key, label, type, required }] }]
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  inspector_id UUID NOT NULL REFERENCES users(id),
  reviewer_id UUID REFERENCES users(id),
  template_id UUID NOT NULL REFERENCES checklist_templates(id),
  status inspection_status NOT NULL DEFAULT 'draft',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  overall_score DECIMAL(5,2),
  overall_grade VARCHAR(2),
  pass_count INTEGER NOT NULL DEFAULT 0,
  fail_count INTEGER NOT NULL DEFAULT 0,
  advisory_count INTEGER NOT NULL DEFAULT 0,
  na_count INTEGER NOT NULL DEFAULT 0,
  total_items INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TYPE inspection_status AS ENUM ('draft', 'in_progress', 'pending_review', 'approved', 'archived');

CREATE INDEX idx_inspections_tenant_status ON inspections(tenant_id, status);
CREATE INDEX idx_inspections_tenant_vehicle ON inspections(tenant_id, vehicle_id);
CREATE INDEX idx_inspections_tenant_inspector ON inspections(tenant_id, inspector_id);

CREATE TABLE checklist_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  section_key VARCHAR(100) NOT NULL,
  item_key VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL, -- pass, fail, advisory, na
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE (inspection_id, section_key, item_key)
);

CREATE TABLE damage_markers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  x_position DECIMAL(5,2) NOT NULL,
  y_position DECIMAL(5,2) NOT NULL,
  diagram_view VARCHAR(20) NOT NULL DEFAULT 'top', -- top, side, front, rear
  damage_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL, -- minor, moderate, major
  notes TEXT,
  photo_url VARCHAR(512),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE obd_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  parameters JSONB NOT NULL DEFAULT '{}', -- { rpm, coolant_temp, battery_voltage, maf, ... }
  dtc_codes JSONB NOT NULL DEFAULT '[]',  -- [{ code, description, severity }]
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- MEDIA
-- ==========================================

CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  inspection_id UUID NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
  checklist_response_id UUID REFERENCES checklist_responses(id),
  damage_marker_id UUID REFERENCES damage_markers(id),
  type VARCHAR(20) NOT NULL, -- photo, video
  storage_key VARCHAR(512) NOT NULL, -- S3 key
  original_filename VARCHAR(255),
  mime_type VARCHAR(100),
  file_size_bytes BIGINT,
  thumbnail_key VARCHAR(512),
  annotations JSONB, -- [{ type, x, y, ... }]
  label VARCHAR(100), -- 'Front View', 'Engine Bay', etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- REPORTS
-- ==========================================

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  inspection_id UUID NOT NULL REFERENCES inspections(id),
  type VARCHAR(20) NOT NULL, -- internal, customer
  pdf_storage_key VARCHAR(512),
  share_token VARCHAR(64) UNIQUE,
  share_expires_at TIMESTAMPTZ,
  shared_via_email VARCHAR(255),
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reports_share_token ON reports(share_token) WHERE share_token IS NOT NULL;

-- ==========================================
-- NOTIFICATIONS & AUDIT
-- ==========================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID NOT NULL REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, created_at DESC) WHERE read_at IS NULL;

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  description TEXT,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_tenant_created ON audit_logs(tenant_id, created_at DESC);

-- ==========================================
-- WEBHOOKS (Enterprise)
-- ==========================================

CREATE TABLE webhook_endpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  url VARCHAR(512) NOT NULL,
  secret VARCHAR(255) NOT NULL,
  events TEXT[] NOT NULL, -- ['inspection.completed', 'report.generated', ...]
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint_id UUID NOT NULL REFERENCES webhook_endpoints(id),
  event VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  status_code INTEGER,
  response_body TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==========================================
-- ROW-LEVEL SECURITY
-- ==========================================

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE damage_markers ENABLE ROW LEVEL SECURITY;
ALTER TABLE obd_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example RLS policy (apply similar to all tenant-scoped tables)
CREATE POLICY tenant_isolation_vehicles ON vehicles
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant')::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant')::uuid);
```

### 7.2 Audit Log Granularity

Every create, update, and delete action on business entities must be logged. Use a decorator-based approach to keep audit logging declarative and consistent.

**Auditable actions (what triggers an audit entry):**

| Entity | Actions Logged |
|--------|---------------|
| **Inspection** | created, updated, submitted, approved, rejected, archived, deleted |
| **Vehicle** | created, updated, deleted |
| **User** | invited, activated, role_changed, deactivated, password_changed |
| **Template** | created, updated, duplicated, deactivated |
| **Settings** | updated (with before/after diff) |
| **Billing** | plan_changed, payment_failed, subscription_cancelled |
| **Report** | generated, shared, emailed |
| **Webhook** | created, updated, deleted, test_fired |
| **Auth** | login_success, login_failed, password_reset_requested, email_verified |

**NestJS implementation — `@Auditable()` decorator + interceptor:**

```typescript
// decorator
export const Auditable = (action: string, entityType: string) =>
  SetMetadata('audit', { action, entityType });

// usage on controller method
@Auditable('approved', 'inspection')
@Post(':id/approve')
async approveInspection(@Param('id') id: string) { ... }

// interceptor (runs after handler)
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap((result) => {
        const meta = this.reflector.get('audit', context.getHandler());
        if (!meta) return;
        const req = context.switchToHttp().getRequest();
        this.auditService.log({
          tenantId: req.tenant.id,
          userId: req.user.id,
          action: meta.action,
          entityType: meta.entityType,
          entityId: result?.id ?? req.params.id,
          metadata: { body: req.body },  // sanitized — strip passwords/tokens
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        });
      }),
    );
  }
}
```

**Audit log retention:** 90 days in database (queryable via admin UI). After 90 days, archived to S3 as compressed JSON for long-term compliance (configurable per tenant: 1, 2, 5 years).

**Admin UI filters:** action type, user, entity type, date range. Searchable by entity ID.

### 7.3 Tenant Data Deletion Pipeline

When a tenant cancels their subscription, the following pipeline executes:

```
Day 0:   Subscription cancelled → tenant.status = 'cancelled'
         → All users lose access (login returns 403)
         → Admin notification email: "Your account has been cancelled. Data will be deleted in 30 days."
         → Admin can reactivate within 30 days by resubscribing

Day 25:  Reminder email: "Your data will be permanently deleted in 5 days."
         → Last chance to export data (export link in email, valid 5 days)

Day 30:  BullMQ scheduled job executes deletion pipeline:
         1. Delete all media from S3 (photos, videos, PDFs, exports)
            → S3 lifecycle rule handles versioned object cleanup
         2. Delete all database records in order (respecting foreign keys):
            → webhook_deliveries → webhook_endpoints
            → media_items → checklist_responses → damage_markers → obd_snapshots
            → reports → inspections → vehicles
            → notifications → audit_logs
            → checklist_templates → users → refresh_tokens
            → tenant record itself
         3. Purge tenant data from Valkey cache
         4. Send final confirmation email: "All data has been permanently deleted."
         5. Log deletion event to internal admin audit trail (not tenant audit log)

Day 30+: No data remains. VIN/vehicle data is anonymized (not deleted) in aggregate
         analytics if tenant consented to anonymized data usage in ToS.
```

**Safety checks:**
- Deletion job requires `tenant.status === 'cancelled'` AND `cancelled_at < now() - 30 days`
- Job is idempotent — can be retried safely if it fails partway through
- Super Admin can pause/cancel pending deletions from internal admin panel

---

## 8. API Specification

### 8.1 API Design Principles
- RESTful with resource-based URLs
- JSON request/response bodies
- JWT Bearer token authentication
- Consistent error format: `{ statusCode, message, error, details }`
- Pagination via `?page=1&limit=20`, response includes `{ data, meta: { total, page, limit, totalPages } }`
- Rate limiting: 100 req/min (Starter), 300 req/min (Professional), 1000 req/min (Enterprise)

### 8.2 API Versioning

**Strategy: URI-prefix versioning** — all endpoints are prefixed with `/api/v1/`.

```
/api/v1/inspections
/api/v1/vehicles
/api/v1/auth/login
```

- **Phase 1–3:** Only `v1` exists. All routes live under `/api/v1/`.
- **When v2 is needed:** A new NestJS controller version is created (e.g., `InspectionsControllerV2`). Both `/api/v1/` and `/api/v2/` coexist. `v1` continues to work for at least 12 months after `v2` ships.
- **Public API (Enterprise):** Same versioning applies. Breaking changes are never shipped within the same version.
- **Deprecation:** Response header `Sunset: <date>` + `Deprecation: true` on deprecated endpoints. Deprecation notices in API docs and in-app admin notification.

NestJS implementation:

```typescript
// app.module.ts ��� version prefix
app.setGlobalPrefix('api');
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});

// controllers use @Version('1') decorator (implicit via default)
@Controller({ path: 'inspections', version: '1' })
export class InspectionsController { ... }
```

### 8.3 Rate Limiting

**Implementation:** `@nestjs/throttler` with Valkey as the backing store.

```typescript
// app.module.ts
ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    throttlers: [
      { name: 'short', ttl: 1000, limit: 10 },   // 10 req/sec burst protection
      { name: 'medium', ttl: 60000, limit: 100 },  // 100 req/min default
    ],
    storage: new ThrottlerStorageRedisService(config.get('REDIS_URL')),
  }),
})
```

**Plan-based limits** (applied per-tenant, enforced via custom guard):

| Plan | Requests/min | Requests/day | Concurrent uploads |
|------|:-----------:|:-----------:|:-----------------:|
| Trial | 60 | 5,000 | 3 |
| Starter | 100 | 10,000 | 5 |
| Professional | 300 | 50,000 | 10 |
| Enterprise | 1,000 | Unlimited | 25 |

```typescript
@Injectable()
export class TenantThrottlerGuard extends ThrottlerGuard {
  async getLimit(context: ExecutionContext): Promise<number> {
    const tenant = context.switchToHttp().getRequest().tenant;
    return PLAN_RATE_LIMITS[tenant.plan].requestsPerMinute;
  }
}
```

**Rate limit headers** returned on every response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1714857600
```

When limit is exceeded → `429 Too Many Requests` with `Retry-After` header.

### 8.4 Endpoint Groups

```
AUTH
  POST   /api/auth/register          # Create account + tenant
  POST   /api/auth/login             # Email/password login
  POST   /api/auth/refresh           # Refresh JWT
  POST   /api/auth/logout            # Revoke refresh token
  POST   /api/auth/forgot-password   # Send reset email (always returns 200)
  POST   /api/auth/reset-password    # Reset with token + new password
  POST   /api/auth/verify-email      # Verify email address with token
  POST   /api/auth/resend-verification # Resend verification email

USERS
  GET    /api/users                  # List tenant users
  POST   /api/users/invite           # Invite user by email
  GET    /api/users/:id              # Get user details
  PATCH  /api/users/:id              # Update user
  DELETE /api/users/:id              # Deactivate user
  GET    /api/users/me               # Current user profile
  PATCH  /api/users/me               # Update own profile
  PATCH  /api/users/me/password      # Change own password
  PATCH  /api/users/me/notifications # Update notification prefs

VEHICLES
  GET    /api/vehicles               # List vehicles (search, filter)
  POST   /api/vehicles               # Create vehicle
  GET    /api/vehicles/:id           # Get vehicle details
  PATCH  /api/vehicles/:id           # Update vehicle
  GET    /api/vehicles/:id/history   # Vehicle inspection history
  POST   /api/vehicles/decode-vin    # Decode VIN via external API
  POST   /api/vehicles/ppsr-check    # Run PPSR check

INSPECTIONS
  GET    /api/inspections            # List inspections (filter by status, inspector, date)
  POST   /api/inspections            # Start new inspection
  GET    /api/inspections/:id        # Get full inspection details
  PATCH  /api/inspections/:id        # Update inspection metadata
  DELETE /api/inspections/:id        # Delete draft inspection
  POST   /api/inspections/:id/submit # Submit for review
  POST   /api/inspections/:id/approve # Approve inspection (manager/admin)
  POST   /api/inspections/:id/reject  # Reject with notes (manager/admin)

CHECKLIST RESPONSES
  GET    /api/inspections/:id/responses        # Get all responses
  PUT    /api/inspections/:id/responses/batch  # Batch upsert responses (auto-save)

DAMAGE MARKERS
  GET    /api/inspections/:id/damages          # Get all damage markers
  POST   /api/inspections/:id/damages          # Add damage marker
  PATCH  /api/inspections/:id/damages/:did     # Update damage marker
  DELETE /api/inspections/:id/damages/:did     # Remove damage marker

OBD SNAPSHOTS
  POST   /api/inspections/:id/obd              # Save OBD snapshot

MEDIA
  POST   /api/inspections/:id/media/upload-url # Get presigned S3 upload URL
  POST   /api/inspections/:id/media            # Register uploaded media
  DELETE /api/inspections/:id/media/:mid       # Delete media item

REPORTS
  POST   /api/inspections/:id/report           # Generate PDF report
  GET    /api/inspections/:id/report           # Get report metadata
  POST   /api/inspections/:id/report/share     # Generate share link
  POST   /api/inspections/:id/report/email     # Email report to customer
  GET    /api/reports/public/:token            # Public report view (no auth)

TEMPLATES
  GET    /api/templates                        # List templates
  POST   /api/templates                        # Create template
  GET    /api/templates/:id                    # Get template details
  PATCH  /api/templates/:id                    # Update template
  DELETE /api/templates/:id                    # Deactivate template
  POST   /api/templates/:id/duplicate          # Duplicate template

ANALYTICS
  GET    /api/analytics/overview               # KPI summary
  GET    /api/analytics/inspections            # Inspection trends
  GET    /api/analytics/defects                # Common defects
  GET    /api/analytics/inspectors             # Inspector performance
  GET    /api/analytics/export                 # CSV data export

SEARCH
  GET    /api/search                           # Global search (?q=, &type=, &limit=)

ADMIN / SETTINGS
  GET    /api/settings                         # Get tenant settings
  PATCH  /api/settings                         # Update settings
  GET    /api/audit-log                        # Query audit log (filter by action, user, date)
  POST   /api/settings/branding/logo           # Upload logo
  POST   /api/export                           # Request async data export (entity, date range, format)
  GET    /api/export/:id                       # Check export job status / get download URL
  GET    /api/export                           # List recent exports

HEALTH
  GET    /health                               # Full health check (DB, cache, storage)
  GET    /health/ready                         # Readiness probe for load balancer
  GET    /health/live                          # Liveness probe (lightweight)

BILLING
  GET    /api/billing/subscription             # Current plan & usage
  POST   /api/billing/checkout-session         # Create Stripe checkout
  POST   /api/billing/portal-session           # Create Stripe billing portal
  POST   /api/billing/webhook                  # Stripe webhook handler

NOTIFICATIONS
  GET    /api/notifications                    # List notifications
  PATCH  /api/notifications/:id/read           # Mark as read
  POST   /api/notifications/read-all           # Mark all as read

WEBHOOKS (Enterprise)
  GET    /api/webhooks                         # List webhook endpoints
  POST   /api/webhooks                         # Create endpoint
  PATCH  /api/webhooks/:id                     # Update endpoint
  DELETE /api/webhooks/:id                     # Delete endpoint
  GET    /api/webhooks/:id/deliveries          # View delivery log
```

---

## 9. Frontend Application (Angular 19)

### 9.1 Module Structure

```
src/
├── app/
│   ├── core/                          # Singleton services (providedIn: 'root')
│   │   ├── auth/                      # AuthService, authGuard (functional), tokenInterceptor
│   │   ├── tenant/                    # TenantService, TenantResolver
│   │   ├── api/                       # ApiService (base HTTP), errorInterceptor
│   │   ├── notification/              # NotificationService, WebSocket connection
│   │   ├── offline/                   # OfflineQueueService, SyncService
│   │   └── layout/                    # SidebarService, HeaderService, ThemeService
│   │
│   ├── shared/                        # Shared standalone components
│   │   ├── components/
│   │   │   ├── empty-state/           # "No inspections yet" with illustration + CTA
│   │   │   ├── error-state/           # API error, 404, 403 with retry action
│   │   │   ├── loading-skeleton/      # Skeleton loaders per entity (table row, card, form)
│   │   │   ├── stat-card/
│   │   │   ├── data-table/            # Reusable sortable/filterable table
│   │   │   ├── confirm-dialog/
│   │   │   ├── toast/
│   │   │   ├── badge/
│   │   │   ├── avatar/
│   │   │   ├── search-bar/            # Global search with typeahead
│   │   │   ├── filter-bar/
│   │   │   ├── pagination/
│   │   │   ├── cookie-consent/        # GDPR cookie banner
│   │   │   └── session-expiry-modal/  # Warning before JWT expiry
│   │   ├── directives/
│   │   │   ├── role.directive.ts       # *appRole="['admin','manager']"
│   │   │   ├── tooltip.directive.ts
│   │   │   └── click-outside.directive.ts
│   │   ├── pipes/
│   │   │   ├── relative-time.pipe.ts
│   │   │   ├── grade-color.pipe.ts
│   │   │   └── file-size.pipe.ts
│   │   └── models/                     # Re-exports from @autoinspect/shared
│   │
│   ├── features/                       # Lazy-loaded standalone components
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── signup/                 # 3-step registration
│   │   │   ├── password-reset/         # Request + reset form (with token)
│   │   │   ├── email-verification/     # Verify email landing page
│   │   │   └── onboarding/             # Multi-step first-login wizard
│   │   ├── dashboard/
│   │   ├── inspections/
│   │   │   ├── list/                   # With bulk actions (archive, export)
│   │   │   ├── wizard/                 # Multi-step new/edit inspection form
│   │   │   │   ├── vehicle-intake/
│   │   │   │   ├── checklist/
│   │   │   │   ├── damage-map/
│   │   │   │   ├── obd-scan/
│   │   │   │   └── summary/
│   │   │   └── report/
│   │   ├── vehicles/
│   │   │   ├── list/                   # Table + grid views
│   │   │   ├── detail-edit/            # Vehicle detail with edit form
│   │   │   └── history/                # Timeline of inspections for vehicle
│   │   ├── search/                     # Global search results (cross-entity)
│   │   ├── analytics/
│   │   ├── admin/
│   │   │   ├── users/                  # Invite, edit role, deactivate
│   │   │   ├── template-builder/       # Create/edit checklist templates with drag-and-drop
│   │   │   ├── settings/
│   │   │   ├── audit-log/
│   │   │   ├── webhooks/               # Enterprise: manage endpoints + delivery log
│   │   │   └── data-export/            # Entity/date/format selection → async job
│   │   ├── profile/                    # Personal info, security/2FA, notification prefs
│   │   ├── billing/                    # Current plan, usage meters, Stripe portal redirect
│   │   ├── help/
│   │   └── public-report/              # Standalone (no app shell)
│   │
│   ├── layout/                         # App shell components
│   │   ├── sidebar/
│   │   ├── header/                     # With global search bar
│   │   └── mobile-nav/
│   │
│   └── store/                          # NgRx store
│       ├── auth/
│       ├── inspection/
│       └── offline-queue/
│
├── assets/
│   ├── icons/
│   ├── vehicle-diagrams/               # SVG diagrams for damage mapping (sedan, SUV, truck, van)
│   ├── empty-states/                   # Illustrations for empty state components
│   └── i18n/
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── styles/
│   ├── tailwind.css                    # Tailwind CSS 4.1 entry (CSS-first config)
│   ├── _variables.css                  # Design tokens as CSS custom properties
│   ├── _base.css
│   └── _print.css                      # Print-specific styles for reports
│
└── ngsw-config.json                    # Service worker config
```

### 9.2 Routing (Angular 19 — Standalone Components)

```typescript
// app.routes.ts — Angular 19 standalone routing
export const appRoutes: Routes = [
  // Public routes (no auth)
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component') },
  { path: 'signup', loadComponent: () => import('./features/auth/signup/signup.component') },
  { path: 'reset-password', loadComponent: () => import('./features/auth/password-reset/password-reset.component') },
  { path: 'verify-email', loadComponent: () => import('./features/auth/email-verification/email-verification.component') },
  { path: 'pricing', loadComponent: () => import('./features/pricing/pricing.component') },
  { path: 'report/:token', loadComponent: () => import('./features/public-report/public-report.component') },
  { path: 'terms', loadComponent: () => import('./features/legal/terms.component') },
  { path: 'privacy', loadComponent: () => import('./features/legal/privacy.component') },
  { path: 'cookies', loadComponent: () => import('./features/legal/cookies.component') },
  
  // Authenticated routes (app shell)
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'onboarding', loadComponent: () => import('./features/auth/onboarding/onboarding.component'), canActivate: [firstLoginGuard] },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component') },
      { path: 'inspections', loadChildren: () => import('./features/inspections/inspections.routes') },
      { path: 'vehicles', loadChildren: () => import('./features/vehicles/vehicles.routes') },
      { path: 'search', loadComponent: () => import('./features/search/search-results.component') },
      { path: 'analytics', loadComponent: () => import('./features/analytics/analytics.component'), canActivate: [roleGuard], data: { roles: ['admin', 'manager'] } },
      { path: 'admin', loadChildren: () => import('./features/admin/admin.routes'), canActivate: [roleGuard], data: { roles: ['admin'] } },
      { path: 'profile', loadComponent: () => import('./features/profile/profile.component') },
      { path: 'billing', loadComponent: () => import('./features/billing/billing.component') },
      { path: 'help', loadComponent: () => import('./features/help/help.component') },
    ]
  },
  
  // Error pages
  { path: 'not-found', loadComponent: () => import('./features/errors/not-found.component') },
  { path: 'forbidden', loadComponent: () => import('./features/errors/forbidden.component') },
  { path: '**', redirectTo: 'not-found' }
];

// features/inspections/inspections.routes.ts
export default [
  { path: '', loadComponent: () => import('./list/inspection-list.component') },
  { path: 'new', loadComponent: () => import('./wizard/inspection-wizard.component') },
  { path: ':id', loadComponent: () => import('./report/inspection-report.component') },
  { path: ':id/edit', loadComponent: () => import('./wizard/inspection-wizard.component') },  // Reuses wizard in edit mode
] as Routes;

// features/vehicles/vehicles.routes.ts
export default [
  { path: '', loadComponent: () => import('./list/vehicle-list.component') },
  { path: ':id', loadComponent: () => import('./detail-edit/vehicle-detail.component') },
  { path: ':id/history', loadComponent: () => import('./history/vehicle-history.component') },
] as Routes;

// features/admin/admin.routes.ts
export default [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./users/admin-users.component') },
  { path: 'templates', loadComponent: () => import('./template-builder/template-list.component') },
  { path: 'templates/new', loadComponent: () => import('./template-builder/template-editor.component') },
  { path: 'templates/:id/edit', loadComponent: () => import('./template-builder/template-editor.component') },
  { path: 'settings', loadComponent: () => import('./settings/admin-settings.component') },
  { path: 'audit-log', loadComponent: () => import('./audit-log/audit-log.component') },
  { path: 'webhooks', loadComponent: () => import('./webhooks/webhook-management.component') },
  { path: 'export', loadComponent: () => import('./data-export/data-export.component') },
] as Routes;
```

### 9.3 Internationalization (i18n) — Structure from Day One

While Phase 1 ships English-only, the codebase must be structured for multi-language support from day one to avoid a costly retrofit.

**Rules:**
- **No hardcoded user-facing strings in templates.** All visible text uses `@angular/localize` `$localize` tagged templates or the `i18n` attribute.
- **Backend error messages** returned as message keys (e.g., `errors.inspection.not_found`), not English strings. Frontend maps keys to locale strings.
- **Dates, numbers, currencies** always use Angular's locale-aware pipes (`DatePipe`, `CurrencyPipe`, `DecimalPipe`).
- **Email templates** (React Email) accept a `locale` parameter. Default: `en-AU`.

```html
<!-- Template example -->
<h1 i18n="dashboard heading">Dashboard</h1>
<p i18n>No inspections found.</p>

<!-- Or in TypeScript -->
const message = $localize`Inspection submitted successfully`;
```

**i18n file structure:**
```
src/assets/i18n/
├── en-AU.json          # Default locale (Australian English)
├── en-US.json          # US English (Phase 4 — if expanding to US market)
└── ar.json             # Arabic (future — RTL support consideration)
```

**Phase 1 action:** Extract all strings into `en-AU.json` using `ng extract-i18n`. No translation files needed yet, but the extraction proves all strings are localizable.

### 9.4 Accessibility (WCAG 2.1 AA)

**Target: WCAG 2.1 Level AA compliance** across all pages.

**Requirements:**

| Category | Requirement | Implementation |
|----------|------------|----------------|
| **Keyboard navigation** | All interactive elements reachable and operable via keyboard | PrimeNG components are keyboard-accessible by default. Custom components must implement `tabindex`, `keydown` handlers. Tab order follows visual order. |
| **Screen readers** | All content meaningful to assistive technology | Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`). All images have `alt` text. Form fields have `<label>` associations. ARIA roles on custom widgets (damage map, inspection wizard steps). |
| **Color contrast** | Minimum 4.5:1 for normal text, 3:1 for large text | Verify design tokens meet ratios. Do not use color alone to convey status (pass/fail uses color + icon + text label). |
| **Focus indicators** | Visible focus ring on all focusable elements | Custom `:focus-visible` styles in Tailwind. Never `outline: none` without replacement. |
| **Motion** | Respect `prefers-reduced-motion` | Disable animations/transitions when user preference is set. |
| **Zoom** | Content usable at 200% zoom | Responsive layout handles zoom. No fixed-width containers. |
| **Forms** | Accessible validation and error messages | Errors linked to fields via `aria-describedby`. Error summary at form top uses `role="alert"`. |
| **Touch targets** | Minimum 44x44px for touch targets | Critical for iPad inspection workflow. All buttons, checklist items, damage map tap targets meet minimum. |

**Testing:**
- `axe-core` integrated into Playwright E2E tests (automated a11y scans on every page)
- Manual screen reader testing (VoiceOver on macOS/iOS) for critical flows: login, inspection wizard, report viewer
- Lighthouse accessibility audit score target: > 90

### 9.5 Browser & Device Support Matrix

| Browser/Device | Version | Support Level | Notes |
|---------------|---------|:------------:|-------|
| **Chrome (Desktop)** | Latest 2 versions | Full | Primary development target |
| **Chrome (Android)** | Latest 2 versions | Full | |
| **Safari (macOS)** | Latest 2 versions | Full | |
| **Safari (iOS/iPadOS)** | Latest 2 versions | **Full — Critical** | iPad is the primary device for inspectors in the field |
| **Edge (Desktop)** | Latest 2 versions | Full | Chromium-based |
| **Firefox (Desktop)** | Latest 2 versions | Full | Web Bluetooth not supported — OBD-II falls back to manual entry |
| **Firefox (Mobile)** | Latest 2 versions | Supported | Same Bluetooth limitation |
| **Samsung Internet** | Latest 2 versions | Supported | |
| **IE 11** | — | **Not supported** | |

**Device priorities:**
1. **iPad (10th gen+, iPad Air, iPad Pro)** — Primary inspection device. All inspection workflows must be touch-optimized and tested on physical iPad.
2. **Desktop (1920x1080+)** — Admin, analytics, settings workflows.
3. **iPhone / Android phone** — Dashboard viewing, notifications, basic inspection review. Not primary inspection device.

**Minimum viewport widths:**
- Mobile: 320px (iPhone SE)
- Tablet: 768px (iPad Mini)
- Desktop: 1024px

**PWA install targets:** Chrome (Desktop + Android), Safari (iOS — Add to Home Screen), Edge (Desktop).

---

## 10. Authentication & Authorization

### 10.1 Auth Flow
1. User submits email/password → `POST /api/auth/login`
2. Server validates credentials, returns `{ accessToken, refreshToken }`
3. Access token: JWT, 15-minute expiry, contains `{ userId, tenantId, role }`
4. Refresh token: opaque, 7-day expiry, stored in httpOnly cookie + DB
5. Angular `TokenInterceptor` attaches `Authorization: Bearer <accessToken>` to all API requests
6. On 401, interceptor automatically attempts refresh via `POST /api/auth/refresh`
7. If refresh fails, redirect to login

### 10.2 Email Verification Flow

1. User registers → backend creates user with `email_verified = false`
2. Backend queues verification email with signed JWT link (24-hour expiry)
3. Email contains: `https://{subdomain}.autoinspect.com/verify-email?token={jwt}`
4. User clicks link → `POST /api/auth/verify-email` with token
5. Backend validates JWT, sets `email_verified = true`
6. User redirected to login (or auto-logged-in if session active)
7. Users with `email_verified = false` see a banner: "Please verify your email" with resend option
8. Unverified users can access the app but cannot submit inspections for review

### 10.3 Password Reset Flow

1. User enters email → `POST /api/auth/forgot-password`
2. Backend always returns 200 (prevent email enumeration)
3. If email exists: queue reset email with signed JWT link (1-hour expiry)
4. Email contains: `https://{subdomain}.autoinspect.com/reset-password?token={jwt}`
5. User clicks link → frontend validates token is not expired
6. User enters new password → `POST /api/auth/reset-password` with token + new password
7. Backend validates JWT, hashes new password, invalidates all existing refresh tokens
8. User redirected to login with success message

### 10.4 RBAC (Role-Based Access Control)

```typescript
// NestJS Guard
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Usage
@Roles('admin', 'manager')
@UseGuards(RolesGuard)
@Post(':id/approve')
approveInspection(@Param('id') id: string) { ... }
```

### 10.5 SSO (Enterprise)
- SAML 2.0 via `passport-saml` for Enterprise customers
- IdP-initiated and SP-initiated flows
- Attribute mapping: email, name, role
- JIT (Just-in-Time) user provisioning

---

## 11. Core Feature Modules

### 11.1 Inspection Wizard

The inspection wizard is the most complex UI component. It's a multi-step form with:

**Steps:**
1. Vehicle Intake — VIN entry/decode, vehicle details form
2-8. Checklist Sections — Template-driven, each section rendered from JSONB
9. Damage Map — Interactive SVG diagram with tap-to-place markers
10. OBD-II Scan — Bluetooth connection, DTC read
11. Summary — Score calculation, final review, submit

**Key Requirements:**
- Auto-save every 30 seconds + on each field change → `PUT /api/inspections/:id/responses/batch`
- Offline-capable: queue responses in IndexedDB, sync on reconnect
- Step navigation: can jump to any completed step
- Progress indicator per section
- Inspection timer (elapsed time display)
- Photo capture inline at any checklist item
- Must work well on iPad (primary device for inspectors)

### 11.2 Inspection Editing (Resume / Edit)

The inspection wizard supports two modes:

**Resume Draft:**
- Inspector opens a `draft` or `in_progress` inspection from the list
- Wizard loads existing responses, damage markers, and photos from API
- Inspector continues from where they left off (last incomplete section)
- Auto-save continues as normal

**Edit Submitted Inspection:**
- Manager/Admin can edit an inspection in `pending_review` status
- Opens wizard in edit mode with all fields populated
- Changes are tracked in audit log (who changed what, when)
- After editing, inspection remains in `pending_review` (or can be sent back to inspector)

**Route:** `/inspections/:id/edit` — wizard component checks `id` param, if present → loads existing inspection data via `GET /api/inspections/:id`

### 11.3 Vehicle Detail & Editing

- `GET /api/vehicles/:id` → displays full vehicle info + linked inspections
- Inline editing for vehicle fields (make, model, year, plate, odometer, etc.)
- `PATCH /api/vehicles/:id` → saves changes with optimistic UI update
- Delete vehicle only if no inspections linked (soft-delete: mark inactive)
- Shows inspection count, last inspection date, current condition grade

### 11.4 Checklist Template Builder

Admin UI for creating and editing inspection checklist templates:

**Template Editor:**
- Template name, vehicle type association, active/default toggles
- Section management: add, reorder (drag-and-drop via CDK DragDrop), rename, delete sections
- Item management within sections: add, reorder, edit label, set type (pass/fail, rating, text, number), toggle required
- Preview mode: renders template as inspector would see it
- Duplicate template: `POST /api/templates/:id/duplicate`

**Data structure:** Template is stored as JSONB in `checklist_templates.sections`:
```json
[
  {
    "key": "exterior",
    "title": "Exterior Inspection",
    "icon": "car",
    "items": [
      { "key": "paint_condition", "label": "Paint Condition", "type": "pass_fail", "required": true },
      { "key": "windshield", "label": "Windshield", "type": "pass_fail", "required": true },
      { "key": "exterior_notes", "label": "Additional Notes", "type": "text", "required": false }
    ]
  }
]
```

### 11.5 Global Search

Header search bar triggers cross-entity search:

- Typeahead with 300ms debounce → `GET /api/search?q={query}&limit=5` (preview results)
- Enter or click "View all" → navigates to `/search?q={query}` (full results page)
- Search results page shows tabbed results: Vehicles, Inspections, Users (admin only)
- Each tab shows count badge and relevant result cards
- Backend: PostgreSQL `tsvector` search across `vehicles`, `inspections`, `users` tables
- Results scoped to current tenant via RLS

### 11.6 Data Export

Admin page for bulk data export:

1. Select entity type (inspections, vehicles, analytics)
2. Select date range and filters
3. Select format (CSV, Excel)
4. Click "Export" → `POST /api/analytics/export` with params
5. Backend queues BullMQ job → generates file → uploads to S3
6. Notification sent to admin with download link (presigned S3 URL, 24-hour expiry)
7. UI shows export history with download links

**Full tenant export** (admin settings): exports all data + media as ZIP archive. Available to all plans for data portability compliance.

### 11.7 Grading Algorithm

```typescript
function calculateGrade(responses: ChecklistResponse[], damages: DamageMarker[], obd: OBDSnapshot | null): InspectionGrade {
  let pass = 0, fail = 0, advisory = 0, na = 0;
  responses.forEach(r => {
    switch (r.status) {
      case 'pass': pass++; break;
      case 'fail': fail++; break;
      case 'advisory': advisory++; break;
      case 'na': na++; break;
    }
  });

  const scored = responses.length - na;
  if (scored === 0) return { score: 0, grade: 'N/A' };

  let score = ((pass + advisory * 0.5) / scored) * 100;

  // Damage penalties
  damages.forEach(d => {
    if (d.severity === 'major') score -= 3;
    else if (d.severity === 'moderate') score -= 1.5;
    else if (d.severity === 'minor') score -= 0.5;
  });

  // OBD penalties
  if (obd?.dtcCodes) {
    obd.dtcCodes.forEach(dtc => {
      if (dtc.severity === 'critical') score -= 5;
      else if (dtc.severity === 'warning') score -= 2;
    });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  
  const grade = score >= 95 ? 'A+' : score >= 90 ? 'A' : score >= 85 ? 'A-'
    : score >= 80 ? 'B+' : score >= 75 ? 'B' : score >= 70 ? 'B-'
    : score >= 65 ? 'C+' : score >= 60 ? 'C' : score >= 55 ? 'C-'
    : score >= 50 ? 'D' : 'F';

  return { score, grade, pass, fail, advisory, na, total: responses.length };
}
```

### 11.8 Damage Map

- Interactive SVG vehicle diagrams (sedan, SUV, truck, van, motorcycle)
- Different views: top, driver-side, passenger-side, front, rear
- Click/tap to place damage marker → opens modal with type, severity, notes, photo
- Markers render as numbered circles on the SVG
- Same map renders in PDF reports

---

## 12. Billing & Subscription System

### 12.1 Plans

| Feature | Starter ($49/mo) | Professional ($99/mo) | Enterprise ($249/mo) |
|---------|:-:|:-:|:-:|
| Users | 5 | 15 | Unlimited |
| Inspections/month | 100 | Unlimited | Unlimited |
| Photos per inspection | 20 | Unlimited | Unlimited |
| Video capture | - | Yes | Yes |
| Customer branded reports | - | Yes | Yes (white-label) |
| OBD-II integration | - | Yes | Yes |
| Analytics | Basic | Full | Full |
| API access | - | - | Yes |
| SSO/SAML | - | - | Yes |
| Support | Email | Email + Chat | Phone + Dedicated |
| SLA | 99.5% | 99.5% | 99.9% |

**Annual discount:** 20% off (pay 10 months for 12)

### 12.2 Stripe Integration

```typescript
// NestJS Billing Module
@Module({
  providers: [
    BillingService,      // Stripe customer, subscription management
    WebhookHandler,      // Process Stripe webhooks
    UsageTracker,        // Track inspections, users, storage per tenant
    PlanEnforcer,        // Middleware to check plan limits
  ]
})
export class BillingModule {}

// Stripe Webhook Events to Handle:
// - checkout.session.completed → activate subscription
// - invoice.paid → extend subscription
// - invoice.payment_failed → send dunning email, set grace period
// - customer.subscription.updated → update plan
// - customer.subscription.deleted → suspend tenant (after grace period)
```

### 12.3 Plan Enforcement

Middleware checks plan limits on relevant endpoints:

```typescript
@Injectable()
export class PlanEnforcerMiddleware {
  async use(req, res, next) {
    const tenant = req.tenant;
    const limits = PLAN_LIMITS[tenant.plan];
    
    // Check user count on POST /api/users/invite
    if (req.path.includes('/users/invite')) {
      const userCount = await this.userService.countByTenant(tenant.id);
      if (userCount >= limits.maxUsers) {
        throw new ForbiddenException('User limit reached for your plan. Upgrade to add more users.');
      }
    }
    
    // Check inspection count on POST /api/inspections
    if (req.path === '/api/inspections' && req.method === 'POST') {
      const monthlyCount = await this.inspectionService.countThisMonth(tenant.id);
      if (limits.maxInspections !== -1 && monthlyCount >= limits.maxInspections) {
        throw new ForbiddenException('Monthly inspection limit reached. Upgrade your plan for unlimited inspections.');
      }
    }
    
    next();
  }
}
```

---

## 13. Media Pipeline

### 13.1 Photo Upload Flow

1. Frontend requests presigned upload URL: `POST /api/inspections/:id/media/upload-url` with `{ filename, mimeType }`
2. Backend generates presigned S3 PUT URL (5-minute expiry), scoped to `{tenant_id}/inspections/{inspection_id}/photos/{uuid}.{ext}`
3. Frontend uploads directly to S3 using the presigned URL
4. Frontend notifies backend: `POST /api/inspections/:id/media` with `{ storageKey, label, checklistResponseId }`
5. Backend queues image processing job (BullMQ):
   - Generate thumbnail (400x300)
   - Compress original if > 2MB (maintain quality)
   - Strip EXIF data (privacy)
   - Store thumbnail at `{tenant_id}/inspections/{inspection_id}/thumbnails/{uuid}.jpg`

### 13.2 Storage Limits

| Plan | Storage | Max Photo Size | Max Video Length |
|------|---------|---------------|-----------------|
| Starter | 10 GB | 10 MB | - |
| Professional | 50 GB | 10 MB | 30 seconds |
| Enterprise | 500 GB | 10 MB | 60 seconds |

---

## 14. Real-Time Features

### 14.1 WebSocket Events

```typescript
// Server → Client events:
'inspection:status_changed'   // { inspectionId, newStatus, updatedBy }
'inspection:submitted'        // { inspectionId, vehicleInfo, inspectorName }
'notification:new'            // { notification }
'dashboard:stats_updated'     // { stats }

// Client → Server events:
'join:tenant'                 // Subscribe to tenant events
'join:inspection'             // Subscribe to specific inspection updates
```

---

## 15. Offline & PWA Support

### 15.1 Angular Service Worker Config

```json
// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api-fresh",
      "urls": ["/api/inspections/**", "/api/vehicles/**"],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 100,
        "maxAge": "1h",
        "timeout": "5s"
      }
    }
  ]
}
```

### 15.2 Offline Inspection Queue

```typescript
@Injectable()
export class OfflineQueueService {
  private db: IDBDatabase;

  async queueResponse(inspectionId: string, responses: ChecklistResponse[]) {
    // Store in IndexedDB
    await this.db.put('pending_responses', { inspectionId, responses, timestamp: Date.now() });
  }

  async syncAll() {
    const pending = await this.db.getAll('pending_responses');
    for (const item of pending) {
      try {
        await this.api.batchUpsertResponses(item.inspectionId, item.responses);
        await this.db.delete('pending_responses', item.id);
      } catch {
        // Will retry on next sync
      }
    }
  }
}
```

---

## 16. OBD-II Integration

### 16.1 Web Bluetooth Flow (Chrome)

```typescript
@Injectable()
export class OBDService {
  async connect(): Promise<BluetoothDevice> {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['0000fff0-0000-1000-8000-00805f9b34fb'] }], // ELM327 service
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
    });
    // ... connect to GATT server, read characteristics
  }

  async readDTCs(): Promise<DTCCode[]> {
    // Send "03" command (Mode 03: Read stored DTCs)
    // Parse response, look up codes in DTC database
  }

  async readParameters(): Promise<OBDParameters> {
    // Send PIDs: 010C (RPM), 0105 (Coolant), 0142 (Battery), etc.
  }
}
```

### 16.2 Fallback
- If Web Bluetooth unavailable (Firefox, Safari, iOS): show manual DTC entry form
- Future: React Native companion app for iOS OBD-II support

---

## 17. PDF Report Generation

### 17.1 Server-Side (Primary — Playwright)

```typescript
// NestJS service using Playwright
@Injectable()
export class PDFService {
  private browser: Browser;

  async onModuleInit() {
    this.browser = await chromium.launch({ headless: true });
  }

  async onModuleDestroy() {
    await this.browser?.close();
  }

  async generateReport(inspectionId: string, type: 'internal' | 'customer'): Promise<string> {
    // 1. Fetch all inspection data (inspection, responses, damages, media, OBD)
    // 2. Render HTML report template (Handlebars/EJS) with tenant branding
    // 3. Use Playwright to render HTML and generate PDF
    // 4. Upload PDF to S3
    // 5. Return S3 key
    
    const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.setContent(renderedHTML, { waitUntil: 'networkidle' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });
    await context.close();
    
    const key = `${tenantId}/reports/${inspectionId}/${type}-${Date.now()}.pdf`;
    await this.s3.upload({ Key: key, Body: pdfBuffer, ContentType: 'application/pdf' });
    return key;
  }
}
```

### 17.2 Report Templates
- **Internal:** Full details — all checklist items, all photos, damage map, OBD data, inspector notes, reviewer notes
- **Customer:** Curated — overall score/grade, section summaries, key photos, damage map, OBD summary (no internal notes), branded with dealership logo/colours/disclaimer

---

## 18. Notification System

### 18.1 Notification Types

| Event | In-App | Email | WebSocket |
|-------|:------:|:-----:|:---------:|
| Inspection assigned | Yes | Optional | Yes |
| Inspection submitted for review | Yes | Yes (manager) | Yes |
| Inspection approved | Yes | Optional | Yes |
| Critical defect found | Yes | Yes | Yes |
| Report viewed by customer | Yes | Optional | No |
| User invited | - | Yes (invite link) | No |
| Trial expiring (3 days, 1 day) | Yes | Yes | No |
| Payment failed | Yes | Yes | No |
| Weekly digest | - | Optional | No |

### 18.2 Email Templates (Resend + React Email)
- Built with React Email for type-safe, component-based email templates (replaces MJML)
- Rendered server-side to HTML, sent via Resend API
- Branded per tenant (logo, colours injected as template variables)
- Templates: welcome, email-verification, invite, password-reset, inspection-submitted, inspection-approved, report-ready, report-viewed, trial-expiring (3 day + 1 day), payment-failed, weekly-digest, export-ready

---

## 19. Search & Data Export

### 19.1 Search
- PostgreSQL Full-Text Search with `tsvector` indexes on vehicles (make, model, VIN, plate) and inspections
- Search bar in header → global search across vehicles, inspections, users
- Filters: date range, status, inspector, vehicle type, grade

### 19.2 Data Export
- CSV export from Analytics page: inspections, defects, inspector metrics
- Full tenant data export (admin): all inspections, vehicles, photos (ZIP archive)
- Async job via BullMQ: generates export, uploads to S3, sends download link via email

---

## 20. Analytics & Business Intelligence

### 20.1 Dashboard KPIs
- Inspections today / this week / this month (with trend)
- Average completion time (with trend)
- Pass rate percentage (with trend)
- Pending review count

### 20.2 Analytics Charts (Apache ECharts)
- Inspections over time (bar + line: count + pass rate)
- Grade distribution (doughnut)
- Average completion time trend (line)
- Most common defects (ranked list)
- Inspector performance table (inspections, avg time, pass rate)

### 20.3 Data Aggregation
- Precomputed daily aggregates stored in `analytics_daily` table
- Nightly cron job via BullMQ scheduled job
- Real-time stats use database queries with caching (Redis, 5-minute TTL)

---

## 21. External Integrations

### 21.1 VIN Decoding
- **Primary:** NHTSA vPIC API (free, US data)
- **Fallback/AU:** Commercial provider (DataOne, CarJam, or RedBook)
- Cache decoded VIN data in `vehicles.vin_decoded_data` JSONB
- Rate limit: max 5 decodes/minute per tenant

### 21.2 PPSR (Vehicle History)
- Australian Personal Property Securities Register API
- Check for encumbrances, write-offs, stolen vehicles
- Store result in `vehicles.ppsr_status` with timestamp

### 21.3 DMS Integration (Enterprise - Phase 3+)
- Adapter pattern: `DmsAdapter` interface with implementations per DMS
- Initial targets: Pentana, DealerSocket, PBS
- Sync: vehicles, inspections, customer records
- Webhook-based or polling-based depending on DMS capabilities

### 21.4 Webhooks (Enterprise)
- Events: `inspection.created`, `inspection.completed`, `inspection.approved`, `report.generated`, `report.viewed`, `vehicle.created`
- Delivery: signed with HMAC-SHA256, retry 3 times with exponential backoff
- Webhook management UI in admin settings

---

## 22. Security & Compliance

### 22.1 Application Security
- **Authentication:** bcrypt password hashing (cost factor 12), JWT with short expiry (15 min), refresh token rotation
- **Encryption:** TLS 1.3 in transit, AES-256 at rest (S3 SSE, RDS encryption)
- **Input validation:** class-validator on all DTOs, SQL injection prevention via Prisma parameterized queries
- **XSS prevention:** Angular's built-in sanitization, Content-Security-Policy headers
- **CSRF:** SameSite cookie attribute, CSRF token for state-changing requests
- **Rate limiting:** per-tenant, per-user, per-endpoint (via Redis)
- **File upload validation:** mime-type checking, file size limits, virus scanning (ClamAV)
- **API security:** CORS whitelist, Helmet.js security headers, request size limits

### 22.2 Infrastructure Security
- **WAF:** AWS WAF on ALB (OWASP Top 10 rule sets)
- **DDoS:** AWS Shield Standard (included with ALB)
- **Secrets:** AWS Secrets Manager, never in code or environment variables
- **Network:** VPC with private subnets for RDS/ElastiCache, public subnet for ALB only
- **Access:** IAM roles with least privilege, no long-lived access keys

### 22.3 Compliance
- **Privacy:** Australian Privacy Act compliant, GDPR-ready (for future EU expansion)
- **Data residency:** AWS ap-southeast-2 (Sydney) for all data
- **Data retention:** Configurable per tenant (1, 2, 5 years, or indefinite)
- **Right to erasure:** Automated tenant data deletion pipeline (30 days after cancellation)
- **Data portability:** Full export available to all tenants at any time
- **Audit logging:** All create/update/delete actions logged with user, timestamp, IP

### 22.4 Legal Requirements
- Terms of Service (required before first customer)
- Privacy Policy
- Data Processing Agreement (DPA) template for Enterprise
- Report disclaimer (configurable per tenant)
- Cookie consent banner (GDPR)

### 22.5 Security Roadmap
- Penetration testing before SaaS launch (engage third-party)
- SOC 2 Type I by month 12, Type II by month 18
- Quarterly vulnerability scanning
- Annual security review

---

## 23. UI States & Error Handling

Every page and data-driven component must handle all four states. No page should ever show a blank screen.

### 23.1 Loading States

| Component | Loading Pattern |
|-----------|----------------|
| Dashboard stats | Skeleton cards (pulsing rectangles matching card dimensions) |
| Data tables (inspections, vehicles, users) | Skeleton table rows (5 rows of grey bars) |
| Inspection report | Full-page skeleton matching report layout |
| Form pages (profile, settings) | Skeleton form fields |
| Charts | Skeleton chart placeholder with grey box |
| Individual card/item | Inline skeleton matching content shape |

Implementation: Shared `<app-loading-skeleton>` component with `type` input (`'card'`, `'table-row'`, `'form'`, `'chart'`, `'text'`).

### 23.2 Empty States

Each entity list has a unique empty state with illustration, message, and call-to-action:

| Page | Message | CTA |
|------|---------|-----|
| Inspections list | "No inspections yet. Start your first vehicle inspection." | "New Inspection" button |
| Vehicles list | "No vehicles in your database. Add your first vehicle or start an inspection." | "Add Vehicle" button |
| Analytics | "Not enough data yet. Complete a few inspections to see analytics." | "Go to Inspections" link |
| Audit log | "No activity recorded yet." | (none) |
| Notifications | "You're all caught up! No new notifications." | (none) |
| Search results | "No results found for '{query}'. Try a different search term." | (none) |
| Vehicle history | "No inspections recorded for this vehicle yet." | "New Inspection" button |

### 23.3 Error States

| Error Type | UI Treatment |
|-----------|-------------|
| API 500 (server error) | Inline error card with retry button: "Something went wrong. Please try again." |
| API 404 (not found) | Full-page 404 with illustration: "This page doesn't exist." + link to dashboard |
| API 403 (forbidden) | Full-page 403: "You don't have permission to view this page." + link to dashboard |
| Network offline | Toast notification + offline banner in header: "You're offline. Changes will sync when you reconnect." |
| Form validation errors | Inline field-level error messages (red text below field) + summary at top of form |
| File upload failure | Toast with error detail + retry option |
| WebSocket disconnection | Subtle banner: "Real-time updates paused. Reconnecting..." (auto-retry with exponential backoff) |
| Session expired | Modal overlay: "Your session has expired. Please log in again." + redirect to login |

### 23.4 Session Expiry Warning

- 2 minutes before JWT access token expires, show a non-blocking modal: "Your session will expire soon. Click to stay logged in."
- Clicking "Stay logged in" triggers silent refresh token exchange
- If user doesn't respond and token expires, redirect to login with `returnUrl` param
- After re-login, redirect back to the page they were on

### 23.5 Cookie Consent Banner

- GDPR-compliant cookie consent banner shown on first visit (all pages)
- Two options: "Accept All" and "Manage Preferences"
- Preferences modal: Essential (always on), Analytics (optional), Marketing (optional)
- Consent stored in `localStorage` and sent as cookie preference to backend
- Banner does not reappear after user makes a choice (unless they clear storage)

### 23.6 Optimistic UI Updates

For frequently used actions, update UI immediately before API confirmation:
- Marking notification as read
- Toggling checklist item status (pass/fail/advisory)
- Adding/removing damage markers
- On API failure: revert UI state and show toast error

---

## 24. Testing Strategy

### 24.1 Frontend Testing
- **Unit tests (Vitest):** All services, pipes, guards, standalone components with logic. Vitest for ESM-native, fast execution with Vite compatibility.
- **Component tests:** Angular Testing Library + Vitest for key components
- **E2E tests (Playwright):** Critical user flows:
  - Signup → email verification → onboarding → first inspection
  - Full inspection lifecycle (create → auto-save → submit → approve → generate report → share)
  - Edit existing inspection (resume draft, edit submitted)
  - Vehicle CRUD (create, edit, view history)
  - Template builder (create template, add sections/items, reorder)
  - Global search (typeahead → full results page)
  - Billing (upgrade, downgrade via Stripe test mode)
  - Admin workflows (invite user, manage webhooks, export data)
  - Offline scenario (disconnect → queue responses → reconnect → sync)
  - Empty states (new tenant with no data)
  - Error handling (API failure → retry)
- **Visual regression:** Playwright screenshot comparison for key pages
- **Coverage target:** 80% unit, critical paths 100% E2E

### 24.2 Backend Testing
- **Unit tests (Vitest):** All services, guards, interceptors. Fast execution, TypeScript-native.
- **Integration tests:** API endpoints with test database (PostgreSQL in Docker via `testcontainers`)
- **Tenant isolation tests:** Automated tests verifying one tenant cannot access another's data (critical). Test both application layer (Prisma extension) and RLS policies.
- **Load tests:** k6 scripts for concurrent inspection scenarios (target: 100 concurrent users, <500ms p95 API latency)
- **Coverage target:** 85% unit, all API endpoints integration tested

### 24.3 Security Testing
- OWASP ZAP automated scans in CI
- Dependency vulnerability scanning (`npm audit` + Snyk)
- RLS policy tests (attempt cross-tenant access via raw SQL)
- CSRF/XSS validation tests

---

## 25. DevOps & Infrastructure

### 25.1 Environments
| Environment | Purpose | Database | URL |
|------------|---------|----------|-----|
| Local | Development | Docker Compose (PostgreSQL 17, Valkey 8, MinIO, Mailpit) | localhost:4200 (web), localhost:3000 (api) |
| Dev | Integration testing | Shared RDS dev instance | dev.autoinspect.com |
| Staging | Pre-production QA | Separate RDS staging | staging.autoinspect.com |
| Production | Live | Multi-AZ RDS | *.autoinspect.com |

### 25.2 Docker Configuration

**API Dockerfile (multi-stage):**
```dockerfile
# docker/Dockerfile.api
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json nx.json tsconfig.base.json ./
COPY libs/ ./libs/
COPY apps/api/ ./apps/api/
RUN npm ci --production=false
RUN npx nx build api --configuration=production

FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY --from=builder /app/dist/apps/api ./
COPY --from=builder /app/node_modules ./node_modules
COPY apps/api/prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
USER node
ENTRYPOINT ["dumb-init", "node", "main.js"]
```

**Web Dockerfile (multi-stage with nginx):**
```dockerfile
# docker/Dockerfile.web
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json nx.json tsconfig.base.json ./
COPY libs/ ./libs/
COPY apps/web/ ./apps/web/
RUN npm ci --production=false
RUN npx nx build web --configuration=production

FROM nginx:alpine AS runner
COPY --from=builder /app/dist/apps/web/browser /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### 25.3 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml — On PR:
name: CI
on: [pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - uses: nrwl/nx-set-shas@v4          # Nx affected calculation
      - run: npx nx affected -t lint        # Lint affected projects
      - run: npx nx affected -t test        # Unit tests (Vitest)
      - run: npx nx affected -t build       # Type check + build
      - run: npx nx affected -t e2e         # E2E tests (Playwright)
      - run: npm audit --audit-level=high   # Security scan

# .github/workflows/deploy-staging.yml — On merge to main:
name: Deploy Staging
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx nx run-many -t build --configuration=production
      - run: npx nx run api:prisma-migrate --configuration=staging
      # Build & push Docker images to ECR
      # Deploy to ECS Fargate (staging)
      # Run smoke tests against staging
      # Notify team on success/failure

# .github/workflows/deploy-production.yml — Manual trigger:
name: Deploy Production
on:
  workflow_dispatch:
    inputs:
      confirm:
        description: 'Type "deploy" to confirm'
        required: true
jobs:
  deploy:
    if: github.event.inputs.confirm == 'deploy'
    runs-on: ubuntu-latest
    steps:
      # Same as staging but targeting production
      # Blue/green deployment via ECS
      # Post-deploy health checks
      # Rollback on failure
```

### 25.4 Database Migrations
- Prisma Migrate for schema changes
- Zero-downtime strategy: additive changes first, backfill, then remove old columns
- Migration testing in staging before production

### 25.5 Backup & Disaster Recovery
- **RDS:** Automated daily backups (35-day retention), point-in-time recovery
- **S3:** Versioning enabled, cross-region replication to ap-southeast-1 (Singapore)
- **RPO:** < 1 hour (point-in-time recovery)
- **RTO:** < 4 hours (restore from backup + redeploy)
- **DR drills:** Quarterly restore test

---

## 26. Monitoring & Observability

### 26.1 Application Monitoring
- **Error tracking:** Sentry (frontend + backend)
- **APM:** Datadog or AWS X-Ray (request tracing, latency percentiles)
- **Logging:** Structured JSON logs → CloudWatch Logs → optional Datadog
- **Custom metrics:** inspections/hour, PDF generation time, API latency p95, error rate

### 26.2 Infrastructure Monitoring
- **CloudWatch:** CPU, memory, disk, network for all AWS services
- **RDS:** connections, IOPS, replication lag, storage
- **ElastiCache:** memory, evictions, hit rate
- **S3:** request count, storage size per tenant

### 26.3 Alerting
- PagerDuty or Opsgenie for on-call
- Alert thresholds:
  - API error rate > 5% → Warning
  - API error rate > 10% → Critical
  - p95 latency > 2s → Warning
  - RDS CPU > 80% → Warning
  - Disk usage > 85% → Critical

### 26.4 Health Check Endpoints

Every service exposes health check endpoints:

```typescript
// NestJS health module
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION,
      checks: {
        database: this.checkDatabase(),
        redis: this.checkRedis(),
        s3: this.checkS3(),
      }
    };
  }

  @Get('ready')
  readiness() { /* deeper checks for load balancer */ }

  @Get('live')
  liveness() { return { status: 'ok' }; /* simple alive check */ }
}
```

- `GET /health` — full health check (database, cache, storage)
- `GET /health/ready` — readiness probe for ECS/ALB
- `GET /health/live` — liveness probe (lightweight)
- ALB health check targets `/health/live` every 30 seconds

### 26.5 Status Page
- Public status page at status.autoinspect.com
- Automated incident detection → status page update
- Atlassian Statuspage or Better Stack

---

## 27. Go-to-Market Requirements

### 27.1 Marketing Website
- Landing page with hero, features, social proof, CTA
- Pricing page (with comparison table, FAQ, annual toggle)
- About / Team page
- Contact / Demo booking page (Calendly embed)
- Blog (SEO content)
- Case studies (post-pilot)

### 27.2 Legal Pages
- Terms of Service
- Privacy Policy
- Cookie Policy
- Data Processing Agreement (downloadable PDF)

### 27.3 Sales Motion
- **Primary:** Product-led growth (self-service signup, 14-day trial)
- **Secondary:** Sales-assisted for Enterprise (demo booking, custom pricing)
- **Channels:** Google Ads (keywords: "vehicle inspection software", "dealership inspection tool"), SEO, automotive industry publications, dealer group referrals

### 27.4 Onboarding & Support
- In-app onboarding wizard (first login)
- Knowledge base / help center (searchable articles)
- Live chat widget (Intercom or Crisp) for Professional + Enterprise
- Email support for all plans
- Demo sandbox environment for prospects

---

## 28. Development Phases & Milestones

### Phase 1 — MVP (Weeks 1–12)

**Goal:** Working single-tenant inspection tool deployed for pilot dealership.

| Sprint | Weeks | Deliverables |
|--------|-------|-------------|
| 1-2 | 1-4 | **Scaffolding:** Nx monorepo setup (Angular 19, NestJS 11, shared lib). Docker Compose (PostgreSQL 17, Valkey 8, MinIO, Mailpit). Prisma 6 schema + migrations from PRD SQL. GitHub Actions CI pipeline. **Auth:** Register, login, email verification, password reset, JWT + refresh tokens, RBAC guards. User management CRUD. App shell (sidebar, header, routing, mobile nav). Empty states + loading skeletons. |
| 3-4 | 5-8 | **Core inspection flow:** Vehicle intake + NHTSA VIN decode API. Checklist engine (template-driven reactive forms, auto-save to API). Photo capture + S3 presigned upload pipeline + Sharp thumbnail generation. Damage mapping (interactive SVG diagrams). Inspection lifecycle (draft → in progress → pending review → approved). Inspection editing (resume draft, edit submitted). |
| 5-6 | 9-12 | **Views & reports:** Dashboard with real stats (ECharts). Inspections list with filters + search. Vehicle list + detail/edit + history timeline. Internal PDF report generation (Playwright). Admin: template builder, settings, user invite. Global search (PG full-text search). Error states + error pages. QA + pilot deployment. |

**Exit criteria:** 10+ real inspections completed, < 5 critical bugs, all empty/error/loading states implemented.

### Phase 2 — Depth & SaaS Prep (Weeks 13–22)

| Sprint | Weeks | Deliverables |
|--------|-------|-------------|
| 7-8 | 13-16 | OBD-II Web Bluetooth integration + manual fallback. Customer-facing branded PDF reports (Playwright + tenant branding). Report sharing (link + email via Resend). Vehicle history database + timeline. Data export (CSV/Excel via BullMQ). |
| 9-10 | 17-20 | Analytics dashboard (ECharts: trends, grade distribution, inspector performance). Notification system (in-app + email + WebSocket real-time). Profile & account settings + 2FA setup. Billing page with usage meters. Cookie consent banner. Session expiry warning. |
| 11 | 21-22 | Multi-tenancy: tenant_id everywhere, RLS policies, subdomain routing, tenant middleware. Signup + onboarding wizard. Stripe billing integration (checkout, portal, webhooks, plan enforcement). Webhook management (Enterprise). |

**Exit criteria:** Feature-complete for SaaS. NPS > 40 from pilot users.

### Phase 3 — SaaS Launch (Weeks 23–30)

| Sprint | Weeks | Deliverables |
|--------|-------|-------------|
| 12-13 | 23-26 | Plan enforcement middleware. Self-service signup live. Pricing page. Marketing website. Legal pages (ToS, Privacy, Cookies). Health check endpoints. Monitoring (Sentry + CloudWatch). |
| 14-15 | 27-30 | Help center / knowledge base. Live chat widget (Intercom/Crisp). Status page (Better Stack). Penetration test + security audit. Load testing (k6) + performance optimization. Staging → production deploy pipeline. Public launch. |

**Exit criteria:** First paying external customer. All E2E tests passing. Status page live.

### Phase 4 — Growth (Weeks 31+)

- Public API + API key management + webhooks (Enterprise)
- SSO/SAML (Enterprise) via passport-saml
- DMS integrations (Pentana, DealerSocket, PBS)
- Customer portal (login-based, view own inspection history)
- AI damage detection from photos (ML model integration)
- Predictive pricing from inspection data
- Mobile companion app (Ionic/Capacitor, sharing Angular code + shared lib)
- White-label option (full branding removal for Enterprise)
- SOC 2 Type I certification (month 12)
- OpenSearch migration for search (scale)

---

## 29. Appendices

### 29.1 Design Tokens (CSS Custom Properties — from Prototype)

```css
/* styles/_variables.css — CSS custom properties (Tailwind 4.1 reads these natively) */
:root {
  /* Colors */
  --color-primary: #1a56db;
  --color-secondary: #0f172a;
  --color-accent: #f59e0b;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-danger: #dc2626;
  --color-info: #2563eb;

  /* Neutral palette */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 */
  /* Border radius: 4, 6, 8, 12, 16, 9999 */

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);

  /* Tenant branding overrides (injected at runtime) */
  --tenant-primary: var(--color-primary);
  --tenant-logo-url: '';
}
```

### 29.2 Environment Variables

```env
# .env.example — Template for local development (copy to .env)

# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:4200
APP_VERSION=0.0.1

# Database (local Docker)
DATABASE_URL=postgresql://autoinspect:localdev@localhost:5432/autoinspect_dev?schema=public

# Cache (local Docker — Valkey)
REDIS_URL=redis://localhost:6379

# Storage (local Docker — MinIO)
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET=autoinspect-media
AWS_S3_ENDPOINT=http://localhost:9000        # MinIO for local dev, remove for AWS
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_CLOUDFRONT_DOMAIN=                        # Empty for local dev

# Auth
JWT_SECRET=local-dev-secret-change-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PROFESSIONAL_PRICE_ID=price_xxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxx

# External APIs
NHTSA_API_URL=https://vpic.nhtsa.dot.gov/api
VIN_DECODE_PROVIDER_KEY=                      # Optional: commercial provider for AU
PPSR_API_KEY=                                 # Optional: for AU vehicle history

# Email (local Docker — Mailpit)
EMAIL_FROM=noreply@autoinspect.com
RESEND_API_KEY=                               # Empty for local (uses Mailpit SMTP)
SMTP_HOST=localhost                           # Mailpit for local dev
SMTP_PORT=1025

# Monitoring
SENTRY_DSN=                                   # Empty for local dev

# Feature Flags
ENABLE_OBD=true
ENABLE_WEBHOOKS=true
ENABLE_VIDEO_CAPTURE=true
```

**Production secrets** (stored in AWS Secrets Manager, never in `.env`):
- `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `DATABASE_URL`, `REDIS_URL`
- `RESEND_API_KEY`, `SENTRY_DSN`
- `VIN_DECODE_PROVIDER_KEY`, `PPSR_API_KEY`

### 29.3 Scaffolding Checklist

Quick-start commands to scaffold the project from zero:

```bash
# 1. Create Nx monorepo
npx create-nx-workspace@latest autoinspect-pro --preset=apps --ci=github

# 2. Add Angular app
npx nx add @nx/angular
npx nx g @nx/angular:app web --style=css --routing --standalone

# 3. Add NestJS app
npx nx add @nx/nest
npx nx g @nx/nest:app api

# 4. Add shared library
npx nx g @nx/js:lib shared --bundler=tsc

# 5. Add worker app (NestJS-based)
npx nx g @nx/nest:app worker

# 6. Install key dependencies
npm i @prisma/client @nestjs/passport passport passport-jwt
npm i @nestjs/swagger class-validator class-transformer
npm i @nestjs/bull bullmq ioredis
npm i @nestjs/websockets @nestjs/platform-socket.io
npm i stripe resend sharp playwright-core
npm i -D prisma vitest @playwright/test tailwindcss

# 7. Initialize Prisma
cd apps/api && npx prisma init

# 8. Start Docker services
docker compose -f docker/docker-compose.yml up -d

# 9. Run first migration
npx nx run api:prisma-migrate -- --name init

# 10. Seed database
npx nx run api:prisma-seed

# 11. Start development
npx nx run-many -t serve --projects=api,web,worker
```

### 29.4 Glossary

| Term | Definition |
|------|-----------|
| CDK | AWS Cloud Development Kit |
| DMS | Dealer Management System |
| DTC | Diagnostic Trouble Code (OBD-II) |
| ELM327 | Common OBD-II adapter chipset |
| MinIO | S3-compatible local object storage for development |
| Nx | Monorepo build system with dependency graph and caching |
| PPSR | Personal Property Securities Register (Australia) |
| PWA | Progressive Web App |
| RBAC | Role-Based Access Control |
| RLS | Row-Level Security (PostgreSQL) |
| SST | Serverless Stack — IaC framework for AWS full-stack apps |
| Valkey | Open-source Redis-compatible in-memory store (AWS ElastiCache default) |
| VIN | Vehicle Identification Number (17 characters) |

---

*End of Document*
