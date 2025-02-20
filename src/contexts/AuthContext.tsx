import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Admin>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        
        if (response.data.success) {
          setAdmin(response.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setAdmin(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.data.success) {
        setAdmin(response.data.data);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiClient.post('/auth/logout', {});
      setAdmin(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<Admin>) => {
    try {
      const response = await apiClient.put('/auth/updatedetails', data);

      if (response.data.success) {
        setAdmin(prev => prev ? { ...prev, ...response.data.data } : null);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
