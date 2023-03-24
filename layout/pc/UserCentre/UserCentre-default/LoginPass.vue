<template>
  <!-- 登录密码 -->
  <div class="LoginPass">
    <h3 class="mb-5">{{ textFilter('title') }}</h3>
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <v-form ref="form" class="mt-8">
      <v-text-field
        v-model="updatePassForm.Old"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter('oldLabel')"
        required
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        :type="visibility ? 'text' : 'password'"
        counter
        @click:append="visibility = !visibility"
      >
        <template v-slot:prepend>
          <img width="20px" src="./assets/icon/pass.png" />
        </template>
      </v-text-field>
      <v-text-field
        v-model="updatePassForm.New"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter('newLabel')"
        required
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        :type="visibility ? 'text' : 'password'"
        counter
        @click:append="visibility = !visibility"
      >
        <template v-slot:prepend> <img width="20px" src="./assets/icon/pass.png" /> </template>
      </v-text-field>
      <v-text-field
        v-model="updatePassForm.ReNew"
        :error-messages="passwordError"
        prepend-icon="lock"
        :label="textFilter('reNewLabel')"
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
      <v-btn color="primary" depressed @click="updateLoginPassHandler"> <v-icon>done</v-icon>{{ textFilter('confirmBtn') }}</v-btn>
    </div>

    <!-- 提示區 -->
    <v-card color="elevation-0 grey lighten-3 grey--text text--darken-3" class="mt-5">
      <v-card-title>{{ textFilter('tips') }}</v-card-title>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LoginPass',
  data() {
    return {
      visibility: false,
      updatePassForm: { Old: '', New: '', ReNew: '' },
      passwordError: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'putPasswordStatus']),
  },
  watch: {
    putPasswordStatus(info) {
      info === 'success' && this.$refs.form.reset();
      this.PUT_PASSWORD_STATUS('');
    },
    updatePassForm: {
      handler() {
        this.passwordError = [];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'PUT_LOGIN_PASSWORD']),
    ...mapMutations(['SET_MESSAGE', 'PUT_PASSWORD_STATUS']),
    async updateLoginPassHandler() {
      if (this.updatePassForm.Old == undefined || this.updatePassForm.Old == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorOldNull'));
        return false;
      }
      if (this.updatePassForm.New == undefined || this.updatePassForm.New == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorNewNull'));
        return false;
      }
      if (this.updatePassForm.ReNew == undefined || this.updatePassForm.ReNew == '') {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorNewNull'));
        return false;
      }
      const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
      if (!passwordPattern.test(this.updatePassForm.New)) {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorNewLimit'));
        return false;
      }
      if (this.updatePassForm.New != this.updatePassForm.ReNew) {
        this.passwordError = [];
        this.passwordError.push(this.textFilter('errorPassDiff'));
        return false;
      }
      this.PUT_LOGIN_PASSWORD(this.updatePassForm);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_loginPass_');
    },
  },
};
</script>
