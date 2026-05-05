import { useState, useEffect } from "react";

export default function ChatWindow({ chat }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chat.messages);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  function sendMessage() {
    if (message.trim() === "") return;

    setMessages([
      ...messages,
      { from: "me", text: message, time: "الآن" },
    ]);

    setMessage("");
  }

  return (
    <main className="chat-window d-flex flex-column h-100">
      <div className="chat-header d-flex align-items-center p-3">
        <div
          className="avatar d-flex align-items-center justify-content-center ms-2"
          style={{ backgroundColor: chat.color }}
        >
          {chat.avatar}
        </div>

        <div>
          <h6 className="mb-1 fw-bold">{chat.name}</h6>
          <p className="mb-0 small text-success">{chat.status}</p>
        </div>
      </div>

      <div className="messages-area flex-grow-1 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message mb-3 ${
              msg.from === "me" ? "my-message" : "his-message"
            }`}
          >
            <p className="mb-1">{msg.text}</p>
            <span className="small">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="message-input d-flex gap-2 p-3">
        <input
          type="text"
          className="form-control"
          placeholder="اكتب رسالتك هنا..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="btn send-btn" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </main>
  );
}