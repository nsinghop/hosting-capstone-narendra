"use client";
import React, { useState } from "react";
import "./Messages.css";
import Layout from '../components/Layout/Layout';

function MessagesPageContent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "You", time: new Date().toLocaleTimeString() }]);
    setInput("");
  };

  return (
    <div className="messages-container">
      <h2>Office Messages (Dummy UI)</h2>
      <div className="messages-list">
        {messages.map((msg, idx) => (
          <div key={idx} className="message-item">
            <span className="message-sender">{msg.sender}</span>
            <span className="message-text">{msg.text}</span>
            <span className="message-time">{msg.time}</span>
          </div>
        ))}
      </div>
      <form className="messages-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Layout>
      <MessagesPageContent />
    </Layout>
  );
}
