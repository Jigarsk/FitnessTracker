import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

const ActivitySection: React.FC = () => {
  return (
    <section id="activities" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
              <div className="bg-blue-600 rounded-3xl p-1 shadow-xl max-w-md mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Weekly Activity</h3>
                      <span className="text-sm opacity-80">June 10-16</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-end h-40 mb-6">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                        // Generate random heights for demo
                        const heights = [65, 40, 80, 55, 85, 35, 70];
                        return (
                          <div key={day} className="flex-1 flex flex-col items-center">
                            <div 
                              className={`w-4/5 rounded-t-md ${
                                i === 4 ? 'bg-blue-600' : 'bg-blue-200'
                              }`}
                              style={{height: `${heights[i]}%`}}
                            ></div>
                            <span className="text-xs text-gray-500 mt-2">{day}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500">Weekly Average</div>
                          <div className="text-2xl font-bold text-gray-900">8,324</div>
                          <div className="text-sm text-green-600 font-medium">+12% from last week</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-full">
                          <div className="text-blue-600 font-semibold">84%</div>
                          <div className="text-xs text-blue-500">of goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 bg-green-100 p-4 rounded-2xl shadow-lg transform rotate-6">
                <div className="font-semibold text-green-800 text-sm">Today's Run</div>
                <div className="mt-1 flex items-center">
                  <span className="text-green-600 font-bold">5.4 km</span>
                  <span className="ml-2 text-xs text-green-500">32:15 min</span>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-orange-100 p-4 rounded-2xl shadow-lg transform -rotate-6">
                <div className="font-semibold text-orange-800 text-sm">Calories</div>
                <div className="mt-1 flex items-center">
                  <span className="text-orange-600 font-bold">1,248</span>
                  <span className="ml-2 text-xs text-orange-500">burned today</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Track Every Activity with Precision and Insight
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Whether you're running, cycling, swimming, or hitting the gym, FitTrack gives you 
              comprehensive data and analysis to help you maximize your workouts and reach your goals faster.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Record and analyze over 100+ different activities',
                'Get detailed breakdowns of your performance metrics',
                'Track improvements and spot trends over time',
                'Set personal records and challenge yourself',
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            
            <a 
              href="signup" 
              className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Start Tracking Now <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;