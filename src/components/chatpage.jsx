import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductChat,
  getProductChatsByUser,
  sendProductChatMessage,
} from "../api";

function ChatPage() {
  // Get chat id from URL
  const { chatId } = useParams();
  const navigate = useNavigate();

  // Store all chats for the current user
  const [chats, setChats] = useState([]);

  // Store the selected chat
  const [chat, setChat] = useState(null);

  // Store search text
  const [search, setSearch] = useState("");

  // Store typed message
  const [message, setMessage] = useState("");

  // Get logged in user
  const user = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = user?._id || user?.id;

  // Load all chats where the current user is buyer or seller
  useEffect(() => {
    const loadUserChats = async () => {
      try {
        if (!currentUserId) return;

        const data = await getProductChatsByUser(currentUserId);

        if (Array.isArray(data)) {
          setChats(data);

          // If user opens /chat without chatId, open first chat automatically
          if (!chatId && data.length > 0) {
            navigate(`/chat/${data[0]._id}`);
          }
        } else {
          setChats([]);
        }
      } catch (err) {
        console.log(err);
        alert("Cannot load chats");
      }
    };

    loadUserChats();
  }, [currentUserId, chatId, navigate]);

  // Load selected chat from backend
  useEffect(() => {
    const loadChat = async () => {
      try {
        if (!chatId) return;

        const data = await getProductChat(chatId);

        if (data.error) {
          alert(data.error);
          return;
        }

        setChat(data);
      } catch (err) {
        console.log(err);
        alert("Cannot load chat");
      }
    };

    loadChat();
  }, [chatId]);

  const handleSelectChat = (selectedChatId) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handleSendMessage = async () => {
    try {
      if (message.trim() === "") return;

      if (!currentUserId) {
        alert("User id not found. Please login again.");
        return;
      }

      const data = await sendProductChatMessage(chatId, currentUserId, message);

      if (data.error) {
        alert(data.error);
        return;
      }

      setChat(data);
      setMessage("");

      // Refresh sidebar after sending message
      const updatedChats = await getProductChatsByUser(currentUserId);

      if (Array.isArray(updatedChats)) {
        setChats(updatedChats);
      }
    } catch (err) {
      console.log(err);
      alert("Message not sent");
    }
  };

  const getBuyerId = (chatItem) => {
    return typeof chatItem.buyer === "object"
      ? chatItem.buyer._id
      : chatItem.buyer;
  };

  const getSellerId = (chatItem) => {
    return typeof chatItem.seller === "object"
      ? chatItem.seller._id
      : chatItem.seller;
  };

  const getMyRole = (chatItem) => {
    const buyerId = getBuyerId(chatItem);
    const sellerId = getSellerId(chatItem);

    if (buyerId === currentUserId) return "Buyer";
    if (sellerId === currentUserId) return "Seller";

    return "User";
  };

  const getOtherUser = (chatItem) => {
    if (!chatItem) return null;

    const buyerId = getBuyerId(chatItem);

    return buyerId === currentUserId ? chatItem.seller : chatItem.buyer;
  };

  const getOtherUserName = (chatItem) => {
    const otherUser = getOtherUser(chatItem);
    return otherUser?.name || otherUser?.email || "User";
  };

  const filteredChats = chats.filter((chatItem) => {
    const otherUserName = getOtherUserName(chatItem).toLowerCase();
    const productTitle = chatItem.product?.title?.toLowerCase() || "";

    return (
      otherUserName.includes(search.toLowerCase()) ||
      productTitle.includes(search.toLowerCase())
    );
  });

  if (!currentUserId) {
    return <div style={styles.loading}>Please login first</div>;
  }

  return (
    <div style={styles.page} dir="rtl">
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>الرسائل</h2>

        <input
          type="text"
          placeholder="بحث في المحادثات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.chatList}>
          {filteredChats.length > 0 ? (
            filteredChats.map((chatItem) => {
              const otherUserName = getOtherUserName(chatItem);
              const myRole = getMyRole(chatItem);

              const lastMessage =
                chatItem.messages?.[chatItem.messages.length - 1]?.text ||
                "لا توجد رسائل بعد";

              return (
                <button
                  key={chatItem._id}
                  onClick={() => handleSelectChat(chatItem._id)}
                  style={{
                    ...styles.chatItem,
                    ...(chatId === chatItem._id ? styles.activeChat : {}),
                  }}
                >
                  <div style={styles.avatar}>{otherUserName.charAt(0)}</div>

                  <div style={styles.chatInfo}>
                    <h6 style={styles.chatName}>{otherUserName}</h6>

                    <p style={styles.productName}>
                      {chatItem.product?.title || "Product"}
                    </p>

                    <span
                      style={{
                        ...styles.roleBadge,
                        ...(myRole === "Buyer"
                          ? styles.buyerBadge
                          : styles.sellerBadge),
                      }}
                    >
                      {myRole}
                    </span>

                    <p style={styles.lastMessage}>{lastMessage}</p>
                  </div>
                </button>
              );
            })
          ) : (
            <p style={styles.noMessages}>لا توجد محادثات بعد</p>
          )}
        </div>
      </aside>

      {!chat ? (
        <main style={styles.chatWindow}>
          <div style={styles.emptyChat}>اختر محادثة من القائمة</div>
        </main>
      ) : (
        <ChatWindow
          chat={chat}
          currentUserId={currentUserId}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          getOtherUserName={getOtherUserName}
          getMyRole={getMyRole}
        />
      )}
    </div>
  );
}

