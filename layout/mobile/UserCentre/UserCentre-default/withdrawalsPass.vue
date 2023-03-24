<template>
  <v-container>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-tabs centered v-model="curTab">
      <v-tab ripple @click="resetError">
        {{ textFilter('withdrawalsPassword') }}
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                :error-messages="errorMessages"
                v-model="withdrawlsForm.Password"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter(userInfo.w ? 'oldWithdrawalsPassword' : 'oldLoginPassword')"
                :hint="textFilter(userInfo.w ? 'oldWithdrawalsPassword' : 'oldLoginPassword')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                :error-messages="errorMessages"
                v-model="withdrawlsForm.Wpass"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter('newWithdrawalsPassword')"
                :hint="textFilter('withdrawalsPasswordLimit')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                :error-messages="errorMessages"
                v-model="withdrawlsForm.Rwpass"
                :append-icon="'visibility'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                :label="textFilter('repeatWithdrawalsPassword')"
                :hint="textFilter('withdrawalsPasswordLimit')"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" large dark depressed @click="$router.push({ name: 'userCentre' })">{{ textFilter('cancelBtn') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" large dark depressed @click="putWithdralsPass()" class="px-5">{{ textFilter('confirmBtn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
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
      const passwordPattern = /^[A-Za-z0-9]{6,16}$/;
      if (!passwordPattern.test(this.withdrawlsForm.Wpass)) {
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
