import React, { createContext, useContext, useState } from 'react';

type Meal = {
  name: string;
  calories: number;
};

type NutritionContextType = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  totalCalories: number;
};

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals(prev => [...prev, meal]);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <NutritionContext.Provider value={{ meals, addMeal, totalCalories }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) throw new Error("useNutrition must be used within a NutritionProvider");
  return context;
};
