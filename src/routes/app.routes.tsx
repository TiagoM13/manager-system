import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Dashboard, Patients, Profile, Users } from '@/pages';

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

