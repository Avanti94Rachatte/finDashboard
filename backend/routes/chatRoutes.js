const express = require("express");
const OpenAI = require("openai");
const Chat = require("../models/Chat");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: "message and userId required" });
    }

    // Save user message
    await Chat.create({
      userId,
      role: "user",
      message,
    });

    // Get previous chat history
    const history = await Chat.find({ userId })
      .sort({ createdAt: 1 })
      .limit(10);

    const messages = history.map(chat => ({
      role: chat.role,
      content: chat.message,
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...messages,
      ],
    });

    const aiReply = response.choices[0].message.content;

    // Save AI reply
    await Chat.create({
      userId,
      role: "assistant",
      message: aiReply,
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;
