<template>
  <v-card class="profile_reminder">
    <v-row>
      <v-col cols="4">
        <div class="row">
          <div class="mr-5">
            <img class="avatar" src="../assets/icon/avatar.png" alt="avatar" />
          </div>
          <div class="column">
            <div class="text-weight mb-2">
              <h3>{{ userProfileData.name }}</h3>
            </div>
            <div class="text-weight">{{ textFilter('balance') }}：{{ config.unit }} {{ balanceSum | money }}</div>
          </div>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="row" style="flex-wrap: wrap">
          <div
            v-for="reminder in remindersArr"
            :key="reminder"
            class="pa-2 col-4 detail-wrap"
            :class="reminders[reminder].class"
            @click="reminders[reminder].func(reminders[reminder])"
          >
            <v-icon>{{ reminders[reminder].icon }}</v-icon>
            {{ textFilter(reminders[reminder].title) }}
            <div :class="`${getStatusColor(reminders[reminder].status)}--text cursior-pointer detail-text`">
              {{ textFilter(reminders[reminder].statusTextMap[reminders[reminder].status]) }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ProfileReminder',
  created() {
    this.GET_USER_PROFILE();
    this.GET_USER_BANK_LIST();
  },
  watch: {
    isBankCardBinded: {
      handler(v) {
        this.reminders.bindCard.status = v;
      },
      immediate: true,
    },
    isMobileBinded: {
      handler(v) {
        this.reminders.bindMobile.status = v;
      },
      immediate: true,
    },
    isUserBaseDataOk: {
      handler(v) {
        this.reminders.base.status = v;
      },
      immediate: true,
    },
  },
  data() {
    return {
      reminders: {
        base: {
          class: 'profile',
          icon: 'person',
          title: 'base',
          status: 0,
          statusTextMap: {
            0: 'notOk',
            1: 'ok',
          },
          func: () => {
            this.$router.push('/userCentre/profile');
          },
        },
        bindCard: {
          class: 'bankCard',
          icon: 'account_balance',
          title: 'bindCard',
          status: 0,
          statusTextMap: {
            0: 'notBinded',
            1: 'binded',
          },
          func: () => {
            this.$router.push('/userCentre/bankCard');
          },
        },
        bindMobile: {
          class: 'bindMobile',
          icon: 'phone',
          title: 'bindMobile',
          status: 0,
          statusTextMap: {
            0: 'notBinded',
            1: 'binded',
          },
          func: () => {
            this.$router.push('/userCentre/profile');
          },
        },
        pwdModify: {
          class: 'pwdModify',
          icon: 'vpn_key',
          title: 'pwdModify',
          status: 2,
          statusTextMap: {
            2: 'goToModify',
          },
          func: () => {
            this.$router.push('/userCentre/loginPass');
          },
        },
        goToWallet: {
          class: 'checkWallet',
          icon: 'account_balance_wallet',
          title: 'checkWallet',
          status: 2,
          statusTextMap: {
            2: 'goToSee',
          },
          func: () => {
            this.$router.push('/userCentre/wallet');
          },
        },
        goToNotification: {
          class: 'noticeCenter',
          icon: 'mail',
          title: 'noticeCenter',
          status: 2,
          statusTextMap: {
            2: 'goToSee',
          },
          func: () => {
            this.$router.push('/userCentre/notice');
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(['config', 'balanceSum', 'userProfileData', 'userBankList']),
    formatedBalanceSum() {
      if (this.balanceSum) return `${this.config.unit}${this.balanceSum}`;
      return '0.00';
    },
    remindersArr() {
      return Object.keys(this.reminders);
    },
    isBankCardBinded() {
      return this.userBankList.length > 0 ? 1 : 0;
    },
    isIdCardBinded() {
      return !!this.userProfileData && this.userProfileData.cards.length > 0 ? 1 : 0;
    },
    isUserNameBinded() {
      return !!this.userProfileData && this.userProfileData.username ? 1 : 0;
    },
    isMobileBinded() {
      return !!this.userProfileData && this.userProfileData.mobile ? 1 : 0;
    },
    isUserBaseDataOk() {
      return this.isIdCardBinded && this.isUserNameBinded && this.isMobileBinded ? 1 : 0;
    },
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'GET_USER_BANK_LIST']),
    getStatusColor(status) {
      switch (status) {
        case 0:
          return 'error';
        case 1:
          return 'success';
        case 2:
          return 'primary';
        default:
          break;
      }
    },
    textFilter(text) {
      return textFilter(text, 'g_com_profileReminder_');
    },
  },
};
</script>
<style lang="scss" scoped>
.profile_reminder {
  padding: 30px;
  .row {
    display: flex;
    align-items: center;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .detail-wrap {
    min-width: 188px;
  }
  .detail-text {
    margin: 10px 0px 0px 30px;
  }
  .text-weight {
    font-weight: bold;
  }
  .avatar {
    width: 100%;
    max-width: 70px;
    border-radius: 50%;
  }
  .cursior-pointer {
    cursor: pointer;
    &:hover {
      color: var(--v-success-secondary) !important;
    }
  }
}
</style>
