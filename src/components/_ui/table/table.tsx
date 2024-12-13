import React from 'react';

type TableProps = React.ComponentProps<'table'>;

export const Table: React.FC<TableProps> = ({ ...props }) => {
  return <table {...props} className="mt-2 w-full" />;
};
