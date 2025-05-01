import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Scale, TrendingUp, Activity, Calendar } from 'lucide-react';

const Progress = () => {
  const [metrics, setMetrics] = useState([
    { id: 1, label: 'Weight', current: '75', unit: 'kg', change: '-2.5', trend: 'down', icon: Scale },
    { id: 2, label: 'Body Fat', current: '18', unit: '%', change: '-1.5', trend: 'down', icon: TrendingUp },
    { id: 3, label: 'Muscle Mass', current: '35', unit: 'kg', change: '+1.2', trend: 'up', icon: Activity },
    { id: 4, label: 'Active Days', current: '18/30', unit: 'days', change: '+5', trend: 'up', icon: Calendar },
  ]);

  const [history, setHistory] = useState([
    { date: '2025-04-01', weight: 78, bodyFat: 20 },
    { date: '2025-04-15', weight: 76.5, bodyFat: 19 },
    { date: '2025-05-01', weight: 75, bodyFat: 18 },
  ]);

  const [newEntry, setNewEntry] = useState({ date: '', weight: '', bodyFat: '' });

  const handleMetricChange = (
    index: number,
    field: 'label' | 'current' | 'unit' | 'change' | 'trend',
    value: string
  ) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: value };
    setMetrics(updated);
  };

  const addHistoryEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEntry.date && newEntry.weight && newEntry.bodyFat) {
      setHistory([...history, {
        date: newEntry.date,
        weight: parseFloat(newEntry.weight),
        bodyFat: parseFloat(newEntry.bodyFat),
      }]);
      setNewEntry({ date: '', weight: '', bodyFat: '' });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-blue-100">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
              <input
                type="text"
                value={metric.change}
                onChange={(e) => handleMetricChange(index, 'change', e.target.value)}
                className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} w-20 text-right`}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <input
                type="text"
                value={metric.current}
                onChange={(e) => handleMetricChange(index, 'current', e.target.value)}
                className="text-2xl font-bold text-gray-900 w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={addHistoryEntry} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Log New Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            className="border p-2 rounded"
            value={newEntry.weight}
            onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
          />
          <input
            type="number"
            placeholder="Body Fat (%)"
            className="border p-2 rounded"
            value={newEntry.bodyFat}
            onChange={(e) => setNewEntry({ ...newEntry, bodyFat: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Entry
        </button>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Body Composition</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[10, 30]} />
              <Tooltip />
              <Line type="monotone" dataKey="bodyFat" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Progress;