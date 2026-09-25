import React from 'react';
import { useDiet } from '../context/DietContext';
import { Flame, Activity, Droplets, ShieldAlert, ShieldCheck, Plus, Trash2, ArrowRight, Sparkles, HeartPulse } from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: 'home' | 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery') => void;
  openProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab, openProfile }) => {
  const { profile, meals, totals, waterGlasses, addWaterGlass, removeWaterGlass, deleteMeal } = useDiet();

  const calsPct = Math.min(Math.round((totals.calories / profile.macroTargets.calories) * 100), 100);
  const proteinPct = Math.min(Math.round((totals.protein / profile.macroTargets.protein) * 100), 100);
  const carbsPct = Math.min(Math.round((totals.netCarbs / profile.macroTargets.netCarbs) * 100), 100);
  const fiberPct = Math.min(Math.round((totals.fiber / profile.macroTargets.fiber) * 100), 100);
  const fatPct = Math.min(Math.round((totals.fats / profile.macroTargets.fats) * 100), 100);

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Card */}
      <div className="rounded-3xl bg-white border border-cream-200 p-6 md:p-8 shadow-soft-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-sage-500 font-semibold text-xs uppercase tracking-wider mb-1">
              <HeartPulse className="w-4 h-4 text-forest-500" />
              <span>Clinical Nutrition Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-500 tracking-tight">
              Welcome back, {profile.name}! 👋
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Target Goal: <span className="text-forest-500 font-bold capitalize">{profile.goal.replace('_', ' ')}</span> ({profile.macroTargets.calories} kcal/day). Allergy Shield active.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('logger')}
              className="flex items-center space-x-2 bg-forest-500 hover:bg-forest-600 text-white px-5 py-3 rounded-full font-bold text-sm shadow-pill transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Log a Meal</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className="flex items-center space-x-2 bg-cream-100 hover:bg-cream-200 border border-cream-300 text-forest-500 px-5 py-3 rounded-full font-bold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-sage-500" />
              <span>Ask AI Dietitian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Card 1: Calorie Budget Progress */}
        <div className="md:col-span-2 bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-forest-50 text-forest-500">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-forest-500 text-base">Energy Budget</h3>
                <p className="text-xs text-slate-500">Daily Caloric Intake Progress</p>
              </div>
            </div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-forest-50 text-forest-500 border border-forest-100">
              {calsPct}% Target
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
            <div>
              <div className="text-4xl font-extrabold text-forest-500 tracking-tight">
                {totals.calories} <span className="text-base font-semibold text-slate-400">/ {profile.macroTargets.calories} kcal</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Remaining: <span className="text-forest-500 font-bold">{Math.max(0, profile.macroTargets.calories - totals.calories)} kcal</span>
              </p>
            </div>

            <div className="w-full sm:w-1/2 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 font-bold">
                <span>Consumed</span>
                <span>{calsPct}%</span>
              </div>
              <div className="w-full h-3 bg-cream-100 rounded-full overflow-hidden p-0.5 border border-cream-200">
                <div 
                  className="h-full bg-forest-500 rounded-full transition-all duration-500"
                  style={{ width: `${calsPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-cream-200 text-center">
            <div className="bg-cream-50 p-2.5 rounded-2xl border border-cream-200">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Protein</p>
              <p className="text-sm font-extrabold text-forest-500">{totals.protein}g</p>
            </div>
            <div className="bg-cream-50 p-2.5 rounded-2xl border border-cream-200">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Carbs</p>
              <p className="text-sm font-extrabold text-terracotta">{totals.netCarbs}g</p>
            </div>
            <div className="bg-cream-50 p-2.5 rounded-2xl border border-cream-200">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Fiber</p>
              <p className="text-sm font-extrabold text-sage-500">{totals.fiber}g</p>
            </div>
            <div className="bg-cream-50 p-2.5 rounded-2xl border border-cream-200">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Fats</p>
              <p className="text-sm font-extrabold text-ochre">{totals.fats}g</p>
            </div>
          </div>
        </div>

        {/* Card 2: Macro Progress Bars */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-forest-50 text-forest-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-forest-500 text-base">Macro Breakdown</h3>
              <p className="text-xs text-slate-500">Daily Targets</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Protein</span>
                <span className="text-forest-500">{totals.protein} / {profile.macroTargets.protein}g</span>
              </div>
              <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-forest-500 rounded-full" style={{ width: `${proteinPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Net Carbs</span>
                <span className="text-terracotta">{totals.netCarbs} / {profile.macroTargets.netCarbs}g</span>
              </div>
              <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-terracotta rounded-full" style={{ width: `${carbsPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Fiber</span>
                <span className="text-sage-500">{totals.fiber} / {profile.macroTargets.fiber}g</span>
              </div>
              <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-sage-400 rounded-full" style={{ width: `${fiberPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">Fats</span>
                <span className="text-ochre">{totals.fats} / {profile.macroTargets.fats}g</span>
              </div>
              <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden">
                <div className="h-full bg-ochre rounded-full" style={{ width: `${fatPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Hydration */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-2xl bg-sky-50 text-sky-600">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-forest-500 text-base">Hydration</h3>
              </div>
              <span className="text-xs font-bold text-sky-600">{waterGlasses * 250} ml</span>
            </div>
            <p className="text-xs text-slate-500">Goal: 8 Glasses (2,000 ml)</p>

            <div className="grid grid-cols-4 gap-1.5 my-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-xl border transition-all flex items-center justify-center ${
                    i < waterGlasses
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-cream-100 border-cream-200 text-slate-300'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-cream-200">
            <button
              onClick={removeWaterGlass}
              className="flex-1 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-bold transition-colors"
            >
              - 1 Glass
            </button>
            <button
              onClick={addWaterGlass}
              className="flex-1 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              + 1 Glass
            </button>
          </div>
        </div>

        {/* Card 4: Today's Logged Meals */}
        <div className="md:col-span-3 bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card space-y-4">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <div>
              <h3 className="font-extrabold text-forest-500 text-base">Today's Meal Log</h3>
              <p className="text-xs text-slate-500">{meals.length} items logged</p>
            </div>
            <button
              onClick={() => setActiveTab('logger')}
              className="text-xs text-forest-500 hover:text-forest-600 font-bold flex items-center space-x-1"
            >
              <span>Add Meal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {meals.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-cream-300 rounded-2xl">
              <p className="text-slate-500 text-sm">No meals logged for today yet.</p>
              <button
                onClick={() => setActiveTab('logger')}
                className="mt-2 text-xs text-forest-500 font-bold hover:underline"
              >
                Log your breakfast or lunch now →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {meals.map(meal => (
                <div
                  key={meal.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-cream-50/70 hover:bg-cream-100/80 border border-cream-200 rounded-2xl gap-3 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl p-2.5 bg-white rounded-xl shadow-sm border border-cream-200">
                      {meal.category === 'breakfast' ? '🍳' : meal.category === 'lunch' ? '🥗' : meal.category === 'dinner' ? '🍽️' : '🍎'}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-forest-500 text-sm">{meal.name}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-forest-50 text-forest-600 border border-forest-100">
                          {meal.category}
                        </span>
                        <span className="text-xs text-slate-400">{meal.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 italic">Assumed: {meal.portionAssumption}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-cream-200">
                    <div className="text-right">
                      <span className="font-extrabold text-forest-500 text-sm">{meal.calories} kcal</span>
                      <p className="text-[10px] text-slate-500">
                        P: <strong className="text-slate-700">{meal.protein}g</strong> | C: <strong className="text-slate-700">{meal.netCarbs}g</strong> | F: <strong className="text-slate-700">{meal.fats}g</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card 5: Allergy Shield */}
        <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-forest-500 text-base">Allergy Shield</h3>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Active protection screens all AI recommendations for allergen contamination.
            </p>

            {profile.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {profile.allergies.map((alg, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800"
                  >
                    🚫 {alg}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs text-forest-600 bg-forest-50 p-3 rounded-2xl border border-forest-100 mb-4 font-semibold">
                <ShieldCheck className="w-4 h-4 text-forest-500" />
                <span>No declared allergies</span>
              </div>
            )}
          </div>

          <button
            onClick={openProfile}
            className="w-full py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-xs font-bold text-forest-500 border border-cream-300 transition-colors"
          >
            Manage Allergies & Profile
          </button>
        </div>

      </div>
    </div>
  );
};
