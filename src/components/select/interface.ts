import React from 'react';
import {
  Control,
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form';
import { OptionProps, GroupBase } from 'react-select';
import { AsyncProps } from 'react-select/async';

export type Option = {
  value: string;
  label: string;
};

export type SelectOption<T> = React.ComponentType<
  OptionProps<T, false, GroupBase<T>>
>;

export interface ISelectProps<T, Fields extends FieldValues> {
  className?: string;
  control: Control<Fields, unknown>;
  name: Path<Fields>;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: FieldError;
  options?: Option[];
  setValue: UseFormSetValue<Fields>;
  defaultValue?: any;
  defaultOptions?: [];
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  showValue?: boolean;
  labelAs?: string;
  valueAs?: string;
  select_props?: AsyncProps<T, false, GroupBase<T>>;
  onFetch?(inputText: string): Promise<T[]>;
  search_debounce_time?: number;
  optionComponent?: React.ComponentType<OptionProps<T, false, GroupBase<T>>>;
  shouldUnregister?: boolean;
  isSearchable?: boolean;
  onChange?: (props: any) => void;
}
