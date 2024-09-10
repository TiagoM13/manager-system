import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CircleNotch } from '@phosphor-icons/react';

import { Button, Input, InputPassword } from '@/components';
import { useAuth } from '@/hooks';

import { FormAuthProps } from '../../interfaces';

import { Container } from '../../styles';

export const SignInForm: React.FC = () => {
  const { loading } = useAuth();
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext<FormAuthProps>();

  const navigate = useNavigate();

  const redirectForgotPassword = React.useCallback(() => {
    navigate('/forgot-password');
    reset();
  }, [navigate, reset]);

  return (
    <Container>
      <h2>Bem-vindo de volta!</h2>

      <div className="space-y-6">
        <Input
          control={control}
          label="E-mail"
          name="email"
          placeholder="Digite seu email"
          className="py-3.5"
          error={errors.email}
          disabled={loading}
          required
        />

        <InputPassword
          control={control}
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          className="py-3.5"
          stylesRightButton="py-3.5 px-3"
          error={errors.password}
          loading={loading}
          disabled={loading}
          required
        />

        <button
          type="button"
          onClick={redirectForgotPassword}
          className="block ml-auto text-sm font-semibold cursor-pointer hover:text-sky-600 transition-all duration-500"
        >
          Equeceu a senha?
        </button>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-lg"
          label={loading ? 'Entrando...' : 'Entrar'}
          icon={
            loading && (
              <CircleNotch
                weight="bold"
                color="white"
                className="size-5 animate-spin"
              />
            )
          }
        />
      </div>
    </Container>
  );
};
