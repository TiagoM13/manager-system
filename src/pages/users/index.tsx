import React from 'react';

import { Card, Divider, Header } from '@/components';
import { users } from '@/data';

import { UsersFilters, UsersTable } from './components';

const Users: React.FC = () => {
  return (
    <>
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <UsersFilters />
        <UsersTable users={users} />
      </Card>
    </>
  );
};

export default Users;
