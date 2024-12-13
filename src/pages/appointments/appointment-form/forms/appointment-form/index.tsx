import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Select, Input, Textarea } from '@/components/_ui';
import { appointmentTypeOptions } from '@/constants/select-options';
import { IAppointment } from '@/interfaces';

interface AppointmentFormProps {
  loading?: boolean;
  isUpdating?: boolean;
  doctors?: {
    label: string;
    value: number;
  }[];
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  loading,
  isUpdating,
  doctors,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IAppointment>();

  return (
    <>
      <h2 className="text-xl font-semibold">
        {isUpdating
          ? 'Atualizar e finalizar o atendimento'
          : 'Preencha as informações de atendimento'}
      </h2>
      <div className="mt-3 grid w-full grid-cols-2 gap-6">
        <Select
          name="appointment_type"
          label="Tipo de atendimento"
          placeholder="Selecione uma opção"
          defaultValue=""
          options={appointmentTypeOptions}
          disabled={loading}
          control={control}
          error={errors.appointment_type}
          required
        />

        <Select
          name="doctor_id"
          label="Médico"
          placeholder="Selecione uma opção"
          options={doctors}
          control={control}
          error={errors.doctor_id}
          disabled={loading}
          loading={loading}
          clearable
          required
        />

        <Input
          type="date"
          name="scheduled_date"
          label="Data da Consulta"
          control={control}
          error={errors.scheduled_date}
          disabled={loading}
          required
        />
      </div>

      {isUpdating && (
        <div className="my-6">
          <Textarea
            name="diagnosis_summary"
            label="Diagnóstico"
            placeholder="Escreva o diagnóstico do paciente..."
            control={control}
            error={errors.diagnosis_summary}
            disabled={loading}
            required
          />
        </div>
      )}
    </>
  );
};
