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
  // hooks
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

  // queries
  const queryClient = useQueryClient();
  const { data: user, isLoading: isLoadingGetUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !newUser,
  });
  // mutations
  const { mutateAsync: createUserMutation, isPending: isLoadingCreateUser } =
    useMutation({
      mutationFn: async (newUser: IUser) => await createUserService(newUser),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    });
  const { mutateAsync: updateUserMutation, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) =>
        await updateUserService(Number(id), values),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    });
  const { mutateAsync: uploadFileMutation, isPending: isLoadingFileUpload } =
    useMutation({
      mutationFn: upladFileService,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
      onError: () => toastError('Falha ao processar imagem'),
    });

  const isUpdatingItself = !newUser && user?.id === currentUser.id;

  // hook form
  const methods = useForm<IUser>({
    resolver: formSchema as any,
    shouldUnregister: false,
  });

  const { handleSubmit, reset } = methods;

  // memos
  const loading = React.useMemo(
    () =>
      isLoadingGetUser ||
      isLoadingFileUpload ||
      isLoadingCreateUser ||
      isLoadingUpdateUser,
    [
      isLoadingGetUser,
      isLoadingCreateUser,
      isLoadingUpdateUser,
      isLoadingFileUpload,
    ],
  );

  // callbacks
  const handleFileUpload = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_url');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const uploadResponse = await uploadFileMutation(uploadFormData);
        return uploadResponse?.data.fileUrl || null;
      }

      return null;
    },
    [uploadFileMutation],
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

      const uploadedImageUrl = isValidImageUrl
        ? await handleFileUpload(formElement)
        : null;

      const savedValues = {
        ...values,
        image_url: uploadedImageUrl || values.image_url,
      };

      if (savedValues) {
        if (newUser) {
          await createUserMutation(savedValues);
          toastSuccess('Usuário criado com sucesso!');
        } else {
          await updateUserMutation(savedValues);
          toastSuccess('Usuário atualizado com sucesso!');
        }
        navigate('/users');
      }
    },
    [
      createUserMutation,
      handleFileUpload,
      navigate,
      newUser,
      updateUserMutation,
      user?.image_url,
    ],
  );

  // effects
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
