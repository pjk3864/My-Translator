export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  }

  const { image } = req.body || {};
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'image (base64) required' });
  }

  const imageUrl = image.startsWith('data:') ? image : `data:image/png;base64,${image}`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract all text from this image exactly as it appears. Preserve line breaks and order. If the image contains no text, reply with a single empty line. Output ONLY the raw extracted text, no explanations or quotes.'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ]
      })
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      return res.status(openaiRes.status).json(data);
    }

    const content = (data.choices && data.choices[0] && data.choices[0].message)
      ? (data.choices[0].message.content || '').trim()
      : '';

    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
