import { loadView_mobile } from '@UTILS';
/**
 * 個人中心
 *  */
export default [
  {
    path: '/userCentre',
    name: 'userCentre',
    component: loadView_mobile('index', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 個人訊息
   */
  {
    path: 'profile',
    name: 'profile',
    component: loadView_mobile('profile', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'notice',
    name: 'notice',
    component: loadView_mobile('notice', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'bankCard',
    name: 'bankCard',
    component: loadView_mobile('bankCard', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'modifyPass/:cur',
    name: 'modifyPass',
    component: loadView_mobile('modifyPass', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'loginPass',
    name: 'loginPass',
    component: loadView_mobile('loginPass', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'withdrawalsPass',
    name: 'withdrawalsPass',
    component: loadView_mobile('withdrawalsPass', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'vipLevel',
    name: 'vipLevel',
    component: loadView_mobile('vipLevel', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 個人錢包
   */
  {
    path: 'deposit',
    name: 'deposit',
    component: loadView_mobile('deposit', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'deposit/third/:form',
    name: 'third',
    component: loadView_mobile('third', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'withdrawals',
    name: 'withdrawals',
    component: loadView_mobile('withdrawals', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: 'wallets',
    name: 'wallets',
    component: loadView_mobile('wallets', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 交易紀錄
   */
  {
    path: 'record',
    name: 'record',
    component: loadView_mobile('record', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   *投注紀錄
   */
  {
    path: 'gamerecord',
    name: 'gamerecord',
    component: loadView_mobile('gamerecord', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 代理中心
   */
  {
    path: 'agencyCenter',
    name: 'agencyCenter',
    component: loadView_mobile('agencyCenter', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 關於我們
   */
  {
    path: 'about',
    name: 'about',
    component: loadView_mobile('about', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * VIP詳情
   */
  {
    path: 'vipDetail',
    name: 'vipDetail',
    component: loadView_mobile('vipDetail', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
  /**
   * 改版支付
   */
  {
    path: 'newDeposit',
    name: 'newDeposit',
    component: loadView_mobile('newDeposit', 'userCentre'),
    meta: {
      requireAuth: true,
    },
  },
];
