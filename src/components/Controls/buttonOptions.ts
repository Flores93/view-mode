import {
  Check,
  HouseSimple,
  Pause,
  ShareNetwork,
  SignOut,
} from 'phosphor-react';

export const buttons = [
  {
    label: 'exit',
    icon: SignOut,
    flipIcon: '180deg',
  },
  {
    label: 'change room',
    icon: HouseSimple,
  },
  {
    label: 'views',
    icon: Pause,
  },
  {
    label: 'share',
    icon: ShareNetwork,
  },
  {
    label: 'done',
    icon: Check,
  },
];
