import { AlertColor } from '@mui/material/Alert/Alert';
import { createContext } from 'react';
import { UserSettingsEntity } from 'types';

type PPMessageObj = {
  severity: AlertColor;
  message: string;
};

export type User = {
  auth: boolean;
  name: string;
  lastName: string;
  email: string;
  settings: UserSettingsEntity;
  message: PPMessageObj;
};

export type UserRegister = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export interface UserContextEntity {
  auth: boolean;
  name: string;
  lastName: string;
  email: string;
  settings: { avatarImg: string; activeIdProject: string; thema: string };
  message: { severity: AlertColor; message: string };
  isRegister: boolean | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (newUser: UserRegister) => Promise<void>;
  onLogout: () => Promise<void>;
  updateUserSettings: (settings: UserSettingsEntity) => void;
  setMessage: (severity: AlertColor, message: Error | string | unknown) => void;
}

export const defaultUser: UserContextEntity = {
  auth: false,
  name: '',
  lastName: '',
  email: '',
  settings: { avatarImg: '', activeIdProject: '', thema: '' },
  message: { severity: 'info' as AlertColor, message: '' },
  isRegister: null,
  onLogin: async () => {},
  onRegister: async () => {},
  onLogout: async () => {},
  updateUserSettings: () => {},
  setMessage: () => {},
};

export const UserContext = createContext(defaultUser);
