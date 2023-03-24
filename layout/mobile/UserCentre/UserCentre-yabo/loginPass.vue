<template>
  <v-container class="loginPassBox">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-card>
      <v-form ref="form" class="loginFormBox">
        <p>修改登录密码</p>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="loginForm.OldPass"
          :append-icon="'visibility'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="旧密码："
          :placeholder="textFilter('oldLoginPassword2')"
          :hint="textFilter('passwordLengthLimit')"
          class="input-group--focused"
          @click:append="show = !show"
          height="45"
        ></v-text-field>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="loginForm.NewPass"
          :append-icon="'visibility'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="新密码："
          :placeholder="textFilter('newLoginPassword')"
          :hint="textFilter('passwordLengthLimit')"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          outlined
          color="#4CAF50"
          :error-messages="errorMessages"
          v-model="loginForm.RePass"
          :append-icon="'visibility'"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="确认密码："
          :placeholder="textFilter('repeatLoginPassword')"
          :hint="textFilter('passwordLengthLimit')"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn class="bgBTN" block large dark depressed @click="putLoginPass">提交</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
const defaultLoginForm = { NewPass: '', RePass: '', OldPass: '' };

export default {
  name: 'LoginPass',
  data() {
    return {
      curTab: 0,
      show: false,
      errorMessages: [],
      loginForm: {
        NewPass: '',
        RePass: '',
        OldPass: '',
      },
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
      info === 'success' && (this.loginForm = { ...defaultLoginForm });
      this.PUT_PASSWORD_STATUS('');
    },
    loginForm: {
      handler() {
        this.errorMessages = [];
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['PUT_LOGIN_PASSWORD']),
    ...mapMutations(['PUT_PASSWORD_STATUS', 'SET_FULL_WIDTH']),
    async putLoginPass() {
      const _ = this;
      const uPattern = /^[A-Za-z0-9]{6,16}$/;
      let { NewPass, RePass, OldPass } = this.loginForm;
      if (!uPattern.test(OldPass)) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorOldPassLimit'));
        return false;
      }
      if (!uPattern.test(NewPass) || NewPass == '' || RePass == '') {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorPassNull'));
        return false;
      }
      if (NewPass != RePass) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorPassDiff'));
        return false;
      }
      await this.PUT_LOGIN_PASSWORD({
        New: this.loginForm.NewPass,
        ReNew: this.loginForm.RePass,
        Old: this.loginForm.OldPass,
      });
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
.loginPassBox {
  .v-icon.v-icon {
    font-size: 18px;
  }
}
</style>
