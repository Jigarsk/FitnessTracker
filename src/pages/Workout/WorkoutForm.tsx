import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkoutFormProps {
  onAddWorkout: (workoutData: WorkoutData) => void;
}

interface WorkoutData {
  id: number;
  type: string;
  duration: string;
  calories: number;
  time: string;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onAddWorkout }) => {
  const [exercise, setExercise] = useState<string>('');
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const fetchWorkoutData = async () => {
    const API_ID = '053e4ffa';
    const API_KEY = '2cbdf845a0a8c5daf15a942c4b9455f7';

    if (!exercise.trim()) {
      setError('Please enter an exercise.');
      return;
    }

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/exercise',
        { query: exercise },
        {
          headers: {
            'x-app-id': API_ID,
            'x-app-key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.exercises && response.data.exercises.length > 0) {
        const data = response.data.exercises[0];
        setWorkoutData({
          id: Date.now(),
          type: data.name,
          duration: `${data.duration_min} min`,
          calories: data.nf_calories,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setError(null);
        console.log('Fetched Workout Data:', data);  // Debugging: Check if data is fetched correctly
      } else {
        setError('No workout data found for the given exercise.');
      }
    } catch (error) {
      console.error('Error fetching workout data:', error);
      setError('Unable to fetch workout data. Try again later.');
    }
  };




  const handleAddWorkout = async () => {
    if (workoutData) {
      try {
        // Send the workout data to the server
        await axios.post('http://localhost:5000/api/workouts', workoutData);
        console.log('Sending workout data:', workoutData);

        onAddWorkout(workoutData);  // Passing workout data back to Workouts.tsx
        setExercise('');  // Clear the input field
        setWorkoutData(null);  // Reset workout data
      } catch (error) {
        console.error('Error adding workout:', error);
        setError('Unable to add workout. Try again later.');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Log Your Workout</h2>
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="e.g., 30 minutes running"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchWorkoutData}
      >
        Get Workout Info
      </button>

      {workoutData && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold capitalize">{workoutData.type}</h3>
          <p>Duration: {workoutData.duration}</p>
          <p>Calories Burned: {workoutData.calories.toFixed(2)} kcal</p>
          <button
  className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
  onClick={async () => {
    await handleAddWorkout(); // Ensures workout is added before navigating
    navigate('/log-workout');
  }}
>
  Add to Workouts
</button>
        </div>
      )}
    </div>
  );
};

export default WorkoutForm;
