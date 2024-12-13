import React from 'react';

import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

import { Card } from '.';

describe('<Card />', () => {
  const children = faker.lorem.sentence(5);
  test('should render correctly component', () => {
    const { getAllByText } = render(<Card>{children}</Card>);

    expect(getAllByText(children)).toBeTruthy();
  });
});
