import React from 'react';

import { ContainerTitle } from './styles';

export const TextTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContainerTitle>{children}</ContainerTitle>
  );
}
