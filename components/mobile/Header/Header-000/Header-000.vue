<template>
  <v-app-bar class="Header" v-if="!fullscreen" v-bind="headerOption" :class="className">
    <!-- 菜單按鍵 -->
    <slot name="menu" v-bind="{ func: showMenurEvent }">
      <v-btn icon>
        <v-icon @click="SET_SHOW_MENU(!showMenu)">menu</v-icon>
      </v-btn>
    </slot>

    <!-- LOGO和標題 -->
    <slot name="menuTitle" v-bind="{ logoUrl: logoUrlHandler, menuTitle: currentMenuTitle, routeName }">
      <!-- 文字顯示 -->
      <v-toolbar-title v-if="logoUrlHandler === ''" class="d-flex pl-8">
        <h4>{{ currentMenuTitle }}</h4>
      </v-toolbar-title>

      <!-- LOGO顯示 -->
      <v-toolbar-title v-else class="pa-0 ma-0">
        <div class="d-flex align-center justify-start pa-0 ma-0">
          <h4 v-if="routeName != 'home'">{{ currentMenuTitle }}</h4>
          <img class="logo" v-else :src="logoUrlHandler" />
        </div>
      </v-toolbar-title>
    </slot>
    <!-- 其他部分 -->
    <slot name="default"><v-spacer></v-spacer></slot>

    <template v-if="isLogin">
      <!-- 登入狀態 -->
      <slot name="loginState" v-bind="{ userInfo, func: userInfoEvent }">
        <span @click="$router.push('/profile')">
          <b>{{ userInfo && userInfo.name }} </b>
        </span>
      </slot>
    </template>
    <template v-else>
      <!-- 登出狀態 -->
      <slot name="logoutState" v-bind="{ loginEvent: mobileLogin, registerEvent: mobileRegister }">
        <v-btn depressed @click="mobileLogin">{{ $t('g_com_header_001_login') }}</v-btn>
        <v-btn depressed @click="mobileRegister">{{ $t('g_com_header_001_register') }}</v-btn>
      </slot>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    // 組件的class
    className: {
      type: String,
      default: '',
    },
    headerOption: {
      type: Object,
      default: () => ({
        app: true,
      }),
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
    };
  },
  computed: {
    ...mapGetters(['fullscreen', 'isLogin', 'showMenu', 'currentMenuTitle', 'userInfo', 'config']),
    logoUrlHandler() {
      return this.config.logo_image_mobile;
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
    ...mapActions(['GET_LOGOUT', 'ROUTER_PUSH']),
    ...mapMutations(['SET_SHOW_MENU']),
    routerPush(name) {
      this.$router.push({ name });
    },
    mobileLogin() {
      this.$router.push({ name: 'login' });
    },
    mobileRegister() {
      this.$router.push({ name: 'register' });
    },
    showMenurEvent() {
      this.SET_SHOW_MENU(!this.showMenu);
    },
    userInfoEvent() {
      this.ROUTER_PUSH('/profile');
    },
  },
};
</script>
<style lang="scss" scoped>
.logo {
  height: 40px;
}
</style>
