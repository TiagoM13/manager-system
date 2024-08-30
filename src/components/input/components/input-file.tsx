import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { CircleNotch, UploadSimple } from '@phosphor-icons/react';

import { ErrorMessage } from '@/components';

interface FileUploadButtonProps {
  placeholder?: string;
  defaultValue?: string;
  loading?: boolean;
  disabled?: boolean;
  control?: Control;
  error?: FieldError | undefined;
  name: string;
  onChangeFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadInput: React.FC<FileUploadButtonProps> = ({
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
      className={`bg-sky-600 flex items-center gap-3 py-2 px-4 rounded-md transition-all ease-in duration-500 focus-visible:bg-sky-600 text-sm font-medium text-white ${loading || disabled ? 'bg-sky-700' : 'hover:bg-sky-500 cursor-pointer'}`}
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
