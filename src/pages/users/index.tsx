import React from 'react';

import { Card, Divider, Header } from '@/components';
import { users } from '@/data';
import { useWindowSize } from '@/hooks';

import { UsersFilters, UsersTable } from './components';
import { UsersCard } from './components/users-card';

const Users: React.FC = () => {
  const [, , isMobile] = useWindowSize();

  return (
    <div className="flex flex-col">
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <UsersFilters />

        {!isMobile ? <UsersTable users={users} /> : <UsersCard users={users} />}
      </Card>
    </div>
  );
};

export default Users;
