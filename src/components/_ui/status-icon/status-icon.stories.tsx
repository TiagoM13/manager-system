import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { StatusIcon } from '.'; // Certifique-se de que o caminho está correto

export default {
  title: 'Components/StatusIcon',
  component: StatusIcon,
} as Meta;

const Template: StoryFn<{ loading?: boolean }> = (args) => (
  <StatusIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  loading: false,
};
