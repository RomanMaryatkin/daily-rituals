
export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  completionHistory: Record<string, boolean>;
  currentStreak: number;
}

export interface HabitCompletionUpdate {
  habitId: string;
  date: string;
  completed: boolean;
}
