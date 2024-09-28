import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !isAuthenticated) {
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/login');
      }
    }
  }, [isAuthenticated, navigate, location]);
};
