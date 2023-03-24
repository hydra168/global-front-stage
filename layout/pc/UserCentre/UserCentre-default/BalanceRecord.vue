<template>
  <!-- 餘額調整紀錄 -->
  <div class="balanceRecord">
    <v-divider></v-divider>
    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col>
        <Daterange
          v-model="searchData.date"
          display-format="YYYY-MM-DD"
          no-title
          :input-props="dateRange.inputProps"
          :menu-props="dateRange.menuProps"
          :presets="dateRange.presets"
          startLabel="startTime"
          endLabel="endTime"
          presetLabel="shortcutOptions"
          separatorLabel="to"
        />
      </v-col>
      <v-col>
        <v-select v-model="searchData.type" item-value="val" :items="balanceStatusListArray" :label="textFilter('tableHeaders_type')">
          <template v-slot:selection="{ item }">{{ $t(item.title) }}</template>
          <template v-slot:item="{ item }">{{ $t(item.title) }}</template>
        </v-select>
      </v-col>
      <v-col cols="3" class="text-right">
        <v-btn depressed outlined class="mr-2" @click="resetSearchData()">{{ $t('g_common_searchBar_resetBtn') }}</v-btn>
        <v-btn color="primary" depressed @click="getBalanceHistoryList()">{{ $t('g_common_searchBar_searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <div>
      <v-data-table
        :headers="tableHeaders"
        :items="tableData"
        :loading="isLoading"
        :server-items-length="pagination.totalItems"
        :page.sync="pagination.page"
        :sort-desc.sync="pagination.desc"
        :sort-by.sync="pagination.sort"
        :hide-default-header="true"
        class="mb-3"
        :no-data-text="textFilter('noData')"
        hide-default-footer
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th v-for="item in headers" :key="item.text" :class="`text-${item.align}`">
                <span>{{ textFilter(item.text) }}</span>
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:progress><v-progress-linear indeterminate></v-progress-linear></template>
        <template v-if="tableData.length" v-slot:item="{ item }">
          <tr>
            <template v-for="(col, i) in tableHeaders">
              <td v-if="/^created$/i.test(col.value)" :key="i" :class="`text-${col.align}`">{{ item[col.value] | formatDate }}</td>
              <td v-else-if="/^type$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                <v-chip :color="balanceStatusList[item[col.value]].color" text-color="white" small label>
                  {{ $t(balanceStatusList[item[col.value]].title) }}
                </v-chip>
              </td>
              <td v-else-if="/^amount$/i.test(col.value)" :key="i" :class="`text-${col.align}`">{{ config.unit }} {{ item.Amount | money }}</td>
              <td v-else :key="i" :class="`text-${col.align}`">{{ item[col.value] }}</td>
            </template>
          </tr>
        </template>
      </v-data-table>
      <v-pagination
        v-if="pagination.length"
        v-model="pagination.page"
        :length="pagination.length"
        :total-visible="10"
        circle
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        class="mt-5"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { balanceStatusList } from '@ASSETS/userCentre/balanceInfo';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { textFilter } from '@UTILS/i18n';
import { money } from '@G/filters';
import lodash from 'lodash';

const defaultSearchData = {
  date: {},
  type: null, // 转帐類型
};

export default {
  name: 'balanceRecord',
  components: { Daterange },
  data() {
    return {
      dateRange,
      date: {},
      searchData: {},
      tableData: [],
      tableHeaders: [
        {
          text: 'tableHeaders_created',
          sortable: true,
          value: 'Created',
          align: 'left',
        },
        {
          text: 'tableHeaders_type',
          sortable: true,
          value: 'Type',
          align: 'left',
        },
        {
          text: 'tableHeaders_amount',
          sortable: true,
          value: 'Amount',
          align: 'right',
        },
        {
          text: 'tableHeaders_remark',
          sortable: false,
          value: 'Remark',
          align: 'right',
        },
      ],
      pagination: {
        page: 1, // 當前頁
        length: 0, // 頁數總長
        rowsPerPage: 10, // 一頁筆數
        sort: [],
        desc: [],
      },
      balanceStatusList, // 存款狀態
      showDetail: false,
      detailData: {},
      detailPayType: null,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config']),
    balanceStatusListArray() {
      let arr = [];
      for (const key in this.balanceStatusList) {
        let obj = {};
        obj.title = this.balanceStatusList[key].title;
        obj.val = key;
        arr.push(obj);
      }
      return arr;
    },
  },
  watch: {
    'pagination.page'(p) {
      !this.isLoading && this.getBalanceHistoryList(p);
    },
    'pagination.desc'(desc) {
      if (desc != null) this.getBalanceHistoryList();
    },
  },
  async created() {
    await this.resetSearchData();
    this.getBalanceHistoryList();
  },
  methods: {
    ...mapActions(['GET_BALANCE_HISTORY_LIST']),
    // 取得 存款列表
    async getBalanceHistoryList(page = 1) {
      this.pagination.page = page;
      let param = {
        s: this.searchData.date.start || null,
        e: this.searchData.date.end || null,
        page,
        type: this.searchData.type,
        num: this.pagination.rowsPerPage,
        sort: this.pagination.sort[0],
        asc: this.pagination.desc[0] === undefined ? undefined : !this.pagination.desc[0], // 後端收 asc
      };
      const res = await this.GET_BALANCE_HISTORY_LIST(param);
      if (!res.isError && Object.keys(res.result).length) {
        this.tableData = res.result.logs;
        this.pagination.length = res.result.pageNums;
        this.pagination.totalItems = res.result.total;
      }
    },
    resetSearchData() {
      this.searchData = lodash.cloneDeep(defaultSearchData);
    },
    money(value) {
      return money(value);
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_balanceRecord_', slot) : textFilter(text, 'layout_userCentre_default_balanceRecord_');
    },
  },
};
</script>

<style lang="scss">
.DepositRecord {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
  }
  .red--text >>> .v-text-field__slot input {
    color: red !important;
  }
}
</style>
