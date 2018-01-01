import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Register As Advisor',
        link: '/register',
      },
    ],
  },
];
export const MENU_ITEMS_ADVISOR: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Messages',
    icon: 'nb-home',
    link: '/pages/messages',
    home: false,
  },
  {
    title: 'Calender',
    icon: 'nb-home',
    link: '/pages/calender',
    home: false,
  },
];
