import React, { useState } from 'react';
import { Activity, Dumbbell, Droplets, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Daily Calories',
      value: '2,100',
      target: '2,400',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Water Intake',
      value: '1.8L',
      target: '2.5L',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Active Minutes',
      value: '45',
      target: '60',
      icon: Dumbbell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Current Weight',
      value: '75kg',
      target: '70kg',
      icon: Scale,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const handleNavigate = (path:string) => {
    setIsModalOpen(false);
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Log Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, target, icon: Icon, color, bgColor }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${bgColor}`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Target: {target}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{label}</h3>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Log Activity */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Log Activity
            </h2>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => handleNavigate('/nutrition')}
              >
                Log Nutrition
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleNavigate('/workout-form')}
              >
                Log Workouts
              </button>
              <button
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                onClick={() => handleNavigate('/progress-form')}
              >
                Log Progress
              </button>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
