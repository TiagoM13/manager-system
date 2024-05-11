import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Manager System',
    brandUrl: 'https://example.com',
    // brandImage: '/logo.png',
    brandTarget: '_self',

    colorSecondary: '#0ea5e9',

    appBg: '#000000',
    appContentBg: '##cbd5e1',
    appPreviewBg: '#f1f5f9',
    appBorderColor: '#333',
    appBorderRadius: 4,

    textColor: '#cbd5e1',
    textInverseColor: '#94a3b8',

    barTextColor: '#9E9E9E',
    barSelectedColor: '#0284c7',
    barHoverColor: '#0ea5e9',
    barBg: '#f0f0f0',
  }),
});
