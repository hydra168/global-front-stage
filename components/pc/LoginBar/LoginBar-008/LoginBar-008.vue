<template>
  <v-container class="LoginBar-008 ma-0 pa-0" fluid>
    <v-row align="center" class="pa-0 ma-0">
      <div class="d-flex" style="margin-left: auto">
        <!-- 已登錄 -->
        <div class="isLogin pa-0 ma-0" v-if="isLogin">
          <v-row class="text-no-wrap" no-gutters xs12 align="center" justify="end">
            <a :class="`username ${textColor}--text`" @click="$router.push('/userCentre')">
              <label class="userBox" style="cursor: pointer">{{ userInfo.name }}</label>
            </a>
            <a class="balanceBox">
              <label>{{ balanceAllInfo['0'].balance | money }}</label>
            </a>
            <v-btn class="logout ml-4 d-inline-block logoutBox" depressed v-bind="bindLogoutBtn" @click="GET_LOGOUT">
              <template>{{ textFilter('logout') }}</template>
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
            </div>
          </v-row>
        </div>

        <!-- 選擇語系 -->
        <div class="ml-5 d-none d-md-flex d-lg-flex pa-0 ma-0 align-center selectBox" v-if="isShowI18n">
          <v-select
            dense
            outlined
            background-color="#292c34"
            color="#fff"
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

export default {
  name: 'LoginBar-008',
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
    isShowI18n: {
      type: Boolean,
      default: false,
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
      default: true,
    },
    // 商標logo
    logoUrl: {
      type: String,
      default: '',
    },
    logoWidth: {
      type: String,
      default: '250px',
    },
    // button bind擴充用
    btnCommonBind: {
      type: Object, //button共用 bind
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
    isLoginDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginInfo: {},
      visibility: false,
      lang: '',
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
      'ROUTER_PUSH',
      'SHOW_LIVE_CHAT',
      'POST_BALANCE',
      'GET_BALANCE_ALL_INFO',
      'POST_LOGIN',
      'CHECK_REMEMBER',
      'LOCALE_HANDLER',
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
  },
};
</script>

<style lang="scss" scoped>
.LoginBar-008 {
  .badge {
    cursor: pointer;
  }
  .isLogin a {
    display: inline-block;
  }
  .userBox {
    position: relative;
  }
  .userBox::before {
    content: '';
    position: absolute;
    left: -40px;
    top: -5px;
    display: block;
    width: 30px;
    height: 30px;
    background: url('./assets/img/hicon1.png') no-repeat center center/cover;
  }
  .balanceBox {
    margin-left: 54px;
  }
  .balanceBox label {
    color: #fff;
    position: relative;
    display: inline-block;
  }
  .balanceBox label::before {
    content: '';
    position: absolute;
    left: -40px;
    top: -3px;
    display: block;
    width: 30px;
    height: 30px;
    background: url('./assets/img/hicon2.png') no-repeat center center/cover;
  }
  .logoutBox {
    background: #292c34 !important;
    border-radius: 33px !important;
    border: solid 2px rgba(204, 171, 140, 0.6) !important;
    padding: 8px 26px 7px !important;
    height: auto !important;
    position: relative;
  }
  .selectBox {
    position: relative;
  }
  .selectBox::before {
    content: '';
    display: block;
    left: -40px;
    top: -3px;
    width: 30px;
    height: 30px;
    background: url('./assets/img/hicon3.png') no-repeat center center/cover;
  }
  .v-select__slot .v-label {
    display: none;
  }
}

// hover
.v-btn:hover:before {
  opacity: 0.35 !important;
}
</style>
<style lang="scss">
.LoginBar-008 {
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
  .v-select.v-input--dense .v-select__selection--comma {
    color: #fff;
    font-size: 14px;
  }
}
</style>
