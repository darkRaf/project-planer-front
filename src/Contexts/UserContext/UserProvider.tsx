import { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchApi } from '../../utils/featchAPI';
import { LoginResponse, RegisterResponse, UserSettingsEntity } from 'types';
import { User, defaultUser, UserContext, UserRegister } from './UserContext';
import { AlertColor } from '@mui/material';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    if (isRefresh) {
      refreshToken();
      setIsRefresh(false);
    }
  }, []);

  const setMessage = (severity: AlertColor, message: Error | string | unknown) => {
    let msg = '';

    if (message instanceof Error) msg = message.message;
    if (typeof message === 'string') msg = message as string;
    console.log(`Message: ${msg}`);

    setUser((prev) => ({
      ...prev,
      message: {
        severity,
        message: msg,
      },
    }));
  };

  const updateUserSettings = (settings: UserSettingsEntity) => {
    setUser((prev) => ({
      ...prev,
      settings,
    }));
  };

  const refreshToken = async () => {
    try {
      const refData = await fetchApi.refreshToken();
      const { accessToken, name } = refData;
      fetchApi.setToken(accessToken);

      setUser((prev) => ({
        ...prev,
        auth: accessToken ? true : false,
        name,
      }));

      const settings = await fetchApi.get<UserSettingsEntity>(`/user`);
      settings && updateUserSettings(settings);
    } catch (err) {
      console.error(err);
      // TODO:
    }
  };

  const loginHandler = async (email: string, password: string) => {
    try {
      document.body.style.cursor = 'wait';
      const result = (await fetchApi.post('/login', { email, password })) as LoginResponse;

      if (result) {
        const { accessToken, name, lastName, email, settings } = result;
        fetchApi.setToken(accessToken);

        setUser((prev) => ({
          ...prev,
          auth: true,
          name,
          lastName,
          email,
          settings,
        }));
      }
    } catch (err: Error | unknown) {
      setMessage('error', err);
    } finally {
      document.body.style.cursor = 'default';
      return <Navigate to="/" replace />;
    }
  };

  const registerHandler = async (newUser: UserRegister) => {
    try {
      document.body.style.cursor = 'wait';
      const result = (await fetchApi.post('/register', { ...newUser })) as RegisterResponse;

      if (result) {
        setUser((prev) => ({
          ...prev,
          email: result.emial,
        }));
      }
    } catch (err: Error | unknown) {
      setMessage('error', err);
    } finally {
      document.body.style.cursor = 'default';
      <Navigate to="/login" replace />;
    }
  };

  const logoutHandler = async () => {
    try {
      await fetchApi.delete('/logout');

      setUser(defaultUser);

      return <Navigate to="/login" replace />;
    } catch (err: Error | unknown) {
      setMessage('error', err);
    }
  };

  const value = {
    ...user,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onRegister: registerHandler,
    updateUserSettings,
    setMessage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
