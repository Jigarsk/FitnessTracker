import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface Meal {
  name: string;
  calories: number;
  // Add other fields as needed
}

interface NutritionContextType {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  totalCalories: number;
}

// Create context
const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

// Custom hook
export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error("useNutrition must be used within a NutritionProvider");
  }
  return context;
};

// Provider
export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  return (
    <NutritionContext.Provider value={{ meals, setMeals, totalCalories }}>
      {children}
    </NutritionContext.Provider>
  );
};
