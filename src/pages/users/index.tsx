/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Card, Divider, Header } from '@/components';
import { useAllUsers, useQuery, useWindowSize } from '@/hooks';
import { IUsersFilters } from '@/interfaces';

import { UsersFilters, UsersTable, UsersCard } from './components';
import { filterSchema } from './schemas';

const Users: React.FC = () => {
  const [, , isMobile] = useWindowSize();
  const [query] = useQuery<IUsersFilters>();
  const { loading, getAllUsers, list } = useAllUsers();

  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    resolver: filterSchema,
    shouldUnregister: false,
  });

  React.useEffect(() => {
    getAllUsers(query);
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header title="Usuários" labelAction="cadastrar usuário" />
        <Divider />

        <Card>
          <UsersFilters loading={loading} />

          {!isMobile ? (
            <UsersTable users={list} loading={loading} />
          ) : (
            <UsersCard users={list} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Users;
