import React from 'react';

import { Button } from '../button';
import { TextTitle } from '../text';

import { HeaderContainer } from './styles';
import { Link } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';

type HeaderProps = {
  title: string
  labelAction?: string
}

export const Header: React.FC<HeaderProps> = ({ title, labelAction = 'Cadastrar' }) => {
  return (
    <HeaderContainer>
      <TextTitle>{title}</TextTitle>

      <Link to="new">
        <Button icon={<Plus className="size-5" />} type='button' label={labelAction} />
      </Link>
    </HeaderContainer>
  );
}
