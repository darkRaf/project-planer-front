import { createContext, Dispatch, SetStateAction } from 'react';
import { UserSettingsEntity } from 'types';

export type User = {
  auth: boolean;
  name: string;
  lastName: string;
  email: string;
  settings: UserSettingsEntity;
  error: string;
};

export interface UserContextEntity {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export type UserRegister = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export const defaultUser = {
  auth: false,
  name: '',
  lastName: '',
  email: '',
  settings: { avatarImg: '', activeIdProject: '', thema: '' },
  error: '',
  onLogin: (email: string, password: string) => {},
  onRegister: (user: UserRegister) => {},
  onLogout: () => {},
  updateUserSettings: (settings: UserSettingsEntity) => {},
  setErrorHandle: (err: Error | unknown) => {},
};

export const UserContext = createContext(defaultUser);
