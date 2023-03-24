import { loadView_mobile } from '@UTILS';

/**
 * ultimate 彩票通道
 */
export default [
  {
    path: '/ultimate',
    name: 'ultimate',
    component: loadView_mobile('gameSlot'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/play/:id',
    name: 'play',
    component: loadView_mobile('gameSlot'),
    meta: {
      requireAuth: true,
    },
  },
];
