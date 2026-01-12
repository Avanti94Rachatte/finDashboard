import { useState } from "react";
import { sendChatMessage } from "../../utils/chatService";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = "user_123"; // replace with real logged-in user id

  const handleSend = async () => {
    if (!input.trim()) return;

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
    ]);

    setInput("");

    try {
      const res = await sendChatMessage(input, userId);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.reply },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-100 shadow-lg rounded-lg">
      <div className="p-3 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-gray-100 px-3 py-2 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex border-t p-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-3 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  
  );
};

export default ChatBot;
 