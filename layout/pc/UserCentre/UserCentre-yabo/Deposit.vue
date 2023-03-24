<template>
  <!-- 存款 -->
  <div id="Deposit" class="Deposit d-flex">
    <div class="width-680px mr-5 position-relative overflow-hidden deposit-form">
      <div class="white pa-5">
        <h3 class="mt-0 font-size-18 black--text font-weight-400">存款</h3>
        <h4 class="mt-4 font-size-16 black--text font-weight-400 d-flex">
          <span>支付方式</span>
          <v-spacer />
          <a class="font-size-16"> 存款教程 </a>
        </h4>
        <v-tabs v-model="currentTab" class="mt-5">
          <template v-for="(item, i) in tabList">
            <v-tab v-if="!item.lagacyType || paymentFilter(item.lagacyType).length > 0" :key="i" @click="clickTabHandler(item.code)">
              {{ item.title }}
            </v-tab>
          </template>
        </v-tabs>
      </div>
      <div class="white pa-5 mt-5">
        <!--全球支付-->
        <template v-if="currentTab == 0">
          <h3 class="mt-0 font-size-16 black--text font-weight-400">选择支付类型</h3>
          <v-tabs v-model="post.pay_type" class="d-flex flex-wrap pt-5">
            <v-tab v-for="item in newPaymentMethods" :key="item.code">
              <div class="d-flex flex-column justify-center align-center">
                <img class="width-30px" :src="findIcon(item.code)" />
                <span v-if="item.code === 'QQ'" class="font-size-14 mt-1">钉钉</span>
                <span v-else-if="item.code === 'POINT_CARD'" class="font-size-14 mt-1">Astropay</span>
                <span v-else-if="item.code === 'USDT'" class="font-size-14 mt-1">虚拟货币转账</span>
                <span v-else class="font-size-14 mt-1">{{ item.name }}</span>
              </div>
            </v-tab>
          </v-tabs>
        </template>
        <!--虛擬支付-->
        <template v-if="currentTab == 1">
          <h3 class="mt-0 font-size-16 black--text font-weight-400">选择支付类型</h3>
          <v-tabs v-model="lagacyAccount" class="d-flex flex-wrap pt-5">
            <v-tab v-for="item in paymentFilter(currentTabLagacyType)" :key="item.code" @click="lagacyPost.Account = Number(item.id)">
              <div class="d-flex flex-column justify-center align-center">
                <span class="font-size-14 mt-1">{{ item.bank }}</span>
              </div>
            </v-tab>
          </v-tabs>
        </template>
      </div>
      <div class="white pa-5 mt-5">
        <h5 class="hint my-0 d-flex justify-center font-weight-400 height-35px align-center font-size-10">
          <img class="width-15px mr-1" src="./assets/deposit/hint.png" />
          为了您的资金安全，请使用绑定的姓名存款。
        </h5>

        <!--全球支付-->
        <template v-if="paymentMethods && currentMethod && currentTab == 0">
          <!-- <v-text-field
          class="my-5 px-2"
          solo
          outlined
          dense
          persistent-hint
          v-model="post.depositName"
          hint="为及时到账，请务必输入正确的存款人姓名"
          placeholder="輸入付款人"
        >
          <template #prepend>
            <label class="mb-0 text-no-wrap font-size-14 grey--text">存款姓名 :</label>
          </template>
        </v-text-field> -->
          <template v-if="currentMethod && currentMethod.code !== 'USDT'">
            <v-text-field
              class="my-5 px-2"
              solo
              outlined
              dense
              persistent-hint
              v-model.number="post.amount"
              hint="建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账"
              placeholder="输入金额"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">存款金额 :</label>
              </template>
            </v-text-field>
          </template>
          <!--虛擬支付-->
          <template v-else>
            <v-text-field
              v-if="Number(config.depositName) === 1"
              solo
              outlined
              dense
              persistent-hint
              v-model="lagacyPost.depositName"
              hint="为及时到账，请务必输入正确的存款人姓名"
              placeholder="输入付款人"
              :rules="[v => !!v || textFilter('depositNameInputError')]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">存款姓名 :</label>
              </template>
            </v-text-field>
            <template>
              <v-text-field
                v-model="post.usdt_amount"
                @keyup="post.usdt_amount = post.usdt_amount.replace(/[^\0-9\.]/g, '').replace(/\.{2,}/g, '.')"
                :rules="[
                  v => !!v || '请输入USDT数量',
                  v => {
                    if (!Number(v)) {
                      return '请输入正确的USDT数量';
                    }
                    return true;
                  },
                ]"
                label="请输入USDT交易数量"
                required
                solo
                outlined
                dense
                persistent-hint
              >
                <!-- :rules="[val => Boolean(config.usdt_decimal_point == 1) || /^[0-9]*[1-9][0-9]*$/.test(val) || textFilter('errorAmountFormat')]" -->
                <template #prepend>
                  <!-- <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('amountLabel') }} :</label> -->
                  <label class="mb-0 text-no-wrap font-size-14 grey--text">USDT交易数量 :</label>
                </template>
              </v-text-field>

              <v-text-field readonly solo outlined dense color="primary" :value="usdtRate">
                <template #prepend>
                  <label class="mb-0 text-no-wrap font-size-14 grey--text">汇率 :</label>
                </template>
              </v-text-field>

              <v-text-field :prefix="config.unit" v-model.number="RMBAmount" required readonly solo outlined dense persistent-hint>
                <template #prepend>
                  <!-- <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('amountLabel2') }} :</label> -->
                  <label class="mb-0 text-no-wrap font-size-14 grey--text">人民币交易金额 :</label>
                </template>
              </v-text-field>
            </template>
          </template>
        </template>
        <!--/.全球支付-->

        <!--虛擬支付-->
        <template v-if="currentTab == 1">
          <v-text-field
            v-if="Number(config.depositName) === 1"
            solo
            outlined
            dense
            persistent-hint
            v-model="lagacyPost.depositName"
            hint="为及时到账，请务必输入正确的存款人姓名"
            placeholder="輸入付款人"
            :rules="[v => !!v || textFilter('depositNameInputError')]"
          >
            <template #prepend>
              <label class="mb-0 text-no-wrap font-size-14 grey--text">存款姓名 :</label>
            </template>
          </v-text-field>
          <template v-if="!lagacySysParams || !lagacySysParams.drate">
            <v-text-field
              v-model.number="lagacyPost.Amount"
              required
              solo
              outlined
              dense
              persistent-hint
              type="number"
              :hint="depositLimitPoint()"
              :rules="[
                amount => amount > 0 || textFilter('errorAmount'),
                amount => checkValid({ amount_range: lagacyAmountRange }) || depositLimitPoint(),
              ]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('amountLabel') }} :</label>
              </template>
            </v-text-field>
          </template>
          <template v-else>
            <v-text-field
              v-model="lagacyPost.Amount"
              @keyup="lagacyPost.Amount = lagacyPost.Amount.replace(/^(0+)|[^\d]+/g, '')"
              :label="textFilter('usdtLabel').replace(/usdt/gi, lagacySysParams.currencyCode)"
              required
              solo
              outlined
              dense
              persistent-hint
              type="number"
            >
              <!-- :rules="[val => Boolean(config.usdt_decimal_point == 1) || /^[0-9]*[1-9][0-9]*$/.test(val) || textFilter('errorAmountFormat')]" -->
              <template #prepend>
                <!-- <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('amountLabel') }} :</label> -->
                <label class="mb-0 text-no-wrap font-size-14 grey--text">USDT交易数量:</label>
              </template>
            </v-text-field>

            <v-text-field readonly solo outlined dense color="primary" :value="lagacySysParams.drate">
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">汇率 :</label>
              </template>
            </v-text-field>

            <v-text-field :prefix="config.unit" v-model.number="lagacyPost.resultAmount" required readonly solo outlined dense persistent-hint>
              <template #prepend>
                <!-- <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('amountLabel2') }} :</label> -->
                <label class="mb-0 text-no-wrap font-size-14 grey--text">人民币交易金额:</label>
              </template>
            </v-text-field>
          </template>
        </template>
        <!--/.虛擬支付-->

        <div class="d-flex flex-wrap" v-if="presets">
          <v-tabs :show-arrows="false" v-model="select" class="d-flex flex-wrap pt-5">
            <v-tab
              v-for="(option, i) in presets"
              :key="i"
              @click="
                post.option = lagacyPost.option = option;
                post.amount = lagacyPost.Amount = option;
                post.usdt_amount = option;
              "
            >
              <div class="d-flex flex-column justify-center">
                <span>{{ option }}</span>
              </div>
            </v-tab>
          </v-tabs>
        </div>

        <div class="d-flex flex-wrap mt-5">
          <!--全球支付-->
          <template v-if="paymentMethods && currentMethod && currentTab == 0">
            <template v-for="(channel, i) in currentMethod.channels">
              <v-btn
                v-if="channel"
                class="btn-channel py-2 mb-2 d-block channel"
                :class="{ active: checkValid(channel) }"
                :key="i"
                @click="submit(channel.id)"
                :disabled="!checkValid(channel)"
              >
                <div class="d-flex flex-column justify-center">
                  <span>{{ channel.name }}</span>
                  <span v-if="channel && channel.amount_range.length"
                    >{{ currentMethod.code === 'USDT' ? '数量' : '金额' }}范围{{ channel.amount_range[0] }} - {{ channel.amount_range[1] }}</span
                  >
                  <span v-if="channel && channel.amount_selects.length"
                    >固定{{ currentMethod.code === 'USDT' ? '数量' : '金额' }} {{ channel.amount_selects.join(',') }}
                  </span>
                </div>
                <i class="recommand" v-show="channel.recommend === 1"><img src="./assets/deposit/recommand.png" /></i>
              </v-btn>
            </template>
          </template>
          <!--/.全球支付-->
          <!--虛擬支付-->
          <template v-if="currentTab == 1">
            <v-btn
              v-if="lagacyPayment"
              class="btn-channel py-2 mb-2 d-block"
              :class="{ active: checkValid({ amount_range: lagacyAmountRange }) }"
              @click="submitLagacy()"
              :disabled="!checkValid({ amount_range: lagacyAmountRange })"
            >
              <div class="d-flex flex-column justify-center">
                <span>{{ lagacyPayment.bank }}</span>
                <span v-if="lagacyAmountRange.length">金额范围{{ lagacyAmountRange[0] }}元 - {{ lagacyAmountRange[1] }}元</span>
              </div>
            </v-btn>
          </template>
          <!--/.虛擬支付-->
        </div>
      </div>
    </div>

    <div class="width-240px">
      <BetRecords />
      <Promotions class="mt-5" />
    </div>
    <v-dialog v-model="showForm" persistent width="300px">
      <v-card>
        <v-card-title class="headline">支付确认</v-card-title>
        <v-card-text>
          <div class="pay-form" v-html="payForm"></div>
          <div v-if="showAddtionalButton" class="mt-5 flex-column d-flex justify-stretch">
            <v-btn class="py-2 d-block white--text" color="#07AF4C" @click="postForm">确认</v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#07AF4C" text @click.native="showForm = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { cloneDeep, uniq } from 'lodash';
