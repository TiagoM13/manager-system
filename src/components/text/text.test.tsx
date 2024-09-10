import React from 'react';

import { render } from '@testing-library/react';

import { TextTitle } from '.';

describe('<TextTitle />', () => {
  test('should render correctly component', () => {
    const title = 'Teste';
    const { getByText, asFragment } = render(<TextTitle>{title}</TextTitle>);

    expect(getByText(title)).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
