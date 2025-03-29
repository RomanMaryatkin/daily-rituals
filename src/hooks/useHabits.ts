
import { useLocalStorage } from './useLocalStorage';
import { Habit, HabitCompletionUpdate } from '../types/Habit';
import { getTodayFormatted, getStreakCount } from '../utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);

  const addHabit = (name: string, description?: string) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
      completionHistory: {},
      currentStreak: 0
    };

    setHabits([...habits, newHabit]);
  };

  const updateHabitCompletion = ({ habitId, date, completed }: HabitCompletionUpdate) => {
    setHabits(
      habits.map(habit => {
        if (habit.id === habitId) {
          const updatedCompletionHistory = {
            ...habit.completionHistory,
            [date]: completed
          };
          
          return {
            ...habit,
            completionHistory: updatedCompletionHistory,
            currentStreak: getStreakCount(updatedCompletionHistory)
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const getHabitById = (habitId: string) => {
    return habits.find(habit => habit.id === habitId);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(
      habits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const getTodayHabits = () => {
    return habits.map(habit => ({
      ...habit,
      completed: habit.completionHistory[getTodayFormatted()] || false
    }));
  };

  return {
    habits,
    addHabit,
    updateHabitCompletion,
    deleteHabit,
    getHabitById,
    updateHabit,
    getTodayHabits
  };
};
