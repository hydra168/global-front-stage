<template>
  <!-- 取款密碼 -->
  <div class="WithdrawalsPass">
    <h3 class="mb-5">{{ textFilter('title') }}</h3>
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <v-form ref="form" class="mt-8">
      <v-text-field
        v-model="updatePassForm.Password"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter(userInfo.w == false ? `oldLoginPassword` : `oldWithdrawalsPassword`)"
        required
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        :type="visibility ? 'text' : 'password'"
        counter
        @click:append="visibility = !visibility"
      >
        <template v-slot:prepend> <img width="20px" src="./assets/icon/pass.png" /> </template>
      </v-text-field>
      <v-text-field
        v-model="updatePassForm.Wpass"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter('wpassLabel')"
        required
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        :type="visibility ? 'text' : 'password'"
        counter
        @click:append="visibility = !visibility"
      >
        <template v-slot:prepend> <img width="20px" src="./assets/icon/pass.png" /> </template>
      </v-text-field>
      <v-text-field
        v-model="updatePassForm.Rwpass"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter('rwpassLabel')"
        required
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        :type="visibility ? 'text' : 'password'"
        counter
        @click:append="visibility = !visibility"
      >
        <template v-slot:prepend> <img width="20px" src="./assets/icon/pass.png" /> </template>
      </v-text-field>
    </v-form>
    <div class="d-flex flex-row-reverse mt-5">
      <v-btn color="primary" @click="updatePassHandler" depressed> <v-icon>done</v-icon>{{ textFilter('modifyBtn') }}</v-btn>
    </div>

    <!-- 提示區 -->
    <v-card color="elevation-0 grey lighten-3 grey--text text--darken-3" class="mt-5">
      <v-card-title>{{ textFilter('tipsTitle') }}</v-card-title>
      <v-card-text class="grey--text text--darken-3">
        <ul class="ul-decimal">
          <li>{{ textFilter('tipsContent1') }}</li>
          <li>{{ textFilter('tipsContent2') }}</li>
          <li>{{ textFilter('tipsContent3') }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'WithdrawalsPass',
  data() {
    return {
      visibility: false,
      updatePassForm: {
        Password: '',
        Wpass: '',
        Rwpass: '',
      },
      passwordError: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'userInfo', 'putPasswordStatus']),
  },
  watch: {
    putPasswordStatus(info) {
      info === 'success' && this.$refs.form.reset();
      this.PUT_PASSWORD_STATUS('');
    },
    passwd: {
      handler: function () {
        this.passwordError = [];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions(['PUT_SET_W_PASSWORD', 'PUT_W_PASSWORD']),
    ...mapMutations(['SET_MESSAGE', 'PUT_PASSWORD_STATUS']),
    async updatePassHandler() {
      if (this.updatePassForm.Password == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorOldPasswordNull'));
        return false;
      }
      if (this.updatePassForm.Wpass == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorNewPasswordNull'));
        return false;
      }
      if (this.updatePassForm.Rwpass == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorNewPasswordNull'));
        return false;
      }
      const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
      if (!passwordPattern.test(this.updatePassForm.Wpass)) {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorPasswordFormat'));
        return false;
      }
      if (this.updatePassForm.Wpass != this.updatePassForm.Rwpass) {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorPasswordDiff'));
        return false;
      }
      this.userInfo.w ? await this.PUT_W_PASSWORD(this.updatePassForm) : await this.PUT_SET_W_PASSWORD(this.updatePassForm);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_withdrawalsPass_');
    },
  },
};
</script>
