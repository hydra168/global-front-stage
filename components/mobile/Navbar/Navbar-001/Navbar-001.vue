<template>
  <div class="Navbar001 pa-0 ma-0" app v-if="!fullscreen" :class="`${background}`">
    <div class="d-flex align-center justify-space-between contianer"></div>
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
  name: 'Navbar-001',
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
      default: '35',
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
      allShowLogo: MOBILE_HEADER_ALLSHOW_LOGO,
      defaultActionsBtns: [
        { sort: 1, show: true, code: 'g_com_header_002_login', title: '登录', func: () => this.$router.push({ name: 'login' }) },
        { sort: 2, show: true, code: 'g_com_header_002_register', title: '注册', func: () => this.$router.push({ name: 'register' }) },
        { sort: 3, show: true, code: 'g_com_header_002_logout', title: '登出', func: () => this.GET_LOGOUT() },
        { sort: 4, show: true, code: 'g_com_header_002_midField', title: '走地盤', func: () => {} },
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
    ...mapActions(['GET_LOGOUT']),
    ...mapMutations(['SET_SHOW_MENU']),
    routerPush(name) {
      this.$router.push({ name });
    },
  },
};
</script>
<style lang="scss" scoped>
.Navbar001 {
  .v-btn:not(.v-btn--round).v-size--default {
    // font-size: #{(30/800 * 100vw)};
    // height: #{(60/800 * 100vw)};
    // min-width: #{(64/800 * 100vw)};
    // padding-top: #{(16/800 * 100vw)};
  }
  .contianer {
    width: 100%;
    padding-top: #{(16/800 * 100vw)};
    height: #{(100/800 * 100vw)};
  }
}
</style>
