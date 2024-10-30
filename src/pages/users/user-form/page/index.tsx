import React from 'react';

import {
  House,
  User as UserIcon,
  Users as UsersIcon,
} from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components';
import { HttpClient } from '@/infra/http/http-client';
import { IUser } from '@/interfaces';
import {
  createUserService,
  getUserService,
  updateUserService,
  uploadFileService,
} from '@/services';

import { useUserFormModel } from '../model/user-form.model';
import { UserFormView } from '../view/user-form.view';

const User: React.FC = () => {
  const httpClient = new HttpClient();

  const services = {
    getUser: (id: number) => getUserService(httpClient, id),
    createUser: (data: IUser) => createUserService(httpClient, data),
    updateUser: (id: number, data: IUser) =>
      updateUserService(httpClient, id, data),
    uploadFile: (data: FormData) => uploadFileService(httpClient, data),
  };

  const methods = useUserFormModel(services);

  const title = React.useMemo(() => {
    if (methods.newUser) return 'Cadastrar usuário';
    return 'Atualizar usuário';
  }, [methods.newUser]);

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
        label: methods.newUser ? (
          'Cadastrar'
        ) : methods.loading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${methods.user?.name}`
        ),
        icon: <UserIcon className="size-4" />,
      },
    ],
    [methods.loading, methods.newUser, methods.user?.name],
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
