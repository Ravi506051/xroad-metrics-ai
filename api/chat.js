// Vercel serverless function: key sirf server par rehti hai (env var GEMINI_API_KEY)
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY Vercel env me set nahi hai' });
  const { messages = [], system = '', model } = req.body || {};
  const m = /^gemini-[\w.-]+$/.test(model || '') ? model : 'gemini-2.5-flash';
  const contents = messages.filter(x => x.content).slice(-30).map(x => ({
    role: x.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(x.content).slice(0, 20000) }] }));
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents }) });
    const j = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: j.error?.message || 'API error' });
    res.json({ text: (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('') });
  } catch (e) { res.status(502).json({ error: e.message }); }
};
