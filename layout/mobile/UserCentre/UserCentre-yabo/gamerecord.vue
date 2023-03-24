<template>
  <v-container fluid class="gamerecord">
    <v-tabs v-model="selectedTab" color="#01AD4A">
      <v-tab
        v-for="tab in tabNav"
        :class="tab.class"
        :key="tab.key"
        :href="`#tab-${tab.id}`"
        :disabled="moreBtn.isLoading"
        @click="clickTabHandler(tab.code)"
      >
        {{ textFilter(tab.title) }}
      </v-tab>
      <v-tab-item v-for="tab in tabNav" :key="tab.key" :value="'tab-' + tab.id" class="pt-3">
        <!-- 選擇日期 -->
        <v-row no-gutters align="center" class="textBox">
          <v-col>
            <v-text-field v-model="rangeDatesText" label="时间" readonly @click="dateModalShow = true" clearable></v-text-field>
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
        <div v-if="listData.length">
          <div v-for="(item, i) in listData" :key="i">
            <!-- 標頭處理 -->
            <!-- <div v-if="currentTab === 'game'" class="d-flex justify-between pa-3">
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
            </div>
            <div v-if="currentTab === 'deposit' || currentTab === 'withdrawals'" class="d-flex justify-between pa-3">
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
            </div> -->

            <!-- 內容處理 -->
            <div v-if="currentTab === 'game'" class="contentBox">
              <!-- <p>{{ textFilter('games') }} {{ item.game_name }}</p> -->
              <!-- 標頭處理 -->
              <template v-if="item.detail_json && detailFmt(item)">
                <h3 class="mb-3">
                  {{ item.sport.GameType }}
                </h3>
                <h4 class="mb-3">{{ item.sport.Oddsname }} @ {{ item.sport.Odds }}&nbsp;&nbsp;{{ oddTypes[item.sport.Oddstype] }}</h4>

                <h4>盘口：</h4>
                <div class="pa-1">
                  <p>{{ item.sport.Bettype }}({{ item.sport.Eventpart }})</p>
                  <p>{{ item.sport.P1 }} vs. {{ item.sport.P2 }}</p>
                  <p>{{ item.sport.Event }}</p>
                  <p>{{ new Date(`${item.sport.Starttime.split(' ').join('T')}Z`) | formatDate }}</p>
                </div>
                <h4>是否滚球 :</h4>
                <div class="pa-1">
                  <p>{{ $t(['否', '是'][item.sport.Islive ? 1 : 0]) }}</p>
                </div>
                <!-- <h4>結果 :</h4>
                <div class="pa-1">
                  <p>{{ stats[item.sport.Status] }}</p>
                </div> -->
                <h4>投注时间 :</h4>
                <div class="pa-1">
                  <p>{{ item.bet_time | formatDate }}</p>
                </div>
              </template>
              <template v-else>
                <div v-for="(v, k) in detailFmt(item)" :key="k" class="totleHeader">
                  <div v-if="v.label == 'BetTime' || v.label == 'EndTime'">
                    <span v-if="v.label == 'BetTime'">{{ $t(gameTitleMap[v.label]) }}: {{ item.bet_time | formatDate }}</span>
                    <span v-if="v.label == 'EndTime'">{{ $t(gameTitleMap[v.label]) }}: {{ item.settle_time | formatDate }}</span>
                  </div>
                  <div v-else>
                    <span class="labelleft">{{ $t(gameTitleMap[v.label]) }}: {{ v.value }}</span>
                  </div>
                </div>
                <!-- 投注时间: {{item.bet_time | formatDate}} -->
              </template>
              <div v-if="currentTab === 'game'" class="totleInfo">
                <div>
                  <span>{{ textFilter(betting) }}</span>
                  <span>{{ item.bet_amount | money }}</span>
                </div>
                <div>
                  <span>{{ textFilter(payout) }}</span>
                  <span>{{ item.payout_amount | money }}</span>
                </div>
                <div>
                  <span>{{ textFilter(result) }}</span>
                  <span>{{ item.result_amount | money }}</span>
                </div>
              </div>
            </div>
            <div v-if="currentTab === 'deposit' || currentTab === 'withdrawals'" class="contentBox">
              <div v-if="currentTab === 'deposit' || currentTab === 'withdrawals'">
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
              </div>
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
              <div class="statusBox">
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
            </div>

            <!--餘額歷史-->
            <div v-if="currentTab === 'balance'" class="contentBox">
              <div v-if="currentTab === 'balance'" class="dateBox">
                <p>{{ textFilter('time') }} {{ item.Created | formatDate }}</p>
              </div>
              <p>{{ textFilter('type') }} {{ item.Type | balanceType }}</p>
              <p>
                {{ textFilter('amount') }} <span>{{ config.unit }}{{ item.Amount | money }} </span>
              </p>
              <p>
                {{ textFilter('remarks') }} <span>{{ item.Remark }} </span>
              </p>
            </div>
          </div>
        </div>
        <div class="flexBox">
          <div v-show="listData.length === 0" class="noinfo">
            <div class="noinfoIcon" />
            <p>暂无记录</p>
            <v-btn v-if="currentTab === 'withdrawals'" dark color="#07AF4C" :loading="moreBtn.isLoading || isLoading" @click="goWithdrawals()">
              立即取款
            </v-btn>
            <v-btn v-else dark color="#07AF4C" :loading="moreBtn.isLoading || isLoading" @click="goDeposit()"> 立即存款 </v-btn>
          </div>
          <v-btn
            v-show="listData.length"
            block
            dark
            depressed
            color="#07AF4C"
            :disabled="moreBtn.disabled"
            :loading="moreBtn.isLoading || isLoading"
            class="mt-5"
            @click="getListHandler()"
          >
            {{ textFilter(moreBtn.text) }}
          </v-btn>
        </div>
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
  name: 'gameRcord',
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      ///
      //   tab: null,
      selectedTab: null,
      tabNav: [
        { id: 0, key: 'game', class: 'tabGameRecord', code: 'game', title: 'betting_record' },
        { id: 1, key: 'balance', class: 'tabBalanceRecord', code: 'balance', title: 'balance' },
        { id: 2, key: 'deposit', class: 'tabDepositRecord', code: 'deposit', title: 'deposit' },
        { id: 3, key: 'withdrawals', class: 'tabWithdrawalsRecord', code: 'withdrawals', title: 'withdrawals' },
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
    selectOptions() {
      return this.groupsData.map(g => ({ label: g.code, value: g.title }));
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
    this.selectedTab = 'deposit';
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
    goDeposit() {
      this.$router.push({ name: 'deposit' });
    },
    goWithdrawals() {
      this.$router.push({ name: 'withdrawals' });
    },
    test(item) {
      console.log(item);
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
    detailFmt(item) {
      //   console.log(str);
      if (!item.contents) return {};
      let contents = JSON.parse(item.contents);
      let ret = [],
        ret2 = [];
      let sport = item.detail_json ? JSON.parse(item.detail_json) : null;
      if (sport) {
        const { GameName, Rule } = contents;
        return (item.sport = {
          ...sport[0],
          GameName,
          Rule,
        });
      }
      for (let i in contents) {
        if (this.gameHideItem.indexOf(i) < 0 && this.gameTitleMap[i] && (i + contents[i]).length < 20) {
          let value = contents[i];
          if (i === 'Cmd' && value === '定位胆') {
            value = GAMESRECORD_CHANGE_TEXT_DINGWEIDAN;
          }
          ret.push({
            label: i,
            // value: contents[i],
            value,
          });
        } else if (this.gameHideItem.indexOf(i) < 0 && this.gameTitleMap[i]) {
          ret2.push({
            label: i,
            value: contents[i],
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
        12: '取款退回',
      };
      return typeMap[val];
    },
  },
};
</script>
<style lang="scss">
.gamerecord {
  padding-top: 10px;
  padding-bottom: 80px;
  margin-top: 70px;
  //   background: rgb(246, 246, 246);
  .header-cell {
    font-weight: 600;
  }
  .textBox {
    padding: 0 7px;
  }
  .v-slide-group__prev.v-slide-group__prev--disabled {
    display: none !important;
  }
  .contentBox {
    box-shadow: 0px 1px 6px rgb(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 4px;
    margin: 10px 4px;
    font-size: 12px;
    position: relative;
    .dateBox {
      margin-bottom: 6px;
      margin-top: 5px;
      color: rgb(1, 173, 74);
      p {
        margin-bottom: 0px;
        font-weight: 600;
      }
    }
    .statusBox {
      position: absolute;
      right: 10px;
      top: 0px;
    }
    p {
      margin-bottom: 3px;
    }
  }
  .totleHeader {
    padding-bottom: 7px;
  }
  .totleInfo {
    border-top: 1px solid #dcdcdd;
    padding-top: 7px;
    color: rgb(1, 173, 74);
    font-size: 13px;
    font-weight: 600;
  }
  .flexBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 33px auto 100px;
    .noinfo {
      margin: 30px auto 10px;
      .noinfoIcon {
        width: 100px;
        height: 100px;
        background: url('./assets/img/noinfo.png') no-repeat center center/contain;
      }
      p {
        margin: 10px auto;
        text-align: center;
      }
    }
  }
}
.total-wrap {
  background: rgb(1, 173, 74);
  color: #fff;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
  margin: 0 3px 3px 3px;
  padding: 10px 3px;
  border-radius: 7px;
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
