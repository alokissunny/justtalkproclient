import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
    {
    title: 'Calender',
    icon: 'ion-ios-calendar-outline',
    link: '/pages/calender',
    home: false,
  },
    {
    title: 'Messages',
    icon: 'nb-email',
    link: '/pages/messages',
    home: false,
  },
  {
    title: 'Favorites',
    icon: 'ion-android-person-add',
     link: '/pages/advisor/fav',
     home: false,
  },
];
export const MENU_ITEMS_ADVISOR: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
    {
    title: 'Calender',
    icon: 'ion-ios-calendar-outline',
    link: '/pages/calender',
    home: false,
  },
    {
    title: 'Messages',
    icon: 'nb-email',
    link: '/pages/messages',
    home: false,
  },
  {
    title: 'Favorites',
    icon: 'ion-android-person-add',
     link: '/pages/advisor/fav',
     home: false,
  },
];
