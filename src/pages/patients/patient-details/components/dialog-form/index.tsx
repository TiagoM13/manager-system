import React from 'react';

import { Check, CircleNotch, X } from '@phosphor-icons/react';

import { Button, Dialog } from '@/components';

import {
  ContactInfoForm,
  GeneralInfoForm,
  MedicalInfoForm,
  PatientInfoForm,
} from '../../forms';
import { ModalSection } from '../../types/modal';

interface DialogFormProps {
  loading?: boolean;
  section: ModalSection | null;
  onClose: () => void;
}

export const DialogForm: React.FC<DialogFormProps> = ({
  section,
  loading,
  onClose,
}) => {
  const icon = loading ? (
    <CircleNotch
      data-testid="icon-loading"
      weight="bold"
      color="white"
      className="size-5 animate-spin"
    />
  ) : (
    <Check data-testid="icon-check" className="size-5" weight="bold" />
  );

  const renderTitle = React.useMemo((): string => {
    switch (section) {
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
  }, [section]);

  const renderForm = React.useMemo(() => {
    switch (section) {
      case 'patient-info':
        return <PatientInfoForm />;
      case 'contact-info':
        return <ContactInfoForm />;
      case 'medical-info':
        return <MedicalInfoForm />;
      case 'general-info':
        return <GeneralInfoForm />;
      default:
        return null;
    }
  }, [section]);

  return (
    <Dialog isOpen={!!section} contentClassNames="max-w-[650px]">
      <div className="p-3">
        <h3 className="font-bold text-xl leading-5">{renderTitle}</h3>

        <div className="mt-6 py-2 grid grid-cols-2 gap-8">{renderForm}</div>

        <div className="flex items-center justify-end gap-4 mt-8">
          <Button
            id="cancel"
            type="button"
            variable="danger"
            icon={<X className="size-5" weight="bold" />}
            label={'cancelar'}
            onClick={onClose}
          />
          <Button
            id="saved"
            type="submit"
            icon={icon}
            className="min-w-[100px]"
            label="atualizar"
          />
        </div>
      </div>
    </Dialog>
  );
};
