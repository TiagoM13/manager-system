import React from 'react';

import { Card, Divider, Header, InputSearch, Select } from '@/components';
import { users } from '@/data';

import { UsersTable } from './components';

export const Users: React.FC = () => {
  const selectOptions = [
    { id: 1, label: 'Status' },
    { id: 2, label: 'Tipo de usuário' },
    { id: 3, label: 'Data de registro' },
    { id: 4, label: 'Último acesso' },
  ];

  return (
    <>
      <Header title="Usuários" labelAction="cadastrar usuário" />
      <Divider />

      <Card>
        <div className="flex gap-2.5">
          <InputSearch placeholder="Pesquisar usuário" />
          <Select placeholder="Selecone um filtro" options={selectOptions} />
        </div>

        <div></div>

        <UsersTable users={users} />
      </Card>
    </>
  );
};
