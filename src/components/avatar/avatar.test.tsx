import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import { Avatar } from '.';

describe('<Avatar />', () => {
  const avatar = faker.image.avatar();
  const name = faker.person.fullName();

  it('should render correctly component', () => {
    render(<Avatar color="dark" name={name} imageUrl={avatar} />);

    const container = screen.getByTestId('avatar-container');
    const imgTag = screen.getByTestId('image-tag');
    const altText = screen.getAllByAltText(name);

    expect(altText).toBeTruthy();
    expect(imgTag).toHaveAttribute('src', avatar);
    expect(container).toHaveClass('size-16');
    expect(container).toHaveClass('border-slate-700');
  });

  it('should correctly render the color and size in the component', () => {
    render(<Avatar color="light" small name={name} imageUrl={avatar} />);

    const container = screen.getByTestId('avatar-container');

    expect(container).toHaveClass('size-[45px]');
    expect(container).toHaveClass('border-white');
    // should not render class
    expect(container).not.toHaveClass('size-16');
    expect(container).not.toHaveClass('border-slate-700');
  });
});
