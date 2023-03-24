<template>
  <v-container class="LoginBar-002 ma-0 py-0 px-4" fluid>
    <v-row class="pa-0 ma-0">
      <!-- 左邊項目 -->
      <div class="d-flex justify-start align-center">
        <div class="py-4 px-0 ma-0">
          <v-img :width="logoWidth" :src="logoUrlHandler" @click="$router.push('/')" style="cursor: pointer"></v-img>
        </div>
      </div>
      <!-- 中間的項目 -->
      <ul class="login-flex-1 d-flex pl-12">
        <template v-for="item in gameList">
          <li :key="item.code" class="login-middle-li mx-5 d-flex align-center" :class="{ 'link-css': gamepath === item.link }">
            <v-btn text :ripple="false" plain class="login-middle-li-btn" @click="changeLink(item.link)">
              {{ $t(item.name) }}
            </v-btn>
          </li>
        </template>
      </ul>
      <!-- 右邊的項目 -->
      <div class="login-flex-1 d-flex justify-end align-center">
        <div class="isLogin pa-0 ma-0" v-if="isLogin">
          <v-row class="text-no-wrap" no-gutters xs12 align="center" justify="end">
            <span :class="`hi ${textColor}--text`" style="margin-right: 10px">{{ textFilter('hi') }}</span>
            <a :class="`username ${textColor}--text`" @click="$router.push('/userCentre')">
              <label style="cursor: pointer">{{ userInfo.name }}</label>
            </a>
            <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
              <template v-slot:activator="{ on }">
                <v-btn :class="`balance ${textColor}--text px-0`" text :loading="isBalanceLoading" v-on="on || true" @click="GET_BALANCE_ALL_INFO()">
                  {{ textFilter('balance') }}
                  <v-icon small class="spinner">cached</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <template v-for="(item, i) in balanceAllInfo">
                    <v-list-item :key="i">
                      <v-list-item-content v-if="item.name == undefined || item.name == null || item.name == ''" class="black-text">
                        --
                      </v-list-item-content>
                      <v-list-item-content v-else class="black-text">
                        {{ item.name }} {{ config.unit }} {{ item.balance | money }}
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-menu>
            <v-btn v-if="depositBtn" text :class="`deposit ${textColor}--text px-0 rounded`" @click="handleClick('/userCentre/deposit')">
              {{ textFilter('deposit') }} <v-icon small>input</v-icon>
            </v-btn>
            <v-btn v-if="withdrawalsBtn" text :class="`withdrawals ${textColor}--text px-0 rounded`" @click="handleClick('/userCentre/withdrawals')">
              {{ textFilter('withdrawal') }} <v-icon small>money</v-icon>
            </v-btn>
            <v-btn v-if="turnBackBtn" text :class="`turnback ${textColor}--text px-0 rounded`" @click="POST_BALANCE()">
              {{ textFilter('back') }} <v-icon small>undo</v-icon>
            </v-btn>
            <aside class="mailBtn d-inline-block ma-2" @click="handleClick('/userCentre/notice')">
              <v-badge color="red" class="badge">
                <span slot="badge" v-if="mailNumber !== ''">{{ mailNumber }}</span>
                <v-icon large :color="textColor">mail</v-icon>
              </v-badge>
            </aside>
            <v-btn class="logout ml-4 d-inline-block rounded" depressed v-bind="bindLogoutBtn" small @click="GET_LOGOUT">
              <template>{{ textFilter('logout') }}</template>
            </v-btn>
            <v-btn
              v-if="pcDownloadBtn"
              :tile="tile"
              :rounded="rounded"
              depressed
              small
              :class="`${pcDownloadBtnColor} d-inline-block ml-2 pcdownload rounded`"
              @click.stop="handleClick('installdownload')"
            >
              {{ textFilter('downloadPC') }}
            </v-btn>
            <v-btn class="d-inline-block ml-2 px-1 black--text rounded" depressed small v-bind="bindClientServiceBtn" @click.stop="SHOW_LIVE_CHAT(0)">
              {{ '客服中心' }}
            </v-btn>
          </v-row>
        </div>
        <div class="isNotLogin pa-0 ma-0" v-if="!isLogin">
          <v-row w no-gutters xs12 align="center" justify="end">
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
            <div class="pa-0 ma-0 d-flex align-center" style="max-width: 100% !important" :class="{ 'text-right': isLoginDialog }">
              <v-checkbox
                v-if="showLoginForm"
                :color="textColor"
                hide-details
                dense
                class="my-0 py-0 mx-3 d-inline-block"
                v-model="loginInfo.Remember"
              >
                <span :class="`${textColor}--text checkbox-label`" slot="label">{{ textFilter('remember') }}</span>
              </v-checkbox>
              <v-btn
                id="loginButton"
                class="d-inline-block mx-2 px-1 black--text rounded"
                v-bind="bindLoginBtn"
                depressed
                small
                @click.native="login(loginInfo)"
              >
                {{ textFilter('login') }}
              </v-btn>
              <v-btn
                class="d-inline-block ml-1 px-1 login-middle-li-btn rounded"
                plain
                hide-details
                small
                depressed
                v-bind="bindClientServiceBtn"
                @click.stop="SHOW_LIVE_CHAT(0)"
              >
                {{ '客服中心' }}
              </v-btn>
              <v-btn
                id="registerButton"
                class="d-inline-block ml-2 px-1 login-middle-li-btn rounded"
                plain
                hide-details
                v-bind="bindRegisterBtn"
                small
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
                small
                :class="`${pcDownloadBtnColor} d-inline-block ml-2 pcdownload rounded`"
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

