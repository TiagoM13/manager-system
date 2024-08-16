import React from 'react';

type TableHeaderProps = React.ComponentProps<'th'>;

export const TableHeader: React.FC<TableHeaderProps> = ({ ...props }) => {
  return (
    <th {...props} className="font-bold text-left text-sm p-2 text-wrap" />
  );
};
