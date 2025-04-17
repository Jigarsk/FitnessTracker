import React, { useState, useEffect } from 'react';
import { Dumbbell, Timer, Bike, Waves, Flame, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';
import axios from 'axios';

// Define a type for the workout object
interface Workout {
  id: number;
  type: string;
  duration: string;
  calories: number;
  time: string;
}

const getIcon = (type: string) => {
  const normalized = type.toLowerCase();
  if (normalized.includes('run')) return <Timer className="text-blue-600" />;
  if (normalized.includes('cycle')) return <Bike className="text-yellow-600" />;
  if (normalized.includes('swim')) return <Waves className="text-cyan-600" />;
  if (normalized.includes('weight') || normalized.includes('gym')) return <Dumbbell className="text-purple-600" />;
  return <Flame className="text-red-600" />;
};

const Workouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]); // Holds workouts fetched from DB
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts');
        setWorkouts(response.data); // Update workouts state
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []); // Run once on component mount

  const handleAddWorkout = async (workout: Workout) => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-workout', {
        type: workout.type,
        duration: workout.duration,
        calories: workout.calories.toString(),
        time: workout.time,
      });

      // Add the new workout to the state
      setWorkouts([...workouts, response.data.workout]);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };
  const handleDeleteWorkout = async (id: number) => { 
    try {
      console.log("Deleting workout with ID:", id);  
      await axios.delete(`http://localhost:5000/api/workouts/${id}`);
      const updated = workouts.filter((w) => w.id !== id);  // Ensure to use string comparison
      setWorkouts(updated);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };
  
  
  const totalCalories = workouts.reduce(
    (sum, w) => sum + (w.calories || 0),
    0
  );

  const filteredWorkouts = workouts.filter((workout) => {
    const matchSearch = workout.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterType ? workout.type.toLowerCase().includes(filterType) : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workout Tracking</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/log-workout')}
        >
          Log Workout
        </button>
      </div>

      {!window.location.pathname.includes('/log-workout') && (
        <>
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow">
            <strong>Total Calories Burned:</strong> {totalCalories.toFixed(2)} kcal
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search workouts..."
                className="outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 border rounded-lg bg-white shadow-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="run">Running</option>
              <option value="cycle">Cycling</option>
              <option value="swim">Swimming</option>
              <option value="weight">Weight Training</option>
              <option value="gym">Gym</option>
            </select>
          </div>
        </>
      )}

      {window.location.pathname.includes('/log-workout') ? (
        <WorkoutForm onAddWorkout={handleAddWorkout} />
      ) : (
        <div className="grid gap-4">
          {filteredWorkouts.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No workouts found.</p>
          ) : (
            filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 bg-white rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded">{getIcon(workout.type)}</div>
                  <div>
                    <h3 className="font-semibold capitalize">{workout.type}</h3>
                    <p className="text-sm text-gray-600">
                      {workout.duration} • {workout.calories} kcal
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{workout.time}</span>
                <button
                  className="text-red-500 hover:text-red-700 ml-4 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => handleDeleteWorkout(workout.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Workouts;
