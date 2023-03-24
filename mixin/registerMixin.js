import { mapActions, mapMutations, mapGetters } from 'vuex';
import { getValidator } from '@UTILS';

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'register'當前綴
  created() {},
  data() {
    return {
      referralCodeInfo: '',
    };
  },
  mounted() {
    this.registerSetValue();
  },
  computed: {
    ...mapGetters(['isLoading', 'rememberData', 'referralCode', 'registerStatus', 'helperDetail', 'config', 'captcha', 'locale']),

    requireReferralCode() {
      return !Number(this.config.Register_Not_Required_InvitCode);
    },
  },
  methods: {
    ...mapActions(['CHECK_REMEMBER', 'GET_HELPER_DETAIL', 'POST_LOGIN', 'POST_REGISTER', 'SHOW_LIVE_CHAT', 'GET_CAPTCHA']),
    ...mapMutations(['SET_MESSAGE', 'POST_REGISTER_STATUS']),
    registerSetValue() {
      this.referralCodeInfo = this.referralCode;
    },
    registerJudged() {
      return this.registerEditable ? false : !(this.referralCodeInfo.length === 6 || this.referralCodeInfo.length === 8 || !this.referralCodeInfo);
    },
    // 以下為舊的程式碼改造

    postRegister() {
      if (this.Name == '') {
        this.nameError.push(this.textFilter('errorNameNull'));
        return false;
      }
      const namePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
      if (!namePattern.test(this.Name)) {
        this.nameError.push(this.textFilter('errorNameFormat'));
        return false;
      }
      if (this.Passwd == '') {
        this.passwordError.push(this.textFilter('errorPasswdNull'));
        return false;
      }
      if (!passwordPattern.test(this.Passwd)) {
        this.passwordError.push(this.textFilter('errorPasswdFormat'));
        return false;
      }
      if (this.Passwd != this.RePasswd) {
        this.rePasswordError.push(this.textFilter('errorPasswdDiff'));
        return false;
      }
      if (this.referralCodeInfo == '' && this.requireReferralCode) {
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
      if (this.config.register_sms_verify == 1) {
        if (!this.SmsCode && this.smsCodeError) {
          this.smsCodeError.push('请输入手机验证码');
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
      if (this.config.multiple_domain == 'false' && this.registerJudged()) {
        this.referralCodeError.push(this.textFilter('errorReferralCodeFormat'));
        this.SET_MESSAGE({ message: this.textFilter('errorReferralCode') });
        return false;
      }
      const { Name, Passwd, RePasswd, Mobile, Qqlink, referralCodeInfo: Code } = this;
      const data = {
        Name,
        Passwd,
        RePasswd,
        Mobile,
        Code,
        Qqlink,
      };
      if (this.showVerify) {
        data.Value = this.Value;
        data.Id = this.captcha.id;
      }
      if (this.config.register_sms_verify == 1) {
        data.SmsCode = this.SmsCode;
      }
      this.POST_REGISTER(data).then(res => {
        if (res.isError) {
          if (this.showVerify) this.GET_CAPTCHA();
        }
      });
    },
  },
};
