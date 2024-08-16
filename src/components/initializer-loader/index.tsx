import React from 'react';

import { Container } from './styles';

type InitializerLoaderProps = {
  label?: string;
};

export const InitializerLoader: React.FC<InitializerLoaderProps> = ({
  label = 'Carregando...',
}) => {
  return (
    <Container>
      <span data-testid="icon-loader" className="loader"></span>
      <span className="text-2xl text-sky-600 font-medium">{label}</span>
    </Container>
  );
};
