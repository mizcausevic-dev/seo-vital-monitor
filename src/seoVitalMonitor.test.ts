import { describe, expect, it } from "vitest";

import { renderOverview, renderRegressions, renderVitalsLane } from "./services/render";
import { payload, regressions, summary, vitalLane } from "./services/seoVitalService";

describe("seo-vital-monitor", () => {
  it("summary exposes acquisition-risk posture", () => {
    const result = summary();

    expect(result.routeCount).toBeGreaterThan(0);
    expect(result.avgLcp).toBeGreaterThan(0);
    expect(result.recommendation).toContain("pricing");
  });

  it("vitals and regressions stay commercially legible", () => {
    expect(vitalLane().length).toBeGreaterThan(1);
    expect(regressions().some((item) => item.route.includes("pricing"))).toBe(true);
  });

  it("renders the ledger instead of the chip dashboard", () => {
    const overview = renderOverview();

    expect(overview).toContain("binder");
    expect(overview).toContain("caliper");
    expect(overview).toContain("slip");
    expect(overview).toContain("/pricing");
    expect(overview).not.toContain("nav-chip");
    expect(renderVitalsLane()).toContain("tally");
    expect(renderRegressions()).toContain("Tear off");
  });

  it("payload bundles the full surface", () => {
    const result = payload();

    expect(result.dashboard.routeCount).toBe(result.vitals.length);
    expect(result.regressions.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
