import React from 'react';
import { Controller } from 'react-hook-form';

import { CircleNotch, UploadSimple } from '@phosphor-icons/react';

import { ErrorMessage } from '@/components/_ui';

import { FileUploadInputProps } from './interfaces';

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  placeholder = 'Escolher foto',
  loading = false,
  disabled = false,
  defaultValue,
  onChangeFileSelected,
  control,
  error,
  name,
}) => {
  return (
    <label
      htmlFor={name}
      className={`flex items-center gap-3 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-all duration-500 ease-in focus-visible:bg-sky-600 ${loading || disabled ? 'bg-sky-700' : 'cursor-pointer hover:bg-sky-500'}`}
    >
      {loading ? (
        <CircleNotch
          data-testid="loading-icon"
          weight="bold"
          color="white"
          className="size-5 animate-spin"
        />
      ) : (
        <UploadSimple
          data-testid="upload-icon"
          className="size-5 text-white"
          weight="bold"
        />
      )}

      {placeholder}

      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange } }) => (
            <input
              id={name}
              name={name}
              type="file"
              accept="image/*"
              className="hidden"
              disabled={loading || disabled}
              onChange={(e) => {
                onChange(e);
                onChangeFileSelected(e);
              }}
            />
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={loading || disabled}
          onChange={onChangeFileSelected}
        />
      )}

      <ErrorMessage error={error?.message} />
    </label>
  );
};
