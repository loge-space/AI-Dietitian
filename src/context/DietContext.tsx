import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, MealItem, ChatMessage, DailyMealPlan, GroceryItem } from '../types/dietitian';
import { generateAIResponse, generateDailyMealPlan, extractGroceryList } from '../services/dietitianAI';

const DEFAULT_INDIAN_PROFILE: UserProfile = {
  name: 'Rohan Sharma',
  age: 28,
  sex: 'male',
  heightCm: 175,
  weightKg: 72,
  activityLevel: 'moderate',
  goal: 'muscle_gain',
  region: 'tamil_nadu',
  allergies: ['Peanuts'],
  dietaryPreferences: ['Pure Veg', 'High Protein'],
  macroTargets: {
    calories: 2200,
    protein: 140,
    netCarbs: 210,
    fiber: 35,
    fats: 65
  }
};

const INITIAL_INDIAN_MEALS: MealItem[] = [
  {
    id: 'meal-init-1',
    name: 'Paneer & Methi Paratha with Fresh Dahi',
    category: 'breakfast',
    portionAssumption: '2 whole wheat parathas + 100g spiced paneer + 1 bowl curd',
    calories: 420,
    protein: 24,
    netCarbs: 45,
    fiber: 7,
    fats: 18,
    dietitianTip: 'Great high-protein vegetarian breakfast! Paneer provides slow-digesting casein protein.',
    timestamp: '08:30 AM'
  },
  {
    id: 'meal-init-2',
    name: 'Rajma Chawal with Cucumber Tomato Salad',
    category: 'lunch',
    portionAssumption: '1 bowl Rajma (200g) + 1.5 cups brown rice + 1 salad bowl',
    calories: 540,
    protein: 22,
    netCarbs: 65,
    fiber: 11,
    fats: 12,
    dietitianTip: 'Combining rajma (kidney beans) with rice completes the essential amino acid spectrum for plant protein synthesis.',
    timestamp: '01:30 PM'
  }
];

const INITIAL_INDIAN_CHAT: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'assistant',
    text: `### 🇮🇳 Namaste! I am Dietitian AI India

I am your clinical-grade Indian Registered Dietitian. I am tailored for Indian regional nutrition (North, South, East, West) and configured with your goal (**Muscle Gain**) and **Allergy Shield** protection active for: **[Peanuts]**.

How can I optimize your Indian meal plan today? Ask me to analyze an Indian dish (e.g. *Paneer Bhurji*, *Masala Dosa*, *Chicken Biryani*), generate a daily diet plan, or guide your macro distribution.`,
    timestamp: '08:00 AM'
  }
];

interface DietContextType {
  profile: UserProfile;
  updateProfile: (updated: UserProfile) => void;
  meals: MealItem[];
  logMeal: (meal: MealItem) => void;
  deleteMeal: (id: string) => void;
  waterGlasses: number;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  clearChat: () => void;
  activePlan: DailyMealPlan;
  generatePlan: () => void;
  groceryList: GroceryItem[];
  toggleGroceryItem: (id: string) => void;
  addGroceryItem: (item: { name: string; amount: string; category: string }) => void;
  deleteGroceryItem: (id: string) => void;
  loadPlanToGroceryList: () => void;
  totals: { calories: number; protein: number; netCarbs: number; fiber: number; fats: number };
}

const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('diet_profile_in');
    return saved ? JSON.parse(saved) : DEFAULT_INDIAN_PROFILE;
  });

  const [meals, setMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem('diet_meals_in');
    return saved ? JSON.parse(saved) : INITIAL_INDIAN_MEALS;
  });

  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('diet_water_in');
    return saved ? parseInt(saved, 10) : 6;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('diet_chat_in');
    return saved ? JSON.parse(saved) : INITIAL_INDIAN_CHAT;
  });

  const [activePlan, setActivePlan] = useState<DailyMealPlan>(() => {
    return generateDailyMealPlan(profile);
  });

  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('diet_grocery_in');
    if (saved) return JSON.parse(saved);
    return extractGroceryList(generateDailyMealPlan(profile));
  });

  useEffect(() => {
    localStorage.setItem('diet_profile_in', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('diet_meals_in', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('diet_water_in', waterGlasses.toString());
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem('diet_chat_in', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('diet_grocery_in', JSON.stringify(groceryList));
  }, [groceryList]);

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      netCarbs: acc.netCarbs + m.netCarbs,
      fiber: acc.fiber + m.fiber,
      fats: acc.fats + m.fats
    }),
    { calories: 0, protein: 0, netCarbs: 0, fiber: 0, fats: 0 }
  );

  const updateProfile = (updated: UserProfile) => {
    setProfile(updated);
    const newPlan = generateDailyMealPlan(updated);
    setActivePlan(newPlan);
  };

  const logMeal = (meal: MealItem) => {
    setMeals(prev => [meal, ...prev]);
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const addWaterGlass = () => setWaterGlasses(prev => Math.min(prev + 1, 15));
  const removeWaterGlass = () => setWaterGlasses(prev => Math.max(prev - 1, 0));

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);

    setTimeout(() => {
      const result = generateAIResponse(text, profile, newHistory);
      const assistantMsg: ChatMessage = {
        id: `chat-${Date.now() + 1}`,
        sender: 'assistant',
        text: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        containsAllergyWarning: !!result.warning
      };

      setChatMessages(prev => [...prev, assistantMsg]);

      if (result.mealData && result.mealData.name) {
        logMeal(result.mealData as MealItem);
      }
    }, 400);
  };

  const clearChat = () => {
    setChatMessages(INITIAL_INDIAN_CHAT);
  };

  const generatePlan = () => {
    const newPlan = generateDailyMealPlan(profile);
    setActivePlan(newPlan);
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryList(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addGroceryItem = (item: { name: string; amount: string; category: string }) => {
    const newItem: GroceryItem = {
      id: `groc-${Date.now()}`,
      name: item.name,
      amount: item.amount,
      category: item.category,
      completed: false
    };
    setGroceryList(prev => [newItem, ...prev]);
  };

  const deleteGroceryItem = (id: string) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  };

  const loadPlanToGroceryList = () => {
    const extracted = extractGroceryList(activePlan);
    setGroceryList(extracted);
  };

  return (
    <DietContext.Provider
      value={{
        profile,
        updateProfile,
        meals,
        logMeal,
        deleteMeal,
        waterGlasses,
        addWaterGlass,
        removeWaterGlass,
        chatMessages,
        sendChatMessage,
        clearChat,
        activePlan,
        generatePlan,
        groceryList,
        toggleGroceryItem,
        addGroceryItem,
        deleteGroceryItem,
        loadPlanToGroceryList,
        totals
      }}
    >
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => {
  const context = useContext(DietContext);
  if (!context) {
    throw new Error('useDiet must be used within a DietProvider');
  }
  return context;
};
