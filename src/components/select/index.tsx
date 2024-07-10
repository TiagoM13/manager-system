/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SelectComponent, { StylesConfig, components } from 'react-select';

import { ISelectProps } from './interface';

import { Container, SelectContent } from './styles';

type Option = {
  id: number;
  label: string;
};

const styles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    minWidth: 160,
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    boxShadow: 'none',
    border: 'none',
    outline: state.isFocused ? `2px solid var(--sky-500)` : 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: '100%',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.875rem',
    backgroundColor: state.isSelected ? '#0284c7' : 'white',
    '&:hover': {
      backgroundColor: state.isSelected ? '#0ea5e9' : '#7dd3fc',
      cursor: 'pointer',
    },
  }),
};

export const Select = (props: ISelectProps) => {
  const {
    label,
    className,
    required,
    defaultOptions,
    disabled,
    placeholder = 'Selecione uma opção',
    clearable = false,
    onChange,
    showValue = true,
    options,
    labelAs,
    valueAs,
    shouldUnregister,
    search_debounce_time = 500,
    isSearchable = false,
  } = props;
  const [value, setValue] = React.useState<Option | null>();

  const getOptionLabel = (option: any) =>
    labelAs ? option[labelAs] || '' : option.label || '';
  const getOptionValue = (option: any) =>
    valueAs ? option[valueAs] || '' : option.id || '';

  const asyncSelectProps = React.useMemo(() => {
    return {
      noOptionsMessage: () => 'Não há opções',
      loadingMessage: () => 'Carregando...',
      className: 'select',
      isDisabled: disabled,
      defaultOptions,
      options,
      value,
      setValue,
      placeholder,
      onChange: onChange,
      isSearchable,
      getOptionLabel,
      getOptionValue,
    };
  }, [
    disabled,
    defaultOptions,
    options,
    placeholder,
    onChange,
    isSearchable,
    getOptionLabel,
    getOptionValue,
  ]);

  return (
    <Container>
      <label className="inline text-sm text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <SelectContent>
        <div id="content">
          <SelectComponent {...asyncSelectProps} styles={styles} />
        </div>
      </SelectContent>
    </Container>
  );
};
