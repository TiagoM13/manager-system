import React from 'react';
import { Link } from 'react-router-dom';

import { Check, Plus, X } from '@phosphor-icons/react';

import { Button, TextTitle } from '@/components';

import { BreadcrumbContainer, HeaderContainer } from './styles';

type PathItemsProps = {
  label: string;
  path?: string;
};

type HeaderProps = {
  title?: string;
  labelAction?: string;
  hasActions?: boolean;
  pathItems?: PathItemsProps[];
  onCancel?: () => void;
  newRegister?: () => void;
  hasRegister?: boolean;
  buttonLabels?: {
    cancel?: string;
    saved?: string;
  };
  loading?: boolean;
};

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

      {/* content actions */}
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

export const Breadcrumb: React.FC<HeaderProps> = ({ pathItems }) => {
  return (
    <BreadcrumbContainer>
      {pathItems?.map((item, index) => (
        <div key={index}>
          {item.path ? (
            <>
              <Link
                className="hover:text-sky-600 transition-all ease-in-out"
                to={item.path}
              >
                {item.label}
              </Link>
              &gt;
            </>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </BreadcrumbContainer>
  );
};
