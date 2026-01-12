const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: String,
  role: { type: String, enum: ["user", "assistant"] },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // auto delete after 1 hour
  },
});

module.exports = mongoose.model("Chat", chatSchema);
