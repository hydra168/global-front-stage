<template>
  <v-container class="hasBgColor">
    <v-progress-linear v-if="isLoading || checkLoading" indeterminate></v-progress-linear>
    <h3>
      {{ textFilter('balance') }}<b class="red--text">{{ this.balanceSum }}</b>
    </h3>
    <v-btn-toggle v-if="withdrawalsCurrencyList && withdrawalsCurrencyList.length" tile group v-model="payId" class="d-flex flex-wrap">
      <v-btn :color="payId == 0 ? 'success' : 'primary'" class="mr-3 mb-3 py-1 payment d-flex elevation-0" outlined small :value="0">
        <v-icon class="clip" :class="{ success: payId == 0, primary: payId != 0 }">payment</v-icon>
        CNY
      </v-btn>
      <v-btn
        v-for="(item, i) in withdrawalsCurrencyList"
        :key="i"
        :color="payId == item.PayID ? 'success' : 'primary'"
        class="mr-3 mb-3 py-1 payment d-flex elevation-0"
        outlined
        small
        :value="item.PayID"
      >
        <v-icon class="clip" :class="{ success: payId == item.PayID, primary: payId != item.PayID }">payment</v-icon>
        {{ item.PayName }}
      </v-btn>
    </v-btn-toggle>
    <v-text-field v-if="payId == 0" v-model.number="withdraw" type="number" :label="textFilter('withdrawLabel')">
      <template v-slot:prepend>
        <v-icon class="transparent primary--text">currency_yuan</v-icon>
      </template>
    </v-text-field>

    <template v-else>
      <div class="d-flex">
        <v-card class="align-center d-flex height-35px elevation-0">
          <v-icon class="grey--text">calculate</v-icon>
          <span class="grey--text">{{ textFilter('withdrawalExchangeRateLabel') }}：</span>
          <span class="pr-5 primary--text">{{ pay.Drate }}</span>
        </v-card>
        <v-card class="align-center d-flex elevation-0">
          <span class="pl-2 grey--text font-size-14 align-self-bottom">{{ textFilter('withdrawalCNYAmountLabel') }}：</span>
          <span class="primary--text font-size-18 d-block line-height-18px">{{ withdraw || 0 }}</span>
          <v-icon class="grey--text pr-2 font-size-14 align-self-bottom" small>currency_yuan</v-icon>
        </v-card>
      </div>
      <v-text-field
        v-model.number="unit"
        @input="withdraw = unit * pay.Drate"
        type="number"
        :label="`${textFilter('withdrawLabel')}（${pay && pay.CurrencyCode}）`"
      >
        <template v-slot:prepend>
          <v-icon class="transparent primary--text">currency_exchange</v-icon>
        </template>
      </v-text-field>
      <v-autocomplete
        v-if="/USDT/gi.test(pay && pay.CurrencyCode)"
        v-model="usdtAccount"
        :items="usdtWallets"
        item-value="Card"
        :label="textFilter('usdtAccountLabel')"
        :placeholder="textFilter('usdtAccountPlaceholder')"
        :rules="[v => !!v || textFilter('usdtAccountPlaceholder')]"
      >
        <template v-slot:selection="{ item }">{{ cardStarText(item.Card) }} </template>
        <template v-slot:item="{ item }">{{ cardStarText(item.Card) }} </template>
        <!-- <template v-slot:prepend><img width="20" src="./assets/icon/bank.png" /></template> -->
        <template slot="append">
          <v-btn @dragover.prevent icon color="primary" @click.prevent="$refs.qrInput.$el.click()"><v-icon>cloud_upload</v-icon></v-btn>
          <image-barcode-reader v-show="false" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
        </template>
      </v-autocomplete>
    </template>

    <v-select
      v-if="payId == 0"
      return-object
      :hint="textFilter('accountHint')"
      :noDataText="textFilter('noBankCard')"
      v-model="select"
      :items="bankCards"
      :label="textFilter('accountLabel')"
      :item-text="changeStar"
      outline
    >
    </v-select>

    <v-text-field v-model="userProfileData.username" readonly :label="$t('g_layout_userCentre_default_bankCard_nameLabel')"></v-text-field>
    <v-text-field
      v-model="withdrawPass"
      :type="visibility ? 'text' : 'password'"
      :append-icon="visibility ? 'visibility' : 'visibility_off'"
      @click:append="visibility = !visibility"
      :label="textFilter('withdrawPassLabel')"
      :placeholder="textFilter('withdrawPassPlaceholder')"
    ></v-text-field>

    <v-btn
      v-if="!(config.Hide_WithdrawalBtn === '1')"
      :disabled="isLoading || checkLoading"
      @click.stop="postWithdrawal"
      block
      depressed
      color="primary"
      >{{ textFilter('submitBtn') }}</v-btn
    >
    <v-btn color="primary" block outlined class="mt-3" @click="$router.go(-1)">{{ textFilter('cancelBtn') }}</v-btn>
    <v-list class="mt-5">
      <v-list-item>
        <v-list-item-content>
          <h4 class="mb-3">{{ textFilter('descriptionTitle') }}</h4>
          <div v-html="config.withdrawals_descriptionContents" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- 提現成功 -->
    <v-dialog v-if="dialog" v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textFilter('success') }}</v-card-title>
        <v-card-text>
          {{ textFilter('successContent1') }}
          <code color="red">{{ textFilter('successContent2') }}</code>
          {{ textFilter('successContent3') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" depressed @click="routerPush('/record')">
            {{ textFilter('confirmBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 流水任務 -->
    <v-dialog v-model="withdrawalError.show">
      <v-card>
        <v-card-title class="justify-center">{{ $t('g_com_login_default_tipTitle') }}</v-card-title>
        <v-card-text>{{ withdrawalError.text }}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="error" @click="withdrawalError.show = false">{{ $t('g_layout_userCentre_default_deposit_closeBtn') }}</v-btn>
          <v-btn color="primary" depressed @click="SHOW_LIVE_CHAT(0)" class="px-5">{{ $t('g_com_login_default_contactCustomerService') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <WithdrawalOverTime />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { MOBILE_WITHDRAWALS_DESCRIPTIONCONTENTS } from '@G/consts';
import { textReplacer, cardStarText } from '@G/utils';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import WithdrawalOverTime from '@G/components/WithdrawalOverTime.vue';
export default {
  name: 'Withdrawals',
  components: {
    ImageBarcodeReader,
    WithdrawalOverTime,
  },
  data() {
    return {
      visibility: false,
      checkLoading: true,
      showUSDT: false,
      select: {},
      Password: '',
      dialog: false,
      withdrawPass: '',
      withdraw: '',
      unit: 0,
      usdtAccount: '', // usdt 錢包地址
      originalUsdtAccount: '', // usdt 錢包地址初始值
      editUsdtAcc: false,
      timerSaver: null,
      descriptionContents: MOBILE_WITHDRAWALS_DESCRIPTIONCONTENTS.split(',').map(i => `descriptionContent${i}`),
      withdrawalError: {
        text: '',
        show: false,
      },
      payId: 0,
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'config',
      'userProfileData',
      'userInfo',
      'userBankList',
      'balanceAllInfo',
      'balanceSum',
      'postWithdrawalsStatus',
      'putPasswordStatus',
      'virtualUsdtInfo',
      'usdtWallets',
      'isWithdrawHideUsdt',
      'withdrawalsCurrencyList',
    ]),
    withdrawal_limited() {
      let arr = this.config.withdrawal_limited.split(',');
      const [lower = '', higher = ''] = arr;
      return { lower, higher, day: this.config.withdrawal_day };
    },
    bankCards() {
      return this.userBankList.filter(item => item.Bank != 'USDT');
    },
    pay() {
      return this.withdrawalsCurrencyList.find(item => item.PayID === this.payId);
    },
  },
  watch: {
    postWithdrawalsStatus(info) {
      if (info === 'success') {
        this.select = {};
        this.withdraw = '';
        this.withdrawPass = '';
        this.dialog = true;
      }
      this.POST_WITHDRAWALS_STATUS('');
    },
    // usdt 資訊
    // virtualUsdtInfo(info) {
    //   console.log(this.usdtWallets);
    //   info.account && this.usdtHandler();
    // },
    // usdt 預選定入款用錢包
    usdtWallets(wallets) {
      if (wallets.length) {
        this.usdtAccount = wallets[0].Card;
      }
    },
    payId(v) {
      return (this.payId = v ?? 0);
    },
  },
  async created() {
    this.SET_CURRENT_MENU_TITLE(this.textFilter('withdrawal'));
    // 進入頁面前檢查
    try {
      const profile = await this.GET_USER_PROFILE();
      if (!profile.username) throw { route: 'profile', key: 'msgName' }; // 1.檢查姓名
      if (!profile.cards || profile.cards.length < (this.config.ID_pic_check || 0)) throw { route: 'profile', key: 'msgCards' }; // 2.檢查身份證
      if (!this.userInfo.w) throw { route: 'withdrawalsPass', key: 'msgPassword' }; // 3.檢查取款密碼
      const bankList = await this.GET_USER_BANK_LIST();
      if (!bankList.length) throw { route: 'bankCard', key: 'msgBankCard' }; // 4.檢查銀行卡
      this.checkLoading = false;
    } catch (e) {
      e.isError ? this.$router.go(-1) : this.routerPushWarning(e);
    }
    await this.GET_VIRTUAL_USDT();
    await this.GET_WITHDRAWAL_CURRENCY_LIST();
    // this.usdtHandler();
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions([
      'GET_USER_PROFILE',
      'GET_USER_BANK_LIST',
      'POST_WITHDRAWALS',
      'PUT_SET_W_PASSWORD',
      'GET_VIRTUAL_USDT',
      'GET_WITHDRAWAL_CURRENCY_LIST',
      'PATCH_VIRTUAL_USDT',
      'SHOW_LIVE_CHAT',
    ]),
    ...mapMutations([
      'SET_CURRENT_MENU_TITLE',
      'SET_MESSAGE',
      'POST_WITHDRAWALS_STATUS',
      'PUT_PASSWORD_STATUS',
      'SET_FULL_WIDTH',
      'ADD_WALLET_QRCODE',
    ]),
    routerPushWarning(error) {
      const msg = error.key;
      this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter(msg) }), type: 'warning' });
      this.timerSaver = setTimeout(() => {
        this.$router.push(error.route);
      }, 1500);
    },
    routerPush(path) {
      this.$router.push({ path });
    },
    changeStar(item) {
      return cardStarText(item.Card);
    },
    async postWithdrawal() {
      if (this.withdraw < 100) {
        this.SET_MESSAGE({ message: this.textFilter('errorWithdrawLimit') });
        return false;
      }
      if (!this.withdrawPass) {
        this.SET_MESSAGE({ message: this.textFilter('errorWithdrawPassNull') });
        return false;
      }
      if (Number(this.withdraw) > this.balanceSum) {
        this.SET_MESSAGE({ message: this.textFilter('errorBalanceLimit') });
        return false;
      }
      if (this.payId != 0) {
        this.select = this.bankCards[0];
      }
      if (!this.select.Bank) {
        this.SET_MESSAGE({ message: this.textFilter('errorBankNull') });
        return false;
      }

      const data = {
        Amount: parseFloat(this.withdraw),
        Bank: this.select.Bank,
        Branch: this.select.Branch,
        Card: this.select.Card.replace(/\s/gi, ''),
        Name: this.userProfileData.username,
        Password: this.withdrawPass,
        usdtAccount: this.usdtAccount,
      };
      if (this.payId) {
        data.payName = this.pay.PayName;
        data.currency = this.pay.CurrencyCode;
        data.rate = this.pay.Drate;
      }
      try {
        await this.POST_WITHDRAWALS(data);
      } catch (err) {
        this.withdrawalError.text = err;
        this.withdrawalError.show = true;
      }
    },
    // USDT 資訊處理
    // usdtHandler() {
    //   this.showUSDT = Boolean(this.virtualUsdtInfo.account);
    //   if (this.showUSDT) this.usdtAccount = this.originalUsdtAccount = this.virtualUsdtInfo.account;
    // },
    // // 更新 USDT 錢包地址
    // updateUsdtAcc() {
    //   if (this.showUSDT && !this.usdtAccount) {
    //     this.SET_MESSAGE({ message: this.textFilter('errorUsdtAccountNull') });
    //     return false;
    //   }
    //   this.editUsdtAcc = false;
    //   this.PATCH_VIRTUAL_USDT({ account: this.usdtAccount });
    // },
    // // 復原 USDT 錢包地址為初始值
    // resetUsdtAcc() {
    //   this.usdtAccount = this.virtualUsdtInfo.account;
    // },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_withdrawals_', slot) : textFilter(text, 'layout_userCentre_default_withdrawals_');
    },
    highlight(text) {
      return `<i class="green--text lighten-1 title">${text}</i>`;
    },
    cardStarText,
    onDecode(content) {
      if (content) {
        this.ADD_WALLET_QRCODE(content);
        this.$refs.qrInput.$el.value = '';
      } else {
        this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter('errorUsdtAccountNull') }), type: 'warning' });
      }
    },
    qrError(error) {
      // console.log(error);
      this.$store.commit('MsgError', '格式错误');
    },
  },
  beforeDestroy() {
    clearTimeout(this.timerSaver);
  },
};
</script>

<style lang="scss" scoped>
.clip {
  color: transparent !important;
  border-radius: 0 !important;
  mask: url(./assets/icon/clip.png) no-repeat left center/auto 80%;
  width: 1.4em;
}
::v-deep {
  .v-input input,
  .v-input textarea {
    color: inherit;
    align-self: stretch;
    max-height: 100%;
  }
}
</style>
