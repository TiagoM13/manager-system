import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { getAllUsersService, deleteUserService } from '@/shared/api';

import { useUserListModel } from './user-list.model';
import { UserListView } from './user-list.view';

const Users: React.FC = () => {
  const httpClient = new HttpClient();

  const methods = useUserListModel({
    getAllUsers: (filters) => getAllUsersService(httpClient, filters),
    deleteUser: (id) => deleteUserService(httpClient, id),
  });

  return <UserListView {...methods} />;
};

export default Users;
