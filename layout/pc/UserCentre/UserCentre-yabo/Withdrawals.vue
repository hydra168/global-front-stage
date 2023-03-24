<template>
  <!-- 提款 -->
  <div id="Withdrawals" class="Withdrawals d-flex">
    <div class="width-680px mr-5 position-relative overflow-hidden withdrawals-form">
      <v-progress-linear v-if="isLoading || isBalanceLoading || checkLoading" indeterminate></v-progress-linear>
      <div class="white pa-5">
        <h3 class="mt-0 font-size-18 black--text font-weight-400">取款</h3>
        <!--钱包金额-->
        <h4 class="mt-4 font-size-16 black--text font-weight-400 d-flex align-center">
          <span>钱包金额</span>
          <v-spacer />
          <v-btn text color="#4d9974" class="font-size-14" @click="GET_BALANCE_ALL_INFO()"> 刷新<span class="icon-cw"></span> </v-btn>
        </h4>
        <div class="balance height-100px d-flex flex-column flex-stretch frame black--text px-10px">
          <div class="d-flex justify-end">
            <v-btn text color="#4d9974" class="font-size-14 mw0 pa-0" @click="POST_BALANCE()">
              一键收回<span class="icon-ccw font-size-12 white--text"></span>
            </v-btn>
          </div>
          <div class="d-flex">
            <div v-if="balanceAllInfo[0]" class="flex-grow-1 px-5">
              <span class="font-size-14">{{ balanceAllInfo[0].name }}</span>
              <span class="money--text font-size-20 ml-10px line-height-10" :data-unit="config.unit">{{ balanceAllInfo[0].balance | money }}</span>
            </div>
            <div v-if="balanceAllInfo[-2] && !Number(config.Hide_GameMoneyWallet)" class="flex-grow-1 px-5 border-left-1">
              <span class="font-size-14">{{ gameWalletLabel }}</span>
              <span class="money--text font-size-20 ml-10px line-height-10" :data-unit="config.unit">{{ balanceAllInfo[-2].balance | money }}</span>
            </div>
          </div>
        </div>

        <!--钱包明細-->
        <h4 class="mt-4 font-size-16 black--text font-weight-400 d-flex align-center">钱包明细</h4>

        <div class="mt-10px wallets d-flex justify-start flex-wrap">
          <div class="width-145px pa-5 frame wallet-frame" v-for="(info, i) in balanceAllInfo" :key="i">
            <span class="font-size-14 black--text">{{ info && info.name }}</span>
            <span class="font-size-20 money--text" :data-unit="config.unit">{{ info && info.balance | money }}</span>
          </div>
        </div>
      </div>
      <div class="white pa-5 mt-5">
        <div class="withdrawal-types">
          <span :class="{ active: withdrawalType === 1 }" @click="handleWithdrawalType(1)">银行卡取款</span>
          <span :class="{ active: withdrawalType === 2 }" @click="handleWithdrawalType(2)">USDT取款</span>
        </div>
        <div class="flex-wrap justify-start d-inline-flex gap-20" v-if="withdrawalType === 1">
          <template v-if="!cards.length">
            <v-btn text class="btn-card" @click="ROUTER_PUSH({ name: 'addCard' })">
              <template #default>
                <div class="align-center justify-center d-flex flex-column white--text font-size-12 line-height-20">
                  <span class="add d-inline-flex align-center">添加银行卡</span>
                  <span class="description">请先绑定一张银行卡，用于收款</span>
                </div>
              </template>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              text
              class="btn-card"
              :class="{ active: form.card == item.Card }"
              v-for="(item, i) in cards"
              :key="i"
              @click="form.card = item.Card"
            >
              <template #default>
                <div class="align-center justify-center d-flex flex-column white--text font-size-12 line-height-20">
                  <span class="add d-inline-flex align-center">{{ item.Bank }}</span>
                  <span class="description">{{ item.Card && cardStarText(item.Card) }}</span>
                  <span class="description">{{ item.Name }}</span>
                </div>
              </template>
            </v-btn>
          </template>
        </div>
        <!-- USDT账户 -->
        <div class="flex-wrap justify-start d-inline-flex gap-20" v-else>
          <template v-if="!wallets.length">
            <v-btn text class="btn-card" @click="ROUTER_PUSH({ name: 'addCard' })">
              <template #default>
                <div class="align-center justify-center d-flex flex-column white--text font-size-12 line-height-20">
                  <span class="add d-inline-flex align-center">添加USDT</span>
                  <span class="description">请先绑定USDT，用于收款</span>
                </div>
              </template>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              text
              class="btn-card"
              :class="{ active: form.card == item.Card }"
              v-for="(item, i) in wallets"
              :key="i"
              @click="form.card = item.Card"
            >
              <template #default>
                <div class="align-center justify-center d-flex flex-column white--text font-size-12 line-height-20">
                  <span class="add d-inline-flex align-center">{{ item.Bank }}</span>
                  <span class="description">{{ item.Card && cardStarText(item.Card) }}</span>
                  <span class="description">{{ item.Name }}</span>
                </div>
              </template>
            </v-btn>
          </template>
        </div>

        <!-- 取款信息 -->
        <div class="mt-5 d-flex flex-column justify-stretch gap-5" v-if="withdrawalType === 1">
          <v-form ref="form" v-if="form" v-model="isValid">
            <v-text-field
              :prefix="config.unit"
              placeholder="请输入金额"
              required
              solo
              outlined
              dense
              persistent-hint
              v-model="form.amount"
              @keyup="form.amount = form.amount.replace(/^(0+)|[^\d]+/g, '')"
              :rules="[
                v => !!v || textFilter('errorAmountNull'),
                v => v <= balanceSum || textFilter('errorAmountLimit') + config.unit + ': ' + balanceSum.toFixed(2),
                v => {
                  if (!config.withdrawal_limited) {
                    return true;
                  }
                  const limits = config.withdrawal_limited.split(',');
                  const min = parseInt(limits[0], 10);
                  const max = parseInt(limits[1], 10);
                  if (v < min) {
                    return textFilter('withdrawalAmountMin') + config.unit + ': ' + min.toFixed(2);
                  }
                  if (v > max) {
                    return textFilter('withdrawalAmountMax') + config.unit + ': ' + max.toFixed(2);
                  }
                  return true;
                },
              ]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('withdrawalAmountLabel') }} :</label>
              </template>
            </v-text-field>
            <v-text-field
              :placeholder="textFilter('namePlaceholder')"
              required
              solo
              outlined
              dense
              persistent-hint
              type="text"
              v-model="form.name"
              :rules="[v => !!v || textFilter('namePlaceholder')]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('nameLabel') }} :</label>
              </template>
            </v-text-field>
            <!-- <v-autocomplete
              solo
              outlined
              dense
              v-model="form.usdtAccount"
              :items="wallets"
              item-value="Card"
              :placeholder="textFilter('usdtAccountPlaceholder')"
            >              
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('usdtAccountLabel') }} :</label>
              </template>
              <template v-slot:selection="{ item }">{{ cardStarText(item.Card) }} </template>
              <template v-slot:item="{ item }">{{ cardStarText(item.Card) }} </template>             
            </v-autocomplete> -->

            <v-text-field
              v-model="form.password"
              class="my-2 align-start mt-1 font-size-14"
              solo
              outlined
              dense
              persistent-hint
              :rules="[v => !!v || textFilter('errorPasswordNull')]"
              :placeholder="textFilter('passwordPlaceholder')"
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              :type="visibility ? 'text' : 'password'"
              @click:append="visibility = !visibility"
            >
              <template #prepend>
                <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('passwordLabel') }}</label>
              </template>
            </v-text-field>
          </v-form>
          <v-btn :disabled="!isValid || !form.card" :class="{ active: isValid && !!form.card }" outlined color="primary" @click="submit">提交</v-btn>
        </div>

        <!-- 提现USDT -->

        <div class="mt-5 d-flex flex-column justify-stretch gap-5" v-if="withdrawalType === 2">
          <v-form ref="form-usdt" v-if="form" v-model="isValid">
            <v-text-field
              placeholder="请输入USDT数量"
              required
              solo
              @input="onWithdrawChange"
              outlined
              dense
              persistent-hint
              v-model="form.amount"
              @keyup="form.amount = form.amount.replace(/[^\0-9\.]/g, '').replace(/\.{2,}/g, '.')"
              :rules="[
                v => !!v || '请输入USDT数量',
                v => {
                  if (!Number(v)) {
                    return '请输入正确的USDT数量';
                  }
                  return true;
                },
                v =>
                  v * config.usdt_buying_rate <= balanceSum ||
                  textFilter('errorAmountLimit') + ': ' + (balanceSum / config.usdt_buying_rate).toFixed(2) + 'U',
                v => {
                  if (!config.withdrawal_limited) {
                    return true;
                  }
                  const limits = config.withdrawal_limited.split(',');
                  const rate = config.usdt_buying_rate;
                  const min = parseInt(limits[0], 10);
                  const max = parseInt(limits[1], 10);
                  if (v * rate < min) {
                    return textFilter('withdrawalAmountMin') + ': ' + (min / rate).toFixed(2) + 'U';
                  }
                  if (v * rate > max) {
                    return textFilter('withdrawalAmountMax') + ': ' + (max / rate).toFixed(2) + 'U';
                  }
                  return true;
                },
              ]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">提现USDT数量 :</label>
              </template>
            </v-text-field>
            <div class="usdt-amount-info">
              <div>
                换算汇率： <span class="info-red">{{ config.usdt_buying_rate }}</span>
              </div>
              <div>
                换算人民币金额： ￥<span class="info-red">{{ totalAmountStr(totalAmount) }}</span>
              </div>
            </div>

            <v-text-field
              :placeholder="textFilter('namePlaceholder')"
              required
              solo
              outlined
              dense
              persistent-hint
              type="text"
              v-model="form.name"
              :rules="[v => !!v || textFilter('namePlaceholder')]"
            >
              <template #prepend>
                <label class="mb-0 text-no-wrap font-size-14 grey--text">卡主姓名 :</label>
              </template>
            </v-text-field>
            <v-text-field
              v-model="form.password"
              class="my-2 align-start mt-1 font-size-14"
              solo
              outlined
              dense
              persistent-hint
              :rules="[v => !!v || textFilter('errorPasswordNull')]"
              :placeholder="textFilter('passwordPlaceholder')"
              :append-icon="visibility ? 'visibility' : 'visibility_off'"
              :type="visibility ? 'text' : 'password'"
              @click:append="visibility = !visibility"
            >
              <template #prepend>
                <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ textFilter('passwordLabel') }}</label>
              </template>
            </v-text-field>
          </v-form>
          <v-btn :disabled="!isValid || !form.card" :class="{ active: isValid && !!form.card }" outlined color="primary" @click="submit">提交</v-btn>
        </div>
      </div>
    </div>

    <div class="width-240px">
      <BetRecords />
      <Promotions class="mt-5" />
    </div>
    <v-dialog v-model="showModal" width="500px">
      <div class="tips-dialog">
        <div class="tips-header">
          温馨提示
          <v-btn class="btn-close" text @click="showModal = false">close</v-btn>
        </div>
        <div class="tips-content">
          <div>您需要进行过USDT充值，才可以使用USDT取款</div>
          <v-btn class="content-btn" color="primary" @click="showModal = false">确认</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { textReplacer, cardStarText } from '@G/utils';
