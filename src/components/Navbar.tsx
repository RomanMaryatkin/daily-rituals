
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, BarChart, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Today' },
    { path: '/habits', icon: Calendar, label: 'Habits' },
    { path: '/statistics', icon: BarChart, label: 'Statistics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto">
        <div className="flex justify-around">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 ${isActive ? 'text-black' : 'text-gray-500'}`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
