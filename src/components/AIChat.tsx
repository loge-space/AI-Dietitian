import React, { useState, useRef, useEffect } from 'react';
import { useDiet } from '../context/DietContext';
import { Send, Sparkles, Trash2, ShieldAlert, Bot, User, Leaf } from 'lucide-react';

export const AIChat: React.FC = () => {
  const { chatMessages, sendChatMessage, clearChat, profile } = useDiet();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    'Log meal: 200g grilled salmon with quinoa & broccoli',
    'Generate daily meal plan for muscle gain',
    'How do I hit my 145g protein target daily?',
    'What should I eat 1 hour before workout?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText.trim());
    setInputText('');
  };

  const handlePresetClick = (preset: string) => {
    sendChatMessage(preset);
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-extrabold text-base text-forest-500 mt-3 mb-2 flex items-center space-x-2">
            <span>{line.replace('### ', '')}</span>
          </h3>
        );
      }

      if (line.includes('ALLERGY SHIELD WARNING')) {
        return (
          <div key={idx} className="my-2 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-bold flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{line}</span>
          </div>
        );
      }

      if (line.startsWith('|')) {
        const cells = line.split('|').filter(c => c.trim() !== '');
        if (line.includes('---')) return null;
        return (
          <div key={idx} className="grid grid-cols-2 gap-2 my-1 px-3 py-1.5 bg-cream-50 rounded-xl text-xs font-medium border border-cream-200">
            <span className="text-slate-700 font-bold">{cells[0]?.replace(/\*/g, '')}</span>
            <span className="text-forest-500 font-extrabold text-right">{cells[1]?.replace(/\*/g, '')}</span>
          </div>
        );
      }

      if (line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="text-slate-700 text-xs sm:text-sm ml-4 list-disc my-1">
            {line.replace('- ', '')}
          </li>
        );
      }

      if (line.includes('💡 Dietitian Tip:')) {
        return (
          <div key={idx} className="my-3 p-3.5 bg-forest-50 border border-forest-100 rounded-2xl text-forest-600 text-xs sm:text-sm font-semibold">
            {line}
          </div>
        );
      }

      if (line.trim() === '') return <div key={idx} className="h-1" />;

      return (
        <p key={idx} className="text-slate-700 text-xs sm:text-sm leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white border border-cream-200 rounded-3xl shadow-soft-card overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-cream-50/80 border-b border-cream-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-forest-500 flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-forest-500 text-base">Dietitian AI Assistant</h2>
              <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500">
              Clinical persona • Allergy Shield active ({profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}).
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-cream-100 rounded-full transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Presets */}
      <div className="px-6 py-3 bg-cream-50/40 border-b border-cream-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-forest-500" />
          <span>Quick Prompts:</span>
        </span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetClick(preset)}
            className="text-xs font-semibold px-3 py-1.5 bg-white hover:bg-cream-100 text-slate-700 border border-cream-200 rounded-full whitespace-nowrap transition-colors shadow-sm"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Messages Log */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-cream-50/20">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-forest-500 text-white'
                  : 'bg-cream-200 text-forest-500 border border-cream-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-3xl px-5 py-3.5 border shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-forest-500 text-white border-forest-500 rounded-tr-none'
                  : 'bg-white text-slate-800 border-cream-200 rounded-tl-none'
              }`}
            >
              {renderMessageContent(msg.text)}

              <div
                className={`text-[10px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-forest-100' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area & Medical Disclaimer */}
      <div className="p-4 bg-white border-t border-cream-200 space-y-3">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask Dietitian AI or describe a meal to analyze..."
            className="flex-1 bg-cream-50 border border-cream-200 rounded-full px-5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-forest-500 hover:bg-forest-600 disabled:opacity-50 text-white p-3 rounded-full shadow-pill transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400 italic">
          <strong>Medical Disclaimer:</strong> Recommendations are for informational guidance and do not replace primary care physician advice.
        </p>
      </div>

    </div>
  );
};
