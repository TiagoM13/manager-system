import React from 'react';

import { render } from '@testing-library/react';

import { InputRadio } from '../input-radio';

describe('<InputRadio/>', () => {
  test('should render correctly component', () => {
    const opts = {
      opt1: 'Sim',
      opt2: 'Não',
    };

    const label = 'Teste de seleção';

    const { getByText, asFragment } = render(
      <InputRadio label={label} options={opts} />,
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(opts.opt1)).toBeInTheDocument();
    expect(getByText(opts.opt2)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
