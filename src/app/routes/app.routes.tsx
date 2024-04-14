import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/app/pages/dashboard';
import { Profile } from '@/app/pages/profile';
import { Patients } from '@/app/pages/patients';
import { Users } from '../pages/users';

export const routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/patients" element={<Patients />} />
    </Routes>
  )
}

