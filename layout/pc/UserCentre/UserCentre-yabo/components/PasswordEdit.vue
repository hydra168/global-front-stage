<template>
  <div class="ProfileEdit white pa-5">
    <h3 class="mt-0 black--text d-flex font-weight-400 align-center">
      密码
      <v-spacer />
      <!-- <span class="error--text font-size-12">USDT钱包添加一组即可</span> -->
    </h3>
    <div class="d-flex mt-5 font-size-14 grey--text line-height-40px">
      <label class="field-name">登录密码：</label>
      <div class="d-flex flex-column pl-1em flex-grow-1">
        <span class="line-height-40px font-size-20 letter-spacing-2px pt-1">********</span>
      </div>
      <div class="d-flex align-end justify-flex-end">
        <v-btn outlined class="grey--text d-block" depressed @click="changePassword"> 修改 </v-btn>
      </div>
    </div>
    <div class="d-flex mt-5 font-size-14 grey--text line-height-40px">
      <label class="field-name">提款密码：</label>
      <div class="d-flex flex-column pl-1em flex-grow-1">
        <span class="line-height-40px font-size-20 letter-spacing-2px pt-1">********</span>
      </div>
      <div class="d-flex align-end justify-flex-end">
        <v-btn outlined class="grey--text d-block" depressed @click="changeWPassword"> 修改 </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PasswordEdit',
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  created() {
    if (this.$route.name == 'changePassword') {
      this.changeWPassword();
    }
  },
  watch: {
    $route(route) {
      if (this.$route.name == 'changePassword') {
        this.changeWPassword();
      }
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['isLoading', 'userInfo', 'putPasswordStatus']),
    password() {
      return {
        title: '修改登入密码',
        submit: { action: this.PUT_LOGIN_PASSWORD, text: '提交' },
        fields: [
          {
            text: '旧登入密码：',
            name: 'Old',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: '请输入旧登入密码',
            required: true,
            visible: false,
          },
          {
            text: '新登入密码：',
            name: 'New',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: '请输入新登入密码',
            required: true,
            visible: false,
          },
          {
            text: '确认登入密码：',
            name: 'ReNew',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: '确认登入密码',
            required: true,
            visible: false,
          },
        ],
        form: { Old: null, New: null, ReNew: null },
        hint: {
          title: '温馨提示',
          text: `密码必须是 6-16 位字符之间，由字母和数字组成。<br>
                如您忘记登录密码，请及时联系在线客服协助找回。<br>
                定期修改密码可以让您的账户更安全。`,
        },
      };
    },
    withdrawPassword() {
      return {
        title: this.userInfo.w ? '修改提款密码' : '首次设置提款密码',
        submit: { action: this.userInfo.w ? this.PUT_W_PASSWORD : this.PUT_SET_W_PASSWORD, text: '提交' },
        fields: [
          {
            text: this.userInfo.w ? '旧提款密码：' : '登入密码',
            name: 'Password',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: this.userInfo.w ? '请输入旧提款密码' : '请输入登入密码',
            required: true,
            visible: false,
          },
          {
            text: this.userInfo.w ? '新提款密码' : '提款密码',
            name: 'Wpass',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: this.userInfo.w ? '请输入新提款密码' : '请输入提款密码',
            required: true,
            visible: false,
          },
          {
            text: this.userInfo.w ? '确认新提款密码：' : '确认提款密码：',
            name: 'Rwpass',
            type: 'password',
            rules: [v => !!v || '不可空白'],
            placeholder: this.userInfo.w ? '确认新提款密码' : '确认提款密码',
            required: true,
            visible: false,
          },
        ],
        form: { Password: null, Wpass: null, Rwpass: null },
        hint: {
          title: '温馨提示',
          text: `密码必须是 6-16 位字符之间，由字母和数字组成。<br>
                如您忘记登录密码，请及时联系在线客服协助找回。<br>
                定期修改密码可以让您的账户更安全。`,
        },
      };
    },
    draw: {
      get() {
        return this.value;
      },
      set(payload) {
        this.$emit('input', payload);
      },
    },
  },
  methods: {
    ...mapActions(['PUT_LOGIN_PASSWORD', 'PUT_SET_W_PASSWORD', 'PUT_W_PASSWORD']),
    changePassword() {
      this.draw = this.password;
    },
    changeWPassword() {
      this.draw = this.withdrawPassword;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_bankCard_');
    },
  },
};
</script>
