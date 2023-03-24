<template>
  <!-- 代理錢包 -->
  <div class="AgencyWallet">
    <v-divider></v-divider>
    <!-- 代理錢包 -->
    <v-row>
      <v-col>
        <v-text-field :label="textFilter('proxyWalletLabel')" v-model="agencyBalance" disabled> </v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" depressed :disabled="agencyBalance === 0" @click="triggerModal(true)">{{ textFilter('goBackBtn') }}</v-btn>
      </v-col>
    </v-row>

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
      <v-col cols="2">
        <v-checkbox v-model="data.type" :label="textFilter('transferIn')" :value="1"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="data.type" :label="textFilter('transferOut')" :value="2"></v-checkbox>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" :disabled="isLoading" @click="search" depressed>{{ textFilter('searchBtn') }}</v-btn>
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
          <template v-slot:[`item.created`]="{ item }">
            {{ item.created | formatDate }}
          </template>
          <template v-slot:[`item.type`]="{ item }">
            {{ textFilter(item.type === 1 ? 'transferIn' : 'transferOut') }}
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

    <!-- 轉主錢包視窗 -->
    <v-dialog v-model="isOpen" max-width="600px" @click:outside="triggerModal(false)">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          {{ textFilter('title') }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field :label="textFilter('proxyWalletLabel')" v-model="agencyBalance" disabled></v-text-field>
            <v-text-field :label="textFilter('amountLabel')" type="number" v-model.number="balance"></v-text-field>
            <div>{{ textFilter('note') }}</div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="triggerModal(false)" outlined>{{ textFilter('cancelBtn') }}</v-btn>
          <v-btn color="primary" depressed :disabled="transferBtn" @click="transferMainWallet">{{ textFilter('confirmBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'AgencyWallet',
  components: { Daterange },
  data() {
    return {
      isOpen: false,
      balance: '',
      dateRange,
      data: {
        date: {},
        type: [],
        page: 1,
        num: 10,
      },
      searchData: {},
      tableHeaders: [
        {
          text: 'date',
          sortable: true,
          value: 'created',
        },
        {
          text: 'type',
          sortable: true,
          value: 'type',
        },
        {
          text: 'beforeBalance',
          sortable: true,
          value: 'before_balance',
        },
        {
          text: 'balance',
          sortable: true,
          value: 'change_balance',
        },
        {
          text: 'afterBalance',
          sortable: true,
          value: 'after_balance',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyBalance', 'balanceLog', 'agencyStatus']),
    transferBtn() {
      return this.agencyBalance === 0;
    },
    tableData() {
      return this.balanceLog.logs || [];
    },
    pagination() {
      const { total } = this.balanceLog;
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
    agencyStatus(v) {
      if (v && v === 'list') {
        this.reset();
        this.triggerModal(false);
      }
      v && this.SET_AGENCY_STATUS('');
    },
  },
  created() {
    this.SET_AGENCY_BALANCE(0);
    this.SET_AGENCY_BALANCE_LIST({});
    this.reset();
  },
  methods: {
    ...mapActions(['GET_AGENCY_BALANCE', 'GET_AGENCY_BALANCE_LIST', 'UPDATE_AGENCY_BALANCE']),
    ...mapMutations(['SET_MESSAGE', 'SET_AGENCY_STATUS', 'SET_AGENCY_BALANCE', 'SET_AGENCY_BALANCE_LIST']),
    reset() {
      this.GET_AGENCY_BALANCE();
      this.search();
    },
    triggerModal(status) {
      status || (this.balance = '');
      this.isOpen = status;
    },
    transferMainWallet() {
      if (+this.agencyBalance >= this.balance) {
        this.UPDATE_AGENCY_BALANCE({ balance: `${this.balance}` });
      } else {
        this.SET_MESSAGE({ message: this.textFilter('balanceLimit') });
      }
    },
    search() {
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi(ps) {
      const { date, type, page, num } = this.searchData;
      let input = { page, num };
      date.start && (input.start = date.start);
      date.end && (input.end = date.end);
      type.length && (input.type = [...type]);
      ps && (input.page = ps);
      this.GET_AGENCY_BALANCE_LIST(input);
    },
    changePage(ps) {
      this.searchData.page = ps;
      this.callListApi(ps);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_agencyWallet_');
    },
  },
};
</script>
