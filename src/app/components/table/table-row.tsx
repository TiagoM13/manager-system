import React from 'react';

type TableRowProps = React.ComponentProps<'tr'> & {
  hoverable?: boolean
}

export const TableRow: React.FC<TableRowProps> = ({ hoverable, ...props }) => {
  return <tr {...props} className={`h-16 border-b border-b-slate-300 ${hoverable ? 'hover:bg-sky-50 cursor-pointer' : null}`} />;
}
