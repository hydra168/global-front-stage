import { loadView_pc } from '@UTILS';
/**
 * 電子遊藝大廳
 */
export default [
  {
    path: '/fishLobby',
    name: 'fishLobby',
    component: loadView_pc('fishLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
