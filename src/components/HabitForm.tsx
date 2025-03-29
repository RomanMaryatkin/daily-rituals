
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface HabitFormProps {
  onSubmit: (name: string, description?: string) => void;
  initialName?: string;
  initialDescription?: string;
  buttonText?: string;
}

const HabitForm: React.FC<HabitFormProps> = ({
  onSubmit,
  initialName = '',
  initialDescription = '',
  buttonText = 'Add Habit'
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    
    onSubmit(name, description || undefined);
    
    if (!initialName) {
      setName('');
      setDescription('');
    }
    
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div>
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
          rows={3}
        />
      </div>
      
      <Button type="submit" className="w-full">
        {buttonText}
      </Button>
    </form>
  );
};

export default HabitForm;
