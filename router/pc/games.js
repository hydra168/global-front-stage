import { loadView_pc } from '@UTILS';
/**
 * ultimate 彩票通道
 */
export default [
  {
    path: '/ultimate',
    name: 'ultimate',
    component: loadView_pc('gameSlot'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/play/:id',
    name: 'play',
    component: loadView_pc('gameSlot'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/promo/:type/:id',
    name: 'promo',
    component: loadView_pc('gameSlot'),
    meta: {
      requireAuth: true,
    },
  },
];
