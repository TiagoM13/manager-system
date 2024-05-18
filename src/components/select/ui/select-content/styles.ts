import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: -2.5rem;
  width: 100%;
  height: 100%;
  min-width: 180px;
  max-width: 200px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

type ContentProps = {
  length: number;
};

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.125rem;
  background-color: var(--white);

  height: ${(props) => (props.length >= 5 ? '180px' : 'auto')};
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgb(71 85 105 / 0.6),
    0 1px 2px -1px rgb(71 85 105 / 0.6);

  ${(props) => (props.length >= 5 ? 'overflow-y: scroll' : null)}
`;
