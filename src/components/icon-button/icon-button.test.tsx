import React from 'react';

import { Plus } from '@phosphor-icons/react';

import { render } from '@testing-library/react';

import { IconButton } from '.';

describe('<IconButton />', () => {
  test('should render correctly component', () => {
    const { getByTestId } = render(
      <IconButton>
        <Plus data-testid="icon" />
      </IconButton>,
    );

    expect(getByTestId('icon')).toBeTruthy();
  });
});
