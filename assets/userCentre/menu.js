// 個人中心選單
import {
  PC_CURRENTMENU_USERINFO_TITLE, // 账户信息
  PC_CURRENTMENU_BANKINFO_TITLE, // 银行信息
  PC_CURRENTMENU_MYWALLET_TITLE, // 我的钱包
  PC_CURRENTMENU_DEPOSIT_TITLE, // 我要存款
  PC_CURRENTMENU_WITHDRAWAL_TITLE, // 我要提现
  PC_CURRENTMENU_TRANSACTIONRECORD_TITLE, // 交易记录
  PC_CURRENTMENU_DEPOSITRECORD_TITLE, // 存款记录
  PC_CURRENTMENU_WITHDRAWALRECORD_TITLE, // 取款记录
  PC_CURRENTMENU_GAMERECORD_TITLE, // 游戏纪录
} from '@G/consts';

export const userCentreMenuData = [
  {
    class: 'userCentreMenuData_userInfo',
    title: PC_CURRENTMENU_USERINFO_TITLE,
    icon: 'user-info',
    subMenu: [
      {
        class: 'subMenu_userInfo',
        subTitle: PC_CURRENTMENU_USERINFO_TITLE,
        name: 'profile',
        url: 'profile',
        icon: 'face',
        titleIcon: 'account_box',
      },
      {
        class: 'subMenu_notification',
        subTitle: 'g_common_userCentreMenuData_subMenu_notification',
        name: 'notice',
        url: 'notice',
        icon: 'mail',
        titleIcon: 'mail',
      },
      {
        class: 'subMenu_bankInfo',
        subTitle: PC_CURRENTMENU_BANKINFO_TITLE,
        name: 'bankCard',
        url: 'bankCard',
        icon: 'bank',
        titleIcon: 'account_balance',
      },
      {
        class: 'subMenu_loginPassword',
        subTitle: 'g_common_userCentreMenuData_subMenu_loginPassword',
        name: 'loginPass',
        url: 'loginPass',
        icon: 'pass',
        titleIcon: 'vpn_key',
      },
      {
        class: 'subMenu_withdrawalsPassword',
        subTitle: 'g_common_userCentreMenuData_subMenu_withdrawalsPassword',
        name: 'withdrawalsPass',
        url: 'withdrawalsPass',
        icon: 'withdraw-pass',
        titleIcon: 'vpn_key',
      },
      {
        class: 'subMenu_vip',
        subTitle: 'g_common_userCentreMenuData_subMenu_vip',
        name: 'vipLevel',
        url: 'vipLevel',
        icon: 'vip',
        titleIcon: 'star',
      },
    ],
  },
  {
    class: 'userCentreMenuData_wallet',
    title: PC_CURRENTMENU_MYWALLET_TITLE,
    icon: 'wallet',
    subMenu: [
      {
        class: 'subMenu_wallet',
        subTitle: PC_CURRENTMENU_MYWALLET_TITLE,
        name: 'wallet',
        url: 'wallet',
        icon: 'wallet',
        titleIcon: 'account_balance_wallet',
      },
      {
        class: 'subMenu_deposit',
        subTitle: PC_CURRENTMENU_DEPOSIT_TITLE,
        name: 'deposit',
        url: 'deposit',
        icon: 'deposit',
        titleIcon: 'save_alt',
      },
      {
        class: 'subMenu_withdrawals withdrawalsBtn',
        subTitle: PC_CURRENTMENU_WITHDRAWAL_TITLE,
        name: 'withdrawals',
        url: 'withdrawals',
        icon: 'withdraw',
        titleIcon: 'monetization_on',
      },
    ],
  },
  {
    class: 'userCentreMenuData_record',
    title: PC_CURRENTMENU_TRANSACTIONRECORD_TITLE,
    icon: 'transaction-record',
    subMenu: [
      {
        class: 'subMenu_depositRecord',
        subTitle: PC_CURRENTMENU_DEPOSITRECORD_TITLE,
        name: 'depositRecord',
        url: 'depositRecord',
        icon: 'deposit-log',
        titleIcon: 'save_alt',
      },
      {
        class: 'subMenu_withdrawalRecord',
        subTitle: PC_CURRENTMENU_WITHDRAWALRECORD_TITLE,
        name: 'withdrawalsRecord',
        url: 'withdrawalsRecord',
        icon: 'withdraw-log',
        titleIcon: 'monetization_on',
      },
      {
        class: 'subMenu_gameRecord',
        subTitle: PC_CURRENTMENU_GAMERECORD_TITLE,
        name: 'gamesRecord',
        url: 'gamesRecord',
        icon: 'game-log',
        titleIcon: 'sports_esports',
      },
      {
        class: 'subMenu_balanceRecord',
        subTitle: 'g_common_userCentreMenuData_subMenu_balanceRecord',
        name: 'balanceRecord',
        url: 'balanceRecord',
        icon: 'balance-log',
        titleIcon: 'monetization_on',
      },
    ],
  },
  {
    title: 'g_common_userCentreMenuData_title_agencyCenter',
    name: 'agencyCenter',
    icon: 'agency-center',
    subMenu: [
      { subTitle: 'g_common_userCentreMenuData_subMenu_overview', name: 'overview', url: 'overview', icon: 'overview', titleIcon: 'streetview' },
      {
        subTitle: 'g_common_userCentreMenuData_subMenu_agencyPromote',
        name: 'agencyPromote',
        url: 'agencyPromote',
        icon: 'agency-promote',
        titleIcon: 'group_add',
      },
      {
        subTitle: 'g_common_userCentreMenuData_subMenu_teamManagement',
        name: 'teamManagement',
        url: 'teamManagement',
        icon: 'team-management',
        titleIcon: 'group',
      },
      {
        subTitle: 'g_common_userCentreMenuData_subMenu_agencyWallet',
        name: 'agencyWallet',
        url: 'agencyWallet',
        icon: 'agency-wallet',
        titleIcon: 'folder_shared',
      },
      {
        subTitle: 'g_common_userCentreMenuData_subMenu_agencyDescription',
        name: 'agencyDescription',
        url: 'agencyDescription',
        icon: 'agency-description',
        titleIcon: 'local_library',
      },
    ],
  },
];
