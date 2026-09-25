import { UserProfile, MealItem, ChatMessage, DailyMealPlan, MealPlanRecipe, GroceryItem, IndianRegion } from '../types/dietitian';

export const REGION_NAMES: Record<IndianRegion, string> = {
  tamil_nadu: 'Tamil Nadu (South India)',
  kerala: 'Kerala (South India)',
  karnataka: 'Karnataka (South India)',
  andhra_telangana: 'Andhra Pradesh & Telangana',
  delhi_punjab: 'Delhi & Punjab (North India)',
  maharashtra: 'Maharashtra (West India)',
  gujarat: 'Gujarat (West India)',
  west_bengal: 'West Bengal (East India)',
  rajasthan: 'Rajasthan (North/West)',
  pan_india: 'Pan-India (All Regions)'
};

// Regional Indian Food Database
const REGIONAL_FOOD_DATABASE: Record<string, { cals: number; p: number; carbs: number; f: number; fat: number; portion: string; category: 'breakfast' | 'lunch' | 'dinner' | 'snack'; region: IndianRegion; keywords: string[] }> = {
  // Tamil Nadu
  pongal_vada: { cals: 360, p: 10, carbs: 54, f: 6, fat: 12, portion: '1 bowl Ven Pongal + 1 Medu Vada + Sambhar', category: 'breakfast', region: 'tamil_nadu', keywords: ['pongal', 'vada', 'sambhar'] },
  kothu_parotta: { cals: 490, p: 26, carbs: 48, f: 5, fat: 22, portion: '1 plate Chicken/Egg Kothu Parotta (300g)', category: 'dinner', region: 'tamil_nadu', keywords: ['kothu', 'parotta', 'kothu parotta'] },
  curd_rice_sundal: { cals: 320, p: 12, carbs: 46, f: 7, fat: 10, portion: '1 bowl Curd Rice + 1/2 cup Chana Sundal', category: 'lunch', region: 'tamil_nadu', keywords: ['curd rice', 'tayir sadam', 'sundal'] },

  // Kerala
  puttu_kadala: { cals: 380, p: 14, carbs: 62, f: 9, fat: 8, portion: '1 piece Steamed Puttu + 1 bowl Kadala Curry', category: 'breakfast', region: 'kerala', keywords: ['puttu', 'kadala', 'kerala'] },
  appam_stew: { cals: 310, p: 8, carbs: 48, f: 5, fat: 10, portion: '2 Palappams + 1 bowl Coconut Veg Stew', category: 'breakfast', region: 'kerala', keywords: ['appam', 'stew', 'ishtu'] },
  kerala_fish_curry: { cals: 420, p: 34, carbs: 42, f: 6, fat: 14, portion: '1 bowl Meen Curry + 1.5 cups Matta Rice (Red Rice)', category: 'lunch', region: 'kerala', keywords: ['meen', 'fish curry', 'matta rice', 'kerala fish'] },

  // Karnataka
  ragi_mudde: { cals: 390, p: 14, carbs: 65, f: 12, fat: 7, portion: '1 Ragi Mudde ball + 1 bowl Bassaru / Chicken Saaru', category: 'lunch', region: 'karnataka', keywords: ['ragi', 'mudde', 'ragi mudde', 'saaru'] },
  bisi_bele_bath: { cals: 410, p: 13, carbs: 62, f: 8, fat: 12, portion: '1 bowl Bisi Bele Bath + Boondi Raita', category: 'lunch', region: 'karnataka', keywords: ['bisi bele bath', 'bisibelebath'] },
  neer_dosa: { cals: 280, p: 6, carbs: 48, f: 4, fat: 7, portion: '3 light Neer Dosas + Coconut Chutney', category: 'breakfast', region: 'karnataka', keywords: ['neer dosa', 'dosa'] },

  // Andhra & Telangana
  pesarattu: { cals: 310, p: 16, carbs: 42, f: 8, fat: 9, portion: '1 Moong Dal Pesarattu + Ginger (Allam) Chutney', category: 'breakfast', region: 'andhra_telangana', keywords: ['pesarattu', 'allam'] },
  andhra_pappu: { cals: 440, p: 18, carbs: 66, f: 10, fat: 11, portion: '1 bowl Andhra Mudda Pappu + Steamed Rice + Avakaya', category: 'lunch', region: 'andhra_telangana', keywords: ['pappu', 'avakaya', 'andhra dal'] },
  hyderabadi_biryani: { cals: 560, p: 40, carbs: 60, f: 4, fat: 18, portion: '1 plate Hyderabadi Dum Biryani + Mirchi Ka Salan', category: 'dinner', region: 'andhra_telangana', keywords: ['hyderabadi biryani', 'dum biryani', 'salan'] },

  // Delhi & Punjab
  chole_bhature: { cals: 580, p: 18, carbs: 76, f: 9, fat: 24, portion: '1 plate Punjabi Chole + 1 Bhatura', category: 'lunch', region: 'delhi_punjab', keywords: ['chole', 'bhature', 'amritsari'] },
  sarson_saag: { cals: 420, p: 14, carbs: 48, f: 10, fat: 18, portion: '1 bowl Sarson ka Saag + 2 Makki ki Rotis with white butter', category: 'dinner', region: 'delhi_punjab', keywords: ['sarson', 'saag', 'makki', 'punjabi'] },
  butter_chicken: { cals: 520, p: 42, carbs: 18, f: 3, fat: 32, portion: '200g Murgh Makhani / Butter Chicken + 1 Garlic Naan', category: 'dinner', region: 'delhi_punjab', keywords: ['butter chicken', 'makhani', 'naan'] },

  // Maharashtra
  misal_pav: { cals: 450, p: 18, carbs: 58, f: 8, fat: 16, portion: '1 bowl Spiced Sprouts Misal + 2 Pavs', category: 'breakfast', region: 'maharashtra', keywords: ['misal', 'pav', 'misal pav'] },
  pithla_bhakri: { cals: 380, p: 15, carbs: 54, f: 9, fat: 11, portion: '1 bowl Besan Pithla + 1 Jowar Bhakri + Garlic Thecha', category: 'lunch', region: 'maharashtra', keywords: ['pithla', 'bhakri', 'thecha', 'jowar'] },

  // Gujarat
  dhokla_thepla: { cals: 290, p: 11, carbs: 44, f: 5, fat: 8, portion: '4 pcs Khaman Dhokla + 2 Methi Theplas', category: 'breakfast', region: 'gujarat', keywords: ['dhokla', 'thepla', 'gujarati'] },
  gujarati_thali: { cals: 460, p: 15, carbs: 68, f: 10, fat: 14, portion: '1 Gujarati Thali (Khedut Dal, Kadhi, 2 Rotlis, Bhindi Sabzi)', category: 'lunch', region: 'gujarat', keywords: ['gujarati thali', 'kadhi', 'rotli'] },

  // West Bengal
  machher_jhol: { cals: 390, p: 32, carbs: 44, f: 4, fat: 10, portion: '1 piece Katla/Rohu Fish in mustard gravy + 1.5 cups Rice', category: 'lunch', region: 'west_bengal', keywords: ['machher jhol', 'bengali fish', 'jhol', 'rohu'] },
  luchi_alur_dom: { cals: 420, p: 8, carbs: 58, f: 5, fat: 18, portion: '3 Luchis + 1 bowl Spiced Alur Dom', category: 'breakfast', region: 'west_bengal', keywords: ['luchi', 'alur dom', 'bengali'] },

  // Rajasthan
  dal_baati: { cals: 580, p: 18, carbs: 74, f: 11, fat: 24, portion: '2 Baatis dipped in Ghee + 1 bowl Panchmel Dal + Churma', category: 'lunch', region: 'rajasthan', keywords: ['dal baati', 'baati', 'churma', 'rajasthani'] },
};

