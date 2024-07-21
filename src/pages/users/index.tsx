import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Divider, Header } from '@/components';
import { useAllUsers, useDialog, useQuery, useWindowSize } from '@/hooks';
import { IUser, IUsersFilters } from '@/interfaces';
import { deleteUser } from '@/store/modules/users/actions';
import { toastSuccess } from '@/utils/toasts';

import { UsersFilters, UsersTable, UsersCard } from './components';
import { filterSchema } from './schemas';

const Users: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [, , isMobile] = useWindowSize();
  const [query] = useQuery<IUsersFilters>();
  const { confirmDialog } = useDialog();
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
    navigate('/users/new', {
      state: { from: location },
    });
  }, [location, navigate]);

  // delete
  const handleDelete = React.useCallback(
    (id: number) => {
      confirmDialog({
        header: 'Você esta prestes a excluir!',
        message: 'Tem certeza de que deseja excluir este usuário?',
        acceptLabel: 'confirmar',
        rejectLabel: 'cancelar',
        accept: async () => {
          const deletedUser = await deleteUser(id);

          if (deletedUser) {
            toastSuccess('Usuário deletado com sucesso!');
          }
        },
      });
    },
    [confirmDialog],
  );

  // edit
  const handleEdit = React.useCallback(
    async (user: IUser) => {
      navigate(`/users/${user.id}`, {
        state: { from: location },
      });
    },
    [location, navigate],
  );

  // Effects
  React.useEffect(() => {
    refreshAllUsers(query);
  }, [query, refreshAllUsers]);

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
          <UsersFilters />

          {!isMobile ? (
            <UsersTable
              users={list}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <UsersCard
              users={list}
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
