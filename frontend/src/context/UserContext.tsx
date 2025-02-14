// src/context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { userApi } from '@/api/user';

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Define the context type without isAuthenticated
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchCurrentUser: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Method to fetch current user
  const fetchCurrentUser = async () => {
    try {
      const currentUser = await userApi.getCurrentUser();
      setUser({
        id: currentUser.user_id,
        name: currentUser.username,
        email: currentUser.email,
        avatar: currentUser.avatar_url
      });
    } catch (error) {
      // If fetching fails (e.g., no token), set user to null
      setUser(null);
      console.error('Failed to fetch current user', error);
    }
  };

  // Attempt to fetch user on initial load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};