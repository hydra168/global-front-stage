<template>
  <v-app-bar class="Header002 pa-0 ma-0" app v-if="!fullscreen" :class="`${background}`">
    <div class="d-flex align-center contianer">
      <div class="header-block d-flex align-center justify-space-between">
        <v-btn v-if="iconShow" icon :color="iconColor" class="d-flex align-center pa-0 ma-0">
          <v-icon class="ml-5" @click="SET_SHOW_MENU(!showMenu)">menu</v-icon>
          <v-btn class="mx-0" depressed @click="actionsBtns[4].func" v-bind="registerBtnBind">{{ $t(actionsBtns[4].title) }}</v-btn>
        </v-btn>

        <div v-if="!isLogin">
          <v-toolbar-title class="d-flex align-center">
            <v-btn class="mx-0" depressed @click="actionsBtns[1].func" v-bind="registerBtnBind">{{ $t(actionsBtns[1].title) }}</v-btn>
          </v-toolbar-title>
        </div>
        <div v-if="isLogin" class="d-flex align-center">
          <!-- <span :class="userInfoClass" @click="ROUTER_PUSH('/userCentre')"> 123 '</span> -->
          <!-- <v-icon @click="ROUTER_PUSH('/userCentre')">wallet</v-icon> -->
          <span class="material-icons" @click="ROUTER_PUSH('/userCentre')"> monetization_on </span>
        </div>
      </div>
      <!-- LOGO顯示 -->
      <div class="header-block d-flex align-center justify-center">
        <v-toolbar-title class="d-flex align-center justify-center pa-0 ma-0">
          <img :class="logoClass" :height="logoHeight" :src="logoUrlHandler" @click="ROUTER_PUSH('/')" />
        </v-toolbar-title>
      </div>

      <div class="header-block d-flex align-center justify-end">
        <v-toolbar-title class="d-flex align-center">
          <template v-if="!isLogin">
            <v-btn depressed @click="actionsBtns[0].func" v-bind="loginBtnBind" class="mr-0">{{ $t(actionsBtns[0].title) }}</v-btn>
          </template>
          <v-btn depressed @click="actionsBtns[3].func" v-bind="loginBtnBind">{{ $t(actionsBtns[3].title) }}</v-btn>
        </v-toolbar-title>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
/**
 * [ slot ]
 * btnGroup
 * 外部使用範例: <template v-slot:btnGroup>1234567890</template>
 *
 * [ props ]
 * logoUrl 圖片url
 * 外部使用範例: logoUrl="require('../assets/img/logo.png')"
 */
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'Header-002',
  props: {
    wrapClass: {
      type: String,
      default: 'white',
    },
    titleClass: {
      type: String,
      default: '',
    },
    userInfoClass: {
      type: String,
      default: 'black--text',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    logoHeight: {
      type: String,
      default: '40',
    },
    logoClass: {
      type: String,
      default: '',
    },
    // btn 樣式
    textBtn: {
      type: Boolean,
      default: true,
    },
    btnCommonBind: {
      //btn通用樣式設定直接在這邊設定就好
      type: Object,
    },
    loginBtnCommonBind: {
      type: Object,
    },
    loginBtnColor: {
      type: String,
      default: '',
    },
    loginBtnOutlined: {
      type: Boolean,
      default: false,
    },
    logoutBtnColor: {
      type: String,
      default: '',
    },
    logoutBtnOutlined: {
      type: Boolean,
      default: false,
    },
    registerBtnColor: {
      type: String,
      default: '',
    },
    registerBtnOutlined: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: 'black',
    },
    iconShow: {
      type: Boolean,
      default: true,
    },
    // 按鈕設定
    optionActionsBtns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      routeName: '',
      defaultActionsBtns: [
        { sort: 1, show: true, code: 'g_com_header_002_login', title: '登录', func: () => this.ROUTER_PUSH('/login') },
        { sort: 2, show: true, code: 'g_com_header_002_register', title: '注册', func: () => this.ROUTER_PUSH('/register') },
        { sort: 3, show: true, code: 'g_com_header_002_logout', title: '登出', func: () => this.GET_LOGOUT() },
        { sort: 4, show: true, code: 'g_common_client_service', title: '客服', func: () => this.SHOW_LIVE_CHAT(0) },
        { sort: 5, show: true, code: 'g_com_header_002_promotion', title: '优惠', func: () => this.ROUTER_PUSH('/promotion') },
      ],
    };
  },
  computed: {
    ...mapGetters(['fullscreen', 'isLogin', 'showMenu', 'currentMenuTitle', 'userInfo', 'config']),
    logoutBtnBind() {
      return Object.assign({ text: this.textBtn }, { color: this.logoutBtnColor }, { outlined: this.logoutBtnOutlined }, this.btnCommonBind);
    },
    loginBtnBind() {
      return Object.assign({ text: this.textBtn }, { color: this.loginBtnColor }, { outlined: this.loginBtnOutlined }, this.loginBtnCommonBind);
    },
    registerBtnBind() {
      return Object.assign({ text: this.textBtn }, { color: this.registerBtnColor }, { outlined: this.registerBtnOutlined }, this.btnCommonBind);
    },
    actionsBtns() {
      return mergeArrayObjectsCode(this.optionActionsBtns, this.defaultActionsBtns);
    },
    logoUrlHandler() {
      return this.logoUrl || this.config.logo_image_mobile;
    },
  },
  watch: {
    $route: {
      handler(val) {
        this.routeName = val.name;
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(['GET_LOGOUT', 'ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    ...mapMutations(['SET_SHOW_MENU']),
  },
};
</script>
<style lang="scss" scoped>
.Header002 {
  .v-btn:not(.v-btn--round).v-size--default {
    font-size: #{(30/800 * 100vw)};
    height: #{(60/800 * 100vw)};
    // min-width: #{(64/800 * 100vw)};
    // padding: 0 #{(16/800 * 100vw)};
    padding: 0;
  }
  .contianer {
    width: 100%;
    padding: 0 !important;
  }
}
.header-block {
  width: 33%;
}
</style>
