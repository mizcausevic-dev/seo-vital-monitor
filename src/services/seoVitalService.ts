import { routeRegressions, vitalRoutes } from "../data/sampleVitals";

export function summary() {
  const critical = vitalRoutes.filter((route) => route.health === "critical").length;
  const watch = vitalRoutes.filter((route) => route.health === "watch").length;
  const avgSeo = Math.round(vitalRoutes.reduce((total, route) => total + route.lighthouseSeo, 0) / vitalRoutes.length);
  const avgLcp = Math.round(vitalRoutes.reduce((total, route) => total + route.lcpMs, 0) / vitalRoutes.length);

  return {
    routeCount: vitalRoutes.length,
    critical,
    watch,
    avgSeo,
    avgLcp,
    recommendation:
      "Recover the pricing route first, because it combines the weakest Core Web Vitals posture with one of the most revenue-sensitive organic paths."
  };
}

export function vitalLane() {
  return vitalRoutes;
}

export function regressions() {
  return routeRegressions;
}

export function verification() {
  return [
    "Vital monitoring is modeled in acquisition language so performance regressions are visible before search and conversion losses compound.",
    "Route-level comparisons make it clear which release introduced meaningful LCP, CLS, or metadata drift.",
    "The dashboard keeps SEO score, Core Web Vitals, and business sensitivity in one place so engineering and growth can prioritize the same fixes."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    vitals: vitalLane(),
    regressions: regressions(),
    verification: verification()
  };
}
