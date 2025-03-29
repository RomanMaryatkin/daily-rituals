
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getTodayFormatted = (): string => {
  return formatDate(new Date());
};

export const getStreakCount = (completionHistory: Record<string, boolean>, today = getTodayFormatted()): number => {
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateKey = formatDate(currentDate);
    if (completionHistory[dateKey]) {
      streak += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export const getCompletionRate = (completionHistory: Record<string, boolean>): number => {
  const totalDays = Object.keys(completionHistory).length;
  if (totalDays === 0) return 0;
  
  const completedDays = Object.values(completionHistory).filter(completed => completed).length;
  return (completedDays / totalDays) * 100;
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthName = (month: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
};
