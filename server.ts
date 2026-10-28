import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for AI content moderation & club announcement structuring
  app.post('/api/gemini/analyze-post', async (req, res) => {
    try {
      const { rawPostText, authorRole } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze and structure this post from a '${authorRole}':\n\n${rawPostText}`,
        config: {
          systemInstruction: "You are the MMU KEEP UP backend moderator and calendar organizer. Extract event details (title, date, venue, time) if present, clean up the content, validate if it qualifies as an official club/lecturer announcement, and check media limits. Return valid JSON.",
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isOfficialAnnouncement: { type: Type.BOOLEAN },
              cleanContent: { type: Type.STRING },
              isSpamOrOutdated: { type: Type.BOOLEAN },
              eventDetails: {
                type: Type.OBJECT,
                properties: {
                  eventTitle: { type: Type.STRING },
                  eventDate: { type: Type.STRING },
                  venue: { type: Type.STRING },
                  time: { type: Type.STRING }
                },
                nullable: true
              }
            },
            required: ["isOfficialAnnouncement", "cleanContent", "isSpamOrOutdated"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      res.json(data);
    } catch (error: any) {
      console.error('Gemini analyze-post error:', error);
      res.status(500).json({ error: error.message || 'AI processing failed' });
    }
  });

  // API endpoint for campus AI chatbot / assistant
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: "You are KeepUp AI, the official campus virtual assistant for Multimedia University (MMU Cyberjaya & Melaka). You help students find club events, lecture halls, campus facilities, shuttle bus schedules, and exam tips. Be warm, concise, and helpful."
        }
      });
      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      res.status(500).json({ error: error.message || 'AI chat failed' });
    }
  });

  // Vite middleware for frontend development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MMU Keep Up server running on http://localhost:${PORT}`);
  });
}

startServer();
