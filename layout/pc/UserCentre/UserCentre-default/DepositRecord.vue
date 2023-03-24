<template>
  <!-- 存款紀錄 -->
  <div class="DepositRecord">
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
        <v-select v-model="searchData.paymentsType" item-value="val" :items="paymentsTypeListArray" :label="textFilter('tableHeaders_type')">
          <template v-slot:selection="{ item }">{{ item.title }}</template>
          <template v-slot:item="{ item }">{{ item.title }}</template>
        </v-select>
      </v-col>
      <v-col>
        <v-select v-model="searchData.depositStatus" item-value="val" :items="depositStatusListArray" :label="textFilter('tableHeaders_status')">
          <template v-slot:selection="{ item }">{{ $t(item.title) }}</template>
          <template v-slot:item="{ item }">{{ $t(item.title) }}</template>
        </v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn depressed outlined class="mr-2" @click="resetSearchData()">{{ $t('g_common_searchBar_resetBtn') }}</v-btn>
        <v-btn color="primary" depressed @click="getDepositList()">{{ $t('g_common_searchBar_searchBtn') }}</v-btn>
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
                <v-chip small label depressed> {{ paymentsTypeList[item.PayType] }}</v-chip>
              </td>
              <td>
                <v-chip v-if="depositStatusList[item.Status]" :color="depositStatusList[item.Status].color" text-color="white" label small depressed>
                  {{ $t(depositStatusList[item.Status].title) }}
                </v-chip>
                <v-chip v-else :color="depositStatusList['-1'].color" text-color="white" label small depressed> {{ status['-1'].title }} </v-chip>
              </td>
              <td class="text-right">{{ config.unit }} {{ item.Amount | money }}</td>
              <td class="text-center">
                <v-btn :disabled="isLoading" @click.stop="getDepositDetail(item, item.PayType)" color="primary" small depressed>
                  {{ textFilter('details') }}
                </v-btn>
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
    <v-dialog v-if="showDetail" v-model="showDetail" max-width="600px">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          <h3 class="text-center">{{ textFilter('depositInfo') }}</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
              <v-text-field
                v-if="isDepositShowDepositName"
                v-model="detailData.depositName"
                :label="textFilter('depositNameLabel')"
                readonly
              ></v-text-field>
              <v-text-field :value="detailData.order" :label="textFilter('orderLabel')" readonly></v-text-field>
              <template v-if="!isDetailWithRate">
                <v-text-field :value="detailData.bank" :label="textFilter('bankLabel')" readonly></v-text-field>
                <v-text-field :value="detailData.card" :label="textFilter('cardLabel')" readonly></v-text-field>
              </template>
              <v-text-field v-if="detailData.name" :value="detailData.name" :label="textFilter('payeeLabel')" readonly></v-text-field>

              <template v-if="Number(detailData.fee)">
                <v-text-field
                  :class="Number(detailData.fee) ? 'red--text' : ''"
                  :error-messages="Number(detailData.fee) ? textFilter('feeErrorText', { fee: money(Number(detailData.fee)) }) : ''"
                  :value="money(Number(detailData.fee))"
                  :prefix="currencyCode(detailData.bank)"
                  :label="$t('g_layout_userCentre_default_deposit_feeLabel')"
                  :error="Boolean(Number(detailData.fee))"
                  readonly
                ></v-text-field>
              </template>
              <template v-if="isDetailWithRate">
                <v-text-field
                  :prefix="currencyCode(detailData.bank)"
                  :value="detailData.UsdtAmount || detailData.unit"
                  :label="textFilter('depositAmountLabel')"
                  readonly
                ></v-text-field>
                <v-text-field :value="detailData.rate || detailData.ExchanGerate" :label="textFilter('rateLabel')" readonly></v-text-field>
              </template>
              <v-text-field
                :value="detailData.amount"
                :prefix="config.unit"
                :label="$t('g_layout_userCentre_default_deposit_amountLabel2')"
                readonly
              ></v-text-field>
              <template v-if="detailPayType == 5">
                <v-text-field v-model="detailData.card" :label="textFilter('walletLabel')" readonly></v-text-field>
                <div class="d-flex justify-center mb-5">
                  <vue-qr :text="detailData.card" :size="200" :margin="20"></vue-qr>
                </div>
                <v-btn outlined block color="primary" @click="$router.push('/depositUsdtHelp')">{{ textFilter('teaching') }}</v-btn>
              </template>
              <template v-else-if="detailData.postscript">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      persistent-hint
                      :hint="textFilter('codeHint')"
                      color="deep-orange"
                      append-icon="help_outline"
                      :value="detailData.postscript"
                      :label="textFilter('code')"
                      readonly
                      class="deep-orange--text"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>{{ textFilter('codeText') }}</span>
                </v-tooltip>
              </template>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { depositStatusList } from '@ASSETS/userCentre/depositInfo';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';
