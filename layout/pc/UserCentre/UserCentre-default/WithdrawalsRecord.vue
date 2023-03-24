<template>
  <!-- 取款紀錄 -->
  <div class="WithdrawalsRecord">
    <v-divider></v-divider>
    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col cols="4">
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
        <v-select
          v-model="searchData.withdrawalsType"
          item-value="val"
          :items="chanageArray(withdrawalsTypeList)"
          :label="textFilter('tableHeaders_type')"
        >
          <template v-slot:selection="{ item }">{{ $t(item.title) }}</template>
          <template v-slot:item="{ item }">{{ $t(item.title) }}</template>
        </v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="searchData.withdrawalsStatus"
          item-value="val"
          :items="chanageArray(withdrawalsStatusList)"
          :label="textFilter('tableHeaders_status')"
        >
          <template v-slot:selection="{ item }">{{ $t(item.title) }}</template>
          <template v-slot:item="{ item }">{{ $t(item.title) }}</template>
        </v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn depressed outlined class="mr-2" @click="resetSearchData()">{{ $t('g_common_searchBar_resetBtn') }}</v-btn>
        <v-btn color="primary" depressed @click="getWithdrawalsList()">{{ $t('g_common_searchBar_searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <div class="table">
      <v-data-table
        :headers="tableHeaders"
        :items="tableData"
        :loading="isLoading"
        :server-items-length="pagination.totalItems"
        :page.sync="pagination.page"
        :sort-desc.sync="pagination.desc"
        :sort-by.sync="pagination.sort"
        :hide-default-header="true"
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
        <template v-if="tableData.length" v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.Created | formatDate }}</td>
              <td>{{ item.Sn }}</td>
              <td>
                <v-chip :color="withdrawalsTypeList[item.Type].color" text-color="white" label small>
                  {{ $t(withdrawalsTypeList[item.Type].title) }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip v-if="withdrawalsStatusList[item.Status]" label :color="withdrawalsStatusList[item.Status].color" text-color="white" small>
                  {{ $t(withdrawalsStatusList[item.Status].title) }}
                </v-chip>
                <v-chip v-else :color="withdrawalsStatusList['-1'].color" text-color="white" label small>
                  {{ status['-1'].title }}
                </v-chip>
              </td>
              <td class="text-right">{{ config.unit }} {{ item.Amount | money }}</td>
              <!-- 實際金額 -->
              <td class="text-right">
                <span v-if="item.UsdtAmount">USDT{{ item.UsdtAmount | money }}</span>
                <span v-if="item.UsdtAmount && item.Cny"> / </span>
                <span v-if="item.Cny">{{ config.unit }} {{ item.Cny | money }} </span>
              </td>
              <td class="text-center">
                <v-btn v-if="item.Status == 2 && item.Note" @click.stop="showNote(item.Note)" color="primary" small depressed>
                  {{ textFilter('details') }}
                </v-btn>
                <template v-else> -- </template>
              </td>
            </tr>
          </tbody>
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
    <!-- 明細 -->
    <v-dialog v-if="isShowNote" v-model="isShowNote" max-width="500px">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          <h3 class="text-center">{{ textFilter('reason') }}</h3>
        </v-card-title>
        <v-card-text>{{ noteText }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { withdrawalsStatusList, withdrawalsTypeList } from '@ASSETS/userCentre/withdrawalsInfo';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { textFilter } from '@UTILS/i18n';
import lodash from 'lodash';

const defaultSearchData = {
  date: {},
  withdrawalsType: null, // 取款類型
  withdrawalsStatus: null, // 取款狀態
};

export default {
  name: 'WithdrawalsRecord',
  components: { Daterange },
  data() {
    return {
      dateRange,
      tableData: [],
      searchData: {},
      tableHeaders: [
        {
          text: 'tableHeaders_time',
          sortable: true,
          value: 'Created',
          align: 'left',
        },
        {
          text: 'tableHeaders_code',
          sortable: true,
          value: 'Sn',
          align: 'left',
        },
        {
          text: 'tableHeaders_type',
          sortable: true,
          value: 'Type',
          align: 'left',
        },
        {
          text: 'tableHeaders_status',
          sortable: true,
          value: 'Status',
          align: 'left',
        },
        {
          text: 'tableHeaders_amount',
          sortable: true,
          value: 'Amount',
          align: 'right',
        },
        {
          text: 'tableHeaders_actualAmount',
          sortable: true,
          value: '',
          align: 'right',
        },
        {
          text: 'tableHeaders_reason',
          sortable: false,
          value: 'Note',
          align: 'center',
        },
      ],
      pagination: {
        page: 1,
        length: 0,
        rowsPerPage: 10,
        sort: [],
        desc: [],
      },
      withdrawalsTypeList, // 取款類型
      withdrawalsStatusList, // 取款狀態
      isShowNote: false,
      noteText: '',
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config']),
  },
  watch: {
    'pagination.page'(p) {
      !this.isLoading && this.getWithdrawalsList(p);
    },
    'pagination.desc'(desc) {
      if (desc != null) this.getWithdrawalsList();
    },
  },
  async created() {
    await this.resetSearchData();
    this.getWithdrawalsList();
  },
  methods: {
    ...mapMutations(['SET_MESSAGE']),
    ...mapActions(['GET_WITHDRAWALS_LIST']),
    // 取得 取款紀錄列表
    async getWithdrawalsList(page = 1) {
      this.pagination.page = page;
      let param = {
        s: this.searchData.date.start || null,
        e: this.searchData.date.end || null,
        t: this.searchData.withdrawalsType,
        st: this.searchData.withdrawalsStatus,
        page,
        num: this.pagination.rowsPerPage,
        sort: this.pagination.sort[0],
        asc: this.pagination.desc[0] === undefined ? undefined : !this.pagination.desc[0], // 後端收 asc
      };
      const res = await this.GET_WITHDRAWALS_LIST(param);
      if (!res.isError && Object.keys(res.result).length) {
        this.tableData = res.result.withdrawals;
        this.pagination.length = res.result.pageNums;
        this.pagination.totalItems = res.result.total;
      }
    },
    showNote(note) {
      this.noteText = note;
      this.isShowNote = true;
    },
    resetSearchData() {
      this.searchData = lodash.cloneDeep(defaultSearchData);
    },
    chanageArray(objData) {
      let arr = [];
      for (const key in objData) {
        let obj = {};
        obj.title = objData[key].title;
        obj.val = key;
        arr.push(obj);
      }
      return arr;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_withdrawalsRecord_');
    },
  },
};
</script>

<style lang="scss">
.WithdrawalsRecord {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
  }
}
</style>
