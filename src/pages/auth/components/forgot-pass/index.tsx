import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CircleNotch } from '@phosphor-icons/react';

import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';

import { FormAuthProps } from '../../interfaces';

import { Container } from '../../styles';

export const ForgotPasswod: React.FC = () => {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext<FormAuthProps>();

  const redirectLogin = React.useCallback(() => {
    navigate('/sign-in');
    reset();
  }, [navigate, reset]);

  return (
    <Container>
      <h2>Esqueceu sua senha?</h2>

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

        <button
          type="button"
          onClick={redirectLogin}
          className="block ml-auto  text-sm font-semibold cursor-pointer hover:text-sky-600 transition-all duration-500"
        >
          Fazer login
        </button>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-lg"
          label={loading ? 'Enviando código...' : 'Enviar código'}
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
