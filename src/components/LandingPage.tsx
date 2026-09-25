import React, { useState } from 'react';

interface LandingPageProps {
  onLaunchApp: (tab?: 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery') => void;
}

interface FoodChipData {
  id: string;
  label: string;
  protein: number;
  carb: number;
  fat: number;
  cal: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const foodChipsList: FoodChipData[] = [
    { id: 'paneer', label: 'Paneer Bhurji & Multigrain Roti', protein: 28, carb: 35, fat: 18, cal: 410 },
    { id: 'dal', label: 'Dal Makhani & Brown Rice', protein: 14, carb: 58, fat: 12, cal: 390 },
    { id: 'dosa', label: 'Masala Dosa & Sambhar', protein: 8, carb: 52, fat: 10, cal: 330 },
    { id: 'chicken', label: 'Tandoori Chicken & Salad', protein: 38, carb: 8, fat: 14, cal: 350 },
    { id: 'rajma', label: 'Rajma Chawal & Raita', protein: 16, carb: 65, fat: 8, cal: 400 },
  ];

  const targets = { protein: 140, carb: 210, fat: 65, cal: 2100 };

  const currentTotals = selectedChips.reduce(
    (acc, chipId) => {
      const chip = foodChipsList.find(c => c.id === chipId);
      if (!chip) return acc;
      return {
        protein: acc.protein + chip.protein,
        carb: acc.carb + chip.carb,
        fat: acc.fat + chip.fat,
        cal: acc.cal + chip.cal,
      };
    },
    { protein: 0, carb: 0, fat: 0, cal: 0 }
  );

