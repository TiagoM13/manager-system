import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  House,
  User as UserIcon,
  Users as UsersIcon,
} from '@phosphor-icons/react';

import {
  Header,
  Divider,
  FormContainer,
  CustomLoadingSkeleton,
} from '@/components';
import { Status } from '@/enums';
import { IUser } from '@/interfaces';
import {
  createUserService,
  getUserService,
  updateUserService,
} from '@/services';
import { useImageUrl } from '@/store';
import { toastSuccess, backWithQuery } from '@/utils';
import {
  useMutation,
  useQueryClient,
  useQuery as useQueryUser,
} from '@tanstack/react-query';

import { StatusForm, UserForm } from './forms';
import { formSchema } from './schemas';

const User: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setImageUrl } = useImageUrl();
  const { id } = useParams<{ id: string }>();

  const newUser = React.useMemo(() => id === 'new', [id]);

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQueryUser({
    queryKey: ['user'],
    queryFn: async () => await getUserService(Number(id)),
    enabled: !newUser,
  });
  const { mutateAsync: createUser } = useMutation({
    mutationFn: async (newUser: IUser) =>
      await createUserService({
        ...newUser,
        status: Status.ACTIVE,
        image_url: undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { mutateAsync: updateUser } = useMutation({
    mutationFn: async (values: IUser) =>
      await updateUserService(Number(id), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Hook Form
  const methods = useForm<IUser>({
    resolver: formSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = methods;

  // Memos
  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

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

  // Callbacks
  const handleCancel = React.useCallback(() => {
    const from = location.state?.from;
    backWithQuery(navigate, from, from.pathname);
  }, [location.state?.from, navigate]);

  const submit = React.useCallback(
    async (values: IUser) => {
      if (newUser) {
        createUser(values, {
          onSuccess: () => {
            toastSuccess('Usuário criado com sucesso!');
            navigate('/users');
          },
        });
      } else {
        updateUser(values, {
          onSuccess: () => {
            toastSuccess('Usuário atualizado com sucesso!');
            navigate('/users');
          },
        });
      }
    },
    [createUser, navigate, newUser, updateUser],
  );

  React.useEffect(() => {
    if (newUser || loading) {
      reset();
      setImageUrl(undefined);
    } else if (user) {
      reset(user);
      setImageUrl(user.image_url);
    }
  }, [loading, newUser, reset, setImageUrl, user]);

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
