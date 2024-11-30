import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { X, Check } from '@phosphor-icons/react';

import { Card, Button } from '@/components';
import { AppointmentStatus } from '@/enums';
import { AppointmentForm } from '@/pages/appointments/appointment-form/forms';

import { AppointmentDetailsType } from '../../appointment-details.schema';

interface AppointmentDetailsFormProps {
  isLoading: boolean;
  isAppointmentPending: boolean;
  isPendingUpdateAppointmentStatus: boolean;
  isPendingUpdateAppointment: boolean;
  isPending: boolean;
  doctorOptions?: {
    label: string;
    value: number;
  }[];
  methods: UseFormReturn<
    {
      appointment_type: string;
      scheduled_date: Date;
      doctor_id: number;
      diagnosis_summary: string | null;
    },
    any,
    undefined
  >;
  handleCancelAppointment: (values: AppointmentStatus) => Promise<void>;
  submit: (values: AppointmentDetailsType) => Promise<void>;
}

export const AppointmentDetailsForm: React.FC<AppointmentDetailsFormProps> = (
  props,
) => {
  const {
    isLoading,
    isAppointmentPending,
    isPendingUpdateAppointmentStatus,
    isPendingUpdateAppointment,
    isPending,
    doctorOptions,
    methods,
    handleCancelAppointment,
    submit,
  } = props;

  const { handleSubmit } = methods;

  return (
    <Card bordered>
      <div className="flex gap-6 p-2">
        <div className="w-full flex flex-col justify-between">
          <AppointmentForm
            loading={isLoading || isPending}
            isUpdating={isAppointmentPending}
            doctors={doctorOptions}
          />

          <div className="flex ml-auto gap-2 p-2">
            <Button
              type="button"
              variable="danger"
              label="encerrar consulta"
              onClick={() =>
                handleCancelAppointment(AppointmentStatus.CANCELLED)
              }
              icon={<X className="size-5" weight="bold" />}
              className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
              disabled={isLoading || isPending}
              loading={isPendingUpdateAppointmentStatus}
            />

            <Button
              type="button"
              label="finalizar consulta"
              onClick={handleSubmit(submit)}
              icon={<Check className="size-5" weight="bold" />}
              className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
              disabled={isLoading || isPending}
              loading={isPendingUpdateAppointment}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
