import React from 'react';
import { useForm } from 'react-hook-form';

import { CircleNotch, Check } from '@phosphor-icons/react';

import { Avatar, Button, CloseButton, Input } from '@/components';
import { useCurrentUser } from '@/hooks';
import { IChangePasswordData } from '@/interfaces';
import { useMenuProfile } from '@/store';

import { FileUploadInput } from '../input/components/input-file';

import { StyledProfileMenu } from './styles';

interface ProfileProps {
  loading?: boolean;
}

interface IUserProfile extends IChangePasswordData {
  name: string;
}

export const Profile: React.FC<ProfileProps> = ({ loading }) => {
  const [avatar, setAvatar] = React.useState<string | null>('');
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);

  const { show, toggle } = useMenuProfile();
  const user = useCurrentUser();

  const methods = useForm<IUserProfile>({
    shouldUnregister: false,
  });

  const { handleSubmit, reset, control } = methods;

  const profileRef = React.useRef<HTMLDivElement>(null);

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previwURL = URL.createObjectURL(files[0]);

    setAvatar(previwURL);
  };

  const submit = React.useCallback((values: IUserProfile) => {
    console.log(values);
  }, []);

  const icon = loading ? (
    <CircleNotch weight="bold" color="white" className="size-5 animate-spin" />
  ) : (
    <Check className="size-5" weight="bold" />
  );

  const handleToggleMenuProfile = React.useCallback(() => {
    toggle(false);
    setAvatar('');
    setShowPasswordInput(false);
  }, [toggle]);

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
  }, [reset, user, show]);

  return (
    <StyledProfileMenu show={show}>
      <div ref={profileRef} className="overlay"></div>
      <div className="content-side-bar">
        <CloseButton
          type="button"
          id="btn-close-profile"
          onClick={handleToggleMenuProfile}
        />

        <form noValidate onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col items-center justify-center px-2">
            <h3 className="text-slate-400 text-lg my-4">Editar Perfil</h3>

            <div className="flex flex-col items-center gap-5">
              <Avatar
                className="size-32 text-3xl"
                color="light"
                imageUrl={avatar || null}
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
                    id="password_confirmation"
                    name="password_confirmation"
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
              />
            </div>
          </div>
        </form>
      </div>
    </StyledProfileMenu>
  );
};
