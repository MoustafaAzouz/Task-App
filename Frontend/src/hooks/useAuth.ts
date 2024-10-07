import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAuth = () => {
  const {  token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const storedToken = localStorage.getItem('token'); 
  

  return { 
    token: token || storedToken, 
    isAuthenticated: !!(isAuthenticated || storedToken) 
  };
};
