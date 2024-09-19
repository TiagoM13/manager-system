import React, { ReactNode } from 'react';

import { CaretLeft, Plus } from '@phosphor-icons/react';

import { Button, Divider } from '@/components';
import { Breadcrumb } from '@/components/header/components/breadcrumb';

import { HeaderContainer } from './styles';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  labelRegister?: string;
  pathItems?: PathItemsProps[];
  goBack?: () => void;
  onRegister?: () => void;
  loading?: boolean;
};

type PathItemsProps = {
  label: string | ReactNode;
  path?: string;
  icon?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  goBack,
  pathItems,
  onRegister,
  labelRegister: labelAction = 'adicionar',
}) => {
  return (
    <>
      <HeaderContainer>
        <div className="flex items-center gap-2">
          {!!goBack && (
            <button
              type="button"
              onClick={goBack}
              className="bg-slate-300 rounded-md p-2 hover:brightness-95"
            >
              <CaretLeft className="size-8" />
            </button>
          )}
          <div>
            <span className="text-sm text-slate-600">{subtitle}</span>
            <h2 className="text-3xl font-semibold">{title}</h2>
          </div>
        </div>

        {!!onRegister && (
          <Button
            id="header"
            type="button"
            icon={<Plus className="size-5" weight="bold" />}
            label={labelAction}
            onClick={onRegister}
          />
        )}
      </HeaderContainer>

      <Divider />

      {pathItems && <Breadcrumb pathItems={pathItems} />}
    </>
  );
};
