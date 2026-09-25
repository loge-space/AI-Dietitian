import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { parseAndAnalyzeMeal, REGION_NAMES } from '../services/dietitianAI';
import { MealItem, IndianRegion } from '../types/dietitian';
import { UtensilsCrossed, Plus, Sparkles, Check, ShieldAlert, Layers, MapPin } from 'lucide-react';

export const MealLogger: React.FC = () => {
  const { profile, logMeal } = useDiet();
  const [mealText, setMealText] = useState('');
  const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [activeRegion, setActiveRegion] = useState<IndianRegion>(profile.region || 'tamil_nadu');
  const [analyzedMeal, setAnalyzedMeal] = useState<{ meal: MealItem; warning: string | null } | null>(null);
  const [justLogged, setJustLogged] = useState(false);

  const regionalTemplates: Record<IndianRegion, { title: string; text: string }[]> = {
    tamil_nadu: [
      { title: 'Ven Pongal & Medu Vada', text: '1 bowl Ven Pongal with ghee, 1 Medu Vada, 1 bowl Drumstick Sambhar, Coconut Chutney' },
      { title: 'Chettinad Chicken & Rice', text: '200g spicy Chettinad Chicken curry, 1.5 cups Ponni Rice, Cabbage Poriyal' },
      { title: 'Egg/Paneer Kothu Parotta', text: '1 plate shredded Wheat Kothu Parotta with eggs, onions, green chillies & salna' },
      { title: 'Tayir Sadam & Sundal', text: '1 bowl Curd Rice (Tayir Sadam) with mustard tempering, 1/2 cup boiled Chana Sundal' },
    ],
    kerala: [
      { title: 'Puttu & Kadala Curry', text: '1 piece steamed Rice Puttu with grated coconut, 1 bowl spicy Kadala (chickpea) curry' },
      { title: 'Kerala Meen Curry & Matta Rice', text: '1 piece Kingfish in spicy Kudampuli coconut curry, 1.5 cups Red Matta Rice' },
      { title: 'Palappam & Veg Stew', text: '2 crisp lace Palappams, 1 bowl fragrant vegetable coconut milk stew' },
      { title: 'Avial & Matta Rice', text: '1 bowl mixed vegetable Avial with coconut oil, 1.5 cups Matta Rice, Cabbage Thoran' },
    ],
    karnataka: [
      { title: 'Ragi Mudde & Chicken Saaru', text: '1 Ragi Mudde (finger millet ball), 1 bowl spicy Chicken Saaru or Bassaru' },
      { title: 'Davangere Benne Dosa', text: '1 crisp Davangere Benne Dosa topped with fresh butter, Potato Saagu, Coconut Chutney' },
      { title: 'Bisi Bele Bath & Raita', text: '1 bowl piping hot Bisi Bele Bath with ghee & cashews, Boondi Raita' },
      { title: 'Jolada Rotti & EnneGai', text: '2 Jolada Rottis (Jowar), 1 bowl stuffed spicy brinjal curry (EnneGai)' },
    ],
    andhra_telangana: [
      { title: 'Hyderabadi Dum Biryani', text: '1 plate Hyderabadi Chicken Dum Biryani, Mirchi ka Salan, Onion Raita' },
      { title: 'Pesarattu & Allam Chutney', text: '1 green moong Pesarattu stuffed with upma, spicy Allam (ginger) chutney' },
      { title: 'Andhra Pappu & Avakaya Rice', text: '1 bowl Mudda Pappu, 1.5 cups hot rice with ghee and spicy Avakaya mango pickle' },
      { title: 'Gongura Chicken & Rice', text: '200g tangy Gongura Chicken curry with steamed rice' },
    ],
    delhi_punjab: [
      { title: 'Chole Bhature & Lassi', text: '1 plate spiced Punjabi Chole, 1 fluffy Bhatura, 1 glass Sweet Lassi' },
      { title: 'Sarson Saag & Makki Roti', text: '1 bowl Sarson ka Saag with white butter, 2 Makki ki Rotis, Gur (Jaggery)' },
      { title: 'Butter Chicken & Garlic Naan', text: '200g Murgh Makhani (Butter Chicken), 1 Garlic Naan' },
      { title: 'Amritsari Kulcha & Chole', text: '1 stuffed Amritsari Stuffed Kulcha with spicy Chole & pickled onions' },
    ],
    maharashtra: [
      { title: 'Misal Pav & Farsan', text: '1 bowl spiced sprouted moth beans Misal with farsan, 2 Pavs, lemon & onions' },
      { title: 'Pithla Bhakri & Thecha', text: '1 bowl gram flour Pithla, 1 Jowar Bhakri, spicy green chilli Garlic Thecha' },
      { title: 'Kolhapuri Chicken & Bhakri', text: '200g spicy Kolhapuri Chicken curry, 1 Bajra Bhakri' },
      { title: 'Kanda Poha & Solkadhi', text: '1 bowl onion Kanda Poha with peanuts, 1 glass kokum Solkadhi' },
    ],
    gujarat: [
      { title: 'Khaman Dhokla & Methi Thepla', text: '4 pcs steamed Khaman Dhokla, 2 Methi Theplas, mint chutney' },
      { title: 'Gujarati Thali', text: '1 bowl sweet-savory Gujarati Dal, Kadhi, 2 Rotlis, Bhindi Sabzi' },
      { title: 'Undhiyu & Bajra Rotla', text: '1 bowl seasonal mixed vegetable Undhiyu, 1 Bajra Rotla with white butter' },
    ],
    west_bengal: [
      { title: 'Machher Jhol & Rice', text: '1 piece Rohu/Katla fish in light mustard gravy (Machher Jhol), 1.5 cups Basmati Rice' },
      { title: 'Luchi & Alur Dom', text: '3 deep fried Luchis, 1 bowl spiced Bengali Alur Dom' },
      { title: 'Kosha Mangsho & Radhabhallabhi', text: '200g slow cooked Bengali Mutton Kosha, 2 stuffed Radhabhallabhis' },
    ],
    rajasthan: [
      { title: 'Dal Baati Churma', text: '2 Baatis dipped in Ghee, 1 bowl Panchmel Dal, sweet Churma' },
      { title: 'Gatte ki Sabzi & Bajra Roti', text: '1 bowl gram flour Gatte ki Sabzi in dahi gravy, 2 Bajra Rotis with ghee' },
      { title: 'Laal Maas & Wheat Phulka', text: '200g spicy Rajasthani Laal Maas (Mutton), 2 Phulkas' },
    ],
    pan_india: [
      { title: 'Paneer Bhurji & Multigrain Roti', text: '150g spiced Paneer Bhurji, 2 Multigrain Rotis, 1 bowl fresh Curd' },
      { title: 'Rajma Chawal & Raita', text: '1 bowl Rajma (200g), 1 cup Brown Basmati Rice, 1 bowl Cucumber Raita' },
    ]
  };

  const handleAnalyze = (textToAnalyze?: string) => {
    const query = textToAnalyze || mealText;
    if (!query.trim()) return;
    const result = parseAndAnalyzeMeal(query, profile);
    result.meal.category = category;
    setAnalyzedMeal(result);
    setJustLogged(false);
  };

  const handleConfirmLog = () => {
    if (!analyzedMeal) return;
    logMeal(analyzedMeal.meal);
    setJustLogged(true);
    setMealText('');
    setTimeout(() => {
      setAnalyzedMeal(null);
      setJustLogged(false);
    }, 2000);
  };

  const currentTemplates = regionalTemplates[activeRegion] || regionalTemplates.tamil_nadu;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-forest-50 text-forest-500">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-forest-500 text-xl">Regional Indian Meal &amp; Thali Analyzer</h2>
            <p className="text-xs text-slate-500">
              Identify and log meals from Tamil Nadu, Kerala, Karnataka, Andhra, Punjab, Maharashtra, Gujarat, Bengal &amp; Rajasthan.
            </p>
          </div>
        </div>
      </div>

      {/* State / Region Filter Selector */}
      <div className="bg-white border border-cream-200 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-forest-500 flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-forest-500" />
            <span>Select State / Cuisine Area:</span>
          </span>
          <span className="text-xs font-bold text-slate-500">{REGION_NAMES[activeRegion]}</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {(Object.keys(REGION_NAMES) as IndianRegion[]).map(reg => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                activeRegion === reg
                  ? 'bg-forest-500 text-white border-forest-500 shadow-pill'
                  : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
              }`}
            >
              {REGION_NAMES[reg].split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* State Quick Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {currentTemplates.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setMealText(item.text);
              handleAnalyze(item.text);
            }}
            className="p-4 bg-white hover:bg-cream-100 border border-cream-200 rounded-2xl text-left transition-all duration-200 group shadow-sm"
          >
            <h4 className="font-bold text-forest-500 text-sm group-hover:text-forest-600">{item.title}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.text}</p>
          </button>
        ))}
      </div>

      {/* Input Form & Output Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Input Form */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card space-y-4">
          <h3 className="font-extrabold text-forest-500 text-base flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-forest-500" />
            <span>Describe Your Meal ({REGION_NAMES[activeRegion]})</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Meal Category</label>
              <div className="grid grid-cols-4 gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 rounded-full text-xs font-bold capitalize transition-all ${
                      category === cat
                        ? 'bg-forest-500 text-white shadow-pill'
                        : 'bg-cream-100 text-slate-600 hover:bg-cream-200 border border-cream-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Food Description &amp; Regional Dishes
              </label>
              <textarea
                value={mealText}
                onChange={e => setMealText(e.target.value)}
                rows={4}
                placeholder="Example: 1 bowl Ven Pongal, 1 Medu Vada, Sambhar, Coconut Chutney OR Puttu with Kadala Curry..."
                className="w-full bg-cream-50 border border-cream-200 rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-500"
              />
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={!mealText.trim()}
              className="w-full py-3.5 bg-forest-500 hover:bg-forest-600 disabled:opacity-50 text-white font-bold text-sm rounded-full shadow-pill transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Regional Nutritional Breakdown</span>
            </button>
          </div>
        </div>

        {/* Right Column: Output Card */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-forest-500 text-base mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-forest-500" />
              <span>Structured Clinical Output</span>
            </h3>

            {!analyzedMeal ? (
              <div className="text-center py-12 border border-dashed border-cream-300 rounded-2xl">
                <UtensilsCrossed className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">Enter a regional meal description to preview clinical analysis.</p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {analyzedMeal.warning && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-bold flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{analyzedMeal.warning}</span>
                  </div>
                )}

                <div className="p-4 bg-cream-50 border border-cream-200 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-forest-500 text-lg">
                    🥗 Meal Analysis: {analyzedMeal.meal.name}
                  </h4>
                  
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Portion Assumptions:</strong> {analyzedMeal.meal.portionAssumption}
                  </p>

                  <div className="overflow-hidden rounded-xl border border-cream-200 bg-white">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-cream-100 text-forest-500 uppercase font-bold border-b border-cream-200">
                        <tr>
                          <th className="px-3.5 py-2.5">Nutrient</th>
                          <th className="px-3.5 py-2.5 text-right">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cream-200">
                        <tr>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700">Calories</td>
                          <td className="px-3.5 py-2.5 font-extrabold text-forest-500 text-right">{analyzedMeal.meal.calories} kcal</td>
                        </tr>
                        <tr>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700">Protein</td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700 text-right">{analyzedMeal.meal.protein} g</td>
                        </tr>
                        <tr>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700">Net Carbs</td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700 text-right">{analyzedMeal.meal.netCarbs} g (Fiber: {analyzedMeal.meal.fiber} g)</td>
                        </tr>
                        <tr>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700">Fats</td>
                          <td className="px-3.5 py-2.5 font-bold text-slate-700 text-right">{analyzedMeal.meal.fats} g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 bg-forest-50 border border-forest-100 rounded-xl text-xs text-forest-600">
                    <strong className="font-extrabold">💡 Dietitian Tip:</strong> {analyzedMeal.meal.dietitianTip}
                  </div>
                </div>

              </div>
            )}
          </div>

          {analyzedMeal && (
            <div className="mt-6 pt-4 border-t border-cream-200">
              <button
                onClick={handleConfirmLog}
                disabled={justLogged}
                className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                  justLogged
                    ? 'bg-sage-500 text-white'
                    : 'bg-forest-500 hover:bg-forest-600 text-white shadow-pill'
                }`}
              >
                {justLogged ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Logged to Daily History!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Confirm &amp; Save to Daily Log</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
