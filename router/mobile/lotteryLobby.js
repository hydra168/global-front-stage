import { loadView_mobile } from '@UTILS';
/**
 * 彩票列表大廳
 */
export default [
  {
    path: '/lotteryLobby',
    name: 'lotteryLobby',
    component: loadView_mobile('lotteryLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
