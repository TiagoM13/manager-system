import React from 'react';

import { Plus } from '@phosphor-icons/react';

import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button as ButtonComponent, ButtonProps } from '.';

const meta = {
  title: 'Components/Button',
  parameters: {
    layout: 'centered',
  },
  component: ButtonComponent,
  args: { onClick: fn() },
} as Meta;

export default meta;

export const Button: StoryFn<ButtonProps> = () => {
  return <ButtonComponent id="story" label="cadastrar" icon={<Plus />} />;
};
