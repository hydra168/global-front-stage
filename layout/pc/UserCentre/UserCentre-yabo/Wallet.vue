<template>
  <!-- 我的錢包 -->
  <div id="Wallet" class="Wallet d-flex">
    <div class="width-680px mr-5 position-relative overflow-hidden">
      <v-progress-linear v-if="isLoading || isBalanceLoading" indeterminate></v-progress-linear>
      <div class="white pa-5">
        <h3 class="mt-0 font-size-18 black--text font-weight-400">我的钱包</h3>
        <Invite class="my-2" />
        <!--资金总余额-->
        <h4 class="mt-4 font-size-16 black--text font-weight-400 d-flex align-center width-475px">
          <span>资金总余额</span>
          <v-spacer />
          <v-btn text color="#4d9974" class="font-size-14" @click="GET_BALANCE_ALL_INFO()"> 刷新<span class="icon-cw"></span> </v-btn>
        </h4>
        <div class="d-flex gap-20">
          <div class="width-475px height-100px d-flex flex-column flex-stretch frame black--text px-10px">
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
                <span class="font-size-14">{{ balanceAllInfo[-2].name }}</span>
                <span class="money--text font-size-20 ml-10px line-height-10" :data-unit="config.unit">{{ balanceAllInfo[-2].balance | money }}</span>
              </div>
            </div>
          </div>
          <div class="frame width-145px font-size-14 px-5 d-flex align-center justify-space-between">
            <a class="grey--text d-flex flex-column align-center justify-center gap-5" @click="ROUTER_PUSH('/userCentre/deposit')">
              <img class="width-32px" src="./assets/deposit.png" />存款
            </a>
            <a class="grey--text d-flex flex-column align-center justify-center" @click="ROUTER_PUSH('/userCentre/withdrawals')">
              <img class="width-36px" src="./assets/withdraw.png" />提款
            </a>
          </div>
        </div>
      </div>
      <div class="white pa-5">
        <!--钱包明細-->
        <h4 class="mt-4 font-size-16 black--text font-weight-400 d-flex align-center">钱包明细</h4>

        <div class="mt-10px wallets d-flex justify-start flex-wrap">
          <div class="width-145px pa-5 frame wallet-frame" v-for="(info, i) in balanceAllInfo" :key="i">
            <span class="font-size-14 black--text">{{ info && info.name }}</span>
            <span class="font-size-20 money--text" :data-unit="config.unit">{{ info && info.balance | money }}</span>
          </div>
        </div>
        <hr class="opacity-3" />
        <div class="d-flex gap-20 mt-5 flex-wrap">
          <template v-for="(item, i) in balance">
            <div class="d-flex frame height-50px width-310px align-center justify-center" :key="`in_${i}`">
              <span class="font-size-14 black--text">{{ textFilter(`${item.lang}Deposit`).replace(/usdt/gi, item.code) }}</span>
              <span class="font-size-20 money--text line-height-10" :data-unit="item.code === 'CNY' ? config.unit : item.code">
                {{ item.in | money }}
              </span>
            </div>
            <div class="d-flex frame height-50px width-310px align-center justify-center" :key="`out_${i}`">
              <span class="font-size-14 black--text">{{ textFilter(`${item.lang}Withdrawal`).replace(/usdt/gi, item.code) }}</span>
              <span class="font-size-20 money--text line-height-10" :data-unit="item.code === 'CNY' ? config.unit : item.code">
                {{ item.out | money }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="width-240px">
      <BetRecords />
      <Promotions class="mt-5" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import BetRecords from './components/BetRecords';
import Promotions from './components/Promotions';
import Invite from './components/Invite';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Wallet',
  components: { BetRecords, Promotions, Invite },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'balanceTotal', 'balanceAllInfo', 'isBalanceLoading', 'locale', 'gameRecordList']),

    balance() {
      // console.log(this.balanceTotal);
      // {CNY: {In: 100.1, Out: 100.2}, MYR: {In: 100.23, Out: 500.5}, USDT: {In: 2000.22, Out: 333.3}}
      return _.map(this.balanceTotal, (detail, code) => {
        return {
          lang: code === 'CNY' ? 'total' : 'usdtTotal',
          code,
          ...detail,
        };
      });
      // const CNY = this.balanceTotal.CNY||{}
      // return [{lang: 'total', code: 'CNY', in: CNY.in, out: CNY.out}]
    },
    totalProfit() {
      return this.gameRecordList?.sum?.result;
    },
    fundsDescription() {
      try {
        return JSON.parse(this.config?.fundsDescription)[this.locale];
      } catch (e) {
        return null;
      }
    },
  },
  watch: {
    locale() {
      this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    },
  },
  created() {
    this.GET_BALANCE_TOTAL(); // 取得 我的錢包 總出入金
    this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    this.GET_GAMES_RECORD_LIST({ page: 1 }); // 取得 游戲纪录总盈亏
  },
  methods: {
    ...mapActions(['GET_BALANCE_TOTAL', 'GET_BALANCE_ALL_INFO', 'POST_BALANCE', 'GET_GAMES_RECORD_LIST', 'ROUTER_PUSH']),
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_wallet_');
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .money--text {
    color: #ffaa00 !important;
    display: inline-block;
    vertical-align: bottom;

    &:before {
      content: '$';
      font-size: #{(12/20)}em;
      margin-right: 5px;
    }
    &[data-unit] {
      &:before {
        content: attr(data-unit);
      }
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
}
</style>
