
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: string;
    hash: string;
  };
  colorScheme: 'light' | 'dark';
  viewportHeight: number;
  viewportStableHeight: number;
  isExpanded: boolean;
  expand: () => void;
  close: () => void;
  ready: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  isVersionAtLeast: (version: string) => boolean;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

class TelegramService {
  private tg: TelegramWebApp | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram) {
      this.tg = window.Telegram.WebApp;
    }
  }

  isAvailable(): boolean {
    return !!this.tg;
  }

  initApp() {
    if (this.tg) {
      // Let Telegram know the WebApp is ready
      this.tg.ready();
      
      // Set the webapp to expanded mode
      if (!this.tg.isExpanded) {
        this.tg.expand();
      }
      
      // Adapt to Telegram color theme
      const isDarkMode = this.tg.colorScheme === 'dark';
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }

  setupMainButton(text: string, callback: () => void) {
    if (this.tg && this.tg.MainButton) {
      this.tg.MainButton.setText(text);
      this.tg.MainButton.show();
      this.tg.MainButton.onClick(callback);
    }
  }

  hideMainButton() {
    if (this.tg && this.tg.MainButton) {
      this.tg.MainButton.hide();
    }
  }

  showMainButton() {
    if (this.tg && this.tg.MainButton) {
      this.tg.MainButton.show();
    }
  }

  setupBackButton(callback: () => void) {
    if (this.tg && this.tg.BackButton) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(callback);
    }
  }

  hideBackButton() {
    if (this.tg && this.tg.BackButton) {
      this.tg.BackButton.hide();
    }
  }

  getUserInfo() {
    if (this.tg && this.tg.initDataUnsafe && this.tg.initDataUnsafe.user) {
      return this.tg.initDataUnsafe.user;
    }
    return null;
  }

  hapticFeedback(type: 'success' | 'error' | 'warning') {
    if (this.tg && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.notificationOccurred(type);
    }
  }

  close() {
    if (this.tg) {
      this.tg.close();
    }
  }
}

export const telegramService = new TelegramService();
