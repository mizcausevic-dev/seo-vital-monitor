import { regressions, summary, verification, vitalLane } from "./seoVitalService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/vitals-lane", label: "Vitals Lane" },
    { href: "/route-regressions", label: "Route Regressions" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #091019;
        --panel-soft: rgba(18, 29, 45, 0.84);
        --line: rgba(149, 181, 255, 0.14);
        --text: #f5f7ff;
        --muted: #9eb2d1;
        --accent: #58d39f;
        --accent-strong: #53a9ff;
        --good: #35d59d;
        --watch: #f0bf54;
        --bad: #ff788f;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(88, 211, 159, 0.15), transparent 28%),
          radial-gradient(circle at top right, rgba(83, 169, 255, 0.14), transparent 26%),
          linear-gradient(180deg, #061019 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line); border-radius: 24px;
        background: rgba(7, 14, 26, 0.82); box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand { display: flex; align-items: center; gap: 14px; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow { margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: #95d8b6; }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(16, 27, 43, 0.9); color: #d7e6ff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(88, 211, 159, 0.95), rgba(83, 169, 255, 0.92));
        border-color: transparent; color: white; box-shadow: 0 10px 24px rgba(73, 165, 210, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px; border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 940px; font-size: clamp(40px, 4.9vw, 68px);
        line-height: 0.96; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 21px; line-height: 1.5; color: #b8c8e4; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel-soft); }
      .metric-label { color: #8fb6ea; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #8fb6ea; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #e9f1ff; font-size: 14px; line-height: 1.45; }
      .badge { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
      .healthy { background: rgba(53, 213, 157, 0.14); color: var(--good); }
      .watch { background: rgba(240, 191, 84, 0.14); color: var(--watch); }
      .critical { background: rgba(255, 120, 143, 0.14); color: var(--bad); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #dbe7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      .footer-note { margin-top: 20px; color: #88a5d4; font-size: 13px; letter-spacing: 0.04em; }
      @media (max-width: 1100px) {
        .metrics, .cols-2 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">SV</div>
          <div>
            <p class="eyebrow">Digital Intelligence</p>
            <h1 class="brand-title">SEO Vital Monitor</h1>
            <p class="brand-subtitle">Core Web Vitals and SEO drift in acquisition language.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const regressionMarkup = regressions()
    .map(
      (item) => `
      <tr>
        <td>${item.route}</td>
        <td><span class="badge ${item.impact}">${item.impact}</span></td>
        <td>${item.biggestShift}</td>
        <td>${item.estimatedLossPct}%</td>
        <td>${item.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">SEO Performance Control Plane</p>
      <h1>Search performance drift should be visible before it becomes an acquisition problem.</h1>
      <p>Monitor Core Web Vitals, Lighthouse SEO, and route-level release regressions so engineering and growth can see which pages are putting inbound velocity at risk.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Routes</div>
          <div class="metric-value">${stats.routeCount}</div>
          <div class="metric-copy">Modeled routes currently tracked for vitals and SEO regression posture.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Critical</div>
          <div class="metric-value">${stats.critical}</div>
          <div class="metric-copy">Routes already below safe performance thresholds for revenue-sensitive search entry.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Watch</div>
          <div class="metric-value">${stats.watch}</div>
          <div class="metric-copy">Routes drifting toward a search or conversion regression if the next release lands unchanged.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Avg SEO</div>
          <div class="metric-value">${stats.avgSeo}</div>
          <div class="metric-copy">Average Lighthouse SEO score across the modeled route set.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Avg LCP</div>
          <div class="metric-value">${stats.avgLcp}ms</div>
          <div class="metric-copy">Current average Largest Contentful Paint across monitored pages.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to recover first</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <p class="footer-note">Best use case: keep pricing, blog, and documentation routes from silently eroding organic acquisition and conversion quality.</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Coverage</p>
          <h2 class="section-title">What this repo makes measurable</h2>
          <ul class="clean">
            <li><strong>Core Web Vitals</strong> — route-level LCP, CLS, and INP tied to revenue-sensitive pages.</li>
            <li><strong>Release regressions</strong> — explicit comparisons between prior and current builds.</li>
            <li><strong>SEO health</strong> — Lighthouse score and organic sensitivity kept in the same decision surface.</li>
          </ul>
        </article>
      </div>
      <article class="panel">
        <p class="eyebrow">Route Regressions</p>
        <h2 class="section-title">The release deltas most likely to reduce inbound performance.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Impact</th>
              <th>Biggest Shift</th>
              <th>Estimated Loss</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${regressionMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("SEO Vital Monitor", "/", body);
}

export function renderVitalsLane() {
  const rows = vitalLane()
    .map(
      (route) => `
      <tr>
        <td>${route.route}</td>
        <td>${route.release}</td>
        <td><span class="badge ${route.health}">${route.health}</span></td>
        <td>${route.lcpMs}ms</td>
        <td>${route.cls}</td>
        <td>${route.inpMs}ms</td>
        <td>${route.lighthouseSeo}</td>
        <td>${route.organicSharePct}%</td>
        <td>${route.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Vitals Lane</p>
      <h1>Every route should show its acquisition risk clearly.</h1>
      <p>This lane keeps the actual page metrics visible enough that performance drift cannot hide behind a passing deploy or a single blended site average.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Route Metrics</p>
        <h2 class="section-title">Vitals posture by route and release.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Release</th>
              <th>Health</th>
              <th>LCP</th>
              <th>CLS</th>
              <th>INP</th>
              <th>SEO</th>
              <th>Organic Share</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("SEO Vital Monitor - Vitals Lane", "/vitals-lane", body);
}

export function renderRegressions() {
  const cards = regressions()
    .map(
      (item) => `
      <article class="panel">
        <p class="eyebrow">Regression ${item.id}</p>
        <h2 class="section-title">${item.route}</h2>
        <p class="section-copy">${item.explanation}</p>
        <ul class="clean">
          <li><strong>Prior release:</strong> ${item.priorRelease}</li>
          <li><strong>Current release:</strong> ${item.currentRelease}</li>
          <li><strong>Biggest shift:</strong> ${item.biggestShift}</li>
          <li><strong>Estimated acquisition loss:</strong> ${item.estimatedLossPct}%</li>
        </ul>
      </article>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Route Regressions</p>
      <h1>Release comparisons should explain why search performance moved.</h1>
      <p>These route deltas turn Lighthouse and vitals changes into a practical priority list instead of a passive report that nobody owns.</p>
    </section>
    <section class="section">
      ${cards}
    </section>`;

  return layout("SEO Vital Monitor - Route Regressions", "/route-regressions", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves SEO monitoring belongs in the revenue stack.</h1>
      <p>The point is not just to collect vitals. The point is to surface which pages are already weakening acquisition quality and which release decisions caused that drift.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("SEO Vital Monitor - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as an SEO and vitals control plane for engineering and growth teams.</h1>
      <p>This repo sits at the intersection of performance telemetry, release quality, and inbound demand protection. It is designed to show how route-level drift becomes a business issue long before rankings visibly collapse.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and acquisition-risk posture</li>
            <li><code>/vitals-lane</code> route-level Core Web Vitals and SEO scores</li>
            <li><code>/route-regressions</code> release-to-release delta review</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/vitals-lane</code></li>
            <li><code>/api/route-regressions</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("SEO Vital Monitor - Docs", "/docs", body);
}
