import React from 'react';
import { Check, X } from 'lucide-react';
import { PricingPlan } from './types';

const plans: PricingPlan[] = [
  {
    id: 1,
    name: 'Basic',
    price: 'Free',
    description: 'Essential fitness tracking for casual users',
    features: [
      'Activity tracking',
      'Basic workout plans',
      'Step counter',
      'Weight tracking',
      'Limited analytics',
      'Community access'
    ]
  },
  {
    id: 2,
    name: 'Premium',
    price: '$9.99',
    description: 'Advanced features for fitness enthusiasts',
    features: [
      'All Basic features',
      'Advanced analytics',
      'Custom workout plans',
      'Nutrition tracking',
      'Goal setting',
      'Progress reports',
      'Export data'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Elite',
    price: '$19.99',
    description: 'Complete solution for serious athletes',
    features: [
      'All Premium features',
      'Personal coach access',
      'Advanced performance metrics',
      'Video analysis',
      'Priority support',
      'AI-powered recommendations',
      'Unlimited workout history'
    ]
  }
];

const PricingCard: React.FC<PricingPlan> = ({ name, price, description, features, popular }) => {
  return (
    <div className={`
      rounded-2xl overflow-hidden transition-all duration-300
      ${popular ? 'shadow-xl ring-2 ring-blue-500 scale-105 md:-mt-4' : 'shadow-md hover:shadow-lg'}
    `}>
      {popular && (
        <div className="bg-blue-600 text-white py-2 text-center text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 md:p-8 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Free' && <span className="text-gray-500">/month</span>}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
          
          {name === 'Basic' && (
            <>
              <li className="flex items-start opacity-50">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-500">Advanced analytics</span>
              </li>
              <li className="flex items-start opacity-50">
                <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-500">Custom workout plans</span>
              </li>
            </>
          )}
        </ul>
        
        <a 
          href="#choose-plan"
          className={`
            block text-center py-3 px-4 rounded-lg font-medium transition-colors w-full
            ${popular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
          `}
        >
          {price === 'Free' ? 'Get Started' : 'Choose Plan'}
        </a>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your fitness goals and budget. 
            All plans include core tracking features with no hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution for your team or organization?
          </p>
          <a 
            href="#contact"
            className="text-blue-600 font-medium hover:underline"
          >
            Contact us for enterprise pricing →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;