import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';

import { Button, TextTitle } from '@/components';

import { HeaderContainer } from './styles';

type HeaderProps = {
  title: string;
  labelAction?: string;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  labelAction = 'Cadastrar',
}) => {
  return (
    <HeaderContainer>
      <TextTitle>{title}</TextTitle>

      <Link to="new">
        <Button
          type="button"
          icon={<Plus className="size-5" weight="bold" />}
          label={labelAction}
        />
      </Link>
    </HeaderContainer>
  );
};
