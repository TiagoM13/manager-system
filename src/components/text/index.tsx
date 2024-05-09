import React from 'react';

import { TitleContainer } from './styles';

export const TextTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TitleContainer>{children}</TitleContainer>;
};
