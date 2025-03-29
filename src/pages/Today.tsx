
import React from 'react';
import HabitItem from '../components/HabitItem';
import { useHabits } from '../hooks/useHabits';
import { getTodayFormatted } from '../utils/dateUtils';

const Today: React.FC = () => {
  const { getTodayHabits, updateHabitCompletion } = useHabits();
  const todayHabits = getTodayHabits();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Today</h1>
        <p className="text-gray-600">{formattedDate}</p>
      </div>

      {todayHabits.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No habits to track yet.</p>
          <p className="text-gray-500 mt-2">
            Add your first habit in the Habits tab.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          {todayHabits.map(habit => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={updateHabitCompletion}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Today;
