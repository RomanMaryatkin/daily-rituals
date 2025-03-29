
import { useEffect, useState } from 'react';
import { telegramService } from '../services/telegramService';
import { useNavigate, useLocation } from 'react-router-dom';

export const useTelegram = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const available = telegramService.isAvailable();
    setIsAvailable(available);
    
    if (available) {
      telegramService.initApp();
    }
  }, []);

  useEffect(() => {
    if (!isAvailable) return;
    
    // Handle back button based on current route
    if (location.pathname !== '/') {
      telegramService.setupBackButton(() => {
        navigate(-1);
      });
    } else {
      telegramService.hideBackButton();
    }
    
    return () => {
      // Clean up any event listeners when component unmounts
      if (isAvailable) {
        telegramService.hideBackButton();
      }
    };
  }, [isAvailable, location.pathname, navigate]);

  const showMainButton = (text: string, callback: () => void) => {
    if (isAvailable) {
      telegramService.setupMainButton(text, callback);
    }
  };

  const hideMainButton = () => {
    if (isAvailable) {
      telegramService.hideMainButton();
    }
  };

  const hapticFeedback = (type: 'success' | 'error' | 'warning') => {
    if (isAvailable) {
      telegramService.hapticFeedback(type);
    }
  };

  const getUserInfo = () => {
    if (isAvailable) {
      return telegramService.getUserInfo();
    }
    return null;
  };

  return {
    isAvailable,
    showMainButton,
    hideMainButton,
    hapticFeedback,
    getUserInfo
  };
};
