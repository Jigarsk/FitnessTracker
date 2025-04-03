import React from 'react';
import { Dumbbell, Timer, Bike, Waves } from 'lucide-react';

const Workouts = () => {
  const workouts = [
    {
      id: 1,
      type: 'Running',
      icon: Timer,
      duration: '45 min',
      calories: 400,
      time: '7:00 AM',
    },
    {
      id: 2,
      type: 'Weight Training',
      icon: Dumbbell,
      duration: '60 min',
      calories: 300,
      time: '5:30 PM',
    },
    {
      id: 3,
      type: 'Cycling',
      icon: Bike,
      duration: '30 min',
      calories: 250,
      time: '12:00 PM',
    },
    {
      id: 4,
      type: 'Swimming',
      icon: Waves,
      duration: '40 min',
      calories: 350,
      time: '8:00 AM',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workout Tracking</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Log Workout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Workouts</h2>
            <p className="text-sm text-gray-500">This Week's Active Minutes: 255</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
              Week
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg font-medium">
              Month
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {workouts.map((workout) => {
            const Icon = workout.icon;
            return (
              <div
                key={workout.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{workout.type}</h3>
                    <p className="text-sm text-gray-500">{workout.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{workout.duration}</p>
                  <p className="text-sm text-gray-500">{workout.calories} cal</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Workout Distribution
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Workout type distribution chart will be implemented here
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Activity
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Activity trend chart will be implemented here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;