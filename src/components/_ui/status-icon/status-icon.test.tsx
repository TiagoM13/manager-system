import React from 'react';

import { render, screen } from '@testing-library/react';

import { StatusIcon } from '.';

describe('<StatusIcon/>', () => {
  test('should render loading icon when loading is true', () => {
    const { asFragment } = render(<StatusIcon loading />);

    const loadingIcon = screen.getByTestId('icon-loading');

    expect(loadingIcon).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render check icon when loading is false', () => {
    render(<StatusIcon loading={false} />);

    const checkIcon = screen.getByTestId('icon-check');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should render check icon when loading prop is not provided', () => {
    render(<StatusIcon />);

    const checkIcon = screen.getByTestId('icon-check');
    expect(checkIcon).toBeInTheDocument();
  });
});
