import React from 'react';

import { Check } from '@phosphor-icons/react';

import {
  Avatar,
  Button,
  CloseButton,
  FileUploadInput,
  FormContainer,
  Input,
  InputPassword,
} from '@/components/_ui';

import { useAccountSettingsModel } from './profile.model';

import { StyledProfileMenu } from './styles';

type IProfileProps = ReturnType<typeof useAccountSettingsModel> & {
  avatarUrl: string | null;
  show: boolean;
};

export const ProfileView: React.FC<IProfileProps> = (props) => {
  const {
    loading,
    currentUser,
    disableSubmitButton,
    handleToggleMenuProfile,
    handleFileSelected,
    handleUpdateProfile,
    handleSubmit,
    profileRef,
    errors,
    control,
    showPasswordInput,
    setShowPasswordInput,
    avatarUrl,
    show,
  } = props;

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
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="flex flex-col items-center justify-center px-2">
            <h3 className="my-4 text-lg text-slate-400">Editar Perfil</h3>

            <div className="flex flex-col items-center gap-5">
              <Avatar
                className="size-32 text-3xl"
                color="light"
                imageUrl={avatarUrl || null}
                name={currentUser.name}
              />

              <FileUploadInput
                name="image_perfil"
                onChangeFileSelected={(e) => handleFileSelected(e)}
              />
            </div>

            <div className="input-wrapper mt-4 w-full max-w-[250px] space-y-5">
              <Input
                id="name"
                name="name"
                label="Nome"
                defaultValue=""
                error={errors.name}
                control={control}
                disabled={loading}
                placeholder="Digite seu nome completo"
              />

              {showPasswordInput ? (
                <>
                  <InputPassword
                    id="password"
                    name="password"
                    label="Nova Senha"
                    defaultValue=""
                    control={control}
                    error={errors.password}
                    placeholder="Digite sua nova senha"
                    loading={loading}
                    disabled={loading}
                  />

                  <InputPassword
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirmar Senha"
                    defaultValue=""
                    control={control}
                    error={errors.confirm_password}
                    placeholder="Confirme sua senha"
                    loading={loading}
                    disabled={loading}
                  />
                </>
              ) : (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowPasswordInput(true)}
                    label="Alterar senha"
                    variable="secondary"
                    className="text-slate-400 hover:bg-slate-950"
                    clear
                  />
                </div>
              )}

              <Button
                type="submit"
                label="Salvar dados"
                icon={<Check className="size-4" weight="bold" />}
                className="w-full disabled:cursor-not-allowed"
                disabled={disableSubmitButton}
                loading={loading}
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </StyledProfileMenu>
  );
};
