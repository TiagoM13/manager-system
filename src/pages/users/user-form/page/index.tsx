import React from 'react';
import { FormProvider } from 'react-hook-form';

import {
  House,
  User as UserIcon,
  Users as UsersIcon,
} from '@phosphor-icons/react';

import { Header, FormContainer, CustomLoadingSkeleton } from '@/components';
import { useAppNavigation } from '@/hooks';

import { StatusForm, UserForm } from '../forms';
import { useUserForm } from '../hooks/user-form';

const User: React.FC = () => {
  const { goBack } = useAppNavigation();

  const {
    user,
    newUser,
    isUpdatingItself,
    methods,
    handleSubmit,
    submit,
    loading,
  } = useUserForm();

  const title = React.useMemo(() => {
    if (newUser) return 'Cadastrar usuário';
    return 'Atualizar usuário';
  }, [newUser]);

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
        label: newUser ? (
          'Cadastrar'
        ) : loading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${user?.name}`
        ),
        icon: <UserIcon className="size-4" />,
      },
    ],
    [loading, newUser, user?.name],
  );

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-user" noValidate onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col">
          <Header
            title={title}
            subtitle="voltar para a lista de usuários"
            actionLabel={newUser ? 'salvar usuário' : 'atualizar usuário'}
            breadcrumbItems={breadcrumbsPathItems}
            goBack={goBack}
            loading={loading}
            isSubmit
          />

          <div className="max-w-[1440px] flex gap-5 mt-4  max-md:flex-col">
            <div className="w-[60%] max-md:w-full">
              <UserForm
                isUpdatingItself={isUpdatingItself}
                loading={loading}
                isNew={newUser}
              />
            </div>

            {!newUser && (
              <div className="w-[40%] max-md:w-full">
                <StatusForm
                  isUpdatingItself={isUpdatingItself}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default User;
