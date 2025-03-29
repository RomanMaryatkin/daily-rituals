
import React from 'react';
import { Habit, HabitCompletionUpdate } from '../types/Habit';
import { Checkbox } from '@/components/ui/checkbox';
import { getTodayFormatted } from '../utils/dateUtils';

interface HabitItemProps {
  habit: Habit;
  onToggle: (update: HabitCompletionUpdate) => void;
  showDate?: boolean;
}

const HabitItem: React.FC<HabitItemProps> = ({ 
  habit, 
  onToggle, 
  showDate = false 
}) => {
  const today = getTodayFormatted();
  const isCompleted = habit.completionHistory[today] || false;

  const handleToggle = (checked: boolean) => {
    onToggle({
      habitId: habit.id,
      date: today,
      completed: checked
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <Checkbox 
          id={`habit-${habit.id}`}
          checked={isCompleted}
          onCheckedChange={handleToggle}
        />
        <div>
          <label 
            htmlFor={`habit-${habit.id}`}
            className={`text-lg font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}
          >
            {habit.name}
          </label>
          {habit.description && (
            <p className="text-sm text-gray-500">{habit.description}</p>
          )}
        </div>
      </div>
      <div className="text-sm">
        <span className="bg-gray-100 px-2 py-1 rounded text-gray-800">
          🔥 {habit.currentStreak}
        </span>
      </div>
    </div>
  );
};

export default HabitItem;
