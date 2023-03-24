import { loadView_pc } from '@UTILS';
/**
 * 棋牌大廳
 */
export default [
  {
    path: '/chessLobby',
    name: 'chessLobby',
    component: loadView_pc('chessLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
