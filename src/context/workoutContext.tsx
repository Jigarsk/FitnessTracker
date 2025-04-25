import React, { createContext, useContext, useState } from 'react';

interface Workout {
  id: string;
  type: string;
  duration: string;
  calories: number;
  time: string;
}

interface WorkoutContextProps {
  workouts: Workout[];
  totalCaloriesBurned: number;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;

}
interface WorkoutFormProps {
    onAddWorkout: (workoutData: any) => void;
  }
  
// Define the type of props for the WorkoutProvider
interface WorkoutProviderProps {
  children: React.ReactNode;
}

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [totalCaloriesBurned, settotalCaloriesBurned] = useState(0);

  const addWorkout = (workout: Workout) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = [...prevWorkouts, workout];
      updatetotalCaloriesBurned(newWorkouts);
      return newWorkouts;
    });
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = prevWorkouts.filter((workout) => workout.id !== id);
      updatetotalCaloriesBurned(newWorkouts);
      return newWorkouts;
    });
  };

  const updatetotalCaloriesBurned = (workouts: Workout[]) => {
    const calories = workouts.reduce((total, workout) => total + workout.calories, 0);
    settotalCaloriesBurned(calories);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, totalCaloriesBurned, addWorkout, deleteWorkout }}>

      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
};
