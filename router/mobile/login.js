import { loadView_mobile } from '@UTILS';
/**
 * 登入註冊
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: loadView_mobile('login'),
  },
  {
    path: '/register',
    name: 'register',
    component: loadView_mobile('login'),
  },
];
