<template>
  <v-container class="hasBgColor bankCardBox">
    <v-progress-linear v-if="isLoading || checkLoading" indeterminate class="mb-3"></v-progress-linear>
    <!-- 前台銀行卡是否隱藏USDT錢包選項 未設定時隱藏  -->
    <v-flex v-if="Number(config.is_show_usdt_wallet)" class="gridBox">
      <template v-for="ty in bankCardTypes">
        <v-btn
          block
          active-class="newBTN"
          :key="ty.value"
          @click="
            cardForm = _.cloneDeep(defaultCardForm);
            bankCardType = ty.value;
          "
          dense
          :outlined="bankCardType != ty.value"
          >{{ ty.lang }}</v-btn
        >
      </template>
    </v-flex>
    <v-row justify="center" v-if="bankCardType === 1">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn> -->
          <span class="addBank" v-if="bankCardType === 1" v-bind="attrs" v-on="on" />
        </template>

        <div class="formBox">
          <v-form v-model="valid" class="mb-5" ref="form">
            <template>
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
                :rules="[v => !!v || this.textFilter('errorCardNull')]"
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
          </v-form>
          <div class="btnBox">
            <v-btn :disabled="!valid" color="rgb(77,153,116)" depressed :loding="isLoading" @click="postBankCard">{{
              textFilter('determineBtn')
            }}</v-btn>
            <v-btn color="rgb(77,153,116)" outlined @click="dialog = false">{{ textFilter('cancelBtn') }}</v-btn>
          </div>
        </div>
      </v-dialog>
    </v-row>
    <v-row justify="center" v-if="bankCardType === 2">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn> -->
          <span class="addUSDT" v-if="bankCardType === 2" v-bind="attrs" v-on="on" />
        </template>

        <div class="formBox">
          <v-form v-model="valid" class="mb-5" ref="form">
            <template>
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
                @click.prevent="upload"
              >
                <template slot="append">
                  <v-menu bottom left :close-on-click="true" :disabled="!showAppOptions">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @mouseenter="qrInputHover = true"
                        @mouseleave="qrInputHover = false"
                        @dragover.prevent
                        icon
                        :color="qrInputHover ? `primary` : `default`"
                        @click.prevent="upload"
                        ><v-icon>cloud_upload</v-icon></v-btn
                      >
                    </template>
                    <v-list class="white">
                      <v-list-item>
                        <v-btn color="rgb(77,153,116)" class="white--text" dense @click="openCamera">
                          <v-icon>camera</v-icon>
                        </v-btn>
                      </v-list-item>
                      <v-list-item>
                        <v-btn color="rgb(77,153,116)" class="white--text" dense @click="openAlbum">
                          <v-icon>image</v-icon>
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <image-barcode-reader v-show="false" :capture="undefined" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
                </template>
              </v-text-field>
            </template>
          </v-form>
          <div class="btnBox">
            <v-btn :disabled="!valid" color="rgb(77,153,116)" depressed :loding="isLoading" @click="postBankCard">{{
              textFilter('determineBtn')
            }}</v-btn>
            <v-btn color="rgb(77,153,116)" outlined @click="dialog = false">{{ textFilter('cancelBtn') }}</v-btn>
          </div>
        </div>
      </v-dialog>
    </v-row>
    <div v-if="this.userBankList.length === 0" class="noInfoBox">
      <p>點選右下+ 添加銀行卡</p>
    </div>
    <!-- 銀行卡列表 一般銀行 -->
    <div v-if="bankCardType === 1" class="mt-10">
      <v-flex v-for="(item, k) in userBankList" :key="k" mt-1 xs12 class="mt-5">
        <v-card color="rgb(108,219,139)" class="white--text" v-show="item.Bank != 'USDT'">
          <v-card-title primary-title>
            {{ item.Bank }}
          </v-card-title>
          <v-card-text>
            {{ formatBankNumber(item.Card) }}
          </v-card-text>
        </v-card>
      </v-flex>
    </div>
    <!-- 銀行卡列表 USDT -->
    <div v-if="bankCardType === 2" class="mt-10">
      <v-flex v-for="(item, k) in userBankList" :key="k" mt-1 xs12 class="mt-5">
        <v-card color="rgb(108,219,139)" class="white--text" v-show="item.Bank === 'USDT'">
          <v-card-title primary-title>
            {{ item.Bank }}
          </v-card-title>
          <v-card-text>
            {{ formatBankNumber(item.Card) }}
          </v-card-text>
        </v-card>
      </v-flex>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { getI18n, textFilter } from '@UTILS/i18n';
