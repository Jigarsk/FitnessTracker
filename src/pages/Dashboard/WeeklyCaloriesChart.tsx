// WeeklyCaloriesChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

interface WeeklyCaloriesChartProps {
  data: {
    labels: string[];
    caloriesConsumed: number[];
    caloriesBurned: number[];
    calorieGoal: number;
  };
}

const WeeklyCaloriesChart: React.FC<WeeklyCaloriesChartProps> = ({ data }) => {
  const netCalories = data.caloriesConsumed.map((consumed, i) => consumed - data.caloriesBurned[i]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Calories Consumed',
        data: data.caloriesConsumed,
        borderColor: 'rgba(34, 197, 94, 1)', // green
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Calories Burned',
        data: data.caloriesBurned,
        borderColor: 'rgba(59, 130, 246, 1)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Net Calories',
        data: netCalories,
        borderColor: 'rgba(139, 92, 246, 1)', // purple
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: 'Calorie Goal',
        data: Array(data.labels.length).fill(data.calorieGoal),
        borderColor: 'rgba(239, 68, 68, 1)', // red
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Weekly Calorie Overview',
        font: { size: 20 },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeeklyCaloriesChart;