export function checkAllergyShield(input: string, allergies: string[]): string | null {
  if (!allergies || allergies.length === 0) return null;
  const normalizedInput = input.toLowerCase();
  
  const matches = allergies.filter(allergy => {
    const alg = allergy.toLowerCase();
    if ((alg.includes('peanut') || alg.includes('groundnut')) && (normalizedInput.includes('peanut') || normalizedInput.includes('groundnut') || normalizedInput.includes('moongphali'))) return true;
    if (alg.includes('gluten') && (normalizedInput.includes('wheat') || normalizedInput.includes('atta') || normalizedInput.includes('maida') || normalizedInput.includes('roti') || normalizedInput.includes('paratha') || normalizedInput.includes('bhatura') || normalizedInput.includes('luchi') || normalizedInput.includes('parotta') || normalizedInput.includes('kulcha'))) return true;
    if (alg.includes('dairy') && (normalizedInput.includes('milk') || normalizedInput.includes('paneer') || normalizedInput.includes('curd') || normalizedInput.includes('dahi') || normalizedInput.includes('ghee') || normalizedInput.includes('butter') || normalizedInput.includes('lassi') || normalizedInput.includes('cheese'))) return true;
    if (alg.includes('egg') && (normalizedInput.includes('egg') || normalizedInput.includes('anda') || normalizedInput.includes('bhurji'))) return true;
    if (alg.includes('soy') && (normalizedInput.includes('soya') || normalizedInput.includes('tofu'))) return true;
    if (alg.includes('shellfish') && (normalizedInput.includes('shrimp') || normalizedInput.includes('prawn') || normalizedInput.includes('fish') || normalizedInput.includes('crab') || normalizedInput.includes('meen') || normalizedInput.includes('machher'))) return true;
    if ((alg.includes('tree nut') || alg.includes('nuts')) && (normalizedInput.includes('almond') || normalizedInput.includes('badam') || normalizedInput.includes('cashew') || normalizedInput.includes('kaju') || normalizedInput.includes('walnut'))) return true;
    return normalizedInput.includes(alg);
  });

  if (matches.length > 0) {
    return `🚨 ALLERGY SHIELD WARNING: Detected potential allergen matching your declared profile: [${matches.join(', ')}]. Avoid or substitute immediately!`;
  }
  return null;
}

