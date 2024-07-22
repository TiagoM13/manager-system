import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  House,
  User as UserIcon,
  Users as UsersIcon,
} from '@phosphor-icons/react';

import { Header, Divider, FormContainer } from '@/components';
import { Status } from '@/enums';
import { useUser } from '@/hooks';
import { IUser } from '@/interfaces';
import { toastSuccess, backWithQuery } from '@/utils';

import { StatusForm, UserForm } from './forms';
import { formSchema } from './schemas';

const User: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, data, getUser, createUser, updateUser } = useUser();

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
        icon: <House className="size-4" />,
      },
      {
        label: 'Usuários',
        path: '/users',
        icon: <UsersIcon className="size-4" />,
      },
      {
        label: newUser
          ? 'Cadastrar'
          : loading
            ? 'Carregando...'
            : `${data?.name}`,
        icon: <UserIcon className="size-4" />,
      },
    ],
    [data?.name, loading, newUser],
  );

  // Callbacks
  const handleCancel = React.useCallback(() => {
    const from = location.state?.from;
    backWithQuery(navigate, from, from.pathname);
  }, [location.state?.from, navigate]);

  const create = React.useCallback(
    async (values: IUser) => {
      return createUser({
        ...values,
        status: Status.ACTIVE,
        image_url: undefined,
      });
    },
    [createUser],
  );

  const update = React.useCallback(
    async (values: IUser) => {
      return updateUser(Number(id), values);
    },
    [id, updateUser],
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
        const title = newUser ? 'criado' : 'atualizado';
        toastSuccess(`Usuário ${title} com sucesso!`);
      }
    },
    [create, navigate, newUser, update],
  );

  const load = React.useCallback(async () => {
    if (!newUser) {
      const loadedUser = await getUser(Number(id));

      if (loadedUser) {
        reset(loadedUser);
      }
    }
  }, [id, newUser, getUser, reset]);

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
