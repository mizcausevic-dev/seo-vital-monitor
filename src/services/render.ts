import { regressions, summary, verification, vitalLane } from "./seoVitalService";
import type { Health } from "../data/sampleVitals";

function esc(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function seal(tone: Health, label: string) {
  return `<span class="seal ${tone}">${esc(label)}</span>`;
}

function fraction(numerator: number, denominator: number) {
  return `<span class="fraction"><span class="fraction-num">${numerator}</span><span class="fraction-slash" aria-hidden="true">⁄</span><span class="fraction-den">${denominator}</span></span>`;
}

function tallies(pct: number) {
  const count = Math.max(0, Math.round(pct / 5));
  const groups = Math.max(1, Math.ceil(count / 5));
  const width = groups * 36;
  let marks = "";

  for (let index = 0; index < count; index += 1) {
    const group = Math.floor(index / 5);
    const place = index % 5;
    const origin = group * 36 + 4;
    if (place < 4) {
      const x = origin + place * 6;
      marks += `<line x1="${x}" y1="3" x2="${x}" y2="25" />`;
    } else {
      marks += `<line x1="${origin - 1}" y1="23" x2="${origin + 20}" y2="2" />`;
    }
  }

  return `<svg class="tally" viewBox="0 0 ${width} 28" width="${width}" height="28" role="img" aria-label="${count} tally marks, five points each">${marks}</svg>`;
}

function caliper(label: string, valueLabel: string, value: number, good: number, ni: number, max: number) {
  const mark = Math.max(0, Math.min(100, (value / max) * 100));
  const goodAt = (good / max) * 100;
  const niAt = (ni / max) * 100;
  const zone = value <= good ? "good" : value <= ni ? "needs work" : "poor";

  return `<div class="caliper">
    <div class="caliper-read">
      <span>${esc(label)}</span>
      <strong>${esc(valueLabel)}</strong>
      <em>${zone}</em>
    </div>
    <div class="caliper-track">
      <span class="zone zone-good" style="inline-size:${goodAt}%"></span>
      <span class="zone zone-mid" style="inline-size:${niAt - goodAt}%"></span>
      <span class="zone zone-poor" style="inline-size:${100 - niAt}%"></span>
      <span class="jaw" style="inset-inline-start:${mark}%"></span>
    </div>
  </div>`;
}

function stationTape() {
  const shortName: Record<string, string> = {
    "/": "home",
    "/pricing": "/pricing",
    "/blog/seo-governance": "blog",
    "/case-studies/platform-reliability": "cases",
    "/docs/aeo-linter": "docs"
  };
  const items = vitalLane()
    .map((route) => {
      const label = shortName[route.route] ?? route.route;
      return `<li class="${route.health}" style="flex-grow:${route.organicSharePct}">
        <a href="/vitals-lane" title="${esc(route.route)}">
          <span class="peg-route">${esc(label)}</span>
          <span class="sr">${esc(route.route)}</span>
          <span class="peg-share">${route.organicSharePct}%</span>
        </a>
        <span class="peg-dot" aria-hidden="true"></span>
      </li>`;
    })
    .join("");

  return `<ol class="tape">${items}</ol>`;
}

function releaseSlip(item: ReturnType<typeof regressions>[number]) {
  return `<article class="slip">
    <div class="slip-body">
      <header class="slip-head">
        ${seal(item.impact, item.impact)}
        <div>
          <p class="slip-id">${esc(item.id)}</p>
          <h2>${esc(item.route)}</h2>
        </div>
      </header>
      <p class="shift">${esc(item.biggestShift)}</p>
      <p>${esc(item.explanation)}</p>
      <p class="slip-when"><span>Prior ${esc(item.priorRelease)}</span><span>Now ${esc(item.currentRelease)}</span></p>
    </div>
    <aside class="slip-stub">
      <p>Tear off</p>
      <strong>${item.estimatedLossPct}%</strong>
      ${tallies(item.estimatedLossPct)}
      <p>est. loss</p>
    </aside>
  </article>`;
}

function layout(title: string, activePath: string, margin: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/vitals-lane", label: "Vitals lane" },
    { href: "/route-regressions", label: "Regressions" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const current = item.href === activePath ? ` aria-current="page"` : "";
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Brygada+1918:ital,wght@0,500;0,700;1,500&family=Petrona:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,450&family=Sono:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      @layer reset, base, layout, pieces;

      @layer reset {
        :where(html) { box-sizing: border-box; }
        :where(*), :where(*::before), :where(*::after) { box-sizing: inherit; }
        :where(body, h1, h2, h3, p, ul, ol, dl, figure, blockquote) { margin: 0; }
        :where(ul, ol) { padding: 0; }
      }

      @layer base {
        :root {
          --cloth: #1e2824;
          --cloth-ink: #f3ead7;
          --manila: #e4d0ae;
          --paper: #f6f0e2;
          --paper-2: #fffaf0;
          --ink: #241c16;
          --muted: #5e5348;
          --red: #b42318;
          --healthy: #1d5c3b;
          --watch: #8a4b08;
          --critical: #9d1c14;
          --line: color-mix(in srgb, var(--ink) 22%, transparent);
          --display: "Brygada 1918", "Iowan Old Style", Palatino, "Palatino Linotype", Georgia, serif;
          --body: "Petrona", Palatino, "Palatino Linotype", Georgia, serif;
          --mono: "Sono", ui-monospace, "Cascadia Code", "Segoe UI Mono", monospace;
        }

        html { color-scheme: light; }

        body {
          margin: 0;
          background: var(--cloth);
          color: var(--ink);
          font-family: var(--body);
          font-size: 1.0625rem;
          line-height: 1.5;
          text-align: start;
        }

        h1, h2, h3 {
          font-family: var(--display);
          font-weight: 700;
          line-height: 1.08;
          text-wrap: balance;
        }

        p, li, blockquote, .deck, .why { text-wrap: pretty; }
        a { color: inherit; }
        a:focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }
        ::selection { background: #f0c2b4; color: var(--ink); }
        code, .mono { font-family: var(--mono); }
      }

      @layer layout {
        .skip {
          position: absolute;
          inset-inline-start: 0.5rem;
          inset-block-start: 0.5rem;
          transform: translateY(-150%);
          background: var(--paper);
          color: var(--ink);
          padding: 0.4rem 0.7rem;
          z-index: 3;
        }
        .skip:focus { transform: none; }

        .desk {
          display: grid;
          grid-template-columns: 12.75rem minmax(0, 1fr);
          min-height: 100vh;
        }

        .binder {
          position: sticky;
          inset-block-start: 0;
          align-self: start;
          min-height: 100vh;
          padding: 1.4rem 0 1.4rem 1rem;
          color: var(--cloth-ink);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .stitches { display: flex; flex-direction: column; gap: 0.7rem; }
        .stitches span {
          display: block;
          inline-size: 1.15rem;
          block-size: 2px;
          background: #e7d3a1;
          box-shadow: 0 5px 0 #121916, 0 7px 0 #e7d3a1;
        }

        .wordmark { padding-inline-end: 0.8rem; }
        .binder { z-index: 2; }
        .wordmark .over {
          font-family: var(--mono);
          font-size: 0.78rem;
        }
        .wordmark strong {
          display: block;
          margin-block-start: 0.2rem;
          font-family: var(--display);
          font-size: clamp(2rem, 1.4rem + 1vw, 2.7rem);
          font-weight: 700;
          line-height: 0.88;
          font-style: italic;
        }
        .wordmark em {
          display: block;
          margin-block-start: 0.35rem;
          font-family: var(--mono);
          font-style: normal;
          font-size: 0.82rem;
          color: #d9c7a4;
        }

        .binder nav { display: flex; flex-direction: column; gap: 0.4rem; margin-block-start: auto; }
        .binder nav a {
          display: block;
          min-block-size: 2.75rem;
          padding: 0.7rem 1.3rem 0.7rem 0.75rem;
          background: var(--manila);
          color: var(--ink);
          text-decoration: none;
          font-family: var(--display);
          font-size: 1.15rem;
          line-height: 1.1;
          clip-path: polygon(0 0, calc(100% - 0.85rem) 0, 100% 50%, calc(100% - 0.85rem) 100%, 0 100%);
        }
        .binder nav a:hover { background: #f3e4c4; }
        .binder nav a[aria-current="page"] {
          background: var(--paper);
          margin-inline-end: -0.7rem;
          position: relative;
          z-index: 1;
        }

        .sheet {
          container: sheet / inline-size;
          margin-block: 0.9rem;
          margin-inline-end: 0.9rem;
          background: var(--paper);
          color: var(--ink);
          box-shadow: 0.45rem 0.45rem 0 #101614;
          min-height: calc(100vh - 1.8rem);
        }

        .folio {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.7rem 1.2rem;
          border-block-end: 1px solid var(--ink);
          font-family: var(--mono);
          font-size: 0.78rem;
        }

        .page {
          display: grid;
          grid-template-columns: 8.5rem minmax(0, 1fr);
          min-height: 28rem;
        }

        .margin {
          border-inline-end: 3px solid var(--red);
          padding: 1rem 0.75rem 1rem 0.85rem;
          color: var(--red);
          font-family: var(--display);
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.25;
        }

        .matter { padding: 1.15rem 1.35rem 1.6rem; min-inline-size: 0; }
        .lede { max-inline-size: 40rem; }
        .kicker {
          font-family: var(--mono);
          font-size: 0.78rem;
          font-variant: small-caps;
          letter-spacing: 0.06em;
          color: var(--red);
        }
        .lede h1 { margin-block-start: 0.35rem; font-size: clamp(2.2rem, 1.2rem + 2.5vw, 3.7rem); max-inline-size: 18ch; }
        .deck { margin-block-start: 0.8rem; max-inline-size: 62ch; font-size: 1.125rem; color: var(--ink); }

        .colophon {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 0.8rem 1.2rem 1rem;
          border-block-start: 1px solid var(--ink);
          font-family: var(--mono);
          font-size: 0.75rem;
          line-height: 1.45;
          color: var(--muted);
        }
        .colophon strong { color: var(--ink); font-weight: 600; }
        .proofs { display: flex; gap: 1rem; flex-wrap: wrap; }
      }

      @layer pieces {
        .figures {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin-block: 1.3rem 1.1rem;
          border-block: 1px solid var(--ink);
          background-color: var(--paper-2);
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 1.55rem,
            rgba(176, 132, 78, 0.28) 1.55rem,
            rgba(176, 132, 78, 0.28) calc(1.55rem + 1px)
          );
        }
        .figures div { padding: 0.65rem 0.75rem 0.8rem; }
        .figures div:not(:last-child) { border-inline-end: 1px solid var(--line); }
        .figures dt { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }
        .figures .value {
          margin: 0.35rem 0 0;
          font-family: var(--mono);
          font-size: clamp(1.7rem, 1rem + 1.6vw, 2.45rem);
          font-weight: 600;
          line-height: 1;
          font-variant-numeric: tabular-nums lining-nums;
        }
        .figures .note { margin: 0.45rem 0 0; font-size: 0.82rem; max-inline-size: 24ch; color: var(--muted); }

        .tape {
          display: flex;
          align-items: flex-end;
          list-style: none;
          margin: 0.4rem 0 1.4rem;
          border-block-end: 2px solid var(--ink);
          background-image: repeating-linear-gradient(
            90deg,
            transparent 0 15px,
            rgba(36, 28, 22, 0.18) 15px 16px
          );
        }
        .sr {
          position: absolute;
          inline-size: 1px;
          block-size: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .tape li {
          position: relative;
          flex-shrink: 0;
          flex-basis: 6.75rem;
          padding: 0.45rem 0.55rem 0.95rem;
          border-inline-end: 1px solid var(--line);
        }
        .tape a { display: flex; flex-direction: column; align-items: flex-end; text-decoration: none; text-align: end; }
        .tape a:hover .peg-route { background: #f6de8a; }
        .peg-route { font-family: var(--mono); font-size: 0.78rem; overflow-wrap: anywhere; }
        .peg-share { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }
        .peg-dot {
          position: absolute;
          inset-inline-end: -0.38rem;
          inset-block-end: -0.38rem;
          inline-size: 0.7rem;
          block-size: 0.7rem;
          border: 2px solid var(--ink);
          border-radius: 50%;
          background: var(--paper);
        }
        .tape .critical .peg-dot { background: var(--critical); border-color: var(--critical); }
        .tape .watch .peg-dot { background: #e6b15a; }
        .tape .healthy .peg-dot { background: #8fbf9f; }
        .tape-caption { font-family: var(--mono); font-size: 0.75rem; color: var(--muted); margin-block-end: 0.2rem; }

        .caliper { margin-block: 0.85rem 0.35rem; }
        .caliper-read {
          display: flex;
          gap: 0.8rem;
          align-items: baseline;
          font-family: var(--mono);
          font-size: 0.78rem;
        }
        .caliper-read strong { font-size: 1rem; font-weight: 600; }
        .caliper-read em { font-style: normal; color: var(--muted); }
        .caliper-track {
          position: relative;
          display: flex;
          block-size: 0.55rem;
          margin-block-start: 0.55rem;
          background: transparent;
        }
        .zone { display: block; flex: none; block-size: 100%; }
        .zone-good { background: #c9d7c4; }
        .zone-mid { background: #ead3a4; }
        .zone-poor { background: #e7b6ae; }
        .jaw {
          position: absolute;
          inset-block-start: -0.62rem;
          inline-size: 0.95rem;
          block-size: 0.72rem;
          background: var(--ink);
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          transform: translateX(-50%);
        }
        .scale-note { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }

        .seal {
          inline-size: 4.7rem;
          block-size: 4.7rem;
          display: grid;
          place-items: center;
          border: 2px solid currentColor;
          border-radius: 50%;
          box-shadow: inset 0 0 0 3px var(--paper), inset 0 0 0 4.5px currentColor;
          font-family: var(--display);
          font-style: italic;
          font-size: 0.95rem;
          line-height: 0.95;
          text-align: center;
          transform: rotate(-8deg);
          flex: none;
        }
        .seal.healthy { color: var(--healthy); transform: rotate(6deg); }
        .seal.watch { color: var(--watch); transform: rotate(-3deg); }
        .seal.critical { color: var(--critical); }

        .fraction {
          display: inline-flex;
          align-items: end;
          gap: 0.08em;
          font-family: var(--mono);
          font-variant-numeric: tabular-nums lining-nums;
          line-height: 0.8;
        }
        .fraction-num { font-size: 1em; font-weight: 600; }
        .fraction-den { font-size: 0.62em; }
        .fraction-slash { font-size: 0.9em; }

        .tally { display: block; color: var(--ink); margin-inline: auto; }
        .tally line { stroke: currentColor; stroke-width: 1.5; }

        .query {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(12rem, 0.8fr);
          gap: 1.2rem;
          margin-block: 0.4rem 1.2rem;
          align-items: start;
        }
        .query blockquote {
          font-family: var(--display);
          font-style: italic;
          font-size: clamp(1.45rem, 1rem + 1.2vw, 2rem);
          line-height: 1.2;
          max-inline-size: 28ch;
        }
        .query p { max-inline-size: 36ch; }

        .slip { display: grid; grid-template-columns: minmax(0, 1fr) 8.75rem; border-block-start: 1px solid var(--ink); }
        .slip-body { padding: 1rem 1rem 1.1rem 0; }
        .slip-head { display: flex; gap: 0.9rem; align-items: center; }
        .slip-head h2 { font-size: clamp(1.5rem, 1rem + 1vw, 2.1rem); }
        .slip-id, .slip-when, .slip-stub p { font-family: var(--mono); font-size: 0.75rem; color: var(--muted); }
        .shift { margin-block: 0.55rem 0.35rem; font-weight: 600; }
        .slip-when { display: flex; gap: 1rem; margin-block-start: 0.55rem; }
        .slip-stub {
          border-inline-start: 2px dotted var(--ink);
          background-color: var(--paper-2);
          background-image: radial-gradient(circle at left, #d9cbb4 0.22rem, transparent 0.26rem);
          background-size: 100% 0.95rem;
          text-align: center;
          padding: 0.9rem 0.45rem;
        }
        .slip-stub strong {
          display: block;
          font-family: var(--mono);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1;
          margin-block: 0.25rem 0.35rem;
        }

        .route { padding-block: 1rem; border-block-end: 1px solid var(--ink); }
        .route-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 0.9rem; align-items: center; }
        .route h2 { font-size: clamp(1.6rem, 1rem + 1.4vw, 2.3rem); overflow-wrap: anywhere; }
        .route-id, .release { font-family: var(--mono); font-size: 0.75rem; color: var(--muted); }
        .route-side { text-align: end; font-family: var(--mono); font-size: 0.78rem; }
        .route-side .fraction { font-size: 2rem; }
        .why { margin-block-start: 0.45rem; max-inline-size: 68ch; }
        .calipers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8rem 1rem; }

        .claims { list-style: none; }
        .claims li {
          display: grid;
          grid-template-columns: 2rem minmax(0, 1fr);
          gap: 0.6rem;
          padding-block: 0.85rem;
          border-block-end: 1px solid var(--line);
          max-inline-size: 70ch;
        }
        .claims .mark { color: var(--red); font-family: var(--display); font-size: 1.4rem; line-height: 1; }

        .index { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; margin-block-start: 1rem; }
        .index h2 { font-size: 1.7rem; }
        .index li { margin-block-start: 0.45rem; }
        .index code { font-size: 0.92rem; }

        .notes { margin-block-start: 1.4rem; border-block-start: 3px solid var(--ink); padding-block-start: 0.8rem; }
        .notes h2 { font-size: clamp(1.8rem, 1rem + 1.5vw, 2.4rem); }
        .notes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 2rem; margin-block-start: 0.8rem; }
        .notes h3 { font-size: 1.35rem; font-weight: 500; font-style: italic; }
        .notes p { max-inline-size: 58ch; }
        .drop::first-letter {
          font-family: var(--display);
          font-weight: 700;
          float: inline-start;
          font-size: 3.2em;
          line-height: 0.8;
          padding-inline-end: 0.06em;
          color: var(--red);
        }

        @container sheet (max-width: 860px) {
          .figures { grid-template-columns: 1fr 1fr; }
          .page, .query, .route-head, .calipers, .index, .notes-grid, .slip { grid-template-columns: 1fr; }
          .margin { border-inline-end: 0; border-block-end: 3px solid var(--red); }
          .slip-stub { border-inline-start: 0; border-block-start: 2px dotted var(--ink); }
          .route-side { text-align: start; }
        }
      }

      @media (max-width: 760px) {
        .desk { grid-template-columns: 1fr; }
        .binder { position: static; min-height: 0; padding: 0.9rem; }
        .binder nav { flex-direction: row; overflow-x: auto; margin-block-start: 0.4rem; }
        .binder nav a { clip-path: none; white-space: nowrap; }
        .binder nav a[aria-current="page"] { margin-inline-end: 0; }
        .sheet { margin: 0; box-shadow: none; }
        .folio, .colophon { flex-direction: column; }
      }

      @media (forced-colors: active) {
        .zone, .seal, .peg-dot, .jaw { forced-color-adjust: auto; }
        .caliper-track { border-block-end: 1px solid CanvasText; }
      }
    </style>
  </head>
  <body>
    <a class="skip" href="#matter">Skip to the ledger</a>
    <div class="desk">
      <aside class="binder">
        <div class="stitches" aria-hidden="true"><span></span><span></span><span></span></div>
        <p class="wordmark">
          <span class="over">SEO</span>
          <strong>Vital Monitor</strong>
          <em>route ledger</em>
        </p>
        <nav aria-label="Sections">${nav}</nav>
      </aside>
      <article class="sheet">
        <p class="folio"><span>Vol. I · No. 23</span><span>23 May 2026</span><span>Acquisition desk</span></p>
        <div class="page">
          <aside class="margin">${esc(margin)}</aside>
          <div class="matter" id="matter">
            ${body}
          </div>
        </div>
        <footer class="colophon">
          <p><strong>Colophon.</strong> Brygada 1918 for titles, Petrona for the story, Sono for the figures. Seeded route model, not a live crawl.</p>
          <p class="proofs"><span>¶ claim</span><span>† route</span><span>‡ release</span></p>
        </footer>
      </article>
    </div>
  </body>
</html>`;
}

function renderFiledNotes() {
  return `
    <section class="notes">
      <h2>Filed with the desk</h2>
      <div class="notes-grid">
        <article>
          <h3>What this product does</h3>
          <p class="drop">SEO Vital Monitor turns Core Web Vitals, Lighthouse SEO, route regressions, organic sensitivity, and release ownership into one acquisition-risk surface. Non-technical leaders see which pages threaten pipeline. Technical teams see the metric, route, release, and regression evidence behind the recommendation.</p>
        </article>
        <article>
          <h3>Where growth teams use it</h3>
          <p>Use it to prioritize pricing, docs, blog, and demand-entry routes by acquisition risk instead of treating performance as an engineering-only score. It shows where a release is likely to reduce discoverability, conversion quality, or inbound velocity.</p>
        </article>
        <article>
          <h3>Where revenue leaks</h3>
          <p>The system surfaces leakage from slow pages, ranking-sensitive routes, poor release comparisons, invisible vitals drift, and technical regressions that make paid and organic demand work harder than necessary.</p>
        </article>
        <article>
          <h3>What is inspectable</h3>
          <p>Static routes, API-style outputs, seeded vitals data, route-level regressions, verification checks, prerendering, tests, smoke checks, and screenshot generation keep this as a real operator surface rather than generic SEO copy.</p>
        </article>
      </div>
      <p class="deck">Each Kinetic Gain surface keeps owner, signal, model, risk, value, route, and verification visible together.</p>
    </section>`;
}

export function renderOverview() {
  const stats = summary();
  const slips = regressions().map((item) => releaseSlip(item)).join("");
  const body = `
    <header class="lede">
      <p class="kicker">SEO performance control plane</p>
      <h1>Search performance drift should be visible before it becomes an acquisition problem.</h1>
      <p class="deck">Monitor Core Web Vitals, Lighthouse SEO, and route-level release regressions so engineering and growth can see which pages are putting inbound velocity at risk.</p>
    </header>
    <dl class="figures">
      <div>
        <dt>Routes</dt>
        <dd class="value">${stats.routeCount}</dd>
        <dd class="note">Modeled routes tracked for vitals and SEO posture.</dd>
      </div>
      <div>
        <dt>Critical</dt>
        <dd class="value">${stats.critical}</dd>
        <dd class="note">Already below a safe line for revenue-sensitive entry.</dd>
      </div>
      <div>
        <dt>Watch</dt>
        <dd class="value">${stats.watch}</dd>
        <dd class="note">Drifting if the next release lands unchanged.</dd>
      </div>
      <div>
        <dt>Avg SEO</dt>
        <dd class="value">${fraction(stats.avgSeo, 100)}</dd>
        <dd class="note">Mean Lighthouse SEO score across the route set.</dd>
      </div>
      <div>
        <dt>Avg LCP</dt>
        <dd class="value">${stats.avgLcp}<span class="scale-note">ms</span></dd>
        <dd class="note">Mean largest contentful paint.</dd>
      </div>
    </dl>
    ${caliper("House LCP", `${stats.avgLcp}ms`, stats.avgLcp, 2500, 4000, 4500)}
    <p class="scale-note">Caliper bands follow Core Web Vitals: good through 2.5s, poor after 4.0s. The jaw is the house average.</p>
    <p class="tape-caption">Station tape · width is organic share · the peg is the route</p>
    ${stationTape()}
    <figure class="query">
      <blockquote>${esc(stats.recommendation)}</blockquote>
      <p>Pricing is carrying 23% of organic share at 3180ms LCP. The slip below files a 14% estimated loss against release 2026.05.23.</p>
    </figure>
    <section aria-label="Release slips">${slips}</section>
    ${renderFiledNotes()}`;

  return layout(
    "SEO Vital Monitor",
    "/",
    "Query the pricing route first. The weakest vitals sit on a high-intent page.",
    body
  );
}

export function renderVitalsLane() {
  const rows = vitalLane()
    .map((route) => {
      return `<article class="route">
        <header class="route-head">
          ${seal(route.health, route.health)}
          <div>
            <p class="route-id">${esc(route.id)} · release ${esc(route.release)}</p>
            <h2>${esc(route.route)}</h2>
          </div>
          <div class="route-side">
            ${fraction(route.lighthouseSeo, 100)}
            <p>Lighthouse SEO</p>
            ${tallies(route.organicSharePct)}
            <p>${route.organicSharePct}% organic</p>
          </div>
        </header>
        <div class="calipers">
          ${caliper("LCP", `${route.lcpMs}ms`, route.lcpMs, 2500, 4000, 4500)}
          ${caliper("CLS", String(route.cls), route.cls, 0.1, 0.25, 0.3)}
          ${caliper("INP", `${route.inpMs}ms`, route.inpMs, 200, 500, 600)}
        </div>
        <p class="why">${esc(route.explanation)}</p>
      </article>`;
    })
    .join("");

  const body = `
    <header class="lede">
      <p class="kicker">Vitals lane</p>
      <h1>Every route should show its acquisition risk clearly.</h1>
      <p class="deck">This lane keeps the page metrics visible enough that drift cannot hide behind a passing deploy or one blended site average.</p>
    </header>
    <p class="tape-caption">Same tape, same shares. Open a peg, then read the jaws.</p>
    ${stationTape()}
    <section>${rows}</section>`;

  return layout(
    "SEO Vital Monitor - Vitals Lane",
    "/vitals-lane",
    "Read the jaw, not the average. A route can be stamped critical while one metric is only needs-work.",
    body
  );
}

export function renderRegressions() {
  const slips = regressions().map((item) => releaseSlip(item)).join("");
  const body = `
    <header class="lede">
      <p class="kicker">Route regressions</p>
      <h1>Release comparisons should explain why search performance moved.</h1>
      <p class="deck">These route deltas turn Lighthouse and vitals changes into a priority list instead of a passive report that nobody owns.</p>
    </header>
    <section aria-label="Release slips">${slips}</section>`;

  return layout(
    "SEO Vital Monitor - Route Regressions",
    "/route-regressions",
    "File the stub. The percent is the estimated acquisition loss, tallied in fives.",
    body
  );
}

export function renderVerification() {
  const items = verification()
    .map((item, index) => `<li><span class="mark" aria-hidden="true">${["¶", "†", "‡"][index] ?? "¶"}</span><p>${esc(item)}</p></li>`)
    .join("");
  const body = `
    <header class="lede">
      <p class="kicker">Verification</p>
      <h1>This build proves SEO monitoring belongs in the revenue stack.</h1>
      <p class="deck">The point is not just to collect vitals. The point is to surface which pages are already weakening acquisition quality and which release decisions caused that drift.</p>
    </header>
    <ol class="claims">${items}</ol>`;

  return layout(
    "SEO Vital Monitor - Verification",
    "/verification",
    "Three claims. No fourth. Each mark in the colophon has a line here.",
    body
  );
}

export function renderDocs() {
  const body = `
    <header class="lede">
      <p class="kicker">Docs</p>
      <h1>Modeled as an SEO and vitals control plane for engineering and growth teams.</h1>
      <p class="deck">This repo sits between performance telemetry, release quality, and inbound demand. Route-level drift becomes a business issue before rankings visibly collapse.</p>
    </header>
    <div class="index">
      <section>
        <h2>UI surface</h2>
        <ul>
          <li><code>/</code> overview and acquisition-risk posture</li>
          <li><code>/vitals-lane</code> route-level Core Web Vitals and SEO scores</li>
          <li><code>/route-regressions</code> release-to-release delta review</li>
          <li><code>/verification</code> release checks and modeling claims</li>
        </ul>
      </section>
      <section>
        <h2>Machine-readable outputs</h2>
        <ul>
          <li><code>/api/dashboard/summary</code></li>
          <li><code>/api/vitals-lane</code></li>
          <li><code>/api/route-regressions</code></li>
          <li><code>/api/verification</code></li>
          <li><code>/api/sample</code></li>
        </ul>
      </section>
    </div>
    ${renderFiledNotes()}`;

  return layout(
    "SEO Vital Monitor - Docs",
    "/docs",
    "Paths are the contract. The same routes serve the page and the JSON.",
    body
  );
}
