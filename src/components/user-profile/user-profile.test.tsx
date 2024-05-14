import React from 'react';

import { user } from '@/__mocks__';
import { render } from '@testing-library/react';

import { UserProfile } from '.';

describe('<UserProfile />', () => {
  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(
      <UserProfile
        name={user.name}
        email={user.email}
        imageUrl={user.image_url}
        color="light"
      />,
    );

    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.email)).toBeTruthy();
    expect(getByTestId('image-tag')).toHaveAttribute('src', user.image_url);
  });
});