// import { copyToClipboard } from '@UTILS';
// import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';
// import { ImageBarcodeReader } from 'vue-barcode-reader';
// import { DEPOSIT_USDT_CHANNELS } from '@G/consts';
import BetRecords from './components/BetRecords';
import Promotions from './components/Promotions';

const querySelector = selector => window.document.querySelector(selector);

export default {
  name: 'Deposit',
  components: {
    // VueQr,
    // ImageBarcodeReader,
    Promotions,
    BetRecords,
  },
  data() {
    return {
      currentTab: 1,
      tabList: [
        {
          code: 'pay1',
          title: '全球支付',
        },
        // {
        //   code: 'pay2',
        //   title: '虚拟货币',
        //   lagacyType: 7,
        // },
      ],
      RMBAmount: 0,
      lagacyAccount: null,
      select: '',
      post: { amount: 0, id: null, pay_type: null, usdt_amount: 0, currency: 'CNY' },
      lagacyPost: { Amount: 0, Account: 0, depositName: '', Code: '', resultAmount: 0, exchangeRate: 0 },
      method: null,
      payForm: null,
      showAddtionalButton: false,
      patternButton: 'form[name=pay] input:not([type=hidden]),form[name=pay] a,form[name=pay] button',
      patternForm: 'form[name=pay]',
    };
  },
  computed: {
    ...mapGetters(['config', 'paymentMethods', 'paymentAccountList', 'usdtRate']),
    currentTabLagacyType() {
      return this.tabList[this.currentTab]?.lagacyType;
    },
    newPaymentMethods() {
      const cloneArr = cloneDeep(this.paymentMethods);
      let spliceIndex;
      let spliceItem;
      cloneArr.forEach((el, index) => {
        if (el.code === 'OTHER') {
          spliceIndex = index;
          spliceItem = el;
        }
      });
      if (!spliceIndex) return cloneArr;
      cloneArr.splice(spliceIndex, 1);
      cloneArr.splice(cloneArr.length, 0, spliceItem);
      return cloneArr;
    },
    currentMethod() {
      return this.newPaymentMethods[this.post.pay_type];
    },
    lagacyPayment() {
      return this.paymentFilter(this.currentTabLagacyType ?? 7)[this.lagacyAccount];
    },
    lagacySysParams() {
      return JSON.parse(this.lagacyPayment?.sys_params || '{}');
    },
    lagacyAmountRange() {
      if (!this.lagacyPayment) {
        return [];
      }
      const { min, max } = this.lagacyPayment;
      return [Number(min), Number(max)];
    },
    presets() {
      if (this.currentTab === 0) {
        const arr = [];
        this.currentMethod?.channels?.forEach(ch => {
          ch.amount_selects.forEach(n => arr.push(Number(n)));
        });
        return uniq(arr.sort((a, b) => a - b));
      } else {
        if (!this.lagacyPayment) {
          return null;
        }
        const { max, min } = this.lagacyPayment;
        const predefined = this.lagacyPayment?.predefined?.split(',').map(n => Number(n));
        // .filter(n => n >= min && n <= max);
        return predefined;
      }
    },
    showForm: {
      get() {
        return this.payForm != null;
      },
      set(flag) {
        if (!flag) {
          this.payForm = null;
        }
      },
    },
    readonly() {
      return this.config.deposit_predefined;
    },
  },
  watch: {
    payForm() {
      this.checkForm();
    },
    presets(sets) {
      if (sets && sets.length) {
        this.lagacyPost.Amount = sets[0];
        this.post.amount = sets[0];
        this.post.usdt_amount = sets[0];
        this.post.option = sets[0];
        this.lagacyPost.option = sets[0];
        this.select = 0;
      } else {
        this.lagacyPost.Amount = '';
        this.post.amount = '';
        this.post.usdt_amount = '';
        this.lagacyPost.option = '';
        this.post.option = '';
      }
    },
    'lagacyPost.Amount'(amount) {
      const num = amount * this.lagacySysParams.drate;
      // this.lagacyPost.Amount = Math.floor(num * 100) / 100
      this.lagacyPost.resultAmount = num.toFixed(2);
    },
    'post.usdt_amount'(val) {
      const amountNum = val * this.usdtRate;
      // this.resultAmount = Math.floor(amountNum * 100) / 100;
      this.RMBAmount = amountNum.toFixed(2);
    },
    paymentAccountList() {
      this.lagacyPost.Account = this.paymentFilter(this.currentTabLagacyType)[0]?.id;
    },
    currentTabLagacyType() {
      this.lagacyPost.Account = this.paymentFilter(this.currentTabLagacyType)[0]?.id;
    },
    currentTab() {
      this.lagacyPost.Amount = this.post.amount = 0;
    },
    // 'post.pay_type'() {
    //   this.post.amount = 0;
    // },
  },
  created() {
    this.GET_PAYMENT_METHODS();
    this.GET_PAYMENT_ACCOUNTS_LIST(); // 取得 舊版付款渠道列表
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'POST_DEPOSIT_JCF', 'POST_DEPOSIT', 'NATIVE_OPEN_URL', 'GET_PAYMENT_METHODS', 'GET_PAYMENT_ACCOUNTS_LIST']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'POST_DEPOSIT_STATUS', 'SET_FULL_WIDTH', 'SET_APP_FLAG']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_deposit_', slot) : textFilter(text, 'layout_userCentre_default_deposit_');
    },
    clickTabHandler(code) {
      this.currentTab = code;
    },
    checkValid(channel) {
      // const amount = this.currentTab === 0 ? this.post.amount : this.lagacyPost.resultAmount;
      const { depositName } = this.lagacyPost;
      const { amount_selects, amount_range } = channel;
      if (this.currentTab === 0) {
        const { amount, usdt_amount } = this.post;
        let money = Number(this.currentMethod.code === 'USDT' ? usdt_amount : amount);
        return (
          money != 0 &&
          (!amount_selects?.length || amount_selects.map(n => Number(n))?.includes(money)) &&
          (!amount_range?.length || (amount_range[0] <= money && amount_range[1] >= money))
        );
      } else {
        const amount = this.lagacyPost.resultAmount;
        const condition = amount != 0 && (!amount_range?.length || (amount_range[0] <= amount && amount_range[1] >= amount));
        return condition;
      }
    },
    submit(id) {
      const deposit = cloneDeep(this.post);
      deposit.id = id;
      deposit.pay_type = this.currentMethod.code;
      if (deposit.pay_type === 'USDT') {
        delete deposit.amount;
        deposit.usdt_amount = Number(deposit.usdt_amount);
        deposit.currency = 'USDT';
      } else {
        delete deposit.usdt_amount;
        deposit.amount = Number(deposit.amount);
      }
      this.POST_DEPOSIT_JCF(deposit).then(response => {
        const { FORM } = response.result;
        if (this.isReactNativeApp) {
          const openUrl = `${location.protocol}//${location.host}/#/pay/${escape(encodeURIComponent(FORM))}`;
          this.$router.push(`/deposit?hwaoPayMethod=${openUrl}`);
        } else if (this.isNativeApp) {
          const openUrl = `${location.protocol}//${location.host}/#/pay/${encodeURIComponent(FORM)}`;
          this.NATIVE_OPEN_URL(openUrl);
        } else {
          this.payForm = FORM;
        }
      });
    },
    submitLagacy() {
      // const deposit = cloneDeep(this.lagacyPost);
      const { Account, Amount, resultAmount, Code, depositName } = this.lagacyPost;
      const deposit = { Account, Amount: Number(resultAmount) || Amount, Code, depositName };
      this.POST_DEPOSIT(deposit).then(response => {
        const { FORM } = response.result.other;
        if (this.isReactNativeApp) {
          const openUrl = `${location.protocol}//${location.host}/#/pay/${escape(encodeURIComponent(FORM))}`;
          this.$router.push(`/deposit?hwaoPayMethod=${openUrl}`);
        } else if (this.isNativeApp) {
          const openUrl = `${location.protocol}//${location.host}/#/pay/${encodeURIComponent(FORM)}`;
          this.NATIVE_OPEN_URL(openUrl);
        } else {
          this.payForm = FORM;
        }
      });
    },
    querySelector,
    checkForm() {
      setTimeout(() => {
        this.showAddtionalButton = querySelector(this.patternForm) != null && querySelector(this.patternButton) === null;
      }, 1);
    },
    postForm() {
      querySelector(this.patternForm).target = '_blank';
      querySelector(this.patternForm).submit();
    },
    paymentFilter(ty) {
      return this.paymentAccountList
        .filter(payment => Number(payment.type) == ty)
        .map(item => {
          item.id = Number(item.id);
          return item;
        });
    },
    depositLimitPoint() {
      if (this.lagacyPayment?.min && this.lagacyPayment?.max) {
        return this.textFilter('Interval', {
          min: `${this.config.unit}${this.lagacyPayment.min}`,
          max: `${this.config.unit}${this.lagacyPayment.max}`,
        });
      } else {
        return this.textFilter('enterAmount'); // 请输入金额
      }
    },
    findIcon(code) {
      try {
        const icon = require(`./assets/deposit/${code}.png`);
        return icon;
      } catch (e) {
        return require('./assets/deposit/POINT_CARD.png');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#Deposit .deposit-form ::v-deep {
  .v-tabs {
    .v-item-group {
      height: auto;
    }
  }

  .v-tab {
    border: 2px solid #e5e5e5;
    min-width: 116px;
    padding: 10px 0;
    border-radius: 6px;
    color: #666;
    &.v-tab--active {
      border-color: #0bab5e;
      color: #0bab5e;
      background: url(./assets/deposit/check.png) right bottom / 20px 20px no-repeat;
    }
    & + .v-tab {
      margin-left: 15px;
    }
  }
  .v-tabs-slider-wrapper {
    display: none;
  }
  .hint {
    color: rgb(74, 102, 88);
    background: rgb(235, 245, 240);
    margin: -10px -20px 0;
  }
  .grey--text {
    color: rgb(67, 71, 85);
  }
  .btn-channel {
    color: rgba(153, 153, 153);
    background: rgb(237, 237, 237);
    height: auto;
    border: 0;
    box-shadow: none;
    min-width: 196px;
    margin-right: 10px;
    min-height: 60px;
    position: relative;
    .recommand {
      position: absolute;
      top: -21px;
      left: -17px;
      width: 30px;
      img {
        width: 100%;
      }
    }
    &.active {
      color: #fff;
      background: linear-gradient(90deg, rgba(41, 193, 105, 1) 0%, rgba(126, 220, 153, 1) 100%) !important;
    }
    &.btn-channel--small {
      min-height: auto;
      min-width: 0;
    }
  }
  .v-input {
    flex-wrap: wrap;
    .v-input__prepend-outer {
      width: 100%;
    }
    .v-input__control {
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      .v-input__slot {
        max-width: 250px;
      }
    }
  }
  .v-slide-group.v-item-group > .v-slide-group__next,
  .v-slide-group.v-item-group > .v-slide-group__prev {
    display: none;
  }
  .v-slide-group__content {
    flex-wrap: wrap;
    height: auto;
    max-width: 100%;
    line-height: 3em;
    transform: scale(1.02);
    transform-origin: center center 0px;
    .v-tab {
      display: inline-block;
      transform: scale(0.9);
      & + .v-tab {
        margin-left: 0;
      }
    }
  }
  .v-input--is-readonly {
    .v-input__slot {
      padding: 0 !important;
      min-height: 1.2em;
      vertical-align: top;
    }
  }
}
</style>
