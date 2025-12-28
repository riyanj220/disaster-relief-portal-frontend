import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor to add the Firebase Token automatically
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // Get fresh JWT
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;