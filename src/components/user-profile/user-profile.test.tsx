import React from 'react';

import { user } from '@/__mocks__';
import * as hooksModule from '@/hooks';
import { render } from '@testing-library/react';

import { UserProfile } from '.';

jest.mock('@/hooks');
const useImageLazyLoaderSpy = jest.spyOn(hooksModule, 'useImageLazyLoader');

describe('<UserProfile />', () => {
  beforeEach(() => {
    useImageLazyLoaderSpy.mockReturnValue({
      isLoading: false,
      imgSrc: user.image_url as string,
    });
  });

  test('should render correctly component', () => {
    const { getByText, getByTestId } = render(
      <UserProfile
        name={user.name}
        email={user.email}
        imageUrl={user.image_url || ''}
        color="light"
      />,
    );

    expect(getByText(user.name)).toBeTruthy();
    expect(getByText(user.email)).toBeTruthy();
    expect(getByTestId('image-tag')).toHaveAttribute('src', user.image_url);
  });
});
