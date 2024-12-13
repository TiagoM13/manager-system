import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header } from '@/components';
import { Card } from '@/components/_ui';

import { UsersFilters, UsersTable, UsersCard } from './components';
import { useUserListModel } from './user-list.model';

type UserListViewProps = ReturnType<typeof useUserListModel> & {};

export const UserListView: React.FC<UserListViewProps> = (props) => {
  const {
    methods,
    handleNewRegister,
    handleDelete,
    handleEdit,
    loading,
    data,
    isMobile,
  } = props;

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
