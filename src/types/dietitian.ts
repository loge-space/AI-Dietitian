export type GoalType = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'diabetes_management';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type IndianRegion = 
  | 'tamil_nadu' 
  | 'kerala' 
  | 'karnataka' 
  | 'andhra_telangana' 
  | 'delhi_punjab' 
  | 'maharashtra' 
  | 'gujarat' 
  | 'west_bengal' 
  | 'rajasthan' 
  | 'pan_india';

export interface MacroTargets {
  calories: number;
  protein: number; // in grams
  netCarbs: number; // in grams
  fiber: number; // in grams
  fats: number; // in grams
}

export interface UserProfile {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: GoalType;
  region: IndianRegion;
  allergies: string[];
  dietaryPreferences: string[]; // e.g. ['Pure Veg', 'Eggetarian', 'Non-Veg', 'High Protein', 'Jain', 'Vegan']
  macroTargets: MacroTargets;
}

export interface MealItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  portionAssumption: string;
  calories: number;
  protein: number;
  netCarbs: number;
  fiber: number;
  fats: number;
  dietitianTip: string;
  timestamp: string;
  region?: IndianRegion;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  containsAllergyWarning?: boolean;
  mealData?: Partial<MealItem>;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  category: 'Produce & Veggies' | 'Proteins & Paneer' | 'Dairy & Curd' | 'Atta, Rice & Dals' | 'Spices, Ghee & Oils';
}

export interface MealPlanRecipe {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  calories: number;
  protein: number;
  netCarbs: number;
  fiber: number;
  fats: number;
  prepTime: string;
  cookTime: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  region: IndianRegion;
}

export interface DailyMealPlan {
  date: string;
  region: IndianRegion;
  recipes: MealPlanRecipe[];
  totalCalories: number;
  totalProtein: number;
  totalNetCarbs: number;
  totalFats: number;
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  completed: boolean;
  recipeSource?: string;
}
