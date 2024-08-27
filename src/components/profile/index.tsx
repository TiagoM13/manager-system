import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { CircleNotch, Check } from '@phosphor-icons/react';

import {
  Avatar,
  Button,
  CloseButton,
  FormContainer,
  FileUploadInput,
  Input,
} from '@/components';
import { useAuth, useCurrentUser } from '@/hooks';
import { IChangePasswordData, IUser } from '@/interfaces';
import {
  changePasswordService,
  updateUserService,
  upladFileService,
} from '@/services';
import { useMenuProfile } from '@/store';
import { toastError, toastSuccess, toastWarning } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileSchema } from './schemas';

import { StyledProfileMenu } from './styles';

interface ProfileProps {
  loading?: boolean;
}

interface IUserProfile extends IChangePasswordData {
  name: string;
}

export const Profile: React.FC<ProfileProps> = ({ loading }) => {
  // States
  const [initialAvatarUrl, setInitialAvatarUrl] = React.useState<string | null>(
    null,
  );
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const user = useCurrentUser();
  const { setCurrentUser, logout } = useAuth();
  const { show, toggle, avatarUrl, setAvatarUrl } = useMenuProfile();

  // Forms
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

  // Refs
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Mutations
  const queryClient = useQueryClient();
  const { mutateAsync: updateUser, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: async (values: IUser) =>
        await updateUserService(Number(user.id), values),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toastSuccess('Perfil atualizado com sucesso!');
        toggle(false);
      },
    });
  const { mutateAsync: uploadFile, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: upladFileService,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => {
        toastError('Falha ao processar imagem');
      },
    });
  const { mutateAsync: changePassword, isPending: isLoadingChangePassword } =
    useMutation({
      mutationFn: async (values: IChangePasswordData) =>
        changePasswordService(user.id, values),
      onSuccess: () => {
        toastWarning(
          'Sua senha foi alterada! Por favor, faça login novamente.',
        );
        toggle(false);
      },
    });

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setAvatarUrl(previwURL || null);
  };

  // Memos
  const isLoading = React.useMemo(
    () => isLoadingUpdateUser || isLoadingUploadFile || isLoadingChangePassword,
    [isLoadingChangePassword, isLoadingUpdateUser, isLoadingUploadFile],
  );

  const disableSubmitButton = React.useMemo(
    () =>
      isLoading ||
      (avatarUrl === user.image_url &&
        name === user.name &&
        password === undefined &&
        confirm_password === undefined),
    [
      avatarUrl,
      confirm_password,
      isLoading,
      name,
      password,
      user.image_url,
      user.name,
    ],
  );

  const icon = React.useMemo(
    () =>
      isLoading ? (
        <CircleNotch
          weight="bold"
          color="white"
          className="size-5 animate-spin"
        />
      ) : (
        <Check className="size-5" weight="bold" />
      ),
    [isLoading],
  );

  // Callbacks
  const handleToggleMenuProfile = React.useCallback(() => {
    toggle(false);
    setAvatarUrl(user.image_url || null);
    setInitialAvatarUrl(user.image_url || null);
    setShowPasswordInput(false);
  }, [setAvatarUrl, toggle, user.image_url]);

  const handleUploadFile = React.useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const fileToUpload = formData.get('image_perfil');

      if (fileToUpload && fileToUpload instanceof File) {
        const uploadFormData = new FormData();
        uploadFormData.set('file', fileToUpload);
        const upload = await uploadFile(uploadFormData);
        const imageUrl = upload?.data.fileUrl as string;

        return imageUrl;
      }

      return null;
    },
    [uploadFile],
  );

  const handleExit = React.useCallback(async () => {
    const response = await logout();

    if (response) {
      navigate('/sign-in', {
        state: location.state,
        replace: true,
      });
    }
  }, [location.state, logout, navigate]);

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
        const response = await updateUser({
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
        const response = await changePassword({
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
      changePassword,
      handleExit,
      handleUploadFile,
      initialAvatarUrl,
      setCurrentUser,
      updateUser,
      user,
    ],
  );

  // Effects
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
    if (user.image_url !== null) {
      setAvatarUrl(user.image_url || null);
    }
  }, [reset, setAvatarUrl, show, user]);

  React.useEffect(() => {
    setAvatarUrl(user.image_url || null);
    setInitialAvatarUrl(user.image_url || null);
  }, [setAvatarUrl, user.image_url]);

  return (
    <StyledProfileMenu show={show}>
      <div ref={profileRef} className="overlay"></div>
      <div className="content-side-bar">
        <CloseButton
          type="button"
          id="btn-close-profile"
          onClick={handleToggleMenuProfile}
        />

        <FormContainer
          id="form-profile"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col items-center justify-center px-2">
            <h3 className="text-slate-400 text-lg my-4">Editar Perfil</h3>

            <div className="flex flex-col items-center gap-5">
              <Avatar
                className="size-32 text-3xl"
                color="light"
                imageUrl={avatarUrl || null}
                name={user.name}
                loading={loading}
              />

              <FileUploadInput
                name="image_perfil"
                onChangeFileSelected={(e) => handleFileSelected(e)}
              />
            </div>

            <div className="w-full max-w-[250px] mt-4 space-y-5 input-wrapper">
              <Input
                id="name"
                name="name"
                label="Nome"
                defaultValue=""
                error={errors.name}
                control={control}
                placeholder="Digite seu nome completo"
              />

              {showPasswordInput ? (
                <>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    label="Nova Senha"
                    defaultValue=""
                    control={control}
                    error={errors.password}
                    placeholder="Digite sua nova senha"
                  />

                  <Input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirmar Senha"
                    defaultValue=""
                    control={control}
                    error={errors.confirm_password}
                    placeholder="Confirme sua senha"
                  />
                </>
              ) : (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowPasswordInput(true)}
                    label="Alterar senha"
                    className="text-slate-400 hover:text-sky-500"
                    clear
                  />
                </div>
              )}

              <Button
                type="submit"
                label="Salvar dados"
                icon={icon}
                className="w-full disabled:cursor-not-allowed"
                disabled={disableSubmitButton}
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </StyledProfileMenu>
  );
};
