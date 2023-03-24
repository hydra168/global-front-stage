<template>
  <v-container class="LoginBar-defalut ma-0 pa-0" fluid>
    <v-row align="center" justify="end" class="LoginBar-defalut__row">
      <!-- Logo -->
      <v-col :cols="logoCols" v-if="logoUrlHandler == ''">
        <template v-if="isShowLink">
          <span :class="`link ${textColor}--text`" style="cursor: pointer" @click="$router.push('/')">{{ textFilter('home_page') }}</span>
          <span :class="`${textColor}--text`">｜</span>
          <span :class="`link ${textColor}--text`" style="cursor: pointer" @click="SHOW_LIVE_CHAT()">{{ textFilter('online_service') }}</span>
        </template>
      </v-col>
      <v-col :cols="logoCols" v-else>
        <v-img :width="logoWidth" :src="logoUrlHandler" @click="$router.push('/')" style="cursor: pointer"></v-img>
      </v-col>
      <!-- 已登錄 -->
      <v-col class="isLogin" :cols="isLoginCols" v-if="isLogin">
        <v-row no-gutters xs12 align="center" justify="end">
          <span :class="`hi ${textColor}--text`" style="margin-right: 10px">{{ textFilter('hi') }}!</span>
          <a :class="`username mr-5 ${textColor}--text`" @click="$router.push('/userCentre')">
            <label style="cursor: pointer">{{ textFilter('hello') + userInfo.name + textFilter('welcome') }}</label>
          </a>
          <aside class="mailBtn d-inline-block mr-6" @click="handleClick('/userCentre/notice')">
            <v-badge color="red" class="badge">
              <span slot="badge" v-if="mailNumber !== ''">{{ mailNumber }}</span>
              <v-icon large :color="textColor">mail</v-icon>
            </v-badge>
          </aside>
          <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
            <template v-slot:activator="{ on }">
              <v-btn
                v-bind="btnBind"
                class="balance primary"
                :class="[` ${textColor}--text`]"
                :loading="isBalanceLoading"
                v-on="on || true"
                @click="GET_BALANCE_ALL_INFO()"
              >
                {{ textFilter('balance') }}
                <v-icon small class="spinner">cached</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <template v-for="(item, i) in balanceAllInfo">
                  <template v-if="i != -2 && (i < 201 || i > 230)">
                    <v-list-item :key="i">
                      <v-list-item-content v-if="item.name == undefined || item.name == null || item.name == ''" class="black-text">
                        --
                      </v-list-item-content>
                      <v-list-item-content v-else class="black-text">
                        {{ item.name }} {{ config.unit }} {{ item.balance | money }}
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </template>
                <v-list-item v-if="gameWallet != null">
                  <v-list-item-content class="black-text"> {{ gameWalletLabel }} {{ config.unit }} {{ gameWallet | money }} </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <v-btn
            v-if="depositBtn"
            v-bind="btnBind"
            class="deposit primary ml-3"
            :class="[` ${textColor}--text`]"
            @click="handleClick('/userCentre/deposit')"
          >
            {{ textFilter('deposit') }}
          </v-btn>
          <v-btn
            v-if="withdrawalsBtn"
            v-bind="btnBind"
            class="withdrawals primary ml-3"
            :class="[` ${textColor}--text`]"
            @click="handleClick('/userCentre/withdrawals')"
          >
            {{ textFilter('withdrawal') }}
          </v-btn>
          <v-btn
            v-if="personalCenter"
            v-bind="btnBind"
            class="personalCenter primary ml-3"
            :class="[` ${textColor}--text`]"
            :loading="isBalanceLoading"
            @click="handleClick('/userCentre/withdrawals')"
          >
            {{ textFilter('personal_center') }} <v-icon small>undo</v-icon>
          </v-btn>
          <v-btn v-bind="btnBind" hide-details :loading="isLoading" class="logout ml-4" :class="[logoutBtnColor]" depressed @click="GET_LOGOUT">
            {{ textFilter('logout') }}
          </v-btn>
          <v-col cols="2" class="ml-2" v-if="isShowI18n">
            <v-select
              dense
              outlined
              hide-details
              class="primary--text"
              :dark="dark"
              v-model="lang"
              :items="langItem"
              :label="textFilter('changeLanguage')"
              item-text="value"
              item-value="key"
              @change="changeLang"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <!-- 未登錄 -->
      <v-col class="isNotLogin" :cols="noLoginCols" v-if="!isLogin">
        <v-row no-gutters xs12 align="center" justify="end">
          <v-col :cols="loginInfoCols">
            <v-text-field
              :color="textColor"
              :dark="dark"
              dense
              class="mx-2 d-inline-block"
              hide-details
              outlined
              v-model="loginInfo.Name"
              required
              :placeholder="textFilter('account')"
            ></v-text-field>
          </v-col>
          <v-col :cols="loginInfoCols">
            <v-text-field
              class="ma-2 d-inline-block"
              :color="textColor"
              :dark="dark"
              outlined
              dense
              v-model="loginInfo.Passwd"
              required
              hide-details
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              :type="visibility ? 'text' : 'password'"
              @click:append="visibility = !visibility"
              @keyup.enter="login(loginInfo)"
              :placeholder="textFilter('password')"
            ></v-text-field>
          </v-col>
          <v-col cols="5" class="pa-0 ma-0 d-inline-block">
            <v-checkbox :color="textColor" hide-details dense class="my-0 mx-5 pa-0 d-inline-block" v-model="loginInfo.Remember">
              <span :class="`${textColor}--text`" slot="label">{{ textFilter('remember') }}</span>
            </v-checkbox>
            <v-btn v-bind="btnBind" class="d-inline-block mx-2" :class="[registerBtnColor]" @click.stop="handleClick('register')">
              {{ textFilter('registered') }}
            </v-btn>
            <v-btn v-bind="btnBind" class="d-inline-block mx-2 px-8" :class="[loginBtnColor]" :loading="isLoading" @click.native="login(loginInfo)">
              {{ textFilter('login') }}
            </v-btn>
          </v-col>
          <v-col cols="2" v-if="isShowI18n">
            <v-select
              dense
              outlined
              hide-details
              class="primary--text"
              :dark="dark"
              v-model="lang"
              :items="langItem"
              :label="textFilter('changeLanguage')"
              item-text="value"
              item-value="key"
              @change="changeLang"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LoginBar-defalut',
  props: {
    logoUrl: {
      type: String,
      default: '',
    },
    logoWidth: {
      type: Number,
      default: 200,
    },
    personalCenter: {
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
    textColor: {
      type: String,
      default: 'grey',
    },
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
    dark: {
      type: Boolean,
      default: false,
    },
    isLoginCols: {
      type: Number,
      default: 10,
    },
    noLoginCols: {
      type: Number,
      default: 10,
    },
    logoCols: {
      type: Number,
      default: 2,
    },
    loginInfoCols: {
      type: Number,
      default: 2,
    },
    isShowLink: {
      type: Boolean,
      default: true,
    },
    /**
     * button bind擴充用
     */
    btnCommonBind: {
      //button共用 bind
      type: Object,
    },
    isShowI18n: {
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
    btnBind() {
      return Object.assign({ text: true, small: true }, this.btnCommonBind);
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
    ...mapActions(['GET_LOGOUT', 'GET_BALANCE_ALL_INFO', 'POST_LOGIN', 'CHECK_REMEMBER', 'SHOW_LIVE_CHAT', 'LOCALE_HANDLER']),
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
      return textFilter(text, 'com_loginBar_default_');
    },
    changeLang() {
      this.LOCALE_HANDLER({ lang: this.lang });
    },
    login(loginInfo) {
      this.SET_LOGIN_REDIRECT(null);
      this.POST_LOGIN(loginInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
.LoginBar-defalut {
  padding: initial;
  &__row {
    padding: initial;
    margin: initial;
    height: 70px;
  }
  .badge {
    cursor: pointer;
  }
}

// hover
.v-btn:hover:before {
  opacity: 0.35 !important;
}
.link:hover {
  opacity: 0.35;
}
</style>
<style lang="scss">
.LoginBar-defalut {
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
</style>
