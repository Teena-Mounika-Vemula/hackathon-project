const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const systemPrompt = `
You are BeachBot, an expert assistant for the Beach Warriors app. You ONLY answer questions related to:
– Beach cleanups
– Marine conservation
– Volunteer signup, events, attendance
– Dashboard features, avatars, badges, points
– Organiser tools, maps, AI tools (waste classifier, reminders)
Always respond briefly and to the point.
If asked something unrelated, say: "I'm here to help with Beach Warriors–related topics only."
`;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const requestBody = {
    model: "llama3-8b-8192",  // ✅ Updated model name
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 1024
  };

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await groqResponse.json();
    console.log("📥 Groq response:", JSON.stringify(data, null, 2));

    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      console.error("❌ Invalid Groq response:", JSON.stringify(data, null, 2));
      return res.status(500).json({ reply: "🤖 Groq didn't send a valid message." });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("❌ Groq API error:", err);
    res.status(500).json({ error: "Groq API failed" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ BeachBot (Groq) running at http://localhost:${PORT}`);
});
