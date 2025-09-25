// app/users/page.tsx
"use client";
import React, { useState } from "react";

const users = [
  { id: 1, name: "Zolotoy", lastMsg: "2005", time: "4:12 PM", unread: 1 },
  { id: 2, name: "Zuxra Ganieva", lastMsg: "Ярашибди ома 😅", time: "4:07 PM", unread: 0 },
  { id: 3, name: "Fayzillo Ummatov", lastMsg: "https://mui.com/toolp...", time: "3:24 PM", unread: 0 },
  { id: 4, name: "Abduxoshim Sultonqulov", lastMsg: "import { PrismaClient } from ...", time: "Wed", unread: 0 },
  { id: 5, name: "Muslima", lastMsg: "хоп", time: "Wed", unread: 0 },
];

const messages = [
  { fromMe: false, text: "кизлар борми?", time: "1:18 PM" },
  { fromMe: true, text: "қанқа?", time: "1:19 PM" },
  { fromMe: false, text: "оқишдами?", time: "1:19 PM" },
  
];

export default function UsersPage() {
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-screen bg-[#222b3a]">
      {/* Left Sidebar - Telegram style */}
  <div className="w-80 bg-[#1b232e] text-white flex flex-col border-r border-[#2a3442] min-h-screen">
        {/* Top nav with hamburger and avatars */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#232f3d]">
          <button
            className="p-2 rounded hover:bg-[#232f3d] focus:outline-none"
            onClick={() => setShowModal(true)}
            aria-label="Open menu"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
          {/* Horizontally scrollable avatars */}
          <div className="flex-1 overflow-x-auto ml-2">
            <div className="flex gap-2 w-max pr-2">
              {users.map((u) => (
                <div key={u.id} className="w-8 h-8 rounded-full bg-[#3a4a5e] flex items-center justify-center font-bold text-sm border-2 border-[#1b232e] shrink-0">
                  {u.name[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Search bar */}
        <div className="px-4 py-2 border-b border-[#232f3d]">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#232f3d] text-white rounded px-3 py-2 text-sm outline-none border-none"
          />
        </div>
        {/* Chat list */}
        <div className="flex-1 overflow-y-auto py-2">
          {filteredUsers.map((u, i) => (
            <div
              key={u.id}
              onClick={() => setSelected(users.indexOf(u))}
              className={`flex items-center gap-3 mx-2 mb-2 px-4 py-3 cursor-pointer rounded-2xl transition-all border border-transparent ${selected === users.indexOf(u) ? "bg-[#232f3d] border-[#2a9df4] shadow-lg" : "hover:bg-[#232f3d]/60"}`}
              style={{ minHeight: 64 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3a4a5e] to-[#2a9df4] flex items-center justify-center font-bold text-lg shadow-md">
                {u.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold truncate">{u.name}</span>
                  <span className="text-xs text-[#b0b8c1] ml-2 whitespace-nowrap">{u.time}</span>
                </div>
                <div className="text-xs text-[#b0b8c1] truncate">{u.lastMsg}</div>
              </div>
              {u.unread > 0 && (
                <span className="ml-2 bg-[#2a9df4] text-white rounded-full text-xs px-2 py-0.5 font-semibold shadow">{u.unread}</span>
              )}
            </div>
          ))}
        </div>
        {/* Sidebar Modal */}
        {showModal && (
          <>
            {/* Overlay only dims the main content, not the modal */}
            <div className="fixed inset-0 z-40 bg-opacity-40 transition-opacity" onClick={() => setShowModal(false)}></div>
            {/* Sidebar modal content slides in from left, stays above overlay */}
            <div className="fixed top-0 left-0 z-50 h-full w-80 max-w-full bg-[#232f3d] text-white flex flex-col p-6 animate-slideInLeft shadow-xl">
              <button className="absolute top-4 right-4 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#3a4a5e] flex items-center justify-center font-bold text-lg">
                  {users[selected].name[0]}
                </div>
                <div>
                  <div className="font-semibold">{users[selected].name}</div>
                  <div className="text-xs text-[#b0b8c1]">@{users[selected].name.toLowerCase().replace(/\s/g, "_")}</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button className="text-left py-2 px-3 rounded hover:bg-[#2a3442]">My Profile</button>
                <button className="text-left py-2 px-3 rounded hover:bg-[#2a3442]">New Group</button>
                <button className="text-left py-2 px-3 rounded hover:bg-[#2a3442]">Contacts</button>
                <button className="text-left py-2 px-3 rounded hover:bg-[#2a3442]">Settings</button>
                <button className="text-left py-2 px-3 rounded hover:bg-[#2a3442]">Night Mode</button>
              </div>
            </div>
          </>
        )}
      </div>
        {/* Main content (chat + profile) with opacity when modal is open */}
        <div className={showModal ? "flex flex-1 h-screen opacity-40 transition-opacity duration-200" : "flex flex-1 h-screen transition-opacity duration-200"}>
          {/* Chat */}
          <div className="flex-1 flex flex-col bg-[#222b3a] relative">
            {/* Chat header */}
            <div className="p-4 border-b border-[#2a3442] text-white font-semibold text-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#3a4a5e] mr-3 flex items-center justify-center font-bold text-lg">
                {users[selected].name[0]}
              </div>
              <span>{users[selected].name}</span>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow ${msg.fromMe ? "self-end bg-[#2a9df4] text-white" : "self-start bg-[#232f3d] text-white"}`}
                >
                  {msg.text}
                  <div className="text-[10px] text-[#b0b8c1] mt-1 text-right">{msg.time}</div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div className="p-4 border-t border-[#2a3442] bg-[#232f3d] flex">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 bg-[#2a3442] text-white rounded-full px-4 py-2 text-sm outline-none border-none"
              />
              <button className="ml-3 bg-[#2a9df4] text-white rounded-full px-5 py-2 font-semibold">Send</button>
            </div>
          </div>
          {/* Right Sidebar (Profile) */}
          <div className="w-80 bg-[#1b232e] text-white flex flex-col border-l border-[#2a3442]">
            <div className="flex flex-col items-center py-8 px-4">
              <div className="w-24 h-24 rounded-full bg-[#3a4a5e] flex items-center justify-center font-bold text-4xl mb-4">
                {users[selected].name[0]}
              </div>
              <div className="text-xl font-semibold mb-1">{users[selected].name}</div>
              <div className="text-sm text-[#b0b8c1] mb-2">@{users[selected].name.toLowerCase().replace(/\s/g, "_")}</div>
              <div className="text-xs text-[#b0b8c1]">Last seen: {users[selected].time}</div>
            </div>
            <div className="px-4 pb-4">
              <div className="font-semibold mb-1">About</div>
              <div className="text-sm text-[#b0b8c1]">This is a demo profile. You can add more info here.</div>
            </div>
          </div>
        </div>
      </div>
  );
}
