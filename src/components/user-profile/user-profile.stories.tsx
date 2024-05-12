import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';

import { UserProfile as Profile, UserProfileProps } from '.';

export default {
  title: 'Components/UserProfile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const user = {
  email: faker.internet.email().toLocaleLowerCase(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
};

export const UserProfile: StoryFn<UserProfileProps> = () => {
  return (
    <div className="flex gap-4">
      <div className="rounded-lg bg-slate-600 p-2">
        <Profile
          email={user.email}
          name={user.name}
          imageUrl={user.avatar}
          color="light"
        />
      </div>

      <div className="rounded-lg shadow shadow-black/30 p-2">
        <Profile
          email={user.email}
          name={user.name}
          imageUrl={user.avatar}
          color="dark"
        />
      </div>
    </div>
  );
};
