import React, { useEffect, useState } from "react";

function ChatPage() {
  // Store the selected chat id
  const [activeChatId, setActiveChatId] = useState(1);

  // Temporary chat data, later we can get it from backend
  const chats = [
    {
      id: 1,
      name: "أحمد",
      avatar: "أ",
      color: "#5a3e2b",
      status: "متصل الآن",
      messages: [
        { from: "him", text: "السلام عليكم", time: "10:00" },
        { from: "me", text: "وعليكم السلام", time: "10:01" },
      ],
    },
    {
      id: 2,
      name: "محمد",
      avatar: "م",
      color: "#8b6f47",
      status: "آخر ظهور قبل 5 دقائق",
      messages: [
        { from: "him", text: "مرحبا", time: "9:30" },
        { from: "me", text: "أهلًا وسهلًا", time: "9:31" },
      ],
    },
    {
      id: 3,
      name: "سارة",
      avatar: "س",
      color: "#b08a5a",
      status: "متصلة",
      messages: [
        { from: "him", text: "كيفك؟", time: "8:45" },
        { from: "me", text: "تمام الحمد لله", time: "8:46" },
      ],
    },
  ];

  // Find the chat that matches the selected id
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <div style={styles.page} dir="rtl">
      {/* Sidebar shows all chats */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />

      {/* ChatWindow shows the selected chat */}
      <ChatWindow chat={activeChat} />
    </div>
  );
}

function Sidebar({ chats, activeChatId, setActiveChatId }) {
  // Store the search input value
  const [search, setSearch] = useState("");

  // Filter chats based on the search text
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.sidebarTitle}>الرسائل</h2>

      {/* Search input for chats */}
      <input
        type="text"
        placeholder="بحث في المحادثات..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      <div style={styles.chatList}>
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            style={{
              ...styles.chatItem,
              // Apply active style if this chat is selected
              ...(activeChatId === chat.id ? styles.activeChat : {}),
            }}
          >
            <div style={{ ...styles.avatar, backgroundColor: chat.color }}>
              {chat.avatar}
            </div>

            <div style={styles.chatInfo}>
              <h6 style={styles.chatName}>{chat.name}</h6>

              {/* Show the last message in the chat */}
              <p style={styles.lastMessage}>
                {chat.messages[chat.messages.length - 1]?.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ChatWindow({ chat }) {
  // Store the message typed by the user
  const [message, setMessage] = useState("");

  // Store messages of the current chat
  const [messages, setMessages] = useState(chat.messages);

  // Update messages when the selected chat changes
  useEffect(() => {
    setMessages(chat.messages);
  }, [chat]);

  function sendMessage() {
    // Do not send empty messages
    if (message.trim() === "") return;

    // Add the new message to the messages list
    setMessages([
      ...messages,
      {
        from: "me",
        text: message,
        time: "الآن",
      },
    ]);

    // Clear input after sending
    setMessage("");
  }

  return (
    <main style={styles.chatWindow}>
      {/* Chat header with user info */}
      <div style={styles.chatHeader}>
        <div style={{ ...styles.avatar, backgroundColor: chat.color }}>
          {chat.avatar}
        </div>

        <div>
          <h6 style={styles.headerName}>{chat.name}</h6>
          <p style={styles.status}>{chat.status}</p>
        </div>
      </div>

      {/* Messages display area */}
      <div style={styles.messagesArea}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              // Use different style for my messages and other messages
              ...(msg.from === "me" ? styles.myMessage : styles.hisMessage),
            }}
          >
            <p style={styles.messageText}>{msg.text}</p>
            <span style={styles.messageTime}>{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Message input area */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="اكتب رسالتك هنا..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // Send message when Enter is pressed
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.messageInput}
        />

        <button onClick={sendMessage} style={styles.sendButton}>
          إرسال
        </button>
      </div>
    </main>
  );
}

// Styles are inside this file to keep the page simple
const styles = {
  page: {
    height: "calc(100vh - 95px)",
    display: "flex",
    backgroundColor: "#fdf5ec",
    fontFamily: "Arial, sans-serif",
    borderRadius: "18px",
    overflow: "hidden",
    margin: "0 20px 20px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
  },

  sidebar: {
    width: "310px",
    minWidth: "310px",
    backgroundColor: "#f5e7d0",
    borderLeft: "1px solid #d2b48c",
    padding: "18px",
    overflowY: "auto",
  },

  sidebarTitle: {
    color: "#5a3e2b",
    fontWeight: "700",
    fontSize: "22px",
    textAlign: "center",
    marginBottom: "18px",
  },

  searchInput: {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #d2b48c",
    padding: "12px",
    outline: "none",
    marginBottom: "18px",
    backgroundColor: "#fffaf4",
    color: "#5a3e2b",
  },

  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  chatItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    border: "1px solid #e6d3b3",
    backgroundColor: "#fffaf4",
    borderRadius: "14px",
    padding: "12px",
    cursor: "pointer",
    textAlign: "right",
    transition: "0.2s",
  },

  activeChat: {
    backgroundColor: "#d2b48c",
    border: "2px solid #5a3e2b",
  },

  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    color: "white",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  chatInfo: {
    overflow: "hidden",
    flexGrow: 1,
  },

  chatName: {
    margin: "0 0 5px",
    color: "#5a3e2b",
    fontWeight: "700",
  },

  lastMessage: {
    margin: 0,
    fontSize: "14px",
    color: "#7a5a3a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  chatWindow: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fdf5ec",
  },

  chatHeader: {
    backgroundColor: "#f5e7d0",
    borderBottom: "1px solid #d2b48c",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  headerName: {
    margin: "0 0 4px",
    color: "#5a3e2b",
    fontWeight: "700",
  },

  status: {
    margin: 0,
    color: "#4d8b57",
    fontSize: "14px",
  },

  messagesArea: {
    flexGrow: 1,
    padding: "25px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  message: {
    maxWidth: "60%",
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
  },

  myMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#5a3e2b",
    color: "white",
    borderBottomLeftRadius: "4px",
  },

  hisMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#fffaf4",
    color: "#5a3e2b",
    borderBottomRightRadius: "4px",
    border: "1px solid #e6d3b3",
  },

  messageText: {
    margin: "0 0 5px",
  },

  messageTime: {
    fontSize: "12px",
    opacity: 0.75,
  },

  inputArea: {
    display: "flex",
    gap: "10px",
    padding: "16px",
    backgroundColor: "#f5e7d0",
    borderTop: "1px solid #d2b48c",
  },

  messageInput: {
    flexGrow: 1,
    borderRadius: "12px",
    border: "1px solid #d2b48c",
    padding: "12px",
    outline: "none",
    backgroundColor: "#fffaf4",
  },

  sendButton: {
    borderRadius: "12px",
    border: "2px solid #5a3e2b",
    backgroundColor: "#d2b48c",
    color: "#5a3e2b",
    fontWeight: "700",
    padding: "0 22px",
    cursor: "pointer",
  },
};

export default ChatPage;