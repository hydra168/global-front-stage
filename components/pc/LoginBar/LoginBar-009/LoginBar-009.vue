<template>
  <v-container class="LoginBar-009 ma-0 pa-0" fluid>
    <div align="center" class="flexBox">
      <div class="flexStart">
        <v-img :width="logoWidth" :src="logoUrlHandler" @click="$router.push('/')" style="cursor: pointer"></v-img>
      </div>
      <div class="flexEnd">
        <v-menu v-for="(menu, index) in navMenu" :key="index" open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :class="`newbalance ${textColor}--text`" text v-bind="attrs" v-on="on" @click="routerPush(menu)">
              <div class="cus-btn">
                <div class="title-name">{{ menu.title }}</div>
                <div v-if="isShowActiveUnderLine" class="underLine" v-bind:class="{ active: Cpath == menu.code }" />
              </div>
            </v-btn>
          </template>
          <!-- 明天修改這段試試 -->
          <v-list v-if="menu.listItems ? menu.listItems.length : 0 > 0">
            <v-list-item v-for="(item, index) in menu.listItems" :key="index">
              <v-list-item-title style="cursor: pointer" @click="routerPush(item)">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-container>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LoginBar-009',
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
      default: '140px',
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
          title: '主页',
          func: () => this.ROUTER_PUSH('/'),
          link: '/',
        },
        {
          sort: 2,
          show: true,
          code: '/ultimate',
          title: '彩票游戏',
          func: () => this.ROUTER_PUSH('/ultimate'),
          link: '/ultimate',
        },
        {
          sort: 3,
          show: true,
          code: '/play/30n4hvJ4MGjhfY',
          title: '体育投注',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          link: '/play/30n4hvJ4MGjhfY',
        },
        {
          sort: 4,
          show: true,
          code: '/play/68835709494',
          title: '电子游戏',
          func: () => this.ROUTER_PUSH('/play/68835709494'),
          link: '/play/68835709494',
        },
        {
          sort: 5,
          show: true,
          code: '/promotion',
          title: '优惠活动',
          func: () => this.ROUTER_PUSH('/promotion'),
          link: '/promotion',
        },
        {
          sort: 6,
          show: true,
          code: 'download',
          title: 'APP下载',
          listItems: [
            { title: '电脑 APP', code: 'download', link: '/installdownload' },
            { title: '手机 APP', code: 'download', link: '/appdownload' },
          ],
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
.LoginBar-009 {
  .flexBox {
    display: flex;
    position: relative;
    height: 55px;
    .flexStart {
      position: absolute;
      top: 0;
      left: 0;
    }
    .flexEnd {
      position: absolute;
      top: 10px;
      right: -4px;
    }
    .cus-btn:hover {
      color: #c7a686;
    }
  }
  .badge {
    cursor: pointer;
  }
  background-color: transparent;
}

// hover
.v-btn:hover:before {
  opacity: 0 !important;
  background: rgba(0, 0, 0, 0);
}
</style>
<style lang="scss">
.LoginBar-009 {
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
