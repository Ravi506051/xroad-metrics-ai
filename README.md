# Vercel deploy
1. Is folder ko GitHub par push karo (ya `npx vercel` chalao).
2. Vercel > Project > Settings > Environment Variables: `GEMINI_API_KEY` = apni key. Deploy dobara karo.
3. `/` = X-Road dashboard (demo data), `/chat.html` = AI chat.
Note: public site par koi bhi chat use karke aapka quota kharch kar sakta hai. Zaroorat ho to login ya rate limit lagao.

## Demo and Deployment Notes

The dashboard's demo data should be clearly distinguished from measurements collected from a live X-Road environment. Before connecting real systems, document the data source, collection interval, access controls, and retention policy. Do not expose private operational metrics or credentials through a public deployment.

## AI Chat Safety

Keep provider API keys on the server side, apply usage limits to public endpoints, and handle provider errors without revealing secret values. Review generated explanations against the underlying metrics before using them for operational decisions.
