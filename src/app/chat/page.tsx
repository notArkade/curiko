

"use client";

import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatUIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply: ChatMessage = {
        role: "assistant",
        content: data.reply || "No response from Gemini.",
      };

      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to API" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100">
      <h1 className="text-2xl font-light mb-4">Chat with Curiko</h1>

      {/* Chat Window */}
      <div className="w-full max-w-2xl flex flex-col border border-gray-700 rounded-xl shadow p-4 h-[70vh] overflow-y-auto bg-gray-900">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 italic">Curiko is typing...</div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex w-full max-w-2xl mt-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-700 rounded-l-xl bg-gray-800 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-r-xl transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
