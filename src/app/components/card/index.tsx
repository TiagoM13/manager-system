import React from 'react';

import { Container } from './styles';

type CardProps = {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <Container>{children}</Container>
}
