import React, { ReactNode } from 'react';

import { queryClient } from '@/infra/query';
import { QueryClientProvider } from '@tanstack/react-query';

export const ReactQueryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
