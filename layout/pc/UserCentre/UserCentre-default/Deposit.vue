<template>
  <!-- 我要存款 -->
  <div id="Deposit" class="Deposit">
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <!-- 選擇存款渠道 -->
    <div class="mt-3">
      <v-btn-toggle tile group v-model="paymentSelectedIndex" class="d-flex flex-wrap">
        <v-btn
          elevation="0"
          v-for="(item, i) in paymentAccountList"
          :key="i"
          :color="payment.id == item.id ? 'success' : 'primary'"
          class="mr-3 mb-3 py-1 payment d-flex"
          outlined
          small
        >
          <v-icon :class="payment.id == item.id ? 'clip success' : 'clip primary'">payment</v-icon>
          {{ item.bank }}
        </v-btn>
      </v-btn-toggle>
      <!-- 人工充值通道客服 -->
      <v-btn
        v-if="config.show_deposit_vip_livechat_btn === '1'"
        elevation="0"
        color="primary"
        class="mr-3 ml-1 mb-3 py-1 payment d-flex"
        outlined
        small
        @click="SHOW_LIVE_CHAT(0)"
      >
        <v-icon color="primary">support_agent</v-icon>
        <span class="ml-1">人工充值通道</span>
      </v-btn>
    </div>

    <!-- USDT 支付 -->
    <template v-if="payment.type === '5'">
      <v-form ref="usdtForm" v-model="depositForm.usdt.valid">
        <v-select
          :placeholder="textFilter('paymentApp')"
          v-model="depositForm.usdt.type"
          :items="maps.usdt.channelItems"
          dense
          return-object
          :rules="[val => !!val || textFilter('paymentApp')]"
        >
          <template #selection="{ item }">
            {{ item.text }}
          </template>
          <template #item="{ item }"> {{ item.text }} </template>
        </v-select>
        <v-text-field
          :label="textFilter('usdtLabel')"
          prefix="USDT"
          v-model.number="depositForm.usdt.Piece"
          required
          type="number"
          :hint="textFilter('amountHint')"
          :rules="[
            val => val > 0 || textFilter('errorUSDT'),
            val => Boolean(config.usdt_decimal_point == 1) || /^[0-9]*[1-9][0-9]*$/.test(val) || textFilter('errorAmountFormat'),
          ]"
        ></v-text-field>
        <v-text-field
          v-if="depositForm.usdt.feeRequired"
          :label="textFilter('feeLabel')"
          prefix="USDT"
          v-model.number="depositForm.usdt.Fee"
          required
          type="number"
          :error-messages="FeeError"
          :hint="textFilter('feeHint')"
          :rules="[val => !!val || textFilter('feeHint')]"
        ></v-text-field>
        <v-text-field
          :error-messages="TradeTxError"
          :label="textFilter('tradeTxLabel')"
          v-model="depositForm.usdt.TradeTx"
          required
          type="text"
          :hint="textFilter('tradeTxHint')"
          :persistent-hint="readonly"
        >
          <template slot="append">
            <v-btn outlined color="primary" class="mb-2" @click="$refs.qrInput.$el.click()">
              {{ textFilter('qrCodeUploadTitle') }}
              <v-icon right dark>qr_code_2</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <image-barcode-reader v-show="false" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
      </v-form>
    </template>

    <!-- 其他幣種 支付 -->
    <template v-else-if="payment.type === '6'">
      <v-form v-model="depositForm.currency.valid" lazy-validation>
        <v-select
          :value="0"
          :placeholder="$t('g_layout_userCentre_default_depositRecord_tableHeaders_type')"
          v-model="depositForm.currency.type"
          dense
          :items="maps.currency.types"
          return-object
          :rules="[val => !!val || textFilter('errorPaymentAcc')]"
        >
          <template v-slot:selection="{ item }">
            {{ item.text }}
          </template>
          <template v-slot:item="{ item }">{{ item.text }}</template>
        </v-select>
        <template v-if="!payment.sysParams || !payment.sysParams.drate">
          <v-text-field
            :label="textFilter('amountLabel')"
            v-model.number="depositForm.currency.Amount"
            required
            type="number"
            :readonly="readonly"
            :hint="readonly ? textFilter('shortcutSelection') : `${depositLimitPoint}`"
            :persistent-hint="readonly"
            :rules="[
              amount => amount > 0 || textFilter('errorAmount'),
              amount => (amount <= payment.max && amount >= payment.min) || depositLimitPoint,
            ]"
          ></v-text-field>
        </template>
        <template v-else>
          <v-text-field
            :label="textFilter('usdtLabel').replace(/usdt/gi, maps.currency.code)"
            :prefix="maps.currency.code"
            v-model.number="depositForm.currency.Piece"
            required
            type="number"
            :hint="textFilter('amountHint').replace(/usdt/gi, maps.currency.code)"
            :rules="[
              val => val > 0 || textFilter('errorUSDT').replace(/usdt/gi, maps.currency.code),
              val => Boolean(config.usdt_decimal_point == 1) || /^[0-9]*[1-9][0-9]*$/.test(val) || textFilter('errorAmountFormat'),
            ]"
          ></v-text-field>
          <v-text-field
            readonly
            color="primary"
            :label="textFilter('exchangeRate').replace(/usdt/gi, maps.currency.code)"
            :value="payment.sysParams.drate"
          ></v-text-field>
          <v-text-field
            :prefix="config.unit"
            :label="textFilter('amountLabel2')"
            v-model.number="depositForm.currency.Amount"
            required
            readonly
          ></v-text-field>
        </template>
      </v-form>
    </template>

    <!-- 银行及线上支付 -->
    <template v-else>
      <v-form v-model="depositForm.default.valid" lazy-validation>
        <v-select
          v-if="maps.default.banks.length"
          :items="maps.default.banks"
          v-model="depositForm.default.bank"
          :label="textFilter('bankLabel')"
          :hint="`${depositForm.default.bank.name}`"
          item-text="name"
          item-value="code"
          return-object
          :rules="[v => maps.default.banks.length == 0 || !!v.code || textFilter('errorBankCode')]"
        ></v-select>
        <v-text-field
          v-if="isDepositShowDepositName"
          :error-messages="depositNameError"
          type="text"
          :label="textFilter('depositNameLabel')"
          v-model="depositName"
          required
          :rules="[v => !!v || textFilter('depositNameInputError')]"
        ></v-text-field>
        <template v-if="!payment.sysParams || !payment.sysParams.drate">
          <v-text-field
            :label="textFilter('amountLabel')"
            v-model.number="depositForm.default.Amount"
            required
            type="number"
            :readonly="readonly"
            :hint="readonly ? textFilter('shortcutSelection') : `${depositLimitPoint}`"
            :persistent-hint="readonly"
            :rules="[
              amount => amount > 0 || textFilter('errorAmount'),
              amount => (amount <= payment.max && amount >= payment.min) || depositLimitPoint,
            ]"
          ></v-text-field>
        </template>
        <template v-else>
          <v-text-field
            :label="textFilter('usdtLabel').replace(/usdt/gi, maps.default.code)"
            :prefix="maps.default.code"
            v-model.number="depositForm.default.Amount"
            required
            type="number"
            :hint="textFilter('amountHint').replace(/usdt/gi, maps.default.code)"
            :rules="[
              val => val > 0 || textFilter('errorUSDT').replace(/usdt/gi, maps.default.code),
              val => Boolean(config.usdt_decimal_point == 1) || /^[0-9]*[1-9][0-9]*$/.test(val) || textFilter('errorAmountFormat'),
            ]"
          ></v-text-field>
          <v-text-field
            readonly
            color="primary"
            :label="textFilter('exchangeRate').replace(/usdt/gi, maps.default.code)"
            :value="payment.sysParams.drate"
          ></v-text-field>
          <v-text-field
            :prefix="config.unit"
            :label="textFilter('amountLabel2')"
            v-model.number="depositForm.default.resultAmount"
            required
            readonly
          ></v-text-field>
        </template>
      </v-form>
    </template>

    <!-- 選擇金額 -->
    <div class="mt-3">
      <v-chip label outlined class="mr-3" color="info" v-for="(i, index) in maps.predefined" :key="`${i}-${index}`" @click="setAmount(i)">
        {{ i }}
      </v-chip>
    </div>
    <div class="d-flex flex-row-reverse justify-space-between mt-8">
      <v-btn
        v-if="!(config.Hide_Deposit_By_User === '1' && userInfo.d_status === 0)"
        color="primary"
        depressed
        @click="postDepositHandler"
        :disabled="!formValid"
      >
        <v-icon small>done</v-icon> {{ textFilter('submitBtn') }}
        <span slot="loader">
          {{ textFilter('submitting') }}
          <v-progress-circular indeterminate color="primary" :size="12" :width="1"></v-progress-circular>
        </span>
      </v-btn>
      <v-flex v-if="payment.type === '5' && depositForm.usdt.type && (depositForm.usdt.type.url || !depositForm.usdt.type.value != 4)">
        <template v-if="depositForm.usdt.type.url">
          <v-btn :href="depositForm.usdt.type.url" target="_blank" depressed color="info" :disabled="isLoading">
            {{ textFilter('teaching') }}
          </v-btn>
        </template>
        <v-btn v-else-if="isDepositUsdtHuobiVideo" color="success" depressed :disabled="isLoading" @click="usdtVideoDialogShow = true">
          {{ textFilter('teachingvideo') }}
        </v-btn>
        <v-btn depressed v-else color="info" :disabled="isLoading" @click="$router.push('/depositUsdtHelp')">
          {{ textFilter('teaching') }}
        </v-btn>
      </v-flex>
    </div>

    <!-- 提示區 -->
    <v-card color="elevation-0 grey lighten-3 grey--text text--darken-3" class="mt-5" v-if="payment.type !== '5'">
      <template v-if="payment.bank">
        <v-card-title>{{ textFilter('descriptionTitle') }}</v-card-title>
        <v-card-text class="text-sm-left grey--text text--darken-3">
          <div
            v-if="payment.deposit_instruction"
            v-html="
              payment.deposit_instruction
                .replace(/{max}/, payment.max)
                .replace(/{min}/, payment.min)
                .replace(/{depositchannel}/, payment.bank)
            "
          ></div>
          <div v-else>
            {{ payment.bank }} 存款说明： <br />
            <ol>
              <li>单笔单次最低存款金额 {{ payment.min }}元, 单笔单次最高存款金额 {{ payment.max }} 元，不限次数。</li>
              <li>输入正确的银行卡号及卡密后，需要您的银行卡预留手机号码可接收银行发送的短信验证码，即可即时充值。</li>
              <li>如有金额错误或未自动到账，请联系在线客服咨询。</li>
            </ol>
          </div>
          <div class="light-blue--text subheading" v-if="parseFloat(config.fee) > 0">
            {{ textFilter('note', { fee: config.fee }) }}
          </div>
        </v-card-text>
      </template>
    </v-card>

    <!-- 扫码支付 -->
    <v-dialog v-model="dialogQR" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          {{ textFilter('pay') }}
          <v-spacer></v-spacer>
          <span class="subheading red--text lighten-2">
            {{ textFilter('timeRemaining', { min, sec }) }}
          </span>
        </v-card-title>
        <v-container fluid grid-list-lg>
          <v-card-media contain class="white--text" height="500" :src="content['QR']" v-if="content['QR']"></v-card-media>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="green darken-1" flat @click.native="content['QR'] = false">{{ textFilter('cancelBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 转账 -->
    <v-dialog v-model="dialogTRANSFER" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ textFilter('transfer') }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-container fluid grid-list-lg>
          <v-layout wrap>
            <v-flex md12>
              <v-text-field v-model="transfer.sn" :label="textFilter('snLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field v-model="transfer.bank" :label="textFilter('transferBankLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field v-model="transfer.card" :label="textFilter('cardLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field v-model="transfer.name" :label="textFilter('nameLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field v-model="transfer.amount" :prefix="config.unit" :label="textFilter('transferAmountLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-text-field v-model="transfer.branch" :label="textFilter('branchLabel')" readonly></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-tooltip top>
                <v-text-field
                  persistent-hint
                  :hint="textFilter('noteHint')"
                  slot="activator"
                  color="deep-orange"
                  append-icon="help_outline"
                  v-model="transfer.note"
                  :label="textFilter('noteLabel')"
                  readonly
                  class="deep-orange--text"
                ></v-text-field>
                <span>{{ textFilter('noteText') }}</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="green darken-1" flat @click.native="content['TRANSFER'] = false">{{ textFilter('cancelBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-xs-center">
      <v-dialog v-model="dialogFORM" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ textFilter('goPaymentPage') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div v-html="content['FORM']" ref="go" style="display: none"></div>

    <!-- 入金信息 -->
    <v-dialog v-if="showDetail" v-model="showDetail" max-width="600px" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="d-flex flex-grow-1 justify-center">
            <h3>{{ textFilter('depositInfo') }}</h3>
          </v-toolbar-title>
          <v-menu bottom left>
            <template v-slot:activator="{ on }"
              ><v-btn v-on="on" slot="activator" icon @click.stop="closeDetailHandler">
                <v-icon>close</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
              <!-- USDT 訊息 -->
              <template v-if="payment.type === '5'">
                <v-text-field v-model="depositOrderInfo.order" :label="textFilter('snLabel')" readonly></v-text-field>
                <v-text-field v-model="depositOrderInfo.bank" :label="textFilter('paymentMethod')" readonly></v-text-field>
                <v-text-field
                  v-model="depositOrderInfo.unit"
                  label="USDT"
                  readonly
                  :error="isUsdtNeedFee"
                  :error-messages="isUsdtNeedFee ? textFilter('tempFeeErrorText', { tempFee: Number(this.tempFee) }) : ''"
                ></v-text-field>
                <v-text-field v-model="depositOrderInfo.rate" :label="textFilter('exchangeRate')" readonly></v-text-field>
                <v-text-field v-model="depositOrderInfo.amount" :label="textFilter('depositAmount')" readonly></v-text-field>
                <v-row>
                  <v-col cols="10">
                    <v-text-field v-model="depositOrderInfo.card" :label="textFilter('receivingAddress')" readonly ref="infoCard"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn block color="primary" depressed @click.native="copyInputValueToClipboard($refs.infoCard)"> 复制 </v-btn>
                  </v-col>
                </v-row>
                <div class="d-flex justify-center mb-5">
                  <vue-qr :text="depositOrderInfo.card" :size="200" :margin="20"></vue-qr>
                </div>
                <v-btn outlined block class="mb-2" color="primary" @click="$router.push('/depositUsdtHelp')">{{ textFilter('teaching') }}</v-btn>
              </template>
              <!-- 其他幣別入金訊息 -->
              <template v-else-if="payment.type === '6'">
                <v-text-field :value="depositOrderInfo.order" :label="textFilter('snLabel')" readonly></v-text-field>
                <v-text-field
                  :value="depositOrderInfo.bank.replace(/usdt/gi, this.payment.sysParams.code)"
                  :label="textFilter('paymentMethod')"
                  readonly
                ></v-text-field>
                <v-text-field :value="depositOrderInfo.unit" label="" readonly :error="isUsdtNeedFee"></v-text-field>
                <v-text-field :value="depositOrderInfo.rate" :label="textFilter('exchangeRate')" readonly></v-text-field>
                <v-text-field
                  :value="depositOrderInfo.amount"
                  :label="textFilter(payment.sysParams.drate ? 'amountLabel2' : 'transferAmountLabel')"
                  readonly
                ></v-text-field>
                <v-text-field :value="depositForm.currency.type.bankName" :label="textFilter('transferBankLabel')" readonly></v-text-field>
                <v-text-field :value="depositForm.currency.type.accountNumber" :label="textFilter('cardLabel')" readonly></v-text-field>
                <v-text-field :value="depositForm.currency.type.accountName" :label="textFilter('nameLabel')" readonly></v-text-field>
              </template>
              <!-- 銀行轉帳在線支付入金訊息 -->
              <template v-else>
                <v-text-field
                  v-if="isDepositShowDepositName"
                  v-model="depositOrderInfo.depositName"
                  :label="textFilter('depositNameLabel')"
                  readonly
                ></v-text-field>
                <v-text-field :value="depositOrderInfo.order" :label="textFilter('snLabel')" readonly></v-text-field>
                <v-text-field :value="depositOrderInfo.bank" :label="textFilter('transferBankLabel')" readonly></v-text-field>
                <v-text-field :value="depositOrderInfo.card" :label="textFilter('cardLabel')" readonly></v-text-field>
                <v-text-field :value="depositOrderInfo.name" :label="textFilter('nameLabel')" readonly></v-text-field>
                <v-text-field
                  :value="depositOrderInfo.amount"
                  :prefix="config.unit"
                  :label="textFilter('transferAmountLabel')"
                  readonly
                ></v-text-field>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      persistent-hint
                      :hint="textFilter('transferLimitHint')"
                      color="deep-orange"
                      append-icon="help_outline"
                      :value="depositOrderInfo.postscript"
                      :label="textFilter('noteLabel')"
                      readonly
                      class="deep-orange--text"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>{{ textFilter('transferLimit') }}</span>
                </v-tooltip>
              </template>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-if="usdtVideoDialogShow" v-model="usdtVideoDialogShow" max-width="600px">
      <video controls autoplay style="width: 100%" :src="huobiTutorialVideo" :poster="huobiTutorialPic" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { copyToClipboard } from '@UTILS';
// import Prompt from './components/Prompt';
import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import { DEPOSIT_USDT_CHANNELS, IS_DEPOSIT_USDT_HUOBI_VIDEO, PC_DEPOSIT_DESCRIPTIONCONTENTS } from '@G/consts';

export default {
  name: 'Deposit',
  components: {
    // Prompt,
    VueQr,
    ImageBarcodeReader,
  },
  data() {
    return {
      usdtVideoDialogShow: false,
      Predefined: [], // 可選快捷金額
      depositName: '', // 付款人
      depositNameError: [],
      amount: 0, // 金額欄位 || USDT欄位
      amountError: [],
      TradeTx: '', // 錢包地址欄位
      tempTradeTx: '',
      TradeTxError: [],
      Fee: 0, // 火幣手續費
      tempFee: 0,
      FeeError: [], // 火幣手續費
      currentPaymentAccId: null, // 當前渠道id
      // payment: {}, // 當前渠道
      msec: 30,
      min: 0,
      sec: 0,
      content: { TRANSFER: false },
      handle: null,
      readonly: false,
      banks: [],
      bank: { code: '' },
      showDetail: false,
      showQRcodeUpload: false,
      QRcodeUploadFormValid: true,
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
      descriptionContents: PC_DEPOSIT_DESCRIPTIONCONTENTS.split(',').map(i => `descriptionContent${i}`),
      qrInputHover: false,
      qrPreview: null,
      paymentSelectedIndex: 0,
      depositForm: {
        default: { Amount: 0, type: {}, TradeTx: '', valid: false },
        usdt: { Piece: 0, type: {}, valid: false },
        currency: { Piece: 0, valid: false },
      },
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'paymentAccountList', 'depositOrderInfo', 'usdtAppChannels', 'userInfo']),
    dialogFORM() {
      return !!this.content['FORM'];
    },
    dialogTRANSFER() {
      return !!this.content['TRANSFER'];
    },
    dialogQR() {
      return !!this.content['QR'];
    },
    dialogURL() {
      return Boolean(this.content.URL);
    },
    depositLimit() {
      if (this.config['deposit_limited']) {
        const limit = this.config['deposit_limited'].split(',');
        return { min: limit[0], max: limit[1] };
      }
      return { min: 100.0, max: 10000.0 };
    },
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
      const channel = this.depositForm.usdt.type?.value;
      if ([0].includes(channel)) {
        return !this.isUsdtHuobiNoFee;
      } else if ([2].includes(channel)) {
        return true;
      } else {
        return false;
      }
    },
    isDepositUsdtHuobiVideo() {
      return IS_DEPOSIT_USDT_HUOBI_VIDEO && this.depositForm.usdt.type?.value === 0;
    },
    depositLimitPoint() {
      if (this.payment.min && this.payment.max) {
        return this.textFilter('Interval', {
          min: `${this.config.unit}${this.payment.min}`,
          max: `${this.config.unit}${this.payment.max}`,
        });
      } else {
        return this.textFilter('enterAmount'); // 请输入金额
      }
    },
    payment() {
      return this.paymentAccountList[this.paymentSelectedIndex] || {};
    },
    predefined() {
      if (this.payment && this.payment.predefined) {
        return this.payment.predefined?.split(',') || [];
      } else if (this.config.deposit_predefined) {
        return this.config.deposit_predefined?.split(',') || [];
      } else {
        return [];
      }
    },
    // 下拉選單
    maps() {
      const result = {
        default: {},
        usdt: {},
        currency: {},
      };
      // 线上及银行支付
      if (this.payment.banks) {
        result.default.banks = JSON.parse(this.payment.banks);
        result.default.code = this.payment.sysParams?.currencyCode || '';
      } else {
        result.default.banks = [];
      }
      // usdt
      result.usdt.channelItems = this.usdtAppChannels;

      // 其他幣
      result.currency.types = this.payment.sysParams?.types;
      result.currency.code = this.payment.sysParams?.currencyCode || '';
      // 預設轉帳金額
      result.predefined = this.predefined;
      return result;
    },
    formValid() {
      const ty = Number(this.payment.type);
      switch (ty) {
        case 5:
          return this.depositForm.usdt.valid;
        case 6:
          return this.depositForm.currency.valid;
        default:
          return this.depositForm.default.valid;
      }
    },
    isDepositShowDepositName() {
      return /^true$/i.test((Boolean(Number(this.config.depositName)) || 'false').toString());
    },
  },
  watch: {
    postDepositStatus(data) {
      const _ = this;
      if (data.type === 'success') {
        const { result } = data;
        this.amount = 0;
        if (result.other != null && Object.keys(result.other).length != 0) {
          this.content = result.other;
          if (this.content['QR']) {
            this.msec = 150;
            this.countdown();
            setTimeout(function () {
              _.GET_DEPOSIT_STATUS({ id: result.id });
            }, 5000);
          }
          if (this.content['TRANSFER']) {
            this.transfer = JSON.parse(result.other['TRANSFER']);
            this.content['TRANSFER'] = true;
          } else {
            this.content['TRANSFER'] = false;
          }
        } else {
          this.SET_DEPOSIT_ORDER_INFO(result);
        }
      }
      this.SET_DEPOSIT_STATUS({}); // 回復預設
    },
    depositOrderInfo(obj) {
      Object.keys(obj).length && (this.showDetail = true);
    },
    depositName() {
      this.depositNameError = [];
    },
    msec(n) {
      if (n == 0) {
        this.content['QR'] = false;
        if (this.handle != null) {
          clearTimeout(this.handle);
        }
      }
    },
    'content.FORM': function (n) {
      if (n != '' && n != undefined) {
        setTimeout(function () {
          document.forms.namedItem('pay').submit();
        }, 500);
      }
    },
    'maps.currency.types.length'(n) {
      // console.log(this.maps.currency.types);
      if (n) {
        this.depositForm.currency.type = this.maps.currency.types[0];
      }
    },
    'maps.usdt.channelItems.length'(n) {
      if (n) {
        this.depositForm.usdt.type.value = this.maps.usdt.channelItems[0].value;
      }
    },
    isUsdtNeedFee(flag) {
      this.depositForm.usdt.feeRequired = flag;
    },
    'depositForm.usdt.Piece'(val) {
      this.depositForm.usdt.Amount = val * this.payment.sysParams?.drate;
    },
    'depositForm.currency.Piece'(val) {
      this.depositForm.currency.Amount = val * (this.payment.sysParams?.drate || 1);
    },
    'depositForm.default.Amount'(val) {
      this.depositForm.default.resultAmount = val * (this.payment.sysParams?.drate || 1);
    },
    paymentSelectedIndex() {
      this.depositForm.default.Amount = 0;
      this.depositForm.currency.Piece = 0;
      this.depositForm.usdt.Piece = 0;
    },
  },
  mounted() {
    this.resetPredefined();
    this.GET_PAYMENT_ACCOUNTS_LIST(); // 取得 付款渠道列表
  },
  beforeDestroy() {
    this.msec = 0;
    if (this.handle != null) {
      clearTimeout(this.handle);
    }
  },
  methods: {
    ...mapActions([
      'GET_PAYMENT_ACCOUNTS_LIST',
      'GET_DEPOSIT_STATUS',
      'POST_DEPOSIT',
      'POST_DEPOSIT_USDT',
      'POST_DEPOSIT_CURRENCY',
      'SHOW_LIVE_CHAT',
      'ROUTER_PUSH',
    ]),
    ...mapMutations(['SET_MESSAGE', 'SET_DEPOSIT_ORDER_INFO']),
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
    countdown() {
      let min = parseInt((this.msec / 60) % 60);
      let sec = parseInt(this.msec % 60);
      this.min = min > 9 ? min : '0' + min;
      this.sec = sec > 9 ? sec : '0' + sec;
      this.msec--;
      const that = this;
      if (this.msec != 0) {
        setTimeout(function () {
          that.countdown();
        }, 1000);
      }
    },
    // 預定義
    resetPredefined() {
      if (this.config.deposit_predefined) {
        this.Predefined = this.config.deposit_predefined?.split(',') || [];
      }
      this.readonly = false;
    },
    resetPayment() {
      this.currentPaymentAcc = {};
      this.resetPredefined();
    },
    setAmount(val) {
      const ty = Number(this.payment.type);
      val = Number(val);
      switch (ty) {
        case 5:
          this.depositForm.usdt.Piece = val;
          break;
        case 6:
          this.depositForm.currency.Piece = val;
          break;
        default:
          this.depositForm.default.Amount = val;
          break;
      }
    },
    // 提交處理
    postDepositHandler() {
      if (!this.formValid) {
        this.SET_MESSAGE({ message: this.textFilter('errorPaymentAcc') });
        return false;
      }
      this.payment.type === '5' ? this.postDepositUSDT() : this.payment.type === '6' ? this.postDepositCurrency() : this.postDeposit();
    },
    // 提交存款
    postDeposit() {
      // 付款人
      if (this.isDepositShowDepositName && !this.depositName) {
        const errorName = this.textFilter('errorName');
        this.SET_MESSAGE({ message: errorName });
        this.depositNameError.push(errorName);
        return false;
      }
      const params = {
        Amount: this.depositForm.default.resultAmount || this.depositForm.default.Amount,
        Account: parseInt(this.payment.id, 10),
        ...(this.depositForm.bank && { Code: this.depositForm.bank.code }),
      };
      if (this.isDepositShowDepositName) {
        params.depositName = this.depositName;
      }
      this.POST_DEPOSIT(params).then(res => {
        if (!res.isError) {
          const { result } = res;
          this.amount = 0;
          if (result.other != null && Object.keys(result.other).length != 0) {
            this.content = result.other;
            if (this.content.URL) {
              window.open(this.content.URL);
            }
            if (this.content['QR']) {
              this.msec = 150;
              this.countdown();
              setTimeout(() => {
                this.GET_DEPOSIT_STATUS({ id: result.id });
              }, 5000);
            }
            if (this.content['TRANSFER']) {
              this.transfer = JSON.parse(result.other['TRANSFER']);
              this.content['TRANSFER'] = true;
            } else {
              this.content['TRANSFER'] = false;
            }
          } else {
            this.SET_DEPOSIT_ORDER_INFO(result);
          }
        }
      });
    },
    // 提交 USDT
    postDepositUSDT() {
      const postData = {
        ...this.depositForm.usdt,
        Account: parseInt(this.payment.id),
        Type: this.depositForm.usdt.type.value,
      };
      delete postData.type;
      this.tempFee = Number(postData.Fee);
      this.POST_DEPOSIT_USDT(postData).then(res => {
        this.depositForm.usdt = {
          Piece: 0,
          Fee: 0,
          TradeTx: '',
        };
      });
    },
    // 提交 其他幣種
    postDepositCurrency() {
      const postData = {
        // Piece   float64  //虛擬貨幣顆數
        // Account int      //收款帳號ID
        // TradeTx string   //轉帳 tx
        // Type    int      // 使用轉帳類型
        // Fee     *float64 // 手續費
        // Card    string

        Piece: parseFloat(this.depositForm.currency.Piece),
        Account: parseInt(this.payment.id),
        Type: this.depositForm.currency.type.value,
        Card: `${this.maps.currency.code} ${this.depositForm.currency.type.text}`,
      };
      delete postData.type;
      this.POST_DEPOSIT_CURRENCY(postData).then(res => {
        this.depositForm.currency = {
          Piece: 0,
          Card: '',
        };
      });
    },
    closeDetailHandler() {
      this.showDetail = false;
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_deposit_', slot) : textFilter(text, 'layout_userCentre_default_deposit_');
    },
    onDecode(content) {
      if (content) {
        this.depositForm.usdt.TradeTx = content;
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
};
</script>

<style lang="scss">
.Deposit {
  .theme--light.v-tabs > .v-tabs-bar,
  .theme--light.v-tabs-items {
    background: none;
  }
  .red--text >>> .v-text-field__slot input {
    color: red;
  }
  .clip {
    color: transparent !important;
    border-radius: 0 !important;
    mask: url(./assets/icon/clip.png) no-repeat left center/auto 80%;
    width: 1.4em;
  }
  .payment {
    border: 0;
    box-shadow: 0 3px 5px #dddddd;
  }
}
</style>
