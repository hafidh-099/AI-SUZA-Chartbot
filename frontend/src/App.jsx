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

    // Add question + response to chat history
    setChatHistory((prev) => [...prev, { user: userMessage, bot: botMessage }]);

    setLoading(false);
  };

  // 👇 Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <h1 className="chat-title">🤖 AI SUZA Chatbot</h1>
      <p style={{textAlign:"center"}}>This is PAWA intagrated chartbot ai</p>
      <hr />
      {/* Chat history */}
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-bubble">
            <div className="user-message"><strong>👤 You:</strong> {chat.user}</div>
            <div className="bot-response"><strong>🤖 Bot:</strong> {chat.bot}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/*  Input area */}
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
