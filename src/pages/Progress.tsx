import React from 'react';
import { Scale, TrendingUp, Activity, Calendar } from 'lucide-react';

const Progress = () => {
  const metrics = [
    {
      id: 1,
      label: 'Weight',
      current: '75 kg',
      change: '-2.5 kg',
      trend: 'down',
      icon: Scale,
    },
    {
      id: 2,
      label: 'Body Fat',
      current: '18%',
      change: '-1.5%',
      trend: 'down',
      icon: TrendingUp,
    },
    {
      id: 3,
      label: 'Muscle Mass',
      current: '35 kg',
      change: '+1.2 kg',
      trend: 'up',
      icon: Activity,
    },
    {
      id: 4,
      label: 'Active Days',
      current: '18/30',
      change: '+5 days',
      trend: 'up',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Log Measurements
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ id, label, current, change, trend, icon: Icon }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-blue-100">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <span
                className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{label}</h3>
              <p className="text-2xl font-bold text-gray-900">{current}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Weight Progress
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Weight trend chart will be implemented here
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Body Composition
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Body composition chart will be implemented here
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Progress Photos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Front view photos will be displayed here</p>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Side view photos will be displayed here</p>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Back view photos will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;