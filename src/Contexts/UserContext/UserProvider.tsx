import { ReactNode } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchApi } from '../../utils/featchAPI';
import { LoginResponse } from 'types';
import { User, defaultUser, UserContext } from './UserContext';

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
      const result = (await fetchApi.post('/login', { email, password })) as unknown as LoginResponse;

      if (result) {
        fetchApi.setToken(result.accessToken);
        setUser((prev) => ({
          ...prev,
          auth: true,
          name: result.name,
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd.';

      setUser((prev) => ({
        ...prev,
        error: message,
      }));
    }finally{
      document.body.style.cursor = 'default';
    }

    return <Navigate to="/" replace />;
  };

  const logoutHandler = () => {
    setUser({ auth: false, name: '', error: '' });

    return <Navigate to="/login" replace />;
  };

  const value = {
    auth: user.auth,
    name: user.name,
    error: user.error,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  if (isRefresh) {
    refreshToken()
    setIsRefresh(false);  
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
