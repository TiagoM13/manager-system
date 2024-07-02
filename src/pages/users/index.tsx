import React from 'react';

import { Card, Divider, Header } from '@/components';
import { useWindowSize } from '@/hooks';
import { useAllUsers } from '@/hooks/users';

import { UsersFilters, UsersTable } from './components';
import { UsersCard } from './components/users-card';

const Users: React.FC = () => {
  const [, , isMobile] = useWindowSize();
  const { loadding, getAllUsers, users: data } = useAllUsers();

  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="flex flex-col">
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <UsersFilters />

        {!isMobile ? <UsersTable users={data} /> : <UsersCard users={data} />}
      </Card>
    </div>
  );
};

export default Users;
