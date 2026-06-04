# SEO Vital Monitor

Board-ready Kinetic Gain surface for Core Web Vitals, Lighthouse regressions, and route-level SEO performance drift.

- Live: [http://vitals.kineticgain.com/](http://vitals.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/seo-vital-monitor](https://github.com/mizcausevic-dev/seo-vital-monitor)

## Why this exists

SEO performance decay is often treated like a slow analytics problem after the damage is already visible. By then:
- pricing and conversion routes are already slower than they should be
- route-level regressions get buried inside one blended site average
- metadata and vitals drift compound across releases
- organic acquisition weakens before growth teams know which deploy caused it

`seo-vital-monitor` turns route-level performance drift into an acquisition-readable control plane before Core Web Vitals degradation becomes a search and conversion problem.

## What it includes

- TypeScript control plane for Core Web Vitals, Lighthouse SEO, and route-level release regressions
- synthetic vitals lane covering pricing, docs, blog, and demand-entry routes
- reusable outputs for route risk, acquisition loss, regression posture, and release ownership
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/vitals-lane`
- `/route-regressions`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/vitals-lane`
- `/api/route-regressions`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Vitals lane](./screenshots/02-vitals-lane-proof.png)
![Route regressions](./screenshots/03-route-regressions-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd seo-vital-monitor
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5372/](http://127.0.0.1:5372/)
- [http://127.0.0.1:5372/vitals-lane](http://127.0.0.1:5372/vitals-lane)
- [http://127.0.0.1:5372/route-regressions](http://127.0.0.1:5372/route-regressions)
- [http://127.0.0.1:5372/verification](http://127.0.0.1:5372/verification)
- [http://127.0.0.1:5372/docs](http://127.0.0.1:5372/docs)

## Validation

- `npm run verify`
- `npm run prerender`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
