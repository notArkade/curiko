"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply || "No response from Gemini.");
    } catch (err) {
      console.error(err);
      setReply("Error connecting to API");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-200 font-light">Chat with Curiko {">// //<"}</h1>

      <textarea
        className="w-full max-w-lg p-3 border border-gray-700 rounded-lg shadow-sm mb-4"
        rows={3}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="px-4 py-2 border border-gray-600 hover:border-gray-200 text-gray-600 hover:text-gray-200 rounded-2xl shadow hover:rounded-br-lg hover:scale-110 transition-all cursor-pointer duration-200 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div className="mt-6 w-full max-w-lg p-4 border border-gray-700 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Curiko says:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
