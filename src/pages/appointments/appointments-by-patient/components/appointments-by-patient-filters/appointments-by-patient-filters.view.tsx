import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { FormContainer, Select, Button, Input } from '@/components/_ui';
import {
  appointmentTypeOptions,
  appointmentStatusOptions,
} from '@/shared/constants/select-options';

import { useAppointmentsByPatientFiltersModel } from './appointments-by-patient-filters.model';

type AppointmentsByPatientFiltersViewProps = ReturnType<
  typeof useAppointmentsByPatientFiltersModel
> & {
  loading?: boolean;
};

export const AppointmentsByPatientFiltersView: React.FC<
  AppointmentsByPatientFiltersViewProps
> = ({ control, errors, loading, onSearch }) => {
  return (
    <FormContainer>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <Select
            name="appointment_type"
            label="Tipo de consulta"
            options={appointmentTypeOptions}
            control={control}
            disabled={loading}
            isSearchable
            clearable
          />

          <Input
            type="date"
            label="Data da consulta"
            name="scheduled_date"
            control={control}
            error={errors.scheduled_date}
            disabled={loading}
            max="9999-12-31"
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

          <div className="flex items-center">
            <Button
              type="button"
              label="buscar"
              onClick={onSearch}
              icon={<MagnifyingGlass className="size-4" weight="bold" />}
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
};
