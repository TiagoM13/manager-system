import React from 'react';

import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

import { TextTitle } from '.';

describe('<TextTitle />', () => {
  test('should render correctly component', () => {
    const title = faker.lorem.word();
    const { getByText } = render(<TextTitle>{title}</TextTitle>);

    expect(getByText(title)).toBeTruthy();
  });
});
