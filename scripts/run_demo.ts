import { payload, summary } from "../src/services/seoVitalService";

console.log("seo-vital-monitor demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().regressions, null, 2));
