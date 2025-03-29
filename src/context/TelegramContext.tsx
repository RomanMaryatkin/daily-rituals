
import React, { createContext, useContext, ReactNode } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface TelegramContextType {
  isAvailable: boolean;
  showMainButton: (text: string, callback: () => void) => void;
  hideMainButton: () => void;
  hapticFeedback: (type: 'success' | 'error' | 'warning') => void;
  getUserInfo: () => {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  } | null;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const telegramUtils = useTelegram();
  
  return (
    <TelegramContext.Provider value={telegramUtils}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegramContext must be used within a TelegramProvider');
  }
  return context;
};
