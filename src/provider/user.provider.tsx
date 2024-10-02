import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRootStore } from './use-root-store';
import { UserResponse } from '../shared/api/generated-api/api.schemas';

interface UserContextProps {
  user: UserResponse;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export const UserProvider: React.FC<React.PropsWithChildren<NonNullable<unknown>>> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authStore } = useRootStore();

  const fetchUserInfo = async () => {
    setIsLoading(true);

    try {
      await authStore.fetchUserInfo();

      setUser(authStore.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      authStore.setToken(token);
    }

    console.log(token);
    fetchUserInfo().then(() => {
      setIsLoading(false);
    });
  }, []);

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>;
};
