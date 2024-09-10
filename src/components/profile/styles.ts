import styled, { css } from 'styled-components';

interface IProfileMenuProps {
  show?: boolean;
}

export const StyledProfileMenu = styled.div<IProfileMenuProps>`
  .content-side-bar {
    position: fixed;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    z-index: 99;
    background-color: var(--black);
    height: 100vh;
    width: 100%;
    max-width: 350px;
    padding: 0.5rem 1rem 1rem;

    ${(props) => css`
      transform: ${props.show ? 'translateX(-100%)' : 'translateX(0%)'};
    `}

    .input-wrapper {
      label {
        color: var(--slate-400);
      }

      input {
        background: var(--slate-900);
        color: #d4d4d8;
      }
    }
  }

  ${(props) =>
    props.show
      ? css`
          .overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            top: 0;
            right: 0;
            left: 0;

            background-color: rgba(0, 0, 0, 0.3);
            z-index: 10;

            transition: all 0.5s ease-in-out;
            overflow-y: auto;
          }
        `
      : null}
`;
