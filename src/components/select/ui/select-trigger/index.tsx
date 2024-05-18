import React from 'react';

import { CaretUpDown } from '@phosphor-icons/react';

import { ContentIcon, SelectTriggerContainer } from './styles';

type SelectLabelProps = React.ComponentProps<'button'>;

export const SelectTrigger: React.FC<SelectLabelProps> = ({
  children,
  ...rest
}) => {
  return (
    <SelectTriggerContainer {...rest}>
      {children}
      <ContentIcon>
        <CaretUpDown className="size-5" weight="bold" />
      </ContentIcon>
    </SelectTriggerContainer>
  );
};
