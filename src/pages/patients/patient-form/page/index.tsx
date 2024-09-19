import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  House,
  UserPlus,
  UsersFour,
} from '@phosphor-icons/react';

import { Button, Card, FormContainer } from '@/components';
import { backWithQuery } from '@/utils';

import { FormProgress } from '../components/form-progress';
import { Header } from '../components/header';
import { FormStepOne, FormStepThree, FormStepTwo } from '../forms';

const PatientForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = React.useState(0);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      stepOne: {},
      stepTwo: {},
      stepThree: {},
    },
  });

  const steps = [
    {
      title: 'Informações pessoais',
      description: 'Preencha as informações pessoais',
    },
    {
      title: 'Informações de contato',
      description: 'Preencha as informações de contato',
    },
    {
      title: 'Informações de saúde',
      description: 'Preencha as informações de saúde',
    },
  ];

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

  const handleNextStep = async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-patient" noValidate>
        <Header
          subtitle="voltar a lista de pacientes"
          title="Adicionar Paciente"
          labelRegister="adicionar paciente"
          pathItems={breadcrumbsPathItems}
          goBack={goBack}
        />

        <Card className="mt-4">
          <div className="flex gap-6 p-2">
            <FormProgress currentStep={currentStep} steps={steps} />

            <div className="w-full flex flex-col justify-between">
              {currentStep === 0 && <FormStepOne />}
              {currentStep === 1 && <FormStepTwo />}
              {currentStep === 2 && <FormStepThree />}

              <div className="flex ml-auto gap-2">
                {currentStep > 0 && (
                  <Button
                    label="Anterior"
                    type="button"
                    variable="secondary"
                    icon={<ArrowLeft className="text-white" />}
                    onClick={handlePrevStep}
                  />
                )}
                <Button
                  label="Próximo"
                  type="button"
                  icon={<ArrowRight className="text-white" />}
                  onClick={handleNextStep}
                >
                  Anterior
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </FormContainer>
    </FormProvider>
  );
};

export default PatientForm;
