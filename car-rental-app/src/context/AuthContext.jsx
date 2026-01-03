import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('access_token');
      if (token) {
        try {
          const response = await apiClient.get('/api/auth/me/');
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // Token might be invalid or expired, apiClient interceptor handles refresh/logout
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials, rememberMe = false) => {
    try {
      const response = await apiClient.post('/api/auth/login/', credentials);
      const { access, refresh, user: userData } = response.data;
      
      // Security: Set cookie expiration based on Remember Me
      // If not remembered, cookies are session-based (expires on browser close)
      const options = rememberMe ? { expires: 30 } : {};
      
      Cookies.set('access_token', access, options);
      Cookies.set('refresh_token', refresh, options);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      // Security: Use a generic error message to avoid email enumeration
      let errorMessage = 'Invalid email or password. Please try again.';
      
      // If the backend specifically says the account is locked, we can show that
      if (error.response?.data?.detail === 'Account is locked') {
        errorMessage = 'This account has been locked due to too many failed attempts.';
      }

      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const register = async (userData) => {
    try {
      await apiClient.post('/api/auth/register/', userData);
      // After successful registration, usually we redirect to login or auto-login
      return { success: true };
    } catch (error) {
      // Extract detailed validation errors if available
      let errorMessage = 'Registration failed. Please check your details.';
      
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          // If it's an object (e.g., { email: ['...'], password: ['...'] }), format it
          errorMessage = Object.entries(data)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(' ') : messages}`)
            .join(' | ');
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      }

      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
