import React from 'react';

import { SignOut } from '@phosphor-icons/react';

import { user } from '@/__mocks__';
import { UserProfile } from '@/components';
import { menus } from '@/utils';

import { MenuItem } from '../menu-item';

export const SideBar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <div className="ml-1 p-2">
        <UserProfile
          color="light"
          name={user.name}
          email={user.email}
          imageUrl={user.image_url}
          small
        />

        <div className="mt-12 space-y-6">
          {menus.map((menu, index) => (
            <MenuItem
              onClose={onClose}
              key={`${menu.title}-${index}`}
              title={menu.title}
              icon={menu.icon}
              url={menu.url}
            />
          ))}
        </div>

        <button
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
