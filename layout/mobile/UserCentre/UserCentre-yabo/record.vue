<template>
  <v-container fluid class="Record">
    <v-tabs v-model="tab" centered>
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
      <v-tab-item v-for="(tab, k) in tabNav" :key="k" :value="'tab-' + k" class="pt-3">
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
          <!-- <v-col cols="1" class="d-flex justify-end">
            <v-btn tile icon @click="clickTabHandler(currentTab)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-col> -->
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
            <v-btn color="primary" outlined @click="dateModalShow = false">{{ $t('g_com_daterange_cancelBtn') }}</v-btn>
            <v-btn color="primary" depressed @click="rangeDatesHandler()">{{ $t('g_com_daterange_confirmBtn') }}</v-btn>
          </v-date-picker>
        </v-dialog>

        <!-- 遊戲列表總攬 -->
        <div v-if="currentTab === 'game'" class="total-wrap d-flex justify-space-around">
          <div class="total-cell">
            <h5 class="total-title">{{ textFilter(totalBet) }}({{ config.unit }})：</h5>
            <div class="total-value">{{ gameSum['bet'] | money }}</div>
          </div>
          <div class="total-cell">
            <h5 class="total-title">{{ textFilter(totalPayout) }}({{ config.unit }})：</h5>
            <div class="total-value">{{ gameSum['payout'] | money }}</div>
          </div>
          <div class="total-cell">
            <h5 class="total-title">{{ textFilter(winOrLose) }}({{ config.unit }}):</h5>
            <div class="total-value">{{ gameSum['result'] | money }}</div>
          </div>
        </div>

        <!-- 表單 -->
        <v-expansion-panels v-if="listData.length">
          <v-expansion-panel v-for="(item, i) in listData" :key="i">
            <!-- 標頭處理 -->
            <v-expansion-panel-header v-if="currentTab === 'game'" class="d-flex justify-between pa-3">
              <div class="record-header-wrap">
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(betting) }}</div>
                  <div class="cell-value">{{ item.bet_amount | money }}</div>
                </div>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(payout) }}</div>
                  <div class="cell-value">{{ item.payout_amount | money }}</div>
                </div>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter(result) }}</div>
                  <div class="cell-value">{{ item.result_amount | money }}</div>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-header v-if="currentTab === 'deposit' || currentTab === 'withdrawals'" class="d-flex justify-between pa-3">
              <div class="record-header-wrap">
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter('order') }}:</div>
                  <div class="cell-value">{{ item.Sn }}</div>
                </div>
                <div v-if="isDepositShowDepositName" class="header-cell">
                  <div class="cell-title">{{ textFilter('depositName') }}</div>
                  <div class="cell-value">{{ item.depositName || '--' }}</div>
                </div>
                <template v-if="isDetailWithRate(item)">
                  <div class="header-cell">
                    <div class="cell-title">{{ textFilter('transferAmountLabel') }}({{ currencyCode(item.bank) }}):</div>
                    <div class="cell-value">{{ item.unit || item.UsdtAmount | money }}</div>
                  </div>
                  <div class="header-cell">
                    <div class="cell-title">{{ textFilter('exchangeRate') }}({{ config.unit }}):</div>
                    <div class="cell-value">{{ item.rate || item.ExchanGerate | money }}</div>
                  </div>
                </template>
                <div class="header-cell">
                  <div class="cell-title">{{ textFilter('amountLabel2') }}({{ config.unit }}):</div>
                  <div class="cell-value">{{ item.Amount | money }}</div>
                </div>
              </div>
            </v-expansion-panel-header>

            <!-- 內容處理 -->
            <v-expansion-panel-content v-if="currentTab === 'game'">
              <!-- <p>{{ textFilter('games') }} {{ item.game_name }}</p> -->
              <div v-for="(v, k) in detailFmt(item.contents)" :key="k">
                <div v-if="v.label == 'BetTime' || v.label == 'EndTime'">
                  <span v-if="v.label == 'BetTime'">{{ $t(gameTitleMap[v.label]) }}: {{ item.bet_time | formatDate }}</span>
                  <span v-if="v.label == 'EndTime'">{{ $t(gameTitleMap[v.label]) }}: {{ item.settle_time | formatDate }}</span>
                </div>
                <div v-else>
                  <span class="labelleft">{{ $t(gameTitleMap[v.label]) }}: {{ v.value }}</span>
                </div>
              </div>
            </v-expansion-panel-content>
            <v-expansion-panel-content v-if="currentTab === 'deposit' || currentTab === 'withdrawals'">
              <p>{{ textFilter('orderTime') }} {{ item.Created | formatDate }}</p>
              <p>{{ textFilter('updatedTime') }} {{ item.Updated | formatDate }}</p>
              <template v-if="currentTab === 'withdrawals'">
                <p>
                  {{ textFilter('type') }}
                  {{ withdrawalsTypeList[item.Type] && withdrawalsTypeList[item.Type].title ? $t(withdrawalsTypeList[item.Type].title) : '--' }}
                </p>
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

            <!--餘額歷史-->
            <v-expansion-panel-header v-if="currentTab === 'balance'" class="d-flex justify-between pa-3">
              <p>{{ textFilter('time') }} {{ item.Created | formatDate }}</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="currentTab === 'balance'">
              <p>{{ textFilter('type') }} {{ item.Type | balanceType }}</p>
              <p>
                {{ textFilter('amount') }} <span>{{ config.unit }}{{ item.Amount | money }} </span>
              </p>
              <p>
                {{ textFilter('remarks') }} <span>{{ item.Remark }} </span>
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
import { gameTitleMap } from '@ASSETS/userCentre/gameInfo';
import { textFilter } from '@UTILS/i18n';
import {
  MOBILE_RECORD_GAME_RECORD_TITLE,
  MOBILE_RECORD_GAME_RECORD_TITLE_TOTALBET,
  MOBILE_RECORD_GAME_RECORD_TITLE_TOTALPAYOUT,
  MOBILE_RECORD_GAME_RECORD_TITLE_WINORLOSE,
  MOBILE_RECORD_GAME_RECORD_TITLE_BETTING,
  MOBILE_RECORD_GAME_RECORD_TITLE_PAYOUT,
  MOBILE_RECORD_GAME_RECORD_TITLE_RESULT,
  GAMESRECORD_CHANGE_TEXT_DINGWEIDAN,
} from '@G/consts';
import lodash from 'lodash';

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
      tab: null,
      tabNav: [
        { class: 'tabGameRecord', code: 'game', title: MOBILE_RECORD_GAME_RECORD_TITLE },
        { class: 'tabBalanceRecord', code: 'balance', title: 'balance' },
        { class: 'tabDepositRecord', code: 'deposit', title: 'deposit' },
        { class: 'tabWithdrawalsRecord', code: 'withdrawals', title: 'withdrawals' },
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
      gameHideItem: [
        'CellScore',
        'BetAmount',
        'PayoutAmount',
        'LineCode',
        'ChannelID',
        'MRate',
        'Odds',
        'OrderNo',
        'SRate',
        'DataType',
        'Type',
        'ID',
        'Jackpotcomm',
      ],
      gameTitleMap,
      withdrawalsTypeList, // 取款類型
      balanceStatusList, //餘額調整類型
      depositStatusList, // 存款狀態
      totalBet: MOBILE_RECORD_GAME_RECORD_TITLE_TOTALBET, //總投注
      totalPayout: MOBILE_RECORD_GAME_RECORD_TITLE_TOTALPAYOUT, //總派彩
      winOrLose: MOBILE_RECORD_GAME_RECORD_TITLE_WINORLOSE, //總輸贏
      betting: MOBILE_RECORD_GAME_RECORD_TITLE_BETTING, //投注
      payout: MOBILE_RECORD_GAME_RECORD_TITLE_PAYOUT, //派彩
      result: MOBILE_RECORD_GAME_RECORD_TITLE_RESULT, //結果
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
    // 遊戲列表內容 format
    detailFmt(str) {
      if (!str) return {};
      let obj = JSON.parse(str);
      let ret = [],
        ret2 = [];
      for (let i in obj) {
        if (this.gameHideItem.indexOf(i) < 0 && this.gameTitleMap[i] && (i + obj[i]).length < 20) {
          let value = obj[i];
          if (i === 'Cmd' && value === '定位胆') {
            value = GAMESRECORD_CHANGE_TEXT_DINGWEIDAN;
          }
          ret.push({
            label: i,
            // value: obj[i],
            value,
          });
        } else if (this.gameHideItem.indexOf(i) < 0 && this.gameTitleMap[i]) {
          ret2.push({
            label: i,
            value: obj[i],
          });
        }
      }
      ret = ret.concat(ret2);
      return ret;
    },
    resetSearchData() {
      this.searchData = lodash.cloneDeep(defaultSearchData);
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
  filters: {
    balanceType(val) {
      const typeMap = {
        1: '入金',
        2: '出金',
        3: '退款',
        4: '转入游戏钱包或转回主钱包',
        5: '系统加值',
        6: '系統扣除',
        8: '活动金',
        9: '每日返水',
        10: 'USDT取款',
        11: '银行卡取款',
      };
      return typeMap[val];
    },
  },
};
</script>
<style lang="scss">
.Record {
  padding-top: 100px;
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
</style>
