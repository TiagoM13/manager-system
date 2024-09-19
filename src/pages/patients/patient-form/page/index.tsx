import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { House, UserPlus, UsersFour } from '@phosphor-icons/react';

import { FormContainer } from '@/components';
import { backWithQuery } from '@/utils';

import { Header } from '../components/header';

const PatientForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Callbacks
  const goBack = React.useCallback(() => {
    const from = location.state?.from;
    backWithQuery(navigate, from, from.pathname);
  }, [location.state?.from, navigate]);

  const breadcrumbsPathItems = React.useMemo(
    () => [
      {
        label: 'Início',
        path: '/',
        icon: <House className="size-4" />,
      },
      {
        label: 'Pacientes',
        path: '/patients',
        icon: <UsersFour className="size-4" />,
      },
      {
        label: 'Novo Paciente',
        icon: <UserPlus className="size-4" />,
      },
    ],
    [],
  );

  return (
    <FormContainer id="form-patient" noValidate>
      <Header
        subtitle="voltar a lista de pacientes"
        title="Adicionar Paciente"
        labelRegister="adicionar paciente"
        pathItems={breadcrumbsPathItems}
        goBack={goBack}
      />
    </FormContainer>
  );
};

export default PatientForm;
