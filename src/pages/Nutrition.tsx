import React, { useState } from 'react';
import { Apple, Coffee, Pizza, Utensils } from 'lucide-react';
import NutritionForm from './NutritionForm';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Meal {
  id: number;
  name: string;
  icon: React.ElementType;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const mealCategories = {
  Breakfast: Coffee,
  Lunch: Pizza,
  Snacks: Apple,
  Dinner: Utensils,
};

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: 'Breakfast', icon: Coffee, time: '8:00 AM', calories: 450, protein: 20, carbs: 50, fats: 10 },
    { id: 2, name: 'Lunch', icon: Pizza, time: '12:30 PM', calories: 650, protein: 30, carbs: 70, fats: 20 },
    { id: 3, name: 'Snacks', icon: Apple, time: '3:30 PM', calories: 200, protein: 5, carbs: 30, fats: 2 },
    { id: 4, name: 'Dinner', icon: Utensils, time: '7:00 PM', calories: 700, protein: 40, carbs: 80, fats: 25 },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pendingMeal, setPendingMeal] = useState<any>(null);

  const handleAddMeal = (nutritionData: any) => {
    setPendingMeal(nutritionData);
    setOpen(true);
  };

  const confirmAddMeal = () => {
    if (!selectedCategory || !pendingMeal) return;

    const updatedMeals = meals.map((meal) => {
      if (meal.name === selectedCategory) {
        return {
          ...meal,
          calories: meal.calories + pendingMeal.nf_calories,
          protein: meal.protein + pendingMeal.nf_protein,
          carbs: meal.carbs + pendingMeal.nf_total_carbohydrate,
          fats: meal.fats + pendingMeal.nf_total_fat,
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
    setOpen(false);
    setSelectedCategory(null);
    setPendingMeal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracking</h1>
      </div>

      {/* Log Your Meal Section */}
      <NutritionForm onAddMeal={handleAddMeal} />

      {/* Meal Selection Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Meal Category</DialogTitle>
        <DialogContent>
          <div className="space-y-2">
            {Object.keys(mealCategories).map((category) => (
              <button
                key={category}
                className={`w-full px-4 py-2 rounded-md ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmAddMeal} disabled={!selectedCategory} color="primary">
            Add to {selectedCategory}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Nutrition Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">Today's Meals</h2>
        <p className="text-sm text-gray-500">
          Total Calories: {meals.reduce((acc, meal) => acc + meal.calories, 0)} / 2400
        </p>

        <div className="space-y-4 mt-4">
          {meals.map((meal) => {
            const Icon = meal.icon;
            return (
              <div
                key={meal.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{meal.calories} cal</p>
                  <p className="text-sm text-gray-600">
                    Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats: {meal.fats}g
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
