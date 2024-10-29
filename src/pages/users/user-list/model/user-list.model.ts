import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useQueryParams, useAppNavigation, useWindowSize } from '@/hooks';
import { IUsersFilters, IUser, IMSResponse } from '@/interfaces';
import { useDialog } from '@/store';
import { toastSuccess, toastError } from '@/utils';
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  useMutation,
} from '@tanstack/react-query';

import { USER_DELETE_ERROR, USER_DELETE_SUCCESS } from '../user-list.messges';
import { filterSchema } from '../user-list.schema';

type UserListModelResponse = IMSResponse<IUser[], 'users'> | undefined;

type UserListModelProps = {
  getAllUsers: (query: IUsersFilters) => Promise<UserListModelResponse>;
  deleteUser: (id: number) => Promise<IMSResponse<IUser, 'user'> | undefined>;
};

export const useUserListModel = ({
  getAllUsers,
  deleteUser,
}: UserListModelProps) => {
  // hooks
  const location = useLocation();
  const { navigateTo } = useAppNavigation();
  const [query, setQuery] = useQueryParams<IUsersFilters>();
  const { confirmDialog } = useDialog();
  const [, , isMobile] = useWindowSize();
  const queryClient = useQueryClient();

  // queries
  const { data, isLoading } = useQuery<UserListModelResponse>({
    queryKey: ['users', query],
    queryFn: async () => await getAllUsers(query),
    placeholderData: keepPreviousData,
  });
  // mutations
  const { mutateAsync: deleteUserFn, isPending } = useMutation({
    mutationFn: async (id: number) => deleteUser(id),
    onSuccess: () => {
      toastSuccess(USER_DELETE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toastError(USER_DELETE_ERROR),
  });

  // Hook Form
  const methods = useForm({
    defaultValues: query,
    mode: 'onChange',
    resolver: filterSchema,
    shouldUnregister: false,
  });

  const loading = React.useMemo(
    () => isLoading || isPending,
    [isLoading, isPending],
  );

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
    isMobile,
  };
};
