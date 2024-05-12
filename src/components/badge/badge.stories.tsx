import React from 'react';

import { UserTypes, Status } from '@/enums';
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
          <BadgeComponent type={UserTypes.ADMIN} />
          <BadgeComponent type={UserTypes.EDITOR} />
          <BadgeComponent type={UserTypes.CLINICAL} />
          <BadgeComponent type={UserTypes.NO_TYPE} />
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
