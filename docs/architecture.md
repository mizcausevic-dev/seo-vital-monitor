# SEO Vital Monitor Architecture

## Purpose

`seo-vital-monitor` models the SEO performance layer that sits between frontend releases and inbound demand quality. It turns Core Web Vitals drift, Lighthouse regression, and route-level degradation into clear priorities before acquisition performance erodes.

## Application Shape

- `src/app.ts`
  - Express entrypoint
  - HTML routes for overview, vitals lane, route regressions, verification, and docs
  - JSON routes for summary, vitals lane, route regressions, and sample payloads
- `src/data/sampleVitals.ts`
  - modeled route metrics
  - release regression comparisons
  - business-impact framing
- `src/services/seoVitalService.ts`
  - summary calculations
  - machine-readable route outputs
  - verification claims
- `src/services/render.ts`
  - operator UI shell
  - overview metrics and route tables
  - regression comparison views

## Control Surface Logic

### Overview
- shows how many routes are healthy, watch, or critical
- translates vitals and SEO drift into acquisition-risk language
- keeps route-level sensitivity visible for Growth and Engineering teams

### Vitals Lane
- makes page-level performance decisions legible
- compares LCP, CLS, INP, Lighthouse SEO, and organic sensitivity together
- demonstrates how one route can become a revenue problem before the whole site looks unhealthy

### Route Regressions
- summarizes what changed between releases
- keeps delta explanations and estimated acquisition loss visible together
- helps explain why performance monitoring belongs in release review, not just in a monthly SEO report

### Verification
- lists the core claims the build is proving
- keeps the README screenshots tied to real modeled behavior

## Why This Repo Matters

The repo shows how SEO performance monitoring can be framed as revenue infrastructure:

- cleaner route-level release accountability
- earlier recovery of performance-sensitive conversion pages
- better alignment between engineering and acquisition teams
- stronger trust in how releases affect organic growth
