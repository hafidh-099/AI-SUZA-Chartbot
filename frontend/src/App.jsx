import { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    const botMessage = data.response || data.error;

    // Add to chat history
    setChatHistory((prev) => [...prev, { user: userMessage, bot: botMessage }]);

    // 🔊 Speak the bot message
    speak(botMessage);

    setLoading(false);
  };

  // 👇 Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // ✅ Use browser speech synthesis
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = /[^\x00-\x7F]+/.test(text) ? "sw-TZ" : "en-US";
    synth.speak(utterance);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">🩺 AI Health Assistance</h1>
      <p>PAWA AI Integred chartbot</p>
      <hr />

      <div className="chat-history">
        {chatHistory.map((chat, idx) => (
          <div key={idx} className="chat-bubble">
            <div className="user-message"><strong>👤 You:</strong> {chat.user}</div>
            <div className="bot-response"><strong>🤖 Bot:</strong> {chat.bot}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <hr />

      <textarea
        className="chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your health question here..."
      />
      <button
        className="chat-button"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
}

export default App;
