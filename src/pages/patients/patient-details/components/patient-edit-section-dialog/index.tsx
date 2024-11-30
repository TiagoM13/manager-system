import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { IPatient } from '@/interfaces';
import { updatePatientService } from '@/services';

import {
  ContactInfoForm,
  GeneralInfoForm,
  MedicalInfoForm,
  PatientInfoForm,
} from '../../forms';
import { ModalSection } from '../../types/modal';
import { usePatientEditSectionDialogModel } from './patient-edit-section-dialog.model';
import { PatientEditSectionDialogView } from './patient-edit-section-dialog.view';

interface PatientEditSectionDialogProps {
  activeSection: ModalSection | null;
  onClose: () => void;
  patient?: IPatient;
}

export const PatientEditSectionDialog: React.FC<
  PatientEditSectionDialogProps
> = ({ activeSection, onClose, patient }) => {
  const http = new HttpClient();
  const methods = usePatientEditSectionDialogModel({
    patient,
    updatePatient: (id, data) => updatePatientService(http, id, data),
  });

  const { isPending } = methods;

  // memos

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
    <PatientEditSectionDialogView
      renderDialogTitle={renderDialogTitle}
      renderFormContent={renderFormContent}
      activeSection={!!activeSection}
      onClose={onClose}
      {...methods}
    />
  );
};
