import React from 'react';

type Option = {
  id: number;
  label: string;
};

export interface ISelectProps {
  className?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  options?: Option[];
  defaultOptions?: [];
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  showValue?: boolean;
  labelAs?: string;
  valueAs?: string;
  search_debounce_time?: number;
  shouldUnregister?: boolean;
  isSearchable?: boolean;
  onChange?: (props: any) => void;
}
