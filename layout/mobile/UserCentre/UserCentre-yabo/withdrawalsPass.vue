<template>
  <v-container class="loginPassBox">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-card>
      <v-form ref="form" class="loginFormBox">
        <p>{{ userInfo.w ? '修改提款密码' : '首次设置提款密码' }}</p>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="withdrawlsForm.Password"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          :label="userInfo.w ? '旧提款密码：' : '登入密码'"
          :placeholder="textFilter(userInfo.w ? 'oldWithdrawalsPassword' : 'oldLoginPassword')"
          :hint="textFilter(userInfo.w ? 'oldWithdrawalsPassword' : 'oldLoginPassword')"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="withdrawlsForm.Wpass"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          :label="userInfo.w ? '新提款密码：' : '提款密码：'"
          :placeholder="textFilter('newWithdrawalsPassword')"
          :hint="textFilter('withdrawalsPasswordLimit')"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="withdrawlsForm.Rwpass"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          :label="userInfo.w ? '确认新提款密码：' : '确认提款密码：'"
          :placeholder="textFilter('repeatWithdrawalsPassword')"
          :hint="textFilter('withdrawalsPasswordLimit')"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn class="bgBTN" block large dark depressed @click="putWithdralsPass()">提交</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
const defaultWithdrawlsForm = { Password: '', Wpass: '', Rwpass: '' };

export default {
  name: 'WithdrawalsPass',
  data() {
    return {
      curTab: 0,
      show: false,
      errorMessages: [],
      withdrawlsForm: { Password: '', Wpass: '', Rwpass: '' },
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'userInfo', 'putPasswordStatus']),
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
  },
  watch: {
    $route: {
      handler() {
        this.curTab = Number(this.$route.params.cur) || 0;
      },
      immediate: true,
      deep: true,
    },
    putPasswordStatus(info) {
      info === 'success' && (this.withdrawlsForm = { ...defaultWithdrawlsForm });
      this.PUT_PASSWORD_STATUS('');
    },
    withdrawlsForm: {
      handler() {
        this.errorMessages = [];
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['PUT_W_PASSWORD', 'PUT_SET_W_PASSWORD']),
    ...mapMutations(['PUT_PASSWORD_STATUS', 'SET_FULL_WIDTH']),
    async putWithdralsPass() {
      if (this.withdrawlsForm.Password == '') {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorOldPassNull'));
        return false;
      }
      if (this.withdrawlsForm.Wpass == '') {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorNewPassNull'));
        return false;
      }
      if (this.withdrawlsForm.Rwpass == '') {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorNewPassNull'));
        return false;
      }
      if (this.withdrawlsForm.Wpass.length > 16 || this.withdrawlsForm.Wpass.length < 6) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorWithdrawalsPasswordLimit'));
        return false;
      }
      if (this.withdrawlsForm.Wpass != this.withdrawlsForm.Rwpass) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorPassDiff'));
        return false;
      }
      this.userInfo.w ? await this.PUT_W_PASSWORD(this.withdrawlsForm) : await this.PUT_SET_W_PASSWORD(this.withdrawlsForm);
    },
    resetError() {
      this.errorMessages = [];
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_modifyPass_');
    },
  },
};
</script>
<style lang="scss">
.loginFormBox {
  background: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 20px 10px;
  margin-top: 70px;
}
.loginPassBox {
  height: 100vh;
  background: rgb(246, 246, 246);
}
.bgBTN {
  background: -webkit-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
  background: -o-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
  background: -moz-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
  background: linear-gradient(to right, rgb(0, 173, 73), rgb(108, 219, 139));
}
</style>
