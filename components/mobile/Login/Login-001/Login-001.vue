<template>
  <v-container>
    <v-form ref="form">
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
          v-model="Mobile"
          :error-messages="mobileError"
          prepend-icon="mobile_friendly"
          :label="textFilter('mobileLabel')"
          required
        ></v-text-field>
        <v-text-field
          v-model="referralCodeInfo"
          :error-messages="referralCodeError"
          readonly
          prepend-icon="mobile_friendly"
          :label="textFilter('referralCodeInfoLabel')"
          required
        ></v-text-field>
      </div>
    </v-form>

    <v-text-field
      v-if="showVerify"
      v-model="Value"
      :error-messages="valueError"
      prepend-icon="verified_user"
      :label="textFilter('captcha')"
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
      <div class="my-2" style="text-align: start">{{ config.entry_tips_content }}</div>
    </div>

    <v-btn block rounded large color="primary" depressed class="mb-3" :loading="isLoading" @click="postHandle">
      {{ textFilter(isLoginMode ? 'loginBtn' : 'registerBtn') }}
      <span slot="loader">{{ textFilter(isLoginMode ? 'loggingText' : 'submittingText') }}</span>
    </v-btn>
    <v-btn block rounded color="primary" large outlined :disabled="isLoading" @click="routerPush">
      {{ textFilter(isLoginMode ? 'freeRegistration' : 'hasAccount') }}
    </v-btn>

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

export default {
  name: 'Login-001',
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
      Remember: true,
      visibility: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'rememberData', 'referralCode', 'registerStatus', 'helperDetail', 'config', 'captcha']),
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
    ...mapActions(['CHECK_REMEMBER', 'GET_HELPER_DETAIL', 'POST_LOGIN', 'POST_REGISTER', 'GET_CAPTCHA']),
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
      if (this.config.multiple_domain == 'false' && !(this.referralCode.length === 6 || this.referralCode.length === 8 || !this.referralCode)) {
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