import { decodeConfigAPIValue } from '@UTILS/configAPI';
import { ImageBarcodeReader } from 'vue-barcode-reader';
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
      dialog: false,
      checkLoading: true,
      cardForm: { ...defaultCardForm },
      defaultCardForm,
      getI18n: e => getI18n(e.text),
      bankCardType: 1,
      countryList: [],
      bankCardTypes: [
        {
          value: 1,
          lang: '銀行卡',
        },
        {
          value: 2,
          lang: 'USDT錢包',
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
    showAppOptions() {
      return !!window.appobject && !!window.appobject.postMessage;
      // return true;
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
  async created() {
    // this.GET_USER_PROFILE();
    try {
      const profile = await this.GET_USER_PROFILE();
      if (!profile.username) throw { route: 'profile', key: 'msgName' }; // 1.檢查姓名
      this.checkLoading = false;
    } catch (e) {
      e.isError ? this.$router.go(-1) : this.routerPushWarning(e);
    }
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
    this.setCountryList();
    this.SET_CURRENT_MENU_TITLE('账户管理');
    window.usdtUploadCallBack = text => {
      this.cardForm.Card = text;
    };
  },
  methods: {
    ...mapActions(['POST_USER_BANK', 'GET_USER_PROFILE', 'GET_USER_BANK_LIST']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_FULL_WIDTH', 'SET_MESSAGE']),
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
          return ['cn', 'hk', 'mo', 'my', 'sg'].includes(item.alpha2);
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
    routerPushWarning(error) {
      const msg = error.key;
      this.SET_MESSAGE({ message: '真实姓名不可为空', type: 'warning' });
      this.timerSaver = setTimeout(() => {
        this.$router.push(error.route);
      }, 1500);
    },
    routerPush(path) {
      this.$router.push({ path });
    },
    upload(e) {
      if (!this.showAppOptions) {
        this.$refs.qrInput.$el.click();
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
    openCamera() {
      window.appobject.postMessage('{"action":1,"message":""}');
    },
    openAlbum() {
      window.appobject.postMessage('{"action":2,"message":""}');
    },
  },
};
</script>

<style>
@import './assets/card.css';
</style>
<style scoped lang="scss">
.v-progress-linear {
  height: 1px !important;
  position: absolute;
  z-index: 11;
  top: 53px;
}
.formBox {
  background: #fff;
  padding: 9px 31px 15px;
  .btnBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      min-width: auto;
      width: 45% !important;
      margin: 0;
      padding: 3px 12px;
    }
  }
}
.bankCardBox {
  position: relative;
  padding-top: 67px;
  padding-bottom: 67px;
  .noInfoBox {
    position: relative;
    margin: 300px auto;
    width: 150px;
    font-size: 10px;
    text-align: center;
  }
  .noInfoBox::before {
    content: '';
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    top: -99px;
    left: 25px;
    background: url('./assets/img/addCard.png') no-repeat center center/contain;
  }
  .addBank,
  .addUSDT {
    position: fixed;
    bottom: 80px;
    right: 15px;
    width: 40px;
    height: 40px;
    display: block;
    background: url('./assets/img/addBank.png') no-repeat center center/contain;
    z-index: 9;
  }
  .v-btn.v-btn--block.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
    color: #333 !important;
    background: #fff !important;
  }
  .v-btn.v-btn--block.v-btn--outlined.theme--light.v-size--default {
    background: rgb(242, 242, 242) !important;
    border: 1px solid rgb(242, 242, 242) !important;
  }
  .theme--light.v-btn:hover::before {
    opacity: 0 !important;
  }
  .v-btn--is-elevated {
    border: 1px solid rgb(242, 242, 242) !important;
    box-shadow: 0 0 0 rgb(0, 0, 0, 0) !important;
  }
  .addBank {
    border: none !important;
  }
  .gridBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
