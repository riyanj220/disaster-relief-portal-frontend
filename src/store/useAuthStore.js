import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import api from '@/lib/api';

const useAuthStore = create((set) => ({
  user: null,          // Firebase Auth user object
  profile: null,       // Firestore user data (role, firstName, etc.)
  loading: true,       // To track if we are still checking the session
  error: null,

  // Initialize the store and listen for Auth changes
  initialize: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch the extra profile data (role) from your Spring Boot backend
          // Note: This matches your AuthController /me or profile logic
          const response = await api.get('/auth/me'); 
          //  /auth/me returns the User object from Firestore
          set({ user: firebaseUser, profile: response.data, loading: false });
        } catch (err) {
          set({ user: firebaseUser, profile: null, loading: false });
        }
      } else {
        set({ user: null, profile: null, loading: false });
      }
    });
  },

  // Manual Logout
  logout: async () => {
    await signOut(auth);
    set({ user: null, profile: null, loading: false });
  }
}));

export default useAuthStore;