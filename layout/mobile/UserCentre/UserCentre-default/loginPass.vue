<template>
  <v-container>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-tabs centered v-model="curTab">
      <v-tab ripple @click="resetError">
        {{ textFilter('loginPassword') }}
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                :error-messages="errorMessages"
                v-model="loginForm.OldPass"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter('oldLoginPassword2')"
                :hint="textFilter('passwordLengthLimit')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                :error-messages="errorMessages"
                v-model="loginForm.NewPass"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter('newLoginPassword')"
                :hint="textFilter('passwordLengthLimit')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                :error-messages="errorMessages"
                v-model="loginForm.RePass"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter('repeatLoginPassword')"
                :hint="textFilter('passwordLengthLimit')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" large dark depressed @click="$router.push({ name: 'userCentre' })">{{ textFilter('cancelBtn') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" large dark depressed @click="putLoginPass">{{ textFilter('confirmBtn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
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
      const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
      let { NewPass, RePass, OldPass } = this.loginForm;
      if (!passwordPattern.test(OldPass)) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorOldPassLimit'));
        return false;
      }
      if (NewPass == '' || RePass == '') {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorPassNull'));
        return false;
      }
      if (!passwordPattern.test(NewPass)) {
        this.errorMessages = [];
        this.errorMessages.push(this.textFilter('errorOldPassLimit'));
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
