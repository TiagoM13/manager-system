import React from 'react';

import { Card, Divider, Header, InputSearch, Table as T } from '@/components';

import { UsersTable } from './components';

export const Users: React.FC = () => {
  return (
    <>
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <InputSearch />

        <UsersTable />
      </Card>
    </>
  );
};
