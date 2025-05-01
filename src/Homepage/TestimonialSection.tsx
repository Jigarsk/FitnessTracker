import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from './types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marathon Runner',
    content: 'FitTrack has completely transformed my training. The detailed metrics and progress tracking have helped me improve my pace by 15% in just two months!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Fitness Enthusiast',
    content: 'As someone who loves data, FitTrack gives me everything I need to optimize my workouts. The nutrition tracking feature has been a game changer for my body composition goals.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Yoga Instructor',
    content: 'I appreciate how FitTrack helps me balance intensity and recovery. The holistic approach to fitness tracking has helped both me and my clients achieve better results with less strain.',
    avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=120'
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'CrossFit Athlete',
    content: 'The performance analytics in FitTrack have given me insights I never had before. Being able to track my progress across different workouts has pushed me to new personal bests.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=120'
  }
];

const TestimonialCard: React.FC<Testimonial> = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className="w-5 h-5 text-yellow-400 fill-current" 
            strokeWidth={0}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Fitness Enthusiasts Everywhere
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about 
            how FitTrack has transformed their fitness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-50 px-6 py-3 rounded-full text-blue-700">
            <span className="font-semibold text-lg mr-2">4.9</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-5 h-5 text-blue-600 fill-current" 
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="ml-2 font-medium">from 2,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;