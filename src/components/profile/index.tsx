import React from 'react';
import { useForm } from 'react-hook-form';

import { CircleNotch, Check } from '@phosphor-icons/react';

import { Button, CloseButton, Input, InputFile } from '@/components';
import { IChangePasswordData } from '@/interfaces';
import { useMenuProfile } from '@/store';

import { StyledProfileMenu } from './styles';

interface ProfileProps {
  loading?: boolean;
}

interface IUserProfile extends IChangePasswordData {
  name: string;
}

export const Profile: React.FC<ProfileProps> = ({ loading }) => {
  const { show, toggle } = useMenuProfile();
  const methods = useForm<IUserProfile>({
    shouldUnregister: false,
  });

  const { handleSubmit, reset, control } = methods;

  const profileRef = React.useRef<HTMLDivElement>(null);

  const submit = React.useCallback((values: IUserProfile) => {
    console.log(values);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        profileRef.current.contains(event.target as Node)
      )
        toggle(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggle]);

  const icon = loading ? (
    <CircleNotch weight="bold" color="white" className="size-5 animate-spin" />
  ) : (
    <Check className="size-5" weight="bold" />
  );

  return (
    <StyledProfileMenu show={show}>
      <div ref={profileRef} className="overlay"></div>
      <div className="content-side-bar">
        <CloseButton
          type="button"
          id="btn-close-profile"
          onClick={() => toggle(false)}
        />

        <form noValidate onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col items-center justify-center px-2">
            <h3 className="text-slate-400 text-lg my-4">Editar Perfil</h3>

            <InputFile name="image_url" control={control} hasPreview flexCol />

            <div className="w-full max-w-[250px] mt-4 space-y-5 input-wrapper">
              <Input
                id="name"
                name="name"
                label="Nome"
                defaultValue=""
                control={control}
                placeholder="Digite seu nome completo"
              />

              {/* Adicionar botão para exibir inputs de senha - por padrão não aparecerá os inputs só um botão no estilo clean */}
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
