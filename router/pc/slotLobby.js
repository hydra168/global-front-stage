import { loadView_pc } from '@UTILS';
/**
 * 電子遊藝大廳
 */
export default [
  {
    path: '/slotLobby',
    name: 'slotLobby',
    component: loadView_pc('slotLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
