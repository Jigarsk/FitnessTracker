import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Apple, Coffee, Pizza, Utensils } from 'lucide-react';
import NutritionForm from './NutritionForm';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Meal {
  _id?: string;
  name: string;
  icon: string;
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
  const [meals, setMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pendingMeal, setPendingMeal] = useState<any>(null);
  const totalCalories = Array.isArray(meals) ? meals.reduce((acc, meal) => acc + meal.calories, 0) : 0;

  // Fetch meals from MongoDB
  useEffect(() => {
    axios.get('http://localhost:5000/meals')
      .then(response => {
        console.log('Fetched meals:', response.data); // Debugging: Check the API response
        setMeals(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error('Error fetching meals:', error));
  }, []);
  
  const handleAddMeal = (nutritionData: any) => {
    setPendingMeal(nutritionData);
    setOpen(true);
  };

  const confirmAddMeal = async () => {
    if (!selectedCategory || !pendingMeal) return;

    const newMeal: Meal = {
      name: selectedCategory,
      icon: mealCategories[selectedCategory as keyof typeof mealCategories].toString(),
      time: new Date().toLocaleTimeString(),
      calories: pendingMeal.nf_calories,
      protein: pendingMeal.nf_protein,
      carbs: pendingMeal.nf_total_carbohydrate,
      fats: pendingMeal.nf_total_fat,
    };
    

    try {
      const response = await axios.post('http://localhost:5000/meals', newMeal);
      console.log('Fetched meals:', response.data);

      setMeals([...meals, response.data]); // Update UI with new meal
      setOpen(false);
      setSelectedCategory(null);
      setPendingMeal(null);
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracking</h1>

      {/* Log Meal Form */}
      <NutritionForm onAddMeal={handleAddMeal} />

      {/* Meal Selection Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Meal Category</DialogTitle>
        <DialogContent>
          {Object.keys(mealCategories).map((category) => (
            <button
              key={category}
              className={`w-full px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmAddMeal} disabled={!selectedCategory} color="primary">
            Add to {selectedCategory}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Nutrition Dashboard */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">Today's Meals</h2>
        <p className="text-sm text-gray-500">
      

       <div className="bg-white rounded-xl shadow-sm p-6">

  <p className="text-sm text-gray-500">
    Total Calories: {totalCalories}
  </p>
</div>


        </p>

        <div className="space-y-4 mt-4">
          {meals.map((meal) => {
            const Icon = mealCategories[meal.name as keyof typeof mealCategories] || Utensils;
            return (
              <div key={meal._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