function ChatWindow({
  chat,
  currentUserId,
  message,
  setMessage,
  handleSendMessage,
  getOtherUserName,
  getMyRole,
}) {
  const otherUserName = getOtherUserName(chat);
  const productTitle = chat.product?.title || "Product";
  const myRole = getMyRole(chat);

  return (
    <main style={styles.chatWindow}>
      <div style={styles.chatHeader}>
        <div style={styles.avatar}>{otherUserName.charAt(0)}</div>

        <div>
          <h6 style={styles.headerName}>{otherUserName}</h6>

          <p style={styles.status}>
            بخصوص: {productTitle}
          </p>

          <span
            style={{
              ...styles.roleBadge,
              ...(myRole === "Buyer" ? styles.buyerBadge : styles.sellerBadge),
            }}
          >
            You are {myRole}
          </span>
        </div>
      </div>

      <div style={styles.messagesArea}>
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg, index) => {
            const senderId =
              typeof msg.sender === "object" ? msg.sender._id : msg.sender;

            const isMyMessage = senderId === currentUserId;

            return (
              <div
                key={msg._id || index}
                style={{
                  ...styles.message,
                  ...(isMyMessage ? styles.myMessage : styles.hisMessage),
                }}
              >
                <p style={styles.messageText}>{msg.text}</p>

                <span style={styles.messageTime}>
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString()
                    : ""}
                </span>
              </div>
            );
          })
        ) : (
          <p style={styles.noMessages}>
            لا توجد رسائل بعد، ابدأ المحادثة الآن.
          </p>
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="اكتب رسالتك هنا..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          style={styles.messageInput}
        />

        <button onClick={handleSendMessage} style={styles.sendButton}>
          إرسال
        </button>
      </div>
    </main>
  );
}

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

  loading: {
    height: "calc(100vh - 95px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5a3e2b",
    fontWeight: "700",
    fontSize: "22px",
    backgroundColor: "#fdf5ec",
  },

  sidebar: {
    width: "320px",
    minWidth: "320px",
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
    backgroundColor: "#5a3e2b",
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
    margin: "0 0 4px",
    color: "#5a3e2b",
    fontWeight: "700",
  },

  productName: {
    margin: "0 0 4px",
    color: "#8b6f47",
    fontSize: "13px",
    fontWeight: "600",
  },

  roleBadge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "700",
    padding: "3px 9px",
    borderRadius: "999px",
    marginBottom: "5px",
  },

  buyerBadge: {
    backgroundColor: "#e6f4ec",
    color: "#2d7a4f",
    border: "1px solid #2d7a4f",
  },

  sellerBadge: {
    backgroundColor: "#fef3de",
    color: "#b07d1a",
    border: "1px solid #b07d1a",
  },

  lastMessage: {
    margin: 0,
    fontSize: "13px",
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

  emptyChat: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5a3e2b",
    fontWeight: "700",
    fontSize: "22px",
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
    margin: "0 0 5px",
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

  noMessages: {
    textAlign: "center",
    color: "#7a5a3a",
    marginTop: "20px",
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