import React from 'react';

import { Check } from '@phosphor-icons/react';

import { LabelContainer } from './styles';

type SelectLabelProps = {
  children: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export const SelectLabel: React.FC<SelectLabelProps> = ({
  children,
  selected,
  onSelect,
}) => {
  return (
    <LabelContainer onClick={onSelect} selectLabel={selected}>
      {children}

      {selected && <Check className="size-5 text-slate-100" weight="bold" />}
    </LabelContainer>
  );
};
