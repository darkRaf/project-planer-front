import { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchApi } from '../../utils/featchAPI';
import { LoginResponse, RegisterResponse, UserSettingsEntity } from 'types';
import { User, defaultUser, UserContext, UserRegister } from './UserContext';

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

  const setErrorHandle = (err: Error | unknown) => {
    console.log(err);
    const message = err instanceof Error ? err.message : err as string;

    setUser((prev) => ({
      ...prev,
      error: message,
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
      setErrorHandle(err);
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
      setErrorHandle(err);
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
      setErrorHandle(err);
    }
  };

  const value = {
    ...user,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onRegister: registerHandler,
    setErrorHandle,
    updateUserSettings,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
