<template>
  <v-container id="Deposit" class="Deposit">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <!-- step 1 -->
    <v-list v-show="step == 1">
      <v-list-item v-for="(item, k) in paymentAccountList" :key="k" @click="selectPay(k)">
        <v-list-item-content>
          <v-list-item-title>{{ item.bank }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>arrow_forward_ios</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <!-- 人工充值通道客服 -->
      <v-list-item v-if="config.show_deposit_vip_livechat_btn === '1'" @click="SHOW_LIVE_CHAT(0)">
        <v-list-item-content>
          <v-list-item-title>人工充值通道</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>arrow_forward_ios</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <!-- step 2 -->
    <v-card v-show="step == 2">
      <v-card-text>
        <!-- USDT 欄位 -->
        <template v-if="onlineCharge.type === '5'">
          <v-select :placeholder="textFilter('paymentApp')" v-model="currentUsdtAppChannel" dense :items="usdtAppChannels">
            <template v-slot:selection="{ item }">
              {{ item.text }}
            </template>
            <template v-slot:item="{ item }">{{ item.text }}</template>
          </v-select>
          <v-text-field
            :label="textFilter('chargeNumLable')"
            prefix="USDT"
            v-model.number="chargeNum"
            required
            type="number"
            :hint="textFilter('chargeNumHint')"
          ></v-text-field>
          <v-text-field
            v-if="isUsdtNeedFee"
            :label="textFilter('huobiLabel')"
            prefix="USDT"
            v-model.number="Fee"
            required
            type="number"
            :hint="textFilter('huobiHint')"
          ></v-text-field>
          <v-text-field :label="textFilter('tradeTxLable')" v-model="TradeTx" required :hint="textFilter('tradeTxHint')">
            <template slot="append">
              <v-img :src="qrPreview" />
              <v-btn @dragover.prevent @drop="qrInputDrop" @click="$refs.qrInput.$el.click()" icon><v-icon>qr_code_2</v-icon></v-btn>
              <image-barcode-reader v-show="false" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
            </template>
          </v-text-field>
        </template>
        <!-- 他幣種 -->
        <template v-else-if="onlineCharge.type === '6'">
          <v-select
            :placeholder="$t('g_layout_userCentre_default_withdrawals_errorPaymentAcc')"
            v-model="currencyType"
            dense
            return-object
            :items="currencyTypes"
          >
            <template #selection="{ item }">
              {{ item.text }}
            </template>
            <template #item="{ item }">{{ item.text }}</template>
          </v-select>
          <template v-if="!currencyRate">
            <v-text-field
              :label="textFilter('chargeNumLable').replace(/usdt/gi, currencyCode)"
              v-model.number="chargeNum"
              required
              type="number"
              readonly
              :hint="textFilter('chargeNumHint').replace(/usdt/gi, currencyCode)"
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
              :label="textFilter('chargeNumLable').replace(/usdt/gi, currencyCode)"
              v-model.number="chargeNum"
              required
              type="number"
              :hint="textFilter('chargeNumHint').replace(/usdt/gi, currencyCode)"
            ></v-text-field>
            <v-text-field
              readonly
              color="primary"
              :label="textFilter('depositRateLabel').replace(/usdt/gi, currencyCode)"
              :value="currencyRate"
            ></v-text-field>
            <v-text-field :prefix="config.unit" :label="textFilter('resultAmount')" v-model.number="resultAmount" required readonly></v-text-field>
          </template>
        </template>
        <!-- 銀行轉帳在線支付入金訊息 -->
        <template v-else>
          <v-select
            v-if="banks.length > 0"
            :items="banks"
            v-model="bank"
            :label="textFilter('bankLabel')"
            :hint="`${bank.name}`"
            item-text="name"
            item-value="code"
            return-object
          ></v-select>
          <v-text-field
            v-if="isDepositShowDepositName"
            v-model="depositName"
            :readonly="depositNameReadOnly"
            type="text"
            :label="textFilter('nameLabel')"
            :placeholder="textFilter('namePlaceholder')"
            :autofocus="isDepositShowDepositName"
          ></v-text-field>
          <template v-if="!currencyRate">
            <v-text-field
              :label="textFilter('depositAmountLabel')"
              v-model.number="chargeNum"
              required
              type="number"
              :prefix="config.unit"
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
              :label="textFilter('chargeNumLable').replace(/usdt/gi, currencyCode)"
              v-model.number="chargeNum"
              required
              type="number"
              :hint="textFilter('chargeNumHint').replace(/usdt/gi, currencyCode)"
            ></v-text-field>
            <v-text-field
              readonly
              color="primary"
              :label="textFilter('depositRateLabel').replace(/usdt/gi, currencyCode)"
              :value="currencyRate"
            ></v-text-field>
            <v-text-field :prefix="config.unit" :label="textFilter('resultAmount')" v-model.number="resultAmount" required readonly></v-text-field>
          </template>
        </template>
        <div v-if="onlineChargeItems.length" class="mb-5">
          <v-btn v-for="(item, k) in onlineChargeItems" :key="k" @click="chargeNum = item" small color="primary" depressed class="mr-1 mb-1">
            {{ item }}
          </v-btn>
        </div>
        <v-btn
          v-if="!(config.Hide_Deposit_By_User === '1' && userInfo.d_status === 0)"
          @click.stop="postDepositHandler"
          :loading="isLoading"
          block
          color="primary"
          depressed
        >
          {{ textFilter('submitBtn') }}
        </v-btn>
        <v-btn block outlined color="primary" class="mt-3" @click="defualtSet">{{ textFilter('cancelBtn') }}</v-btn>
        <div v-if="onlineCharge.type === '5' && currentUsdtAppChannel != 4" class="mt-5">
          <v-btn class="mb-3" v-if="isDepositUsdtHuobiVideo" color="success" depressed :disabled="isLoading" @click="usdtVideoDialogShow = true">
            {{ textFilter('teachingvideo') }}
          </v-btn>
          <h3 class="headline body-1">{{ textFilter('usdtTitle') }}</h3>
          <div>{{ textFilter('usdtContent1') }}</div>
          <div>{{ textFilter('usdtContent2') }}</div>
          <h3 class="headline mt-5 body-1">{{ textFilter('howToCheckUsdt') }}</h3>
          <Prompt :currentUsdtAppChannel="currentUsdtAppChannel" />
        </div>
        <div v-else-if="onlineCharge.bank" class="depositInstruction mt-5">
          <!-- <h3 class="headline body-1">{{ textFilter('rechargeTitle') }}:</h3> -->
          <!-- <template v-for="i18nKey in descriptionContents">
            <div :key="i18nKey">
              <template v-if="i18nKey === 'rechargeContent1'">
                <div>
                  {{ textFilter('rechargeContent1_1') }}
                  <i class="title red--text" v-if="onlineCharge['min'] != 0">{{ onlineCharge['min'] }}</i>
                  <i class="title red--text" v-else>100</i>
                  {{ textFilter('yuan') }}{{ textFilter('rechargeContent1_2') }}
                  <i class="title red--text" v-if="onlineCharge['max'] != 0">{{ onlineCharge['max'] }}</i>
                  <i class="title red--text" v-else>10000</i> {{ textFilter('yuan') }}{{ textFilter('rechargeContent1_3') }}
                </div>
              </template>
              <template v-else>
                <div>{{ textFilter(i18nKey) }}</div>
              </template>
            </div>
          </template> -->
          <div
            v-if="onlineCharge.deposit_instruction"
            v-html="
              onlineCharge.deposit_instruction
                .replace(/{max}/, onlineCharge.max)
                .replace(/{min}/, onlineCharge.min)
                .replace(/{depositchannel}/, onlineCharge.bank)
            "
          ></div>
          <div v-else class="depositInstruction">
            {{ onlineCharge.bank }} 存款说明： <br />
            <ol>
              <li>单笔单次最低存款金额 {{ onlineCharge.min }}元, 单笔单次最高存款金额 {{ onlineCharge.max }} 元，不限次数。</li>
              <li>输入正确的银行卡号及卡密后，需要您的银行卡预留手机号码可接收银行发送的短信验证码，即可即时充值。</li>
              <li>如有金额错误或未自动到账，请联系在线客服咨询。</li>
            </ol>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- step 3 -->
    <v-card v-show="step == 3">
      <v-card-text>
        <v-text-field :readonly="true" v-model="order.order" :label="textFilter('orderLabel')"></v-text-field>
        <v-text-field :prefix="config.unit" :readonly="true" v-model="order.amount" :label="textFilter('amountLabel')"></v-text-field>
      </v-card-text>
      <div class="text-xs-center">
        <v-btn :loading="isLoading" color="primary" depressed @click="showQrcode = true">
          {{ textFilter('qRCodeBtn') }}
        </v-btn>
        <v-btn :loading="isLoading" color="primary" depressed @click.native="openApp()" v-if="onlineAppUrl != ''">
          {{ textFilter('appBtn') }}
        </v-btn>
        <v-btn :loading="isLoading" color="primary" depressed @click.native="routerPush()">
          {{ textFilter('goHomeBtn') }}
        </v-btn>
      </div>
      <v-list two-line>
        <v-subheader>{{ textFilter('paymentDescription') }}</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{ textFilter('paymentDescription1') }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ textFilter('paymentDescription2') }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ textFilter('paymentDescription3') }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ textFilter('paymentDescription4') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- step 4 -->
    <v-card v-show="step == 4">
      <v-card-text>
        <v-text-field
          v-if="isDepositShowDepositName"
          :readonly="true"
          v-model="order.depositName"
          :label="textFilter('depositNameLabel')"
        ></v-text-field>
        <v-text-field :readonly="true" v-model="order.order" :label="textFilter('orderLabel')"></v-text-field>
        <v-text-field :readonly="true" v-model="order.bank" :label="textFilter('bankLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :readonly="true" v-model="order.card" :label="textFilter('cardLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :readonly="true" v-model="order.name" :label="textFilter('nameLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :prefix="config.unit" :readonly="true" v-model="order.amount" :label="textFilter('amountLabel')"></v-text-field>
        <v-text-field
          class="deep-orange--text"
          error
          disabled
          filled
          :readonly="true"
          :value="order.order.slice(order.order.length - 4)"
          :label="textFilter('paymentPostscript')"
        ></v-text-field>
      </v-card-text>
      <div class="text-xs-center">
        <v-btn :loading="isLoading" color="primary" depressed @click.native="routerPush">
          {{ textFilter('confirmBtn') }}
        </v-btn>
      </div>
      <v-list two-line>
        <v-subheader>{{ textFilter('transferDescription') }}</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              >{{ textFilter('transferDescription1_1') }}<code>{{ textFilter('transferDescription1_2') }}</code></v-list-item-subtitle
            >
            <v-list-item-subtitle>{{ textFilter('transferDescription2') }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ textFilter('transferDescription3') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- step 5 -->
    <v-card v-show="step == 5">
      <v-card-text>
        <v-text-field :readonly="true" v-model="transfer.sn" :label="textFilter('orderLabel')"></v-text-field>
        <v-text-field :readonly="true" v-model="transfer.bank" :label="textFilter('bankLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :readonly="true" v-model="transfer.card" :label="textFilter('cardLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :readonly="true" v-model="transfer.name" :label="textFilter('nameLable')" append-icon="file_copy"></v-text-field>
        <v-text-field :prefix="config.unit" :readonly="true" v-model="transfer.amount" :label="textFilter('amountLabel')"></v-text-field>
        <v-text-field
          class="deep-orange--text"
          error
          disabled
          filled
          :readonly="true"
          :value="transfer.note"
          :label="textFilter('transferPostscript')"
        ></v-text-field>
      </v-card-text>
      <div class="text-xs-center">
        <v-btn :loading="isLoading" color="primary" depressed @click.native="routerPush">
          {{ textFilter('confirmBtn') }}
        </v-btn>
      </div>
    </v-card>

    <!-- step 6 USDT -->
    <v-card v-if="step == 6">
      <v-card-text>
        <v-text-field v-model="depositOrderInfo.order" :label="textFilter('depositOrderLabel')" readonly></v-text-field>
        <v-text-field v-model="depositOrderInfo.bank" :label="textFilter('depositBankLabel')" readonly></v-text-field>
        <v-text-field
          v-model="depositOrderInfo.unit"
          label="USDT"
          readonly
          :error="isUsdtNeedFee"
          :error-messages="isUsdtNeedFee ? textFilter('tempFeeErrorText', { tempFee: Number(this.tempFee) }) : ''"
        ></v-text-field>
        <v-text-field v-model="depositOrderInfo.rate" :label="textFilter('depositRateLabel')" readonly></v-text-field>
        <v-text-field v-model="depositOrderInfo.amount" :label="textFilter('depositAmountLabel')" readonly></v-text-field>
        <v-text-field ref="infoCard" v-model="depositOrderInfo.card" :label="textFilter('depositCardLabel')" readonly></v-text-field>
        <v-row class="justify-center">
          <v-col cols="6" class="py-0">
            <v-btn class="mb-5" block color="primary" depressed @click="copyInputValueToClipboard($refs.infoCard)"> 复制收款地址 </v-btn>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mb-5">
          <vue-qr :text="depositOrderInfo.card" :size="200" :margin="20"></vue-qr>
        </div>
        <v-btn block :loading="isLoading" color="primary" depressed @click.native="routerPush">
          {{ textFilter('confirmBtn') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- step 7 其他幣別 -->
    <v-card v-if="step == 7">
      <v-card-text>
        <v-text-field :value="depositOrderInfo.order" :label="textFilter('depositOrderLabel')" readonly></v-text-field>
        <v-text-field :value="depositOrderInfo.bank" :label="textFilter('depositBankLabel')" readonly></v-text-field>
        <v-text-field :value="depositOrderInfo.unit" :label="currencyCode" readonly></v-text-field>
        <v-text-field :value="depositOrderInfo.rate" :label="textFilter('depositRateLabel')" readonly></v-text-field>
        <v-text-field :value="depositOrderInfo.amount" :label="textFilter('depositAmountLabel')" readonly></v-text-field>

        <v-btn block :loading="isLoading" color="primary" depressed @click.native="routerPush">
          {{ textFilter('confirmBtn') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- showQrcode 彈窗 -->
    <v-dialog v-model="showQrcode" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ textFilter('qrcodeDialogTitle') }}</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <img width="100%" :src="qrCodeSrc" height="100%" alt="" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="showQrcode = false">{{ textFilter('confirmBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showForm" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ textFilter('formDialogTitle') }}</v-card-title>
        <v-card-text style="display: flex; justify-content: center; flex-direction: column">
          <div class="pay-form" v-html="payForm"></div>
          <!-- <v-btn v-else @click="openLinkOutter" color="primary" depressed>{{ textFilter('dialogConfirmBtn') }}</v-btn> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="showForm = false">{{ textFilter('closeBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <iframe :src="onlineAppUrl" height="0" frameborder="0" v-if="onlineAppUrl"></iframe>
    <v-dialog v-if="usdtVideoDialogShow" v-model="usdtVideoDialogShow" max-width="600px">
      <video controls autoplay style="width: 100%" :src="huobiTutorialVideo" :poster="huobiTutorialPic" />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { copyToClipboard } from '@UTILS';
import Prompt from './components/Prompt';
import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import {
  PAGES_DEPOSIT_OPEN_LINK_OUTTER,
  DEPOSIT_USDT_CHANNELS,
  IS_DEPOSIT_USDT_HUOBI_VIDEO,
  MOBILE_DEPOSIT_DESCRIPTIONCONTENTS,
  MOBILE_MENU_DEPOSITE_TITLE,
} from '@G/consts';
// import VueClipboard from 'vue-clipboard2';
// Vue.use(VueClipboard);

export default {
  name: 'Deposit',
  components: {
    Prompt,
    VueQr,
    ImageBarcodeReader,
  },
  data() {
    return {
      navigator,
      usdtVideoDialogShow: false,
      showForm: false,
      step: 1,
      order: {
        order: '',
        bank: '',
        card: '',
        name: '',
        amount: '',
      },
      transfer: {
        amount: '',
        bank: '',
        branch: '',
        card: '',
        expire: '',
        name: '',
        note: '',
        sn: '',
      },
      showQrcode: false,
      qrCodeSrc: '',
      onlineCharge: {},
      onlineChargeItems: [],
      onlineAppUrl: '',
      onlinePay: false,
      onlinePayment: [],
      payments: [],
      attached_param: {},
      depositName: '', // 付款人
      chargeNum: 0,
      mask: 'D121341213',
      value: '中国银行',
      account: '4444444444444444',
      name: '张三',
      amount: '100',
      TradeTx: '', // 錢包地址欄位
      Fee: 0,
      tempFee: 0,
      currentUsdtAppChannel: 0,
      code: '4325',
      items: [
        {
          id: 4,
          avatar: require('./assets/unionpay.png'),
          title: '在线支付',
          subtitle: '单笔最低存款100元，最高5万元。',
        },
      ],
      payForm: '',
      depositNameReadOnly: false,
      chargeReadOnly: false,
      banks: [],
      bank: {
        code: '',
      },
      descriptionContents: MOBILE_DEPOSIT_DESCRIPTIONCONTENTS.split(',').map(i => `rechargeContent${i}`),
      qrPreview: null,
      currencyType: {},
      resultAmount: 0,
      //開新視窗
      blankWindow: null,
    };
  },
  computed: {
    ...mapGetters([
      'config',
      'isLoading',
      'paymentAccountList',
      'depositOrderInfo',
      'isReactNativeApp',
      'isNativeApp',
      'token',
      'usdtAppChannels',
      'userAgent',
      'userInfo',
    ]),
    huobiTutorialVideo() {
      return `${this.config.app}/huobi-tutorial.mp4`;
    },
    huobiTutorialPic() {
      return `${this.config.app}/huobi-tutorial-pic.png`;
    },
    isUsdtHuobiNoFee() {
      return !!Number(this.config.usdt_deposit_huobi_no_fee);
    },
    isUsdtNeedFee() {
      const curUsdtChannel = this.currentUsdtAppChannel;
      if ([0].includes(curUsdtChannel)) {
        return !this.isUsdtHuobiNoFee;
      } else if ([2].includes(curUsdtChannel)) {
        return true;
      } else {
        return false;
      }
    },
    isDepositUsdtHuobiVideo() {
      return IS_DEPOSIT_USDT_HUOBI_VIDEO && this.currentUsdtAppChannel === 0;
    },
    currencyRate() {
      return this.onlineCharge.sysParams?.drate;
    },
    currencyCode() {
      return this.onlineCharge?.sysParams?.currencyCode;
    },
    currencyTypes() {
      return this.onlineCharge.sysParams?.types || [];
    },
    isDepositShowDepositName() {
      return /^(1|true)$/.test(this.config.depositName);
    },
    openUrl() {
      return `${location.protocol}//${location.host}/#/pay/${encodeURIComponent(this.order?.other?.FORM) || ''}`;
    },
  },
  watch: {
    depositOrderInfo(obj) {
      const ty = Number(this.onlineCharge.type);
      if (Object.keys(obj).length && ty == 5) {
        this.step = 6;
      } else if (Object.keys(obj).length && ty == 6) {
        this.step = 7;
      }
    },
    $route() {
      this.defualtSet();
    },
    '$refs.payform'(form) {
      console.log(form);
    },
    chargeNum() {
      this.resultAmount = this.currencyRate * this.chargeNum;
    },
  },
  created() {
    this.GET_PAYMENT_ACCOUNTS_LIST();
  },
  mounted() {
    this.defualtSet();
    this.SET_CURRENT_MENU_TITLE(this.textFilter(MOBILE_MENU_DEPOSITE_TITLE));
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'GET_PAYMENT_ACCOUNTS_LIST', 'POST_DEPOSIT', 'POST_DEPOSIT_USDT', 'POST_DEPOSIT_CURRENCY', 'NATIVE_OPEN_URL']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'POST_DEPOSIT_STATUS', 'SET_FULL_WIDTH', 'SET_APP_FLAG']),
    copyInputValueToClipboard(vueRef) {
      if (vueRef && vueRef.$el) {
        const inputDom = vueRef.$el.getElementsByTagName('input')[0];
        const successCb = () => {
          this.SET_MESSAGE({ message: '复制成功', type: 'success' });
        };
        const errorCb = () => {
          this.SET_MESSAGE({ message: '复制失敗', type: 'error' });
        };
        copyToClipboard({ dom: inputDom, successCb, errorCb });
      }
    },
    checkPay(obj) {
      let _this = this;
      let res = obj;
      // let res = `<form name="pay" action="https://www.demtxt.com/Pay/Pay/index/?act=cGFydG5lcl9pZD0xNTY3NDgzOTgxNjkwNCZwbGF0Zm9ybV90cmFkZV9ubz1ZaW5nNTUwMTU2NzQ4Mzk4MTY5MDQxNTg5MTgwNTI1JnRvdGFsX2ZlZT0xMDAmb3V0X3RyYWRlX25vPUQyMDA1MTExNTAyMDAxNzgz" method = "POST" enctype="application/x-www-form-urlencoded" target="_blank"><button type='submit' class='v-btn v-btn--block v-btn--large v-btn--depressed v-btn--round theme--dark primary'>确认</button></form>`;
      if (!res) {
        let s = { show: true, context: this.textFilter('apiFailure'), color: 'error' };
        _this.$store.dispatch('snackbar', s);
        return;
      }
      let url = res.replace(/'/, '"');
      let reg = null;
      try {
        reg = /action="(\S*)"/.exec(url)[1];
        _this.showForm = true;
        _this.$router.push('/topup?payMoney=' + reg);
      } catch (error) {
        let s = { show: true, context: this.textFilter('apiError'), color: 'error' };
        _this.$store.dispatch('snackbar', s);
      }
    },
    selectPay(id) {
      // 回復預設
      this.onlineCharge = {};
      this.onlineChargeItems = [];
      this.depositNameReadOnly = false;
      this.chargeReadOnly = false;
      this.banks = [];
      this.step++;
      this.onlineCharge = this.paymentAccountList[id];
      if (this.onlineCharge['predefined']) {
        this.onlineChargeItems = this.onlineCharge['predefined'].split(',');
      }
      if (this.onlineCharge['readonly'] && this.onlineCharge['readonly'] == '1') {
        // this.depositNameReadOnly = true;
        this.chargeReadOnly = true;
      }
      if (this.onlineCharge['banks']) {
        this.banks = JSON.parse(this.onlineCharge['banks']);
      }
    },
    defualtSet() {
      this.step = 1;
    },
    routerPush() {
      this.$router.push('/');
    },
    openApp() {
      window.location.href = this.onlineAppUrl;
    },
    // 提交處理
    postDepositHandler() {
      this.onlineCharge.type === '5'
        ? this.postDepositUSDT()
        : this.onlineCharge.type === '6'
        ? this.postDepositCurrency()
        : this.createOrderOnline();
    },
    // 提交訂單
    createOrderOnline() {
      if (this.banks.length > 0 && this.bank.code == '') {
        this.SET_MESSAGE({ message: this.textFilter('errorCode'), type: 'error' });
        return false;
      }
      const data = {
        Amount: Number(this.resultAmount || this.chargeNum),
        Account: Number(this.onlineCharge.id),
        Code: this.bank.code,
        depositName: this.depositName,
      };
      // if (!this.isReactNativeApp && !this.isNativeApp) {
      //   this.blankWindow = window.open('about:blank');
      // }
      this.POST_DEPOSIT(data)
        .then(res => {
          !res.isError && this.createOrderOnlineHandler(res);
        })
        .catch(err => {
          // this.blankWindow && this.blankWindow.close();
          // this.blankWindow = null;
        });
    },
    // 提交訂單後 處理
    createOrderOnlineHandler(data) {
      let { result } = data;
      this.order = result;
      // if (this.blankWindow && (result.other == null || !result.other.URL)) {
      //   this.blankWindow.close();
      //   this.blankWindow = null;
      // }
      if (result.other != null) {
        this.qrCodeSrc = result.other.QR;
        if (result.other.URL) {
          // location.href = this.content.URL ;
          // window.open(this.content.URL);
          if (this.isReactNativeApp) {
            this.$router.push(`/deposit?hwaoPayMethod=${result.other.URL}`);
          } else if (this.isNativeApp) {
            this.NATIVE_OPEN_URL(result.other.URL);
          } else {
            window.open(result.other.URL);
            // this.blankWindow.location.href = result.other.URL;
          }
          // } else if (result.other.APP) {
          //   this.onlineAppUrl = result.other.APP;
          //   this.step = 3;
        } else if (result.other.FORM && result.other.FORM != '') {
          if (this.isReactNativeApp) {
            const openUrl = `${location.protocol}//${location.host}/#/pay/${escape(encodeURIComponent(result.other.FORM))}`;
            this.$router.push(`/deposit?hwaoPayMethod=${openUrl}`);
          } else if (this.isNativeApp) {
            const openUrl = `${location.protocol}//${location.host}/#/pay/${encodeURIComponent(this.order.other.FORM)}`;
            this.NATIVE_OPEN_URL(openUrl);
          } else {
            this.payForm = result.other.FORM;
            if (result.bank == this.textFilter('online')) {
              this.$nextTick(() => {
                this.showForm = true;
              });
            } else {
              setTimeout(() => {
                this.showForm = true;
              }, 10);
            }
          }
        } else if (result.other.QR && result.other.QR != '') {
          this.showQrcode = true;
        } else if (result.other.TRANSFER && result.other.TRANSFER != '') {
          this.transfer = JSON.parse(result.other.TRANSFER);
          this.step = 5;
        } else {
          this.step = 4;
        }
      } else {
        this.step = 4;
      }
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_deposit_', slot) : textFilter(text, 'layout_userCentre_default_deposit_');
    },
    // 提交 USDT
    postDepositUSDT() {
      let usdtDecimalPoint = this.config.usdt_decimal_point ? this.config.usdt_decimal_point : '0';
      if (usdtDecimalPoint == '0' && !/^[0-9]*[1-9][0-9]*$/.test(this.chargeNum)) {
        this.SET_MESSAGE({ message: this.textFilter('errorChargeNum') });
        return false;
      }
      if (this.isUsdtNeedFee && this.Fee <= 0) {
        this.SET_MESSAGE({ message: this.textFilter('errorFeeNull') });
        return false;
      }
      if (this.TradeTx == '') {
        this.SET_MESSAGE({ message: this.textFilter('tradeTxHint') });
        return false;
      }
      this.tempFee = Number(this.Fee);
      const params = {
        Piece: Number(this.chargeNum),
        Fee: this.isUsdtNeedFee ? this.Fee : 0,
        Type: this.currentUsdtAppChannel, // 0:火幣 1:比特派 2:ZB 3:ImToken
        TradeTx: this.TradeTx,
        Account: parseInt(this.onlineCharge.id),
      };
      this.POST_DEPOSIT_USDT(params).then(res => {
        this.chargeNum = 100;
        this.Fee = 0;
        this.TradeTx = '';
      });
    }, // 其他幣別
    postDepositCurrency() {
      let usdtDecimalPoint = this.config.usdt_decimal_point ? this.config.usdt_decimal_point : '0';
      if (usdtDecimalPoint == '0' && !/^[0-9]*[1-9][0-9]*$/.test(this.chargeNum)) {
        this.SET_MESSAGE({ message: this.textFilter('errorChargeNum') });
        return false;
      }
      const card = `${this.currencyCode} ${this.currencyType.text}`;
      const params = {
        Piece: Number(this.chargeNum),
        Type: this.currencyType.value,
        Account: parseInt(this.onlineCharge.id),
        card,
      };
      this.POST_DEPOSIT_CURRENCY(params).then(res => {
        this.chargeNum = 100;
      });
    },
    qrInputDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    qrInputChange(e) {
      const files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match('image.*')) {
        alert('Select an image');
        return;
      }
      const img = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        this.qrPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onDecode(content) {
      if (content) {
        this.TradeTx = content;
        this.$refs.qrInput.$el.value = '';
      } else {
        this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter('errorUsdtAccountNull') }), type: 'warning' });
      }
    },
    qrError(error) {
      this.$store.commit('MsgError', '格式错误');
    },
  },
};
</script>

<style lang="scss" scoped>
.Deposit {
  .deep-orange--text input,
  .deep-orange--text textarea {
    color: #ff5722 !important;
  }
}
.red--text >>> .v-text-field__slot input {
  color: red;
}
</style>
<style lang="scss">
.pay-form {
  form .v-btn {
    border-radius: 5px;
    margin-top: 2em;
    height: 3em;
  }
}
</style>
