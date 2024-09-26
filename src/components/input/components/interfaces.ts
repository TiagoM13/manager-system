import { FieldValues, Control, FieldPath, FieldError } from 'react-hook-form';

export interface InputProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: any;
  control?: Control<T>;
  name: FieldPath<T>;
  error?: FieldError | undefined;
  loading?: boolean;
}

export interface InputPasswordProps<T extends FieldValues>
  extends Omit<InputProps<T>, 'mask'> {
  stylesRightButton?: string;
}

export interface InputRadioProps {
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  control?: Control<any>;
  options: {
    opt1: string;
    opt2: string;
  };
  error?: FieldError | undefined;
}

export interface InputSearchProps extends React.ComponentProps<'input'> {
  name?: string;
  control?: Control;
  className?: string;
}

export interface FileUploadInputProps {
  placeholder?: string;
  defaultValue?: string;
  loading?: boolean;
  disabled?: boolean;
  control?: Control;
  error?: FieldError | undefined;
  name: string;
  onChangeFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
