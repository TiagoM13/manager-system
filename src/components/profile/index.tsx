import React from 'react';
import { useForm } from 'react-hook-form';

import { CircleNotch, Check } from '@phosphor-icons/react';

import {
  Avatar,
  Button,
  CloseButton,
  FormContainer,
  FileUploadInput,
  Input,
} from '@/components';
import { useCurrentUser } from '@/hooks';
import { IChangePasswordData, IUser } from '@/interfaces';
import { updateUserService, upladFileService } from '@/services';
import { useMenuProfile } from '@/store';
import { setCurrentUser } from '@/store/modules/auth/actions';
import { toastError, toastSuccess } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { StyledProfileMenu } from './styles';

interface ProfileProps {
  loading?: boolean;
}

interface IUserProfile extends IChangePasswordData {
  name: string;
}

export const Profile: React.FC<ProfileProps> = ({ loading }) => {
  const [initialAvatarUrl, setInitialAvatarUrl] = React.useState<string | null>(
    null,
  );
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);

  const { show, toggle, avatarUrl, setAvatarUrl } = useMenuProfile();
  const user = useCurrentUser();

  React.useEffect(() => {
    setAvatarUrl(user.image_url || null);
    setInitialAvatarUrl(user.image_url || null);
  }, [setAvatarUrl, user.image_url]);

  const methods = useForm<IUserProfile>({
    shouldUnregister: false,
  });

  const { handleSubmit, reset, control } = methods;

  const profileRef = React.useRef<HTMLDivElement>(null);

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

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setAvatarUrl(previwURL || null);
  };

  // cristal@gmail.com
  // b14a6z0f

  const isLoading = React.useMemo(
    () => isLoadingUpdateUser || isLoadingUploadFile,
    [isLoadingUpdateUser, isLoadingUploadFile],
  );

  const icon = isLoading ? (
    <CircleNotch weight="bold" color="white" className="size-5 animate-spin" />
  ) : (
    <Check className="size-5" weight="bold" />
  );

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
      if (values.name !== user.name) {
        const response = await updateUser({
          ...user,
          name: values.name,
          image_url: uploadedImageUrl || user.image_url,
        });

        if (response.data.success) {
          setCurrentUser(response.data.user!);
        }
      }

      // Change password
      // if (values.password && values.confirm_password) {
      //   console.log(values.password, values.confirm_password);
      // }
    },
    [avatarUrl, handleUploadFile, initialAvatarUrl, updateUser, user],
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
    if (user.image_url !== null) {
      setAvatarUrl(user.image_url || null);
    }
  }, [reset, setAvatarUrl, show, user]);

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
                    placeholder="Digite sua nova senha"
                    required
                  />

                  <Input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirmar Senha"
                    defaultValue=""
                    control={control}
                    placeholder="Confirme sua senha"
                    required
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
                className="w-full"
                disabled={isLoading}
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </StyledProfileMenu>
  );
};
