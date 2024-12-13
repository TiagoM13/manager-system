import React from 'react';

import { Status, Role } from '@/enums';
import { Meta, StoryFn } from '@storybook/react';

import { Badge as BadgeComponent, BadgeProps } from '.';

export default {
  title: 'Components/Badge',
  component: BadgeComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Badge: StoryFn<BadgeProps> = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-center">Tipos de Usuário</h4>
        <div className="flex justify-center gap-2 pt-2">
          <BadgeComponent type={Role.ADMIN} />
          <BadgeComponent type={Role.EDITOR} />
          <BadgeComponent type={Role.CLINICAL} />
        </div>
      </div>

      <div>
        <h4 className="text-center">Status</h4>
        <div className="flex justify-center gap-2 pt-2">
          <BadgeComponent type={Status.ACTIVE} />
          <BadgeComponent type={Status.INACTIVE} />
        </div>
      </div>
    </div>
  );
};
