import React from 'react';

import { AppointmentStatus } from '@/enums';
import { render } from '@testing-library/react';

import { StatusActionIcon } from '.';

describe('<StatusActionIcon />', () => {
  it('renders PencilSimple icon for PENDING status', () => {
    const { container, getByTestId } = render(
      <StatusActionIcon status={AppointmentStatus.PENDING} />,
    );
    const icon = getByTestId('icon-edit');

    expect(container.querySelector('svg')).toHaveClass('size-4 text-sky-600');
    expect(icon).toBeInTheDocument();
  });

  it('renders Eye icon for COMPLETED status', () => {
    const { container, getByTestId, asFragment } = render(
      <StatusActionIcon status={AppointmentStatus.COMPLETED} />,
    );
    const icon = getByTestId('icon-view');

    expect(container.querySelector('svg')).toHaveClass('size-4 text-sky-600');
    expect(icon).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
