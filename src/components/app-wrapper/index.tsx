import React from 'react';

import { ListDashes, X } from '@phosphor-icons/react';

import { useMenu, useWindowSize } from '@/hooks';

import { SideBar } from './components/sidebar';
import { ToggleButton } from './components/toggle-button';

import { AppBar, Aside, Container, Main, StyledSidebar } from './styles';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Hooks
  const { showMenu, showingActionBar, toggleMenu, toggleSideBar } = useMenu();
  const [width] = useWindowSize();

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
      <AppBar>
        <button onClick={() => toggleMenu()}>
          <ListDashes className="size-8 text-white" weight="bold" />
        </button>
      </AppBar>
      {Number(width) < 960 ? (
        <StyledSidebar showMenu={showMenu}>
          <div ref={sideBarRef} className="overlay"></div>
          <div className="content-side-bar">
            <button
              onClick={() => toggleMenu(false)}
              className="btn-close-sidebar"
              id="btn-close-sidebar"
            >
              <X className="size-4 text-slate-400" weight="bold" />
            </button>
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
      <Main>{children}</Main>
    </Container>
  );
};
