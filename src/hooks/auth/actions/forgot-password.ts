import { SchemaForgotPasswordType } from '@/pages/auth/auth.schema';
import { useMutation, MutationOptions } from '@tanstack/react-query';

interface UseForgotPasswordProps
  extends Omit<
    MutationOptions<boolean, Error, SchemaForgotPasswordType>,
    'mutationFn'
  > {
  service: (data: SchemaForgotPasswordType) => Promise<boolean>;
}

export const useForgotPassword = ({
  service,
  ...mutationProps
}: UseForgotPasswordProps) => {
  return useMutation<boolean, Error, SchemaForgotPasswordType>({
    mutationFn: (data) => service(data),
    ...mutationProps,
  });
};
