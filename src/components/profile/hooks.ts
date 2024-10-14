import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useCurrentUser, useAuth, useAppNavigation } from '@/hooks';
import { IUser, IChangePasswordData } from '@/interfaces';
import {
  updateUserService,
  upladFileService,
  changePasswordService,
} from '@/services';
import { useMenuProfile } from '@/store';
import { toastSuccess, toastError, toastWarning } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { profileSchema } from './schemas';

interface IUserProfile extends IChangePasswordData {
  name: string;
}

export const useAccountSettings = () => {
  // states
  const [initialAvatarUrl, setInitialAvatarUrl] = React.useState<string | null>(
    null,
  );
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);

  // hooks
  const location = useLocation();
  const user = useCurrentUser();
  const { setCurrentUser, logout } = useAuth();
  const { navigateTo } = useAppNavigation();
  const { show, toggle, avatarUrl, setAvatarUrl } = useMenuProfile();

  // hook form
  const methods = useForm<IUserProfile>({
    resolver: profileSchema,
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = methods;

  const [name, password, confirm_password] = watch([
    'name',
    'password',
    'confirm_password',
  ]);

  // refs
  const profileRef = React.useRef<HTMLDivElement>(null);

  // mutations
  const queryClient = useQueryClient();
  const { mutateAsync: updateUserMutation, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) =>
        await updateUserService(Number(user.id), values),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toastSuccess('Perfil atualizado com sucesso!');
        toggle(false);
      },
    });
  const { mutateAsync: uploadFileMutation, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: upladFileService,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
      onError: () => toastError('Falha ao processar imagem'),
    });
  const {
    mutateAsync: changePasswordMutation,
    isPending: isLoadingChangePassword,
  } = useMutation({
    mutationFn: async (values: IChangePasswordData) =>
      changePasswordService(user.id, values),
    onSuccess: () => {
      toastWarning('Sua senha foi alterada! Por favor, faça login novamente.');
      toggle(false);
    },
  });

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const previewURL = URL.createObjectURL(files[0]);
      setAvatarUrl(previewURL || null);
    }
  };

  // callbacks
  const handleUploadFile = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_perfil');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const upload = await uploadFileMutation(uploadFormData);
        return upload?.data.fileUrl as string;
      }

      return null;
    },
    [uploadFileMutation],
  );

  const handleExit = React.useCallback(async () => {
    const response = await logout();
    if (response) {
      navigateTo({ route: '/sign-in', state: location.state });
    }
  }, [location.state, logout, navigateTo]);

  const handleToggleMenuProfile = React.useCallback(() => {
    toggle(false);
    setAvatarUrl(user.image_url || null);
    setInitialAvatarUrl(user.image_url || null);
    setShowPasswordInput(false);
  }, [setAvatarUrl, toggle, user.image_url]);

  const submit = React.useCallback(
    async (values: IUserProfile) => {
      const formElement = document.querySelector(
        '#form-profile',
      ) as HTMLFormElement;

      let uploadedImageUrl: string | null = null;

      // Updated avatar
      if (avatarUrl !== initialAvatarUrl) {
        uploadedImageUrl = await handleUploadFile(formElement);
      }

      // Updated username
      if (values.name !== user.name || avatarUrl !== initialAvatarUrl) {
        const response = await updateUserMutation({
          ...user,
          name: values.name || user.name,
          image_url: uploadedImageUrl || user.image_url,
        });

        if (response.data.success) {
          setCurrentUser(response.data.user!);
        }
      }

      // Change password
      if (values.password && values.confirm_password) {
        const response = await changePasswordMutation({
          password: values.password,
          confirm_password: values.confirm_password,
        });

        if (response) {
          handleExit();
        }
      }
    },
    [
      avatarUrl,
      changePasswordMutation,
      handleExit,
      handleUploadFile,
      initialAvatarUrl,
      setCurrentUser,
      updateUserMutation,
      user,
    ],
  );

  // memos
  const loading = React.useMemo(
    () => isLoadingUpdateUser || isLoadingUploadFile || isLoadingChangePassword,
    [isLoadingChangePassword, isLoadingUpdateUser, isLoadingUploadFile],
  );

  const disableSubmitButton = React.useMemo(
    () =>
      loading ||
      (avatarUrl === user.image_url &&
        name === user.name &&
        password === undefined &&
        confirm_password === undefined),
    [
      avatarUrl,
      confirm_password,
      loading,
      name,
      password,
      user.image_url,
      user.name,
    ],
  );

  // effects
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        profileRef.current.contains(event.target as Node)
      ) {
        handleToggleMenuProfile();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleToggleMenuProfile]);

  React.useEffect(() => {
    reset(user);
    if (user.image_url !== null) setAvatarUrl(user.image_url || null);
  }, [reset, setAvatarUrl, show, user]);

  React.useEffect(() => {
    setAvatarUrl(user.image_url || null);
    setInitialAvatarUrl(user.image_url || null);
  }, [setAvatarUrl, user.image_url]);

  return {
    user,
    initialAvatarUrl,
    showPasswordInput,
    setShowPasswordInput,
    profileRef,
    methods,
    control,
    errors,
    handleFileSelected,
    loading,
    disableSubmitButton,
    handleToggleMenuProfile,
    handleSubmit,
    submit,
  };
};
