import React from 'react';

import { ListDashes, X } from '@phosphor-icons/react';

import { useWindowSize } from '@/hooks';

import { SideBar } from './components/sidebar';
import { ToggleButton } from './components/toggle-button';

import { AppBar, Aside, Container, Main, StyledSidebar } from './styles';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Hooks
  const [width] = useWindowSize();

  // States
  const [showMenu, setShowMenu] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const sideBarRef = React.useRef<HTMLDivElement>(null);

  const isMobile = Number(width) <= 960;

  // Callbacks
  const toggleMenu = React.useCallback((show?: boolean) => {
    setShowMenu((prevState) =>
      typeof show !== 'undefined' ? show : !prevState,
    );
  }, []);

  // Memo
  const renderSideBar = React.useMemo(
    () => <SideBar onClose={() => toggleMenu()} />,
    [toggleMenu],
  );

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
        setShowMenu(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleToggleSideBar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

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
              onClick={() => setShowMenu(false)}
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
          <Aside isSidebarOpen={isSidebarOpen}>{renderSideBar}</Aside>
          <ToggleButton
            toggleSideBar={handleToggleSideBar}
            isOpen={isSidebarOpen}
          />
        </div>
      )}
      <Main>{children}</Main>
    </Container>
  );
};
