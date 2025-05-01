import React from 'react';
import { 
  Activity, Zap, Utensils, Heart, LineChart, Clock, Calendar, Share2
} from 'lucide-react';
import { Feature } from './types';

const features: Feature[] = [
  {
    id: 1,
    title: 'Activity Tracking',
    description: 'Track all your workouts, steps, and daily activity with precision and detail.',
    icon: 'Activity'
  },
  {
    id: 2,
    title: 'Performance Metrics',
    description: 'Advanced metrics to analyze your performance and track improvements over time.',
    icon: 'Zap'
  },
  {
    id: 3,
    title: 'Nutrition Tracking',
    description: 'Log meals, count calories, and maintain a balanced diet with our nutrition tools.',
    icon: 'Utensils'
  },
  {
    id: 4,
    title: 'Health Monitoring',
    description: 'Monitor vital health metrics like heart rate, sleep quality, and recovery.',
    icon: 'Heart'
  },
  {
    id: 5,
    title: 'Progress Analytics',
    description: 'Visualize your progress with detailed charts, trends, and insights.',
    icon: 'LineChart'
  },
  {
    id: 6,
    title: 'Workout Planning',
    description: 'Plan and schedule your workouts with customizable templates and routines.',
    icon: 'Calendar'
  },
  {
    id: 7,
    title: 'Recovery Tracking',
    description: 'Track rest periods and optimize recovery between workouts for better results.',
    icon: 'Clock'
  },
  {
    id: 8,
    title: 'Social Sharing',
    description: 'Share achievements with friends, join challenges, and stay motivated together.',
    icon: 'Share2'
  }
];

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'Activity': return <Activity className="w-6 h-6 text-blue-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-orange-500" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-green-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-red-500" />;
      case 'LineChart': return <LineChart className="w-6 h-6 text-purple-500" />;
      case 'Calendar': return <Calendar className="w-6 h-6 text-indigo-500" />;
      case 'Clock': return <Clock className="w-6 h-6 text-teal-500" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-pink-500" />;
      default: return <Activity className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gray-50 inline-block p-3 rounded-lg mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features to Transform Your Fitness Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive fitness tracking platform offers everything you need to 
            monitor your progress, optimize your workouts, and achieve your health goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;