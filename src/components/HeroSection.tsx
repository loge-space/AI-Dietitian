import React from 'react';
import { useDiet } from '../context/DietContext';
import { Check, ShieldCheck, Play, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery') => void;
  openProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, openProfile }) => {
  const { profile } = useDiet();

  return (
    <section className="py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2">
              <span className="text-sm font-semibold text-sage-500 tracking-wide">
                Your AI dietitian here
              </span>
            </div>

            {/* Main Headline (Exact match to screenshot) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-500 tracking-tight leading-[1.1]">
              Clinical nutrition, <br />
              carried in your pocket.
            </h1>

            {/* Body Copy (Exact match to screenshot) */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Point your camera at a plate and get a full macro breakdown in seconds. Dietitian AI learns how your body actually responds to food and adjusts your plan every day — no spreadsheets, no guesswork.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('logger')}
                className="px-7 py-3.5 rounded-full bg-forest-500 hover:bg-forest-600 text-white font-bold text-sm shadow-pill transition-all duration-200 hover:scale-[1.02]"
              >
                Get your personalized plan
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-cream-100 border border-cream-300 text-forest-500 font-bold text-sm transition-all duration-200 flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 fill-forest-500" />
                <span>Watch demo</span>
              </button>
            </div>

            {/* Subtext */}
            <div className="flex items-center space-x-3 text-xs text-sage-500 font-medium pt-1">
              <span>No credit card to start</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>

          </div>

          {/* Right Hero Column: Circular Plate Visual & Floating Macro Pills (Exact match to screenshot) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* Soft Ambient Aura */}
            <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-sage-100 to-forest-50 rounded-full blur-2xl -z-10 opacity-70" />

            {/* Outer Circular Container */}
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
              
              {/* Green Outer Ring Halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sage-200/50 via-forest-100 to-sage-300/30 p-3 shadow-floating">
                
                {/* Plate Base */}
                <div className="w-full h-full bg-[#EDE8DE] rounded-full border-2 border-dashed border-sage-300/80 p-6 relative flex items-center justify-center shadow-inner">
                  
                  {/* Inner Organic Food Shapes (Simulating the camera plate scanner in reference screenshot) */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* Terracotta Red Oval (Carbs/Energy) */}
                    <div className="absolute w-28 h-20 sm:w-36 sm:h-24 bg-terracotta/85 rounded-[50%] -rotate-12 translate-x-[-20px] translate-y-[-10px] shadow-sm transition-transform hover:scale-105" />
                    
                    {/* Sage Green Oval (Vegetables/Fiber) */}
                    <div className="absolute w-20 h-14 sm:w-24 sm:h-16 bg-sage-400/90 rounded-[50%] rotate-45 translate-x-[35px] translate-y-[-30px] shadow-sm" />
                    
                    {/* Olive Oval (Protein) */}
                    <div className="absolute w-24 h-16 sm:w-28 sm:h-18 bg-olive/90 rounded-[50%] -rotate-6 translate-x-[40px] translate-y-[20px] shadow-sm" />
                    
                    {/* Mustard Ochre Oval (Healthy Fats) */}
                    <div className="absolute w-24 h-16 sm:w-28 sm:h-18 bg-ochre/85 rounded-[50%] rotate-12 translate-x-[-10px] translate-y-[35px] shadow-sm" />
                    
                  </div>

                </div>
              </div>

              {/* Floating Pill Card 1: Protein (Top Left) */}
              <div className="absolute top-4 left-0 sm:-left-3 bg-white/95 backdrop-blur-md border border-cream-200 rounded-2xl px-4 py-3 shadow-floating min-w-[96px] sm:min-w-[104px] z-30 flex flex-col items-start">
                <span className="text-[11px] font-medium text-slate-400">Protein</span>
                <span className="text-lg font-extrabold text-forest-500">38g</span>
              </div>

              {/* Floating Pill Card 2: Calories (Middle Right) */}
              <div className="absolute top-1/2 -right-0 sm:-right-3 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-cream-200 rounded-2xl px-4 py-3 shadow-floating min-w-[96px] sm:min-w-[104px] z-30 flex flex-col items-start">
                <span className="text-[11px] font-medium text-slate-400">Calories</span>
                <span className="text-lg font-extrabold text-forest-500">512</span>
              </div>

              {/* Floating Pill Card 3: Allergy Shield (Bottom) */}
              <div className="absolute -bottom-3 left-1/3 bg-white/95 backdrop-blur-md border border-cream-200 rounded-2xl px-4 py-2.5 shadow-floating flex items-center space-x-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Allergy shield</span>
                  <span className="text-xs font-bold text-forest-500 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-forest-500 stroke-[3]" />
                    <span>{profile.allergies.length > 0 ? `Shielded (${profile.allergies[0]})` : 'Clear'}</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
