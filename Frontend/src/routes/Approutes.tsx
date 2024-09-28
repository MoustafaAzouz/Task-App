import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need for BrowserRouter here
import LoginForm from '../pages/LoginPage';
import RegisterForm from '../pages/SignUp';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import TaskPage from '../pages/TaskPage';
import TaskDetailsPage from '../pages/TaskDetailsPage';
import LinkedInProfilePage from '../pages/LinkedInProfilePage';

const AppRoutes: React.FC = () => {
  useProtectedRoute();
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<RegisterForm />} />
      <Route path="/" element={<TaskPage />} />
      <Route path="/TaskDetail/:id" element={<TaskDetailsPage />} />
      <Route path="/linkedin-profile" element={<LinkedInProfilePage />} /> 

    </Routes>
  );
};

export default AppRoutes;
