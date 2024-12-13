import React from 'react';

type TableHeaderProps = React.ComponentProps<'th'>;

export const TableHeader: React.FC<TableHeaderProps> = ({ ...props }) => {
  return (
    <th
      {...props}
      className="text-wrap p-2 text-left text-sm font-bold text-slate-500"
    />
  );
};
