import React, { ReactNode } from 'react';

import { queryClient } from '@/infra/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const ReactQueryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isProdution = process.env.VITE_BASE_ENV === 'production';
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {!isProdution && <ReactQueryDevtools initialIsOpen={!isProdution} />}
    </QueryClientProvider>
  );
};
