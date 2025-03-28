import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CircleNotch, SignOut, UserCircle } from '@phosphor-icons/react';

import { UserProfile } from '@/components/_ui';
import { useAuth, useCurrentUser } from '@/shared/hooks';
import { menus } from '@/shared/utils';
import { useDialog, useMenu, useMenuProfile } from '@/store';

import { MenuItem } from '../menu-item';

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmDialog } = useDialog();
  const { toggleMenu } = useMenu();
  const { toggle } = useMenuProfile();
  const { logout } = useAuth();
  const user = useCurrentUser();

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
      header: 'Confirmação de Logout',
      message:
        'Você realmente deseja sair da aplicação? Todas as alterações não salvas serão perdidas.',
      acceptLabel: 'sair',
      rejectLabel: 'cancelar',
      acceptIcon: <SignOut className="size-4 text-white" />,
      accept: handleExit,
    });
  }, [confirmDialog, handleExit]);

  return (
    <>
      <div className="ml-1 flex h-full w-full flex-col justify-between p-2">
        <div>
          <UserProfile
            color="light"
            name={user?.name || '-'}
            email={user?.email || '-'}
            imageUrl={user?.image_url || null}
            small
          />

          <div className="mt-12 space-y-6">
            {menus
              .filter((item) => item.roles.includes(user.role))
              .map((menu, index) => (
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
            className="flex gap-2 text-sm text-zinc-400 transition hover:text-sky-500"
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
            className="flex gap-2 text-sm text-zinc-400 transition hover:text-sky-500"
          >
            {loading ? (
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
