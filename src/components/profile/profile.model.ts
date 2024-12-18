import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { AxiosResponse } from 'axios';

import {
  useCurrentUser,
  useAuth,
  useAppNavigation,
  useUploadFile,
  useUpdateUser,
} from '@/hooks';
import { useChangePassword } from '@/hooks/auth/auth';
import {
  IUser,
  IChangePasswordData,
  IMSResponse,
  IUploadFile,
} from '@/interfaces';
import { useMenuProfile } from '@/store';

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

  const location = useLocation();
  const currentUser = useCurrentUser();
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

  const { updateUserMutation, isPending: isLoadingUpdateUser } = useUpdateUser({
    updateUser,
    userId: Number(currentUser.id),
    queryKeys: ['users'],
  });
  const { uploadFileMutation, isPending: isLoadingUploadFile } = useUploadFile({
    uploadFile,
    queryKeys: ['users'],
  });
  const { changePasswordMutation, isPending: isLoadingChangePassword } =
    useChangePassword({ changePassword });

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);

      const previewURL = URL.createObjectURL(files[0]);
      setAvatarUrl(previewURL);
    }
  };

  const handleFileUpload = React.useCallback(
    async (form: HTMLFormElement): Promise<string | null> => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_perfil');

      if (!fileToUpload || !(fileToUpload instanceof File)) {
        return null;
      }

      if (!fileToUpload.type.startsWith('image/')) {
        return null;
      }

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const uploadResponse = await uploadFileMutation(uploadFormData);

        return uploadResponse?.fileUrl || null;
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
    setAvatarUrl(currentUser.image_url || null);
    setInitialAvatarUrl(currentUser.image_url || null);
    setShowPasswordInput(false);
  }, [setAvatarUrl, toggle, currentUser.image_url]);

  const uploadAvatarIfChanged = React.useCallback(async () => {
    const hasAvatarChanged = avatarUrl !== initialAvatarUrl;

    if (hasAvatarChanged) {
      const formElement = document.querySelector(
        '#form-profile',
      ) as HTMLFormElement;

      return await handleFileUpload(formElement);
    }

    return null;
  }, [avatarUrl, handleFileUpload, initialAvatarUrl]);

  const updateUserIfChanged = React.useCallback(
    async (
      values: IUserProfile,
      uploadedImageUrl: string | null | undefined,
    ) => {
      const hasNameChanged = values.name !== currentUser.name;
      const hasAvatarChanged = avatarUrl !== initialAvatarUrl;

      if (hasNameChanged || hasAvatarChanged) {
        const response = await updateUserMutation({
          name: values.name || currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          image_url: uploadedImageUrl || currentUser.image_url,
        });

        if (response?.success) {
          setCurrentUser(response.user);
          toggle();
        }
      }
    },
    [
      avatarUrl,
      currentUser.email,
      currentUser.image_url,
      currentUser.name,
      currentUser.role,
      initialAvatarUrl,
      setCurrentUser,
      toggle,
      updateUserMutation,
    ],
  );

  const changePasswordIfProvided = React.useCallback(
    async (values: IUserProfile) => {
      const hasPasswordConfirmation =
        values.password && values.confirm_password;

      if (!hasPasswordConfirmation) return;

      const response = await changePasswordMutation({
        password: values.password,
        confirm_password: values.confirm_password,
      });

      if (response) {
        handleExit();
      }
    },
    [changePasswordMutation, handleExit],
  );

  const handleUpdateProfile = React.useCallback(
    async (values: IUserProfile) => {
      const uploadedImageUrl = await uploadAvatarIfChanged();

      await updateUserIfChanged(values, uploadedImageUrl);

      await changePasswordIfProvided(values);
    },
    [uploadAvatarIfChanged, updateUserIfChanged, changePasswordIfProvided],
  );

  const loading = React.useMemo(
    () => isLoadingUpdateUser || isLoadingUploadFile || isLoadingChangePassword,
    [isLoadingChangePassword, isLoadingUpdateUser, isLoadingUploadFile],
  );

  const disableSubmitButton = React.useMemo(
    () =>
      loading ||
      (avatarUrl === currentUser.image_url &&
        name === currentUser.name &&
        password === undefined &&
        confirm_password === undefined),
    [
      avatarUrl,
      confirm_password,
      loading,
      name,
      password,
      currentUser.image_url,
      currentUser.name,
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
    reset(currentUser);
    const imageUrl = currentUser.image_url || null;
    setAvatarUrl(imageUrl);
    setInitialAvatarUrl(imageUrl);
  }, [reset, setAvatarUrl, currentUser, show]);

  return {
    currentUser,
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
    handleUpdateProfile,
  };
};
