import React, { useState } from 'react';
import axios from 'axios';

interface NutritionFormProps {
  onAddMeal: (nutritionData: any) => void;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onAddMeal }) => {
  const [food, setFood] = useState<string>('');
  const [nutritionData, setNutritionData] = useState<any>(null);

  const fetchNutrition = async () => {
    const API_ID = '053e4ffa';
    const API_KEY = '2cbdf845a0a8c5daf15a942c4b9455f7';

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

      setNutritionData(response.data.foods[0]);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  const handleAddMeal = () => {
    if (nutritionData) {
      onAddMeal(nutritionData);
      setFood('');
      setNutritionData(null);
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
        onChange={(e) => setFood(e.target.value)}
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