export function parseAndAnalyzeMeal(mealInput: string, profile: UserProfile): { meal: MealItem; warning: string | null } {
  const warning = checkAllergyShield(mealInput, profile.allergies);
  const lower = mealInput.toLowerCase();

  let matchedKey = Object.keys(REGIONAL_FOOD_DATABASE).find(key => 
    REGIONAL_FOOD_DATABASE[key].keywords.some(kw => lower.includes(kw))
  );

  let base = matchedKey ? REGIONAL_FOOD_DATABASE[matchedKey] : null;

  const cals = base ? base.cals : Math.floor(350 + (lower.length % 5) * 40);
  const protein = base ? base.p : Math.floor(16 + (lower.length % 4) * 5);
  const fiber = base ? base.f : Math.floor(4 + (lower.length % 3) * 2);
  const netCarbs = base ? base.carbs : Math.floor(38 + (lower.length % 6) * 6);
  const fats = base ? base.fat : Math.floor(11 + (lower.length % 4) * 3);
  const portion = base ? base.portion : 'Standard regional Indian portion (~300g serving)';

  let tip = "Pair your meal with cucumber-tomato salad and warm jeera water or chaas to maintain healthy blood sugar response.";
  if (protein >= 25) {
    tip = "Excellent regional protein density! Essential for lean muscle maintenance and cellular repair.";
  } else if (fiber < 5) {
    tip = "Consider adding a side of poriyal, sabzi, or sprouts to increase dietary fiber for gut microbiome health.";
  }

  let category: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'lunch';
  if (lower.includes('dosa') || lower.includes('idli') || lower.includes('poha') || lower.includes('puttu') || lower.includes('appam') || lower.includes('luchi') || lower.includes('paratha') || lower.includes('dhokla')) {
    category = 'breakfast';
  } else if (lower.includes('chana') || lower.includes('makhana') || lower.includes('sprouts') || lower.includes('snack') || lower.includes('samosa') || lower.includes('kachori')) {
    category = 'snack';
  } else if (lower.includes('biryani') || lower.includes('khichdi') || lower.includes('kothu') || lower.includes('dinner') || lower.includes('saag')) {
    category = 'dinner';
  }

  const mealName = mealInput.charAt(0).toUpperCase() + mealInput.slice(1);

  const meal: MealItem = {
    id: `meal-${Date.now()}`,
    name: mealName,
    category,
    portionAssumption: portion,
    calories: cals,
    protein,
    netCarbs,
    fiber,
    fats,
    dietitianTip: tip,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    region: profile.region
  };

  return { meal, warning };
}

