import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, InputRadio } from '@/components/_ui';
import { Status } from '@/enums';
import { IUser } from '@/interfaces';

interface StatusFormProps {
  loading?: boolean;
  isUpdatingItself: boolean;
}

export const StatusForm: React.FC<StatusFormProps> = ({
  loading,
  isUpdatingItself,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IUser>();

  return (
    <Card title="Status do usuário" className="px-6" bordered>
      <div className="mt-4 py-2">
        <InputRadio
          name="status"
          label="Status"
          control={control}
          options={{
            opt1: Status.ACTIVE,
            opt2: Status.INACTIVE,
          }}
          error={errors.status}
          disabled={loading || isUpdatingItself}
        />
      </div>
    </Card>
  );
};
