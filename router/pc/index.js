import UserCentre from './userCentre'; // 預設個人中心
import HelpCentre from './helpCentre'; // 預設幫助中心
import Promotion from './promotion'; // 優惠活動
import SlotLobby from './slotLobby'; // 電子遊藝大廳
import LiveLobby from './liveLobby'; // 真人遊戲大廳
import ChessLobby from './chessLobby'; // 棋牌遊戲大廳
import FishLobby from './fishLobby'; // 捕魚遊戲大廳
import LotteryLobby from './lotteryLobby'; // 彩票遊戲大廳
import Games from './games'; // iframe 遊戲畫面
import Appdownload from './appdownload'; // app下載頁
import Installdownload from './installdownload'; // 電腦端下載頁
import LineCheck from './lineCheck';

export default [
  ...UserCentre,
  ...HelpCentre,
  ...Promotion,
  ...SlotLobby,
  ...FishLobby,
  ...LiveLobby,
  ...ChessLobby,
  ...LotteryLobby,
  ...Games,
  ...Appdownload,
  ...Installdownload,
  ...LineCheck,
];
