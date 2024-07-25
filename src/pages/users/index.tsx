import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, Divider, Header } from '@/components';
import { useQuery, useWindowSize } from '@/hooks';
import { useDebounce } from '@/hooks/debounce';
import { IUser, IUsersFilters } from '@/interfaces';
import { deleteUserService, getAllUsersService } from '@/services';
import { useDialog } from '@/store';
import { toastError, toastSuccess } from '@/utils';
import {
  useMutation,
  useQueryClient,
  useQuery as useQueryAllUsers,
} from '@tanstack/react-query';

import { UsersFilters, UsersTable, UsersCard } from './components';
import { filterSchema } from './schemas';

const Users: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [, , isMobile] = useWindowSize();
  const [query] = useQuery<IUsersFilters>();
  const { confirmDialog } = useDialog();

  // query users data
  const debouncedQuery = useDebounce(query.name || '', 500);
  const queryClient = useQueryClient();
  const {
    data: users,
    isLoading,
    isFetching,
  } = useQueryAllUsers({
    queryKey: ['users', debouncedQuery],
    queryFn: () => getAllUsersService({ name: debouncedQuery }),
    enabled: !!debouncedQuery || !query.name, // Run query if debouncedQuery is not empty or query.name is empty
  });
  const { mutateAsync: deleteUserFn } = useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      toastSuccess('Usuário deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toastError('Erro ao deletar o usuário');
    },
  });

  // Hook Form
  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    resolver: filterSchema,
    shouldUnregister: false,
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

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
        accept: async () => await deleteUserFn(id),
      });
    },
    [confirmDialog, deleteUserFn],
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
              users={users}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <UsersCard
              users={users || []}
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
