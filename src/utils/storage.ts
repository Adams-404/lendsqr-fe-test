// ===========================================
// LOCALSTORAGE UTILITY
// ===========================================

import { User } from '../types';

const STORAGE_KEYS = {
  SELECTED_USER: 'lendsqr_selected_user',
  AUTH_STATE: 'lendsqr_auth_state',
} as const;

export const storage = {
  // User storage
  saveUser: (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  },

  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.SELECTED_USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  },

  removeUser: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_USER);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  },

  // Auth state
  setAuthState: (isAuthenticated: boolean): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(isAuthenticated));
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  },

  getAuthState: (): boolean => {
    try {
      const authState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
      return authState ? JSON.parse(authState) : false;
    } catch (error) {
      console.error('Error reading auth state:', error);
      return false;
    }
  },

  clearAuthState: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  },
};
