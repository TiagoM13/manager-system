import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SignOut, UserCircle } from '@phosphor-icons/react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';

import { UserProfile } from '@/components';
import { useAuth } from '@/hooks';
import { useDialog, useMenu, useMenuProfile } from '@/store';
import { menus } from '@/utils';

import { MenuItem } from '../menu-item';

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmDialog } = useDialog();
  const { toggleMenu } = useMenu();
  const { getCurrentUser, logout } = useAuth();
  const { toggle } = useMenuProfile();
  const user = getCurrentUser();

  const [loading, setLoading] = React.useState(false);

  const handleExit = React.useCallback(async () => {
    setLoading(true);
    const response = await logout();

    if (response) {
      navigate('/sign-in', {
        state: location.state,
        replace: true,
      });
      toggleMenu();
    }
    setLoading(false);
  }, [location.state, logout, navigate, toggleMenu]);

  const handleLogout = React.useCallback(() => {
    confirmDialog({
      header: 'Você esta prestes a sair!',
      message: 'Tem certeza de que deseja sair?',
      acceptLabel: 'confirmar',
      rejectLabel: 'cancelar',
      accept: handleExit,
    });
  }, [confirmDialog, handleExit]);

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full ml-1 p-2">
        <div>
          <UserProfile
            color="light"
            name={user?.name || '-'}
            email={user?.email || '-'}
            imageUrl={user?.image_url || null}
            small
          />

          <div className="mt-12 space-y-6">
            {menus.map((menu, index) => (
              <MenuItem
                key={`${menu.title}-${index}`}
                title={menu.title}
                icon={menu.icon}
                url={menu.url}
              />
            ))}
          </div>
        </div>

        <div className="mb-4 space-y-6">
          {/* edit profile button */}
          <button
            id="btn-edit-profile"
            onClick={() => {
              toggle(true);
              toggleMenu();
            }}
            className="flex gap-2 text-sm text-zinc-400 hover:text-sky-500 transition"
          >
            <div className="flex flex-wrap">
              <UserCircle className="size-5" />
            </div>
            <span className="transition-all duration-500 ease-in-out">
              Perfil
            </span>
          </button>

          {/* logout button */}
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            id="btn-signup"
            className="flex gap-2 text-sm text-zinc-400 hover:text-sky-500 transition"
          >
            {!!loading ? (
              <CircleNotch className="size-5" />
            ) : (
              <SignOut className="size-5" />
            )}
            <span className="transition-all duration-500 ease-in-out">
              Sair
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
