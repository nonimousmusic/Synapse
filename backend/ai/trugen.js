const TRUGEN_API_KEY = process.env.TRUGEN_API_KEY;
const TRUGEN_API_URL = process.env.TRUGEN_API_URL || 'https://api.trugen.ai/v1';
const TRUGEN_MODEL = process.env.TRUGEN_MODEL || 'trugen-1';

const trugenGenerate = async (prompt, contextHistory = []) => {
  console.log(`[TruGen AI] Generating response...`);

  if (!TRUGEN_API_KEY) {
    throw new Error('TRUGEN_API_KEY is not configured in .env');
  }

  const messages = [
    {
      role: 'system',
      content: 'You are Vishesh, an elite AI mentor specializing in software engineering, data structures, algorithms, and career guidance.',
    },
    ...contextHistory.map((msg) => ({
      role: msg.role || 'user',
      content: msg.content || msg,
    })),
    { role: 'user', content: prompt },
  ];

  const response = await fetch(`${TRUGEN_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TRUGEN_API_KEY}`,
    },
    body: JSON.stringify({
      model: TRUGEN_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TruGen API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from TruGen');

  return content;
};

const trugenStream = async (prompt, contextHistory = []) => {
  if (!TRUGEN_API_KEY) return null;

  const messages = [
    {
      role: 'system',
      content: 'You are Vishesh, an elite AI mentor.',
    },
    ...contextHistory.map((msg) => ({
      role: msg.role || 'user',
      content: msg.content || msg,
    })),
    { role: 'user', content: prompt },
  ];

  const response = await fetch(`${TRUGEN_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TRUGEN_API_KEY}`,
    },
    body: JSON.stringify({
      model: TRUGEN_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    }),
  });

  if (!response.ok) return null;
  return response.body;
};

module.exports = { trugenGenerate, trugenStream, TRUGEN_API_URL, TRUGEN_MODEL };
