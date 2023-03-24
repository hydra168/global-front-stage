<template>
  <v-container class="hasBgColor">
    <v-progress-linear v-if="isLoading" indeterminate class="mb-3"></v-progress-linear>
    <h1 class="title">{{ textFilter('title') }}</h1>
    <v-form v-model="valid" class="mb-5" ref="form">
      <!-- 前台銀行卡是否隱藏USDT錢包選項 未設定時隱藏  -->
      <v-flex v-if="Number(config.is_show_usdt_wallet)">
        <template v-for="ty in bankCardTypes">
          <v-btn
            small
            class="mr-2"
            :key="ty.value"
            @click="
              cardForm = _.cloneDeep(defaultCardForm);
              bankCardType = ty.value;
            "
            dense
            :outlined="bankCardType != ty.value"
            color="primary"
            >{{ textFilter(ty.lang) }}</v-btn
          >
        </template>
      </v-flex>

      <template v-if="bankCardType === 1">
        <v-select
          v-model="cardForm.Locale"
          :items="countryList"
          :label="textFilter('locale')"
          :rules="[v => !!v || textFilter('errorLocaleNull')]"
        ></v-select>
        <v-select
          v-model="cardForm.Bank"
          :items="localeBankList"
          :label="textFilter('bankLabel')"
          :item-text="getI18n"
          item-value="value"
          :rules="[v => !!v || textFilter('errorBankNull')]"
        ></v-select>
        <v-text-field
          v-model="cardForm.Card"
          :label="textFilter('cardLabel')"
          required
          @input.native="cardForm.Card = cardForm.Card.replace(/\s+/g, '')"
          type="text"
          :rules="cardRules"
        ></v-text-field>
        <template v-if="Number(config.is_show_ENG_name)">
          <v-text-field v-model="cardForm.Account" :label="textFilter('bankAccountLabel')" type="text"></v-text-field>
          <v-text-field v-model="cardForm.EName" required :label="textFilter('eNameLabel')" type="text"></v-text-field>
        </template>
        <v-text-field v-model="cardForm.Name" readonly required :label="textFilter('nameLabel')" type="text"></v-text-field>
        <v-text-field
          v-model="cardForm.Branch"
          :label="textFilter('branchLabel')"
          placeholder=""
          required
          type="text"
          hint="可填支行信息或者大概所在省市"
          :rules="[v => !!v || !Number(config.require_bank_branch) || '“支行“栏位为必填']"
        ></v-text-field>
      </template>
      <template v-if="bankCardType === 2">
        <v-flex>
          <v-select
            v-model="cardForm.Locale"
            item-value="text"
            :items="usdtAppChannels"
            :label="textFilter('errorAppNull')"
            :rules="[v => !!v || textFilter('errorAppNull')]"
          ></v-select>
        </v-flex>
        <v-flex mt-5 text-center>
          <vue-qr :text="cardForm.Card" :size="200" :margin="20"></vue-qr>
        </v-flex>
        <v-text-field
          v-model="cardForm.Card"
          :label="textFilter('errorQrcodeNull')"
          :rules="[v => !!v || textFilter('errorQrcodeNull')]"
          type="text"
          single-line
          required
          @click.prevent="$refs.qrInput.$el.click()"
        >
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
        </v-text-field>
      </template>
    </v-form>
    <v-btn :disabled="!valid" color="primary" block depressed :loding="isLoading" @click="postBankCard">{{ textFilter('determineBtn') }}</v-btn>
    <v-btn color="primary" block outlined class="mt-3" @click="$router.push({ name: 'userCentre' })">{{ textFilter('cancelBtn') }}</v-btn>

    <!-- 銀行卡列表 -->
    <v-flex v-for="(item, k) in userBankList" :key="k" mt-1 xs12 class="mt-5">
      <v-card color="blue-grey darken-2" class="white--text">
        <v-card-title primary-title>
          {{ item.Bank }}
        </v-card-title>
        <v-card-text>
          {{ formatBankNumber(item.Card) }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { getI18n, textFilter } from '@UTILS/i18n';
import { decodeConfigAPIValue } from '@UTILS/configAPI';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import { uniq } from 'lodash';
import VueQr from 'vue-qr';

const defaultCardForm = {
  Bank: '',
  Card: '',
  Branch: '',
};

export default {
  name: 'BankCard',
  data() {
    return {
      cardForm: { ...defaultCardForm },
      defaultCardForm,
      getI18n: e => getI18n(e.text),
      bankCardType: 1,
      countryList: [],
      bankCardTypes: [
        {
          value: 1,
          lang: 'bankCard',
        },
        {
          value: 2,
          lang: 'usdtWallet',
        },
      ],
      valid: false,
      qrInputHover: false,
      qrPreview: null,
    };
  },
  components: {
    ImageBarcodeReader,
    VueQr,
  },
  computed: {
    ...mapGetters(['isLoading', 'userProfileData', 'userBankList', 'config', 'locale', 'bankList', 'usdtAppChannels']),
    localeBankList() {
      return this.bankList.filter(item => item.locale == this.cardForm.Locale);
    },
    cardRules() {
      const isStrictMode = this.config?.Verify_Bank_Code === '0';
      return isStrictMode
        ? [v => !!v || this.textFilter('errorCardNull'), v => /^[a-zA-Z0-9]+$/.test(v) || this.textFilter('errorCardEnglishAndNumber')]
        : [v => !!v || this.textFilter('errorCardNull')];
    },
    localeMap() {
      const localeList = this.config.bank_locale_list;
      return (localeList ? JSON.parse(localeList) : ['cn', 'hk', 'mo', 'my', 'sg'])?.filter(l =>
        uniq(this.bankList.map(bank => bank.locale)).includes(l)
      );
    },
  },
  watch: {
    locale() {
      this.setCountryList();
    },
    userProfileData(info) {
      this.GET_USER_BANK_LIST();
      this.cardForm.Name = this.defaultCardForm.Name = info.username;
    },
  },
  created() {
    this.SET_CURRENT_MENU_TITLE(this.textFilter('bankInfo'));
    this.GET_USER_PROFILE();
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
    this.setCountryList();
  },
  methods: {
    ...mapActions(['POST_USER_BANK', 'GET_USER_PROFILE', 'GET_USER_BANK_LIST']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_FULL_WIDTH']),
    async postBankCard() {
      this.cardForm.type = this.bankCardType;
      if (this.cardForm.type == 2) {
        this.cardForm.Bank = 'USDT';
      }
      // console.log(res);
      const res = await this.POST_USER_BANK({ ...this.cardForm });
      // console.log(res);
      !res.isError && this.$refs.form.reset() && (this.cardForm = { ...this.defaultCardForm });
    },
    formatBankNumber(bankNumber) {
      if (this.config.Show_Bank_Code == 1) return bankNumber;
      return bankNumber.substr(0, 4) + '********' + bankNumber.substr(-4);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_bankCard_');
    },
    async setCountryList() {
      const mod = await import(`@G/i18n/country/${this.locale}.js`);
      const { globalCountryList } = mod.default;
      this.countryList = globalCountryList
        .filter((item, index) => {
          return this.localeMap.includes(item.alpha2);
        })
        .map(item => {
          return { text: item.name, value: item.alpha2 };
        });
    },
    onDecode(content) {
      if (content) {
        this.cardForm.Card = content;
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

<style>
@import './assets/card.css';
</style>
