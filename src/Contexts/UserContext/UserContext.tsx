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

export const defaultUser = {
  auth: false,
  name: '',
  lastName: '',
  email: '',
  settings: { avatarImg: '', activeIdProject: '', thema: '' },
  onLogin: (email: string, password: string) => {},
  onRegister: (user: UserRegister) => {},
  onLogout: () => {},
  updateUserSettings: (settings: UserSettingsEntity) => {},
  setMessage: (severity: AlertColor, message: Error | string | unknown) => {},
  message: { severity: ('info') as AlertColor, message: '' },
};

export const UserContext = createContext(defaultUser);
