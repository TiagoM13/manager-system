import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  background-color: var(--slate-100);

  .loader {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid var(--slate-600);
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border-bottom: 3px solid var(--sky-600);
    border-left: 3px solid transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
