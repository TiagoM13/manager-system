import React, { ReactNode } from 'react';

import { CaretLeft, Check, Plus } from '@phosphor-icons/react';

import { Button, Divider, StatusIcon } from '@/components';
import { Breadcrumb } from '@/components/header/components/breadcrumb';

import { HeaderContainer } from './styles';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  breadcrumbItems?: BreadcrumbItem[];
  isSubmit?: boolean;
  goBack?: () => void;
  onRegister?: () => void;
  loading?: boolean;
};

type BreadcrumbItem = {
  label: string | ReactNode;
  path?: string;
  icon?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  goBack,
  breadcrumbItems,
  onRegister,
  isSubmit,
  loading,
  actionLabel,
}) => {
  const renderActionButton = React.useMemo(() => {
    if (onRegister) {
      return (
        <Button
          id="header"
          type="button"
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
          icon={<StatusIcon loading={loading} />}
          label={actionLabel}
        />
      );
    }
  }, [actionLabel, loading, onRegister, isSubmit]);

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
            {subtitle && (
              <span className="text-sm text-slate-600">{subtitle}</span>
            )}
            <h2
              className={`${subtitle ? 'text-2xl' : 'text-3xl'} font-semibold`}
            >
              {title}
            </h2>
          </div>
        </div>

        {renderActionButton}
      </HeaderContainer>

      <Divider />

      {breadcrumbItems && <Breadcrumb pathItems={breadcrumbItems} />}
    </>
  );
};
