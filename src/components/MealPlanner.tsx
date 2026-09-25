import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { REGION_NAMES } from '../services/dietitianAI';
import { IndianRegion } from '../types/dietitian';
import { Calendar, Clock, ShoppingBag, RefreshCw, CheckCircle2, ChevronDown, ChevronUp, Flame, MapPin } from 'lucide-react';

export const MealPlanner: React.FC = () => {
  const { profile, updateProfile, activePlan, generatePlan, loadPlanToGroceryList } = useDiet();
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(activePlan.recipes[0]?.id || null);
  const [pushedToGrocery, setPushedToGrocery] = useState(false);

  const handleRegionChange = (newRegion: IndianRegion) => {
    updateProfile({
      ...profile,
      region: newRegion
    });
  };

  const handlePushGrocery = () => {
    loadPlanToGroceryList();
    setPushedToGrocery(true);
    setTimeout(() => setPushedToGrocery(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-forest-50 text-forest-500">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-forest-500 text-xl">Regional Indian Meal Planner</h2>
              <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-forest-50 text-forest-500 border border-forest-100 capitalize">
                {profile.goal.replace('_', ' ')} Target
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Target: {profile.macroTargets.calories} kcal ({profile.macroTargets.protein}g Protein | {profile.macroTargets.netCarbs}g Carbs | {profile.macroTargets.fats}g Fat)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={generatePlan}
            className="flex items-center space-x-2 bg-cream-100 hover:bg-cream-200 text-forest-500 border border-cream-300 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4 text-forest-500" />
            <span>Regenerate Recipe Plan</span>
          </button>

          <button
            onClick={handlePushGrocery}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              pushedToGrocery
                ? 'bg-sage-500 text-white'
                : 'bg-forest-500 hover:bg-forest-600 text-white shadow-pill'
            }`}
          >
            {pushedToGrocery ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Grocery List!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Export to Grocery List</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* State / Cuisine Switcher Bar */}
      <div className="bg-white border border-cream-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-forest-500" />
          <span className="text-xs font-extrabold text-forest-500">Active State Cuisine:</span>
          <span className="text-xs font-bold text-slate-700">{REGION_NAMES[profile.region]}</span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {(Object.keys(REGION_NAMES) as IndianRegion[]).map(reg => (
            <button
              key={reg}
              onClick={() => handleRegionChange(reg)}
              className={`text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap transition-all ${
                profile.region === reg
                  ? 'bg-forest-500 text-white border-forest-500 shadow-pill'
                  : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
              }`}
            >
              {REGION_NAMES[reg].split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Totals Bar */}
      <div className="bg-white border border-cream-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-2 text-forest-500 font-extrabold text-sm">
          <Flame className="w-4 h-4 text-forest-500" />
          <span>{REGION_NAMES[profile.region]} Daily Plan Summary:</span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-bold">
          <span className="text-forest-500">{activePlan.totalCalories} Calories</span>
          <span className="text-slate-300">|</span>
          <span className="text-forest-500">{activePlan.totalProtein}g Protein</span>
          <span className="text-slate-300">|</span>
          <span className="text-terracotta">{activePlan.totalNetCarbs}g Carbs</span>
          <span className="text-slate-300">|</span>
          <span className="text-ochre">{activePlan.totalFats}g Fat</span>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="space-y-4">
        {activePlan.recipes.map(recipe => {
          const isExpanded = expandedRecipe === recipe.id;
          return (
            <div
              key={recipe.id}
              className="bg-white border border-cream-200 rounded-3xl overflow-hidden shadow-soft-card transition-all"
            >
              <div
                onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-cream-50/60 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl p-3 bg-cream-50 rounded-2xl border border-cream-200">
                    {recipe.mealType === 'breakfast' ? '🍳' : recipe.mealType === 'lunch' ? '🥗' : recipe.mealType === 'dinner' ? '🍽️' : '🍎'}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-500 border border-forest-100">
                        {recipe.mealType}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                        {REGION_NAMES[recipe.region]?.split(' ')[0]}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Prep: {recipe.prepTime} | Cook: {recipe.cookTime}</span>
                      </span>
                    </div>
                    <h3 className="font-extrabold text-forest-500 text-base mt-1">{recipe.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right hidden sm:block">
                    <span className="font-extrabold text-forest-500 text-sm">{recipe.calories} kcal</span>
                    <p className="text-[10px] text-slate-500">
                      P: {recipe.protein}g | C: {recipe.netCarbs}g | F: {recipe.fats}g
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-cream-200 bg-cream-50/30 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-forest-500 text-xs uppercase tracking-wider mb-2">Required Ingredients</h4>
                    <ul className="space-y-1.5">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex justify-between items-center text-xs p-2.5 bg-white rounded-xl border border-cream-200">
                          <span className="text-slate-700 font-medium">{ing.name}</span>
                          <span className="text-forest-500 font-bold">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-forest-500 text-xs uppercase tracking-wider mb-2">Cooking Instructions</h4>
                    <ol className="space-y-2">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start space-x-2">
                          <span className="w-5 h-5 rounded-full bg-forest-50 text-forest-500 font-bold flex items-center justify-center shrink-0 text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="mt-0.5 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
