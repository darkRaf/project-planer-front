import { ReactNode } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchApi } from '../../utils/featchAPI';
import { LoginResponse, RegisterResponse } from 'types';
import { User, defaultUser, UserContext, UserRegister } from './UserContext';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isRefresh, setIsRefresh] = useState(true);

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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd.';

      setUser((prev) => ({
        ...prev,
        error: message,
      }));
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd.';

      setUser((prev) => ({
        ...prev,
        error: message,
      }));
    } finally {
      document.body.style.cursor = 'default';
      <Navigate to="/login" replace />;
    }
  };

  const logoutHandler = async () => {
    try {
      await fetchApi.delete('/logout');

      setUser({
        auth: false,
        name: '',
        lastName: '',
        email: '',
        settings: { avatarImg: '', activeIdProject: '', thema: '' },
        error: '',
      });

      return <Navigate to="/login" replace />;
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    ...user,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onRegister: registerHandler,
  };

  if (isRefresh) {
    refreshToken();
    setIsRefresh(false);
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
