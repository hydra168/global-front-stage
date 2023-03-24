<template>
  <div id="Login-page" class="Login-004">
    <video
      v-if="loginBgVideoSrc"
      muted
      autoplay
      loop
      style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; min-width: 100%; min-height: 100%"
    >
      <source :src="loginBgVideoSrc" type="video/mp4" />
    </video>
    <v-card class="login-page-wrap" :style="staticBg">
      <img class="bottom-right-img" :src="loginBottomRightSrc" />

      <div class="page">
        <v-row no-gutters class="d-flex justify-center align-center">
          <v-col cols="2" md="2" lg="2" xl="3">
            <img class="left-img" :src="loginLeftSrc" />
          </v-col>
          <v-col cols="8" md="8" lg="8" xl="6" class="d-flex flex-column">
            <img class="top-img" :src="loginTopSrc" :width="topImageWidth" />
            <div class="border-top" />
            <v-card class="page-inner">
              <img v-if="logoUrlHandler" class="logo pa-1 ma-1" :src="logoUrlHandler" alt="logo" />
              <div class="boxes">
                <div class="box left-box">
                  <v-form class="form" ref="form">
                    <v-text-field
                      v-model="Name"
                      :error-messages="nameError"
                      required
                      counter="16"
                      maxlength="16"
                      :hint="isLoginMode ? null : textFilter('nameHint')"
                      persistent-hint
                      prepend-icon="person"
                      :label="textFilter('nameLabel')"
                    ></v-text-field>

                    <v-text-field
                      v-model="Passwd"
                      :error-messages="passwordError"
                      required
                      counter="16"
                      maxlength="16"
                      :hint="isLoginMode ? null : textFilter('passwdHint')"
                      persistent-hint
                      @keyup.enter="postHandle"
                      @click:append="visibility = !visibility"
                      :type="visibility ? 'text' : 'password'"
                      :append-icon="visibility ? 'visibility' : 'visibility_off'"
                      prepend-icon="lock"
                      :label="textFilter('passwdLabel')"
                    ></v-text-field>

                    <div v-if="!isLoginMode">
                      <v-text-field
                        v-model="RePasswd"
                        :error-messages="rePasswordError"
                        required
                        counter="16"
                        maxlength="16"
                        :type="visibility ? 'text' : 'password'"
                        :append-icon="visibility ? 'visibility' : 'visibility_off'"
                        @click:append="visibility = !visibility"
                        prepend-icon="lock"
                        :label="textFilter('rePasswdLabel')"
                      ></v-text-field>
                      <v-text-field
                        v-if="!(config.register_disable_mobile === '1')"
                        v-model="Mobile"
                        :error-messages="mobileError"
                        prepend-icon="mobile_friendly"
                        :label="textFilter('mobileLabel')"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="referralCodeInfo"
                        :error-messages="referralCodeError"
                        v-if="requireReferralCode"
                        prepend-icon="mobile_friendly"
                        :label="textFilter('referralCodeInfoLabel')"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-if="!!Number(config.register_qq)"
                        v-model="Qqlink"
                        prepend-icon="send_to_mobile"
                        :label="textFilter('QqlinkLabel')"
                      />
                    </div>
                  </v-form>
                  <v-text-field
                    v-if="showVerify"
                    v-model="Value"
                    :error-messages="valueError"
                    prepend-icon="verified_user"
                    :label="$t('g_com_loginBox_captcha')"
                    required
                  ></v-text-field>

                  <v-checkbox v-model="Remember">
                    <div v-if="isLoginMode" slot="label">
                      {{ textFilter('rememberText') }}
                    </div>
                    <div v-else slot="label" @click="getHelperDetail">
                      {{ textFilter('agreeText') }}<b>{{ textFilter('agreeItemText') }}</b>
                    </div>
                  </v-checkbox>

                  <div v-if="showVerify && captcha.b64s" @click="GET_CAPTCHA">
                    <img :src="captcha.b64s" alt="" />
                  </div>

                  <div v-if="config.is_entry_tips_show === '1'" class="mt-3 pl-1 mb-5">
                    <div class="error--text d-flex justify-start" style="text-align: start">
                      <v-icon color="red"> notifications_none </v-icon> {{ config.entry_tips_title }}
                    </div>
                    <div class="my-2 tips_content" style="text-align: start">{{ config.entry_tips_content }}</div>
                  </div>
                  <div>
                    <v-btn block large depressed color="primary" class="mb-3" :loading="isLoading" @click="postHandle">
                      {{ textFilter(isLoginMode ? 'loginBtn' : 'registerBtn') }}
                      <span slot="loader">{{ textFilter(isLoginMode ? 'loggingText' : 'submittingText') }}</span>
                    </v-btn>
                  </div>
                </div>
                <div :class="`box right-box ${!isLoginMode ? 'isRegister' : ''}`">
                  <div>
                    <v-btn block color="primary" large outlined :disabled="isLoading" @click="routerPush">
                      {{ textFilter(isLoginMode ? 'freeRegistration' : 'hasAccount') }}
                    </v-btn>
                  </div>
                  <div class="liveChatButton">
                    <v-btn block color="primary" large outlined :disabled="isLoading" @click="SHOW_LIVE_CHAT(0)">
                      {{ textFilter('customerService') }}
                    </v-btn>
                  </div>
                  <div class="appDownloadButton">
                    <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
                      <template v-slot:activator="{ on }">
                        <v-btn block color="primary" large outlined :disabled="isLoading" v-on="on || true">
                          {{ textFilter('appDownload') }}
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content class="black-text">
                              <vue-qr :text="(config && appDownloadPath) || ''" :size="250" :margin="10"></vue-qr>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="2" md="2" lg="2" xl="6"> </v-col>
        </v-row>

        <v-dialog v-model="rulesShow">
          <v-card id="login-helperDetail" class="helperDetail">
            <v-card-title class="headline">{{ textFilter('agreeItemTitle') }}</v-card-title>
            <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
            <v-card-text class="mt-5">
              <div class="helperDetailContent" v-html="helperDetail.content"></div>
            </v-card-text>
            <v-card-actions class="pa-10 pb-5">
              <v-spacer></v-spacer>
              <v-btn color="success" depressed @click="rulesShow = false">
                {{ textFilter('confirmBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
    <div id="Login-page-i18n" class="i18n-class">
      <template v-if="i18nLoginPageShowComponent">
        <v-select
          dense
          outlined
          hide-details
          class="primary--text"
          :value="locale"
          :items="langItem"
          :label="$t('g_com_loginBar_default_changeLanguage')"
          item-text="value"
          item-value="key"
          @change="i18nChangeLang"
        ></v-select>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * [ 呼叫方式 ]
 * SET_GLOBAL_BOX('{boxName}')
 * boxName: LoginBox 登入, RegisterBox 註冊
 *
 * [ props ]
 * showCode 是否顯示推薦碼欄位
 */
import VueQr from 'vue-qr';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { getValidator } from '@UTILS';
import {
  PC_LOGIN_BG_SRC,
  PC_LOGIN_LOGO_SRC,
  PC_LOGIN_BG_VIDEO_SRC,
  PC_LOGIN_BOTTOM_RIGHT_IMG_SRC,
  PC_LOGIN_LEFT_IMG_SRC,
  PC_LOGIN_TOP_IMG_SRC,
} from '@G/consts';
import loginPCMixin from '../loginPCMixin';
import i18nMixin from '@G/mixin/i18nMixin.js';
import registerMixin from '@G/mixin/registerMixin.js';

export default {
  name: 'Login-004',
  components: {
    VueQr,
  },
  mixins: [loginPCMixin, i18nMixin, registerMixin],
  props: {
    showCode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoginMode: true, // 判斷為登入或註冊
      rulesShow: false,
      // 欄位相關
      Name: '',
      nameError: [],
      Passwd: '',
      passwordError: [],
      RePasswd: '',
      rePasswordError: [],
      Mobile: '',
      mobileError: [],
      Value: '',
      valueError: [],
      referralCodeInfo: '',
      referralCodeError: [],
      Qqlink: null,
      Remember: true,
      visibility: false,
      PC_LOGIN_BG_SRC,
      PC_LOGIN_LOGO_SRC,
      PC_LOGIN_BG_VIDEO_SRC,
      PC_LOGIN_BOTTOM_RIGHT_IMG_SRC,
      PC_LOGIN_LEFT_IMG_SRC,
      PC_LOGIN_TOP_IMG_SRC,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'rememberData', 'referralCode', 'registerStatus', 'helperDetail', 'config', 'captcha', 'locale', 'appDownloadPath']),
    loginBgVideoSrc() {
      if (this.PC_LOGIN_BG_VIDEO_SRC) {
        return require(`@/${this.PC_LOGIN_BG_VIDEO_SRC}`);
      } else {
        return '';
      }
    },
    staticBg() {
      return this.loginBgVideoSrc ? 'background-color: transparent' : `background-image:url(${this.loginBgSrc});`;
    },
    isLoginVerify() {
      return !!Number(this.config.login_verify);
    },
    isRegisterVerify() {
      return !!Number(this.config.register_verify);
    },
    showVerify() {
      if (this.isLoginMode) return this.isLoginVerify;
      if (!this.isLoginMode) return this.isRegisterVerify;
      return false;
    },
    topImageWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg':
          return '400vh';
        case 'xl':
          return '550vh';
        default:
          return '400vh';
      }
    },
  },
  watch: {
    showVerify: {
      handler(v) {
        if (v && this.showVerify) {
          this.GET_CAPTCHA();
        }
      },
      immediate: true,
    },
    Name() {
      this.nameError = [];
    },
    Passwd() {
      this.passwordError = [];
    },
    RePasswd() {
      this.rePasswordError = [];
    },
    Mobile() {
      this.mobileError = [];
    },
    referralCodeInfo() {
      this.referralCodeError = [];
    },
    referralCode(info) {
      this.referralCodeInfo = info;
    },
    rememberData(info) {
      if (info) {
        this.Remember = true;
        this.Name = info.n;
        this.Passwd = info.p;
      }
    },
    registerStatus(info) {
      if (info && info.type === 'success') {
        this.$refs.form.reset();
        this.isLoginMode = true;
      }
      this.POST_REGISTER_STATUS(null);
    },
    $route: {
      handler(val) {
        this.loginModeHandler(val.name);
      },
      deep: true,
    },
  },
  created() {
    this.CHECK_REMEMBER();
    this.loginModeHandler(this.$route.name);
  },
  methods: {
    ...mapActions(['CHECK_REMEMBER', 'GET_HELPER_DETAIL', 'POST_LOGIN', 'POST_REGISTER', 'SHOW_LIVE_CHAT', 'GET_CAPTCHA']),
    ...mapMutations(['SET_MESSAGE', 'POST_REGISTER_STATUS']),
    postLogin() {
      if (this.Name == '') {
        this.nameError.push(this.textFilter('errorNameNull'));
        return false;
      }
      if (this.Passwd == '') {
        this.passwordError.push(this.textFilter('errorPasswdNull'));
        return false;
      }
      if (this.showVerify && this.Value.length !== 4) {
        this.valueError.push(this.textFilter('captchaError'));
        return false;
      }
      const data = {
        Name: this.Name,
        Passwd: this.Passwd,
        Remember: this.Remember,
      };
      if (this.showVerify) {
        data.Value = this.Value;
        data.Id = this.captcha.id;
      }
      this.POST_LOGIN(data).then(res => {
        if (res.isError) {
          if (this.showVerify) this.GET_CAPTCHA();
        }
      });
    },
    // postRegister() {
    //   if (this.Name == '') {
    //     this.nameError.push(this.textFilter('errorNameNull'));
    //     return false;
    //   }
    //   const uPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
    //   if (!uPattern.test(this.Name)) {
    //     this.nameError.push(this.textFilter('errorNameFormat'));
    //     return false;
    //   }
    //   if (this.Passwd == '') {
    //     this.passwordError.push(this.textFilter('errorPasswdNull'));
    //     return false;
    //   }
    //   if (this.Passwd.length < 6 || this.Passwd.length > 16) {
    //     this.passwordError.push(this.textFilter('errorPasswdFormat'));
    //     return false;
    //   }
    //   if (this.Passwd != this.RePasswd) {
    //     this.rePasswordError.push(this.textFilter('errorPasswdDiff'));
    //     return false;
    //   }
    //   // const pre = getValidator('mobile');
    //   // if (this.Mobile == '' || !pre.test(this.Mobile)) {
    //   //   this.mobileError.push(this.textFilter('errorMobileFormat'));
    //   //   return false;
    //   // }
    //   // 相關配置停用玩家輸入電話號碼，以時間戳記入資料 前端隱藏欄位
    //   if (this.config.register_disable_mobile == 1) {
    //     this.Mobile = String(new Date() * 1);
    //   } else {
    //     const pre = getValidator('mobile');
    //     if (this.Mobile == '' || !pre.test(this.Mobile)) {
    //       this.mobileError.push(this.textFilter('errorMobileFormat'));
    //       return false;
    //     }
    //   }
    //   if (this.Remember == false) {
    //     this.SET_MESSAGE({ message: this.textFilter('errorRememberStatus') });
    //     return false;
    //   }
    //   if (this.showVerify && this.Value.length !== 4) {
    //     this.valueError.push(this.textFilter('captchaError'));
    //     return false;
    //   }
    //   if (this.config.multiple_domain == 'false' && !(this.referralCode.length === 6 || this.referralCode.length === 8 || !this.referralCode)) {
    //     this.referralCodeError.push(this.textFilter('errorReferralCodeFormat'));
    //     this.SET_MESSAGE({ message: this.textFilter('errorReferralCode') });
    //     return false;
    //   }
    //   const data = {
    //     Name: this.Name,
    //     Passwd: this.Passwd,
    //     RePasswd: this.RePasswd,
    //     Mobile: this.Mobile,
    //     Code: this.referralCode,
    //   };
    //   if (this.showVerify) {
    //     data.Value = this.Value;
    //     data.Id = this.captcha.id;
    //   }
    //   this.POST_REGISTER(data).then(res => {
    //     if (res.isError) {
    //       if (this.showVerify) this.GET_CAPTCHA();
    //     }
    //   });
    // },
    postHandle() {
      this.isLoginMode ? this.postLogin() : this.postRegister();
    },
    loginModeHandler(name) {
      this.isLoginMode = name === 'login';
      this.isLoginMode || (this.referralCodeInfo = this.referralCode);
    },
    getHelperDetail() {
      this.GET_HELPER_DETAIL({ code: 'terms' });
      this.rulesShow = true;
    },
    routerPush() {
      const name = this.isLoginMode ? 'register' : 'login';
      this.$router.push({ name });
    },
    clearForm() {
      this.$refs.form.reset();
    },
    register() {},
    textFilter(text) {
      return textFilter(text, 'com_login_default_');
    },
  },
};
</script>
<style lang="scss" scoped>
.Login-004 ::v-deep .login-page-wrap {
  background-color: white;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  .page {
    width: 100vh;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .top-img {
      margin: 10px auto;
      max-width: 50vh;
    }
    .left-img {
      position: absolute;
      top: 40%;
      left: 5%;
      max-width: 50vh;
    }
    .border-top {
      height: 8px;
      background-image: linear-gradient(89deg, var(--v-primary-base), var(--v-primary-darken2));
    }
    .page-inner {
      padding: 0px;
      text-align: center;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .logo {
        width: 80px;
      }
      .boxes {
        display: flex;
        flex-direction: row;
        .box {
          padding: 20px;
          padding-bottom: 0px;
        }
        .left-box {
          width: 66%;
        }
        .right-box {
          width: 33%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          & > div {
            margin-bottom: 20px;
            margin-top: 20px;
          }
          .v-btn--block {
            min-width: unset !important;
            width: 150px;
          }
        }
      }
    }
  }
  .bottom-right-img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
  }
}
.i18n-class {
  position: fixed;
  top: 12px;
  right: 12px;
  width: 200px;
  z-index: 100;
}
</style>
<style lang="scss">
.helperDetailContent {
  * {
    background-color: transparent !important;
  }
}
</style>
