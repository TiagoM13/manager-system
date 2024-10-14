import React from 'react';
import { FormProvider } from 'react-hook-form';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleNotch,
  House,
  UserPlus,
  UsersFour,
} from '@phosphor-icons/react';

import { Button, Card, FormContainer, Header } from '@/components';
import { useAppNavigation } from '@/hooks';

import { FormProgress } from '../components/form-progress';
import { FormStepOne, FormStepThree, FormStepTwo } from '../forms';
import { useFormSteps } from '../hooks/form-steps';
import { usePatientForm } from '../hooks/use-patient-form';
import { steps } from '../utils/constants';

const PatientForm: React.FC = () => {
  // hooks
  const { goBack } = useAppNavigation();
  const { currentStep, isLastStep, prevStep, nextStep } = useFormSteps(steps);
  const { methods, IsLoading, handleSubmit, submit } = usePatientForm();

  // constants
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

  // callbacks
  const handleNextStep = React.useCallback(async () => {
    const isValid = await methods.trigger();
    nextStep(isValid);
  }, [methods, nextStep]);

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
          breadcrumbItems={breadcrumbsPathItems}
          goBack={goBack}
        />

        <div className="max-w-[1440px]">
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
                      onClick={prevStep}
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
        </div>
      </FormContainer>
    </FormProvider>
  );
};

export default PatientForm;
