import React from 'react';

import { PencilSimple } from '@phosphor-icons/react';

import { Button } from '@/components';

interface Props {
  onClick?: () => void;
}

export const EditButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      label=""
      onClick={onClick}
      icon={<PencilSimple className="size-4 text-sky-600" weight="bold" />}
      className="p-1"
      clear
    />
  );
};
