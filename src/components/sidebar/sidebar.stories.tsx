import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Meta } from '@storybook/react';

import { Sidebar as SideBarComponent } from '.';

export default {
  title: 'Components/SideBar',
  component: SideBarComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const SideBar = () => {
  return (
    <BrowserRouter>
      <SideBarComponent />
    </BrowserRouter>
  );
};
