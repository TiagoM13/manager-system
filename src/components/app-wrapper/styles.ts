import styled, { css } from 'styled-components';

interface IMenuBarProps {
  showMenu?: boolean;
  isAuthenticated?: boolean;
  isSidebarOpen?: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const AppBar = styled.header`
  position: fixed;
  width: 100%;
  padding: 0.75rem 1rem;
  height: 60px;
  background-color: var(--black);
  z-index: 10;
  display: none;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  button {
    color: var(--white);

    padding-left: 0.5rem;
  }

  @media (max-width: 960px) {
    display: flex;
  }
`;

export const StyledSidebar = styled.div<IMenuBarProps>`
  .content-side-bar {
    position: absolute;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    z-index: 99;
    background-color: var(--black);
    height: 100vh;
    width: 100%;
    max-width: 260px;
    padding: 0.5rem 1rem 1rem;

    ${(props) => css`
      transform: ${props.showMenu ? 'translateX(0%)' : 'translateX(-100%)'};
    `}
  }

  ${(props) =>
    props.showMenu
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

  .btn-close-sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--slate-400);
    border-radius: 9999px;
    width: 20px;
    height: 20px;

    margin-left: auto;
  }

  .btn-close-side-bar:focus-visible {
    outline-color: var(--sky-500);
  }

  .btn-close-side-bar:hover {
    filter: brightness(0.9);
  }
`;

export const Aside = styled.aside<IMenuBarProps>`
  display: flex;
  flex-direction: column;
  transition: 0.5s all ease-in-out;
  z-index: 99;
  background-color: var(--black);
  height: 100vh;
  padding: 1rem;

  overflow: hidden;
  overflow-y: auto;

  ${(props) => css`
    width: ${props.isSidebarOpen ? '75px' : '260px'};

    #btn-signup span {
      opacity: ${props.isSidebarOpen ? 0 : 1};
      overflow: ${props.isSidebarOpen ? 'hidden' : 'visible'};
    }

    #link-menu span {
      opacity: ${props.isSidebarOpen ? 0 : 1};
      overflow: ${props.isSidebarOpen ? 'hidden' : 'visible'};
    }

    #content-user-profile {
      margin-left: ${props.isSidebarOpen ? '-0.75rem' : null};
    }

    #content-user-profile h4,
    span {
      opacity: ${props.isSidebarOpen ? 0 : 1};
      overflow: ${props.isSidebarOpen ? 'hidden' : 'visible'};
    }
  `}
`;

export const Main = styled.main`
  flex: 1;

  transition: 0.1s all;
  justify-content: center;
  padding: 22px;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 960px) {
    margin-top: 60px;
    padding-bottom: 100px;
  }
`;
