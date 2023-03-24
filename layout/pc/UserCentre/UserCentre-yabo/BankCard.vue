<template>
  <!-- 預設銀行卡 -->
  <div class="BankCard">
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-row justify="start">
      <div class="jp-card-container mx-5 mt-5">
        <div class="jp-card jp-card-maestro jp-card-identified">
          <div class="jp-card-front">
            <div class="jp-card-lower">
              <v-btn text class="white--text title" @click="showDetail = true"> <v-icon dark>add</v-icon> {{ textFilter('addBankInfo') }} </v-btn>
              <div class="jp-card-number jp-card-display"></div>
              <div class="jp-card-name jp-card-display"></div>
              <div class="jp-card-expiry jp-card-display">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 銀行卡列表 -->
      <div v-for="(item, index) in userBankList" :key="`cards_banks_${index}`" class="jp-card-container mx-5 mt-5">
        <div class="jp-card jp-card-maestro jp-card-identified">
          <div class="jp-card-front">
            <div class="jp-card-logo jp-card-maestro">{{ item.Bank }}</div>
            <div class="jp-card-lower">
              <div class="jp-card-shiny"></div>
              <div class="jp-card-number jp-card-display">{{ item.Card && formatBankNumber(item.Card) }}</div>
              <div class="jp-card-name jp-card-display">{{ item.Name }}</div>
              <div class="jp-card-expiry jp-card-display">{{ year }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <!-- 绑定银行卡 -->
    <v-dialog v-if="showDetail" v-model="showDetail" max-width="500px">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          <h3 class="text-center">{{ textFilter('bindBankCard') }}</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="valid">
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
                  type="text"
                  @keyup.native="cardForm.Card = cardForm.Card.replace(/\s+/g, '')"
                  :rules="[v => !!v || this.textFilter('errorCardNull')]"
                ></v-text-field>
                <template v-if="Number(config.is_show_ENG_name)">
                  <v-text-field
                    v-model="cardForm.Account"
                    :value="cardForm.Account"
                    :label="textFilter('bankAccountLabel')"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="cardForm.EName"
                    :value="cardForm.EName"
                    required
                    :label="textFilter('eNameLabel')"
                    type="text"
                  ></v-text-field>
                </template>
                <v-text-field v-model="cardForm.Name" :label="textFilter('nameLabel')" required type="text" readonly></v-text-field>
                <v-text-field
                  v-model="cardForm.Branch"
                  :label="textFilter('branchLabel')"
                  placeholder=""
                  required
                  type="text"
                  hint="可填支行信息或者大概所在省市"
                  :rules="[v => !!v || !Number(config.require_bank_branch) || '“支行“栏位为必填']"
                  persistent-hint
                ></v-text-field>
              </template>
              <template v-else-if="bankCardType === 2">
                <v-flex>
                  <v-select
                    v-model="cardForm.Locale"
                    :items="usdtAppChannels"
                    item-value="text"
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
                      @click.prevent="$refs.qrInput.$el.click()"
                      icon
                      :color="qrInputHover ? `primary` : `default`"
                      ><v-icon>cloud_upload</v-icon></v-btn
                    >
                    <image-barcode-reader v-show="false" ref="qrInput" @decode="qrDetect" @error="qrError"></image-barcode-reader>
                  </template>
                </v-text-field>
              </template>
            </v-form>
            <div class="d-flex justify-end mt-5">
              <v-btn color="primary" class="white--text" depressed @click="postBankCard" :loading="isLoading" :disabled="!valid">
                <v-icon>done</v-icon>{{ textFilter('confirmBtn') }}
                <span slot="loader">{{ textFilter('submitting') }}</span>
              </v-btn>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { chinaBankList, indiaBankList } from '@ASSETS/userCentre/bankInfo';
import { getI18n, textFilter } from '@UTILS/i18n';
import { bytesToBase64 } from '@UTILS';
import { decodeConfigAPIValue } from '@UTILS/configAPI';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import VueQr from 'vue-qr';

import _ from 'lodash';

// DODO 銀行卡樣式css 優化
const defaultCardForm = {
  Bank: '',
  Card: '',
};
export default {
  name: 'BankCard',
  props: {},
  components: {
    ImageBarcodeReader,
    VueQr,
  },
  data: () => ({
    showDetail: false,
    cardForm: _.cloneDeep(defaultCardForm),
    defaultCardForm,
    getI18n: e => getI18n(e.text),
    countryList: [],
    bankCardType: 1,
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
  }),
  computed: {
    ...mapGetters(['isLoading', 'userProfileData', 'userBankList', 'config', 'locale', 'bankList', 'usdtAppChannels']),
    localeBankList() {
      return this.bankList.filter(item => item.locale == this.cardForm.Locale);
    },
    year() {
      return new Date().getFullYear();
    },
  },
  watch: {
    userProfileData(info) {
      if (info.username == '') {
        this.SET_MESSAGE({ message: this.textFilter('errorUsernameNull') });
        setTimeout(() => {
          this.$router.push({ name: 'profile' });
        }, 3000);
      } else {
        // 取得 個人銀行卡
        this.GET_USER_BANK_LIST();
        this.defaultCardForm.Name = info.username;
      }
    },
    showDetail(isShow) {
      isShow && (this.cardForm = _.cloneDeep(this.defaultCardForm));
    },
    locale() {
      this.setCountryList();
    },
  },
  mounted() {
    this.GET_USER_PROFILE(); // 取得個人資訊
    this.setCountryList();
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'GET_USER_BANK_LIST', 'POST_USER_BANK']),
    ...mapMutations(['SET_MESSAGE']),
    // 綁定銀行卡
    async postBankCard() {
      this.cardForm.type = this.bankCardType;
      if (this.cardForm.type == 2) {
        this.cardForm.Bank = 'USDT';
      }
      const res = await this.POST_USER_BANK(this.cardForm);
      !res.isError && (this.showDetail = false);
    },
    formatBankNumber(bankNumber) {
      if (this.config.Show_Bank_Code == 1) return bankNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      return bankNumber.substr(0, 4) + ' **** **** ' + bankNumber.substr(-4);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_bankCard_');
    },
    async setCountryList() {
      const mod = await import(`@G/i18n/country/${this.locale}.js`);
      const { globalCountryList } = mod.default;
      this.countryList = globalCountryList
        .filter((item, index) => {
          return ['cn', 'hk', 'mo', 'my', 'sg'].includes(item.alpha2);
        })
        .map(item => {
          return { text: item.name, value: item.alpha2 };
        });
    },
    qrDetect(content) {
      if (content) {
        this.cardForm.Card = content;
        this.$refs.qrInput.$el.value = '';
      } else {
        this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter('errorUsdtAccountNull') }), type: 'warning' });
      }
    },
    qrError(error) {
      console.log(error);
      this.SET_MESSAGE({ message: '格式错误', type: 'warning' });
    },
  },
};
</script>

<style>
@import './assets/card.css';
</style>
<style lang="scss">
.jp-card-logo.jp-card-maestro {
  text-transform: uppercase;
  display: flex;
  align-content: center;
  line-height: 1.2;
  height: 84px;
  padding-top: 3em;
}
.jp-card-container {
  @for $i from 1 through 5 {
    //從 1 到 5 共執行 5 次。

    &:nth-child(#{$i}n + 1) {
      mask: url('./assets/icon/card-#{$i}.png') no-repeat center/cover;
      .jp-card-front {
        &:before {
          background: url('./assets/icon/card-#{$i}.png') no-repeat center/cover;
        }
      }
    }
  }
}
</style>
