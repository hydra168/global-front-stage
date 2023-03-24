<template>
  <!-- 代理團隊 -->
  <v-dialog v-model="isOpen" max-width="1000px" @click:outside="close">
    <v-card>
      <v-card-title class="text-center py-5 d-flex justify-center"> {{ textFilter('title') }} </v-card-title>
      <v-card-text>
        <!-- 搜尋 -->
        <v-row justify="space-between" align="center">
          <v-col cols="6">
            <Daterange
              v-model="data.date"
              display-format="YYYY-MM-DD"
              no-title
              :input-props="dateRange.inputProps"
              :menu-props="dateRange.menuProps"
              :presets="presets"
              startLabel="startTime"
              endLabel="endTime"
              presetLabel="shortcutOptions"
              separatorLabel="to"
              locale="zh-cn"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field :label="textFilter('accountLabel')" v-model="data.username"> </v-text-field>
          </v-col>
          <v-col class="text-right">
            <v-btn color="primary" depressed :disabled="isLoading" @click="search">{{ textFilter('searchBtn') }}</v-btn>
          </v-col>
        </v-row>

        <!-- tabs -->
        <v-tabs>
          <v-tab v-for="item in tabList" :key="item.type">{{ textFilter(item.name) }}</v-tab>
          <v-tab-item v-for="item in tabList" :key="item.type">
            <!-- 團隊列表 -->
            <v-data-table
              :headers="item.type === 'team' ? teamHeaders : personalHeaders"
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
              <template v-slot:[`item.name`]="{ item }">
                {{ item.name }}
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-if="userName === item.name">info</v-icon>
                  </template>
                  <span>{{ textFilter('currentAccount') }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <v-pagination
              v-if="pagination.length"
              v-model="pagination.page"
              :length="pagination.length"
              :total-visible="10"
              @input="changePage"
            ></v-pagination>
          </v-tab-item>
        </v-tabs>
        <span class="error--text">{{ textFilter('note') }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="close">{{ textFilter('closeBtn') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { format, subDays } from 'date-fns';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'TeamModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      required: true,
    },
  },
  components: { Daterange },
  data() {
    return {
      dateRange,
      presets: [
        {
          label: 'today',
          range: [format(new Date(), 'YYYY-MM-DD'), format(new Date(), 'YYYY-MM-DD')],
        },
        {
          label: 'yesterday',
          range: [format(subDays(new Date(), 1), 'YYYY-MM-DD'), format(subDays(new Date(), 1), 'YYYY-MM-DD')],
        },
        {
          label: '7days',
          range: [format(subDays(new Date(), 7), 'YYYY-MM-DD'), format(subDays(new Date(), 1), 'YYYY-MM-DD')],
        },
      ],
      tabList: [
        {
          type: 'team',
          name: 'team',
        },
        {
          type: 'personal',
          name: 'personal',
        },
      ],
      data: {
        date: {},
        username: '',
        page: 1,
        num: 10,
      },
      searchData: {},
      teamHeaders: [
        {
          text: 'account',
          sortable: true,
          value: 'name',
        },
        {
          text: 'immediateSuperior',
          sortable: true,
          value: 'parent_name',
        },
        {
          text: 'teamRechargeAmount',
          sortable: true,
          value: 'team_deposit',
        },
        {
          text: 'teamCashWithdrawal',
          sortable: true,
          value: 'team_withdrawal',
        },
        {
          text: 'teamBetAmount',
          sortable: true,
          value: 'team_bet',
        },
        {
          text: 'teamPayoutAmount',
          sortable: true,
          value: 'team_payout',
        },
        {
          text: 'totalTeamProfitAndLoss',
          sortable: true,
          value: 'team_result',
        },
      ],
      personalHeaders: [
        {
          text: 'account',
          sortable: true,
          value: 'name',
        },
        {
          text: 'immediateSuperior',
          sortable: true,
          value: 'parent_name',
        },
        {
          text: 'rechargeAmount',
          sortable: true,
          value: 'personal_deposit',
        },
        {
          text: 'withdrawalAmount',
          sortable: true,
          value: 'personal_withdrawal',
        },
        {
          text: 'betAmount',
          sortable: true,
          value: 'personal_bet',
        },
        {
          text: 'payoutAmount',
          sortable: true,
          value: 'personal_payout',
        },
        {
          text: 'totalProfitAndLoss',
          sortable: true,
          value: 'personal_result',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyTeamItem', 'userInfo']),
    userName() {
      return this.userInfo.name || '';
    },
    tableData() {
      return this.agencyTeamItem.list || [];
    },
    pagination() {
      const { total } = this.agencyTeamItem;
      const { page, num } = this.searchData;
      let info = { total: 0, page };
      if (total) {
        info.total = total;
        info.length = Math.ceil(total / num);
      }
      return info;
    },
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi(ps) {
      const { username, date, page, num } = this.searchData;
      let input = { sub_id: this.info.user_id, page, num };
      username && (input.username = username);
      date.start && (input.start = date.start);
      date.end && (input.end = date.end);
      ps && (input.page = ps);
      this.$emit('search', input);
    },
    changePage(ps) {
      this.searchData.page = ps;
      this.callListApi(ps);
    },
    close() {
      this.$emit('close', false);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_teamModal_');
    },
  },
};
</script>
