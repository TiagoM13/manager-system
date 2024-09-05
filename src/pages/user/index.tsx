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
import { useCurrentUser } from '@/hooks';
import { IUser } from '@/interfaces';
import {
  createUserService,
  getUserService,
  updateUserService,
  upladFileService,
} from '@/services';
import { useImageUrl, useName } from '@/store';
import { toastSuccess, backWithQuery, toastError } from '@/utils';
import { handleAPIErrors } from '@/utils/common';
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
  const { setName } = useName();
  const { id } = useParams<{ id: string }>();

  const currentUser = useCurrentUser();

  const newUser = React.useMemo(() => id === 'new', [id]);

  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQueryUser({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await getUserService(Number(id));
        return user;
      } catch (error) {
        handleAPIErrors(error);
        return;
      }
    },
    enabled: !newUser,
  });
  const { mutateAsync: createUser, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: async (newUser: IUser) => await createUserService(newUser),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  const { mutateAsync: updateUser, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) =>
        await updateUserService(Number(id), values),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  const { mutateAsync: uploadFile, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: upladFileService,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
      onError: () => {
        toastError('Falha ao processar imagem');
      },
    });

  const isUpdatingItself = !newUser && user?.id === currentUser.id;

  // Hook Form
  const methods = useForm<IUser>({
    resolver: formSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = methods;

  // Memos
  const loading = React.useMemo(
    () =>
      isLoading ||
      isLoadingUploadFile ||
      isLoadingCreateUser ||
      isLoadingUpdateUser,
    [isLoading, isLoadingCreateUser, isLoadingUpdateUser, isLoadingUploadFile],
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

  const handleUploadFile = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_url');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const upload = await uploadFile(uploadFormData);
        const imageUrl = upload?.data.fileUrl;

        return imageUrl;
      }

      return null;
    },
    [uploadFile],
  );

  const submit = React.useCallback(
    async (values: IUser) => {
      const formElement = document.querySelector(
        '#form-user',
      ) as HTMLFormElement;

      const isValidImageUrl =
        values.image_url !== null &&
        values.image_url !== undefined &&
        values.image_url !== user?.image_url;

      let uploadedImageUrl = '';

      if (isValidImageUrl) {
        const response = await handleUploadFile(formElement);

        uploadedImageUrl = response;
      }

      const savedValues = {
        ...values,
        image_url: uploadedImageUrl || values.image_url,
      };

      let response: IUser | undefined = undefined;

      if (savedValues) {
        if (newUser) {
          const res = await createUser(savedValues);

          response = res?.data as any;
        } else {
          const res = await updateUser(savedValues);

          response = res?.data as any;
        }

        if (response) {
          const message = newUser ? 'criado' : 'atualizado';

          toastSuccess(`Usuário ${message} com sucesso!`);
          navigate('/users');
        }
      }
    },
    [
      createUser,
      handleUploadFile,
      navigate,
      newUser,
      updateUser,
      user?.image_url,
    ],
  );

  React.useEffect(() => {
    if (newUser && !loading) {
      reset();
      setImageUrl(undefined);
      setName('');
    } else if (user && !loading) {
      reset(user);
      setImageUrl(user.image_url);
      setName(user.name);
    }
  }, [loading, newUser, reset, setImageUrl, setName, user]);

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-user" noValidate onSubmit={handleSubmit(submit)}>
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
              <UserForm
                isUpdatingItself={isUpdatingItself}
                loading={loading}
                isNew={newUser}
              />
            </div>

            {!newUser && (
              <div className="w-[40%]">
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
