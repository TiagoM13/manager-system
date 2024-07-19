import React from 'react';

import { Plus } from '@phosphor-icons/react';

import { Button, TextTitle } from '@/components';

import { HeaderActions } from './components/actions';
import { Breadcrumb } from './components/breadcrumb';
import { HeaderProps } from './interfaces';

import { HeaderContainer } from './styles';

export const Header: React.FC<HeaderProps> = ({
  title,
  labelAction = 'Cadastrar',
  hasActions = false,
  pathItems,
  onCancel,
  hasRegister = true,
  newRegister,
  buttonLabels,
  loading = false,
}) => {
  return (
    <HeaderContainer>
      <div className="flex flex-col">
        <TextTitle>{title}</TextTitle>

        {pathItems && <Breadcrumb pathItems={pathItems} />}
      </div>

      <div className="flex gap-4 items-end">
        {hasRegister && (
          <Button
            id="header"
            type="button"
            icon={<Plus className="size-5" weight="bold" />}
            label={labelAction}
            onClick={newRegister}
          />
        )}

        {hasActions && (
          <HeaderActions
            loading={loading}
            onCancel={onCancel}
            buttonLabels={buttonLabels}
          />
        )}
      </div>
    </HeaderContainer>
  );
};
