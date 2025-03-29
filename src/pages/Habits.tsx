
import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import HabitForm from '../components/HabitForm';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Habit } from '../types/Habit';

const Habits: React.FC = () => {
  const { habits, addHabit, deleteHabit, updateHabit } = useHabits();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleAddHabit = (name: string, description?: string) => {
    addHabit(name, description);
    setShowAddForm(false);
  };

  const handleUpdateHabit = (name: string, description?: string) => {
    if (editingHabit) {
      const updatedHabit = {
        ...editingHabit,
        name,
        description: description || ''
      };
      updateHabit(updatedHabit);
      setEditingHabit(null);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Habits</h1>
        <Button 
          variant={showAddForm ? "outline" : "default"} 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : <><Plus size={16} className="mr-1" /> Add Habit</>}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <HabitForm onSubmit={handleAddHabit} />
        </div>
      )}

      {editingHabit && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Edit Habit</h2>
          <HabitForm 
            initialName={editingHabit.name}
            initialDescription={editingHabit.description}
            buttonText="Update Habit"
            onSubmit={handleUpdateHabit}
          />
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={() => setEditingHabit(null)}
          >
            Cancel
          </Button>
        </div>
      )}

      {habits.length === 0 && !showAddForm ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No habits added yet.</p>
          <Button
            className="mt-4"
            onClick={() => setShowAddForm(true)}
          >
            Add Your First Habit
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          {habits.map(habit => (
            <div key={habit.id} className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-medium">{habit.name}</h3>
                {habit.description && (
                  <p className="text-sm text-gray-500">{habit.description}</p>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  Streak: {habit.currentStreak} days
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingHabit(habit)}
                >
                  <Edit size={18} />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete habit</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{habit.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteHabit(habit.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Habits;
