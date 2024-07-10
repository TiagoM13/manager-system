import React from 'react';

import { user } from '@/__mocks__';
import { Meta, StoryFn } from '@storybook/react';

import { UserProfile as Profile, UserProfileProps } from '.';

export default {
  title: 'Components/UserProfile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const UserProfile: StoryFn<UserProfileProps> = () => {
  return (
    <div className="flex gap-4">
      <div className="rounded-lg bg-slate-600 p-2">
        <Profile
          email={user.email}
          name={user.name}
          imageUrl={user.image_url}
          color="light"
        />
      </div>

      <div className="rounded-lg shadow shadow-black/30 p-2">
        <Profile
          email={user.email}
          name={user.name}
          imageUrl={user.image_url}
          color="dark"
        />
      </div>
    </div>
  );
};
