import { ReactNode } from 'react';

export type BreadcrumbItem = {
  label: string | ReactNode;
  path?: string;
  icon?: React.ReactNode;
};
