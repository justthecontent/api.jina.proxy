import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JINA_BASE_URL = 'https://r.jina.ai/';

// Existing read endpoint
app.get('/read', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const response = await fetch(`${JINA_BASE_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${process.env.JINA_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Jina API responded with ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle as text if not JSON
      data = { text: await response.text() };
    }

    res.json(data);
  } catch (error) {
    console.error('Error in /read endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// DeepSearch chat endpoint
app.post('/deepsearch/chat', async (req, res) => {
  try {
    const { messages, model = 'jina-deepsearch-v1', stream = false, reasoning_effort = 'medium' } = req.body;

    const response = await fetch('https://deepsearch.jina.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.JINA_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        reasoning_effort
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSearch API responded with ${response.status}`);
    }

    // Handle streaming response
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      response.body.pipe(res);
      return;
    }

    // Handle normal JSON response
    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error in /deepsearch/chat endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
