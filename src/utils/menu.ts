import { ChartBar, Icon, Users, UsersThree } from '@phosphor-icons/react';

type Menus = {
  title: string;
  url: string;
  icon: Icon;
  roles: number[];
};

export const menus: Menus[] = [
  {
    title: 'Dashoboard',
    url: '/dashboard',
    icon: ChartBar,
    roles: [0, 1, 2, 3],
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
    roles: [0],
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: UsersThree,
    roles: [0, 2, 3],
  },
];
