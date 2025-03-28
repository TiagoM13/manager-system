import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import {
  useAppNavigation,
  useQueryParams,
  useWindowSize,
} from '@/shared/hooks';
import { IMSResponse, IUser, IUsersFilters } from '@/shared/interfaces';
import { useDeleteUser } from '@/shared/services/mutations';
import { useGetAllUsers } from '@/shared/services/queries';
import { useDialog } from '@/store';

import { filterSchema } from './user-list.schema';

type UserListModelResponse = IMSResponse<IUser[], 'users'> | undefined;

type UserListModelProps = {
  getAllUsers: (query: IUsersFilters) => Promise<UserListModelResponse>;
  deleteUser: (id: number) => Promise<IMSResponse<IUser, 'user'> | undefined>;
};

export const useUserListModel = ({
  getAllUsers,
  deleteUser,
}: UserListModelProps) => {
  const location = useLocation();
  const { navigateTo } = useAppNavigation();
  const [query, setQuery] = useQueryParams<IUsersFilters>();
  const { confirmDialog } = useDialog();
  const [, , isMobile] = useWindowSize();

  const { usersResponse, isLoading } = useGetAllUsers({
    getAllUsers,
    query,
  });
  const { deleteUserMutation, isPending } = useDeleteUser({
    deleteUser,
  });

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

  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/users/new', state: location.state });
  }, [location.state, navigateTo]);

  const handleDeleteUser = React.useCallback(
    (id: number) => {
      confirmDialog({
        header: 'Confirmação de Exclusão',
        message:
          'Você tem certeza de que deseja excluir este usuário? Esta ação não poderá ser desfeita.',
        acceptLabel: 'excluir',
        rejectLabel: 'cancelar',
        accept: async () => await deleteUserMutation(id),
      });
    },
    [confirmDialog, deleteUserMutation],
  );

  const handleEditUser = React.useCallback(
    async (user: IUser) => {
      navigateTo({ route: `/users/${user.id}`, state: location.state });
    },
    [location.state, navigateTo],
  );

  React.useEffect(() => {
    if (
      usersResponse?.users &&
      usersResponse?.meta?.total_current_records === 0
    ) {
      setQuery({ page: 1 });
    }
  }, [
    usersResponse?.meta?.total_current_records,
    usersResponse?.users,
    setQuery,
  ]);

  return {
    usersResponse,
    loading,
    handleNewRegister,
    handleDeleteUser,
    handleEditUser,
    methods,
    isMobile,
  };
};
