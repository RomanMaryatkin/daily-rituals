
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  const handleClearData = () => {
    localStorage.clear();
    toast({
      title: "Data cleared",
      description: "All habits and settings have been reset.",
    });
    // Reload the page to reflect changes
    window.location.reload();
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: "Feature coming soon",
      description: "Dark mode will be available in a future update.",
    });
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: "Feature coming soon",
      description: "Notifications will be available in a future update.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm divide-y">
        <div className="p-4 flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-sm text-gray-500">Toggle dark theme</p>
          </div>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={handleDarkModeToggle}
          />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div>
            <Label htmlFor="notifications">Notifications</Label>
            <p className="text-sm text-gray-500">Remind you of your habits</p>
          </div>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationsToggle}
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-2">Danger Zone</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your
                  habits and reset your app to its initial state.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearData}>
                  Yes, clear all data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">Daily Rituals</p>
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
