import React from 'react';

import { OptionsProps } from '../../types';

import { Container, Content } from './styles';

type Props = {
  values: OptionsProps[];
  children: React.ReactNode;
};

export const SelectContent: React.FC<Props> = ({ values, children }) => {
  return (
    <Container>
      <Content length={values.length}>{children}</Content>
    </Container>
  );
};
