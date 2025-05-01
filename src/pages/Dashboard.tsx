import  { useEffect, useState } from 'react';

import {
  Flame,
  Salad,
  BarChart3,

  Dumbbell,
  Utensils,

} from 'lucide-react';
import { useNutrition } from '../context/nutritionContext';

const Dashboard = () => {
  const { totalCalories } = useNutrition();


  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);
  const [loggedWorkouts, setLoggedWorkouts] = useState<any[]>([]);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [bmr, setBmr] = useState<number | null>(null);
  const [dailyCalories, setDailyCalories] = useState<number | null>(null); // To store the daily calorie calculation


  useEffect(() => {
    const meals = localStorage.getItem('loggedMeals');
    const workouts = localStorage.getItem('loggedWorkouts');

    if (meals) setLoggedMeals(JSON.parse(meals));
    if (workouts) setLoggedWorkouts(JSON.parse(workouts));

    // Fetch stored weight, height, age, gender, and activity level if available
    const savedWeight = localStorage.getItem('weight');
    const savedHeight = localStorage.getItem('height');
    const savedAge = localStorage.getItem('age');
    const savedGender = localStorage.getItem('gender');
    const savedActivityLevel = localStorage.getItem('activityLevel');

    if (savedWeight) setWeight(Number(savedWeight));
    if (savedHeight) setHeight(Number(savedHeight));
    if (savedAge) setAge(Number(savedAge));
    if (savedGender) setGender(savedGender);
    if (savedActivityLevel) setActivityLevel(savedActivityLevel);
  }, []);

  const handleAddMeal = (mealData: any) => {
    const updatedMeals = [mealData, ...loggedMeals];
    setLoggedMeals(updatedMeals);
    localStorage.setItem('loggedMeals', JSON.stringify(updatedMeals));
  };


  const handleSubmit = () => {
    // Calculate BMR using Mifflin-St Jeor Equation (for men and women)
    let calculatedBMR = 0;
    if (gender === 'male') {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust BMR based on activity level
    let activityMultiplier = 1.2; // Sedentary as default
    if (activityLevel === 'light') activityMultiplier = 1.375;
    if (activityLevel === 'moderate') activityMultiplier = 1.55;
    if (activityLevel === 'intense') activityMultiplier = 1.725;

    const caloriesRequired = calculatedBMR * activityMultiplier;

    setBmr(calculatedBMR);
    setDailyCalories(caloriesRequired);

    // Save data to localStorage
    localStorage.setItem('weight', weight.toString());
    localStorage.setItem('height', height.toString());
    localStorage.setItem('age', age.toString());
    localStorage.setItem('gender', gender);
    localStorage.setItem('activityLevel', activityLevel);
  };

  const totalCaloriesConsumed = totalCalories || loggedMeals.reduce(
    (sum, meal) => sum + (parseFloat(meal.calories) || 0),
    0
  );


  const totalCaloriesBurned = loggedWorkouts.reduce(
    (sum, workout) => sum + (parseFloat(workout.calories) || 0),
    0
  );

  const netCalories = dailyCalories + totalCaloriesBurned - totalCaloriesConsumed;


  const lastMeal = loggedMeals[0];
  const lastWorkout = loggedWorkouts[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Weight, Height, Age, Gender, and Activity Level Form */}
      <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-gray-500 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Enter Your Details</h2>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border rounded-md shadow-sm"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border rounded-md shadow-sm"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Age, Gender, and Activity Level Selection */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Age (years)</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border rounded-md shadow-sm"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value="intense">Very active (hard exercise/sports 6-7 days a week)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Calculate Daily Calories
        </button>

        {/* Show the calculated calories if available */}
        {dailyCalories && (
          <div className="mt-4 text-xl text-gray-700">
            <p>Your daily caloric needs: <strong>{dailyCalories.toFixed(2)} kcal</strong></p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calories Consumed */}

        <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <Salad className="text-green-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Calories Consumed</h2>
          </div>
          <p className="mt-2 text-2xl text-gray-700">
            {totalCalories.toFixed(2)} kcal
          </p>
        </div>


        {/* Calories Burned */}
        <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <Dumbbell className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Calories Burned</h2>
          </div>
          <p className="mt-2 text-2xl text-gray-700">{totalCaloriesBurned.toFixed(2)} kcal</p>
        </div>

        {/* Net Calories */}
        <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center gap-4">
            <Flame className="text-purple-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Net Calories</h2>
          </div>
          <p className="mt-2 text-2xl text-gray-700">{netCalories.toFixed(2)} kcal</p>
        </div>

        {/* Total Meals */}
        <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center gap-4">
            <Utensils className="text-yellow-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Meals Logged</h2>
          </div>
          <p className="mt-2 text-2xl text-gray-700">{handleAddMeal.length}</p>
        </div>

        {/* Total Workouts */}
        <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-red-500">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-red-500 w-6 h-6" />
            <h2 className="text-xl font-semibold">Workouts Logged</h2>
          </div>
          <p className="mt-2 text-2xl text-gray-700">{loggedWorkouts.length}</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
