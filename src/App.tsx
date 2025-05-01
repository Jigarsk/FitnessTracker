import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

import Workouts from './pages/Workout/Workouts';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Nutrition from './pages/Nutrition/Nutrition';
import NutritionForm from './pages/Nutrition/NutritionForm';
import WorkoutForm from './pages/Workout/WorkoutForm';
import { NutritionProvider } from './context/nutritionContext';
import { WorkoutProvider } from './context/workoutContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

// Private Route component
function PrivateRoute({ children }: { children: JSX.Element }) {
  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Wrapper to show Navbar only on authenticated pages
function ProtectedLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}

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
        <WorkoutProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes with Navbar */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ProtectedLayout><Dashboard /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/nutrition"
              element={
                <PrivateRoute>
                  <ProtectedLayout><Nutrition /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/nutrition-form"
              element={
                <PrivateRoute>
                  <ProtectedLayout><NutritionForm onAddMeal={handleAddMeal} /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/workouts"
              element={
                <PrivateRoute>
                  <ProtectedLayout><Workouts /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/log-workout"
              element={
                <PrivateRoute>
                  <ProtectedLayout><WorkoutForm onAddWorkout={handleAddWorkout} /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <PrivateRoute>
                  <ProtectedLayout><Progress /></ProtectedLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProtectedLayout><Profile /></ProtectedLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </WorkoutProvider>
      </NutritionProvider>
    </Router>
  );
}

export default App;
