import React from 'react';

import { Card, InputRadio } from '@/components';
import { Status } from '@/enums';

interface StatusFormProps {
  loading?: boolean;
}

export const StatusForm: React.FC<StatusFormProps> = ({ loading }) => {
  return (
    <Card title="Status do usuário" className="px-6" bordered>
      <div className="py-2 mt-4">
        <InputRadio
          disabled={loading}
          label="Status"
          name="status"
          options={{
            opt1: Status.ACTIVE,
            opt2: Status.INACTIVE,
          }}
        />
      </div>
    </Card>
  );
};
