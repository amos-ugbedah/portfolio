import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaCommentDots, FaTimes, FaSpinner } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../services/supabaseClient';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(uuidv4()); // Removed setSessionId since it's not used
  const chatRef = useRef(null);

  const systemMemory = `You are a helpful AI assistant for Amos Ugbedah's portfolio. 
    Amos is a Health Information Management professional with expertise in:
    - Data analysis and health information technology
    - Records management and data quality assurance
    - Database management systems
    - Website development`;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // Load chat history from Supabase
  useEffect(() => {
    const loadChatHistory = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          text: msg.message,
          sender: msg.role
        })));
      }
    };
    
    loadChatHistory();
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      text: input,
      sender: 'user',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    await supabase
      .from('chats')
      .insert([{
        session_id: sessionId,
        message: input,
        role: 'user'
      }]);

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemMemory },
            { role: 'user', content: input }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

      const botMessage = {
        id: uuidv4(),
        text: reply,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
      
      await supabase
        .from('chats')
        .insert([{
          session_id: sessionId,
          message: reply,
          role: 'assistant'
        }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: uuidv4(),
        text: `Error: ${error.message}`,
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all"
          aria-label="Open chat"
        >
          <FaCommentDots size={24} />
        </button>
      ) : (
        <div className="w-[320px] h-[450px] bg-white shadow-xl rounded-xl flex flex-col border border-gray-200">
          <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center gap-2 font-medium">
              <FaRobot className="text-blue-200" /> Portfolio Assistant
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-200"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div
            ref={chatRef}
            className="flex-1 p-3 overflow-y-auto text-sm space-y-3 bg-gray-50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 text-gray-800'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg text-gray-700">
                  <FaSpinner className="animate-spin" />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Ask about Amos..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center text-sm"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;