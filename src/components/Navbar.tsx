import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, Dumbbell, Home, LineChart, User, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  // Log out the user and redirect to the login page
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('username');
      navigate('/home');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/nutrition', icon: Activity, label: 'Nutrition' },
    { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { to: '/progress', icon: LineChart, label: 'Progress' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FitTrack</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Username and Logout */}
          <div className="flex items-center space-x-4">
            <h1 className="text-sm font-medium text-gray-800">
              Welcome Back - {username}
            </h1>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 hover:text-red-600 flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span className="mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
