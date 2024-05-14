import React from 'react';

import { Status, UserTypes } from '@/enums';
import { render } from '@testing-library/react';

import { Badge } from '.';

describe('<Badge />', () => {
  test('should render correctly component', () => {
    const { getByTestId, getByText } = render(<Badge type={UserTypes.ADMIN} />);

    const container = getByTestId('badge-container');

    expect(getByText(UserTypes.ADMIN)).toBeTruthy();
    expect(container).toHaveClass('bg-purple-500');
  });

  test('should render correctly className', () => {
    const { getByTestId, getByText } = render(
      <Badge type={UserTypes.EDITOR} />,
    );

    const container = getByTestId('badge-container');

    expect(getByText(UserTypes.EDITOR)).toBeTruthy();
    expect(container).toHaveClass('bg-blue-500');
    expect(container).not.toHaveClass('bg-purple-500');
  });

  test('should render correctly status active', () => {
    const { getByTestId, getByText, queryAllByText } = render(
      <Badge type={Status.ACTIVE} />,
    );

    const container = getByTestId('badge-container');

    expect(getByText(Status.ACTIVE)).toBeTruthy();
    expect(queryAllByText(Status.INACTIVE).length).not.toBeTruthy();
    expect(container).toHaveClass('bg-emerald-400');
    expect(container).not.toHaveClass('bg-slate-300');
  });
});