import { ImageBarcodeReader } from 'vue-barcode-reader';
import BetRecords from './components/BetRecords';
import Promotions from './components/Promotions';
import config from '../../../../api/config';
const defaultWithdrawalForm = {
  amount: '',
  card: null,
  password: '',
  usdtAccount: '', // usdt 錢包地址
  name: '',
};
export default {
  name: 'Withdrawals',
  components: {
    // ImageBarcodeReader,
    BetRecords,
    Promotions,
  },
  data() {
    return {
      defaultWithdrawalForm,
      form: defaultWithdrawalForm,
      visibility: false,
      isValid: false,
      checkLoading: false,
      withdrawalType: 1,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'isBalanceLoading',
      'userInfo',
      'config',
      'userProfileData',
      'userInfo',
      'userBankList',
      'balanceAllInfo',
      'balanceSum',
      'postWithdrawalsStatus',
      'virtualUsdtInfo',
      'usdtWallets',
      'gameWallet',
      'gameWalletLabel',
    ]),
    withdrawal_limited() {
      let arr = this.config.withdrawal_limited.split(',');
      const [lower = '', higher = ''] = arr;
      return { lower, higher, day: this.config.withdrawal_day };
    },
    starCardText() {
      return this.cardStarText(this.withdrawalForm.card);
    },
    cards() {
      return this.userBankList.filter(item => item.Bank.toLowerCase() != 'usdt');
    },
    wallets() {
      return this.userBankList.filter(item => item.Bank.toLowerCase() == 'usdt');
    },
    totalAmount() {
      let _amount = parseFloat(this.accMul(this.config.usdt_buying_rate, this.form.amount));
      _amount = Number.isNaN(_amount) || !Number.isFinite(_amount) ? 0 : parseFloat(_amount);
      return _amount;
    },
  },
  watch: {
    // 提交後行為
    postWithdrawalsStatus(info) {
      info === 'success' && (this.form = { ...this.defaultWithdrawalForm });
      this.POST_WITHDRAWALS_STATUS(''); // 回復預設
    },
    // usdt 資訊
    virtualUsdtInfo(info) {
      // info.account && this.usdtHandler();
    },
    userProfileData() {
      this.form.name = this.userProfileData.username;
    },
  },
  async created() {
    // 進入頁面前檢查
    try {
      const profile = await this.GET_USER_PROFILE();
      if (!this.userInfo.w) throw { route: 'changePassword', key: 'Password' };
      // this.checkLoading = false;
    } catch (e) {
      this.SET_MESSAGE({ message: this.textFilter('msg', { msg: this.textFilter(`msg${e.key}`) }), type: 'warning' });
      this.ROUTER_PUSH({ name: e.route });
    }
    await this.GET_VIRTUAL_USDT();
    if (!this.userBankList.length) {
      await this.GET_USER_BANK_LIST();
    }
    console.log(this.config);
  },
  mounted() {
    this.form = this.defaultWithdrawalForm;
    this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    // this.usdtHandler();
    // 檢查預定義金額
    this.config.withdrawal_predefined && (this.predefined = this.config.withdrawal_predefined.split(','));
  },
  methods: {
    consolelog(d) {
      console.log(d);
    },
    totalAmountStr(num) {
      if (num) {
        const _arr = `${num}`.split('.');
        if (_arr[1] && _arr[1].length > 2) {
          return `${_arr[0]}.${_arr[1].substr(0, 2)}`;
        }
        return num;
      }
      return 0;
    },
    // cardStarText,
    accMul(num1, num2) {
      if (!num1 || !num2) {
        return 0;
      }
      let m = 0;
      let s1 = num1 && num1.toString() ? num1.toString() : '';
      let s2 = num2 && num2.toString() ? num2.toString() : '';
      try {
        m += s1.split('.')[1].length;
      } catch (e) {
        console.log(e);
      }
      try {
        m += s2.split('.')[1].length;
      } catch (e) {
        console.log(e);
      }
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    onWithdrawChange(value) {
      if (value) {
        const _arr = value.split('.');
        if (_arr[1] && _arr[1].length > 2) {
          const _v = `${_arr[0]}.${_arr[1].substr(0, 2)}`;
          setTimeout(() => {
            this.form.amount = _v;
          }, 0);
        }
      }
    },
    desensitization(str, beginLen, endLen) {
      if (!str) {
        return '';
      }
      let firstStr = str.substr(0, beginLen);
      let lastStr = str.substr(endLen);
      const tempStr = firstStr + '******' + lastStr;
      return tempStr;
    },
    cardStarText(text = '') {
      return this.desensitization(text, 4, -4);
    },
    ...mapMutations(['SET_MESSAGE', 'POST_WITHDRAWALS_STATUS', 'ADD_WALLET_QRCODE']),
    ...mapActions([
      'GET_USER_PROFILE',
      'GET_USER_BANK_LIST',
      'GET_BALANCE_ALL_INFO',
      'POST_WITHDRAWALS',
      'GET_USDT_WITHDRAWALS',
      'POST_BALANCE',
      'GET_VIRTUAL_USDT',
      'PATCH_VIRTUAL_USDT',
      'ROUTER_PUSH',
    ]),
    handleWithdrawalType(type) {
      this.$refs.form && this.$refs.form.resetValidation();
      this.$refs['form-usdt'] && this.$refs['form-usdt'].resetValidation();
      this.form.card = null;
      this.form.amount = '';
      this.withdrawalType = type;
    },
    async submit() {
      let post = { ...this.form, amount: Number(this.form.amount) };
      console.log('post', post);
      const card = this.userBankList.find(item => item.Card === post.card);
      console.log(card);

      if (this.withdrawalType === 1) {
        post = {
          ...post,
          bank: card.Bank,
          card: card.Card,
          branch: card.branch,
        };
        this.POST_WITHDRAWALS(post)
          .then(res => {
            this.SET_MESSAGE({ message: '提交成功！', type: 'success' });
          })
          .catch(res => {
            this.SET_MESSAGE({ message: res, type: 'error' });
          });
      } else {
        post = {
          ...post,
          bank: card.Bank,
          card: card.Card,
          branch: card.branch,
          usdtAccount: card.Card,
          amount: this.totalAmount,
        };

        if (this.config.withdrawal_usdt_show_dialog == 1) {
          this.GET_USDT_WITHDRAWALS()
            .then(res => {
              if (res) {
                this.POST_WITHDRAWALS(post)
                  .then(res => {
                    this.SET_MESSAGE({ message: '提交成功！', type: 'success' });
                  })
                  .catch(res => {
                    this.SET_MESSAGE({ message: res, type: 'error' });
                  });
              } else {
                this.showModal = true;
              }
            })
            .catch(res => {
              this.SET_MESSAGE({ message: res, type: 'error' });
            });
        } else {
          this.POST_WITHDRAWALS(post)
            .then(res => {
              this.SET_MESSAGE({ message: '提交成功！', type: 'success' });
            })
            .catch(res => {
              this.SET_MESSAGE({ message: res, type: 'error' });
            });
        }
      }
    },
    // 更新 USDT 錢包地址
    updateUsdtAcc() {
      this.PATCH_VIRTUAL_USDT({ account: this.usdtAccount });
    },
    textFilter(text, slot) {
      return textFilter(text, 'layout_userCentre_default_withdrawals_', slot);
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
<style lang="scss" scoped>
.tips-dialog {
  background-color: #fff;
  border: 1px solid #dedede;
  text-align: center;
  border-radius: 4px;
  color: #333;
  .tips-header {
    line-height: 44px;
    font-weight: 500;
    border-bottom: 1px solid #dedede;
    position: relative;
    .btn-close {
      position: absolute;
      right: 10px;
      top: 10px;
      min-width: 20px !important;
      width: 25px !important;
      height: 25px !important;
      // box-shadow: 0 0 0 5px red;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
      text-indent: -999em;
      color: #666;
      opacity: 0.8;
      transform: rotateZ(-720deg);
      transition-duration: 0.25s;
      &:hover {
        transform: none;
        opacity: 1;
      }
    }
  }
  .tips-content {
    font-size: 14px;
    padding: 30px 0 30px 0;
    .content-btn {
      margin-top: 30px;
    }
  }
}
.usdt-amount-info {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
  .info-red {
    color: #ff5252;
  }
}
::v-deep {
  .money--text {
    color: #ffaa00 !important;
    display: inline-block;
    vertical-align: bottom;
    &:before {
      content: '￥';
      font-size: #{(12/20)}em;
      margin-right: 5px;
    }
  }
  .frame {
    border: 2px solid #f5f5f5;
    &.wallet-frame {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .balance .border-left-1 {
    border-color: rgba(0, 0, 0, 0.2) !important;
  }
  .btn-card {
    height: 110px;
    max-height: 110px;
    min-height: 110px;
    border-radius: 5px;
    width: 200px;
    max-width: 200px;
    flex-grow: 1;
    background-image: linear-gradient(180deg, #cde5d5, #91a99c);
    .add {
      &:before {
        content: '+';
        display: inline-block;
        width: 1em;
        height: 1em;
        color: #91a99c;
        background: #fff;
        border-radius: 1em;
        line-height: 1.2;
        text-align: center;
        margin-right: 5px;
      }
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.active {
      box-shadow: 0 0 0 1px #0bab5e inset;
      color: #0bab5e;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: url(./assets/deposit/check.png) right bottom / 20px 20px no-repeat;
      }
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
    &.v-autocomplete .v-input__control {
      .v-input__slot {
        max-width: none;
      }
    }
  }
  .withdrawal-types {
    color: #333;
    margin-bottom: 20px;
    span {
      cursor: pointer;
      margin-right: 20px;
      line-height: 36px;
      padding: 0 20px;
      border: 1px solid #e1e1e1;
      display: inline-block;
      border-radius: 4px;
      position: relative;
      &.active {
        border-color: #0bab5e;
        color: #0bab5e;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
          height: 14px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTAyrYAyrXwyrXgysXgurXv///+758zG4d0K+gp7dv6nhxojWsJkLqq4AAAAFdFJOUwCANsyaeEHLsAAAANFJREFUOMt90rENwjAQQNEwBD0jUDAJ8CUUUZsiPRIDICZghTBBJCZgLkh3Z5Pv9uvpbOu6zs5Ka7d2jGMc4xjHOMYxjnGMYxzjGMc4xjGOcYxjHOMYxzjGMY5xjGMc4xjHOMYxS/g0tTngx9DmgK+Xe50jLrdGJ/ys8x9MxucpYzL+DBmTJ49lSpg8uS9DwlTXnnnAVNeeecDUbx7LO2DqN/elBEzzYWMJmObD+ohpl+T1rHNaklOzLfWG5bxarAfHR8XsFbNVzEbxXvFB8e5Xv2lgLAsfzPQQAAAAAElFTkSuQmCC)
            right bottom/14px 14px no-repeat;
        }
      }
    }
  }
}
</style>