  const toggleChip = (id: string) => {
    setSelectedChips(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const resetLog = () => setSelectedChips([]);

  const CIRC = 2 * Math.PI * 42;

  const getDashOffset = (value: number, max: number) => {
    const pct = Math.min(value / max, 1);
    return CIRC - pct * CIRC;
  };

  const remainingCals = targets.cal - currentTotals.cal;

  const renderAssistantNote = () => {
    if (currentTotals.cal === 0) {
      return (
        <>
          Tap any Indian meal above (e.g. <i>Paneer Bhurji</i> or <i>Rajma Chawal</i>) to test real-time macro tracking — calories logged:{' '}
          <span className="font-medium text-[color:var(--forest-900)]">0</span>.
        </>
      );
    }
    if (currentTotals.protein < targets.protein * 0.4) {
      return (
        <>
          You're at <span className="font-medium text-[color:var(--forest-900)]">{currentTotals.cal} calories</span> with protein running low — about{' '}
          <span className="font-medium text-[color:var(--forest-900)]">{remainingCals} left</span> today. Adding Paneer, Soya, or Chicken would balance your macros.
        </>
      );
    }
    if (remainingCals < 300) {
      return (
        <>
          Logged <span className="font-medium text-[color:var(--forest-900)]">{currentTotals.cal} calories</span> — only about{' '}
          <span className="font-medium text-[color:var(--forest-900)]">{Math.max(remainingCals, 0)} left</span>. Keep dinner light with Moong Dal Khichdi or Palak Soup.
        </>
      );
    }
    return (
      <>
        Great Indian meal balance — <span className="font-medium text-[color:var(--forest-900)]">{currentTotals.cal} calories</span> logged with about{' '}
        <span className="font-medium text-[color:var(--forest-900)]">{remainingCals}</span> left, macros right on target.
      </>
    );
  };

  return (
    <div className="relative">
      
      {/* HERO SECTION */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[color:var(--sage-100)] border border-[color:var(--sage-300)] text-xs font-bold text-[color:var(--forest-700)]">
              <span>🇮🇳 Tailored for Indian Diets &amp; Nutrition</span>
            </div>
            <h1 className="font-display text-[2.6rem] leading-[1.08] sm:text-[3.4rem] sm:leading-[1.06] font-semibold tracking-tight" style={{ color: 'var(--forest-900)' }}>
              Clinical Indian nutrition,<br /> carried in your pocket.
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed max-w-md" style={{ color: '#4A4D47' }}>
              Point your camera at a thali or describe your meal out loud. Dietitian AI accurately calculates macros for Paneer, Dals, Biryani, Dosa &amp; Rotis — with zero spreadsheets or guesswork.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onLaunchApp('logger')}
                className="px-6 py-3.5 rounded-full text-white font-medium text-[15px] transition hover:opacity-90 shadow-sm"
                style={{ background: 'var(--forest-700)' }}
              >
                Get your Indian meal plan
              </button>
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-full font-medium text-[15px] border transition hover:bg-[color:var(--paper-dim)]"
                style={{ borderColor: 'var(--line)', color: 'var(--forest-900)' }}
              >
                Try interactive demo
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-[13.5px]" style={{ color: '#6B6E67' }}>
              <span>Pure Veg • Eggetarian • Non-Veg</span>
              <span className="w-1 h-1 rounded-full" style={{ background: '#B9BBB5' }}></span>
              <span>ICMR Guidelines</span>
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end py-4 px-6">
            <div className="relative mx-auto lg:mr-4 w-full max-w-[340px] sm:max-w-[390px] aspect-square">
              <div
                className="absolute inset-0 rounded-full plate-orbit"
                style={{ background: 'conic-gradient(from 0deg, var(--sage-300), transparent 20%, transparent 80%, var(--sage-300))' }}
              />
              <div
                className="absolute inset-[12px] sm:inset-[14px] rounded-full shadow-2xl overflow-hidden border-8 border-white"
                style={{ background: 'radial-gradient(circle at 35% 30%, #EFEAE0, #E3DCC9 70%)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Indian Thali / Healthy Bowl"
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = document.getElementById('heroPlateFallback');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <svg id="heroPlateFallback" viewBox="0 0 200 200" className="w-full h-full absolute inset-0" style={{ display: 'none' }}>
                  <circle cx="100" cy="100" r="98" fill="#E3DCC9" />
                  <ellipse cx="78" cy="88" rx="34" ry="22" fill="#B5482F" opacity="0.85" />
                  <ellipse cx="118" cy="70" rx="20" ry="14" fill="#6E8F5C" opacity="0.85" />
                  <ellipse cx="130" cy="110" rx="24" ry="16" fill="#6E8F5C" opacity="0.7" />
                  <ellipse cx="90" cy="130" rx="30" ry="18" fill="#D9B45C" opacity="0.8" />
                  <circle cx="100" cy="100" r="98" fill="none" stroke="#C9C0A6" strokeWidth="2" />
                </svg>
              </div>

              {/* Scan ring */}
              <svg className="absolute inset-[12px] sm:inset-[14px] w-[calc(100%-24px)] sm:w-[calc(100%-28px)] h-[calc(100%-24px)] sm:h-[calc(100%-28px)] pointer-events-none" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="94" fill="none" stroke="var(--forest-700)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.5" />
              </svg>

              {/* Macro Callouts */}
              <div className="absolute left-0 sm:-left-3 top-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 border z-30 min-w-[96px] sm:min-w-[104px]" style={{ borderColor: 'var(--line)' }}>
                <p className="text-[11px] font-medium" style={{ color: '#8A8D86' }}>Protein</p>
                <p className="font-display font-semibold text-lg" style={{ color: 'var(--forest-700)' }}>38g</p>
              </div>

              <div className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 border z-30 min-w-[96px] sm:min-w-[104px]" style={{ borderColor: 'var(--line)' }}>
                <p className="text-[11px] font-medium" style={{ color: '#8A8D86' }}>Calories</p>
                <p className="font-display font-semibold text-lg" style={{ color: 'var(--forest-900)' }}>512</p>
              </div>

              <div className="absolute left-6 sm:left-10 -bottom-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2.5 border z-30 flex items-center gap-2" style={{ borderColor: 'var(--line)' }}>
                <div>
                  <p className="text-[11px] font-medium text-slate-500">Allergy shield</p>
                  <p className="font-display font-semibold text-[14px] flex items-center gap-1.5" style={{ color: 'var(--forest-700)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-xl mb-16">
            <h2 className="font-display text-[2rem] sm:text-[2.4rem] font-semibold tracking-tight leading-tight" style={{ color: 'var(--forest-900)' }}>
              Built specifically for Indian eating habits.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: '#565952' }}>
              Unlike generic western nutrition apps, Dietitian AI understands Indian cooking methods, ghee measurements, dal protein ratios, and regional dietary preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
            <div className="bg-[color:var(--paper)] p-9 md:p-11">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--sage-100)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="1.8">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="font-display text-[19px] font-semibold mb-2.5" style={{ color: 'var(--forest-900)' }}>Indian Thali &amp; Photo Logging</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: '#5A5D56' }}>
                Snap a photo of your thali or describe meals in Hindi/English out loud. It parses portion sizes for Roti, Sabzi, Paneer, Rice, and Curd instantly.
              </p>
            </div>

            <div className="bg-[color:var(--paper)] p-9 md:p-11">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--sage-100)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="1.8">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="font-display text-[19px] font-semibold mb-2.5" style={{ color: 'var(--forest-900)' }}>Adaptive ICMR Metabolic Engine</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: '#5A5D56' }}>
                Adjusts calorie &amp; protein recommendations according to Indian Council of Medical Research (ICMR/NIN) guidelines based on your daily bodyweight trend.
              </p>
            </div>

