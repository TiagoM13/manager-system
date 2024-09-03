import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import SelectComponent, { StylesConfig } from 'react-select';

import { ErrorMessage } from '../error-message';
import { ISelectProps, Option } from './interface';

import { Container, SelectContent } from './styles';

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

export const Select = <T, Fields extends FieldValues>(
  props: ISelectProps<T, Fields>,
) => {
  const {
    label,
    name,
    required,
    control,
    defaultValue,
    disabled,
    placeholder = 'Selecione uma opção',
    options,
    labelAs,
    valueAs,
    isSearchable = false,
    error,
  } = props;

  const getOptionLabel = (option: any) =>
    labelAs ? option[labelAs] || '' : option.label || '';
  const getOptionValue = (option: any) =>
    valueAs ? option[valueAs] || '' : option.value || '';

  return (
    <Container>
      <label className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <SelectContent>
        <div id="content">
          {control ? (
            <>
              <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                  <SelectComponent
                    {...props}
                    value={
                      options?.find((option) => option.value === value) || null
                    }
                    onChange={(option) =>
                      onChange(option ? option.value : null)
                    }
                    styles={styles}
                    options={options}
                    isDisabled={disabled}
                    placeholder={placeholder}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    isSearchable={isSearchable}
                    className={`${disabled ? 'opacity-60' : 'opacity-100'}`}
                  />
                )}
              />
            </>
          ) : (
            <SelectComponent
              {...props}
              styles={styles}
              options={options}
              isDisabled={disabled}
              placeholder={placeholder}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isSearchable={isSearchable}
              className={`${disabled ? 'opacity-60' : 'opacity-100'}`}
            />
          )}
        </div>
      </SelectContent>

      <ErrorMessage error={error?.message} />
    </Container>
  );
};
