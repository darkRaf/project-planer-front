import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

export type User = {
  auth: boolean;
  name: string;
  error: string;
};

export interface UserContextEntity {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const defaultUser = {
  auth: false,
  name: '',
  error: '',
  onLogin: (email: string, password: string) => {},
  onLogout: () => {},
};

export const UserContext = createContext(defaultUser);