            <div className="bg-[color:var(--paper)] p-9 md:p-11">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--sage-100)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="1.8">
                  <path d="M6 2l1 4M18 2l-1 4M4 8h16l-1.5 12a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <h3 className="font-display text-[19px] font-semibold mb-2.5" style={{ color: 'var(--forest-900)' }}>Indian Kirana &amp; Grocery Builder</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: '#5A5D56' }}>
                Generates a organized grocery checklist with Indian pantry staples (Atta, Moong Dal, Rajma, Paneer, Spices, Ghee) mapped directly to your weekly meal plan.
              </p>
            </div>

            <div className="bg-[color:var(--paper)] p-9 md:p-11">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: '#FBEFE6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.8">
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                </svg>
              </div>
              <h3 className="font-display text-[19px] font-semibold mb-2.5" style={{ color: 'var(--forest-900)' }}>Allergy &amp; Fasting Shield</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: '#5A5D56' }}>
                Filters out groundnuts, dairy, gluten, or eggs during fasts (Vrat) or declared allergies before recipes reach your diet plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SECTION */}
      <section id="demo" className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[2rem] font-semibold tracking-tight leading-tight" style={{ color: 'var(--forest-900)' }}>
                Try logging an Indian meal.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: '#565952' }}>
                Tap any meal item below. Watch the protein, carb, and fat rings rebalance live with AI dietitian commentary.
              </p>
              
              {/* Interactive Chips */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {foodChipsList.map(chip => {
                  const isSelected = selectedChips.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      onClick={() => toggleChip(chip.id)}
                      className={`food-chip px-4 py-2 rounded-full border text-[14px] font-medium transition ${
                        isSelected ? 'selected' : ''
                      }`}
                      style={!isSelected ? { borderColor: 'var(--line)' } : {}}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={resetLog}
                className="mt-6 text-[13.5px] underline underline-offset-4 cursor-pointer"
                style={{ color: '#7A7D76' }}
              >
                Reset log
              </button>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--line)' }}>
                <button
                  onClick={() => onLaunchApp('dashboard')}
                  className="w-full py-3 rounded-full text-white font-medium text-sm transition hover:opacity-90 shadow-sm"
                  style={{ background: 'var(--forest-700)' }}
                >
                  Open Full Indian Health Dashboard →
                </button>
              </div>
            </div>

            {/* Interactive Macro Rings Container */}
            <div className="lg:col-span-8 rounded-3xl border p-8 md:p-10" style={{ borderColor: 'var(--line)', background: 'var(--paper-dim)' }}>
              <div className="grid sm:grid-cols-3 gap-8 mb-8">
                
                {/* Protein Ring */}
                <div className="flex flex-col items-center">
                  <svg className="ring w-28 h-28" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E3E7DE" strokeWidth="9" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="var(--forest-700)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={getDashOffset(currentTotals.protein, targets.protein)}
                    />
                  </svg>
                  <p className="mt-3 text-[13px]" style={{ color: '#7A7D76' }}>Protein</p>
                  <p className="font-display font-semibold text-[19px]" style={{ color: 'var(--forest-900)' }}>
                    {currentTotals.protein} / {targets.protein}g
                  </p>
                </div>

                {/* Carbs Ring */}
                <div className="flex flex-col items-center">
                  <svg className="ring w-28 h-28" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E3E7DE" strokeWidth="9" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="var(--amber)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={getDashOffset(currentTotals.carb, targets.carb)}
                    />
                  </svg>
                  <p className="mt-3 text-[13px]" style={{ color: '#7A7D76' }}>Carbs</p>
                  <p className="font-display font-semibold text-[19px]" style={{ color: 'var(--forest-900)' }}>
                    {currentTotals.carb} / {targets.carb}g
                  </p>
                </div>

                {/* Fat Ring */}
                <div className="flex flex-col items-center">
                  <svg className="ring w-28 h-28" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E3E7DE" strokeWidth="9" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="var(--coral)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={getDashOffset(currentTotals.fat, targets.fat)}
                    />
                  </svg>
                  <p className="mt-3 text-[13px]" style={{ color: '#7A7D76' }}>Fat</p>
                  <p className="font-display font-semibold text-[19px]" style={{ color: 'var(--forest-900)' }}>
                    {currentTotals.fat} / {targets.fat}g
                  </p>
                </div>

              </div>

              {/* Real-time Assistant Note */}
              <div className="pt-7 border-t flex items-start gap-4" style={{ borderColor: 'var(--line)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background: 'var(--forest-700)' }}>
                  🇮🇳
                </div>
                <p className="text-[15px] leading-relaxed pt-1" style={{ color: '#4A4D47' }}>
                  {renderAssistantNote()}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION FOR INDIA */}
      <section id="pricing" className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex flex-col items-center text-center mb-14">
            <h2 className="font-display text-[2rem] sm:text-[2.4rem] font-semibold tracking-tight" style={{ color: 'var(--forest-900)' }}>
              Simple pricing for India.
            </h2>
            <p className="mt-4 text-[16px] max-w-md" style={{ color: '#565952' }}>
              Start free today. Upgrade anytime for unlimited Indian meal logging &amp; custom diet coaching.
            </p>

            <div className="mt-8 inline-flex rounded-full p-1 border" style={{ background: 'var(--paper-dim)', borderColor: 'var(--line)' }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`pill-tab px-5 py-2 rounded-full text-[14px] font-medium transition ${
                  billingCycle === 'monthly' ? 'active' : ''
                }`}
              >
                Monthly Plan
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`pill-tab px-5 py-2 rounded-full text-[14px] font-medium transition ${
                  billingCycle === 'annual' ? 'active' : ''
                }`}
              >
                Annual — Save 35%
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Free Tier */}
            <div className="rounded-3xl border p-8 flex flex-col" style={{ borderColor: 'var(--line)' }}>
              <h3 className="font-display font-semibold text-[19px]" style={{ color: 'var(--forest-900)' }}>Free</h3>
              <p className="mt-2 text-[14px]" style={{ color: '#7A7D76' }}>Experience AI-driven Indian meal logging</p>
              <p className="mt-6 font-display text-[2.2rem] font-semibold" style={{ color: 'var(--forest-900)' }}>₹0</p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1" style={{ color: '#4A4D47' }}>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  10 Indian meal photo logs / month
                </li>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Basic Indian macro tracking
                </li>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Allergy &amp; Vrat shield
                </li>
              </ul>
              <button
                onClick={() => onLaunchApp('dashboard')}
                className="mt-8 text-center px-5 py-3 rounded-full border font-medium text-[14.5px] transition hover:bg-[color:var(--paper-dim)]"
                style={{ borderColor: 'var(--line)', color: 'var(--forest-900)' }}
              >
                Start free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="rounded-3xl p-8 flex flex-col relative text-white shadow-xl" style={{ background: 'var(--forest-700)' }}>
              <span className="absolute -top-3 left-8 text-[12px] px-3 py-1 rounded-full font-medium shadow-sm" style={{ background: 'var(--sage-300)', color: 'var(--forest-900)' }}>
                Most popular in India
              </span>
              <h3 className="font-display font-semibold text-[19px]">Pro Plan</h3>
              <p className="mt-2 text-[14px]" style={{ color: '#CFE0D3' }}>For daily unlimited meal tracking &amp; plans</p>
              <p className="mt-6 font-display text-[2.2rem] font-semibold">
                <span>{billingCycle === 'monthly' ? '₹499' : '₹349'}</span>
                <span className="text-[15px] font-normal" style={{ color: '#CFE0D3' }}>/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1" style={{ color: '#E4F0E7' }}>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--sage-300)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Unlimited Thali photo &amp; voice logging
                </li>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--sage-300)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Adaptive ICMR metabolic engine
                </li>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--sage-300)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Smart Indian pantry &amp; Kirana builder
                </li>
              </ul>
              <button
                onClick={() => onLaunchApp('logger')}
                className="mt-8 text-center px-5 py-3 rounded-full font-medium text-[14.5px] transition hover:opacity-90 shadow-md"
                style={{ background: 'white', color: 'var(--forest-700)' }}
              >
                Start 7-day free trial
              </button>
            </div>

            {/* Annual Health Plan */}
            <div className="rounded-3xl border p-8 flex flex-col" style={{ borderColor: 'var(--line)' }}>
              <h3 className="font-display font-semibold text-[19px]" style={{ color: 'var(--forest-900)' }}>Annual Health Pass</h3>
              <p className="mt-2 text-[14px]" style={{ color: '#7A7D76' }}>Full year of clinical Indian diet coaching</p>
              <p className="mt-6 font-display text-[2.2rem] font-semibold" style={{ color: 'var(--forest-900)' }}>
                <span>₹299</span>
                <span className="text-[15px] font-normal" style={{ color: '#7A7D76' }}>/mo (billed annually)</span>
              </p>
              <ul className="mt-6 space-y-3 text-[14.5px] flex-1" style={{ color: '#4A4D47' }}>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Everything in Pro Plan
                </li>
                <li className="flex gap-2.5">
                  <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--forest-700)" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
                  Quarterly consultation reviews
                </li>
              </ul>
              <button
                onClick={() => onLaunchApp('planner')}
                className="mt-8 text-center px-5 py-3 rounded-full border font-medium text-[14.5px] transition hover:bg-[color:var(--paper-dim)]"
                style={{ borderColor: 'var(--line)', color: 'var(--forest-900)' }}
              >
                Choose Annual Pass
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: 'var(--line)', background: 'var(--paper-dim)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="13" stroke="#1B4332" strokeWidth="2" />
                  <path d="M15 6C15 6 20 10 20 15.5C20 19.6 17.7 22 15 22C12.3 22 10 19.6 10 15.5C10 10 15 6 15 6Z" fill="#2D6A4F" />
                </svg>
                <span className="font-display font-semibold" style={{ color: 'var(--forest-900)' }}>Dietitian AI India</span>
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: '#7A7D76' }}>Your AI Indian dietitian here.</p>
            </div>

            <div>
              <h5 className="font-display font-medium text-[14.5px] mb-4" style={{ color: 'var(--forest-900)' }}>Product</h5>
              <ul className="space-y-2.5 text-[14px]" style={{ color: '#7A7D76' }}>
                <li><a href="#features" className="hover:underline">Indian Features</a></li>
                <li><a href="#how" className="hover:underline">How it works</a></li>
                <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-display font-medium text-[14.5px] mb-4" style={{ color: 'var(--forest-900)' }}>Company</h5>
              <ul className="space-y-2.5 text-[14px]" style={{ color: '#7A7D76' }}>
                <li><a href="#top" className="hover:underline">About</a></li>
                <li><a href="#safety" className="hover:underline">ICMR Safety Guidelines</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-display font-medium text-[14.5px] mb-4" style={{ color: 'var(--forest-900)' }}>Legal</h5>
              <ul className="space-y-2.5 text-[14px]" style={{ color: '#7A7D76' }}>
                <li><a href="#top" className="hover:underline">Privacy policy</a></li>
                <li><a href="#top" className="hover:underline">Terms of service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between" style={{ borderColor: 'var(--line)' }}>
            <p className="text-[12.5px]" style={{ color: '#9A9D96' }}>© 2026 Dietitian AI India. All rights reserved.</p>
            <p className="text-[12.5px] max-w-xl leading-relaxed" style={{ color: '#9A9D96' }}>
              Dietitian AI provides general nutrition coaching for Indian diets and does not replace treatment from a primary care physician or registered dietitian.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
