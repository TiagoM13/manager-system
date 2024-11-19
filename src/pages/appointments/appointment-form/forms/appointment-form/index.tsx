import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Select, Input } from '@/components';
import { IAppointment } from '@/interfaces';

import { optionsAppointmentType } from '../../utils/options';

export const AppointmentForm: React.FC<{
  loading?: boolean;
  doctors: {
    label: string;
    value: number;
  }[];
}> = ({ loading, doctors }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IAppointment>();

  return (
    <>
      <h2 className="text-xl font-semibold">
        Preencha as informações de atendimento
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Select
          name="appointment_type"
          label="Tipo de atendimento"
          placeholder="Selecione uma opção"
          defaultValue=""
          options={optionsAppointmentType}
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
    </>
  );
};
