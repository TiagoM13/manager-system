import React from 'react';

import {
  House,
  User as UserIcon,
  Users as UsersIcon,
} from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components/_ui';
import { HttpClient } from '@/infra/http/http-client';
import { IUser } from '@/interfaces';
import {
  createUserService,
  getUserService,
  updateUserService,
  updateUserStatusService,
  uploadFileService,
} from '@/services';

import { useUserFormModel } from './user-form.model';
import { UserFormView } from './user-form.view';

const User: React.FC = () => {
  const httpClient = new HttpClient();

  const services = {
    getUser: (id: number) => getUserService(httpClient, id),
    createUser: (data: IUser) => createUserService(httpClient, data),
    updateUser: (id: number, data: IUser) =>
      updateUserService(httpClient, id, data),
    updateUserStatus: (id: number, status: string) =>
      updateUserStatusService(httpClient, id, status),
    uploadFile: (data: FormData) => uploadFileService(httpClient, data),
  };

  const methods = useUserFormModel(services);
  const { user, isLoading, isCreatingNewUser } = methods;

  const title = React.useMemo(() => {
    if (isCreatingNewUser) return 'Cadastrar usuário';
    return 'Atualizar usuário';
  }, [isCreatingNewUser]);

  const breadcrumbsPathItems = React.useMemo(
    () => [
      {
        label: 'Início',
        path: '/',
        icon: <House className="size-4" />,
      },
      {
        label: 'Usuários',
        path: '/users',
        icon: <UsersIcon className="size-4" />,
      },
      {
        label: isCreatingNewUser ? (
          'Cadastrar'
        ) : isLoading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${user?.name}`
        ),
        icon: <UserIcon className="size-4" />,
      },
    ],
    [isLoading, isCreatingNewUser, user?.name],
  );

  return (
    <UserFormView
      title={title}
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methods}
    />
  );
};

export default User;
