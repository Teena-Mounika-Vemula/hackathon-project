import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const res = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble answering right now." }
      ]);
    }

    setUserInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 h-96 bg-[#FFF8E1] rounded-2xl shadow-2xl p-4 flex flex-col border border-[#F4511E]">
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
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full border border-[#F4511E] rounded px-2 py-1 text-[#4E342E]"
            />
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
