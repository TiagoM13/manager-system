import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Check, X } from '@phosphor-icons/react';

import { Dialog, FormContainer, Button } from '@/components';

import { usePatientEditSectionDialogModel } from './patient-edit-section-dialog.model';

type Props = ReturnType<typeof usePatientEditSectionDialogModel> & {
  activeSection: boolean;
  renderDialogTitle: string;
  renderFormContent: React.ReactNode;
  onClose: () => void;
};

export const PatientEditSectionDialogView: React.FC<Props> = (props) => {
  const {
    methods,
    handleSubmit,
    handleUpdatePatient,
    isPending,
    activeSection,
    renderDialogTitle,
    renderFormContent,
    onClose,
  } = props;

  return (
    <Dialog isOpen={activeSection} contentClassNames="max-w-[650px]">
      <FormProvider {...methods}>
        <FormContainer
          className="p-3"
          onSubmit={handleSubmit(handleUpdatePatient)}
        >
          <h3 className="font-bold text-xl leading-5">{renderDialogTitle}</h3>

          <div className="mt-6 py-2 grid grid-cols-2 gap-8">
            {renderFormContent}
          </div>

          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              id="cancel"
              type="button"
              variable="danger"
              icon={<X className="size-4" weight="bold" />}
              label="cancelar"
              onClick={() => {
                onClose();
                methods.reset();
              }}
              disabled={isPending}
            />
            <Button
              id="saved"
              type="submit"
              icon={<Check className="size-4" weight="bold" />}
              className="min-w-[100px]"
              label="atualizar"
              disabled={isPending}
              loading={isPending}
            />
          </div>
        </FormContainer>
      </FormProvider>
    </Dialog>
  );
};
