import React from 'react';

import { ListDashes } from '@phosphor-icons/react';

import { useIsAuthenticated, useWindowSize } from '@/hooks';
import { useMenu, useMenuProfile } from '@/store';

import { CloseButton } from '../icon-button';
import { Profile } from '../profile';
import { SideBar } from './components/sidebar';
import { ToggleButton } from './components/toggle-button';

import { AppBar, Aside, Container, Main, StyledSidebar } from './styles';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Hooks
  const { showMenu, showingActionBar, toggleMenu, toggleSideBar } = useMenu();
  const { show } = useMenuProfile();
  const [width] = useWindowSize();
  const isAuthenticated = useIsAuthenticated();

  const sideBarRef = React.useRef<HTMLDivElement>(null);

  const isMobile = Number(width) <= 960;

  // Memo
  const renderSideBar = React.useMemo(() => <SideBar />, []);

  // Effects
  React.useEffect(() => {
    if (isMobile) {
      toggleMenu(false);
    }
  }, [isMobile, toggleMenu]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        sideBarRef.current.contains(event.target as Node)
      )
        toggleMenu(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleMenu]);

  return (
    <Container>
      {isAuthenticated && (
        <>
          <AppBar>
            <button onClick={() => toggleMenu()}>
              <ListDashes className="size-8 text-white" weight="bold" />
            </button>
          </AppBar>
          {Number(width) < 960 ? (
            <StyledSidebar showMenu={showMenu}>
              <div ref={sideBarRef} className="overlay"></div>
              <div className="content-side-bar">
                <CloseButton
                  id="btn-close-sidebar"
                  onClick={() => toggleMenu(false)}
                />
                {renderSideBar}
              </div>
            </StyledSidebar>
          ) : (
            <div className="relative">
              <Aside showingActionBar={showingActionBar}>{renderSideBar}</Aside>
              <ToggleButton
                toggleSideBar={() => toggleSideBar()}
                showingActionBar={showingActionBar}
              />
            </div>
          )}
        </>
      )}
      <Main
        showMenu={showMenu}
        showingActionBar={showingActionBar}
        isAuthenticated={isAuthenticated}
      >
        {children}
      </Main>
      {isAuthenticated && (
        <>
          <Profile />
        </>
      )}
    </Container>
  );
};
