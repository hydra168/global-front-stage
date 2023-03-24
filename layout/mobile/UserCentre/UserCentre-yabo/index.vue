<template>
  <div id="Profile" class="Profile">
    <div class="headerBox">
      <p :class="className">我的</p>
      <div v-for="(item, k) in menuDataFilter2" :key="k" @click="routerPush(item)" class="thenotice">
        <span :class="mailNumber" v-if="mailNumber != 0" />
      </div>
    </div>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <div class="profileBox">
      <div class="titleBox" @click="goProfile()">
        <div>
          <img src="./assets/img/default.png" />
        </div>
        <div>
          <div class="viplevel">
            <div>
              <p>
                {{ userInfo.name }}
              </p>
            </div>
            <div>
              <span>
                <img :src="require(`./assets/img/vip-${this.vipLevelData.current_vip_level}.png`)" />
              </span>
            </div>
          </div>
          <sub>
            加入冠军体育第{{ (Math.abs(Date.now() - new Date(this.userProfileData.created).getTime()) / (1000 * 60 * 60 * 24)).toFixed(0) }}天
          </sub>
        </div>
      </div>
      <div class="privilegesBox" @click="goVipLevel()">
        <div>
          <img src="./assets/img/vipicon.png" />
        </div>
        <div>
          <p>VIP特权</p>
          <sub>VIP PRIVILEGE</sub>
        </div>
      </div>
      <div class="quickChoiceBox">
        <div v-for="(item, k) in quickChoiceBoxData" :key="k" @click="quickPush(item)">
          <div :class="item.className">
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="grandtotalBox" v-if="Number(config.Show_Friend_Event)">
      <div>
        <span>{{ grandtotal.friend }}</span>
        <p>今日好友</p>
      </div>
      <div>
        <span>{{ grandtotal.friendGrandTotal }}</span>
        <p>累計好友</p>
      </div>
      <div>
        <span>{{ grandtotal.redEnvelope }}</span>
        <p>今日紅包</p>
      </div>
      <div>
        <span>{{ grandtotal.redEnvelopeGrandTotal }}</span>
        <p>累計紅包</p>
      </div>
    </div>
    <div class="listBox">
      <div v-for="(item, k) in listBoxData" :key="k" :class="item.className" @click="item.func">
        <p>
          {{ item.info }}
          <span>{{ item.dis }}</span>
        </p>
      </div>
    </div>
    <!-- <v-list dark> -->
    <!-- PF-8195 資金託管描述 -->
    <!-- <v-list-item v-if="fundsDescription">
        <v-list-item-icon>
          <v-icon>local_atm</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> {{ fundsDescription }}ghgjghgjhgßs </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    <!-- 主錢包 -->
    <!-- <v-list-item v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3">
        <v-list-item-icon>
          <v-icon>credit_card</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <span v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3" class="subheading">
              {{ balanceAllInfo['0'].name }} ：¥ <b>{{ balanceAllInfo['0'].balance | money }}</b>
            </span>
            <span v-if="loadBalanceErrorCount > 3">{{ textFilter('loadingError') }}</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ml-auto">
          <div class="ml-auto" :disabled="isLoading || isBalanceLoading" @click="GET_BALANCE_ALL_INFO()">
            <v-icon> sync </v-icon>
          </div>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider> -->

    <!-- 無遊戲錢包時顯示的空白內容 -->
    <!-- <v-list-item v-if="!gameWallet || !gameWalletLabel" class="gameWalletDisplay">
        <v-list-item-icon>
          <v-icon>games</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ gameWalletLabel || textFilter('gameWallet') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ml-auto">
          <v-icon :disabled="isLoading || isBalanceLoading" @click="POST_BALANCE()"> undo </v-icon>
        </v-list-item-action>
      </v-list-item> -->
    <!-- /.無遊戲錢包時顯示的空白內容 -->

    <!-- 遊戲錢包 -->
    <!-- <v-list-group v-else prepend-icon="games" no-action color="white" class="gameWalletDisplay">
        <template v-slot:activator>
          <v-list-item-title class="d-flex align-center">
            <span> {{ gameWalletLabel || textFilter('gameWallet') }} </span>
            <div class="ml-auto" :disabled="isLoading || isBalanceLoading" @click="POST_BALANCE()">
              <v-icon> undo </v-icon>
            </div>
          </v-list-item-title>
        </template>
        <template v-for="(item, i) in gameWallet">
          <v-list-item :key="i" v-if="i != -2 && (i < 201 || i > 230)">
            <template>
              <span v-if="loadBalanceErrorCount <= 3" class="subheading">
                {{ gameWallet[i].name }}：¥ <b>{{ gameWallet[i].balance | money }}</b>
              </span>
              <span v-else-if="loadBalanceErrorCount > 3">{{ textFilter('loadingError') }}</span>
            </template>
          </v-list-item>
        </template>
        <v-list-item v-if="gameWalletSum != null">
          <span class="subheading">
            {{ gameWalletLabel }}：¥ <b>{{ gameWalletSum | money }}</b>
          </span>
        </v-list-item>
      </v-list-group> -->

    <!-- 總出入金 -->
    <!-- <v-list-group prepend-icon="monetization_on" no-action color="white">
        <template v-slot:activator>
          <v-list-item-title>{{ textFilter('totalDepositWithdrawal') }}</v-list-item-title>
          <div class="ml-auto" :disabled="isLoading || isBalanceLoading" @click="GET_BALANCE_TOTAL()">
            <v-icon> sync </v-icon>
          </div>
        </template>
        <template v-for="(item, i) in balance">
          <v-list-item :key="`in_${i}`">
            <span
              >{{ textFilter(`${item.lang}Deposit`).replace(/usdt/gi, item.code) }}
              <template v-if="item.code === 'CNY'">{{ config.unit }} </template>
              {{ item.in | money }}</span
            >
          </v-list-item>
          <v-list-item :key="`out_${i}`">
            <span
              >{{ textFilter(`${item.lang}Withdrawal`).replace(/usdt/gi, item.code) }}
              <template v-if="item.code === 'CNY'">{{ config.unit }} </template>
              {{ item.out | money }}</span
            >
          </v-list-item>
        </template>
      </v-list-group> -->

    <!-- 總盈虧 -->
    <!-- <v-list-item v-if="config.walletProfit && totalProfit != null">
        <v-list-item-icon>
          <v-icon>equalizer</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <span class="subheading">
              {{ textFilter('totalProfit') }} ：¥ <b>{{ totalProfit }}</b>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider> -->
    <!-- </v-list> -->

    <!-- 選單 -->
    <!-- <v-container fluid class="pa-5 menu-list">
      <v-row>
        <v-col :cols="4" v-for="(item, k) in menuDataFilter" :key="k" @click="routerPush(item)" class="pt-0 px-2" :class="item.class">
          <v-card outlined :disabled="isLoading" :class="{ 'card-warning': item.warning }">
            <v-container class="d-flex flex-column align-center">
              <span v-if="item.name == `notice`" class="mail-number">{{ mailNumber }}</span>
              <v-icon :class="`v-icon-${item.icon}`" large> face </v-icon>
              <span class="mt-2 line2 align-center justify-center text-center">{{ textFilter(item.title) }}</span>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->

    <!-- 登出提醒 -->
    <v-dialog v-model="logoutConfirm" max-width="290">
      <v-card>
        <v-card-title>{{ textFilter('dialogTitle') }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgb(77,153,116)" outlined @click="logoutConfirm = !logoutConfirm">
            {{ textFilter('cancelBtn') }}
          </v-btn>
          <v-btn dark color="rgb(77,153,116)" depressed @click="getLogout">
            {{ textFilter('confirmBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ws from '@G/ws';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { MOBILE_USERCENTRE_NEED_REDIRECT, MOBILE_USERCENTRE_MENU_TITLE_DEPOSIT, MOBILE_USERCENTRE_MENU_TITLE_RECORD } from '@G/consts';
import _ from 'lodash';
import { getDate } from './time';

export default {
  name: 'userCentre',
  data() {
    return {
      howMuchDays: '',
      logoutConfirm: false,
      currentWarningKey: '',
      className: 'showBox',
      vipLevelData: {
        list: [],
        current_vip_level: 0,
        next_vip_level: 1,
        current_deposit_amount: 0,
        next_vip_level_conditions: 0,
        vip_period: null,
        vip_mode: 0,
      },
      menuData: [
        {
          class: 'menu_deposit',
          title: MOBILE_USERCENTRE_MENU_TITLE_DEPOSIT,
          name: 'deposit', // 充值
          warning: false,
          icon: 'deposit',
          iconClass: 'primary',
        },
        {
          class: 'menu_withdrawals',
          title: 'menu_withdrawals',
          name: 'withdrawals', // 取款
          warning: false,
          icon: 'withdraw',
          iconClass: 'primary',
        },
        {
          class: 'menu_bankCard',
          title: 'menu_bankCard',
          name: 'bankCard', // 銀行
          warning: false,
          icon: 'bank',
          iconClass: 'primary',
        },
        {
          class: 'menu_profile',
          title: 'menu_profile',
          name: 'profile', // 個人資料
          warning: false,
          icon: 'profile',
          iconClass: 'primary',
        },
        {
          class: 'menu_vip',
          title: 'menu_vip',
          name: 'vipLevel', // VIP等級
          warning: false,
          icon: 'vip',
          iconClass: 'primary',
        },
        {
          class: 'menu_notice',
          title: 'menu_notice',
          name: 'notice', // 通知中心
          warning: false,
          icon: 'mail',
          iconClass: 'primary',
        },
        // {
        //   class: 'menu_modifyPass',
        //   title: 'menu_modifyPass',
        //   name: 'modifyPass', // 包含 登入取款密碼
        //   warning: false,
        //   icon: 'pass',
        //   iconClass: 'primary',
        // },
        {
          class: 'menu_loginPass',
          title: 'menu_loginPass',
          name: 'loginPass', // 登入密碼
          warning: false,
          icon: 'pass',
          iconClass: 'primary',
        },
        {
          class: 'menu_withdrawalsPass',
          title: 'menu_withdrawalsPass',
          name: 'withdrawalsPass', // 取款密碼
          warning: false,
          icon: 'withdrawalsPass',
          iconClass: 'primary',
        },
        {
          class: 'menu_record',
          title: MOBILE_USERCENTRE_MENU_TITLE_RECORD,
          name: 'record', // 包含 存款取款遊戲 紀錄
          warning: false,
          icon: 'tradelog',
          iconClass: 'primary',
        },
        { class: 'menu_agencyCenter', title: 'menu_agencyCenter', name: 'agencyCenter', warning: false, icon: 'agencyCenter' },
        { class: 'menu_logout', title: 'menu_logout', name: 'logout', warning: false, icon: 'logout', iconClass: 'primary' },
      ],
      menuData2: [
        {
          class: 'menu_notice',
          title: 'menu_notice',
          name: 'notice', // 通知中心
          warning: false,
          icon: 'mail',
          iconClass: 'primary',
        },
      ],
      quickChoiceBoxData: [
        {
          className: 'quickChoiceIcon icon1',
          title: '我的钱包',
          url: 'wallets',
        },
        {
          className: 'quickChoiceIcon icon2',
          title: '交易记录',
          url: 'gamerecord',
        },
        {
          className: 'quickChoiceIcon icon3',
          title: '账户管理',
          url: 'bankCard',
        },
        {
          className: 'quickChoiceIcon icon4',
          title: '安全退出',
          url: 'logout',
        },
      ],
      listBoxData: [
        {
          info: '帮助中心',
          className: 'inlist list1',
          dis: '存取款，投注有疑问，看这里',
          url: 'helpCentre',
          func: () => this.ROUTER_PUSH('/helpCentre'),
        },
        {
          info: '关于冠军体育',
          className: 'inlist list2',
          dis: '',
          url: 'about',
          func: () => this.ROUTER_PUSH('/about'),
        },
        {
          info: '打开冠军体育APP',
          className: 'inlist list3',
          dis: '',
          // func: () => this.GET_APP_DOWNLOAD(),
          func: () => this.ROUTER_PUSH('appdownload'),
        },
      ],
    };
  },
  created() {
    this.GET_BALANCE_TOTAL(); // 取得 我的錢包 總出入金
    this.GET_USER_PROFILE(); // 取得個人資料
    this.GET_USER_BANK_LIST(); // 取得銀行卡
    this.SET_CURRENT_MENU_TITLE(this.textFilter('mine'));
    this.GET_GAMES_RECORD_LIST({ page: 1 }); // 取得 游戲纪录总盈亏
    this.GET_VIP_LEVEL();
    this.testData();
    if (Number(this.config.Show_Friend_Event)) {
      this.GET_GRANDTOTAL({ name: this.userInfo.name });
    }
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  computed: {
    ...mapGetters([
      'config',
      'isLoading',
      'balanceTotal',
      'userInfo',
      'isBalanceLoading',
      'balanceAllInfo',
      'loadBalanceErrorCount',
      'userProfileData',
      'userBankList',
      'token',
      'mailNumber',
      'isAgency',
      'locale',
      'gameWalletLabel',
      'gameRecordList',
      'vipLevel',
      'grandtotal',
    ]),
    gameWallet() {
      let obj = _.cloneDeep(this.balanceAllInfo);
      delete obj['0'];
      return obj;
    },
    gameWalletSum() {
      let object = _.cloneDeep(this.balanceAllInfo);
      let totalSum = null;
      const wallet = _.find(object, (item, i) => i >= 201 && i <= 230);
      if (wallet) {
        totalSum = wallet.balance;
      }
      return totalSum;
    },
    menuDataFilter: {
      get() {
        let menu = [];
        const vipEabled = this.config.vip_enable == 1;
        const isAgency = +this.isAgency === 2;
        this.menuData.forEach(i => {
          switch (i.name) {
            case 'vipLevel':
              vipEabled && menu.push(i);
              break;
            case 'agencyCenter':
              isAgency && menu.push(i);
              break;
            default:
              menu.push(i);
          }
        });
        return menu;
      },
    },
    menuDataFilter2: {
      get() {
        let menu = [];
        const vipEabled = this.config.vip_enable == 1;
        const isAgency = +this.isAgency === 2;
        this.menuData2.forEach(i => {
          switch (i.name) {
            case 'vipLevel':
              vipEabled && menu.push(i);
              break;
            case 'agencyCenter':
              isAgency && menu.push(i);
              break;
            default:
              menu.push(i);
          }
        });
        return menu;
      },
    },
    balance() {
      return _.map(this.balanceTotal, (detail, code) => {
        return {
          lang: code === 'CNY' ? 'total' : 'usdtTotal',
          code,
          ...detail,
        };
      });
    },
    totalProfit() {
      // console.log(this.gameRecordList);
      return this.gameRecordList?.sum?.result;
    },
    fundsDescription() {
      try {
        return JSON.parse(this.config?.fundsDescription)[this.locale];
      } catch (e) {
        return null;
      }
    },
  },
  methods: {
    ...mapActions([
      'GET_BALANCE_TOTAL',
      'GET_USER_PROFILE',
      'GET_USER_BANK_LIST',
      'GET_BALANCE_ALL_INFO',
      'POST_BALANCE',
      'GET_LOGOUT',
      'GET_GAMES_RECORD_LIST',
      'GET_VIP_LEVEL',
      'GET_APP_DOWNLOAD',
      'LOCALE_HANDLER',
      'ROUTER_PUSH',
      'GET_GRANDTOTAL',
    ]),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'SET_FULL_WIDTH', 'SET_GRANDTOTAL']),
    getLogout() {
      this.GET_LOGOUT();
      this.logoutConfirm = false;
    },
    routerPush(item) {
      // 登出
      if (item.name == 'logout') {
        this.logoutConfirm = true;
        return;
      }

      // 進入項目前檢查 "姓名" || "取款密碼" || "銀行卡" 是否存在
      if (item.name == 'bankCard' || item.name == 'withdrawals') {
        let redirect = null;
        if (!this.userProfileData.username) {
          redirect = { name: 'profile' };
          this.warningHandler(redirect.name, this.textFilter('errorUsernameNull'));
        } else if (item.name == 'withdrawals' && !this.userInfo.w) {
          // redirect = { name: 'modifyPass', params: { cur: 1 } };
          redirect = { name: 'withdrawalsPass' };
          this.warningHandler(redirect.name, this.textFilter('errorPassNull'));
        } else if (item.name != 'bankCard' && this.userBankList.length === 0) {
          redirect = { name: 'bankCard' };
          this.warningHandler(redirect.name, this.textFilter('errorBankCardNull'));
        }
        if (redirect !== null) {
          if (MOBILE_USERCENTRE_NEED_REDIRECT) {
            setTimeout(() => {
              this.$router.push(redirect);
            }, 300);
          }
        } else {
          this.$router.push({ name: item.name });
        }
      } else {
        this.$router.push({ name: item.name });
      }
    },
    quickPush(item) {
      if (item.url === 'logout') {
        this.logoutConfirm = true;
      } else {
        this.$router.push({ name: item.url });
      }
    },
    listPush(item) {
      this.$router.push({ name: item.url });
    },
    goVipLevel() {
      this.$router.push({ name: 'vipLevel' });
    },
    // 警告提示處理
    warningHandler(warningItme, message) {
      this.menuData.forEach((el, k) => {
        if (el.name === warningItme) {
          el.warning = true;
          this.currentWarningKey = k;
          return false;
        }
      });
      this.SET_MESSAGE({ message, type: 'warning' });
      setTimeout(() => {
        this.menuData[this.currentWarningKey].warning = false;
        this.currentWarningKey = '';
      }, 300);
      return;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_index_');
    },
    goProfile() {
      this.$router.push({ name: 'profile' });
    },
    testData() {
      // const getRegisterDate = new Date(this.userProfileData.created).getTime();
      // const getNowDate = Date.now();
      // const howMuchDays = (Math.abs(getNowDate - getRegisterDate) / (1000 * 60 * 60 * 24)).toFixed(0);
      // const getDate = this.userProfileData.created;
      // let dateList = [
      //   {
      //     date: getDate((current2 - 1000 * 60 * 60 * 24) / 1000, 'mm/dd'),
      //     week: '',
      //     tag: '註冊時間',
      //     stamp: getDate((current2 - 1000 * 60 * 60 * 24) / 1000, 'yy-mm-dd'),
      //   },
      //   {
      //     date: getDate((current - 1000 * 60 * 60 * 24) / 1000, 'mm/dd'),
      //     week: '',
      //     tag: 'yesterday',
      //     stamp: getDate((current - 1000 * 60 * 60 * 24) / 1000, 'yy-mm-dd'),
      //   },
      //   {
      //     date: getDate(current / 1000, 'mm/dd'),
      //     week: '',
      //     tag: 'today',
      //     stamp: getDate(current / 1000, 'yy-mm-dd'),
      //   },
      //   {
      //     date: getDate((current + 1000 * 60 * 60 * 24) / 1000, 'mm/dd'),
      //     week: '',
      //     tag: 'tomorrow',
      //     stamp: getDate((current + 1000 * 60 * 60 * 24) / 1000, 'yy-mm-dd'),
      //   },
      // ];
      // console.log('現在時間', getNowDate, '註冊時間', getRegisterDate, '註冊天數', howMuchDays);
    },
    secondDecimalPlace(val) {
      return parseFloat(val.toFixed(2));
    },
  },
  watch: {
    token() {
      if (this.token !== '' && this.token !== null) {
        ws.initWebSocket();
      } else {
        this.$store.commit('SET_MAIL_NUMBER', '');
        ws.close();
      }
    },
    locale() {
      this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    },
    $route: {
      handler(val) {
        if (val.name === 'userCentre') {
          this.className = 'showBox';
        } else {
          this.className = 'hiddenBox';
        }
      },
      deep: true,
    },
    vipLevel(data) {
      this.vipLevelData = data;
      this.vipLevelData.list = this.vipLevelData.list.map(item => {
        item.level = `VIP${item.vip_level}`;
        // item.daily_count = item.daily_withdraw_count === null ? '-' : this.textFilter('count', { count: item.daily_withdraw_count });
        item.daily_count = item.daily_withdraw_count === null ? '-' : 'count';
        item.amount = item.daily_withdraw_amount === null ? '-' : item.daily_withdraw_amount;
        return item;
      });
      this.currentLevel = `（VIP${this.vipLevelData.current_vip_level}）`;
      this.nextLevel = `VIP${this.vipLevelData.next_vip_level}`;
      this.needDeposit = this.vipLevelData.next_vip_level_conditions - this.vipLevelData.current_deposit_amount;
      this.percentage =
        this.vipLevelData.next_vip_level !== null
          ? this.secondDecimalPlace((this.vipLevelData.current_deposit_amount / this.vipLevelData.next_vip_level_conditions) * 100)
          : 100;
      this.percentage = parseInt(this.percentage) > 100 ? 100 : this.percentage;
      this.mode = this.vipLevelData.vip_mode;
    },
  },
};
</script>

<style lang="scss">
.v-progress-linear {
  height: 1px !important;
  position: absolute;
  z-index: 11;
  top: 53px;
}
.Profile {
  background: rgb(246, 246, 246);
  height: 100vh;
  .headerBox {
    position: relative;
    .thenotice {
      width: 15px;
      height: 15px;
      position: absolute !important;
      position: relative;
      right: 20px;
      top: 20px;
      background: url('./assets/img/notice.png') no-repeat center center/contain;
    }
    .thenotice span {
      position: absolute;
      display: block;
      width: 3px;
      height: 3px;
      right: -20px;
      top: -20px;
      margin: 1em 1em 0 0;
      border-radius: 50%;
      background-color: red;
    }
  }
  .profileBox {
    padding: 20px;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
    background: #fff;
    .titleBox {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
    }
    .titleBox:after {
      content: '';
      display: block;
      position: absolute;
      width: 20px;
      height: 13px;
      right: 0px;
      top: 15px;
      background: url('./assets/img/right-arrow.png') no-repeat center center/contain;
      opacity: 0.7;
    }
    p {
      margin: 1px 0 0 0;
      font-weight: 400;
    }
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    sub {
      bottom: 4px;
      color: rgb(102, 102, 102);
      -webkit-transform: scale(0.83);
      font-size: 10px;
      font-weight: 200;
    }
    .viplevel {
      // background: -webkit-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139)) !important;
      // background: -o-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139)) !important;
      // background: -moz-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139)) !important;
      // background: linear-gradient(to top, rgb(0, 173, 73), rgb(108, 219, 139)) !important;
      // padding: 4px 8px;
      // color: #fff;
      // font-size: 12px;
      // border-radius: 3px;
      // padding: 1px 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      margin: -4px 0 -5px 0;
      img {
        height: 30px;
        width: 30px;
        margin: 2px 0 -4px 2px;
      }
    }
    .privilegesBox {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      margin: 7px;
      padding: 3px 0 0 0;
      border-radius: 10px;
      p {
        font-size: 16px;
        font-weight: 400;
      }
      sub {
        bottom: 7px;
        font-size: 10px;
        -webkit-transform: scale(0.83);
      }
      img {
        width: 38px;
        height: 32px;
        margin-top: 4px;
      }
    }
    .quickChoiceBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px 0;
      p {
        font-size: 12px;
      }
      .quickChoiceIcon {
        height: 30px;
        position: relative;
      }

      .quickChoiceIcon.icon1::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon1.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon2::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon2.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon3::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon3.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon4::before {
        content: '';
        display: block;
        width: 30px;
        height: 25px;
        margin: 7px auto 5px;
        background: url('./assets/img/lougout.png') no-repeat center center/contain;
      }
    }
  }
  .grandtotalBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 10px auto 5px;
    div {
      background: #fff;
      padding: 2px 13px;
      text-align: center;
      border-radius: 4px;
      box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
      span {
        font-size: 36px;
        font-weight: 600;
      }
      p {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }
  }
  .listBox {
    .inlist {
      padding: 15px 25px 15px 50px;
      background: #fff;
      margin: 2px 0;
      position: relative;

      p {
        margin-bottom: 0;
        font-size: 14px;
        span {
          font-size: 12px;
          color: rgb(194, 197, 204);
          display: block;
          position: absolute;
          right: 45px;
          top: 18px;
        }
      }
    }
    .inlist.list1 {
      margin: 10px 0;
    }
    .inlist.list1::before {
      content: '';
      display: block;
      position: absolute;
      left: 25px;
      top: 17px;
      width: 18px;
      height: 18px;
      background: url('./assets/img/listicon1.png') no-repeat center center/contain;
    }
    .inlist.list2::before {
      content: '';
      display: block;
      position: absolute;
      left: 25px;
      top: 17px;
      width: 18px;
      height: 18px;
      background: url('./assets/img/listicon2.png') no-repeat center center/contain;
    }
    .inlist.list3::before {
      content: '';
      display: block;
      position: absolute;
      left: 25px;
      top: 17px;
      width: 18px;
      height: 18px;
      background: url('./assets/img/listicon3.png') no-repeat center center/contain;
    }
  }
  .showBox {
    display: block;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin: 0 !important;
    background: #fff;
    padding: 16px 0 6px;
  }
  .hiddenBox {
    display: none;
  }
  .card-warning {
    background-color: map-get(map-get($colors, warning), base) !important;
  }
  .theme--light.v-card {
    transition: background-color 1s;
  }
  .v-list-item__icon:first-child {
    margin-right: 15px;
  }
  .line2 {
    height: 2.5em;
    display: flex;
  }
  .mail-number {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    right: 0;
    top: 0;
    margin: 1em 1em 0 0;
    border-radius: 50%;
    border: 1px solid red;
    background-color: red;
    color: white;
    font-size: 12px;
  }

  .menu-list {
    .v-icon {
      color: transparent !important;
    }
    $icons: 'bank', 'deposit', 'logout', 'mail', 'pass', 'withdrawalsPass', 'profile', 'tradelog', 'vip', 'withdraw', 'agencyCenter';
    @each $icon in $icons {
      .v-icon-#{$icon} {
        background: url('./assets/icon/#{$icon}.png') no-repeat center/contain;
      }
    }
  }
}
.v-application--is-ltr .v-list-item__action:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: -50px !important;
}
.mdi-chevron-down::before {
  content: '' !important;
}
</style>
