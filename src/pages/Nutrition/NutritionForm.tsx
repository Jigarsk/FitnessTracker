import React, { useState } from 'react';
import axios from 'axios';
import { useNutrition } from '../../context/nutritionContext';


interface NutritionFormProps {
  onAddMeal: (nutritionData: any) => void;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onAddMeal }) => {
  const { addMeal } = useNutrition(); // Get the addMeal function from context
  const [food, setFood] = useState<string>('');
  const [nutritionData, setNutritionData] = useState<any>(null);

  // Fetch nutrition info from the Nutritionix API
  const fetchNutrition = async () => {
    const API_ID = import.meta.env.VITE_NUTRITIONIX_APP_ID;
    const API_KEY = import.meta.env.VITE_NUTRITIONIX_APP_KEY;
    

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: food },
        {
          headers: {
            'x-app-id': API_ID,
            'x-app-key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      setNutritionData(response.data.foods[0]); // Store the nutrition data
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  // Handle adding the meal to context
  const handleAddMeal = () => {
    if (nutritionData) {
      const formattedData = {
        name: nutritionData.food_name,
        calories: nutritionData.nf_calories,
        protein: nutritionData.nf_protein,
        carbs: nutritionData.nf_total_carbohydrate,
        fats: nutritionData.nf_total_fat,
        time: new Date().toLocaleTimeString(),
        category: 'Snacks', // Can be customizable by user
      };

      console.log('Formatted data before sending:', formattedData); // Debugging line

      addMeal(formattedData); // Update the global state via context
      onAddMeal(formattedData); // Optional: call the prop function for local logging
      setFood(''); // Reset the input field
      setNutritionData(null); // Reset the nutrition data
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Log Your Meal</h2>
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Enter food (e.g., 1 apple)"
        value={food}
        onChange={(e) => setFood(e.target.value)} // Handle input change
      />
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded" onClick={fetchNutrition}>
        Get Nutrition Info
      </button>

      {nutritionData && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">{nutritionData.food_name}</h3>
          <p>Calories: {nutritionData.nf_calories} kcal</p>
          <p>Protein: {nutritionData.nf_protein} g</p>
          <p>Carbs: {nutritionData.nf_total_carbohydrate} g</p>
          <p>Fats: {nutritionData.nf_total_fat} g</p>
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddMeal}>
            Add to Meals
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
