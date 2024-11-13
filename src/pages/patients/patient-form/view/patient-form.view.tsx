import React from 'react';
import { FormProvider } from 'react-hook-form';

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { FormContainer, Header, Card, Button, StatusIcon } from '@/components';
import { BreadcrumbItem } from '@/components/header/interfaces';

import { steps } from '../../utils/constants';
import { FormProgress } from '../components/form-progress';
import { FormStepOne, FormStepTwo, FormStepThree } from '../forms';
import { usePatientFormModel } from '../model/patient-form.model';

type PatientFormViewProps = ReturnType<typeof usePatientFormModel> & {
  handleNextStep: () => Promise<void>;
  breadcrumbsPathItems: BreadcrumbItem[];
  currentStep: number;
  isLastStep: boolean;
  prevStep: () => void;
};

export const PatientFormView: React.FC<PatientFormViewProps> = (props) => {
  const {
    methods,
    goBack,
    IsLoading,
    submit,
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
          subtitle="voltar para lista de pacientes"
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

                <div className="flex ml-auto gap-2 p-2">
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
                      icon={<StatusIcon loading={IsLoading} />}
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
