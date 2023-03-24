<template>
  <v-dialog v-if="dialogShow" v-model="dialogShow" persistent max-width="400px">
    <div class="login-dialog">
      <div class="box d-flex justify-end pa-2">
        <v-btn icon dark @click="handleCencelLoginBox">
          <v-icon size="24">mdi-close</v-icon>
        </v-btn>
      </div>
      <!-- 登入注冊頁面 -->
      <div class="box px-5 pb-5" v-if="!isLogin">
        <!-- tab -->
        <div class="d-flex justify-space-between px-7 pb-3">
          <div class="pa-2 login-tab-item" :class="{ 'tab-select': !isLoginMode }" @click="isLoginMode = false">注册</div>
          <div class="pa-2 login-tab-item" :class="{ 'tab-select': isLoginMode }" @click="isLoginMode = true">登录</div>
        </div>
        <!-- 登入用頁面 -->
        <div v-if="isLoginMode">
          <v-form class="form" ref="form">
            <v-text-field
              dense
              v-model="Name"
              :error-messages="nameError"
              required
              outlined
              counter="16"
              maxlength="16"
              :hint="isLoginMode ? null : textFilter('nameHint')"
              prepend-inner-icon="person"
              label="输入账号（6-16位英数字）"
            ></v-text-field>

            <v-text-field
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
              label="输入密码（6-16位英数字）"
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

            <v-checkbox v-model="Remember">
              <div slot="label">
                {{ textFilter('rememberText') }}
              </div>
            </v-checkbox>
          </v-form>
          <div v-if="config.is_entry_tips_show === '1'" class="mt-3 pl-1 mb-5">
            <div class="error--text d-flex justify-start" style="text-align: start">
              <v-icon color="red"> notifications_none </v-icon> {{ config.entry_tips_title }}
            </div>
            <div class="my-2" style="text-align: start">{{ config.entry_tips_content }}</div>
          </div>
          <div class="d-flex justify-center">
            <v-btn large depressed color="primary" class="mb-3 btn-class" :loading="isLoading" @click="postHandle">
              {{ textFilter('loginBtn') }}
              <span slot="loader">{{ textFilter('loggingText') }}</span>
            </v-btn>
          </div>
          <div class="btns">
            <div>
              <v-btn block color="#818185" large outlined :disabled="isLoading" @click="SHOW_LIVE_CHAT(0)">
                {{ textFilter('customerService') }}
              </v-btn>
            </div>
            <div>
              <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
                <template v-slot:activator="{ on }">
                  <v-btn block color="#818185" large outlined :disabled="isLoading" v-on="on || true">
                    {{ textFilter('appDownload') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content class="black-text">
                        <vue-qr :text="(config && appDownloadPath) || ''" :size="140" :margin="10"></vue-qr>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
          <div class="mb-2" v-if="showVerify && captcha.b64s" @click="GET_CAPTCHA">
            <img :src="captcha.b64s" alt="" />
          </div>
        </div>
        <!-- 註冊用頁面 -->
        <div v-if="!isLoginMode">
          <v-form class="form" ref="form2">
            <v-text-field
              dense
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
            <v-row>
              <v-col cols="7">
                <v-text-field
                  dense
                  v-model="Mobile"
                  outlined
                  :error-messages="mobileError"
                  :label="textFilter('mobileLabel')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  dense
                  v-model="referralCodeInfo"
                  :error-messages="referralCodeError"
                  v-if="requireReferralCode"
                  outlined
                  :label="textFilter('referralCodeInfoLabel')"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-checkbox v-model="Remember" class="my-1">
            <div slot="label" @click="getHelperDetail">
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
            <v-btn large depressed class="mb-3 btn-class" :loading="isLoading" @click="postHandle">
              {{ textFilter('registerBtn') }}
              <span slot="loader">{{ textFilter('submittingText') }}</span>
            </v-btn>
          </div>
          <div class="btns">
            <div>
              <v-btn block color="#818185" large outlined :disabled="isLoading" @click="SHOW_LIVE_CHAT(0)">
                {{ textFilter('customerService') }}
              </v-btn>
            </div>
            <div>
              <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
                <template v-slot:activator="{ on }">
                  <v-btn block color="#818185" large outlined :disabled="isLoading" v-on="on || true">
                    {{ textFilter('appDownload') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content class="black-text">
                        <vue-qr :text="(config && appDownloadPath) || ''" :size="140" :margin="10"></vue-qr>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  </v-dialog>
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
import { PC_LOGIN_BG_SRC, PC_LOGIN_LOGO_SRC, PC_LOGIN_BG_VIDEO_SRC } from '@G/consts';
export default {
  name: 'LoginBox-001',
  components: {
    VueQr,
  },
  props: {
    showCode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogShow: false,
      //
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
      Remember: true,
      visibility: false,
      PC_LOGIN_BG_SRC,
      PC_LOGIN_LOGO_SRC,
      PC_LOGIN_BG_VIDEO_SRC,
      logoUrl: '',
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'rememberData',
      'referralCode',
      'globalBox',
      'registerStatus',
      'helperDetail',
      'config',
      'captcha',
      'locale',
      'userInfo',
      'isLogin',
      'appDownloadPath',
    ]),
    loginBgVideoSrc() {
      if (this.PC_LOGIN_BG_VIDEO_SRC) {
        return require(`@/${this.PC_LOGIN_BG_VIDEO_SRC}`);
      } else {
        return '';
      }
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
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
    globalBox(info) {
      this.isLoginMode = info === 'LoginBox';
      this.dialogShow = info === 'LoginBox' || info === 'RegisterBox';
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
  },
  created() {
    this.CHECK_REMEMBER();
    // this.loginModeHandler(this.$route.name);
    this.loginModeHandler();
  },
  methods: {
    ...mapActions([
      'CHECK_REMEMBER',
      'GET_HELPER_DETAIL',
      'POST_LOGIN',
      'POST_REGISTER',
      'SHOW_LIVE_CHAT',
      'GET_CAPTCHA',
      'GET_LOGOUT',
      'ROUTER_PUSH',
    ]),
    ...mapMutations(['SET_MESSAGE', 'POST_REGISTER_STATUS', 'SET_GLOBAL_BOX']),
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
    postRegister() {
      if (this.Name == '') {
        this.nameError.push(this.textFilter('errorNameNull'));
        return false;
      }
      const uPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (!uPattern.test(this.Name)) {
        this.nameError.push(this.textFilter('errorNameFormat'));
        return false;
      }
      if (this.Passwd == '') {
        this.passwordError.push(this.textFilter('errorPasswdNull'));
        return false;
      }
      if (this.Passwd.length < 6 || this.Passwd.length > 16) {
        this.passwordError.push(this.textFilter('errorPasswdFormat'));
        return false;
      }
      if (this.Passwd != this.RePasswd) {
        this.rePasswordError.push(this.textFilter('errorPasswdDiff'));
        return false;
      }
      if (this.referralCodeInfo == '') {
        this.referralCodeError.push('推荐码不能为空');
        return false;
      }
      if (this.config.register_disable_mobile == 1) {
        this.Mobile = String(new Date() * 1);
      } else {
        const pre = getValidator('mobile');
        if (this.Mobile == '' || !pre.test(this.Mobile)) {
          this.mobileError.push(this.textFilter('errorMobileFormat'));
          return false;
        }
      }
      if (this.Remember == false) {
        this.SET_MESSAGE({ message: this.textFilter('errorRememberStatus') });
        return false;
      }
      if (this.showVerify && this.Value.length !== 4) {
        this.valueError.push(this.textFilter('captchaError'));
        return false;
      }
      if (this.config.multiple_domain == 'false' && !(this.referralCode.length === 6 || this.referralCode.length === 8)) {
        this.referralCodeError.push(this.textFilter('errorReferralCodeFormat'));
        this.SET_MESSAGE({ message: this.textFilter('errorReferralCode') });
        return false;
      }
      const data = {
        Name: this.Name,
        Passwd: this.Passwd,
        RePasswd: this.RePasswd,
        Mobile: this.Mobile,
        Code: this.referralCode,
      };
      if (this.showVerify) {
        data.Value = this.Value;
        data.Id = this.captcha.id;
      }
      this.POST_REGISTER(data).then(res => {
        if (res.isError) {
          if (this.showVerify) this.GET_CAPTCHA();
        }
      });
    },
    postHandle() {
      this.isLoginMode ? this.postLogin() : this.postRegister();
    },
    loginModeHandler() {
      this.isLoginMode || (this.referralCodeInfo = this.referralCode);
    },
    getHelperDetail() {
      this.GET_HELPER_DETAIL({ code: 'terms' });
      this.rulesShow = true;
    },
    clearForm() {
      this.$refs.form.reset();
    },
    register() {},
    textFilter(text) {
      return textFilter(text, 'com_login_default_');
    },
    // 安全的關閉彈窗
    handleCencelLoginBox() {
      this.SET_GLOBAL_BOX('');
    },
  },
};
</script>
<style lang="scss">
.login-dialog {
  width: 100%;
  background-image: linear-gradient(#22242e, #0c0d10);
  // position: absolute;
  // top: 70px;
  // right: 100px;
  // width: 500px;
  // box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  // box-shadow: 0 0 6px 0 #0c0e12, inset 0 2px 2px 0 #707788;
  // z-index: 202;
  .login-tab-item {
    font-family: 'PingFangTC';
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 2.5px;
    color: #afafaf;
    cursor: pointer;
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
    background-image: linear-gradient(var(--v-primary-darken1), var(--v-primary-darken1));
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
      width: 32%;
    }
  }
  .btn-class {
    width: 200px;
    background-image: linear-gradient(var(--v-anchor-base), var(--v-primary-darken2));
    border: 1px solid var(--v-primary-darken2);
  }
  .btn-class2 {
    background-image: linear-gradient(var(--v-anchor-base), var(--v-primary-darken2));
    border: 1px solid var(--v-primary-darken2);
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
}
</style>
