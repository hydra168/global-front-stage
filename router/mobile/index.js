import { MOBILE_SHOW_LOGIN_PAGE } from '../../consts';
import login from './login';
import UserCentre from './userCentre'; // 預設個人中心
import HelpCentre from './helpCentre'; // 預設幫助中心
import Promotion from './promotion'; // 優惠活動
import LotteryLobby from './lotteryLobby'; // 彩票大廳
import SlotLobby from './slotLobby'; // 電子大廳
import Games from './games'; // iframe 遊戲畫面
import LineCheck from './lineCheck';

import Announcement from '../../views/mobile/announcement'; // 公告頁面
import Pay from '@G/views/mobile/payConfirm'; // 支付跳轉前頁面

let mobileRoutes = [
  {
    path: '/announcement',
    name: 'announcement',
    component: Announcement,
  },
  {
    path: '/pay/:form',
    name: 'pay',
    meta: {
      requireAuth: false,
    },
    component: Pay,
  },
  ...UserCentre,
  ...HelpCentre,
  ...Promotion,
  ...Games,
  ...LotteryLobby,
  ...SlotLobby,
  ...LineCheck,
];

if (!MOBILE_SHOW_LOGIN_PAGE) {
  mobileRoutes = [...mobileRoutes, ...login];
}
export default mobileRoutes;
