import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header } from '@/components';
import { FormContainer } from '@/components/_ui';
import { BreadcrumbItem } from '@/interfaces';

import { UserForm, StatusForm } from '../forms';
import { useUserFormModel } from '../model/user-form.model';

type UserFormViewProps = ReturnType<typeof useUserFormModel> & {
  title: string;
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const UserFormView: React.FC<UserFormViewProps> = (props) => {
  const {
    title,
    methods,
    handleSubmit,
    submit,
    isCreatingNewUser,
    isLoading,
    isUpdatingItself,
    goBack,
    breadcrumbsPathItems,
  } = props;

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-user" noValidate onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col">
          <Header
            title={title}
            actionLabel={
              isCreatingNewUser ? 'salvar usuário' : 'atualizar usuário'
            }
            breadcrumbItems={breadcrumbsPathItems}
            goBack={goBack}
            loading={isLoading}
            isSubmit
          />

          <div className="mt-4 flex max-w-[1440px] gap-5 max-md:flex-col">
            <div className="w-[60%] max-md:w-full">
              <UserForm
                isUpdatingItself={isUpdatingItself}
                loading={isLoading}
                isNew={isCreatingNewUser}
              />
            </div>

            {!isCreatingNewUser && (
              <div className="w-[40%] max-md:w-full">
                <StatusForm
                  isUpdatingItself={isUpdatingItself}
                  loading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};
