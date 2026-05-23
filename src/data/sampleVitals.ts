export type Health = "healthy" | "watch" | "critical";

export interface VitalRoute {
  id: string;
  route: string;
  release: string;
  lcpMs: number;
  cls: number;
  inpMs: number;
  lighthouseSeo: number;
  organicSharePct: number;
  health: Health;
  explanation: string;
}

export interface RouteRegression {
  id: string;
  route: string;
  priorRelease: string;
  currentRelease: string;
  biggestShift: string;
  impact: Health;
  estimatedLossPct: number;
  explanation: string;
}

export const vitalRoutes: VitalRoute[] = [
  {
    id: "VTL-01",
    route: "/",
    release: "2026.05.23",
    lcpMs: 2280,
    cls: 0.04,
    inpMs: 168,
    lighthouseSeo: 97,
    organicSharePct: 41,
    health: "healthy",
    explanation: "Homepage still clears the main thresholds and remains strong enough to support branded and informational entry traffic."
  },
  {
    id: "VTL-02",
    route: "/pricing",
    release: "2026.05.23",
    lcpMs: 3180,
    cls: 0.07,
    inpMs: 244,
    lighthouseSeo: 89,
    organicSharePct: 23,
    health: "critical",
    explanation: "Pricing has slipped beyond the safe LCP window, which puts one of the highest-intent acquisition routes at risk."
  },
  {
    id: "VTL-03",
    route: "/blog/seo-governance",
    release: "2026.05.23",
    lcpMs: 2890,
    cls: 0.11,
    inpMs: 196,
    lighthouseSeo: 91,
    organicSharePct: 17,
    health: "watch",
    explanation: "The article still ranks, but layout instability and slower hero rendering will erode non-brand entry if left alone."
  },
  {
    id: "VTL-04",
    route: "/case-studies/platform-reliability",
    release: "2026.05.23",
    lcpMs: 2420,
    cls: 0.05,
    inpMs: 178,
    lighthouseSeo: 95,
    organicSharePct: 11,
    health: "healthy",
    explanation: "Case-study proof surfaces are stable and keep supporting lower-volume but high-trust search demand."
  },
  {
    id: "VTL-05",
    route: "/docs/aeo-linter",
    release: "2026.05.23",
    lcpMs: 3010,
    cls: 0.06,
    inpMs: 214,
    lighthouseSeo: 88,
    organicSharePct: 8,
    health: "watch",
    explanation: "Docs are still indexable, but the current release is flirting with performance thresholds that usually chip away at long-tail visibility."
  }
];

export const routeRegressions: RouteRegression[] = [
  {
    id: "REG-01",
    route: "/pricing",
    priorRelease: "2026.05.17",
    currentRelease: "2026.05.23",
    biggestShift: "LCP +640ms after visual pricing module expansion",
    impact: "critical",
    estimatedLossPct: 14,
    explanation: "The pricing route took the largest performance hit and is the clearest place where frontend weight is threatening acquisition efficiency."
  },
  {
    id: "REG-02",
    route: "/blog/seo-governance",
    priorRelease: "2026.05.17",
    currentRelease: "2026.05.23",
    biggestShift: "CLS +0.04 from image lazy-load behavior",
    impact: "watch",
    estimatedLossPct: 7,
    explanation: "The page still performs acceptably, but the extra layout shift will make search traffic more fragile over time."
  },
  {
    id: "REG-03",
    route: "/docs/aeo-linter",
    priorRelease: "2026.05.17",
    currentRelease: "2026.05.23",
    biggestShift: "SEO score -4 after metadata regression",
    impact: "watch",
    estimatedLossPct: 5,
    explanation: "The docs route lost structured quality at the same time performance slipped, which is exactly the kind of silent decay that compounds."
  }
];
