import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { AxiosResponse } from 'axios';

import {
  useCurrentUser,
  useAuth,
  useAppNavigation,
  useNotification,
} from '@/hooks';
import {
  IUser,
  IChangePasswordData,
  IMSResponse,
  IUploadFile,
} from '@/interfaces';
import { useMenuProfile } from '@/store';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  ERROR_PROCESSING_IMAGE,
  ERROR_UPDATING_PROFILE,
  LOGIN_AGAIN,
  UPDATED_PROFILE_SUCCESS,
} from './profile.messages';
import { profileSchema } from './profile.schema';

type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface IUserProfile extends IChangePasswordData {
  name: string;
}

interface IAccountSettingsModelProps {
  updateUser: (id: number, data: IUser) => Promise<UserRequestResult>;
  uploadFile: (data: FormData) => Promise<IUploadFile | undefined>;
  changePassword: (
    id: number,
    data: IChangePasswordData,
  ) => Promise<AxiosResponse<IUser> | undefined>;
}

export const useAccountSettingsModel = ({
  updateUser,
  uploadFile,
  changePassword,
}: IAccountSettingsModelProps) => {
  const [initialAvatarUrl, setInitialAvatarUrl] = React.useState<string | null>(
    null,
  );
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);

  const notify = useNotification();
  const location = useLocation();
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const { setCurrentUser, logout } = useAuth();
  const { navigateTo } = useAppNavigation();
  const { show, toggle, avatarUrl, setAvatarUrl } = useMenuProfile();

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

  const profileRef = React.useRef<HTMLDivElement>(null);

  const { mutateAsync: updateUserMutation, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) =>
        await updateUser(Number(user.id), values),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          notify.success(UPDATED_PROFILE_SUCCESS);
          toggle(false);
        }
      },
      onError: () => {
        notify.error(ERROR_UPDATING_PROFILE);
        toggle(false);
      },
    });
  const { mutateAsync: uploadFileMutation, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: uploadFile,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
      onError: () => notify.error(ERROR_PROCESSING_IMAGE),
    });
  const {
    mutateAsync: changePasswordMutation,
    isPending: isLoadingChangePassword,
  } = useMutation({
    mutationFn: async (values: IChangePasswordData) =>
      changePassword(Number(user.id), values),
    onSuccess: (data) => {
      if (data) {
        notify.warning(LOGIN_AGAIN);
        toggle(false);
      }
    },
  });

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const previewURL = URL.createObjectURL(files[0]);
      setAvatarUrl(previewURL || null);
    }
  };

  const handleFileUpload = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_perfil');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const uploadResponse = await uploadFileMutation(uploadFormData);

        return uploadResponse?.fileUrl;
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

      let uploadedImageUrl = null;

      if (avatarUrl !== initialAvatarUrl) {
        uploadedImageUrl = await handleFileUpload(formElement);
      }

      if (values.name !== user.name || avatarUrl !== initialAvatarUrl) {
        const response = await updateUserMutation({
          ...user,
          name: values.name || user.name,
          image_url: uploadedImageUrl || user.image_url,
        });

        if (response?.success) {
          setCurrentUser(response.user);
        }
      }

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
      handleFileUpload,
      initialAvatarUrl,
      setCurrentUser,
      updateUserMutation,
      user,
    ],
  );

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
    const imageUrl = user.image_url || null;
    setAvatarUrl(imageUrl);
    setInitialAvatarUrl(imageUrl);
  }, [reset, setAvatarUrl, user, show]);

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
