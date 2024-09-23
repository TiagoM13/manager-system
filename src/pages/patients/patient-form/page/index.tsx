import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleNotch,
  House,
  UserPlus,
  UsersFour,
} from '@phosphor-icons/react';

import { Button, Card, FormContainer } from '@/components';
import { IPatient } from '@/interfaces';
import { createPatientService } from '@/services';
import { backWithQuery, toastSuccess } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FormProgress } from '../components/form-progress';
import { Header } from '../components/header';
import { FormStepOne, FormStepThree, FormStepTwo } from '../forms';
import { formSchema } from '../schemas';

const PatientForm: React.FC = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // states
  const [currentStep, setCurrentStep] = React.useState(0);

  // hook form
  const methods = useForm<IPatient>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: formSchema,
  });

  const { handleSubmit, trigger } = methods;

  // constants
  const isLastStep = currentStep === 2;

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

  const breadcrumbsPathItems = [
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
  ];

  // mutation
  const queryClient = useQueryClient();
  const { mutateAsync: createPatient, isPending: IsLoading } = useMutation({
    mutationFn: async (values: IPatient) => createPatientService(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  // callbacks
  const goBack = React.useCallback(() => {
    const from = location.state?.from;
    backWithQuery(navigate, from, from.pathname);
  }, [location.state?.from, navigate]);

  const handleNextStep = React.useCallback(async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [steps.length, trigger]);

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const submit = React.useCallback(
    async (values: IPatient) => {
      if (values) {
        const response = await createPatient(values);

        if (response) {
          toastSuccess('Paciente adicionado com sucesso!');
          navigate('/patients');
        }
      }
    },
    [createPatient, navigate],
  );

  const icon = IsLoading ? (
    <CircleNotch
      data-testid="icon-loading"
      weight="bold"
      color="white"
      className="size-4 animate-spin"
    />
  ) : (
    <Check data-testid="icon-check" className="size-4" weight="bold" />
  );

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-patient" noValidate>
        <Header
          subtitle="voltar a lista de pacientes"
          title="Adicionar Paciente"
          pathItems={breadcrumbsPathItems}
          goBack={goBack}
        />

        <Card bordered className="mt-4">
          <div className="flex gap-6 p-2">
            <FormProgress currentStep={currentStep} steps={steps} />

            <div className="w-full flex flex-col justify-between">
              {currentStep === 0 && <FormStepOne />}
              {currentStep === 1 && <FormStepTwo />}
              {isLastStep && <FormStepThree />}

              <div className="flex ml-auto gap-2">
                {currentStep > 0 && (
                  <Button
                    label="anterior"
                    type="button"
                    variable="secondary"
                    icon={<ArrowLeft className="size-4 text-white" />}
                    onClick={handlePrevStep}
                    className="min-w-28 justify-between px-4"
                  />
                )}
                {isLastStep ? (
                  <Button
                    label="finalizar"
                    type="button"
                    icon={icon}
                    className="min-w-28 justify-between px-4"
                    onClick={handleSubmit(submit)}
                  />
                ) : (
                  <Button
                    label="próximo"
                    type="button"
                    icon={<ArrowRight className="size-4 text-white" />}
                    onClick={handleNextStep}
                    iconPosition="right"
                    className="min-w-28 justify-between px-4"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </FormContainer>
    </FormProvider>
  );
};

export default PatientForm;
