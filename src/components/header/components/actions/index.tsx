import React from 'react';

import { X, Check, CircleNotch } from '@phosphor-icons/react';

import { Button } from '@/components/button';

import { HeaderProps } from '../../interfaces';

export const HeaderActions: React.FC<HeaderProps> = ({
  onCancel,
  buttonLabels,
  loading,
}) => {
  const icon = loading ? (
    <CircleNotch weight="bold" color="white" className="size-5 animate-spin" />
  ) : (
    <Check className="size-5" weight="bold" />
  );

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
        icon={icon}
        className="min-w-[100px]"
        label={buttonLabels?.saved || 'salvar'}
        disabled={loading}
      />
    </>
  );
};