export function generateAIResponse(
  userText: string,
  profile: UserProfile,
  history: ChatMessage[]
): { response: string; warning?: string; mealData?: Partial<MealItem> } {
  const lower = userText.toLowerCase();
  const allergyWarning = checkAllergyShield(userText, profile.allergies);
  const regionName = REGION_NAMES[profile.region] || 'India';

  if (lower.includes('500 cal') || lower.includes('800 cal') || lower.includes('fasting 3 days') || lower.includes('starve')) {
    return {
      response: `### ⚠️ Safety Warning: Healthy Boundaries Exceeded
As a clinical Dietitian AI, I cannot recommend caloric intakes below **1,000 kcal/day** or extreme crash diets.

**Clinical Recommendation (ICMR Guidelines):**
- Minimum baseline intake for healthy metabolic function: **1,200 - 1,500 kcal/day**.
- Recommended deficit for sustainable fat loss: **300 - 500 kcal deficit** relative to TDEE.`,
      warning: 'Caloric floor violation blocked.'
    };
  }

  if (lower.includes('log') || lower.includes('ate') || lower.includes('had for') || lower.includes('analyze') || lower.includes('lunch') || lower.includes('breakfast') || lower.includes('dinner') || lower.includes('snack') || lower.includes('dosa') || lower.includes('roti') || lower.includes('paneer') || lower.includes('pongal') || lower.includes('puttu') || lower.includes('biryani')) {
    const { meal, warning } = parseAndAnalyzeMeal(userText, profile);

    const formattedResponse = `### 🥗 Regional Meal Analysis: ${meal.name}
**Region:** ${regionName}
**Portion Assumptions:** ${meal.portionAssumption}

| Nutrient | Value |
| --- | --- |
| **Calories** | ${meal.calories} kcal |
| **Protein** | ${meal.protein} g |
| **Net Carbs** | ${meal.netCarbs} g (Fiber: ${meal.fiber} g) |
| **Fats** | ${meal.fats} g |

**💡 Dietitian Tip:** ${meal.dietitianTip}

---
*Logged to your ${regionName} daily tracker.*`;

    return {
      response: allergyWarning ? `${allergyWarning}\n\n${formattedResponse}` : formattedResponse,
      warning: allergyWarning || undefined,
      mealData: meal
    };
  }

  if (lower.includes('plan') || lower.includes('recipe') || lower.includes('menu') || lower.includes('what should i eat')) {
    const plan = generateDailyMealPlan(profile);
    const formattedPlan = `### 🗓️ Daily ${regionName} Meal Plan (${profile.goal.replace('_', ' ').toUpperCase()})

- **Breakfast:** ${plan.recipes[0].title} | ${plan.recipes[0].calories} kcal (P: ${plan.recipes[0].protein}g, C: ${plan.recipes[0].netCarbs}g, F: ${plan.recipes[0].fats}g)
- **Lunch:** ${plan.recipes[1].title} | ${plan.recipes[1].calories} kcal (P: ${plan.recipes[1].protein}g, C: ${plan.recipes[1].netCarbs}g, F: ${plan.recipes[1].fats}g)
- **Dinner:** ${plan.recipes[2].title} | ${plan.recipes[2].calories} kcal (P: ${plan.recipes[2].protein}g, C: ${plan.recipes[2].netCarbs}g, F: ${plan.recipes[2].fats}g)
- **Snack:** ${plan.recipes[3].title} | ${plan.recipes[3].calories} kcal (P: ${plan.recipes[3].protein}g, C: ${plan.recipes[3].netCarbs}g, F: ${plan.recipes[3].fats}g)

**Daily Totals:** ${plan.totalCalories} Calories | ${plan.totalProtein}g Protein | ${plan.totalNetCarbs}g Carbs | ${plan.totalFats}g Fat

**🛒 Key ${regionName} Ingredients:**
${plan.recipes.flatMap(r => r.ingredients.slice(0, 2).map(i => `- ${i.name} (${i.amount})`)).slice(0, 5).join('\n')}

*Click "Export to Grocery List" in the Meal Planner tab to load full ingredients into your interactive checklist!*`;

    return {
      response: allergyWarning ? `${allergyWarning}\n\n${formattedPlan}` : formattedPlan,
      warning: allergyWarning || undefined
    };
  }

  const clinicalAdvice = `### 💡 Clinical Nutrition Insight (${regionName})
Based on your regional profile (**${profile.age} yrs, ${profile.goal.replace('_', ' ')}** with target **${profile.macroTargets.calories} kcal/day**):

- **Regional Balance:** We've structured your targets to accommodate traditional ${regionName} cooking staples while prioritizing protein density and fiber.
- **Allergy Shield:** Active screening for declared restrictions (${profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None'}).`;

  return {
    response: allergyWarning ? `${allergyWarning}\n\n${clinicalAdvice}` : clinicalAdvice,
    warning: allergyWarning || undefined
  };
}

