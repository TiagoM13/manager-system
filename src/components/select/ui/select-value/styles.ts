import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.265rem;
`;

type Props = {
  bg?: 'sky-700';
};

export const SelectdItem = styled.span<Props>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;

  ${(props) =>
    props.bg === 'sky-700' ? 'background-color: var(--sky-700)' : null}
`;
