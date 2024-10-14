import React from 'react';

import {
  Avatar,
  Button,
  CloseButton,
  FormContainer,
  FileUploadInput,
  Input,
  InputPassword,
  StatusIcon,
} from '@/components';
import { useMenuProfile } from '@/store';

import { useAccountSettings } from './hooks';

import { StyledProfileMenu } from './styles';

export const Profile: React.FC = () => {
  const {
    user,
    methods,
    submit,
    control,
    errors,
    profileRef,
    loading,
    handleToggleMenuProfile,
    handleFileSelected,
    showPasswordInput,
    setShowPasswordInput,
    disableSubmitButton,
  } = useAccountSettings();
  const { show, avatarUrl } = useMenuProfile();

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
          onSubmit={methods.handleSubmit(submit)}
        >
          <div className="flex flex-col items-center justify-center px-2">
            <h3 className="text-slate-400 text-lg my-4">Editar Perfil</h3>

            <div className="flex flex-col items-center gap-5">
              <Avatar
                className="size-32 text-3xl"
                color="light"
                imageUrl={avatarUrl || null}
                name={user.name}
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
                icon={<StatusIcon loading={loading} />}
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
