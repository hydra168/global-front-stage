import { loadView_pc } from '@UTILS';

/**
 * 優惠活動
 */
export default [
  {
    path: '/promotion/:openIndex',
    name: 'promotionDetail',
    component: loadView_pc('promotion'),
  },
  {
    path: '/promotion',
    name: 'promotion',
    component: loadView_pc('promotion'),
  },
];
