import { QueryClient } from '@tanstack/react-query';

type invalidateQueriesProps = {
  queryKeys?: string[];
  queryClient: QueryClient;
};

export const invalidateRelatedQueries = ({
  queryKeys,
  queryClient,
}: invalidateQueriesProps) => {
  return () => {
    queryKeys?.forEach((key) =>
      queryClient.invalidateQueries({ queryKey: [key] }),
    );
  };
};
