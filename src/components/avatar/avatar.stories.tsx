import React from 'react';

import { user } from '@/data/users';
import { Meta, StoryFn } from '@storybook/react';

import { Avatar as AvatarComponent, AvatarProps } from '.';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Avatar: StoryFn<AvatarProps> = () => {
  return (
    <div className="flex gap-4 items-center">
      <AvatarComponent
        imageUrl={user.image_url}
        name={user.name}
        color="dark"
      />

      <AvatarComponent
        imageUrl={user.image_url}
        name={user.name}
        color="light"
        small
      />
    </div>
  );
};
