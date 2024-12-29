import { SchemaLoginType } from '@/pages/auth/auth.schema';
import { MutationOptions, useMutation } from '@tanstack/react-query';

interface IUseSignInProps
  extends Omit<MutationOptions<boolean, Error, SchemaLoginType>, 'mutationFn'> {
  service: (data: SchemaLoginType) => Promise<boolean>;
}

export const useSignIn = ({ service, ...mutationProps }: IUseSignInProps) => {
  return useMutation<boolean, Error, SchemaLoginType>({
    mutationFn: (data) => service(data),
    ...mutationProps,
  });
};
