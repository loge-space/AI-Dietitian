import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { UserProfile, GoalType, ActivityLevel, IndianRegion } from '../types/dietitian';
import { REGION_NAMES } from '../services/dietitianAI';
import { X, ShieldAlert, Save, User, Activity, MapPin } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useDiet();

  const [formData, setFormData] = useState<UserProfile>(profile);
  const [customAllergy, setCustomAllergy] = useState('');

  if (!isOpen) return null;

  const commonAllergies = ['Peanuts', 'Gluten', 'Dairy', 'Eggs', 'Soy', 'Shellfish', 'Tree Nuts', 'Sesame'];
  const indianDietPreferences = ['Pure Veg', 'Eggetarian', 'Non-Veg', 'Jain', 'Vegan', 'High Protein'];

  const toggleAllergy = (alg: string) => {
    setFormData(prev => {
      const exists = prev.allergies.includes(alg);
      return {
        ...prev,
        allergies: exists ? prev.allergies.filter(a => a !== alg) : [...prev.allergies, alg]
      };
    });
  };

  const toggleDietPref = (pref: string) => {
    setFormData(prev => {
      const exists = prev.dietaryPreferences.includes(pref);
      return {
        ...prev,
        dietaryPreferences: exists 
          ? prev.dietaryPreferences.filter(p => p !== pref) 
          : [...prev.dietaryPreferences, pref]
      };
    });
  };

  const handleAddCustomAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAllergy.trim()) return;
    if (!formData.allergies.includes(customAllergy.trim())) {
      setFormData(prev => ({ ...prev, allergies: [...prev.allergies, customAllergy.trim()] }));
    }
    setCustomAllergy('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-900/40 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-cream-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-forest-50 text-forest-500">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-forest-500 text-xl">Indian Regional Health Setup</h2>
              <p className="text-xs text-slate-500">Customize state/cuisine, biometrics, targets, and allergy exclusions.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-forest-500 rounded-full hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Indian State / Region Selection */}
          <div className="space-y-2 bg-cream-50 p-4 rounded-2xl border border-cream-200">
            <label className="block text-xs font-extrabold text-forest-500 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-forest-500" />
              <span>Select Your State / Regional Cuisine</span>
            </label>
            <select
              value={formData.region || 'pan_india'}
              onChange={e => setFormData({ ...formData, region: e.target.value as IndianRegion })}
              className="w-full bg-white border border-cream-300 rounded-full px-4 py-2.5 text-sm font-bold text-forest-500 focus:outline-none focus:border-forest-500"
            >
              {Object.entries(REGION_NAMES).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 italic">
              Dietitian AI automatically tailors meal plans &amp; recipes to match {REGION_NAMES[formData.region || 'pan_india']} eating habits.
            </p>
          </div>

          {/* Section 2: Biometrics */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-forest-500 text-sm flex items-center space-x-2">
              <Activity className="w-4 h-4 text-forest-500" />
              <span>Biometric Stats</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Sex</label>
                <select
                  value={formData.sex}
                  onChange={e => setFormData({ ...formData, sex: e.target.value as any })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={formData.heightCm}
                  onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weightKg}
                  onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Activity Level</label>
                <select
                  value={formData.activityLevel}
                  onChange={e => setFormData({ ...formData, activityLevel: e.target.value as ActivityLevel })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-forest-500"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Dietary Preference */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-forest-500">Dietary Preference</label>
            <div className="flex flex-wrap gap-2">
              {indianDietPreferences.map(pref => {
                const isSelected = formData.dietaryPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => toggleDietPref(pref)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-forest-500 text-white border-forest-500 shadow-pill'
                        : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                    }`}
                  >
                    {isSelected ? `✓ ${pref}` : `+ ${pref}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Goal */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-forest-500">Primary Goal</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'weight_loss', label: 'Weight Loss' },
                { id: 'muscle_gain', label: 'Muscle Gain' },
                { id: 'maintenance', label: 'Maintenance' },
                { id: 'diabetes_management', label: 'Diabetes Mgmt' }
              ].map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, goal: g.id as GoalType })}
                  className={`py-2.5 rounded-full text-xs font-bold border transition-all ${
                    formData.goal === g.id
                      ? 'bg-forest-500 text-white border-forest-500 shadow-pill'
                      : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Allergy Shield */}
          <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <h3 className="font-extrabold text-amber-900 text-sm">Allergy Shield (Active Screening)</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {commonAllergies.map(alg => {
                const isSelected = formData.allergies.includes(alg);
                return (
                  <button
                    key={alg}
                    type="button"
                    onClick={() => toggleAllergy(alg)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    {isSelected ? `🚫 ${alg}` : `+ ${alg}`}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={customAllergy}
                onChange={e => setCustomAllergy(e.target.value)}
                placeholder="Add allergen..."
                className="flex-1 bg-white border border-amber-200 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={handleAddCustomAllergy}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Section 6: Target Macros */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-forest-500 text-sm">Daily Target Macro Budget</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 font-extrabold">Calories</label>
                <input
                  type="number"
                  value={formData.macroTargets.calories}
                  onChange={e => setFormData({
                    ...formData,
                    macroTargets: { ...formData.macroTargets, calories: Number(e.target.value) }
                  })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-3 py-2 text-xs font-extrabold text-forest-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 font-extrabold">Protein (g)</label>
                <input
                  type="number"
                  value={formData.macroTargets.protein}
                  onChange={e => setFormData({
                    ...formData,
                    macroTargets: { ...formData.macroTargets, protein: Number(e.target.value) }
                  })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-3 py-2 text-xs font-extrabold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 font-extrabold">Carbs (g)</label>
                <input
                  type="number"
                  value={formData.macroTargets.netCarbs}
                  onChange={e => setFormData({
                    ...formData,
                    macroTargets: { ...formData.macroTargets, netCarbs: Number(e.target.value) }
                  })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-3 py-2 text-xs font-extrabold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 font-extrabold">Fiber (g)</label>
                <input
                  type="number"
                  value={formData.macroTargets.fiber}
                  onChange={e => setFormData({
                    ...formData,
                    macroTargets: { ...formData.macroTargets, fiber: Number(e.target.value) }
                  })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-3 py-2 text-xs font-extrabold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 font-extrabold">Fats (g)</label>
                <input
                  type="number"
                  value={formData.macroTargets.fats}
                  onChange={e => setFormData({
                    ...formData,
                    macroTargets: { ...formData.macroTargets, fats: Number(e.target.value) }
                  })}
                  className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-3 py-2 text-xs font-extrabold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-cream-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-bold rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-forest-500 hover:bg-forest-600 text-white text-xs font-bold rounded-full shadow-pill flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Save Regional Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
