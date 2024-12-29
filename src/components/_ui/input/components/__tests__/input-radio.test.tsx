import React from 'react';

import { render } from '@testing-library/react';

import { InputRadio } from '../input-radio';

describe('<InputRadio/>', () => {
  test('should render correctly component', () => {
    const opts = {
      opt1: 'Sim',
      opt2: 'Não',
    };

    const labels = {
      label1: 'Sim',
      label2: 'Não',
    };

    const label = 'Teste de seleção';

    const { getByText, asFragment } = render(
      <InputRadio label={label} options={opts} optionLabels={labels} />,
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(labels.label1)).toBeInTheDocument();
    expect(getByText(labels.label2)).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
