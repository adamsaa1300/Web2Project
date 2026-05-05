import { useState } from "react";

export default function Sidebar({ chats, activeChatId, setActiveChatId }) {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="sidebar h-100 p-3">
      <h2 className="text-center fs-5 fw-bold mb-3">الرسائل</h2>

      <input
        type="text"
        className="form-control form-control-sm search-input mb-3"
        placeholder="بحث في المحادثات..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex flex-column gap-2">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            className={`chat-item btn text-end d-flex align-items-center gap-2 ${
              activeChatId === chat.id ? "active-chat" : ""
            }`}
            onClick={() => setActiveChatId(chat.id)}
          >
            <div
              className="avatar d-flex align-items-center justify-content-center"
              style={{ backgroundColor: chat.color }}
            >
              {chat.avatar}
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <h6 className="mb-1 fw-bold">{chat.name}</h6>
              <p className="mb-0 small text-truncate">
                {chat.messages[chat.messages.length - 1]?.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}