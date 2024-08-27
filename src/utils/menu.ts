import { ChartBar, Icon, Users, UsersThree } from '@phosphor-icons/react';

import { UserTypes } from '@/enums';

type Menus = {
  title: string;
  url: string;
  icon: Icon;
  roles: UserTypes[];
};

export const menus: Menus[] = [
  {
    title: 'Dashoboard',
    url: '/dashboard',
    icon: ChartBar,
    roles: [
      UserTypes.ADMIN,
      UserTypes.NO_TYPE,
      UserTypes.EDITOR,
      UserTypes.CLINICAL,
    ],
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
    roles: [UserTypes.ADMIN],
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: UsersThree,
    roles: [UserTypes.ADMIN, UserTypes.EDITOR, UserTypes.CLINICAL],
  },
];
