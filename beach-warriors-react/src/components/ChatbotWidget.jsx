import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);

  const chatbotRef = useRef(null);

  // 👇 Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const sendMessage = async (input = userInput) => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const res = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble answering right now." }
      ]);
    }

    setUserInput('');
  };

  const handleSuggestionClick = (text) => {
    sendMessage(text);
    setSuggestions([]); // Optional: clear suggestions after click
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          ref={chatbotRef}
          className="w-80 h-[30rem] bg-[#FFF8E1] rounded-2xl shadow-2xl p-4 flex flex-col border border-[#F4511E]"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#FF7043]">BeachBot 🤖</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-[#F4511E] font-bold text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto border rounded p-2 text-sm text-[#4E342E] bg-white space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-[#FFE0B2] self-end text-right'
                    : 'bg-[#FFF3E0]'
                }`}
              >
                {msg.content}
              </div>
            ))}

            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-orange-100 text-sm text-[#BF360C] border border-orange-300 px-3 py-1 rounded-full hover:bg-orange-200 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-white border border-orange-300 rounded-full px-5 py-2 text-[#333] shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />

            <button
              onClick={() => sendMessage()}
              className="p-3 bg-gradient-to-br from-orange-500 via-rose-500 to-red-500 text-white rounded-full shadow-[0_4px_14px_rgba(255,80,80,0.4)] hover:shadow-[0_6px_24px_rgba(255,50,50,0.6)] transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#FF7043] text-white rounded-full p-4 shadow-lg hover:bg-[#F4511E] transition-all"
        >
          <MessageCircle />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
