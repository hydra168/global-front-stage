<template>
  <v-container fluid class="Record">
    <!-- 改成下拉選單，故tab遮掉 -->
    <v-select
      v-model="select"
      :items="tabNav"
      :item-text="item => textFilter(item.title)"
      item-value="title"
      dense
      :disabled="moreBtn.isLoading"
    ></v-select>
    <v-tabs v-model="tab" centered class="record-tab-display-none">
      <v-tab
        v-for="(tab, k) in tabNav"
        :class="tab.class"
        :key="k"
        :href="`#tab-${k}`"
        :disabled="moreBtn.isLoading"
        @click="clickTabHandler(tab.code)"
      >
        {{ textFilter(tab.title) }}
      </v-tab>
      <v-tab-item v-for="(tab, k) in tabNav" :key="k" :value="'tab-' + k">
        <!-- 選擇日期 -->
        <v-row no-gutters align="center" class="ma-0 pa-0">
          <v-col>
            <v-text-field
              v-model="rangeDatesText"
              :label="textFilter('dateRange')"
              prepend-icon="event"
              readonly
              @click="dateModalShow = true"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- 存款類型與狀態 -->
        <v-row v-if="currentTab === 'deposit'" no-gutters align="center" class="ma-0 pa-0">
          <v-col class="mx-2">
            <v-select
              v-model="searchData.paymentsType"
              item-value="val"
              :items="paymentsTypeListArray"
              :label="$t('g_layout_userCentre_default_record_deposite_type')"
              v-on:change="
                listData = [];
                getListHandler(val, $event);
              "
              clearable
            >
              <template v-slot:selection="{ item }">{{ item.title }}</template>
              <template v-slot:item="{ item }">{{ item.title }}</template>
            </v-select>
          </v-col>
          <v-col class="mx-2">
            <v-select
              v-model="searchData.depositStatus"
              item-value="val"
              :items="depositStatusListArray"
              :label="$t('g_layout_userCentre_default_record_deposite_status')"
              v-on:change="
                listData = [];
                getListHandler(val, $event);
              "
              clearable
            >
              <template v-slot:selection="{ item }">{{ $t(item.title) }}</template>
              <template v-slot:item="{ item }">{{ $t(item.title) }}</template>
            </v-select>
          </v-col>
        </v-row>

        <!-- 彈窗日期選擇器 -->
        <v-dialog ref="dialog" v-if="dateModalShow" v-model="dateModalShow" persistent width="290px">
          <v-date-picker v-model="rangeDates" color="primary" range no-title locale="zh-CN">
            <v-spacer></v-spacer>
            <v-btn @click="dateModalShow = false" color="primary" small outlined>{{ $t('g_com_daterange_cancelBtn') }}</v-btn>
            <v-btn @click="rangeDatesHandler()" color="success" small depressed>{{ $t('g_com_daterange_confirmBtn') }}</v-btn>
          </v-date-picker>
        </v-dialog>

        <!-- 遊戲紀錄 -->
        <div v-if="currentTab === 'game'" class="total-wrap d-flex justify-space-around">
          <v-row dense>
            <v-col cols="4">
              <v-alert dense outlined border="left" colored-border color="primary">
                <div class="d-flex flex-column align-end">
                  <span class="mb-1">{{ textFilter(totalBet) }}</span>
                  <span :class="[gameSum['bet'] > 0 ? 'red--text' : gameSum['bet'] == 0 ? '' : 'green--text']">
                    {{ gameSum['bet'] | money }}
                  </span>
                </div>
              </v-alert>
            </v-col>
            <v-col cols="4">
              <v-alert dense outlined border="left" colored-border color="primary">
                <div class="d-flex flex-column align-end">
                  <span class="mb-1">{{ textFilter(totalPayout) }}</span>
                  <span :class="[gameSum['payout'] > 0 ? 'red--text' : gameSum['payout'] == 0 ? '' : 'green--text']">
                    {{ gameSum['payout'] | money }}
                  </span>
                </div>
              </v-alert>
            </v-col>
            <v-col cols="4">
              <v-alert dense outlined border="left" colored-border color="primary">
                <div class="d-flex flex-column align-end">
                  <span class="mb-1">{{ textFilter(winOrLose) }}</span>
                  <span :class="[gameSum['result'] > 0 ? 'red--text' : gameSum['result'] == 0 ? '' : 'green--text']">
                    {{ gameSum['result'] | money }}
                  </span>
                </div>
              </v-alert>
            </v-col>
          </v-row>
        </div>

        <!-- 綜合表單 -->
        <v-expansion-panels v-if="listData.length">
          <v-expansion-panel v-for="(item, i) in listData" :key="i">
            <!-- 標頭(遊戲) -->
            <v-expansion-panel-header v-if="currentTab === 'game'" class="d-flex justify-between px-1">
              <div class="record-header-flex" :aria-numbers="item.numbers" :aria-playValue="item.pv">
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(betting) }}：</div>
                  <div class="cell-value" :class="[item.bet_amount > 0 ? 'red--text' : item.bet_amount == 0 ? '' : 'green--text']">
                    {{ item.bet_amount | money }}
                  </div>
                </div>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(payout) }}：</div>
                  <div class="cell-value" :class="[item.payout_amount > 0 ? 'red--text' : item.payout_amount == 0 ? '' : 'green--text']">
                    {{ item.payout_amount | money }}
                  </div>
                </div>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(result) }}：</div>
                  <div class="cell-value" :class="[item.result_amount > 0 ? 'red--text' : item.result_amount == 0 ? '' : 'green--text']">
                    {{ item.result_amount | money }}
                  </div>
                </div>
              </div>
            </v-expansion-panel-header>
            <!-- 標頭(存款,取款) -->
            <v-expansion-panel-header v-if="currentTab === 'deposit' || currentTab === 'withdrawals'" class="d-flex justify-between pa-3">
              <div class="record-header-wrap">
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter('order') }}：</div>
                  <div class="cell-value">{{ item.Sn }}</div>
                </div>
                <div v-if="isDepositShowDepositName" class="header-cell">
                  <div class="cell-title">{{ textFilter('depositName') }}：</div>
                  <div class="cell-value">{{ item.depositName || '--' }}</div>
                </div>
                <template v-if="isDetailWithRate(item)">
                  <div class="header-cell">
                    <div class="cell-title">{{ textFilter('transferAmountLabel') }}({{ currencyCode(item.bank) }})：</div>
                    <div class="cell-value">{{ item.unit || item.UsdtAmount | money }}</div>
                  </div>
                  <div class="header-cell">
                    <div class="cell-title">{{ textFilter('exchangeRate') }}({{ config.unit }})：</div>
                    <div class="cell-value">{{ item.rate || item.ExchanGerate | money }}</div>
                  </div>
                </template>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter('amountLabel2') }}({{ config.unit }})：</div>
                  <div class="cell-value">{{ item.Amount | money }}</div>
                </div>
              </div>
            </v-expansion-panel-header>
            <!-- 標頭(餘額) -->
            <v-expansion-panel-header v-if="currentTab === 'balance'" class="d-flex justify-between pa-3">
              <p>{{ textFilter('time') }}：{{ item.Created | formatDate }}</p>
            </v-expansion-panel-header>

            <!-- 內容詳情(遊戲) -->
            <v-expansion-panel-content v-if="currentTab === 'game'" class="mobileGameRecordContent">
              <!-- <p>{{ textFilter('games') }} {{ item.game_name }}</p> -->
              <template v-if="item.sport">
                <h3 class="mb-3">{{ item.sport.GameType }}</h3>
                <h4 class="mb-3">{{ item.sport.Oddsname }} @ {{ item.sport.Odds }}&nbsp;&nbsp;{{ oddTypes[item.sport.Oddstype] }}</h4>
                <h4>盘口：</h4>
                <div class="pa-1">
                  <p>{{ item.sport.Bettype }}({{ item.sport.Eventpart }})</p>
                  <p>{{ item.sport.P1 }} vs. {{ item.sport.P2 }}</p>
                  <p>{{ item.sport.Event }}</p>
                  <p>{{ new Date(`${item.sport.Starttime.split(' ').join('T')}Z`) | formatDate }}</p>
                </div>
                <h4>是否滚球：</h4>
                <div class="pa-1">
                  <p>{{ $t(['否', '是'][item.sport.Islive ? 1 : 0]) }}</p>
                </div>
                <h4>結果：</h4>
                <div class="pa-1">
                  <p>{{ stats[item.sport.Status] }}</p>
                </div>
                <h4>投注时间：</h4>
                <div class="pa-1">
                  <p>{{ item.bet_time | formatDate }}</p>
                </div>
              </template>
              <template v-else>
                <div v-for="(v, k) in item.contentObj" :key="k">
                  <div v-if="v.label == 'BetTime' || v.label == 'EndTime'">
                    <span v-if="v.label == 'BetTime'">{{ $t(v.text) }}{{ !$t(v.text) ? '' : '：' }}{{ item.bet_time | formatDate }}</span>
                    <span v-if="v.label == 'EndTime'">{{ $t(v.text) }}{{ !$t(v.text) ? '' : '：' }}{{ item.settle_time | formatDate }}</span>
                  </div>
                  <div v-else-if="v.label == 'PlayValue'">
                    {{ $t(v.text) }}{{ !$t(v.text) ? '' : '：' }}
                    <span v-for="(numbers, i) in v.value" :key="i">
                      <template v-if="i > 0">, &nbsp;</template>
                      <v-chip class="mr-1" color="info" small size="20" v-for="(n, j) in numbers" :key="j">{{ n }}</v-chip>
                      <v-icon v-if="numbers.length == 0" size="x-small">remove</v-icon>
                    </span>
                  </div>
                  <div v-else-if="v.label == 'Numbers'">
                    {{ $t(v.text) }}{{ !$t(v.text) ? '' : '：' }}
                    <v-chip class="mr-1" color="info" small size="20" v-for="(n, i) in v.value" :key="i">{{ n }}</v-chip>
                  </div>
                  <div v-else>
                    <span class="labelleft"> {{ $t(v.text) }}{{ !$t(v.text) ? '' : '：' }}{{ $t(v.value) }} </span>
                  </div>
                </div>
              </template>
            </v-expansion-panel-content>
            <!-- 內容詳情(存款,取款) -->
            <v-expansion-panel-content v-if="currentTab === 'deposit' || currentTab === 'withdrawals'">
              <p>{{ textFilter('orderTime') }} {{ item.Created | formatDate }}</p>
              <p>{{ textFilter('updatedTime') }} {{ item.Updated | formatDate }}</p>
              <template v-if="currentTab === 'withdrawals'">
                <p>{{ textFilter('type') }} {{ $t(withdrawalsTypeList[item.Type].title) }}</p>
                <p>
                  {{ textFilter('actualAmount') }}
                  <span v-if="item.UsdtAmount">USDT{{ item.UsdtAmount | money }}</span>
                  <span v-if="item.UsdtAmount && item.Cny"> / </span>
                  <span v-if="item.Cny">{{ config.unit }}{{ item.Cny | money }} </span>
                </p>
              </template>

              <p v-if="item.Status == 2 && item.Note != ''">{{ textFilter('remarks') }} {{ item.Note }}</p>
              <div class="d-flex">
                <v-chip v-if="item.Status == 0" class="mt-3" small label :color="'orange'" text-color="white">
                  <v-icon small>remove_circle</v-icon>{{ textFilter(currentTab === 'deposit' ? `unpaid` : `toBeConfirmed`) }}
                </v-chip>
                <v-chip v-if="item.Status == 1" class="mt-3" small label :color="'green'" text-color="white">
                  <v-icon small>check_circle</v-icon>{{ textFilter(currentTab === 'deposit' ? `paid` : `confirmed`) }}
                </v-chip>
                <v-chip class="mt-3 flatRight" v-if="item.Status == 2" small label :color="'red'" text-color="white">
                  <v-icon small>remove_circle</v-icon>{{ textFilter('rejected') }}
                </v-chip>
              </div>
            </v-expansion-panel-content>
            <!-- 內容詳情(餘額) -->
            <v-expansion-panel-content v-if="currentTab === 'balance'">
              <p>{{ textFilter('type') }}：{{ $t(balanceStatusList[item.Type].title) }}</p>
              <p>
                {{ textFilter('amount') }}：<span>{{ config.unit }}{{ item.Amount | money }}</span>
              </p>
              <p>
                {{ textFilter('remarks') }}：<span>{{ item.Remark }}</span>
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- 加载更多 -->
        <v-btn
          block
          depressed
          color="primary"
          :disabled="moreBtn.disabled"
          :loading="moreBtn.isLoading || isLoading"
          class="mt-5"
          @click="getListHandler()"
        >
          {{ textFilter(moreBtn.text) }}
        </v-btn>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { withdrawalsTypeList } from '@ASSETS/userCentre/withdrawalsInfo';
