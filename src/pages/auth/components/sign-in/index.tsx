import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components';

import { FormAuthProps } from '../../interfaces';

import { Container } from '../../styles';

export const SignIn: React.FC = () => {
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
          required
        />
        <Input
          control={control}
          type="password"
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          className="py-3.5"
          error={errors.password}
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
          className="w-full py-3.5 text-lg"
          label="Entrar"
        />
      </div>
    </Container>
  );
};
