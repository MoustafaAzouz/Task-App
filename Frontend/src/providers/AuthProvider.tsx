import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode; 
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
useAuth();



  return <Provider store={store}>{children}</Provider>;
};

export default AuthProvider;
