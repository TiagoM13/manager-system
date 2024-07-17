import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, InputRadio } from '@/components';
import { Status } from '@/enums';
import { IUser } from '@/interfaces';

interface StatusFormProps {
  loading?: boolean;
}

export const StatusForm: React.FC<StatusFormProps> = ({ loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IUser>();

  return (
    <Card title="Status do usuário" className="px-6" bordered>
      <div className="py-2 mt-4">
        <InputRadio
          name="status"
          label="Status"
          control={control}
          options={{
            opt1: Status.ACTIVE,
            opt2: Status.INACTIVE,
          }}
          error={errors.status}
          disabled={loading}
        />
      </div>
    </Card>
  );
};
