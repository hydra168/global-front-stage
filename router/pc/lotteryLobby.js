import { loadView_pc } from '@UTILS';
/**
 * 彩票大廳
 */
export default [
  {
    path: '/lotteryLobby',
    name: 'lotteryLobby',
    component: loadView_pc('lotteryLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
