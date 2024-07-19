import React from 'react';

import { X, Check } from '@phosphor-icons/react';

import { Button } from '@/components/button';

import { HeaderProps } from '../../interfaces';

export const HeaderActions: React.FC<HeaderProps> = ({
  onCancel,
  buttonLabels,
  loading,
}) => {
  return (
    <>
      <Button
        id="cancel"
        type="button"
        variable="danger"
        icon={<X className="size-5" weight="bold" />}
        label={buttonLabels?.cancel || 'cancelar'}
        onClick={onCancel}
      />
      <Button
        id="saved"
        type="submit"
        icon={<Check className="size-5" weight="bold" />}
        className="min-w-[100px]"
        label={buttonLabels?.saved || 'salvar'}
        disabled={loading}
      />
    </>
  );
};
