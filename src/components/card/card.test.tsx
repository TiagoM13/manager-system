import React from 'react';

import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

import { Card } from '.';

describe('<Card />', () => {
  const children = faker.lorem.text();
  test('should render correctly component', () => {
    const { getByText } = render(<Card>{children}</Card>);

    expect(getByText(children)).toBeInTheDocument();
  });
});
