import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Header, Divider } from '@/components';
import { FormContainer } from '@/components/form-container';
import { Status } from '@/enums';
import { useUser } from '@/hooks';
import { IUser } from '@/interfaces';
import { createUser, updateUser } from '@/store/modules/users/actions';

import { StatusForm } from './forms/status-form';
import UserForm from './forms/user-form';
import { formSchema } from './schemas';

const User: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, data, getUser: refreshUser } = useUser();

  const newUser = React.useMemo(() => id === 'new', [id]);

  // Hook Form
  const methods = useForm<IUser>({
    resolver: formSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = methods;

  // Memos
  const title = React.useMemo(() => {
    if (newUser) return 'Cadastrar usuário';
    return 'Atualizar usuário';
  }, [newUser]);

  const breadcrumbsPathItems = React.useMemo(
    () => [
      {
        label: 'Início',
        path: '/',
      },
      {
        label: 'Usuários',
        path: '/users',
      },
      {
        label: newUser
          ? 'Cadastrar'
          : loading
            ? 'Carregando...'
            : `${data?.name}`,
      },
    ],
    [data?.name, loading, newUser],
  );

  // Callbacks
  const handleCancel = React.useCallback(() => {
    navigate('/users');
  }, [navigate]);

  const create = React.useCallback(async (values: IUser) => {
    return createUser({
      ...values,
      status: Status.ACTIVE,
      image_url: undefined,
    });
  }, []);

  const update = React.useCallback(
    async (values: IUser) => {
      return updateUser(Number(id), values);
    },
    [id],
  );

  const submit = React.useCallback(
    async (values: IUser) => {
      let savedValues: IUser | null | undefined = null;

      if (newUser) {
        savedValues = await create(values);
      } else {
        savedValues = await update(values);
      }

      if (savedValues) {
        navigate('/users');
      }
    },
    [create, navigate, newUser, update],
  );

  const load = React.useCallback(async () => {
    if (!newUser) {
      const loadedUser = await refreshUser(Number(id));

      if (loadedUser) {
        reset(loadedUser);
      }
    }
  }, [id, newUser, refreshUser, reset]);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <FormProvider {...methods}>
      <FormContainer noValidate onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col">
          <Header
            title={title}
            pathItems={breadcrumbsPathItems}
            onCancel={handleCancel}
            loading={loading}
            hasRegister={false}
            hasActions
            buttonLabels={{
              saved: newUser ? 'salvar usuário' : 'atualizar usuário',
            }}
          />
          <Divider />

          <div className="max-w-[1440px] flex gap-5">
            <div className="w-[60%]">
              <UserForm loading={loading} isNew={newUser} />
            </div>

            {!newUser && (
              <div className="w-[40%]">
                <StatusForm loading={loading} />
              </div>
            )}
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default User;
