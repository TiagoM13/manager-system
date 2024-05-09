import React from 'react';

type TableRowProps = React.ComponentProps<'tr'> & {
  hoverable?: boolean
  border?: boolean
}

export const TableRow: React.FC<TableRowProps> = ({ hoverable, border = true, ...props }) => {
  return <tr {...props} className={`h-16 ${border ? 'border-b border-b-slate-300' : null} ${hoverable ? 'hover:bg-sky-50 cursor-pointer' : null}`} />;
}
