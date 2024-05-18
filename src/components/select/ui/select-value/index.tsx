import React from 'react';

import { X } from '@phosphor-icons/react';

import { OptionsProps, SelectProps } from '../../types';

import { Container, SelectdItem } from './styles';

type SelectValueProps = Omit<SelectProps, 'options'> & {
  selectedOptions: OptionsProps[];
  onRemove: (option: OptionsProps, event: React.MouseEvent) => void;
};

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder,
  multiSelect,
  selectedOptions,
  onRemove,
}) => {
  return (
    <Container>
      {selectedOptions.length > 0 ? (
        selectedOptions.map((option) =>
          multiSelect ? (
            <SelectdItem bg="sky-700" key={option.id}>
              {option.label}
              <button onClick={(event) => onRemove(option, event)}>
                <X className="size-4 text-slate-100" />
              </button>
            </SelectdItem>
          ) : (
            <SelectdItem key={option.label}>{option.label}</SelectdItem>
          ),
        )
      ) : (
        <SelectdItem>{placeholder}</SelectdItem>
      )}
    </Container>
  );
};
