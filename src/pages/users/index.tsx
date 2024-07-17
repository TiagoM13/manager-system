import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Card, Divider, Header } from '@/components';
import { useAllUsers, useQuery, useWindowSize } from '@/hooks';
import { IUser, IUsersFilters } from '@/interfaces';

import { UsersFilters, UsersTable, UsersCard } from './components';
import { filterSchema } from './schemas';

const Users: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const [, , isMobile] = useWindowSize();
  const [query] = useQuery<IUsersFilters>();
  const { loading, getAllUsers: refreshAllUsers, list } = useAllUsers();

  // Hook Form
  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    resolver: filterSchema,
    shouldUnregister: false,
  });

  // Callbacks
  const handleNewRegister = React.useCallback(() => {
    navigate('/users/new');
  }, [navigate]);

  // delete
  const handleDeleteUser = React.useCallback(async (id: number) => {
    // TODO
    console.log(id);
  }, []);

  // edit
  const handleEditUser = React.useCallback(
    async (user: IUser) => {
      navigate(`/users/${user.id}`);
    },
    [navigate],
  );

  // Effects
  React.useEffect(() => {
    refreshAllUsers(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Usuários"
          labelAction="cadastrar usuário"
          newRegister={handleNewRegister}
        />

        <Divider />

        <Card>
          <UsersFilters loading={loading} />

          {!isMobile ? (
            <UsersTable
              users={list}
              loading={loading}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ) : (
            <UsersCard users={list} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Users;
