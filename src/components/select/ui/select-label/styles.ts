import styled from 'styled-components';

type Props = {
  selectLabel: boolean;
};

export const LabelContainer = styled.label<Props>`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) =>
    props.selectLabel ? 'var(--slate-100)' : 'var(--slate-600)'};

  background-color: ${(props) => (props.selectLabel ? 'var(--sky-500)' : null)};

  cursor: pointer;
  transition: all 0.5s ease-in;

  &:hover {
    background-color: var(--sky-300);
  }
`;