export default {
  name: 'LoginBar-004',
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
    loginList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loginInfo: {},
      visibility: false,
      lang: '',
      menuData: [
        { sort: 1, show: true, lang: 'menu_home', code: 'home', title: 'g_common_link_home', func: () => this.ROUTER_PUSH('/') },
        { sort: 2, show: true, lang: 'menu_lottery', code: 'ultimate', title: 'g_common_link_lottery', func: () => this.ROUTER_PUSH('/ultimate') },
        {
          sort: 3,
          show: true,
          lang: 'menu_popularColors',
          code: 'popularLottery',
          title: 'g_common_link_lotteryPopular',
          func: () => this.ROUTER_PUSH('/play/7043222726362'),
        },
        {
          sort: 4,
          show: true,
          lang: 'menu_promotions',
          code: 'promotion',
          title: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        { sort: 5, show: true, lang: 'menu_user', code: 'userCentre', title: 'g_common_link_user', func: () => this.ROUTER_PUSH('/userCentre') },
        { sort: 6, show: true, lang: 'menu_app', code: 'appdownload', title: 'g_common_link_app', func: () => this.ROUTER_PUSH('/appdownload') },
        {
          sort: 7,
          show: true,
          lang: 'menu_pc',
          code: 'installdownload',
          title: 'g_common_link_pc',
          func: () => this.ROUTER_PUSH('/installdownload'),
        },
        { sort: 8, show: true, lang: 'menu_help', code: 'helpCentre', title: 'g_common_link_help', func: () => this.ROUTER_PUSH('/helpCentre') },
        { sort: 9, show: true, lang: 'menu_channel', code: 'liveChat', title: 'g_common_link_feedback', func: () => this.SHOW_LIVE_CHAT(0) },
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
    bindClientServiceBtn() {
      return Object.assign({ tile: this.tile, rounded: this.rounded, class: this.registerBtnColor }, this.btnCommonBind, this.registerBtnBind);
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
    gameList() {
      if (this.loginList.length === 0) {
        return this.menuData;
      }
      return this.loginList.filter(item => item.show).sort((a, b) => (a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0));
    },
    gamepath() {
      return this.$route.path;
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
    changeLink(link) {
      this.ROUTER_PUSH(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginBar-002 {
  background-color: var(--v-secondary-base);
  .badge {
    cursor: pointer;
  }
}

// hover
.v-btn:hover:before {
  opacity: 0.35 !important;
}

.login-flex-1 {
  flex: 1 1 auto;
}

.login-middle-li:active,
.login-middle-li:focus,
.login-middle-li:active:focus,
.link-css {
  border-top: 3px solid transparent;
  border-bottom: 3px solid var(--v-primary-base);
}

.login-middle-li-btn:hover {
  color: #26ffbe !important;
}

.checkbox-label {
  font-size: 0.875rem;
}
</style>
<style lang="scss">
.LoginBar-002 {
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
}
.login-middle-li-btn {
  span {
    opacity: 1 !important;
  }
}
</style>
