<template>
  <div class="newDepositBox">
    <div class="tabBox">
      <h3>支付方式</h3>
      <v-tabs v-model="currentTab" class="tabTitleBox">
        <v-tab v-for="(item, k) in tabList" :key="k" @click="clickTabHandler(item.code)">
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </div>
    <!--全球支付-->
    <div v-if="currentTab == 0">
      <div class="tabItemBox">
        <h3>選擇支付類型</h3>
        <v-tabs v-model="post.pay_type" class="tabTitleBox">
          <v-tab v-for="item in newPaymentMethods" :key="item.code">
            <div class="pay-icon" :class="item.code" style="margin-right: 5px"></div>
            <div v-if="item.code === 'QQ'" :class="item.code">钉钉</div>
            <div v-else-if="item.code === 'POINT_CARD'" :class="item.code">Astropay</div>
            <div v-else-if="item.code === 'USDT'" :class="item.code">虚拟货币转账</div>
            <div v-else :class="item.code">{{ item.name }}</div>

            <!-- <div class="pay-icon" :class="item.code">{{ item.code === 'QQ' ? '钉钉' : item.code === 'POINT_CARD' ? 'Astropay' : item.name }}</div> -->
          </v-tab>
        </v-tabs>
      </div>
      <!--全球支付-->
      <div class="tabItemBox py-2" v-if="currentMethod && currentMethod.code !== 'USDT' && paymentMethods && currentMethod">
        <h5 class="hint my-0 d-flex justify-center font-weight-400 height-35px align-center font-size-10">
          <img class="width-15px mr-1" src="./assets/hint.png" />
          为了您的资金安全，请使用绑定的姓名存款。
        </h5>

        <v-text-field
          class="my-5 px-2"
          solo
          outlined
          dense
          persistent-hint
          v-model.number="post.amount"
          hint="建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账"
          placeholder="輸入金额"
        >
          <template #prepend>
            <label class="mb-0 text-no-wrap font-size-14 grey--text">存款金额 :</label>
          </template>
        </v-text-field>
        <div class="d-flex ma-1 flex-wrap" v-if="presets">
          <span></span>
          <template v-for="(option, i) in presets">
            <v-btn
              v-if="option"
              class="btn-channel py-2 mb-2 d-block x-small dense ma-1"
              :class="{ active: post.amount == option }"
              :key="i"
              @click="
                post.option = option;
                post.amount = option;
              "
            >
              <div class="d-flex flex-column justify-center">
                <span>{{ option }}</span>
              </div>
            </v-btn>
          </template>
        </div>

        <div class="d-flex flex-column justify-stretch ma-2">
          <template v-for="(channel, i) in currentMethod.channels">
            <v-btn
              v-if="channel"
              class="btn-channel py-2 mb-2 d-block"
              :class="{ active: checkValid(channel) }"
              :key="i"
              @click="submit(channel.id)"
              :disabled="!checkValid(channel)"
            >
              <div class="d-flex flex-column justify-center">
                <span>{{ channel.name }}</span>
                <span v-if="channel && channel.amount_range.length">金額範圍{{ channel.amount_range[0] }}元 - {{ channel.amount_range[1] }}元</span>
                <span v-if="channel && channel.amount_selects.length">固定金額 {{ channel.amount_selects.join(',') }} 元</span>
              </div>
              <i class="recommend" v-show="channel.recommend === 1"><img src="./assets/img/recommand.png" alt="" /></i>
            </v-btn>
          </template>
        </div>
      </div>
      <template v-else>
        <v-card-text style="background: #fff">
          <v-text-field
            label="USDT交易数量"
            type="number"
            v-model="post.usdt_amount"
            @keyup="post.usdt_amount = post.usdt_amount.replace(/^(0+)|[^\d]+/g, '')"
            required
          ></v-text-field>
          <v-text-field readonly color="#07AF4C" label="汇率" :value="usdtRate"></v-text-field>
          <v-text-field label="人民币交易金额" readonly v-model.number="RMBAmount" required type="number"></v-text-field>
          <!-- <div v-if="onlineChargeItems.length" class="mb-5">
            <v-btn dark v-for="(item, k) in onlineChargeItems" :key="k" @click="resultAmount = item" small color="#07AF4C" depressed class="mr-1 mb-1">
              {{ item }}
            </v-btn>
          </div> -->
          <div class="d-flex ma-1 flex-wrap" v-if="presets">
            <span></span>
            <template v-for="(option, i) in presets">
              <v-btn
                v-if="option"
                class="btn-channel py-2 mb-2 d-block x-small dense ma-1"
                :class="{ active: post.amount == option }"
                :key="i"
                @click="
                  post.option = option;
                  post.amount = option;
                  post.usdt_amount = option;
                "
              >
                <div class="d-flex flex-column justify-center">
                  <span>{{ option }}</span>
                </div>
              </v-btn>
            </template>
          </div>
          <div class="d-flex flex-column justify-stretch" v-if="currentMethod">
            <template v-for="(channel, i) in currentMethod.channels">
              <v-btn
                v-if="channel"
                class="btn-channel py-2 mb-2 d-block"
                :class="{ active: checkValid(channel) }"
                :key="i"
                @click="submit(channel.id)"
                :disabled="!checkValid(channel)"
              >
                <div class="d-flex flex-column justify-center">
                  <span>{{ channel.name }}</span>
                  <span v-if="channel && channel.amount_range.length">金額範圍{{ channel.amount_range[0] }}元 - {{ channel.amount_range[1] }}元</span>
                  <span v-if="channel && channel.amount_selects.length">固定金額 {{ channel.amount_selects.join(',') }} 元</span>
                </div>
                <i class="recommend" v-show="channel.recommend === 1"><img src="./assets/img/recommand.png" alt="" /></i>
              </v-btn>
            </template>
          </div>
        </v-card-text>
      </template>
    </div>
    <!--虛擬支付-->
    <div v-else class="lagacy">
      <Lagacy :filter-type="[5, 6, 7]" />
    </div>
    <div class="ma-2 font-size-14 text-center">存款遇到問題？ 聯繫 <a @click="SHOW_LIVE_CHAT(0)">人工客服</a> 解決</div>
    <v-dialog v-model="showForm" persistent width="100%">
      <v-card>
        <v-card-title class="headline">{{ textFilter('formDialogTitle') }}</v-card-title>
        <v-card-text>
          <div class="pay-form" v-html="payForm"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#07AF4C" text @click.native="showForm = false">{{ textFilter('closeBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Lagacy from './deposit';
