import { loadView_pc } from '@UTILS';

export const userCentreChildren = [
  /**
   * 個人訊息
   *  */
  {
    path: 'profile',
    name: 'profile',
    component: loadView_pc('profile', 'userCentre'),
  },
  {
    path: 'profile/changePassword',
    name: 'changePassword',
    component: loadView_pc('profile', 'userCentre'),
  },
  {
    path: 'profile/changeName',
    name: 'changeName',
    component: loadView_pc('profile', 'userCentre'),
  },
  {
    path: 'profile/addCard',
    name: 'addCard',
    component: loadView_pc('profile', 'userCentre'),
  },
  {
    path: 'profile/addWallet',
    name: 'addWallet',
    component: loadView_pc('profile', 'userCentre'),
  },
  {
    path: 'notice',
    name: 'notice',
    component: loadView_pc('notice', 'userCentre'),
  },
  {
    path: 'bankCard',
    name: 'bankCard',
    component: loadView_pc('bankCard', 'userCentre'),
  },
  {
    path: 'loginPass',
    name: 'loginPass',
    component: loadView_pc('loginPass', 'userCentre'),
  },
  {
    path: 'withdrawalsPass',
    name: 'withdrawalsPass',
    component: loadView_pc('withdrawalsPass', 'userCentre'),
  },
  {
    path: 'vipLevel',
    name: 'vipLevel',
    component: loadView_pc('vipLevel', 'userCentre'),
  },
  {
    path: 'vipDetail',
    name: 'vipDetail',
    component: loadView_pc('vipDetail', 'userCentre'),
  },
  /**
   * 個人錢包
   *  */
  {
    path: 'wallet',
    name: 'wallet',
    component: loadView_pc('wallet', 'userCentre'),
  },
  {
    path: 'deposit',
    name: 'deposit',
    component: loadView_pc('deposit', 'userCentre'),
  },
  {
    path: 'withdrawals',
    name: 'withdrawals',
    component: loadView_pc('withdrawals', 'userCentre'),
  },
  /**
   * 交易紀錄
   *  */
  {
    path: 'depositRecord',
    name: 'depositRecord',
    component: loadView_pc('depositRecord', 'userCentre'),
  },
  {
    path: 'withdrawalsRecord',
    name: 'withdrawalsRecord',
    component: loadView_pc('withdrawalsRecord', 'userCentre'),
  },
  {
    path: 'gamesRecord',
    name: 'gamesRecord',
    component: loadView_pc('gamesRecord', 'userCentre'),
  },
  {
    path: 'balanceRecord',
    name: 'balanceRecord',
    component: loadView_pc('balanceRecord', 'userCentre'),
  },
  /**
   * yabo 交易紀錄
   *  */
  {
    path: 'trade-record',
    name: 'tradeRecord',
    component: loadView_pc('balanceRecord', 'userCentre'),
  },
  {
    path: 'bet-record',
    name: 'betRecord',
    component: loadView_pc('gamesRecord', 'userCentre'),
  },
  /**
   * 代理中心
   *  */
  {
    path: 'overview',
    name: 'overview',
    component: loadView_pc('overview', 'userCentre'),
  },
  {
    path: 'agencyPromote',
    name: 'agencyPromote',
    component: loadView_pc('agencyPromote', 'userCentre'),
  },
  {
    path: 'teamManagement',
    name: 'teamManagement',
    component: loadView_pc('teamManagement', 'userCentre'),
  },
  {
    path: 'agencyWallet',
    name: 'agencyWallet',
    component: loadView_pc('agencyWallet', 'userCentre'),
  },
  {
    path: 'agencyDescription',
    name: 'agencyDescription',
    component: loadView_pc('agencyDescription', 'userCentre'),
  },
];

/**
 * 個人中心
 *  */
export default [
  {
    path: '/userCentre',
    name: 'userCentre',
    component: loadView_pc('index', 'userCentre'),
    meta: { requireAuth: true },
    redirect: { name: 'wallet' },
    children: userCentreChildren,
  },
  {
    path: '/depositUsdtHelp',
    name: 'depositUsdtHelp',
    component: loadView_pc('depositUsdtHelp', 'userCentre'),
  },
];
