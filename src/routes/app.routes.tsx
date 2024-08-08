import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppWrapper, InitializerLoader } from '@/components';
import { useIsAuthenticated } from '@/hooks';
import { ForgoitPassowrdPage, SignInPage } from '@/pages/auth';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Patients = React.lazy(() => import('@/pages/patients'));
const Profile = React.lazy(() => import('@/pages/profile'));
const Users = React.lazy(() => import('@/pages/users'));
const User = React.lazy(() => import('@/pages/user'));

export const HOME = '/';
export const DASHBOARD = '/dashboard';
export const SIGNIN = '/sign-in';
export const RECOVERPASSWORD = '/forgot-password';

export const Router: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && [HOME, DASHBOARD].includes(location.pathname)) {
      navigate(SIGNIN);
    } else if (
      isAuthenticated &&
      [SIGNIN, HOME, RECOVERPASSWORD].includes(location.pathname)
    ) {
      navigate(DASHBOARD);
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <AppWrapper>
      <React.Suspense fallback={<InitializerLoader />}>
        <Routes>
          <Route path="/sign-in" element={!isAuthenticated && <SignInPage />} />
          <Route
            path="/forgot-password"
            element={!isAuthenticated && <ForgoitPassowrdPage />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </React.Suspense>
    </AppWrapper>
  );
};
