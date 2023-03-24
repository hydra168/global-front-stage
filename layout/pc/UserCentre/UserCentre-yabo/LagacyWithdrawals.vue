<template>
  <!-- 我要提現 -->
  <div class="Withdrawals">
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading || isBalanceLoading || checkLoading" indeterminate></v-progress-linear>

    <!-- 資產總餘額 -->
    <div class="mb-8">
      <div class="d-flex justify-space-between my-5">
        <h3 class="headline grey--text">
          {{ textFilter('totalBalance') }}
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="error" dark v-bind="attrs" v-on="on">help_outline</v-icon>
            </template>
            <span>{{ textFilter('totalBalanceText') }}</span>
          </v-tooltip>
        </h3>
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-3" color="primary" depressed :disabled="isBalanceLoading" v-bind="attrs" v-on="on" @click="GET_BALANCE_ALL_INFO()">
                <v-icon>loop</v-icon>{{ textFilter('refreshBtn') }}
              </v-btn>
            </template>
            <span>{{ textFilter('refreshBalance') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" depressed :disabled="isLoading || isBalanceLoading" v-bind="attrs" v-on="on" @click="POST_BALANCE()">
                <v-icon>transit_enterexit</v-icon> {{ textFilter('backBtn') }}
              </v-btn>
            </template>
            <span>{{ textFilter('transferBack') }}</span>
          </v-tooltip>
        </div>
      </div>
      <div>
        <h5 :key="k" class="title mb-3" v-for="(item, k) in balanceAllInfo">
          {{ item.name }} ： <i class="title blue-grey--text">{{ config.unit }} {{ item.balance | money }}</i>
        </h5>
      </div>
    </div>

    <!-- 出金預定義金額 -->
    <div v-if="predefined.length">
      <v-chip label outlined color="red" v-for="(i, index) in predefined" @click="withdrawalForm.amount = parseInt(i)" :key="`predefined_${index}`">
        {{ i }}
      </v-chip>
    </div>

    <v-form ref="form">
      <v-text-field
        :error-messages="amountError"
        :label="textFilter('withdrawalAmountLabel')"
        :prefix="config.unit"
        v-model.number="withdrawalForm.amount"
        type="number"
      ></v-text-field>

      <v-select
        v-model="withdrawalForm.bankData"
        :error-messages="bankError"
        :items="bankCards"
        item-value="Card"
        return-object
        :label="textFilter('bankLabel')"
        :placeholder="textFilter('bankPlaceholder')"
        @change="withdrawalForm.name = withdrawalForm.bankData.Name"
      >
        <template v-slot:selection="{ item }"> {{ item.Bank }} - {{ cardStarText(item.Card) }} </template>
        <template v-slot:item="{ item }"> {{ item.Bank }} - {{ cardStarText(item.Card) }} </template>
        <template v-slot:prepend><img width="20" src="./assets/icon/homebank.png" /></template>
      </v-select>

      <v-text-field
        :error-messages="nameError"
        :label="textFilter('nameLabel')"
        prepend-icon="how_to_reg"
        :placeholder="textFilter('namePlaceholder')"
        v-model="withdrawalForm.name"
        readonly
        type="text"
        ><template v-slot:prepend><img width="20" src="./assets/icon/cardowner.png" /></template
      ></v-text-field>
      <v-text-field
        :error-messages="cardError"
        readonly
        :label="textFilter('cardLabel')"
        prepend-icon="credit_card"
        :placeholder="textFilter('cardPlaceholder')"
        :value="starCardText"
        type="text"
        ><template v-slot:prepend><img width="20" src="./assets/icon/bankcard.png" /></template
      ></v-text-field>
      <v-text-field
        :error-messages="branchError"
        readonly
        :label="textFilter('branchLabel')"
        :placeholder="textFilter('branchPlaceholder')"
        v-model="withdrawalForm.branch"
        type="text"
      >
        <template v-slot:prepend><img width="20" src="./assets/icon/branch.png" /></template>
      </v-text-field>
      <div class="d-flex align-center">
        <v-text-field
          :error-messages="passError"
          :label="textFilter('passwordLabel')"
          :placeholder="textFilter('passwordPlaceholder')"
          v-model="withdrawalForm.password"
          :readonly="!userInfo.w"
          :type="visibility ? 'text' : 'password'"
          :append-icon="visibility ? 'visibility' : 'visibility_off'"
          @click:append="visibility = !visibility"
        >
          <template v-slot:prepend><img width="20" src="./assets/icon/pass.png" /></template
        ></v-text-field>
        <v-btn v-if="!userInfo.w" outlined color="info" class="ml-5" @click="$router.push({ name: 'withdrawalsPass' })">
          {{ textFilter('createPasswordBtn') }}
        </v-btn>
      </div>

      <!-- USDT -->
      <div>
        <div class="d-flex align-center">
          <v-autocomplete
            v-model="usdtAccount"
            :items="usdtWallets"
            item-value="Card"
            :label="textFilter('usdtAccountLabel')"
            :placeholder="textFilter('usdtAccountPlaceholder')"
            :rules="[v => !!v || textFilter('usdtAccountPlaceholder')]"
          >
            <template v-slot:selection="{ item }">{{ cardStarText(item.Card) }} </template>
            <template v-slot:item="{ item }">{{ cardStarText(item.Card) }} </template>
            <template v-slot:prepend><img width="20" src="./assets/icon/homebank.png" /></template>
            <template slot="append">
              <v-btn
                @mouseenter="qrInputHover = true"
                @mouseleave="qrInputHover = false"
                @dragover.prevent
                icon
                :color="qrInputHover ? `primary` : `default`"
                @click.prevent="$refs.qrInput.$el.click()"
                ><v-icon>cloud_upload</v-icon></v-btn
              >
              <image-barcode-reader v-show="false" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
            </template>
          </v-autocomplete>
        </div>
      </div>
    </v-form>

    <div class="d-flex justify-end mt-8">
      <v-btn
        v-if="!(config.Hide_WithdrawalBtn === '1')"
        color="primary"
        class="white--text"
        depressed
        @click="postWithdrawal"
        :disabled="isLoading || checkLoading"
      >
        <v-icon small>done</v-icon> {{ textFilter('confirmBtn') }}
      </v-btn>
    </div>
    <!-- 提示區 -->
    <v-card color="grey lighten-3 grey--text text--darken-3" class="my-5">
      <v-card-title>{{ textFilter('descriptionTitle') }}</v-card-title>
      <v-card-text class="text-sm-left grey--text text--darken-3">
        <div v-html="config.withdrawals_descriptionContents" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { PC_WITHDRAWALS_DESCRIPTIONCONTENTS } from '@G/consts';
import { textReplacer, cardStarText } from '@G/utils';
import { ImageBarcodeReader } from 'vue-barcode-reader';

const defaultWithdrawalForm = {
  amount: 0,
  bankData: {},
  bank: '',
  card: '',
  branch: '',
  name: '',
  password: '',
};
export default {
  name: 'Withdrawals',
  components: {
    ImageBarcodeReader,
  },
  data() {
    return {
      visibility: false,
      checkLoading: true,
      showUSDT: false,
      predefined: [], // 出金預定義金額
      withdrawalForm: { ...defaultWithdrawalForm },
      usdtAccount: '', // usdt 錢包地址
      originalUsdtAccount: '', // usdt 錢包地址初始值
      amountError: [],
      bankError: [],
      nameError: [],
      cardError: [],
      branchError: [],
      passError: [],
      usdtError: [],
      editUsdtAcc: false,
      timerSaver: null,
      qrInputHover: false,
      qrcodes: [],
      descriptionContents: PC_WITHDRAWALS_DESCRIPTIONCONTENTS.split(',').map(i => `descriptionContent${i}`),
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'isBalanceLoading',
      'userInfo',
      'config',
      'userProfileData',
      'userBankList',
      'balanceAllInfo',
      'balanceSum',
      'postWithdrawalsStatus',
      'virtualUsdtInfo',
      'usdtWallets',
    ]),
    withdrawal_limited() {
      let arr = this.config.withdrawal_limited.split(',');
      const [lower = '', higher = ''] = arr;
      return { lower, higher, day: this.config.withdrawal_day };
    },
    starCardText() {
      return this.cardStarText(this.withdrawalForm.card);
    },
    bankCards() {
      return this.userBankList.filter(item => item.Bank != 'USDT');
    },
  },
  watch: {
    // 提交後行為
    postWithdrawalsStatus(info) {
      info === 'success' && (this.withdrawalForm = { ...defaultWithdrawalForm });
      this.POST_WITHDRAWALS_STATUS(''); // 回復預設
    },
    // usdt 資訊
    virtualUsdtInfo(info) {
      // info.account && this.usdtHandler();
    },
    'withdrawalForm.bankData'(val) {
      this.withdrawalForm.bank = val.Bank;
      this.withdrawalForm.card = val.Card;
      this.withdrawalForm.branch = val.Branch;
      this.n = val.Name;
    },
    withdrawalForm: {
      handler() {
        this.amountError = [];
        this.bankError = [];
        this.nameError = [];
        this.cardError = [];
        this.branchError = [];
        this.passError = [];
      },
      immediate: true,
      deep: true,
    },
    usdtAccount() {
      this.usdtError = [];
    },
    // usdt 預選定入款用錢包
    usdtWallets(wallets) {
      if (wallets.length) {
        this.usdtAccount = wallets[0].Card;
      }
    },
  },
  async created() {
    // 進入頁面前檢查
    try {
      const profile = await this.GET_USER_PROFILE();
      if (!profile.username) throw { route: 'profile', key: 'msgName' }; // 1.檢查姓名、身份證

      if (!profile.cards || profile.cards.length < (this.config.ID_pic_check || 0)) throw { route: 'profile', key: 'msgCards' }; // 2.檢查身份證
      const bankList = await this.GET_USER_BANK_LIST();
      if (!bankList.length) throw { route: 'bankCard', key: 'msgBankCard' }; // 3.檢查銀行卡
      this.checkLoading = false;
    } catch (e) {
      e.isError ? this.$router.go(-1) : this.routerPushWarning(e);
    }
    await this.GET_VIRTUAL_USDT();
  },
  mounted() {
    this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    // this.usdtHandler();
    // 檢查預定義金額
    this.config['withdrawal_predefined'] && (this.predefined = this.config['withdrawal_predefined'].split(','));
  },
  methods: {
    cardStarText,
    ...mapMutations(['SET_MESSAGE', 'POST_WITHDRAWALS_STATUS', 'ADD_WALLET_QRCODE']),
    ...mapActions([
      'GET_USER_PROFILE',
      'GET_USER_BANK_LIST',
      'GET_BALANCE_ALL_INFO',
      'POST_WITHDRAWALS',
      'POST_BALANCE',
      'GET_VIRTUAL_USDT',
      'PATCH_VIRTUAL_USDT',
    ]),
    routerPushWarning(error) {
      const name = error.route;
      const msg = error.key;
      this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter(msg) }), type: 'warning' });
      this.timerSaver = setTimeout(() => {
        this.$router.push({ name });
      }, 1500);
    },
    async postWithdrawal() {
      const post = _.cloneDeep(this.withdrawalForm);
      if (!post.amount) {
        this.amountError.push(this.textFilter('errorAmountNull'));
        return false;
      }
      if (post.amount > this.balanceSum) {
        this.amountError.push(this.textFilter('errorAmountLimit') + this.config['unit'] + ': ' + this.balanceSum.toFixed(2));
        return false;
      }
      if (this.config['withdrawal_limited']) {
        let limited = this.config['withdrawal_limited'].split(',');
        let min = parseInt(limited[0], 10);
        let max = parseInt(limited[1], 10);
        if (min && post.amount < min) {
          this.amountError.push(this.textFilter('withdrawalAmountMin') + this.config['unit'] + ': ' + min);
          return false;
        }
        if (max && post.amount > max) {
          this.amountError.push(this.textFilter('withdrawalAmountMax') + this.config['unit'] + ': ' + max);
          return false;
        }
      }
      if (!post.bank) {
        this.bankError.push(this.textFilter('errorBankNull'));
        return false;
      }
      if (!post.card) {
        this.cardError.push(this.textFilter('errorCardNull'));
        return false;
      }
      if (!post.password) {
        this.passError.push(this.textFilter('errorPasswordNull'));
        return false;
      }
      post.card = post.card.replace(/\s/gi, '');
      post.name = post.name.replace(/\s/gi, '');
      delete post.bankData;
      await this.POST_WITHDRAWALS({ ...post, usdtAccount: this.usdtAccount });
    },
    // // USDT 資訊處理
    // usdtHandler() {
    //   // this.showUSDT = Number(this.virtualUsdtInfo.amount) > 0;
    //   this.showUSDT = Boolean(this.virtualUsdtInfo.account);
    //   if (this.showUSDT) this.usdtAccount = this.originalUsdtAccount = this.virtualUsdtInfo.account;
    // },
    // 更新 USDT 錢包地址
    updateUsdtAcc() {
      // if (this.showUSDT && !this.usdtAccount) {
      //   this.usdtError.push(this.textFilter('errorUsdtAccountNull'));
      //   return false;
      // }
      // this.editUsdtAcc = false;
      this.PATCH_VIRTUAL_USDT({ account: this.usdtAccount });
    },
    // 復原 USDT 錢包地址為初始值
    // resetUsdtAcc() {
    //   this.usdtAccount = this.virtualUsdtInfo.account;
    // },
    textFilter(text, slot) {
      return textFilter(text, 'layout_userCentre_default_withdrawals_', slot);
    },
    highlight(text) {
      return `<i class="green--text lighten-1 title">${text}</i>`;
    },
    onDecode(content) {
      if (content) {
        this.ADD_WALLET_QRCODE(content);
        this.$forceUpdate();
        this.$refs.qrInput.$el.value = '';
      } else {
        this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter('errorUsdtAccountNull') }), type: 'warning' });
      }
    },
    qrError(error) {
      // console.log(error);
      this.SET_MESSAGE({ message: '格式错误', type: 'warning' });
    },
  },
  beforeDestroy() {
    clearTimeout(this.timerSaver);
  },
};
</script>
