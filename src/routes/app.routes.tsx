import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppWrapper, InitializerLoader } from '@/components';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Patients = React.lazy(() => import('@/pages/patients'));
const Profile = React.lazy(() => import('@/pages/profile'));
const Users = React.lazy(() => import('@/pages/users'));
const User = React.lazy(() => import('@/pages/user'));

export const Router: React.FC = () => {
  return (
    <AppWrapper>
      <React.Suspense fallback={<InitializerLoader />}>
        <Routes>
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
