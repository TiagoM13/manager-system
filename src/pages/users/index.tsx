import React from 'react';

import { Card, Divider, Header } from '@/components';
import { users } from '@/data';
import { useWindowSize } from '@/hooks';

import { UsersFilters, UsersTable } from './components';

const Users: React.FC = () => {
  const [, , isMobile] = useWindowSize();

  return (
    <>
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <UsersFilters />

        {!isMobile ? <UsersTable users={users} /> : null}
      </Card>
    </>
  );
};

export default Users;
