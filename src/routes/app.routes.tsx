import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AppWrapper, InitializerLoader } from '@/components';
import { UserTypes } from '@/enums';
import { useIsAuthenticated } from '@/hooks';
import { ForgotPasswordPage, SignInPage } from '@/pages/auth';

import { PrivateRoute } from './private.route';
import { PublicRoute } from './public.route';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Patients = React.lazy(() => import('@/pages/patients'));
const Users = React.lazy(() => import('@/pages/users'));
const User = React.lazy(() => import('@/pages/user'));

export const Router: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      if (
        ['/sign-in', '/forgot-password', '/'].includes(window.location.pathname)
      ) {
        navigate('/dashboard', { replace: true });
      }
    }
    if (!isAuthenticated) {
      if (['/'].includes(window.location.pathname)) {
        navigate('/sign-in', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <AppWrapper>
      <React.Suspense fallback={<InitializerLoader />}>
        <Routes>
          {/* public routes */}
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />

          {/* private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                allowedRoles={[
                  UserTypes.ADMIN,
                  UserTypes.CLINICAL,
                  UserTypes.EDITOR,
                  UserTypes.NO_TYPE,
                ]}
              >
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute allowedRoles={[UserTypes.ADMIN]}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute allowedRoles={[UserTypes.ADMIN]}>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute
                allowedRoles={[
                  UserTypes.ADMIN,
                  UserTypes.EDITOR,
                  UserTypes.CLINICAL,
                ]}
              >
                <Patients />
              </PrivateRoute>
            }
          />
        </Routes>
      </React.Suspense>
    </AppWrapper>
  );
};
