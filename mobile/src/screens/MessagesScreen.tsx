import React, { useState } from 'react';
import { Send, UserCheck, Paperclip } from 'lucide-react';

export const MobileMessagesScreen: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    {
      sender: 'David Ssenyonjo (Lead Architect)',
      text: 'Good morning Catherine. The Italian Arabescato slabs have been matched and are being calibrated today.',
      time: '09:42',
      isMe: false
    },
    {
      sender: 'You',
      text: 'Looks wonderful David. Did the bronze switchplates arrive as well?',
      time: '10:15',
      isMe: true
    },
    {
      sender: 'David Ssenyonjo (Lead Architect)',
      text: 'Yes, they arrived from Birmingham yesterday and are stored in the secure site container.',
      time: '10:20',
      isMe: false
    }
  ]);
  const [input, setInput] = useState<string>('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        sender: 'You',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }
    ]);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] pb-20 text-stone-900 h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#EDE8E1] px-5 pt-12 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold">
            Dedicated Project Architect
          </span>
          <h1 className="font-serif-luxury text-xl font-light text-stone-900">
            David Ssenyonjo
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#2D6A4F] bg-[#F0F7F4] px-2 py-0.5 rounded-full border border-[#B7E4C7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
          <span>Active</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[80%] ${
              m.isMe ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <span className="text-[9px] font-mono text-stone-400 mb-1">{m.sender}</span>
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.isMe
                  ? 'bg-[#801D31] text-white rounded-br-none'
                  : 'bg-white border border-[#EDE8E1] text-stone-800 rounded-bl-none shadow-xs'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] font-mono text-stone-400 mt-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EDE8E1] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message your architect..."
          className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#EDE8E1] rounded-full text-xs text-stone-900 focus:outline-none focus:border-[#801D31]"
        />
        <button
          type="submit"
          className="p-2.5 rounded-full bg-[#801D31] text-white active:scale-95 transition-transform"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
