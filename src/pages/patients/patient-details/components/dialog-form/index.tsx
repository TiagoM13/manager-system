import React from 'react';
import { FormProvider } from 'react-hook-form';

import { X } from '@phosphor-icons/react';

import { Button, Dialog, FormContainer, StatusIcon } from '@/components';
import { IPatient } from '@/interfaces';

import {
  ContactInfoForm,
  GeneralInfoForm,
  MedicalInfoForm,
  PatientInfoForm,
} from '../../forms';
import { usePatientFormUpdate } from '../../hooks/patient-form-update';
import { ModalSection } from '../../types/modal';

interface PatientEditSectionDialogProps {
  activeSection: ModalSection | null;
  onClose: () => void;
  patient?: IPatient;
}

export const PatientEditSectionDialog: React.FC<
  PatientEditSectionDialogProps
> = ({ activeSection, onClose, patient }) => {
  const { methods, handleSubmit, submit, reset, isPending } =
    usePatientFormUpdate(patient as IPatient);

  // memos
  const renderIcon = React.useMemo(
    () => <StatusIcon loading={isPending} />,
    [isPending],
  );

  const renderDialogTitle = React.useMemo((): string => {
    switch (activeSection) {
      case 'patient-info':
        return 'Atualizar Informações do Paciente';
      case 'contact-info':
        return 'Atualizar Informações de Contato';
      case 'medical-info':
        return 'Atualizar Informações Médicas';
      case 'general-info':
        return 'Atualizar Informações Gerais';
      default:
        return '';
    }
  }, [activeSection]);

  const renderFormContent = React.useMemo(() => {
    switch (activeSection) {
      case 'patient-info':
        return <PatientInfoForm loading={isPending} />;
      case 'contact-info':
        return <ContactInfoForm loading={isPending} />;
      case 'medical-info':
        return <MedicalInfoForm loading={isPending} />;
      case 'general-info':
        return <GeneralInfoForm loading={isPending} />;
      default:
        return null;
    }
  }, [isPending, activeSection]);

  return (
    <Dialog isOpen={!!activeSection} contentClassNames="max-w-[650px]">
      <FormProvider {...methods}>
        <FormContainer className="p-3" onSubmit={handleSubmit(submit)}>
          <h3 className="font-bold text-xl leading-5">{renderDialogTitle}</h3>

          <div className="mt-6 py-2 grid grid-cols-2 gap-8">
            {renderFormContent}
          </div>

          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              id="cancel"
              type="button"
              variable="danger"
              icon={<X className="size-5" weight="bold" />}
              label="cancelar"
              onClick={() => {
                onClose();
                reset();
              }}
              disabled={isPending}
            />
            <Button
              id="saved"
              type="submit"
              icon={renderIcon}
              className="min-w-[100px]"
              label="atualizar"
              disabled={isPending}
            />
          </div>
        </FormContainer>
      </FormProvider>
    </Dialog>
  );
};
