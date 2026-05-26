import { create } from 'zustand';
import api from '../lib/axios';

// Safely parse local storage
const getUserInfoFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error parsing userInfo from localStorage', error);
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getUserInfoFromStorage(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      set({ user: data, isLoading: false });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      set({ user: data, isLoading: false });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Registration failed',
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