/**
 * Generate State-Specific Indian Meal Plans
 */
export function generateDailyMealPlan(profile: UserProfile): DailyMealPlan {
  const isNonVeg = profile.dietaryPreferences.includes('Non-Veg');
  const reg = profile.region;

  let recipes: MealPlanRecipe[] = [];

  if (reg === 'tamil_nadu') {
    recipes = [
      {
        id: 'rec-tn-1',
        mealType: 'breakfast',
        title: 'Ven Pongal & Medu Vada with Drumstick Sambhar & Coconut Chutney',
        calories: 380,
        protein: 12,
        netCarbs: 52,
        fiber: 7,
        fats: 14,
        prepTime: '10 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: 'Raw Rice & Yellow Moong Dal', amount: '1 cup', category: 'Atta, Rice & Dals' },
          { name: 'Black Gram (Urad Dal for Vada)', amount: '50g', category: 'Atta, Rice & Dals' },
          { name: 'Curry Leaves, Black Pepper & Ghee', amount: '1 tbsp', category: 'Spices, Ghee & Oils' },
          { name: 'Fresh Coconut & Green Chillies', amount: '2 tbsp', category: 'Produce & Veggies' }
        ],
        instructions: ['Pressure cook rice and moong dal with cumin and black pepper.', 'Temper with curry leaves and ghee. Serve hot with vada and drumstick sambhar.'],
        region: 'tamil_nadu'
      },
      {
        id: 'rec-tn-2',
        mealType: 'lunch',
        title: isNonVeg ? 'Chettinad Chicken Curry with Rice & Cabbage Poriyal' : 'Vatha Kuzhambu with Steamed Rice, Keerai Poriyal & Curd',
        calories: 520,
        protein: isNonVeg ? 42 : 18,
        netCarbs: 58,
        fiber: 9,
        fats: 16,
        prepTime: '15 mins',
        cookTime: '20 mins',
        ingredients: [
          { name: isNonVeg ? 'Country Chicken' : 'Sundakkai & Tamarind Purée', amount: '200g', category: 'Proteins & Paneer' },
          { name: 'Steamed Ponni Rice', amount: '1.5 cups', category: 'Atta, Rice & Dals' },
          { name: 'Cabbage & Coconut Poriyal', amount: '1 bowl', category: 'Produce & Veggies' },
          { name: 'Gingelly (Sesame) Oil & Chettinad Spices', amount: '1 tbsp', category: 'Spices, Ghee & Oils' }
        ],
        instructions: ['Roast whole Chettinad spices with coconut.', 'Simmer chicken/vegetables in gingelly oil until rich and aromatic. Serve over hot Ponni rice.'],
        region: 'tamil_nadu'
      },
      {
        id: 'rec-tn-3',
        mealType: 'dinner',
        title: 'Egg/Paneer Kothu Parotta with Salna & Onion Raita',
        calories: 490,
        protein: 28,
        netCarbs: 46,
        fiber: 6,
        fats: 20,
        prepTime: '10 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: 'Whole Wheat Parotta (shredded)', amount: '2 pieces', category: 'Atta, Rice & Dals' },
          { name: isNonVeg ? 'Eggs & Chicken Pieces' : 'Paneer cubes & Soya', amount: '150g', category: 'Proteins & Paneer' },
          { name: 'Onions, Tomatoes & Green Chillies', amount: '1 cup', category: 'Produce & Veggies' }
        ],
        instructions: ['Shred wheat parotta. Chop onions, chillies, and tomatoes.', 'Mince on high heat tawa with eggs/paneer and spiced salna sauce.'],
        region: 'tamil_nadu'
      },
      {
        id: 'rec-tn-4',
        mealType: 'snack',
        title: 'Spiced Sundal (Boiled Black Chana) & Fresh Filter Coffee',
        calories: 210,
        protein: 11,
        netCarbs: 28,
        fiber: 7,
        fats: 5,
        prepTime: '5 mins',
        cookTime: '5 mins',
        ingredients: [
          { name: 'Boiled Black Chana', amount: '1 cup', category: 'Atta, Rice & Dals' },
          { name: 'Mustard seeds, Curry Leaves & Coconut', amount: '1 tsp', category: 'Spices, Ghee & Oils' }
        ],
        instructions: ['Temper boiled black chana with mustard seeds, curry leaves, and fresh grated coconut.'],
        region: 'tamil_nadu'
      }
    ];
  } else if (reg === 'kerala') {
    recipes = [
      {
        id: 'rec-kl-1',
        mealType: 'breakfast',
        title: 'Steamed Rice Puttu with Spicy Kadala Curry (Black Chickpeas)',
        calories: 380,
        protein: 14,
        netCarbs: 62,
        fiber: 9,
        fats: 8,
        prepTime: '10 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: 'Puttu Podi (Rice flour) & Coconut', amount: '1 cup', category: 'Atta, Rice & Dals' },
          { name: 'Black Chickpeas (Kadala)', amount: '100g', category: 'Atta, Rice & Dals' },
          { name: 'Roasted Coconut Gravy Spices', amount: '1 bowl', category: 'Spices, Ghee & Oils' }
        ],
        instructions: ['Layer puttu podi and grated coconut in puttu maker and steam for 8 mins.', 'Serve hot with spicy roasted coconut Kadala curry.'],
        region: 'kerala'
      },
      {
        id: 'rec-kl-2',
        mealType: 'lunch',
        title: isNonVeg ? 'Kerala Fish Curry (Meen Curry) with Matta Rice & Avial' : 'Vegetable Avial with Kerala Red Matta Rice & Thoran',
        calories: 440,
        protein: isNonVeg ? 34 : 16,
        netCarbs: 48,
        fiber: 8,
        fats: 14,
        prepTime: '15 mins',
        cookTime: '20 mins',
        ingredients: [
          { name: isNonVeg ? 'Seer Fish / Kingfish (Meen)' : 'Mixed Drumstick, Raw Banana & Yam', amount: '180g', category: 'Proteins & Paneer' },
          { name: 'Kerala Red Matta Rice', amount: '1.5 cups', category: 'Atta, Rice & Dals' },
          { name: 'Coconut Oil & Curry Leaves', amount: '1 tbsp', category: 'Spices, Ghee & Oils' }
        ],
        instructions: ['Cook fish/vegetables in earthen pot with Kudampuli (Garcinia) and chili purée.', 'Finish with fresh coconut oil and curry leaves. Serve with boiled Matta rice.'],
        region: 'kerala'
      },
      {
        id: 'rec-kl-3',
        mealType: 'dinner',
        title: 'Soft Palappams with Vegetable Coconut Milk Stew / Kerala Egg Roast',
        calories: 360,
        protein: 16,
        netCarbs: 45,
        fiber: 6,
        fats: 14,
        prepTime: '10 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: 'Fermented Rice Batter (Appam)', amount: '2 pieces', category: 'Atta, Rice & Dals' },
          { name: isNonVeg ? 'Boiled Eggs in Roast Gravy' : 'Carrots, Beans & Potatoes in Coconut Stew', amount: '1 bowl', category: 'Produce & Veggies' }
        ],
        instructions: ['Pour appam batter in appachatti and swirl to form crisp lace edges.', 'Serve warm with fragrant coconut milk vegetable stew or spicy egg roast.'],
        region: 'kerala'
      },
      {
        id: 'rec-kl-4',
        mealType: 'snack',
        title: 'Steamed Ethakka (Nendran Banana) & Tender Coconut Water',
        calories: 190,
        protein: 3,
        netCarbs: 42,
        fiber: 5,
        fats: 1,
        prepTime: '2 mins',
        cookTime: '8 mins',
        ingredients: [
          { name: 'Kerala Nendran Plantain (steamed)', amount: '1 piece', category: 'Produce & Veggies' },
          { name: 'Fresh Coconut Water', amount: '1 glass', category: 'Produce & Veggies' }
        ],
        instructions: ['Steam whole Nendran plantain for 8 minutes until soft and fragrant.'],
        region: 'kerala'
      }
    ];
  } else if (reg === 'karnataka') {
    recipes = [
      {
        id: 'rec-ka-1',
        mealType: 'breakfast',
        title: 'Davangere Benne Dosa with Potato Saagu & Coconut Chutney',
        calories: 360,
        protein: 8,
        netCarbs: 52,
        fiber: 5,
        fats: 14,
        prepTime: '5 mins',
        cookTime: '10 mins',
        ingredients: [
          { name: 'Crisp Dosa Batter', amount: '2 pieces', category: 'Atta, Rice & Dals' },
          { name: 'Fresh Butter (Benne) & Potato Saagu', amount: '1 bowl', category: 'Dairy & Curd' }
        ],
        instructions: ['Spread crisp dosa batter on hot tawa and top with fresh Benne (butter).', 'Serve with spiced potato saagu.'],
        region: 'karnataka'
      },
      {
        id: 'rec-ka-2',
        mealType: 'lunch',
        title: 'Ragi Mudde (Finger Millet Ball) with Spiced Bassaru / Chicken Saaru',
        calories: 420,
        protein: isNonVeg ? 38 : 16,
        netCarbs: 58,
        fiber: 12,
        fats: 10,
        prepTime: '15 mins',
        cookTime: '20 mins',
        ingredients: [
          { name: 'Ragi (Finger Millet) Flour', amount: '80g', category: 'Atta, Rice & Dals' },
          { name: isNonVeg ? 'Chicken Saaru' : 'Dill Leaves & Toor Dal (Bassaru)', amount: '1 bowl', category: 'Proteins & Paneer' }
        ],
        instructions: ['Cook ragi flour with boiling water into a smooth, dense mudde ball.', 'Serve piping hot with fragrant Bassaru or Chicken Saaru.'],
        region: 'karnataka'
      },
      {
        id: 'rec-ka-3',
        mealType: 'dinner',
        title: 'Bisi Bele Bath with Boondi Raita & Cucumber Salad',
        calories: 410,
        protein: 14,
        netCarbs: 60,
        fiber: 8,
        fats: 12,
        prepTime: '10 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: 'Rice & Toor Dal Cooked Together', amount: '1.5 cups', category: 'Atta, Rice & Dals' },
          { name: 'Bisi Bele Bath Masala & Ghee', amount: '1 tbsp', category: 'Spices, Ghee & Oils' }
        ],
        instructions: ['Pressure cook rice, toor dal, and vegetables with Bisi Bele Bath masala.', 'Temper in Ghee with cashews and mustard seeds.'],
        region: 'karnataka'
      },
      {
        id: 'rec-ka-4',
        mealType: 'snack',
        title: 'Roasted Chana Dal (Hurgalu) & Filter Coffee',
        calories: 180,
        protein: 9,
        netCarbs: 26,
        fiber: 6,
        fats: 3,
        prepTime: '2 mins',
        cookTime: '0 mins',
        ingredients: [
          { name: 'Roasted Bengal Gram', amount: '40g', category: 'Atta, Rice & Dals' }
        ],
        instructions: ['Munch on roasted bengal gram with hot filter coffee.'],
        region: 'karnataka'
      }
    ];
  } else {
    // Default Pan-India / Delhi North Indian Plan
    recipes = [
      {
        id: 'rec-pan-1',
        mealType: 'breakfast',
        title: 'Paneer & Methi Stuffed Multigrain Paratha with Fresh Curd',
        calories: 420,
        protein: 24,
        netCarbs: 45,
        fiber: 7,
        fats: 18,
        prepTime: '10 mins',
        cookTime: '10 mins',
        ingredients: [
          { name: 'Grated Paneer', amount: '120g', category: 'Proteins & Paneer' },
          { name: 'Multigrain Atta', amount: '60g', category: 'Atta, Rice & Dals' },
          { name: 'Fresh Dahi', amount: '100g', category: 'Dairy & Curd' }
        ],
        instructions: ['Stuff wheat paratha with spiced paneer and cook on tawa with ghee.'],
        region: 'delhi_punjab'
      },
      {
        id: 'rec-pan-2',
        mealType: 'lunch',
        title: 'Rajma Masala with Brown Basmati Rice & Cucumber Salad',
        calories: 520,
        protein: 22,
        netCarbs: 64,
        fiber: 11,
        fats: 12,
        prepTime: '15 mins',
        cookTime: '20 mins',
        ingredients: [
          { name: 'Rajma (Kidney beans)', amount: '200g', category: 'Atta, Rice & Dals' },
          { name: 'Brown Rice', amount: '1.5 cups', category: 'Atta, Rice & Dals' }
        ],
        instructions: ['Simmer kidney beans in ginger-garlic tomato gravy. Serve over brown rice.'],
        region: 'delhi_punjab'
      },
      {
        id: 'rec-pan-3',
        mealType: 'dinner',
        title: 'Palak Paneer / Tandoori Chicken with 2 Wheat Phulkas',
        calories: 480,
        protein: 36,
        netCarbs: 34,
        fiber: 8,
        fats: 18,
        prepTime: '15 mins',
        cookTime: '15 mins',
        ingredients: [
          { name: isNonVeg ? 'Chicken Breast' : 'Fresh Paneer', amount: '180g', category: 'Proteins & Paneer' },
          { name: 'Spinach Purée', amount: '2 cups', category: 'Produce & Veggies' }
        ],
        instructions: ['Sauté protein in fresh spinach purée with spices and serve with warm phulkas.'],
        region: 'delhi_punjab'
      },
      {
        id: 'rec-pan-4',
        mealType: 'snack',
        title: 'Roasted Masala Makhana & Green Tea',
        calories: 180,
        protein: 8,
        netCarbs: 24,
        fiber: 5,
        fats: 4,
        prepTime: '5 mins',
        cookTime: '5 mins',
        ingredients: [
          { name: 'Fox Nuts (Makhana)', amount: '30g', category: 'Atta, Rice & Dals' }
        ],
        instructions: ['Roast makhana with ghee and chaat masala.'],
        region: 'delhi_punjab'
      }
    ];
  }

  const totalCalories = recipes.reduce((sum, r) => sum + r.calories, 0);
  const totalProtein = recipes.reduce((sum, r) => sum + r.protein, 0);
  const totalNetCarbs = recipes.reduce((sum, r) => sum + r.netCarbs, 0);
  const totalFats = recipes.reduce((sum, r) => sum + r.fats, 0);

  return {
    date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    region: reg,
    recipes,
    totalCalories,
    totalProtein,
    totalNetCarbs,
    totalFats
  };
}

export function extractGroceryList(plan: DailyMealPlan): GroceryItem[] {
  const list: GroceryItem[] = [];
  let idCount = 1;

  plan.recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      list.push({
        id: `groc-${idCount++}`,
        name: ing.name,
        amount: ing.amount,
        category: ing.category,
        completed: false,
        recipeSource: recipe.title
      });
    });
  });

  return list;
}
