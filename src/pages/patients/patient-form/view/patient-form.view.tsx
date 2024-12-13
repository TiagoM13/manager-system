import React from 'react';
import { FormProvider } from 'react-hook-form';

import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react';

import { Header } from '@/components';
import { FormContainer, Card, Button } from '@/components/_ui';
import { BreadcrumbItem } from '@/interfaces';

import { steps } from '../../utils/constants';
import { FormProgress } from '../components/form-progress';
import { FormStepOne, FormStepTwo, FormStepThree } from '../forms';
import { usePatientFormModel } from '../model/patient-form.model';

type PatientFormViewProps = ReturnType<typeof usePatientFormModel> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const PatientFormView: React.FC<PatientFormViewProps> = (props) => {
  const {
    methods,
    goBack,
    isPending,
    handleCreateNewPatient,
    handleSubmit,
    handleNextStep,
    breadcrumbsPathItems,
    currentStep,
    isLastStep,
    prevStep,
  } = props;

  return (
    <FormProvider {...methods}>
      <FormContainer id="form-patient" noValidate>
        <Header
          title="Adicionar Paciente"
          breadcrumbItems={breadcrumbsPathItems}
          goBack={() => goBack('/patients')}
        />

        <div className="max-w-[1440px]">
          <Card bordered className="mt-4">
            <div className="flex gap-6 p-2">
              <FormProgress currentStep={currentStep} steps={steps} />

              <div className="flex w-full flex-col justify-between">
                {currentStep === 0 && <FormStepOne />}
                {currentStep === 1 && <FormStepTwo />}
                {isLastStep && <FormStepThree />}

                <div className="ml-auto flex gap-2 p-2">
                  {currentStep > 0 && (
                    <Button
                      label="anterior"
                      type="button"
                      variable="secondary"
                      icon={<ArrowLeft className="size-4 text-white" />}
                      onClick={prevStep}
                      disabled={isPending}
                      className="min-w-28 justify-between px-4"
                    />
                  )}
                  {isLastStep ? (
                    <Button
                      label="finalizar"
                      type="button"
                      loading={isPending}
                      disabled={isPending}
                      icon={<Check className="size-4" weight="bold" />}
                      className="min-w-28 justify-between px-4"
                      onClick={handleSubmit(handleCreateNewPatient)}
                    />
                  ) : (
                    <Button
                      label="próximo"
                      type="button"
                      disabled={isPending}
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
