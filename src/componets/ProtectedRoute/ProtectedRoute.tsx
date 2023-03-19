import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext/UserContext';

type ProtectedRouteProps = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { auth } = useContext(UserContext);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
