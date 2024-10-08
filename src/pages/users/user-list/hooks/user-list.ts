import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useQuery, useAppNavigation } from '@/hooks';
import { IUsersFilters, IUser } from '@/interfaces';
import { getAllUsersService, deleteUserService } from '@/services';
import { useDialog } from '@/store';
import { toastSuccess, toastError } from '@/utils';
import { handleAPIErrors } from '@/utils/common';
import {
  useQuery as useQueryAllUsers,
  useQueryClient,
  keepPreviousData,
  useMutation,
} from '@tanstack/react-query';

import { filterSchema } from '../schemas';

export const useUserList = () => {
  // kooks
  const location = useLocation();
  const { navigateTo } = useAppNavigation();
  const [query, setQuery] = useQuery<IUsersFilters>();
  const { confirmDialog } = useDialog();

  const getAllUsers = React.useCallback(async () => {
    try {
      const users = await getAllUsersService(query);
      return users;
    } catch (error) {
      handleAPIErrors(error);
      return;
    }
  }, [query]);

  // queries
  const queryClient = useQueryClient();
  const { data, isLoading } = useQueryAllUsers({
    queryKey: ['users', query],
    queryFn: getAllUsers,
    placeholderData: keepPreviousData,
  });
  // mutations
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

  const loading = React.useMemo(() => isLoading, [isLoading]);

  // callbacks
  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/users/new', state: location.state });
  }, [location.state, navigateTo]);

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

  const handleEdit = React.useCallback(
    async (user: IUser) => {
      navigateTo({ route: `/users/${user.id}`, state: location.state });
    },
    [location.state, navigateTo],
  );

  // effects
  React.useEffect(() => {
    if (data?.users && data?.meta?.total_current_records === 0) {
      setQuery({ page: 1 });
    }
  }, [data?.meta?.total_current_records, data?.users, setQuery]);

  return {
    data,
    loading,
    handleNewRegister,
    handleDelete,
    handleEdit,
    methods,
  };
};
