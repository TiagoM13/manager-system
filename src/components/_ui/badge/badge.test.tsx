import React from 'react';

import { ROLE_LABELS } from '@/pages/users/user-form/utils/options';
import { STATUS_LABELS } from '@/shared/constants/labels';
import { Role, Status } from '@/shared/enums';
import { render } from '@testing-library/react';

import { Badge } from '.';

describe('<Badge />', () => {
  test('should render correctly component', () => {
    const { getByTestId, getByText } = render(<Badge type={Role.ADMIN} />);

    const container = getByTestId('badge-container');

    expect(getByText(ROLE_LABELS.ADMIN)).toBeTruthy();
    expect(container).toHaveClass('bg-purple-500');
  });

  test('should render correctly className', () => {
    const { getByTestId, getByText } = render(<Badge type={Role.EDITOR} />);

    const container = getByTestId('badge-container');

    expect(getByText(ROLE_LABELS.EDITOR)).toBeTruthy();
    expect(container).toHaveClass('bg-blue-500');
    expect(container).not.toHaveClass('bg-purple-500');
  });

  test('should render correctly status active', () => {
    const { asFragment, getByTestId, getByText, queryAllByText } = render(
      <Badge type={Status.ACTIVE} />,
    );

    const container = getByTestId('badge-container');

    expect(getByText(STATUS_LABELS.ACTIVE)).toBeTruthy();
    expect(queryAllByText(STATUS_LABELS.INACTIVE).length).not.toBeTruthy();
    expect(container).toHaveClass('bg-emerald-400');
    expect(container).not.toHaveClass('bg-slate-300');

    expect(asFragment()).toMatchSnapshot();
  });
});
