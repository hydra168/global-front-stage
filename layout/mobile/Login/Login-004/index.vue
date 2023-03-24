<template>
  <!-- <v-container id="Login-page" class="m-login-page-wrap" :style="`background-image:url(${loginBgSrc})`"> -->
  <v-container id="Login-page" class="m-login-page-wrap">
    <div class="logoBox">
      <img class="logo pa-1 ma-1" :src="logoUrlHandler" alt="logo" />
    </div>
    <div class="videoBox">
      <video muted autoplay loop>
        <source src="./assets/1159login.mp4" type="video/mp4" />
      </video>
    </div>
    <v-card class="login-dialog flexBox" :style="staticBg">
      <!-- 登入用頁面 -->
      <div class="leftBox pa-5">
        <div v-if="isLoginMode">
          <h3>登录</h3>
          <v-form class="form" ref="form">
            <v-text-field
              dark
              background-color="rgba(0,0,0,0.5)"
              color="#ffffff"
              :rounded="true"
              dense
              v-model="Name"
              :error-messages="nameError"
              required
              outlined
              counter="16"
              maxlength="16"
              :hint="isLoginMode ? null : textFilter('nameHint')"
              prepend-inner-icon="person"
              label="用户名"
            ></v-text-field>
            <v-text-field
              dark
              background-color="rgba(0,0,0,0.5)"
              color="#ffffff"
              :rounded="true"
              dense
              v-model="Passwd"
              :error-messages="passwordError"
              required
              outlined
              counter="16"
              maxlength="16"
              :hint="isLoginMode ? null : textFilter('passwdHint')"
              persistent-hint
              @keyup.enter="postHandle"
              @click:append="visibility = !visibility"
              :type="visibility ? 'text' : 'password'"
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              prepend-inner-icon="lock"
              label="密码"
            ></v-text-field>
            <v-text-field
              dense
              v-if="showVerify"
              v-model="Value"
              outlined
              :error-messages="valueError"
              prepend-inner-icon="verified_user"
              :label="$t('g_com_loginBox_captcha')"
              required
            ></v-text-field>
            <v-select
              v-if="i18nLoginPageShowComponent"
              class="i18n-class"
              dense
              solo
              persistent-hint
              prepend-icon="language"
              :value="locale"
              :items="langItem"
              item-text="value"
              item-value="key"
              @change="i18nChangeLang"
            ></v-select>
            <v-checkbox v-model="Remember" color="white">
              <div slot="label">
                <span class="rememberText"> {{ textFilter('rememberText') }} </span>
              </div>
            </v-checkbox>
          </v-form>
          <div v-if="config.is_entry_tips_show === '1'" class="mt-3 pl-1 mb-5">
            <div class="error--text d-flex justify-start" style="text-align: start">
              <v-icon color="red"> notifications_none </v-icon> {{ config.entry_tips_title }}
            </div>
            <div class="my-2 tips_content" style="text-align: start">{{ config.entry_tips_content }}</div>
          </div>
          <div class="d-flex justify-center">
            <v-btn large depressed color="#fff" class="newBtn" :loading="isLoading" @click="postHandle">
              {{ textFilter('loginBtn') }}
              <span slot="loader">{{ textFilter('loggingText') }}</span>
            </v-btn>
          </div>
          <div class="btns">
            <div>
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="SHOW_LIVE_CHAT(0)"> {{ textFilter('customService') }} </v-btn>
            </div>
            <div v-if="SHOW_GUEST_LOGIN_BTN" class="guestLoginButton">
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="ROUTER_PUSH('/guest')"> {{ textFilter('guestLogin') }} </v-btn>
            </div>
            <div>
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="GET_APP_DOWNLOAD()"> {{ textFilter('appDownload') }} </v-btn>
            </div>
          </div>
          <div class="mb-2" v-if="showVerify && captcha.b64s" @click="GET_CAPTCHA">
            <img :src="captcha.b64s" alt="" />
          </div>
        </div>
        <!-- 註冊用頁面 -->
        <div v-if="!isLoginMode">
          <h3>注册</h3>
          <v-form class="form" ref="form2">
            <v-text-field
              dense
              dark
              background-color="rgba(0,0,0,0.5)"
              :rounded="true"
              v-model="Name"
              :error-messages="nameError"
              required
              outlined
              counter="16"
              maxlength="16"
              :hint="isLoginMode ? null : textFilter('nameHint')"
              persistent-hint
              prepend-inner-icon="person"
              :label="textFilter('nameLabel')"
            ></v-text-field>
            <v-text-field
              dense
              dark
              background-color="rgba(0,0,0,0.5)"
              :rounded="true"
              v-model="Passwd"
              :error-messages="passwordError"
              required
              outlined
              counter="16"
              maxlength="16"
              :hint="isLoginMode ? null : textFilter('passwdHint')"
              persistent-hint
              @keyup.enter="postHandle"
              @click:append="visibility = !visibility"
              :type="visibility ? 'text' : 'password'"
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              prepend-inner-icon="lock"
              :label="textFilter('passwdLabel')"
            ></v-text-field>
            <v-text-field
              dense
              dark
              background-color="rgba(0,0,0,0.5)"
              :rounded="true"
              v-model="RePasswd"
              :error-messages="rePasswordError"
              required
              outlined
              counter="16"
              maxlength="16"
              :type="visibility ? 'text' : 'password'"
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              @click:append="visibility = !visibility"
              prepend-inner-icon="lock"
              :label="textFilter('rePasswdLabel')"
            ></v-text-field>
            <v-row v-if="!isRegisterSMSVerify">
              <v-col cols="6">
                <v-text-field
                  dense
                  dark
                  v-if="!(config.register_disable_mobile === '1')"
                  v-model="Mobile"
                  outlined
                  :error-messages="mobileError"
                  :label="textFilter('mobileLabel')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  dense
                  dark
                  v-model="referralCodeInfo"
                  :error-messages="referralCodeError"
                  v-if="requireReferralCode"
                  outlined
                  :label="textFilter('referralCodeInfoLabel')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-if="!!Number(config.register_qq)"
                  dense
                  dark
                  outlined
                  v-model="Qqlink"
                  prepend-icon="send_to_mobile"
                  :label="textFilter('QqlinkLabel')"
                />
              </v-col>
            </v-row>
            <div v-else>
              <v-text-field
                dense
                dark
                v-if="!(config.register_disable_mobile === '1')"
                v-model="Mobile"
                outlined
                :error-messages="mobileError"
                :label="textFilter('mobileLabel')"
                required
              ></v-text-field>

              <div class="sms-code">
                <v-btn depressed @click="sendSMS" :disabled="!isCanSendSMS || !Mobile || mobileError.length !== 0">
                  {{ isCanSendSMS ? '發送手机验证码' : `${smsReSendSeconds}秒後可再次發送手机验证码` }}
                </v-btn>
              </div>
              <v-text-field
                dense
                dark
                outlined
                v-model="SmsCode"
                :error-messages="smsCodeError"
                label="请输入手机验证码"
                required
                maxlength="4"
              ></v-text-field>
              <v-text-field
                dense
                dark
                v-model="referralCodeInfo"
                :error-messages="referralCodeError"
                v-if="requireReferralCode"
                outlined
                :label="textFilter('referralCodeInfoLabel')"
                required
              ></v-text-field>
            </div>
          </v-form>
          <v-checkbox v-model="Remember" dense class="my-0" color="white">
            <div slot="label" @click="getHelperDetail" color="success" value="success">
              {{ textFilter('agreeText') }}<b>{{ textFilter('agreeItemText') }}</b>
            </div>
          </v-checkbox>
          <div v-if="config.is_entry_tips_show === '1'" class="mb-5 pl-1">
            <div class="error--text d-flex justify-start mb-2" style="text-align: start">
              <v-icon color="red"> notifications_none </v-icon> {{ config.entry_tips_title }}
            </div>
            <div class="my-0" style="text-align: start">{{ config.entry_tips_content }}</div>
          </div>
          <div class="d-flex justify-center">
            <v-btn large depressed class="newBtn" :loading="isLoading" @click="postHandle">
              {{ textFilter('registerBtn') }}
              <span slot="loader">{{ textFilter('submittingText') }}</span>
            </v-btn>
          </div>
          <div class="btns">
            <div class="liveChatButton">
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="SHOW_LIVE_CHAT(0)"> {{ textFilter('customService') }} </v-btn>
            </div>
            <div v-if="SHOW_GUEST_LOGIN_BTN" class="guestLoginButton">
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="ROUTER_PUSH('/')"> {{ textFilter('guestLogin') }} </v-btn>
            </div>
            <div class="appDownloadButton">
              <v-btn block color="#fff" outlined :disabled="isLoading" @click="GET_APP_DOWNLOAD()"> {{ textFilter('appDownload') }} </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div v-if="isLoginMode" class="login-tab-item" :class="{ 'tab-select': !isLoginMode }" @click="isLoginMode = false">
          <div class="registerBox">注册新用户</div>
        </div>
        <div v-if="!isLoginMode" class="login-tab-item" :class="{ 'tab-select': isLoginMode }" @click="isLoginMode = true">
          <div class="registerBox">返回登录</div>
        </div>
      </div>
    </v-card>
    <!-- 隱私政策彈窗 -->
    <v-dialog v-model="rulesShow">
      <v-card id="login-helperDetail">
        <v-card-title class="headline">{{ textFilter('agreeItemTitle') }}</v-card-title>
        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <v-card-text class="mt-5">
          <div v-html="helperDetail.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="rulesShow = false">
            {{ textFilter('confirmBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { getValidator } from '@UTILS';
import { MOBILE_LOGIN_BG_SRC, MOBILE_LOGIN_LOGO_SRC, SHOW_GUEST_LOGIN_BTN, MOBILE_LOGIN_BG_VIDEO_SRC } from '@G/consts';
import loginMobileMixin from '../loginMobileMixin';
import i18nMixin from '@G/mixin/i18nMixin.js';
import registerMixin from '@G/mixin/registerMixin.js';
import { getApiCaptchaSms } from '../../../../api/data/login';

export default {
  name: 'Login-002',
  props: {
    showCode: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [loginMobileMixin, i18nMixin, registerMixin],
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
      MOBILE_LOGIN_BG_SRC,
      MOBILE_LOGIN_LOGO_SRC,
      MOBILE_LOGIN_BG_VIDEO_SRC,
      SHOW_GUEST_LOGIN_BTN,
      isCanSendSMS: true,
      smsReSendSeconds: 60,
      SmsCode: '',
      smsCodeError: [],
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'rememberData',
      'referralCode',
      'registerStatus',
      'helperDetail',
      'config',
      'captcha',
      'isReactNativeApp',
      'appDownloadPath',
    ]),
    loginBgVideoSrc() {
      if (this.MOBILE_LOGIN_BG_VIDEO_SRC) {
        return require(`@/${this.MOBILE_LOGIN_BG_VIDEO_SRC}`);
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
    isRegisterSMSVerify() {
      return /^true$/i.test((Boolean(Number(this.config.register_sms_verify)) || 'false').toString());
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
  mounted() {
    // 暫時取代watch referralCode(339) 的功能
    if (this.referralCode) {
      this.referralCodeInfo = this.referralCode;
    }
  },
  methods: {
    ...mapActions([
      'CHECK_REMEMBER',
      'GET_HELPER_DETAIL',
      'POST_LOGIN',
      'POST_REGISTER',
      'SHOW_LIVE_CHAT',
      'GET_CAPTCHA',
      'GET_APP_DOWNLOAD',
      'ROUTER_PUSH',
    ]),
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
    countdown() {
      const that = this;

      this.smsReSendSeconds--;

      if (this.smsReSendSeconds != 0) {
        setTimeout(function () {
          that.countdown();
        }, 1000);
      } else {
        this.isCanSendSMS = true;
      }
    },
    async sendSMS() {
      const pre = getValidator('mobile');

      if (this.Mobile && pre.test(this.Mobile)) {
        this.smsReSendSeconds = 60;
        this.isCanSendSMS = false;

        const res = await getApiCaptchaSms({ mobile: this.Mobile });

        if (res.isError) {
          this.SET_MESSAGE({ message: res.error, type: 'error' });
          this.smsReSendSeconds = 10;
        } else {
          this.SET_MESSAGE({ message: '验证码已发送', type: 'success' });
        }

        this.countdown();
      } else {
        this.mobileError.push(this.textFilter('errorMobileFormat'));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rememberText {
  color: #fff;
  font-size: 12px;
}
.newBtn {
  background: rgba(11, 171, 94, 0.5) !important;
  width: 100%;
  border-radius: 30px;
  color: #fff;
  margin: 0 auto 20px;
}
.logoBox {
  z-index: 1;
  text-align: center;
}
.videoBox {
  display: block;
  position: fixed;
  video {
    width: auto;
    height: 130vh;
  }
}
.flexBox {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
}
.leftBox {
  width: 85%;
  h3 {
    color: #fff;
    text-align: center;
    font-size: 20px;
    margin: 0 auto 20px;
  }
}
.rightBox {
  width: 15%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0;
  h3 {
    color: #fff;
    text-align: center;
    font-size: 20px;
    margin: 0 auto 20px;
  }
}
.v-card > *:last-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.registerBox {
  position: relative;
}
.registerBox::before {
  content: '';
  display: block;
  width: 22px;
  height: 21px;
  position: absolute;
  top: -30px;
  left: -3px;
  background: url('./assets/icon1.png') no-repeat center center/cover;
}
.login-dialog {
  width: 100%;
  background: -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4)) !important;
  background: -o-linear-gradient(bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4)) !important;
  background: -moz-linear-gradient(bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4)) !important;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4)) !important;
  background-image: linear-gradient(#22242e, #0c0d10);
  .login-tab-item {
    font-family: 'PingFangTC';
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 2.5px;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      font-size: 12px;
      color: #fff;
      width: 10px;
      margin: auto 2px;
    }
  }
  .tab-select {
    font-family: 'MalayalamSangamMN';
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 2.5px;
    color: #ffffff;
    background-size: 100% 4px;
    background-position: 100% 100%;
    background-image: linear-gradient(#5a9500, #5a9500);
  }
  .box {
    width: 100%;
  }
  .left-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .btns {
    display: flex;
    justify-content: space-evenly;
    > div {
      width: 30%;
      .v-btn {
        padding: 0;
        font-size: 12px;
      }
    }
  }
  .btn-class {
    width: 200px;
    background-image: linear-gradient(#5f9a00, #316100);
    border: 1px solid #316100;
  }
  .btn-class2 {
    background-image: linear-gradient(#5f9a00, #316100);
    border: 1px solid #316100;
  }
  .wallet-title-class {
    color: #707070;
  }
  .wallet-table {
    display: flex;
    flex-direction: column;
    > * {
      background-color: #15171d;
      border-radius: 20px;
      margin: 10px 0px;
      padding: 10px 10px;
      display: flex;
      color: #a9a9a9;
      > :nth-child(1) {
        width: 50%;
      }
      > :nth-child(2) {
        width: 10%;
      }
      > :nth-child(3) {
        width: 40%;
      }
    }
  }

  .sms-code {
    padding-bottom: 22px;

    button {
      width: 100%;
      border-radius: 4px;
      color: #ffffff;
      font-size: 16px;
      height: 40px !important;
      background-color: dodgerblue;
    }
  }
}
</style>
<style lang="scss" scoped>
.m-login-page-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center center;
  padding: 0px 5%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  position: relative;
  .page-inner {
    background-color: transparent;
    padding: 5%;
    padding-top: 10%;
    text-align: center;
  }
  .logo {
    width: 50%;
    // margin-bottom: 5px;
  }
}
</style>
<style lang="scss">
#login-helperDetail {
  .v-card__text {
    * {
      background-color: transparent !important;
    }
  }
}
</style>
