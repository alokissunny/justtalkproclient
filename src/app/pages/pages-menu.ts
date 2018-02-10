import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
    {
    title: 'Calender',
    icon: 'nb-home',
    link: '/pages/calender',
    home: false,
  },
    {
    title: 'Messages',
    icon: 'nb-home',
    link: '/pages/messages',
    home: false,
  },
  // {
  //   title: 'Recent Contacts',
  //   icon: 'nb-locked'
  //   // link: '/pages/dashboard',
  //   // home: true,
  // },
  {
    title: 'Favorites',
    icon: 'nb-locked',
     link: '/pages/advisor/fav',
    // home: true,
  },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Register As Advisor',
  //       link: '/register',
  //     },
  //   ],
  // },
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
    {
    title: 'Favorites',
    icon: 'nb-locked',
     link: '/pages/advisor/fav',
    // home: true,
  },
];