import { depositStatusList } from '@ASSETS/userCentre/depositInfo';
import { balanceStatusList } from '@ASSETS/userCentre/balanceInfo';
import { textFilter } from '@UTILS/i18n';
import {
  MOBILE_RECORD_GAME_RECORD_TITLE,
  MOBILE_RECORD_GAME_RECORD_TITLE_TOTALBET,
  MOBILE_RECORD_GAME_RECORD_TITLE_TOTALPAYOUT,
  MOBILE_RECORD_GAME_RECORD_TITLE_WINORLOSE,
  MOBILE_RECORD_GAME_RECORD_TITLE_BETTING,
  MOBILE_RECORD_GAME_RECORD_TITLE_PAYOUT,
  MOBILE_RECORD_GAME_RECORD_TITLE_RESULT,
  MOBILE_RECORD_DEPOSIT_RECORD_TITLE,
  MOBILE_RECORD_WITHDRAWALS_RECORD_TITLE,
  MOBILE_RECORD_BALANCE_RECORD_TITLE,
} from '@G/consts';
import { cloneDeep, filter, map } from 'lodash';

const defaultSearchData = {
  paymentsType: null, // 存款類型
  depositStatus: null, // 存款狀態
};

export default {
  name: 'Record',
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      ///
      select: MOBILE_RECORD_GAME_RECORD_TITLE,
      tab: null,
      tabNav: [
        { class: 'tabGameRecord', code: 'game', title: MOBILE_RECORD_GAME_RECORD_TITLE },
        { class: 'tabBalanceRecord', code: 'balance', title: MOBILE_RECORD_BALANCE_RECORD_TITLE },
        { class: 'tabDepositRecord', code: 'deposit', title: MOBILE_RECORD_DEPOSIT_RECORD_TITLE },
        { class: 'tabWithdrawalsRecord', code: 'withdrawals', title: MOBILE_RECORD_WITHDRAWALS_RECORD_TITLE },
      ],
      currentTab: null,
      // 時間
      rangeDates: [],
      rangeDatesTemp: [],
      dateModalShow: false,
      //
      listData: [],
      pagination: {
        page: 0,
        num: 20,
        pageNums: 0, // 總共頁數
      },
      moreBtn: {
        text: 'more',
        disabled: false,
        isLoading: false,
      },
      gamePlatforms: {}, // 遊戲平台種類
      gameSum: {}, // 遊戲總攬
      withdrawalsTypeList, // 取款類型
      balanceStatusList, //餘額調整類型
      depositStatusList, // 存款狀態
      totalBet: MOBILE_RECORD_GAME_RECORD_TITLE_TOTALBET, //總投注
      totalPayout: MOBILE_RECORD_GAME_RECORD_TITLE_TOTALPAYOUT, //總派彩
      winOrLose: MOBILE_RECORD_GAME_RECORD_TITLE_WINORLOSE, //總輸贏
      betting: MOBILE_RECORD_GAME_RECORD_TITLE_BETTING, //投注
      payout: MOBILE_RECORD_GAME_RECORD_TITLE_PAYOUT, //派彩
      result: MOBILE_RECORD_GAME_RECORD_TITLE_RESULT, //結果
      oddTypes: ['', '欧洲盘', '香港盘', '馬来盘', '印尼盘', '分数式'],
      stats: ['', '进行中', '赢', '平局退款', '回滚退款', '提前结算', '输', '订单补正'],
    };
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'config',
      'paymentsTypeList',
      'paymentAccountList',
      'gameLogRecordList',
      'depositList',
      'withdrawalsList',
      'balanceHistoryList',
      'gameResultMap',
      'gameRecordSplitor',
    ]),
    rangeDatesText() {
      return this.rangeDates.join(` ${this.textFilter('to')} `);
    },
    paymentsTypeListArray() {
      let arr = [];
      for (const key in this.paymentsTypeList) {
        let obj = {};
        obj.title = this.paymentsTypeList[key];
        obj.val = key;
        arr.push(obj);
      }
      return arr;
    },
    depositStatusListArray() {
      let arr = [];
      for (const key in this.depositStatusList) {
        let obj = {};
        obj.title = this.depositStatusList[key].title;
        obj.val = key;
        arr.push(obj);
      }
      return arr;
    },
    isDepositShowDepositName() {
      return /^true$/i.test((Boolean(Number(this.config.depositName)) || 'false').toString());
    },
  },
  watch: {
    select(value) {
      const targetIndex = this.tabNav.findIndex(tab => tab.title === value);
      this.tab = `tab-${targetIndex}`;
      this.clickTabHandler(this.tabNav[targetIndex].code);
    },
    // 遊戲列表
    gameLogRecordList(obj) {
      this.moreBtn.isLoading = false;
      if (Object.keys(obj).length) {
        this.gamePlatforms = obj.platforms; // 遊戲平台種類
        this.gameSum = obj.sum; // 遊戲總攬
        // 處理列表
        obj.games = obj.games || [];
        this.listData = [...this.listData, ...obj.games];
        // 處理按鈕
        if (this.pagination.page >= obj.pageNums) this.moreBtnHandler(false);
        this.$forceUpdate();
      }
    },
    // 存款列表
    depositList(obj) {
      this.moreBtn.isLoading = false;
      if (Object.keys(obj).length) {
        // 處理列表
        obj.deposits = obj.deposits || [];
        obj.deposits.forEach(item => {
          item = this.getDepositDetail(item);
        });
        this.listData = [...this.listData, ...obj.deposits];
        // 處理按鈕
        if (this.pagination.page >= obj.pageNums) this.moreBtnHandler(false);

        this.$forceUpdate();
      }
    },
    // 取款列表
    withdrawalsList(obj) {
      this.moreBtn.isLoading = false;
      if (Object.keys(obj).length) {
        // 處理列表
        obj.withdrawals = obj.withdrawals || [];
        this.listData = [...this.listData, ...obj.withdrawals];
        // 處理按鈕
        if (this.pagination.page >= obj.pageNums) this.moreBtnHandler(false);
        this.$forceUpdate();
      }
    },
    // 餘額調整列表
    balanceHistoryList(obj) {
      this.moreBtn.isLoading = false;
      if (Object.keys(obj).length) {
        // 處理列表
        obj.logs = obj.logs || [];
        this.listData = [...this.listData, ...obj.logs];
        // 處理按鈕
        if (this.pagination.page >= obj.pageNums) this.moreBtnHandler(false);
        this.$forceUpdate();
      }
    },
  },
  async created() {
    await this.resetSearchData();
    await this.GET_PAYMENT_TYPE_LIST(); // 取得 付款類型列表
    await this.GET_PAYMENT_ACCOUNTS_LIST(); // 取得 支付列表
    await this.clickTabHandler(this.tabNav[0].code);
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions([
      'GET_PAYMENT_TYPE_LIST',
      'GET_PAYMENT_ACCOUNTS_LIST',
      'GET_GAMES_LOG_RECORD_LIST',
      'GET_DEPOSIT_LIST',
      'GET_WITHDRAWALS_LIST',
      'GET_BALANCE_HISTORY_LIST',
      'GET_DEPOSIT_DETAIL',
      'GET_RESULT_NUMBER_ARRAY',
    ]),
    ...mapMutations(['SET_FULL_WIDTH']),
    clickTabHandler(code) {
      // 頁數 資料data 按鈕 日期 回復預設
      // new Date().toISOString().substr(0, 10),
      // if (this.currentTab === code) return;
      this.rangeDates = [];
      this.pagination.page = 0;
      this.listData = [];
      this.moreBtnHandler(true);
      this.currentTab = code;
      this.getListHandler();
    },
    getListHandler() {
      this.moreBtn.isLoading = true;
      this.pagination.page++;
      let param = {
        page: this.pagination.page,
        num: this.pagination.num,
        pt: this.searchData.paymentsType,
        st: this.searchData.depositStatus,
      };
      if (this.rangeDates.length) {
        param['s'] = this.rangeDates[0];
        param['e'] = this.rangeDates[1];
        this.listData = [];
      }
      if (this.currentTab === 'game') this.GET_GAMES_LOG_RECORD_LIST(param); // 取得 遊戲列表
      if (this.currentTab === 'deposit') this.GET_DEPOSIT_LIST(param); // 取得 存款列表
      if (this.currentTab === 'withdrawals') this.GET_WITHDRAWALS_LIST(param); // 取得 取款列表
      if (this.currentTab === 'balance') this.GET_BALANCE_HISTORY_LIST(param); // 取得 取款列表
    },
    // 以日期搜尋
    rangeDatesHandler() {
      this.dateModalShow = false;
      this.pagination.page = 0;
      this.listData = [];
      this.getListHandler();
    },
    moreBtnHandler(hasMore) {
      if (hasMore) {
        this.moreBtn.text = 'more';
        this.moreBtn.disabled = false;
      } else {
        this.moreBtn.text = 'noMore';
        this.moreBtn.disabled = true;
      }
    },
    // allowedDates(val) {
    //   return parseInt(val.split('-')[2], 10) % 2 === 0;
    // },
    resetSearchData() {
      this.searchData = cloneDeep(defaultSearchData);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_record_');
    },
    // 取得 存款明細
    async getDepositDetail(item) {
      const res = await this.GET_DEPOSIT_DETAIL({ id: item.Id });
      if (!res.isError) {
        const idx = this.listData.findIndex(d => d.Sn === item.Sn);
        this.listData[idx] = {
          ...item,
          ...res.result,
        };
        this.$forceUpdate();
      }
    },
    currencyCode(bank) {
      const payment = this.paymentAccountList.find(item => item.bank == bank);
      return payment?.sysParams?.currencyCode || 'USDT';
    },
    isDetailWithRate(detail) {
      const rate = detail.ExchanGerate || detail.rate;
      return rate && rate != 1;
    },
  },
};
</script>
<style lang="scss">
.record-tab-display-none .v-slide-group {
  display: none;
}
.total-wrap {
  .total-cell {
    width: 33% !important;
    text-align: center;
    .total-value {
      word-break: break-all;
    }
  }
}
.record-header-wrap {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .header-cell {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 5px;
  }
}
.record-header-flex {
  display: flex;
  align-items: flex-center;
  justify-content: space-between;
  .header-cell {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
