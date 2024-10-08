import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Card, Header } from '@/components';
import { useWindowSize } from '@/hooks';

import { UsersFilters, UsersTable, UsersCard } from '../components';
import { useUserList } from '../hooks/user-list';

const Users: React.FC = () => {
  const [, , isMobile] = useWindowSize();
  const {
    methods,
    data,
    handleDelete,
    handleEdit,
    handleNewRegister,
    loading,
  } = useUserList();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Usuários"
          actionLabel="adicionar usuário"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <UsersFilters />

          {!isMobile ? (
            <UsersTable
              data={data}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <UsersCard
              data={data}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Users;
