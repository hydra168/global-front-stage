<template>
  <v-dialog v-if="dialogShow" v-model="dialogShow" persistent max-width="500px">
    <v-card class="loginBox">
      <v-toolbar>
        <v-toolbar-title class="headline" @click="closeBoxHandle">{{ textFilter(isLoginMode ? 'login' : 'register') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="{ on }" @click="closeBoxHandle">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text class="pt-5">
        <v-container grid-list-md>
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
                v-if="requireReferralCode"
                prepend-icon="mobile_friendly"
                :label="textFilter('codeLabel')"
                required
              ></v-text-field>
            </div>
            <v-select
              class="i18n-class"
              v-if="i18nLoginPageShowComponent"
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
              {{ textFilter('remember') }}
            </div>
            <div v-else slot="label">
              {{ textFilter('termsText1') }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a v-on="on" style="text-decoration: none" @click.prevent="routerPush('terms')">{{ textFilter('userTerms') }}</a>
                </template>
                {{ textFilter('clickUserTerms') }}
              </v-tooltip>
              {{ textFilter('termsText2') }}
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

          <v-btn color="primary" block depressed :loading="isLoading" :disabled="isLoading" @click="postHandle">
            {{ textFilter(isLoginMode ? 'loginBtn' : 'registeredBtn') }}
            <span slot="loader">{{ textFilter(isLoginMode ? 'logging' : 'submitting') }}</span>
          </v-btn>

          <div class="d-flex align-center justify-center mt-3">
            <div v-if="isLoginMode">
              <v-btn color="grey darken-1" depressed @click="SET_MESSAGE({ message: textFilter('contactCustomerService') })">
                {{ textFilter('forget') }}
              </v-btn>
              |
            </div>
            <v-btn color="grey darken-1" depressed :loading="isLoading" @click="isLoginMode = !isLoginMode">
              {{ textFilter(isLoginMode ? 'freeRegistration' : 'existingAccount') }}
            </v-btn>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * [ 呼叫方式 ]
 * SET_GLOBAL_BOX('{boxName}')
 * boxName: LoginBox 登入, RegisterBox 註冊
 *
 */
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

import { PC_REGISTER_VALIDATE_MOBILE } from '../../../consts';
import { getValidator } from '@UTILS';
// import { postApiCheckName } from '../api/data/login';
import i18nMixin from '@G/mixin/i18nMixin.js';
import registerMixin from '@G/mixin/registerMixin.js';

export default {
  name: 'LoginBox',
  props: {},
  mixins: [i18nMixin, registerMixin],
  data() {
    return {
      isLoginMode: true,
      isForget: false,
      dialogShow: false,
      visibility: false,
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
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'globalBox', 'config', 'rememberData', 'referralCode', 'registerStatus', 'captcha']),
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
    dialogShow: {
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
    Value() {
      this.valueError = [];
    },
    referralCode(info) {
      this.referralCodeInfo = info;
      this.referralCodeError = [];
    },
    rememberData(info) {
      if (info.n && info.p) {
        this.Remember = true;
        this.Name = info.n;
        this.Passwd = info.p;
      }
    },
    registerStatus(info) {
      if (info && info.type === 'success') {
        this.resetForm();
        this.isLoginMode = true;
      }
      this.POST_REGISTER_STATUS(null);
    },
  },
  created() {
    this.CHECK_REMEMBER();
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX', 'SET_MESSAGE', 'POST_REGISTER_STATUS']),
    ...mapActions(['CHECK_REMEMBER', 'POST_LOGIN', 'POST_REGISTER', 'POST_CHECK_NAME', 'GET_CAPTCHA']),
    postHandle() {
      this.isLoginMode ? this.postLogin() : this.postRegister();
    },
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
    routerPush(name) {
      this.closeBoxHandle();
      this.$router.push({ name });
    },
    resetForm() {
      this.Name = '';
      this.Passwd = '';
      this.RePasswd = '';
      this.Mobile = '';
      this.Remember = true;
    },
    closeBoxHandle() {
      this.resetForm();
      this.SET_GLOBAL_BOX('');
      this.dialogShow = false;
    },
    textFilter(text) {
      return textFilter(text, 'com_loginBox_');
    },
  },
};
</script>
<style lang="scss">
.loginBox {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s; /*透明*/
    -webkit-text-fill-color: map-get(map-get($colors, primary), base); /*字體顏色*/
  }
}
</style>
