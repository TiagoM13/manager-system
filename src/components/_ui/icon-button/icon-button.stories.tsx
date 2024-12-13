import React from 'react';

import { Copy, Plus, Trash } from '@phosphor-icons/react';

import { Meta, StoryFn } from '@storybook/react';

import { IconButton as Button, IconButtonProps } from '.';

export default {
  title: 'Components/IconButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const IconButton: StoryFn<IconButtonProps> = () => {
  return (
    <div className="flex gap-4">
      <Button>
        <Plus className="size-5" />
      </Button>

      <Button>
        <Trash className="size-5" />
      </Button>

      <Button>
        <Copy className="size-5" />
      </Button>
    </div>
  );
};
