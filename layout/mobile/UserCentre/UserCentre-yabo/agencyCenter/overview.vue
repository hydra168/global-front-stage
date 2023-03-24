<template>
  <!-- 總覽 -->
  <div class="Overview">
    <v-tabs class="mt-5">
      <v-tab @click="changeShowInfo">
        {{ textFilter('tabTitle') }}
        <v-icon>{{ isShowInfo ? 'expand_less' : 'expand_more' }}</v-icon>
      </v-tab>
      <!-- 今日團隊資訊 -->
      <v-tabs-items v-if="isShowInfo">
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('activeLabel')" :suffix="textFilter('people')" v-model="info.active_count" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('bettingLabel')" :suffix="textFilter('people')" v-model="info.bet_count" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('registeredLabel')" :suffix="textFilter('people')" v-model="info.register_count" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('onlineLabel')" :suffix="textFilter('people')" v-model="info.online_count" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('firstChargeLabel')" :suffix="textFilter('people')" v-model="info.first_deposit_count" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('numberOfTopUpsLabel')" :suffix="textFilter('people')" v-model="info.deposit_count" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('rechargeLable')" :suffix="textFilter('yuan')" v-model="info.deposit_amount" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('withdrawalAmountLabel')" :suffix="textFilter('yuan')" v-model="info.withdrawal_amount" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('betAmountLabel')" :suffix="textFilter('yuan')" v-model="info.bet_amount" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('totalProfitAndLossLabel')" :suffix="textFilter('yuan')" v-model="info.result_amount" disabled>
            </v-text-field>
          </v-col>
        </v-row>
      </v-tabs-items>
    </v-tabs>

    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col>
        <!-- 時間選擇器 -->
        <v-dialog ref="dialog" v-if="isShowDateModal" v-model="isShowDateModal" persistent width="290px">
          <v-date-picker v-model="dateInfo" color="primary" range no-title>
            <v-btn text color="primary" depressed @click="dateModalFun(false)">Cancel</v-btn>
            <v-btn text color="primary" depressed @click="dateModalFun(true)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-text-field
          v-model="rangeDatesText"
          :label="textFilter('dateLabel')"
          prepend-icon="event"
          readonly
          @click="isShowDateModal = true"
        ></v-text-field>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
        <v-btn tile icon @click="clearFun">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" block depressed :loading="isLoading" :disabled="isLoading" @click="search">{{ textFilter('searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <v-row v-for="item in tableData" :key="item.id">
      <v-col>
        <div class="infoList">
          <div class="title">{{ item.calc_date | formatD }}</div>
          <div class="content">
            <div class="row">
              <div>{{ textFilter('directRegistration') }}</div>
              <div>{{ item.new_sub_agent_count }}</div>
              <div>{{ textFilter('teamRegistration') }}</div>
              <div>{{ item.new_team_agent_count }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('activeNumber') }}</div>
              <div>{{ item.active_count }}</div>
              <div>{{ textFilter('numberOfFirstCharge') }}</div>
              <div>{{ item.first_deposit_count }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('numberOfRecharges') }}</div>
              <div>{{ item.deposit_count }}</div>
              <div>{{ textFilter('rechargeTimes') }}</div>
              <div>{{ item.deposit_times }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('recharge') }}</div>
              <div>{{ item.total_team_deposit_amount }}</div>
              <div>{{ textFilter('numberOfFirstVoters') }}</div>
              <div>{{ item.first_bet_count }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('numberOfFirstBets') }}</div>
              <div>{{ item.bet_count }}</div>
              <div>{{ textFilter('numberOfBets') }}</div>
              <div>{{ item.bet_times }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('betAmount') }}</div>
              <div>{{ item.total_team_valid_bet }}</div>
              <div>{{ textFilter('payoutAmount') }}</div>
              <div>{{ item.total_team_valid_payout }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('numberPeopleOfWithdrawals') }}</div>
              <div>{{ item.withdrawal_count }}</div>
              <div>{{ textFilter('numberOfWithdrawals') }}</div>
              <div>{{ item.withdrawal_times }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('withdrawalAmount') }}</div>
              <div>{{ item.total_team_withdrawal_amount }}</div>
              <div>{{ textFilter('totalProfitAndLoss') }}</div>
              <div>{{ item.total_team_profit_and_loss }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('rebateIncome') }}</div>
              <div>{{ item.rebate }}</div>
              <div>{{ textFilter('commissionIncome') }}</div>
              <div>{{ item.commission }}</div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn class="mt-5" color="primary" block depressed :loading="isLoading" :disabled="moreBtnStatus" @click="changePage">
          {{ textFilter(moreBtnStatus ? 'noMore' : 'loadMore') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Overview',
  data() {
    return {
      isShowInfo: true,
      isShowDateModal: false,
      dateInfo: [],
      data: {
        date: [],
        page: 1,
        num: 10,
      },
      searchData: {},
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencySummary', 'agencyDaily']),
    info() {
      return this.agencySummary;
    },
    rangeDatesText() {
      return this.dateInfo.join(this.textFilter('to'));
    },
    totalPage() {
      const { total } = this.agencyDaily;
      const { num } = this.searchData;
      let info = 0;
      total && (info = Math.ceil(total / num));
      return info;
    },
    moreBtnStatus() {
      return this.totalPage ? this.totalPage <= this.searchData.page : true;
    },
  },
  watch: {
    'agencyDaily.list'(v) {
      v && (this.tableData = this.tableData.concat(v));
    },
  },
  created() {
    this.SET_AGENCY_SUMMARY({});
    this.SET_AGENCY_DAILY({});
    this.GET_AGENCY_SUMMARY();
    this.search();
  },
  methods: {
    ...mapActions(['GET_AGENCY_SUMMARY', 'GET_AGENCY_DAILY', 'GET_AGENCY_DAILY_EXCEL']),
    ...mapMutations(['SET_AGENCY_SUMMARY', 'SET_AGENCY_DAILY']),
    changeShowInfo() {
      this.isShowInfo = !this.isShowInfo;
    },
    search() {
      this.tableData = [];
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi() {
      const { date, page, num } = this.searchData;
      let input = { page, num };
      date.length && (input.start = date[0]);
      date.length && (input.end = date[1]);
      this.GET_AGENCY_DAILY(input);
    },
    changePage() {
      this.searchData.page++;
      this.callListApi();
    },
    dateModalFun(status) {
      status && (this.data.date = deepCopy(this.dateInfo));
      status || (this.dateInfo = deepCopy(this.data.date));
      this.isShowDateModal = false;
    },
    clearFun() {
      this.data.date = [];
      this.dateInfo = [];
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_overview_');
    },
  },
};
</script>

<style lang="scss" scoped>
.Overview {
  .infoList {
    .title {
      color: #fff;
      background: map-get(map-get($colors, primary), base);
      display: inline-block;
      padding: 5px 20px;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 10px 20px;
      border: solid 1px map-get(map-get($colors, primary), base);
      border-radius: 0 5px 5px 5px;
      .row {
        // padding-bottom: 10px;
        border-top-color: #bdbdbd;
        border-top-width: 1px;
        border-top-style: solid;
        &:nth-child(1) {
          border-top-width: 0px;
        }
        &:nth-last-child(1) {
          padding-bottom: 0;
        }
        & > div {
          width: 25%;
          word-break: break-all;
          &:nth-child(odd) {
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
          }
          &:nth-child(even) {
            padding-left: 5px;
          }
        }
      }
    }
  }
}
</style>
