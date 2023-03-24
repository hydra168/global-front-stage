import { loadView_mobile } from '@UTILS';
/**
 * 電子遊藝大廳
 */
export default [
  {
    path: '/slotLobby',
    name: 'slotLobby',
    component: loadView_mobile('slotLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
