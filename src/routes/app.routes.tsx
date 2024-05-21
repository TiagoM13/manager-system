import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { InitializerLoader } from '@/components/initializer-loader';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Patients = React.lazy(() => import('@/pages/patients'));
const Profile = React.lazy(() => import('@/pages/profile'));
const Users = React.lazy(() => import('@/pages/users'));

export const routes: React.FC = () => {
  return (
    <React.Suspense fallback={<InitializerLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </React.Suspense>
  );
};
