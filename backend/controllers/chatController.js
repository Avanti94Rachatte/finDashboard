const Chat = require("../models/Chat");

// Save chat message
exports.saveChat = async (req, res) => {
  try {
    const { userId, role, message } = req.body;

    if (!userId || !role || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const chat = await Chat.create({
      userId,
      role,
      message,
    });

    res.status(201).json(chat); // ✅ RESPONSE SENT
  } catch (error) {
    console.error("Chat save error:", error);
    res.status(500).json({ error: "Failed to save chat" });
  }
};
