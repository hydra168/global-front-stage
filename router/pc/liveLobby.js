import { loadView_pc } from '@UTILS';
/**
 * 電子遊藝大廳
 */
export default [
  {
    path: '/liveLobby',
    name: 'liveLobby',
    component: loadView_pc('liveLobby'),
    meta: {
      requireAuth: true,
    },
  },
];
