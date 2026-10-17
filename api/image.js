module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY Vercel env me set nahi hai' });
  const { prompt = '', model } = req.body || {};
  const m = /^gemini-[\w.-]+$/.test(model || '') ? model : 'gemini-2.5-flash-image';
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ parts: [{ text: String(prompt).slice(0, 4000) }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } }) });
    const j = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: j.error?.message || 'API error' });
    const p = (j.candidates?.[0]?.content?.parts || []).find(x => x.inlineData || x.inline_data);
    const d = p && (p.inlineData || p.inline_data);
    if (!d) return res.status(422).json({ error: 'Image nahi bani. Prompt badal ke try karo.' });
    res.json({ mime: d.mimeType || d.mime_type || 'image/png', data: d.data });
  } catch (e) { res.status(502).json({ error: e.message }); }
};
