
import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { formatDate, getDaysInMonth, getMonthName } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  habit: Habit;
}

const Calendar: React.FC<CalendarProps> = ({ habit }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Render day names
    days.push(
      <div key="day-names" className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
    );
    
    // Create calendar grid
    let calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="h-8 w-8" />
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = formatDate(date);
      const isCompleted = habit.completionHistory[dateString];
      
      calendarDays.push(
        <div 
          key={day} 
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isCompleted ? 'bg-black text-white' : 'bg-gray-100'}`}
        >
          {day}
        </div>
      );
    }
    
    days.push(
      <div key="calendar-grid" className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    );
    
    return days;
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="font-medium">
          {getMonthName(currentMonth)} {currentYear}
        </h3>
        
        <button 
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {renderCalendarDays()}
    </div>
  );
};

export default Calendar;
