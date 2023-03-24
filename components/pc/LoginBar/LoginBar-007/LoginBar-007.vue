<template>
  <v-container class="LoginBar-007 ma-0 pa-0" fluid>
    <v-row align="center" class="pa-0 ma-0">
      <div class="d-flex justify-center align-center">
        <v-img class="mr-10" v-if="isShowLogo" :width="logoWidth" :src="logoUrlHandler" @click="routerPushHome" style="cursor: pointer"></v-img>
        <div class="pa-0 ma-0 mr-10" v-if="isShowLink">
          <span :class="`link ${textColor}--text`" style="cursor: pointer" @click="routerPushHome">{{ textFilter('home_page') }}</span>
          <span :class="`${textColor}--text`">｜</span>
          <span :class="`link ${textColor}--text`" style="cursor: pointer" @click="SHOW_LIVE_CHAT(linkLiveChatType)">
            {{ textFilter('online_service') }}
          </span>
        </div>
      </div>
      <div>
        <v-menu v-for="(menu, index) in navMenu" :key="index" open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :class="`balance ${textColor}--text px-3`" text dense v-bind="attrs" v-on="on" @click="routerPush(menu)">
              <div class="cus-btn">
                <div class="title-name">{{ menu.title }}</div>
                <div v-if="isShowActiveUnderLine" class="underLine" v-bind:class="{ active: Cpath == menu.code }" />
              </div>
            </v-btn>
          </template>

          <v-list v-if="menu.listItems ? menu.listItems.length : 0 > 0">
            <v-list-item v-for="(item, index) in menu.listItems" :key="index">
              <v-list-item-title style="cursor: pointer" @click="routerPush(item)">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="d-flex" style="margin-left: auto">
        <div class="isLogin pa-0 ma-0" v-if="isLogin">
          <v-row class="text-no-wrap" no-gutters xs12 align="center" justify="end">
            <span :class="`hi ${textColor}--text`" style="margin-right: 10px">{{ textFilter('hi') }}</span>
            <a :class="`username ${textColor}--text`" @click="$router.push('/userCentre')">
              <label style="cursor: pointer">{{ userInfo.name }}</label>
            </a>
            <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
              <template v-slot:activator="{ on }">
                <v-btn
                  :class="`balance ${textColor}--text px-0`"
                  text
                  :loading="isBalanceLoading"
                  large
                  v-on="on || true"
                  @click="GET_BALANCE_ALL_INFO()"
                >
                  {{ textFilter('balance') }}
                  <v-icon small class="spinner">cached</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item v-for="(item, i) in balanceAllInfo" :key="i">
                    <v-list-item-content v-if="item.name == undefined || item.name == null || item.name == ''" class="black-text">
                      --
                    </v-list-item-content>
                    <v-list-item-content v-else class="black-text">
                      {{ item.name }} {{ config.unit }} {{ item.balance | money }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
            <v-btn v-if="depositBtn" text :class="`deposit ${textColor}--text px-0`" large @click="handleClick('/userCentre/deposit')">
              {{ textFilter('deposit') }}
              <v-icon small>input</v-icon>
            </v-btn>
            <v-btn v-if="withdrawalsBtn" text :class="`withdrawals ${textColor}--text px-0`" large @click="handleClick('/userCentre/withdrawals')">
              {{ textFilter('withdrawal') }}
              <v-icon small>money</v-icon>
            </v-btn>
            <v-btn class="logout ml-4 d-inline-block" depressed v-bind="bindLogoutBtn" @click="GET_LOGOUT">
              <template>{{ textFilter('logout') }}</template>
            </v-btn>
            <v-btn
              v-if="pcDownloadBtn"
              :tile="tile"
              :rounded="rounded"
              depressed
              :class="`${pcDownloadBtnColor} d-inline-block ml-2 pcdownload`"
              @click.stop="handleClick('installdownload')"
            >
              {{ textFilter('downloadPC') }}
            </v-btn>
          </v-row>
        </div>
        <div class="isNotLogin pa-0 ma-0" v-if="!isLogin">
          <v-row no-gutters xs12 align="center" justify="end">
            <v-col class="d-flex" v-if="showLoginForm">
              <div>
                <v-text-field
                  :color="textColor"
                  :dark="dark"
                  dense
                  class="mx-2 d-inline-block"
                  style="width: 130px"
                  hide-details
                  outlined
                  v-model="loginInfo.Name"
                  required
                  :placeholder="textFilter('account')"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  class="d-inline-block"
                  :color="textColor"
                  :dark="dark"
                  outlined
                  dense
                  v-model="loginInfo.Passwd"
                  style="width: 130px"
                  required
                  hide-details
                  :append-icon="visibility ? 'visibility' : 'visibility_off'"
                  :type="visibility ? 'text' : 'password'"
                  @click:append="visibility = !visibility"
                  @keyup.enter="login(loginInfo)"
                  :placeholder="textFilter('password')"
                ></v-text-field>
              </div>
            </v-col>
            <div class="pa-0 ma-0 d-inline-block" style="max-width: 100% !important" :class="{ 'text-right': isLoginDialog }">
              <v-checkbox
                v-if="showLoginForm"
                :color="textColor"
                hide-details
                dense
                class="my-0 py-0 mx-3 d-inline-block"
                v-model="loginInfo.Remember"
              >
                <span :class="`${textColor}--text`" slot="label">{{ textFilter('remember') }}</span>
              </v-checkbox>
              <v-btn id="loginButton" class="d-inline-block mx-2 px-1" v-bind="bindLoginBtn" depressed @click.native="login(loginInfo)">
                {{ textFilter('login') }}
              </v-btn>
              <v-btn
                id="registerButton"
                class="d-inline-block ml-2 px-1"
                hide-details
                v-bind="bindRegisterBtn"
                depressed
                @click.stop="handleClick('register')"
              >
                {{ textFilter('openAnAccount') }}
              </v-btn>
              <v-btn
                v-if="pcDownloadBtn"
                :tile="tile"
                :rounded="rounded"
                depressed
                :class="`${pcDownloadBtnColor} d-inline-block ml-2 pcdownload`"
                @click.stop="handleClick('installdownload')"
              >
                {{ textFilter('downloadPC') }}
              </v-btn>
            </div>
          </v-row>
        </div>
        <div class="ml-5 d-none d-md-flex d-lg-flex pa-0 ma-0 align-center" v-if="isShowI18n">
          <v-select
            dense
            outlined
            hide-details
            class="primary--text"
            style="width: 130px"
            v-model="lang"
            :items="langItem"
            :label="textFilter('changeLanguage')"
            item-text="value"
            item-value="key"
            @change="changeLang"
            :dark="dark"
          ></v-select>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LoginBar-007',
  props: {
    linkLiveChatType: {
      type: Number,
      default: 0,
    },
    /**
     * 按鈕項目
     */
    turnBackBtn: {
      type: Boolean,
      default: true,
    },
    withdrawalsBtn: {
      type: Boolean,
      default: true,
    },
    depositBtn: {
      type: Boolean,
      default: true,
    },
    pcDownloadBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * 按鈕樣式
     */
    loginBtnColor: {
      type: String,
      default: 'primary',
    },
    logoutBtnColor: {
      type: String,
      default: 'secondary',
    },
    registerBtnColor: {
      type: String,
      default: 'secondary',
    },
    pcDownloadBtnColor: {
      type: String,
      default: 'secondary',
    },
    tile: {
      // 預設方型
      type: Boolean,
      default: true,
    },
    rounded: {
      // 圓型 須將 tile 設為 false
      type: Boolean,
      default: true,
    },
    /**
     * 全局項目
     */
    textColor: {
      type: String,
      default: 'grey',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * 排版項目
     */
    isLoginCols: {
      type: Number,
      default: 10,
    },
    noLoginCols: {
      type: Number,
      default: 10,
    },
    /**
     * 商標logo
     */
    logoUrl: {
      type: String,
      default: '',
    },
    logoWidth: {
      type: String,
      default: '250px',
    },
    isShowLogo: {
      type: Boolean,
      default: false,
    },
    /**
     * button bind擴充用
     */
    btnCommonBind: {
      //button共用 bind
      type: Object,
    },
    loginBtnBind: {
      type: Object,
    },
    registerBtnBind: {
      type: Object,
    },
    logoutBtnBind: {
      type: Object,
    },
    isShowI18n: {
      type: Boolean,
      default: false,
    },
    isShowLink: {
      type: Boolean,
      default: true,
    },
    isLoginDialog: {
      type: Boolean,
      default: false,
    },
    menuDataOptions: {
      type: Array,
      default: () => [],
    },
    isShowActiveUnderLine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginInfo: {},
      visibility: false,
      lang: '',
      // Cpath: this.$route.name,
      Cpath: 'home',
      menuData: [
        {
          sort: 1,
          show: true,
          code: '/',
          title: '首页',
          func: () => this.ROUTER_PUSH('/'),
          link: '/',
        },
        {
          sort: 2,
          show: true,
          code: '/ultimate',
          title: '竞技大厅',
          func: () => this.ROUTER_PUSH('/ultimate'),
          link: '/ultimate',
        },
        {
          sort: 3,
          show: true,
          code: '/play/68835709494',
          title: '旗舰大厅',
          func: () => this.ROUTER_PUSH('/play/68835709494'),
          link: '/play/68835709494',
        },
        {
          sort: 4,
          show: true,
          code: '/play/30n4hvJ4MGjhfY',
          title: '体育竞赛',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          link: '/play/30n4hvJ4MGjhfY',
        },
        {
          sort: 5,
          show: true,
          code: '/userCentre',
          title: '个人中心',
          func: () => this.ROUTER_PUSH('/userCentre'),
          link: '/userCentre',
        },
        {
          sort: 6,
          show: true,
          code: '/promotion',
          title: '优惠活动',
          func: () => this.ROUTER_PUSH('/promotion'),
          link: '/promotion',
        },
        {
          sort: 7,
          show: true,
          code: 'download',
          title: '下载',
          listItems: [
            { title: '电脑 APP', code: 'download', link: '/installdownload' },
            { title: '手机 APP', code: 'download', link: '/appdownload' },
          ],
        },
        {
          sort: 8,
          show: true,
          code: 'service',
          title: '投诉邮箱',
          func: () => this.SHOW_LIVE_CHAT(0),
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'mailNumber',
      'isBalanceLoading',
      'config',
      'userInfo',
      'balanceAllInfo',
      'isLogin',
      'rememberData',
      'locale',
      'langItem',
    ]),
    navMenu() {
      return mergeArrayObjectsCode(this.menuDataOptions, this.menuData);
    },
    showLoginForm() {
      return !this.config.isLoading && !this.isLoginDialog && !Number(this.config.login_verify);
    },
    bindLoginBtn() {
      return Object.assign(
        { tile: this.tile, rounded: this.rounded, class: this.loginBtnColor, loading: this.isLoading },
        this.btnCommonBind,
        this.loginBtnBind
      );
    },
    bindRegisterBtn() {
      return Object.assign({ tile: this.tile, rounded: this.rounded, class: this.registerBtnColor }, this.btnCommonBind, this.registerBtnBind);
    },
    bindLogoutBtn() {
      return Object.assign(
        {
          tile: this.tile,
          rounded: this.rounded,
          loading: this.isLoading,
          class: `${this.logoutBtnColor}`,
        },
        this.btnCommonBind,
        this.logoutBtnBind
      );
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
  watch: {},
  mounted() {
    const path = this.$route.path;

    if (path === '/installdownload' || path === '/appdownload') {
      this.Cpath = 'download';
    } else {
      this.Cpath = path;
    }
  },
  created() {
    this.lang = this.locale;
    this.CHECK_REMEMBER();
    if (this.rememberData) {
      this.loginInfo = {
        Name: this.rememberData.n,
        Passwd: this.rememberData.p,
        Remember: true,
      };
    }
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX', 'SET_LOGIN_REDIRECT']),
    ...mapActions([
      'GET_LOGOUT',
      'SHOW_LIVE_CHAT',
      'POST_BALANCE',
      'GET_BALANCE_ALL_INFO',
      'POST_LOGIN',
      'CHECK_REMEMBER',
      'LOCALE_HANDLER',
      'ROUTER_PUSH',
    ]),
    handleClick(action) {
      switch (action) {
        case 'register':
          this.SET_GLOBAL_BOX('RegisterBox');
          break;
        case '/home':
          this.$router.push('/userCentre');
          break;
        case 'app':
          window.open(this.config.app, '_blank');
          break;
        case 'livechat':
          this.SHOW_LIVE_CHAT(0);
          break;
        default:
          this.$router.push({ path: action });
          break;
      }
    },
    textFilter(text) {
      return textFilter(text, 'com_loginBar_001_');
    },
    changeLang() {
      this.LOCALE_HANDLER({ lang: this.lang });
    },
    login(loginInfo) {
      if (!this.showLoginForm) {
        this.SET_GLOBAL_BOX('LoginBox');
      } else {
        this.SET_LOGIN_REDIRECT(null);
        this.POST_LOGIN(loginInfo);
      }
    },
    routerPush(item) {
      console.log(this.Cpath);

      if (item.code == 'liveChat' || item.code == 'service') {
        this.SHOW_LIVE_CHAT(0);
        return;
      } else {
        this.Cpath = item.code;
      }

      this.ROUTER_PUSH(item.link);
    },
    routerPushHome() {
      this.Cpath = '/';
      this.ROUTER_PUSH('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginBar-007 {
  .badge {
    cursor: pointer;
  }
  background-color: transparent;
}

// hover
.v-btn:hover:before {
  opacity: 0.35 !important;
}
</style>
<style lang="scss">
.LoginBar-007 {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s; /*透明*/
    -webkit-text-fill-color: map-get(map-get($colors, primary), base); /*字體顏色*/
  }
  .theme--dark {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s; /*透明*/
      -webkit-text-fill-color: #fff; /*字體顏色*/
    }
  }

  .underLine {
    width: 100%;
    height: 4px;
    margin-top: 6px;

    &.active {
      background-color: var(--v-secondary-base);
    }
  }
}
</style>