import { money } from '@G/filters';
import lodash from 'lodash';

const defaultSearchData = {
  date: {},
  paymentsType: null, // 存款類型
  depositStatus: null, // 存款狀態
};

export default {
  name: 'DepositRecord',
  components: { Daterange, VueQr },
  data() {
    return {
      dateRange,
      date: {},
      searchData: {},
      tableData: [],
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
          value: 'PayType',
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
          text: 'tableHeaders_operating',
          sortable: false,
          value: '',
          align: 'center',
        },
      ],
      pagination: {
        page: 1, // 當前頁
        length: 0, // 頁數總長
        rowsPerPage: 10, // 一頁筆數
        sort: [],
        desc: [],
      },
      depositStatusList, // 存款狀態
      showDetail: false,
      detailData: {},
      detailPayType: null,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'paymentsTypeList', 'paymentAccountList']),
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
    isDetailWithRate() {
      const rate = this.detailData.ExchanGerate || this.detailData.rate;
      return rate && rate != 1;
    },
    isDepositShowDepositName() {
      return /^true$/i.test((Boolean(Number(this.config.depositName)) || 'false').toString());
    },
  },
  watch: {
    'pagination.page'(p) {
      !this.isLoading && this.getDepositList(p);
    },
    'pagination.desc'(desc) {
      if (desc != null) this.getDepositList();
    },
  },
  async created() {
    await this.GET_PAYMENT_TYPE_LIST(); // 取得 付款類型列表
    await this.GET_PAYMENT_ACCOUNTS_LIST(); // 取得 支付列表
    await this.resetSearchData();
    this.getDepositList();
  },
  methods: {
    ...mapActions(['GET_DEPOSIT_LIST', 'GET_DEPOSIT_DETAIL', 'GET_PAYMENT_TYPE_LIST', 'GET_PAYMENT_ACCOUNTS_LIST']),
    // 取得 存款列表
    async getDepositList(page = 1) {
      this.pagination.page = page;
      let param = {
        s: this.searchData.date.start || null,
        e: this.searchData.date.end || null,
        pt: this.searchData.paymentsType,
        st: this.searchData.depositStatus,
        page,
        num: this.pagination.rowsPerPage,
        sort: this.pagination.sort[0],
        asc: this.pagination.desc[0] === undefined ? undefined : !this.pagination.desc[0], // 後端收 asc
      };
      const res = await this.GET_DEPOSIT_LIST(param);
      if (!res.isError && Object.keys(res.result).length) {
        this.tableData = res.result.deposits;
        this.pagination.length = res.result.pageNums;
        this.pagination.totalItems = res.result.total;
      }
    },
    // 取得 存款明細
    async getDepositDetail(item, PayType) {
      this.detailPayType = PayType;
      const res = await this.GET_DEPOSIT_DETAIL({ id: item.Id });
      if (!res.isError) {
        this.showDetail = true;
        this.detailData = { ...res.result, ...item };
      }
    },
    resetSearchData() {
      this.searchData = lodash.cloneDeep(defaultSearchData);
    },
    money(value) {
      return money(value);
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_depositRecord_', slot) : textFilter(text, 'layout_userCentre_default_depositRecord_');
    },
    currencyCode(bank) {
      const payment = this.paymentAccountList.find(item => item.bank == bank);
      return payment.sysParams?.currencyCode || 'USDT';
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
