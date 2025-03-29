
import React from 'react';
import { Check } from 'lucide-react';
import { Habit } from '../types/Habit';
import { getTodayFormatted } from '../utils/dateUtils';
import { useTelegramContext } from '../context/TelegramContext';

interface HabitItemProps {
  habit: Habit & { completed?: boolean };
  onToggle: (update: { habitId: string; date: string; completed: boolean }) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggle }) => {
  const today = getTodayFormatted();
  const isCompleted = habit.completionHistory[today] || false;
  const { hapticFeedback, isAvailable } = useTelegramContext();
  
  const handleToggle = () => {
    onToggle({
      habitId: habit.id,
      date: today,
      completed: !isCompleted
    });
    
    // Add haptic feedback for Telegram users
    if (isAvailable) {
      hapticFeedback(!isCompleted ? 'success' : 'warning');
    }
  };
  
  return (
    <div 
      className="p-4 border-b flex items-center justify-between cursor-pointer"
      onClick={handleToggle}
    >
      <div>
        <h3 className="font-medium">{habit.name}</h3>
        {habit.description && (
          <p className="text-sm text-gray-500">{habit.description}</p>
        )}
        <div className="text-xs text-gray-400 mt-1">
          Streak: {habit.currentStreak} days
        </div>
      </div>
      <div
        className={`h-6 w-6 rounded-full border flex items-center justify-center ${
          isCompleted 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300'
        }`}
      >
        {isCompleted && <Check size={16} />}
      </div>
    </div>
  );
};

export default HabitItem;
