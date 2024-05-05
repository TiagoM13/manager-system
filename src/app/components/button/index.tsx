import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentProps<'button'> & {
  label: string
  icon?: React.ReactNode
  clasNames?: string
}

export const Button: React.FC<ButtonProps> = ({ label = "Cadastrar", icon, clasNames, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        twMerge(
          'border-0 rounded-lg bg-sky-600 py-2.5 px-4 font-medium text-sm text-white hover:bg-sky-500 flex gap-1.5 items-center',
          clasNames
        )}
    >
      {!!icon && icon}
      {label}
    </button>
  );
}
