
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// Use getter functions for dynamic data retrieval
import { getPersonalInfo, getProjects, getExperiences, getSkills } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: `Hello. I'm Sanjeevi's digital assistant. How can I provide information about their professional background today?`}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMessage}]);
    setIsTyping(true);

    try {
      // Initialize with apiKey directly from process.env as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Fetch latest data from storage
      const info = getPersonalInfo();
      const experiences = getExperiences();
      const projects = getProjects();
      const skills = getSkills();

      const systemPrompt = `
        You are an AI Assistant for ${info.name}'s professional portfolio.
        Context about SANJEEVI RAMAN E:
        - Title: ${info.title}
        - Bio: ${info.about}
        - Experience: ${JSON.stringify(experiences)}
        - Projects: ${JSON.stringify(projects)}
        - Skills: ${JSON.stringify(skills)}
        - Contact: ${info.email}
        
        Guidelines:
        1. Be sophisticated, professional, and clear.
        2. Act as "Sanjeevi's Digital Assistant".
        3. Keep answers concise.
      `;

      // Call generateContent with model name and prompt directly
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.5,
        }
      });

      // Extract text from the property, not a method
      setMessages(prev => [...prev, {role: 'bot', text: response.text || "I apologize, I was unable to retrieve that information."}]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {role: 'bot', text: "System connection error. Please try again."}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] sm:w-[400px] h-[550px] bg-stone-900 border border-stone-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                <i className="fas fa-brain text-stone-100 text-sm"></i>
              </div>
              <div>
                <p className="text-stone-100 font-bold text-xs uppercase tracking-widest">Digital Twin</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <p className="text-stone-500 text-[10px] uppercase font-bold tracking-tighter">Active System</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-stone-100 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-950/30"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-stone-100 text-stone-950 rounded-br-none shadow-lg' 
                    : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-800 border border-stone-700 px-5 py-3 rounded-2xl rounded-bl-none text-stone-400 text-xs flex gap-2 items-center">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-stone-600 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-stone-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-stone-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  Retrieving data...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-stone-900 border-t border-stone-800">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills or projects..."
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-5 py-4 pr-14 text-sm text-stone-100 focus:outline-none focus:bg-stone-900 focus:border-stone-500 transition-all font-light"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2.5 top-2.5 w-9 h-9 bg-stone-100 rounded-xl text-stone-950 flex items-center justify-center hover:bg-stone-200 transition-all"
              >
                <i className="fas fa-arrow-up text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-stone-100 hover:bg-stone-200 rounded-2xl shadow-2xl flex items-center justify-center text-stone-950 text-2xl transition-all transform hover:-translate-y-2 active:scale-95 z-[110]"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-headset'}`}></i>
      </button>
    </div>
  );
};

export default AIAssistant;
