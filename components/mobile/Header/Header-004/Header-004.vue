<template>
  <div class="Header004" app v-if="!fullscreen" :class="`${background}`">
    <v-btn v-if="iconShow" icon :color="iconColor">
      <img v-if="menuUrl" class="menu-img" :src="menuUrl" alt="" @click="SET_SHOW_MENU(!showMenu)" />
      <v-icon v-else @click="SET_SHOW_MENU(!showMenu)">menu</v-icon>
    </v-btn>
    <div class="middleBox">
      <!-- 文字顯示 -->
      <div v-if="logoUrlHandler === ''" class="d-flex pl-8">
        <h4 :class="titleClass">{{ currentMenuTitle }}</h4>
      </div>

      <!-- LOGO顯示 -->
      <div v-else class="pa-0 ma-0">
        <div v-if="!this.allShowLogo" class="d-flex align-center justify-center">
          <h4 v-if="routeName != 'home'" :class="titleClass">{{ currentMenuTitle }}</h4>
          <img v-else :class="logoClass" :height="logoHeight" :src="logoUrlHandler" />
        </div>
        <img v-else :class="logoClass" :height="logoHeight" :src="logoUrlHandler" />
      </div>
    </div>
    <div class="btnGroup">
      <div v-if="isLogin">
        <span class="userBox" @click="$router.push('/profile')" />
        <!-- <v-btn depressed @click="actionsBtns[2].func" v-bind="logoutBtnBind">{{ $t(actionsBtns[2].code) }}</v-btn> -->
      </div>
      <div v-else>
        <v-btn depressed @click="actionsBtns[0].func" v-bind="loginBtnBind" class="mr-1">{{ $t(actionsBtns[0].code) }}</v-btn>
        <v-btn depressed @click="actionsBtns[1].func" v-bind="registerBtnBind">{{ $t(actionsBtns[1].code) }}</v-btn>
      </div>
    </div>
  </div>
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
import { MOBILE_HEADER_ALLSHOW_LOGO } from '@G/consts';

export default {
  name: 'Header',
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
      default: '#A88F64',
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
    menuUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      routeName: '',
      allShowLogo: MOBILE_HEADER_ALLSHOW_LOGO,
      defaultActionsBtns: [
        { sort: 1, show: true, code: 'g_com_header_001_login', title: '登录', func: () => this.$router.push({ name: 'login' }) },
        { sort: 2, show: true, code: 'g_com_header_001_register', title: '注册', func: () => this.$router.push({ name: 'register' }) },
        { sort: 3, show: true, code: 'g_com_header_001_logout', title: '登出', func: () => this.GET_LOGOUT() },
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
      return this.config.logo_image_mobile || this.logoUrl;
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
    ...mapActions(['GET_LOGOUT']),
    ...mapMutations(['SET_SHOW_MENU']),
    routerPush(name) {
      this.$router.push({ name });
    },
  },
};
</script>
<style lang="scss" scoped>
.Header004 {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 2;
  background: #fff;
  padding: 4px 0;
  top: 0;
  left: 0;
  button {
    margin-left: 5px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    font-size: #{(30/800 * 100vw)};
    height: #{(60/800 * 100vw)};
    min-width: #{(64/800 * 100vw)};
    padding: 0 #{(16/800 * 100vw)};
  }
  .userBox {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('./assets/userIcon.png') no-repeat center center/cover;
  }
  .btnGroup {
    margin: 10px 15px 6px 0;
  }
}
</style>
