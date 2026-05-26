import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      /**
       * Set user and token state upon successful authentication
       * @param {Object} payload
       * @param {Object} payload.user
       * @param {string} payload.token
       */
      login: ({ user, token }) => set({ user, token }),

      /**
       * Clear user and token state upon logout
       */
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'travel-booking-auth',
    }
  )
);

export default useAuthStore;
