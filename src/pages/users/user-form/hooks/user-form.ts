import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useCurrentUser } from '@/hooks';
import { IUser } from '@/interfaces';
import {
  getUserService,
  createUserService,
  updateUserService,
  upladFileService,
} from '@/services';
import { useImageUrl, useName } from '@/store';
import { toastError, toastSuccess } from '@/utils';
import { handleAPIErrors } from '@/utils/common';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { formSchema } from '../schemas';

export const useUserForm = () => {
  const navigate = useNavigate();
  const { setImageUrl } = useImageUrl();
  const { setName } = useName();
  const { id } = useParams<{ id: string }>();

  const currentUser = useCurrentUser();

  const newUser = React.useMemo(() => id === 'new', [id]);

  const getUser = React.useCallback(async () => {
    try {
      const user = await getUserService(Number(id));
      return user;
    } catch (error) {
      handleAPIErrors(error);
      return;
    }
  }, [id]);

  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
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

  // Callbacks
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

  return {
    user,
    currentUser,
    newUser,
    isUpdatingItself,
    methods,
    submit,
    handleSubmit,
    loading,
  };
};
