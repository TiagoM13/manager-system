import React from 'react';

import { Check, Plus } from '@phosphor-icons/react';

import { Button } from '@/components/_ui';

import { HeaderProps } from '../../interfaces';

export const ButtonAction: React.FC<HeaderProps> = ({
  onRegister,
  isSubmit,
  actionLabel,
  loading,
}) => {
  if (onRegister) {
    return (
      <Button
        id="header"
        type="button"
        data-testid="btn-header"
        icon={<Plus className="size-5" weight="bold" />}
        label={actionLabel || 'adicionar'}
        onClick={onRegister}
      />
    );
  }

  if (isSubmit) {
    return (
      <Button
        id="btn-submit"
        type="submit"
        data-testid="btn-submit"
        icon={
          <Check data-testid="icon-check" className="size-5" weight="bold" />
        }
        loading={loading}
        disabled={loading}
        label={actionLabel}
      />
    );
  }
};
