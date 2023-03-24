<template>
  <div id="Profile" class="Profile">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-list dark flat>
      <!-- PF-8195 資金託管描述 -->
      <v-list-item v-if="fundsDescription">
        <v-list-item-icon>
          <v-icon>local_atm</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ fundsDescription }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- 主錢包 -->
      <v-list-item v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3">
        <v-list-item-icon>
          <v-icon>credit_card</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <span v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3" class="subheading">
              {{ balanceAllInfo['0'].name }}：{{ config.unit }} <b>{{ balanceAllInfo['0'].balance | money }}</b>
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

      <!-- 無遊戲錢包時顯示的空白內容 -->
      <v-list-item v-if="!gameWallet" class="gameWalletDisplay">
        <v-list-item-icon>
          <v-icon>games</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ config.Mobile_WalletMenu_Title || textFilter('gameWallet') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ml-auto">
          <v-icon :disabled="isLoading || isBalanceLoading" @click="POST_BALANCE()"> undo </v-icon>
        </v-list-item-action>
      </v-list-item>
      <!-- /.無遊戲錢包時顯示的空白內容 -->

      <!-- 遊戲錢包 -->
      <v-list-group v-else prepend-icon="games" no-action color="white" class="gameWalletDisplay">
        <template v-slot:activator>
          <v-list-item-title class="d-flex align-center">
            <span> {{ config.Mobile_WalletMenu_Title || textFilter('gameWallet') }} </span>
            <div class="ml-auto" :disabled="isLoading || isBalanceLoading" @click="POST_BALANCE()">
              <v-icon> undo </v-icon>
            </div>
          </v-list-item-title>
        </template>
        <v-list-item v-for="(item, i) in gameWallet" :key="i">
          <template>
            <span v-if="loadBalanceErrorCount <= 3" class="subheading">
              {{ gameWallet[i].name }}：{{ config.unit }} <b>{{ gameWallet[i].balance | money }}</b>
            </span>
            <span v-else-if="loadBalanceErrorCount > 3">{{ textFilter('loadingError') }}</span>
          </template>
        </v-list-item>
      </v-list-group>

      <!-- 總出入金 -->
      <v-list-group prepend-icon="monetization_on" no-action color="white">
        <template v-slot:activator>
          <v-list-item-title>{{ textFilter(MOBILE_USERCENTRE_INDEX_TITLE_DEPOSIT_WITHDRAWALS) }}</v-list-item-title>
          <div class="ml-auto" :disabled="isLoading || isBalanceLoading" @click="GET_BALANCE_TOTAL()">
            <v-icon> sync </v-icon>
          </div>
        </template>
        <template v-for="(item, i) in balance">
          <v-list-item :key="`in_${i}`">
            <span>
              {{ textFilter(item.langDeposit).replace(/usdt/gi, item.code) }}：
              <template v-if="item.code === 'CNY'">{{ config.unit }}</template>
              <b> {{ item.in | money }}</b>
            </span>
          </v-list-item>
          <v-list-item :key="`out_${i}`">
            <span>
              {{ textFilter(item.langWithdrawal).replace(/usdt/gi, item.code) }}：
              <template v-if="item.code === 'CNY'">{{ config.unit }}</template>
              <b> {{ item.out | money }}</b>
            </span>
          </v-list-item>
        </template>
      </v-list-group>

      <!-- 總盈虧 -->
      <v-list-item v-if="config.walletProfit && totalProfit != null">
        <v-list-item-icon>
          <v-icon>equalizer</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <span class="subheading">
              {{ textFilter('totalProfit') }}： {{ config.unit }} <b>{{ totalProfit }}</b>
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- 選單 -->
    <v-container fluid class="pa-5 menu-list">
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
    </v-container>

    <!-- 登出提醒 -->
    <v-dialog v-model="logoutConfirm" max-width="290">
      <v-card>
        <v-card-title>{{ textFilter('dialogTitle') }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="logoutConfirm = !logoutConfirm">
            {{ textFilter('cancelBtn') }}
          </v-btn>
          <v-btn color="primary" depressed @click="getLogout">
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
import {
  MOBILE_USERCENTRE_NEED_REDIRECT,
  MOBILE_USERCENTRE_MENU_TITLE_DEPOSIT,
  MOBILE_USERCENTRE_MENU_TITLE_WITHDRAWALS,
  MOBILE_USERCENTRE_MENU_TITLE_BNAKCARD,
  MOBILE_USERCENTRE_MENU_TITLE_PROFILE,
  MOBILE_USERCENTRE_MENU_TITLE_RECORD,
  MOBILE_USERCENTRE_MENU_TITLE_LIVECHAT,
  MOBILE_USERCENTRE_INDEX_TITLE_DEPOSIT_WITHDRAWALS,
  MOBILE_USERCENTRE_INDEX_TITLE_DEPOSIT,
  MOBILE_USERCENTRE_INDEX_TITLE_WITHDRAWALS,
  MOBILE_USERCENTRE_INDEX_TITLE_USDT_DEPOSIT,
  MOBILE_USERCENTRE_INDEX_TITLE_USDT_WITHDRAWALS,
} from '@G/consts';
import _ from 'lodash';

export default {
  name: 'userCentre',
  data() {
    return {
      MOBILE_USERCENTRE_INDEX_TITLE_DEPOSIT_WITHDRAWALS,
      logoutConfirm: false,
      currentWarningKey: '',
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
          title: MOBILE_USERCENTRE_MENU_TITLE_WITHDRAWALS,
          name: 'withdrawals', // 取款
          warning: false,
          icon: 'withdraw',
          iconClass: 'primary',
        },
        {
          class: 'menu_bankCard',
          title: MOBILE_USERCENTRE_MENU_TITLE_BNAKCARD,
          name: 'bankCard', // 銀行
          warning: false,
          icon: 'bank',
          iconClass: 'primary',
        },
        {
          class: 'menu_profile',
          title: MOBILE_USERCENTRE_MENU_TITLE_PROFILE,
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
        {
          class: 'menu_liveChat',
          title: MOBILE_USERCENTRE_MENU_TITLE_LIVECHAT,
          name: 'liveChat', // 投诉邮箱 or 意见反馈
          warning: false,
          icon: 'liveChat',
          iconClass: 'primary',
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
      'gameRecordList',
    ]),
    gameWallet() {
      let obj = _.cloneDeep(this.balanceAllInfo);
      delete obj['0'];
      return obj;
    },
    menuDataFilter: {
      get() {
        let menu = [];
        const vipEabled = this.config.vip_enable == 1;
        const isAgency = +this.isAgency === 2;
        const liveChatEabled = this.config?.Show_MobileMenu_LiveChat === '1';
        this.menuData.forEach(i => {
          switch (i.name) {
            case 'vipLevel':
              vipEabled && menu.push(i);
              break;
            case 'agencyCenter':
              isAgency && menu.push(i);
              break;
            case 'liveChat':
              liveChatEabled && menu.push(i);
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
          langDeposit: code === 'CNY' ? MOBILE_USERCENTRE_INDEX_TITLE_DEPOSIT : MOBILE_USERCENTRE_INDEX_TITLE_USDT_DEPOSIT,
          langWithdrawal: code === 'CNY' ? MOBILE_USERCENTRE_INDEX_TITLE_WITHDRAWALS : MOBILE_USERCENTRE_INDEX_TITLE_USDT_WITHDRAWALS,
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
      'SHOW_LIVE_CHAT',
      'ROUTER_PUSH',
    ]),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'SET_FULL_WIDTH']),
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
      // 投诉邮箱
      if (item.name == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
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
  },
};
</script>

<style lang="scss">
.Profile {
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
    $icons: 'liveChat', 'bank', 'deposit', 'logout', 'mail', 'pass', 'withdrawalsPass', 'profile', 'tradelog', 'vip', 'withdraw', 'agencyCenter';
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
