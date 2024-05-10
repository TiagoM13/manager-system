import React from 'react';
import { twMerge } from 'tailwind-merge';

type TableCellProps = React.ComponentProps<'td'> & {
  className?: string;
};

export const TableCell: React.FC<TableCellProps> = ({
  className,
  ...props
}) => {
  return (
    <td
      {...props}
      className={twMerge(`text-left text-sm p-2 text-wrap`, className)}
    />
  );
};
