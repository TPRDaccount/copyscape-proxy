// Copyscape API Proxy for ContentCheck
// Deploy to Vercel - handles CORS for browser requests

export default async function handler(req, res) {
  // Allow CORS from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const COPYSCAPE_USER = 'repdef';
  const COPYSCAPE_API_KEY = 'iq21fxyjet43ofeh';

  try {
    const action = req.query.action || req.body?.action;
    const text = req.body?.text || req.query.text || '';

    if (action === 'balance') {
      const url = `https://www.copyscape.com/api/?u=${COPYSCAPE_USER}&o=balance&a=${COPYSCAPE_API_KEY}&f=json`;
      const response = await fetch(url);
      const data = await response.json();
      return res.status(200).json(data);
    } 
    
    if (action === 'search') {
      const params = new URLSearchParams();
      params.append('u', COPYSCAPE_USER);
      params.append('o', 'csearch');
      params.append('a', COPYSCAPE_API_KEY);
      params.append('f', 'json');
      params.append('e', 'UTF-8');
      params.append('t', text);
      
      const response = await fetch('https://www.copyscape.com/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Use action=balance or action=search' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
