import React from 'react';

import { user } from '@/__mocks__';
import { render, screen } from '@testing-library/react';

import { Avatar } from '.';

describe('<Avatar />', () => {
  it('should render correctly component', () => {
    render(<Avatar color="dark" name={user.name} imageUrl={user.image_url} />);

    const container = screen.getByTestId('avatar-container');
    const imgTag = screen.getByTestId('image-tag');
    const altText = screen.getAllByAltText(user.name);

    expect(altText).toBeTruthy();
    expect(imgTag).toHaveAttribute('src', user.image_url);
    expect(container).toHaveClass('size-16');
    expect(container).toHaveClass('border-slate-700');
  });

  it('should correctly render the color and size in the component', () => {
    render(
      <Avatar color="light" small name={user.name} imageUrl={user.image_url} />,
    );

    const container = screen.getByTestId('avatar-container');

    expect(container).toHaveClass('size-[45px]');
    expect(container).toHaveClass('border-white');
    // should not render class
    expect(container).not.toHaveClass('size-16');
    expect(container).not.toHaveClass('border-slate-700');
  });
});
