import React, { useState, useRef, useEffect } from 'react';
import { getPublishingAdvice } from '../services/geminiService';

const BookAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Howdy! I'm your T & R virtual assistant. Need help finding a book or choosing a publishing package?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const aiResponse = await getPublishingAdvice(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 mb-4 border border-brand-purple overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-brand-purple p-3 flex justify-between items-center">
            <h3 className="text-white font-bold">T & R Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-brand-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-64 sm:h-80">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-purple text-white rounded-br-none' 
                    : 'bg-brand-gold text-brand-purple font-medium rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 italic ml-2">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about packages or books..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:border-brand-purple"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-brand-purple text-white px-4 py-2 rounded-r-md hover:bg-purple-800 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-gold text-brand-purple p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center justify-center"
      >
        {!isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default BookAssistant;