<template>
  <!-- 總覽 -->
  <div class="Overview">
    <v-divider></v-divider>
    <v-tabs class="mt-5">
      <v-tab>{{ textFilter('tabTitle') }}</v-tab>
      <!-- 今日團隊資訊 -->
      <v-tabs-items>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('activeLabel')" :suffix="textFilter('people')" v-model="info.active_count" disabled> </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('bettingLabel')" :suffix="textFilter('people')" v-model="info.bet_count" disabled> </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('registeredLabel')" :suffix="textFilter('people')" v-model="info.register_count" disabled>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('onlineLabel')" :suffix="textFilter('people')" v-model="info.online_count" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('firstChargeLabel')" :suffix="textFilter('people')" v-model="info.first_deposit_count" disabled>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('numberOfTopUpsLabel')" :suffix="textFilter('people')" v-model="info.deposit_count" disabled>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('rechargeLable')" :suffix="textFilter('yuan')" v-model="info.deposit_amount" disabled> </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('withdrawalAmountLabel')" :suffix="textFilter('yuan')" v-model="info.withdrawal_amount" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('betAmountLabel')" :suffix="textFilter('yuan')" v-model="info.bet_amount" disabled> </v-text-field>
          </v-col>
          <v-col>
            <v-text-field :label="textFilter('totalProfitAndLossLabel')" :suffix="textFilter('yuan')" v-model="info.result_amount" disabled>
            </v-text-field>
          </v-col>
        </v-row>
      </v-tabs-items>
    </v-tabs>

    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col cols="6">
        <Daterange
          v-model="data.date"
          display-format="YYYY-MM-DD"
          no-title
          :input-props="dateRange.inputProps"
          :menu-props="dateRange.menuProps"
          :presets="dateRange.presets"
          startLabel="startTime"
          endLabel="endTime"
          presetLabel="shortcutOptions"
          separatorLabel="to"
          locale="zh-cn"
        />
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" :disabled="isLoading" @click="search" depressed>{{ textFilter('searchBtn') }}</v-btn>
      </v-col>
      <v-col cols="5" class="text-right">
        <ColumnSelector :list="headers" class="mr-1" @change="changeItems" />
        <v-btn color="primary" :disabled="isLoading" @click="excel" depressed>{{ textFilter('excelExportBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <v-row>
      <v-col>
        <v-data-table
          :headers="tableHeaders"
          :items="tableData"
          :loading="isLoading"
          :hide-default-header="true"
          class="elevation-1 mb-3"
          :no-data-text="textFilter('noData')"
          hide-default-footer
        >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.text">
                  {{ textFilter(item.text) }}
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:[`item.calc_date`]="{ item }">
            {{ item.calc_date | formatDate }}
          </template>
        </v-data-table>
        <v-pagination
          v-if="pagination.length"
          v-model="pagination.page"
          :length="pagination.length"
          :total-visible="10"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import ColumnSelector from './ColumnSelector';
import { deepCopy } from '@UTILS';
import { eportFile } from '@UTILS/export-file';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Overview',
  components: { Daterange, ColumnSelector },
  data() {
    return {
      dateRange,
      data: {
        date: {},
        page: 1,
        num: 10,
      },
      searchData: {},
      headers: [
        {
          text: 'date',
          sortable: true,
          value: 'calc_date',
          isShow: true,
        },
        {
          text: 'directRegistration',
          sortable: true,
          value: 'new_sub_agent_count',
          isShow: true,
        },
        {
          text: 'teamRegistration',
          sortable: true,
          value: 'new_team_agent_count',
          isShow: true,
        },
        {
          text: 'activeNumber',
          sortable: true,
          value: 'active_count',
          isShow: true,
        },
        {
          text: 'numberOfFirstCharge',
          sortable: true,
          value: 'first_deposit_count',
          isShow: true,
        },
        {
          text: 'numberOfRecharges',
          sortable: true,
          value: 'deposit_count',
          isShow: true,
        },
        {
          text: 'rechargeTimes',
          sortable: true,
          value: 'deposit_times',
          isShow: true,
        },
        {
          text: 'recharge',
          sortable: true,
          value: 'total_team_deposit_amount',
          isShow: true,
        },
        {
          text: 'numberOfFirstVoters',
          sortable: true,
          value: 'first_bet_count',
          isShow: true,
        },
        {
          text: 'numberOfFirstBets',
          sortable: true,
          value: 'bet_count',
          isShow: true,
        },
        {
          text: 'numberOfBets',
          sortable: true,
          value: 'bet_times',
          isShow: true,
        },
        {
          text: 'betAmount',
          sortable: true,
          value: 'total_team_valid_bet',
          isShow: true,
        },
        {
          text: 'payoutAmount',
          sortable: true,
          value: 'total_team_valid_payout',
          isShow: true,
        },
        {
          text: 'numberPeopleOfWithdrawals',
          sortable: true,
          value: 'withdrawal_count',
          isShow: true,
        },
        {
          text: 'numberOfWithdrawals',
          sortable: true,
          value: 'withdrawal_times',
          isShow: true,
        },
        {
          text: 'withdrawalAmount',
          sortable: true,
          value: 'total_team_withdrawal_amount',
          isShow: true,
        },
        {
          text: 'totalProfitAndLoss',
          sortable: true,
          value: 'total_team_profit_and_loss',
          isShow: true,
        },
        {
          text: 'rebateIncome',
          sortable: true,
          value: 'rebate',
          isShow: true,
        },
        {
          text: 'commissionIncome',
          sortable: true,
          value: 'commission',
          isShow: true,
        },
      ],
      tableHeaders: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencySummary', 'agencyDaily', 'agencyExcel']),
    info() {
      return this.agencySummary;
    },
    tableData() {
      return this.agencyDaily.list || [];
    },
    pagination() {
      const { total } = this.agencyDaily;
      const { page, num } = this.searchData;
      let info = { total: 0, page };
      if (total) {
        info.total = total;
        info.length = Math.ceil(total / num);
      }
      return info;
    },
  },
  watch: {
    agencyExcel(v) {
      let header = [];
      let kay = [];
      let info = [];
      this.tableHeaders.forEach(i => {
        header.push(i.text);
        kay.push(i.value);
      });
      v.forEach(i => {
        let array = [];
        kay.forEach(j => {
          array.push(i[j]);
        });
        info.push(array);
      });
      eportFile(header, info, this.textFilter('excelFileName'), 'xlsx');
    },
  },
  created() {
    this.SET_AGENCY_SUMMARY({});
    this.SET_AGENCY_DAILY({});
    this.tableHeaders = deepCopy(this.headers);
    this.GET_AGENCY_SUMMARY();
    this.search();
  },
  methods: {
    ...mapActions(['GET_AGENCY_SUMMARY', 'GET_AGENCY_DAILY', 'GET_AGENCY_DAILY_EXCEL']),
    ...mapMutations(['SET_AGENCY_SUMMARY', 'SET_AGENCY_DAILY']),
    search() {
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi(ps) {
      const { date, page, num } = this.searchData;
      let input = { page, num };
      date.start && (input.start = date.start);
      date.end && (input.end = date.end);
      ps && (input.page = ps);
      this.GET_AGENCY_DAILY(input);
    },
    changePage(ps) {
      this.searchData.page = ps;
      this.callListApi(ps);
    },
    changeItems() {
      this.tableHeaders = [];
      this.headers.forEach(i => {
        i.isShow && this.tableHeaders.push(i);
      });
    },
    excel() {
      const { date } = this.searchData;
      let input = {};
      date.start && (input.start = date.start);
      date.end && (input.end = date.end);
      this.GET_AGENCY_DAILY_EXCEL(input);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_overview_');
    },
  },
};
</script>

<style lang="scss">
.Overview {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
  }
}
</style>
