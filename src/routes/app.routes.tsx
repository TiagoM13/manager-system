import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AppWrapper, InitializerLoader } from '@/components';
import { Role } from '@/enums';
import { useIsAuthenticated } from '@/hooks';
import { ForgotPasswordPage, SignInPage } from '@/pages/auth/page';

import { PrivateRoute } from './private.route';
import { PublicRoute } from './public.route';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Users = React.lazy(() => import('@/pages/users/user-list/page'));
const User = React.lazy(() => import('@/pages/users/user-form/page'));
const Patients = React.lazy(() => import('@/pages/patients/patient-list/page'));
const PatientForm = React.lazy(
  () => import('@/pages/patients/patient-form/page'),
);
const PatientDetails = React.lazy(
  () => import('@/pages/patients/patient-details/page'),
);
const Appointments = React.lazy(
  () => import('@/pages/appointments/appointments-list/page'),
);
const AppointmentForm = React.lazy(
  () => import('@/pages/appointments/appointment-form/page'),
);
const AppointmentDetails = React.lazy(
  () => import('@/pages/appointments/appointment-details/page'),
);
const AppointmentByPatient = React.lazy(
  () => import('@/pages/appointments/appointments-by-patient/page'),
);

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
    } else {
      if (
        !['/sign-in', '/forgot-password'].includes(window.location.pathname)
      ) {
        navigate('/sign-in', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <AppWrapper>
      <React.Suspense fallback={<InitializerLoader />}>
        <Routes>
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

          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute allowedRoles={[Role.ADMIN]}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute allowedRoles={[Role.ADMIN]}>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <Patients />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients/new"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <PatientForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients/:patientId"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <PatientDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/:patientId"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <AppointmentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/:patientId/appointment/:appointmentId"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <AppointmentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/:patientId/list"
            element={
              <PrivateRoute
                allowedRoles={[Role.ADMIN, Role.EDITOR, Role.CLINICAL]}
              >
                <AppointmentByPatient />
              </PrivateRoute>
            }
          />
        </Routes>
      </React.Suspense>
    </AppWrapper>
  );
};
