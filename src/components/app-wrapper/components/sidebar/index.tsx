import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SignOut } from '@phosphor-icons/react';

import avatarImageUrl from '@/assets/avatars/avatar-user.jpg';
import { UserProfile } from '@/components';
import { useAuth } from '@/hooks';
import { useDialog } from '@/store';
import { menus } from '@/utils';

import { MenuItem } from '../menu-item';

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { confirmDialog } = useDialog();
  const { getCurrentUser, logout, token } = useAuth();
  const user = getCurrentUser();

  const handleExit = React.useCallback(() => {
    logout();
    navigate('/sign-in');
  }, [logout, navigate]);

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
      <div className="ml-1 p-2">
        <UserProfile
          color="light"
          name={user?.name || '-'}
          email={user?.email || '-'}
          imageUrl={user?.image_url || avatarImageUrl}
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

        <button
          onClick={handleLogout}
          id="btn-signup"
          className="flex gap-2 text-sm text-zinc-400 hover:text-sky-500 transition absolute bottom-8"
        >
          <SignOut className="size-5" />
          <span className="transition-all duration-500 ease-in-out">Sair</span>
        </button>
      </div>
    </>
  );
};
