# Vercel deploy
1. Is folder ko GitHub par push karo (ya `npx vercel` chalao).
2. Vercel > Project > Settings > Environment Variables: `GEMINI_API_KEY` = apni key. Deploy dobara karo.
3. `/` = X-Road dashboard (demo data), `/chat.html` = AI chat.
Note: public site par koi bhi chat use karke aapka quota kharch kar sakta hai. Zaroorat ho to login ya rate limit lagao.

## Demo and Deployment Notes

The dashboard's demo data should be clearly distinguished from measurements collected from a live X-Road environment. Before connecting real systems, document the data source, collection interval, access controls, and retention policy. Do not expose private operational metrics or credentials through a public deployment.

## AI Chat Safety

Keep provider API keys on the server side, apply usage limits to public endpoints, and handle provider errors without revealing secret values. Review generated explanations against the underlying metrics before using them for operational decisions.

## Project Development Notes

Preserve upstream SWE-agent attribution and license. Test changes in an isolated environment and review tool permissions before allowing repository or shell actions.

For reproducibility, record source versions, environment and dependency versions, configuration, and actual test outputs. Clearly label sample data and illustrative results; never commit secrets or private data.

### Technical Deep Dive

The dashboard should clearly separate demonstration metrics from values collected from a live X-Road environment. Model the metric contract explicitly: metric name, value, unit, source, collection timestamp, and environment. For any AI-generated summary, pass the relevant metric values and time window as structured context, then make it possible to trace each statement back to the dashboard data.

Suggested engineering checks: keep Gemini credentials server-side, apply request limits, validate time ranges and missing metrics, and never expose private operational telemetry in a public demo.

## Data Quality and AI Insight Validation

For reliable metric analysis, every displayed value should retain its metric name, unit, source, environment, and collection timestamp. Clearly separate demo values from live measurements.

Before relying on an AI-generated explanation, verify that it references the correct metric and time window. Test missing values, stale measurements, unusual spikes, and empty datasets. Keep provider credentials server-side, apply request limits, and avoid exposing sensitive infrastructure metrics in public deployments.

## Metrics, Data Quality, and Evaluation

- Define each metric, unit, aggregation window, and data source in a shared data dictionary.
- Validate timestamps, duplicate records, missing values, and geographic fields before analysis.
- Separate raw observations, derived features, and AI-generated outputs in the processing pipeline.
- Evaluate predictions against a documented baseline and report only measured results.
- Include data freshness and known coverage limitations wherever metrics are displayed.

## Data Contract and AI Summary Validation

- Represent each metric with a name, numeric value, unit, source, collection timestamp, and environment.
- Clearly label dashboard demo data and never mix it with measurements from a live X-Road deployment.
- Ground AI-generated summaries in the exact metric values and time window, and let readers trace each statement to its source data.
- Protect operational metadata and credentials; add rate limits to public AI endpoints.
