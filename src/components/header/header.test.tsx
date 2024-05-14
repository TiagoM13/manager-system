import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

import { Header } from '.';

describe('<Header />', () => {
  test('should render correctly component', () => {
    const title = faker.lorem.word();
    const label = faker.lorem.word();

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Header title={title} labelAction={label} />
      </BrowserRouter>,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(label)).toBeTruthy();
    expect(getByTestId('btn-header')).toBeTruthy();
    expect(getByTestId('btn-header')).toHaveAttribute('type', 'button');
  });
});
