import React from 'react';

import { render } from '@testing-library/react';

import { ErrorMessage } from '.';

describe('<ErrorMessage/>', () => {
  test('should render correctly component', () => {
    const message = 'Error Message';
    const { getByText, asFragment } = render(<ErrorMessage error={message} />);

    expect(getByText(message)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not render anything when error prop is not provided', () => {
    const { container } = render(<ErrorMessage />);

    expect(container.firstChild).toBeNull();
  });
});
