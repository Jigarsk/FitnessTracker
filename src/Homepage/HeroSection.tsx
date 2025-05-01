import React from 'react';
import { Play, ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Track Your Fitness <span className="text-blue-600">Journey</span> Like Never Before
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Get insights into your workouts, nutrition, and recovery with our comprehensive fitness tracking platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="/signup" 
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Signup Now <ChevronRight size={20} className="ml-1" />
              </a>
            
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="h-9 w-9 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  >
                    <img 
                      src={`https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2`} 
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Trusted by <span className="font-semibold">20,000+</span> users</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white p-2 rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Fitness App" 
                className="rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-100 p-4 rounded-2xl shadow-lg transform rotate-3">
                <div className="font-semibold text-green-800 text-sm">Weekly Progress</div>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-green-600 font-bold">+84%</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-blue-100 p-4 rounded-2xl shadow-lg transform -rotate-3">
              <div className="font-semibold text-blue-800 text-sm">Daily Steps</div>
              <div className="mt-1 flex items-center">
                <span className="text-blue-600 font-bold text-xl">8,547</span>
                <span className="ml-1 text-blue-500 text-sm">/ 10k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;