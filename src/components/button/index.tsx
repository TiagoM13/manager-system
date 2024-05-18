import React from 'react';

import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.ComponentProps<'button'> & {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  classNames?: string;
};

export const Button: React.FC<ButtonProps> = ({
  id,
  label = 'Salvar',
  icon,
  classNames,
  ...rest
}) => {
  return (
    <button
      {...rest}
      data-testid={`btn-${id}`}
      className={twMerge(
        'rounded-lg bg-sky-600 py-2.5 px-3 font-medium text-sm text-white outline-sky-500 hover:bg-sky-500 disabled:bg-sky-700 flex gap-2 items-center',
        classNames,
      )}
    >
      {!!icon && icon}
      {label}
    </button>
  );
};
