import React from 'react';

import { AppointmentStatus } from '@/enums';
import { Meta, StoryFn } from '@storybook/react';

import { StatusActionIcon, StatusActionIconProps } from '.';

export default {
  title: 'Components/Icons/StatusActionIcon',
  component: StatusActionIcon,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['PENDING', 'COMPLETED'],
      },
    },
  },
} as Meta;

const Template: StoryFn<StatusActionIconProps> = (args) => (
  <StatusActionIcon {...args} />
);

export const Pending = Template.bind({});
Pending.args = {
  status: AppointmentStatus.PENDING,
};

export const Completed = Template.bind({});
Completed.args = {
  status: AppointmentStatus.CONPLETED,
};
