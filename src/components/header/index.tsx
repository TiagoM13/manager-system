import React from 'react';

import { CaretLeft } from '@phosphor-icons/react';

import { Divider } from '@/components';

import { Breadcrumb } from './components/breadcrumb';
import { ButtonAction } from './components/button-actions';
import { HeaderProps } from './interfaces';

import { HeaderContainer } from './styles';

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
  return (
    <>
      <HeaderContainer>
        <div className="flex items-center gap-2">
          {!!goBack && (
            <button
              type="button"
              onClick={goBack}
              data-testid="btn-cancel"
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

        <ButtonAction
          onRegister={onRegister}
          isSubmit={isSubmit}
          actionLabel={actionLabel}
          loading={loading}
        />
      </HeaderContainer>

      <Divider />

      {breadcrumbItems && <Breadcrumb breadcrumbItems={breadcrumbItems} />}
    </>
  );
};
