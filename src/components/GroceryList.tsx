import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { ShoppingBag, Plus, Check, Trash2, Filter } from 'lucide-react';

export const GroceryList: React.FC = () => {
  const { groceryList, toggleGroceryItem, addGroceryItem, deleteGroceryItem } = useDiet();

  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<string>('Produce');

  const categories = ['All', 'Produce', 'Protein', 'Dairy & Eggs', 'Pantry & Grains', 'Spices & Oils'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addGroceryItem({
      name: newName.trim(),
      amount: newAmount.trim() || '1 item',
      category: newCategory
    });
    setNewName('');
    setNewAmount('');
  };

  const completedCount = groceryList.filter(i => i.completed).length;
  const progressPct = groceryList.length > 0 ? Math.round((completedCount / groceryList.length) * 100) : 0;

  const filteredList = selectedCategory === 'All' 
    ? groceryList 
    : groceryList.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-forest-50 text-forest-500">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-forest-500 text-xl">Aggregated Grocery Checklist</h2>
            <p className="text-xs text-slate-500">
              Consolidated ingredient list auto-generated from your active meal plan recipes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-cream-50 p-3 rounded-2xl border border-cream-200">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold">Purchased</span>
            <p className="text-sm font-extrabold text-forest-500">{completedCount} / {groceryList.length} ({progressPct}%)</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-cream-200 border-t-forest-500 flex items-center justify-center font-bold text-xs text-forest-500 bg-white">
            {progressPct}%
          </div>
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="bg-white border border-cream-200 rounded-3xl p-4 shadow-soft-card grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Item name (e.g. Avocado)..."
          className="bg-cream-50 border border-cream-200 rounded-full px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-500"
        />
        <input
          type="text"
          value={newAmount}
          onChange={e => setNewAmount(e.target.value)}
          placeholder="Quantity (e.g. 2 pcs)..."
          className="bg-cream-50 border border-cream-200 rounded-full px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-forest-500"
        />
        <select
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="bg-cream-50 border border-cream-200 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-forest-500 font-medium"
        >
          <option value="Produce">Produce</option>
          <option value="Protein">Protein</option>
          <option value="Dairy & Eggs">Dairy & Eggs</option>
          <option value="Pantry & Grains">Pantry & Grains</option>
          <option value="Spices & Oils">Spices & Oils</option>
        </select>
        <button
          type="submit"
          disabled={!newName.trim()}
          className="bg-forest-500 hover:bg-forest-600 disabled:opacity-50 text-white font-bold text-sm rounded-full py-2.5 shadow-pill transition-all flex items-center justify-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Category Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-bold px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-forest-500 text-white border-forest-500 shadow-pill'
                : 'bg-white border-cream-200 text-slate-600 hover:bg-cream-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft-card">
        {filteredList.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No grocery items found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredList.map(item => (
              <div
                key={item.id}
                onClick={() => toggleGroceryItem(item.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  item.completed
                    ? 'bg-cream-50/50 border-cream-200 text-slate-400 opacity-60'
                    : 'bg-cream-50/70 border-cream-200 hover:border-forest-500 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.completed
                        ? 'bg-forest-500 border-forest-500 text-white'
                        : 'border-cream-300 bg-white'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={`text-sm font-bold block ${item.completed ? 'line-through' : 'text-forest-500'}`}>
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {item.amount} • <span className="text-forest-500">{item.category}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteGroceryItem(item.id);
                  }}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
