import React from 'react';

type TableProps = React.ComponentProps<'table'>;

export const Table: React.FC<TableProps> = ({ ...props }) => {
  return <table {...props} className="w-full mt-2" />;
};
