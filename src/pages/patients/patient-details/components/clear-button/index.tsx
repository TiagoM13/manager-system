import React from 'react';

import { PencilSimple } from '@phosphor-icons/react';

import { Button } from '@/components';

export const EditButton: React.FC = () => {
  return (
    <Button
      label=""
      icon={<PencilSimple className="size-4 text-sky-600" weight="bold" />}
      className="p-1 bg-transparent border border-sky-600 hover:bg-sky-100"
    />
  );
};
