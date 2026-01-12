import { useState } from "react";
import ChatBot from "./ChatBot";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
  <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[345px] bg-gray-400 rounded-xl shadow-2xl flex flex-col overflow-hidden">
    
    {/* Header (fixed height) */}
    <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <span className="font-semibold">AI Assistant 🤖</span>
      <button onClick={() => setOpen(false)}>✖</button>
    </div>

    {/* ChatBot takes remaining height */}
    <div className="flex-1 overflow-hidden">
      <ChatBot />
    </div>
  </div>
)}

    </>
  );
};

export default ChatWidget;
