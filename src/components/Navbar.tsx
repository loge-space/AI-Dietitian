import React from 'react';
import { useDiet } from '../context/DietContext';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery';
  setActiveTab: (tab: 'home' | 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery') => void;
  openProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openProfile }) => {
  const { profile } = useDiet();

  const handleNavClick = (tabId: 'home' | 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery', hashAnchor?: string) => {
    setActiveTab(tabId);
    if (hashAnchor && tabId === 'home') {
      setTimeout(() => {
        const el = document.querySelector(hashAnchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--paper)]/85 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching SVG from HTML */}
        <button onClick={() => handleNavClick('home', '#top')} className="flex items-center gap-2.5 group">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="transition-transform group-hover:scale-105">
            <circle cx="15" cy="15" r="13" stroke="#1B4332" strokeWidth="2"/>
            <path d="M15 6C15 6 20 10 20 15.5C20 19.6 17.7 22 15 22C12.3 22 10 19.6 10 15.5C10 10 15 6 15 6Z" fill="#2D6A4F"/>
            <path d="M15 22V17" stroke="#E4F3EA" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--forest-900)' }}>
            Dietitian AI
          </span>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px]" style={{ color: 'var(--charcoal)' }}>
          <button
            onClick={() => handleNavClick('home', '#features')}
            className={`nav-link font-medium ${activeTab === 'home' ? 'text-[color:var(--forest-700)]' : ''}`}
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('home', '#how')}
            className="nav-link font-medium"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('home', '#safety')}
            className="nav-link font-medium"
          >
            Science &amp; safety
          </button>
          <button
            onClick={() => handleNavClick('home', '#pricing')}
            className="nav-link font-medium"
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`nav-link font-semibold ${activeTab === 'dashboard' ? 'text-[color:var(--forest-700)] font-bold' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('chat')}
            className={`nav-link font-semibold ${activeTab === 'chat' ? 'text-[color:var(--forest-700)] font-bold' : ''}`}
          >
            AI Assistant
          </button>
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-3">
          <div 
            onClick={openProfile}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer border transition-transform hover:scale-105 ${
              profile.allergies.length > 0
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-[color:var(--sage-100)] border-[color:var(--sage-300)] text-[color:var(--forest-700)]'
            }`}
          >
            {profile.allergies.length > 0 ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Shield ({profile.allergies[0]})</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--forest-700)]" />
                <span>Shield Active</span>
              </>
            )}
          </div>

          <button
            onClick={openProfile}
            className="hidden sm:inline text-[15px] px-2 py-2 font-medium"
            style={{ color: 'var(--forest-700)' }}
          >
            Log in
          </button>

          <button
            onClick={() => handleNavClick('logger')}
            className="text-[14.5px] font-medium px-5 py-2.5 rounded-full text-white transition hover:opacity-90 shadow-sm"
            style={{ background: 'var(--forest-700)' }}
          >
            Start free trial
          </button>
        </div>

      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around bg-[color:var(--paper-dim)] border-t border-[color:var(--line)] px-2 py-2 text-xs font-semibold overflow-x-auto no-scrollbar">
        {[
          { id: 'home', label: 'Home' },
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'chat', label: 'AI Chat' },
          { id: 'logger', label: 'Logger' },
          { id: 'planner', label: 'Planner' },
          { id: 'grocery', label: 'Grocery' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`px-3 py-1.5 rounded-full ${
              activeTab === item.id ? 'bg-[color:var(--forest-700)] text-white font-bold' : 'text-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
