const express = require('express');
const router = express.Router();
const http = require('http'); // For Ollama proxy
const { trugenGenerate } = require('../ai/trugen');

// Standard chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { message, useTruGen = false } = req.body;

    if (useTruGen) {
      // Use the requested TruGen API
      const response = await trugenGenerate(message);
      return res.json({ response });
    } else {
      // Fallback local response if Ollama is not configured for non-streaming
      res.json({ response: `[Local Vishesh] I received your message: ${message}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ollama Streaming Proxy
// Securely proxies the streaming response from local Ollama (11434) to the frontend client
router.post('/stream', (req, res) => {
  const { prompt, model = 'llama3', system = '' } = req.body;

  const ollamaReq = http.request({
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/generate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, (ollamaRes) => {
    res.writeHead(ollamaRes.statusCode, ollamaRes.headers);
    ollamaRes.pipe(res); // Pipe the stream directly back to the client
  });

  ollamaReq.on('error', (e) => {
    console.error(`Ollama connection error: ${e.message}`);
    res.status(502).json({ error: 'Failed to connect to local Ollama instance.' });
  });

  ollamaReq.write(JSON.stringify({
    model: model,
    prompt: prompt,
    system: system || 'You are Vishesh, an elite AI mentor.',
    stream: true
  }));
  
  ollamaReq.end();
});

module.exports = router;
