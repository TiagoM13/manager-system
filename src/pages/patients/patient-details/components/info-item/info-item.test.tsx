import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import { InfoItem } from '.';

describe('<InfoItem />', () => {
  it('renders the label and value correctly', () => {
    const label = faker.lorem.word();
    const value = faker.lorem.slug();

    const { asFragment } = render(
      <InfoItem label={label} value={value} loading={false} />,
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('shows the loading skeleton when loading is true', () => {
    const label = faker.lorem.word();
    const value = faker.lorem.slug();

    render(<InfoItem label={label} loading={true} />);

    const loading = screen.getByTestId('loading-skeleton');

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.queryByText(value)).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
  });

  it('shows a placeholder ("-") when the value is undefined', () => {
    const label = faker.lorem.word();

    render(<InfoItem label={label} loading={false} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('shows a placeholder ("-") when the value is null', () => {
    const label = faker.lorem.word();

    render(<InfoItem label={label} value={null} loading={false} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('shows a placeholder ("-") when the value is an empty string', () => {
    const label = faker.lorem.word();

    render(<InfoItem label={label} value="" loading={false} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
