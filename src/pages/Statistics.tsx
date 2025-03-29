
import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import Calendar from '../components/Calendar';
import { getCompletionRate } from '../utils/dateUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Statistics: React.FC = () => {
  const { habits } = useHabits();
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(
    habits.length > 0 ? habits[0].id : null
  );
  
  const selectedHabit = habits.find(habit => habit.id === selectedHabitId);
  
  if (habits.length === 0) {
    return (
      <div className="container mx-auto px-4 pb-20">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Statistics</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Add habits to see statistics.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Statistics</h1>
      </div>
      
      <div className="mb-6">
        <Select
          value={selectedHabitId || ''}
          onValueChange={(value) => setSelectedHabitId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a habit" />
          </SelectTrigger>
          <SelectContent>
            {habits.map(habit => (
              <SelectItem key={habit.id} value={habit.id}>
                {habit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedHabit && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{selectedHabit.currentStreak} days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {getCompletionRate(selectedHabit.completionHistory).toFixed(0)}%
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium p-4 border-b">Habit Calendar</h3>
            <div className="p-4">
              <Calendar habit={selectedHabit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
