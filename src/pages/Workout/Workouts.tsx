import  { useState } from 'react';
import { Dumbbell, Timer, Bike, Waves, Flame, Trash2, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkoutContext } from '../../context/workoutContext'; // Import context hook
import WorkoutForm from './WorkoutForm';

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
  const location = useLocation();  // Use location hook for current path
  const { workouts, deleteWorkout, totalCaloriesBurned } = useWorkoutContext(); // Access context

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

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

      {!location.pathname.includes('/log-workout') && (
        <>
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow">
            <strong>Total Calories Burned:</strong> {totalCaloriesBurned.toFixed(2)} kcal
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

      {location.pathname.includes('/log-workout') ? (
        // Conditionally render the WorkoutForm component
        <WorkoutForm  />
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
                  onClick={() => deleteWorkout(workout.id)} // Use context function
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
