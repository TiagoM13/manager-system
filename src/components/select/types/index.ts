export type OptionsProps = {
  id: number;
  label: string;
};

export type SelectProps = {
  label?: string;
  placeholder?: string;
  options: OptionsProps[];
  multiSelect?: boolean;
  required?: boolean;
};
