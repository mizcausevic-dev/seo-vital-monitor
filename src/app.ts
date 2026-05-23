import express from "express";

import { payload, regressions, summary, verification, vitalLane } from "./services/seoVitalService";
import {
  renderDocs,
  renderOverview,
  renderRegressions,
  renderVerification,
  renderVitalsLane
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5372);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/vitals-lane", (_req, res) => res.type("html").send(renderVitalsLane()));
app.get("/route-regressions", (_req, res) => res.type("html").send(renderRegressions()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/vitals-lane", (_req, res) => res.json(vitalLane()));
app.get("/api/route-regressions", (_req, res) => res.json(regressions()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`SEO Vital Monitor listening on http://127.0.0.1:${port}`);
  });
}

export default app;
