import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';

import { Avatar as AvatarComponent, AvatarProps } from '.';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const fakerAvatar = faker.image.avatar();
const fakerName = faker.person.fullName();

export const Avatar: StoryFn<AvatarProps> = () => {
  return (
    <div className="flex gap-4 items-center">
      <AvatarComponent imageUrl={fakerAvatar} name={fakerName} color="dark" />

      <AvatarComponent
        imageUrl={fakerAvatar}
        name={fakerName}
        color="light"
        small
      />
    </div>
  );
};
