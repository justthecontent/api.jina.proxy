import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JINA_BASE_URL = 'https://reader-production-b375.up.railway.app/';

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
