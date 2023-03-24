<template>
  <!-- 我的錢包 -->
  <div class="Wallet">
    <v-divider></v-divider>
    <v-progress-linear v-if="isBalanceLoading" indeterminate></v-progress-linear>

    <!-- 資產總餘額 -->
    <div>
      <div class="d-flex justify-space-between my-5">
        <h1>
          <p v-if="fundsDescription">{{ fundsDescription }}</p>
          <div class="d-flex align-center">
            <span>{{ textFilter('totalBalance') }}</span>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="help-outline ml-2" color="error" dark v-bind="attrs" v-on="on">help_outline</v-icon>
              </template>
              <span>{{ textFilter('totalBalanceText') }}</span>
            </v-tooltip>
          </div>
        </h1>
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-3" color="primary" depressed :disabled="isBalanceLoading" v-bind="attrs" v-on="on" @click="GET_BALANCE_ALL_INFO()">
                <v-icon>loop</v-icon>{{ textFilter('refreshBtn') }}
              </v-btn>
            </template>
            <span>{{ textFilter('refreshBalance') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" depressed :disabled="isLoading || isBalanceLoading" v-bind="attrs" v-on="on" @click="POST_BALANCE()">
                <v-icon>undo</v-icon> {{ textFilter('backBtn') }}
              </v-btn>
            </template>
            <span>{{ textFilter('transferBack') }}</span>
          </v-tooltip>
        </div>
      </div>
      <div>
        <template v-for="(item, k) in balanceAllInfo">
          <h5 :key="k" class="title mb-3">
            {{ item.name }} ： <i class="title">{{ config.unit }} {{ item.balance | money }}</i>
          </h5>
        </template>
        <h5 v-if="config.walletProfit && totalProfit != null" class="title mb-3">
          {{ textFilter('totalProfit') }} ：
          <i class="title" :class="[totalProfit > 0 ? 'red--text' : totalProfit == 0 ? '' : 'green--text']"> {{ config.unit }}{{ totalProfit }} </i>
        </h5>
      </div>
      <div class="mb-5">
        <v-btn color="primary" outlined small class="mr-3 depositBtn" @click="$router.push({ name: 'deposit' })">
          <v-icon small>input</v-icon> {{ depositBtn }}
        </v-btn>
        <v-btn color="primary" outlined small class="withdrawalsBtn" @click="$router.push({ name: 'withdrawals' })">
          <v-icon small>money</v-icon> {{ withdrawalsBtn }}
        </v-btn>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- 總出入金 & USDT總出入金 -->
    <div class="mt-5 walletTotalMoney">
      <div v-for="(item, i) in balance" :key="i" class="mb-3">
        <h5 class="title">
          {{ textFilter(item.langDeposit).replace(/usdt/gi, item.code) }}
          <i class="title ml-3">
            <template v-if="item.code === 'CNY'">{{ config.unit }} </template> {{ item.in | money }}
          </i>
        </h5>
        <h5 class="title">
          {{ textFilter(item.langWithdrawal).replace(/usdt/gi, item.code) }}
          <i class="title ml-3">
            <template v-if="item.code === 'CNY'">{{ config.unit }} </template> {{ item.out | money }}
          </i>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import {
  PC_WALLET_DEPOSITBTN,
  PC_WALLET_WITHDRAWALBTN,
  PC_WALLET_DEPOSIT_TITLE,
  PC_WALLET_WITHDRAWAL_TITLE,
  PC_WALLET_USDT_DEPOSIT_TITLE,
  PC_WALLET_USDT_WITHDRAWAL_TITLE,
} from '@G/consts';
export default {
  name: 'Wallet',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'balanceTotal', 'balanceAllInfo', 'isBalanceLoading', 'locale', 'gameRecordList']),
    balance() {
      // {CNY: {In: 100.1, Out: 100.2}, MYR: {In: 100.23, Out: 500.5}, USDT: {In: 2000.22, Out: 333.3}}
      return _.map(this.balanceTotal, (detail, code) => {
        return {
          langDeposit: code === 'CNY' ? PC_WALLET_DEPOSIT_TITLE : PC_WALLET_USDT_DEPOSIT_TITLE,
          langWithdrawal: code === 'CNY' ? PC_WALLET_WITHDRAWAL_TITLE : PC_WALLET_USDT_WITHDRAWAL_TITLE,
          code,
          ...detail,
        };
      });
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
    depositBtn() {
      return this.$t(PC_WALLET_DEPOSITBTN);
    },
    withdrawalsBtn() {
      return this.$t(PC_WALLET_WITHDRAWALBTN);
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
    ...mapActions(['GET_BALANCE_TOTAL', 'GET_BALANCE_ALL_INFO', 'POST_BALANCE', 'GET_GAMES_RECORD_LIST']),
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_wallet_');
    },
  },
};
</script>
