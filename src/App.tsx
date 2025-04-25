import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Workouts from './pages/Workout/Workouts';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Nutrition from './pages/Nutrition/Nutrition';
import NutritionForm from './pages/Nutrition/NutritionForm';
import WorkoutForm from './pages/Workout/WorkoutForm';
import { NutritionProvider } from './context/nutritionContext';
import { WorkoutProvider } from './context/workoutContext';  // Import WorkoutProvider
import Dashboard from './pages/Dashboard';

function App() {
  const handleAddMeal = (mealData: any) => {
    console.log("Meal added:", mealData);
  };
  const handleAddWorkout = (workoutData: any) => {
    console.log("Workout added:", workoutData);
  };

  return (
    <Router>
      <NutritionProvider>
        <WorkoutProvider>  {/* Wrap with WorkoutProvider */}
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/nutrition-form" element={<NutritionForm onAddMeal={handleAddMeal} />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/log-workout" element={<WorkoutForm onAddWorkout={handleAddWorkout} />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </WorkoutProvider> {/* Close WorkoutProvider */}
      </NutritionProvider>
    </Router>
  );
}

export default App;