import { textFilter } from '@UTILS/i18n';
import { cloneDeep, uniq, concat } from 'lodash';

export default {
  name: 'newDeposit',
  components: {
    Lagacy,
    // ImageBarcodeReader,
  },
  props: {},
  data() {
    return {
      currentTab: 0,
      tabList: [
        {
          code: 'pay1',
          title: '全球支付',
        },
        // {
        //   code: 'pay2',
        //   title: '虛擬貨幣',
        // },
      ],
      post: { amount: 0, id: null, pay_type: null, usdt_amount: 0, currency: 'CNY' },
      method: null,
      payForm: null,
      RMBAmount: 0,
      currencyCode: '',
    };
  },
  computed: {
    ...mapGetters(['config', 'paymentMethods', 'isNativeApp', 'usdtRate']),
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
    presets() {
      const arr = [];
      this.currentMethod?.channels?.forEach(ch => {
        ch.amount_selects.forEach(num => arr.push(Number(num)));
      });
      return uniq(arr.sort((a, b) => a - b));
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
  },
  watch: {
    'currentMethod.code'(code) {
      this.post.amount = '';
      this.post.usdt_amount = '';
    },
    'post.usdt_amount'(val) {
      const amountNum = val * this.usdtRate;
      // this.resultAmount = Math.floor(amountNum * 100) / 100;
      this.RMBAmount = amountNum.toFixed(2);
    },
    presets(newArr) {
      if (newArr.length) {
        this.post.amount = newArr[0];
        this.post.usdt_amount = newArr[0];
      }
    },
  },
  created() {
    this.GET_PAYMENT_METHODS();
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'ROUTER_PUSH', 'POST_DEPOSIT_JCF', 'NATIVE_OPEN_URL', 'GET_PAYMENT_METHODS']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'POST_DEPOSIT_STATUS', 'SET_FULL_WIDTH', 'SET_APP_FLAG']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_deposit_', slot) : textFilter(text, 'layout_userCentre_default_deposit_');
    },
    clickTabHandler(code) {
      this.currentTab = code;
    },
    checkValid(channel) {
      const { amount, usdt_amount } = this.post;
      const { amount_selects, amount_range } = channel;
      let money = Number(this.currentMethod.code === 'USDT' ? usdt_amount : amount);
      return (
        money != 0 &&
        (!amount_selects.length || amount_selects.map(n => Number(n)).includes(money)) &&
        (!amount_range.length || (amount_range[0] <= money && amount_range[1] >= money))
      );
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
          this.payForm = FORM.replace(/[_]blank/, '_self');
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.newDepositBox {
  min-height: 100vh;
  background: rgb(246, 246, 246);
  padding-top: 67px;
  padding-bottom: 100px;
  .tabBox {
    margin: 10px;
    border-radius: 7px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
    background: #fff;
    h3 {
      font-size: 16px;
      font-weight: 500;
      padding: 17px 0 0 13px;
    }
    .tabTitleBox {
      padding: 10px;
      .v-tab {
        border: 1px solid rgba(179, 179, 173, 0.3);
        border-radius: 7px;
        font-size: 12px;
        padding: 0 10px;
        margin: 3px;
        min-width: 10px;
        position: relative;
      }
      .v-tab.v-tab--active {
        color: rgb(11, 171, 94) !important;
        border: 1px solid rgb(11, 171, 94);
        border-radius: 7px;
        font-size: 12px;
        padding: 0 10px;
        margin: 3px;
        min-width: 10px;
      }
      .v-tab.v-tab--active::before {
        opacity: 0;
      }
      .v-tab.v-tab--active::after {
        content: '';
        display: block;
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 19px;
        height: 19px;
        background: url('./assets/img/payIcon.png') no-repeat center center/contain;
      }
    }
  }
  .tabItemBox {
    margin: 10px;
    border-radius: 7px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
    background: #fff;
    h3 {
      font-size: 16px;
      font-weight: 500;
      padding: 17px 0 0 13px;
    }
    .tabTitleBox {
      padding: 10px;
      .v-tab {
        border: 1px solid rgba(179, 179, 173, 0.3);
        border-radius: 7px;
        transform: scale(0.93);
        font-size: 10px;
        padding: 10px 20px;
        margin: 0 3px;
        min-width: 10px;
        position: relative;
      }
      .v-tab.v-tab--active {
        color: rgb(11, 171, 94) !important;
        border: 1px solid rgb(11, 171, 94);
        border-radius: 7px;
        transform: scale(0.93);
        font-size: 10px;
        padding: 10px 20px;
        margin: 0 3px;
        min-width: 10px;
      }
      .v-tab.v-tab--active::before {
        opacity: 0;
      }
      .v-tab.v-tab--active::after {
        content: '';
        display: block;
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 19px;
        height: 19px;
        background: url('./assets/img/payIcon.png') no-repeat center center/contain;
      }
      .pay-icon {
        position: relative;
        &:before {
          background: url('./assets/img/payWayIcon4.png') no-repeat center center/contain;
          content: '';
          display: block;
          width: 20px;
          height: 20px;
          margin: 3px auto;
        }
      }
      .ALIPAY::before,
      .ALIPAY_BANK::before {
        background-image: url('./assets/img/payWayIcon1.png');
      }
      .QUICK_PASS::before {
        background-image: url('./assets/img/payWayIcon2.png');
      }
      .WECHAT::before {
        background-image: url('./assets/img/payWayIcon3.png');
      }
      .POINT_CARD::before {
        background-image: url('./assets/img/payWayIcon4.png');
      }
      .WEB_BANK::before {
        background-image: url('./assets/img/payWayIcon5.png');
      }
      .QQ::before {
        background-image: url('./assets/img/QQ.png');
      }
      .OTHER::before {
        background-image: url('./assets/img/OTHER.png');
      }
      .UNION_PAY::before {
        background-image: url('./assets/img/UNION_PAY.png');
      }
      .USDT::before {
        background-image: url('./assets/img/USDT.png');
      }
    }
  }
  .hint {
    color: rgb(74, 102, 88);
    background: rgb(235, 245, 240);
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
    position: relative;
    &.active {
      color: #fff;
      background: linear-gradient(90deg, rgba(41, 193, 105, 1) 0%, rgba(126, 220, 153, 1) 100%) !important;
    }
    .recommend {
      width: 20px;
      position: absolute;
      left: -17px;
      top: -8px;
      img {
        width: 100%;
      }
    }
  }
  ::v-deep {
    .v-text-field {
      input {
        font-size: 14px !important;
        padding: 10px !important;
      }
      .v-input__slot {
        border: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
        fieldset {
          border: 0 !important;
          box-shadow: 0 0 0 1px rgba(171, 179, 173, 0.3) !important;
          border-radius: 2px;
        }
      }
    }
    .v-input--is-focused {
      .v-input__slot {
        box-shadow: none !important;
        border: 0 !important;
        color: rgba(41, 193, 105, 1) !important;
        caret-color: rgba(41, 193, 105, 1) !important;
      }
      .v-text-field__slot {
        box-shadow: none;
        border: 0;
        color: rgba(41, 193, 105, 1) !important;
        caret-color: rgba(41, 193, 105, 1) !important;
      }
    }
    .v-text-field__details {
      margin-top: 0.2em;
      padding: 0 !important;
      .v-messages__message {
        line-height: 1.5 !important;
      }
    }
    .pay-form .v-btn {
      color: #fff;
      background: linear-gradient(90deg, rgba(41, 193, 105, 1) 0%, rgba(126, 220, 153, 1) 100%) !important;
      height: auto;
      border: 0;
      box-shadow: none;
    }
  }
  .lagacy .container {
    padding-top: 0 !important;
  }
}
</style>
<style lang="scss">
.v-slide-group__prev.v-slide-group__prev--disabled,
.v-tabs-slider-wrapper {
  display: none !important;
}
</style>
