import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatwindow";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [activeChatId, setActiveChatId] = useState(1);

  const chats = [
    {
      id: 1,
      name: "محمد أبو علي",
      status: "متصل الآن",
      avatar: "م",
      color: "#7c5cff",
      messages: [
        { from: "him", text: "السلام عليكم، هل اللابتوب لسا متاح؟", time: "10:30" },
        { from: "me", text: "وعليكم السلام، نعم متاح", time: "10:32" },
      ],
    },
    {
      id: 2,
      name: "سارة الخطيب",
      status: "غير متصلة",
      avatar: "س",
      color: "#ff2f6d",
      messages: [
        { from: "him", text: "بقدر أساعدك الحين", time: "9:20" },
      ],
    },
  ];

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <>
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="container-fluid p-0 chat-page" dir="rtl">
        <div className="row g-0">
          <div className="col-12 col-md-4 col-lg-3">
            <Sidebar
              chats={chats}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
            />
          </div>

          <div className="col-12 col-md-8 col-lg-9">
            <ChatWindow chat={activeChat} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;