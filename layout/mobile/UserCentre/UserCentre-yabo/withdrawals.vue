<template>
  <div class="withdrawalsBox">
    <v-container class="withdrawalsInBox">
      <v-progress-linear v-if="isLoading || checkLoading" indeterminate></v-progress-linear>
      <h4>
        {{ textFilter('balance') }}<span class="orange--text">{{ this.balanceSum }}</span>
      </h4>
      <v-select
        color="#07AF4C"
        hint="请选择取款方式"
        v-model="selectType"
        :items="withdrawalTypes"
        label="取款方式"
        item-text="label"
        item-value="value"
        outline
      >
      </v-select>
      <v-select
        v-if="selectType === 1"
        color="#07AF4C"
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

      <v-select
        v-if="selectType === 2"
        color="#07AF4C"
        return-object
        :hint="textFilter('accountHint')"
        noDataText="无可用USDT账户"
        v-model="select"
        :items="usdtWallets"
        :label="textFilter('accountLabel')"
        :item-text="changeStar"
        outline
      >
      </v-select>

      <v-text-field v-model="select.Name" readonly :label="$t('g_layout_userCentre_default_bankCard_nameLabel')" color="#07AF4C"></v-text-field>
      <v-text-field
        v-model.number="withdraw"
        @input="onWithdrawChange"
        type="number"
        :prefix="selectType === 1 ? config.unit : 'U'"
        :label="selectType === 1 ? textFilter('withdrawLabel') : '取款USDT数量'"
        color="#07AF4C"
      ></v-text-field>
      <div v-if="selectType === 2" class="usdt-amount-info">
        <div>
          换算汇率： <span class="info-red">{{ config.usdt_buying_rate }}</span>
        </div>
        <div>
          换算人民币金额：￥ <span class="info-red">{{ totalAmountStr(totalAmount) }}</span>
        </div>
      </div>
      <v-text-field
        v-model="withdrawPass"
        class="withdrawPass"
        :type="visibility ? 'text' : 'password'"
        :append-icon="visibility ? 'visibility' : 'visibility_off'"
        @click:append="visibility = !visibility"
        :label="textFilter('withdrawPassLabel')"
        :placeholder="textFilter('withdrawPassPlaceholder')"
        background-color="#fff"
        color="#07AF4C"
      >
      </v-text-field>

      <!-- USDT -->
      <!-- <div>
        <div class="d-flex align-center hasHidden" v-if="usdtWallets.length && selectType===1">
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
            <template slot="append">
              <v-btn @dragover.prevent icon color="#07AF4C" @click.prevent="$refs.qrInput.$el.click()"><v-icon>cloud_upload</v-icon></v-btn>
              <image-barcode-reader v-show="false" ref="qrInput" @decode="onDecode" @error="qrError"></image-barcode-reader>
            </template>
          </v-autocomplete>
        </div>
      </div> -->
      <v-btn
        v-if="!(config.Hide_WithdrawalBtn === '1')"
        :disabled="isLoading || checkLoading"
        @click.stop="postWithdrawal"
        dark
        block
        depressed
        color="#07AF4C"
      >
        {{ textFilter('submitBtn') }}
      </v-btn>
      <!-- <v-btn color="primary" block outlined class="mt-3" @click="$router.go(-1)">{{ textFilter('cancelBtn') }}</v-btn> -->

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
    </v-container>
    <v-list class="disBox">
      <v-list-item>
        <v-list-item-content>
          <h4 class="mb-3">{{ textFilter('descriptionTitle') }}</h4>
          <div v-html="config.withdrawals_descriptionContents" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- 提款提示 -->
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { MOBILE_WITHDRAWALS_DESCRIPTIONCONTENTS } from '@G/consts';
import { textReplacer, cardStarText } from '@G/utils';
// import { ImageBarcodeReader } from 'vue-barcode-reader';
export default {
  name: 'Withdrawals',
  components: {
    // ImageBarcodeReader,
  },
  data() {
    return {
      withdrawalTypes: [
        {
          label: '银行卡取款',
          value: 1,
        },
        {
          label: 'USDT取款',
          value: 2,
        },
      ],
      visibility: false,
      checkLoading: true,
      showUSDT: false,
      select: {},
      selectType: 1,
      Password: '',
      dialog: false,
      withdrawPass: '',
      withdraw: '',
      usdtAccount: '', // usdt 錢包地址
      originalUsdtAccount: '', // usdt 錢包地址初始值
      editUsdtAcc: false,
      timerSaver: null,
      descriptionContents: MOBILE_WITHDRAWALS_DESCRIPTIONCONTENTS.split(',').map(i => `descriptionContent${i}`),
      showModal: false,
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
    ]),
    withdrawal_limited() {
      let arr = this.config.withdrawal_limited.split(',');
      const [lower = '', higher = ''] = arr;
      return { lower, higher, day: this.config.withdrawal_day };
    },
    bankCards() {
      return this.userBankList.filter(item => item.Bank != 'USDT');
    },
    totalAmount() {
      let _amount = parseFloat(this.accMul(this.config.usdt_buying_rate, this.withdraw));
      _amount = Number.isNaN(_amount) || !Number.isFinite(_amount) ? 0 : parseFloat(_amount);
      return _amount;
    },
  },
  watch: {
    selectType() {
      this.withdraw = '';
    },
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
    // usdtWallets(wallets) {
    //   if (wallets.length) {
    //     this.usdtAccount = wallets[0].Card;
    //   }
    // },
  },
  async created() {
    this.SET_CURRENT_MENU_TITLE(this.textFilter('withdrawal'));
    // 進入頁面前檢查
    try {
      const profile = await this.GET_USER_PROFILE();
      if (!profile.username) throw { route: 'profile', key: 'msgName' }; // 1.檢查姓名
      // if (!profile.cards || profile.cards.length < (this.config.ID_pic_check || 0)) throw { route: 'profile', key: 'msgCards' }; // 2.檢查身份證
      if (!this.userInfo.w) throw { route: 'withdrawalsPass', key: 'msgPassword' }; // 3.檢查取款密碼
      const bankList = await this.GET_USER_BANK_LIST();
      if (!bankList.length) throw { route: 'bankCard', key: 'msgBankCard' }; // 4.檢查銀行卡
      this.checkLoading = false;
    } catch (e) {
      e.isError ? this.$router.go(-1) : this.routerPushWarning(e);
    }
    await this.GET_VIRTUAL_USDT();
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
      'GET_USDT_WITHDRAWALS',
      'PUT_SET_W_PASSWORD',
      'GET_VIRTUAL_USDT',
      'PATCH_VIRTUAL_USDT',
    ]),
    ...mapMutations([
      'SET_CURRENT_MENU_TITLE',
      'SET_MESSAGE',
      'POST_WITHDRAWALS_STATUS',
      'PUT_PASSWORD_STATUS',
      'SET_FULL_WIDTH',
      'ADD_WALLET_QRCODE',
    ]),
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
    accMul(num1, num2) {
      if (!num1 || !num2) {
        return 0;
      }
      let m = 0;
      let s1 = num1.toString();
      let s2 = num2.toString();
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
      if (this.selectType === 2 && value) {
        const _arr = value.split('.');
        if (_arr[1] && _arr[1].length > 2) {
          const _v = `${_arr[0]}.${_arr[1].substr(0, 2)}`;
          setTimeout(() => {
            this.withdraw = _v;
          }, 0);
        }
      }
    },
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
      return this.desensitization(item.Card, 4, -4);
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
    async postWithdrawal() {
      if (this.selectType === 1 && this.withdraw < 100) {
        this.SET_MESSAGE({ message: this.textFilter('errorWithdrawLimit') });
        return false;
      }
      if (this.selectType === 2 && this.totalAmount < 100) {
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
      if (!this.select.Bank) {
        this.SET_MESSAGE({ message: this.textFilter('errorBankNull') });
        return false;
      }

      if (this.selectType === 1) {
        const data = {
          Amount: parseFloat(this.withdraw),
          Bank: this.select.Bank,
          Branch: this.select.Branch,
          Card: this.select.Card.replace(/\s/gi, ''),
          Name: this.select.Name.replace(/\s/gi, ''),
          Password: this.withdrawPass,
        };
        this.POST_WITHDRAWALS(data)
          .then(res => {
            this.SET_MESSAGE({ message: '提交成功！', type: 'success' });
          })
          .catch(res => {
            this.SET_MESSAGE({ message: res, type: 'error' });
          });
      } else {
        const data = {
          Amount: this.totalAmount,
          Bank: this.select.Bank,
          Branch: this.select.Branch,
          Card: this.select.Card.replace(/\s/gi, ''),
          usdtAccount: this.select.Card.replace(/\s/gi, ''),
          Name: this.select.Name.replace(/\s/gi, ''),
          Password: this.withdrawPass,
        };
        if (this.config.withdrawal_usdt_show_dialog == 1) {
          this.GET_USDT_WITHDRAWALS()
            .then(res => {
              if (res) {
                this.POST_WITHDRAWALS(data)
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
          this.POST_WITHDRAWALS(data)
            .then(res => {
              this.SET_MESSAGE({ message: '提交成功！', type: 'success' });
            })
            .catch(res => {
              this.SET_MESSAGE({ message: res, type: 'error' });
            });
        }
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
<style scoped lang="scss">
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
.v-progress-linear {
  height: 1px !important;
  position: absolute;
  z-index: 11;
  top: 66px;
  left: 0;
}
.withdrawalsBox {
  height: 105vh;
  padding: 80px 15px 30px;
  background: rgb(246, 246, 246);
  .withdrawalsInBox {
    background: #fff;
    padding: 20px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
  }
  .disBox {
    background: rgb(246, 246, 246);
    font-size: 10px;
    padding: 10px 0 30px 0;
  }
  .hasHidden {
    overflow: hidden;
  }
}
.usdt-amount-info {
  padding: 10px 0;
  font-size: 12px;
  color: #999;
  .info-red {
    color: #ff5252;
  }
}
</style>
