import { ChartBar, Icon, Users, UsersThree } from '@phosphor-icons/react';

import { Role } from '@/enums';

type Menus = {
  title: string;
  url: string;
  icon: Icon;
  roles: Role[];
};

export const menus: Menus[] = [
  {
    title: 'Dashoboard',
    url: '/dashboard',
    icon: ChartBar,
    roles: [Role.ADMIN, Role.EDITOR, Role.CLINICAL],
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
    roles: [Role.ADMIN],
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: UsersThree,
    roles: [Role.ADMIN, Role.EDITOR, Role.CLINICAL],
  },
];
