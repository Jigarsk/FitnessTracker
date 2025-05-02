import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Coffee, Sandwich, Utensils, Trash } from 'lucide-react';
import NutritionForm from './NutritionForm';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Meal {
  _id?: string;
  category: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const mealCategories = {
  Breakfast: Coffee,
  Lunch: Utensils,
  Snacks: Sandwich,
  Dinner: Utensils,
};

const BASE_URL = process.env.REACTURL;

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Meal['category'] | null>(null);
  const [pendingMeal, setPendingMeal] = useState<Meal | null>(null);
  const [activeCategory, setActiveCategory] = useState<Meal['category'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);
  const totalCarbs = meals.reduce((acc, meal) => acc + meal.carbs, 0);
  const totalFats = meals.reduce((acc, meal) => acc + meal.fats, 0);

  const handleDeleteMeal = async (mealId: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/meals/${mealId}`);
      setMeals(prevMeals => prevMeals.filter(meal => meal._id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/meals`);
        if (Array.isArray(response.data)) {
          setMeals(response.data);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleAddMeal = useCallback((nutritionData: Meal) => {
    setPendingMeal(nutritionData);
    setOpen(true);
  }, []);

  const confirmAddMeal = async () => {
    if (!selectedCategory || !pendingMeal || loading) return;

    setLoading(true);
    const newMeal: Meal = {
      name: pendingMeal.name,
      category: selectedCategory,
      time: new Date().toLocaleTimeString(),
      calories: pendingMeal.calories,
      protein: pendingMeal.protein,
      carbs: pendingMeal.carbs,
      fats: pendingMeal.fats,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/meals`, newMeal);
      setMeals([...meals, response.data]);
      setOpen(false);
      setSelectedCategory(null);
      setPendingMeal(null);
    } catch (error) {
      console.error('Error saving meal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracking</h1>
      <NutritionForm onAddMeal={handleAddMeal} />

      {/* Meal Category Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Meal Category</DialogTitle>
        <DialogContent>
          {Object.keys(mealCategories).map((category) => (
            <button
              key={category}
              className={`w-full px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category as Meal['category'])}
            >
              {category}
            </button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmAddMeal} disabled={!selectedCategory || loading} color="primary">
            {loading ? 'Adding...' : `Add to ${selectedCategory}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Filters */}
      <div className="flex space-x-4">
        {Object.keys(mealCategories).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveCategory(category as Meal['category'])}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meals Display */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">Today's Macros</h2>

        {/* Nutrient Summary Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
            <p className="text-sm">Total Calories</p>
            <p className="text-xl font-semibold">{totalCalories.toFixed(2)} kcal</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
            <p className="text-sm">Protein</p>
            <p className="text-xl font-semibold">{totalProtein.toFixed(2)} g</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow">
            <p className="text-sm">Carbs</p>
            <p className="text-xl font-semibold">{totalCarbs.toFixed(2)} g</p>
          </div>
          <div className="bg-pink-100 text-pink-800 p-4 rounded-lg shadow">
            <p className="text-sm">Fats</p>
            <p className="text-xl font-semibold">{totalFats.toFixed(2)} g</p>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <AnimatePresence>
            {meals
              .filter(meal => !activeCategory || meal.category === activeCategory)
              .map(meal => {
                const Icon = mealCategories[meal.category as keyof typeof mealCategories];
                return (
                  <motion.div
                    key={meal._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                    layout
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg">
                        {Icon && <Icon className="h-6 w-6 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{meal.name}</h3>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{meal.calories} cal</p>
                        <p className="text-sm text-gray-600">
                          Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats: {meal.fats}g
                        </p>
                      </div>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => meal._id && handleDeleteMeal(meal._id)}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
