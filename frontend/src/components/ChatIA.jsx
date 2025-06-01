import React, { useState } from "react";
import "../styles/chat.scss";

const ChatIA = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd’hui ?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Simuler une réponse du bot (remplace ça plus tard par appel API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Merci pour votre message 😊" },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          placeholder="Écrivez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ChatIA;
