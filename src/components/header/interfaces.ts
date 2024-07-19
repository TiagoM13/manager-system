export type PathItemsProps = {
  label: string;
  path?: string;
  icon?: React.ReactNode;
};

export type HeaderProps = {
  title?: string;
  labelAction?: string;
  hasActions?: boolean;
  pathItems?: PathItemsProps[];
  onCancel?: () => void;
  newRegister?: () => void;
  hasRegister?: boolean;
  buttonLabels?: {
    cancel?: string;
    saved?: string;
  };
  loading?: boolean;
};
