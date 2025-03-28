import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, FormContainer, Input, Select } from '@/components/_ui';
import {
  appointmentStatusOptions,
  appointmentTypeOptions,
} from '@/shared/constants/select-options';

import { useAppointmentFiltersModel } from './appointment-filters.model';

type AppointmentFiltersViewProps = ReturnType<
  typeof useAppointmentFiltersModel
> & {
  loading?: boolean;
};

export const AppointmentFiltersView: React.FC<AppointmentFiltersViewProps> = ({
  control,
  errors,
  handleSubmit,
  handleFilterAppointments,
  loading,
}) => {
  return (
    <FormContainer>
      <div className="flex gap-5">
        <div className="flex w-full gap-2.5">
          <Input
            type="text"
            name="name"
            label="Nome do paciente"
            control={control}
            placeholder="Pesquisar pelo nome do paciente"
            disabled={loading}
          />

          <Select
            name="appointment_type"
            label="Tipo de consulta"
            options={appointmentTypeOptions}
            control={control}
            disabled={loading}
            isSearchable
            clearable
            className="text-sm"
          />

          <Input
            name="scheduled_date"
            label="Data da consulta"
            type="date"
            placeholder="Digite uma data"
            max="9999-12-31"
            control={control}
            error={errors.scheduled_date}
            disabled={loading}
          />

          <Select
            name="status"
            label="Status"
            options={appointmentStatusOptions}
            control={control}
            error={errors.status}
            disabled={loading}
            isSearchable
            clearable
          />
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            label="buscar"
            onClick={handleSubmit(handleFilterAppointments)}
            icon={<MagnifyingGlass className="size-4" weight="bold" />}
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </FormContainer>
  );
};
