<template>
  <!-- 餘額調整紀錄 -->
  <div class="balanceRecord">
    <div class="width-940px position-relative overflow-hidden withdrawals-form">
      <!-- 搜尋 -->
      <div class="white pa-5">
        <h3 class="mt-0 font-size-18 black--text font-weight-400">交易记录</h3>
        <p class="mt-5 font-size-14 grey--text">当前系统支持查询最近30日的交易记录</p>
        <div class="mt-14px d-flex align-center gap-15 font-size-14 grey--text">
          <label>查看 :</label>
          <v-select v-model="recordType" :items="recordTypes" no-title solo outlined dense yabo></v-select>
        </div>
        <div class="mt-14px d-flex align-center gap-15 font-size-14 grey--text">
          <label>时间 :</label>
          <Daterange
            v-model="params.date"
            display-format="YYYY-MM-DD"
            no-title
            :solo="true"
            :outlined="true"
            :dense="true"
            :yabo="true"
            :input-props="dateRange.inputProps"
            :menu-props="dateRange.menuProps"
            :presets="dateRange.presets"
            startLabel="startTime"
            endLabel="endTime"
            presetLabel="shortcutOptions"
            separatorLabel="to"
          />
          <v-spacer />

          <v-btn class="width-100px" color="primary" @click="getRecord()">{{ $t('g_common_searchBar_searchBtn') }}</v-btn>
          <v-btn class="width-100px" outlined color="grey" @click="resetparams()">{{ $t('g_common_searchBar_resetBtn') }}</v-btn>
        </div>
      </div>

      <!-- 列表 -->
      <div class="mt-5 white mw100">
        <v-data-table
          :headers="tableHeaders"
          :items="tableData"
          :loading="isLoading"
          :server-items-length="pagination.totalItems"
          :page.sync="pagination.page"
          :sort-desc.sync="pagination.desc"
          :sort-by.sync="pagination.sort"
          :hide-default-header="true"
          class="elevation-1 mb-3"
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
                <!-- 时间 -->
                <td v-if="/^created$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  {{ item[col.value] | formatDate }}
                </td>
                <!-- 类型 -->
                <td v-else-if="/^type$/i.test(col.value) && recordType == 'withdrawals'" :key="i" :class="`text-${col.align}`">
                  <v-chip label :color="withdrawalsTypeList[item[col.value]].color" text-color="white" small>
                    {{ $t(withdrawalsTypeList[item[col.value]].title) }}
                  </v-chip>
                </td>
                <!-- 类型 -->
                <td v-else-if="/^Type$/i.test(col.value) && recordType == 'logs'" :key="i" :class="`text-${col.align}`">
                  <v-chip label color="#4d9974" text-color="white" small>
                    {{ item[col.value] | balanceType }}
                  </v-chip>
                </td>
                <!-- 金额 -->
                <td v-else-if="/^amount$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  ￥{{ item.Amount | money }}
                  <template v-if="item.PayType === 7">({{ item.UsdtAmount }})</template>
                </td>
                <!-- UsdtAmount -->
                <td v-else-if="/^UsdtAmount$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  <span v-if="item.PayType == 7">{{ item.UsdtAmount | money }}</span>
                  <span v-else>/</span>
                </td>

                <!-- 入金支付類型 -->
                <td v-else-if="/^paytype$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  {{ paymentsTypeList[item.PayType] }}
                </td>
                <!-- 狀態 -->
                <td v-else-if="/^(status|type)$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  <v-chip label :color="statusList[item[col.value]].color" text-color="white" small>
                    {{ $t(statusList[item[col.value]].title) }}
                  </v-chip>
                </td>
                <!-- 入金狀態 -->
                <td v-else-if="/^(Note)$/i.test(col.value)" :key="i" :class="`text-${col.align}`">
                  <!-- <v-btn color="primary" depressed v-if="item.Status == 2 && item.Note" @click.stop="showNote(item.Note)" small>
                    {{ textFilter('details') }}
                  </v-btn> -->
                  <template v-if="item.Status == 2 && item.Note">{{ item.Note }}</template>
                  <template v-else> -- </template>
                </td>
                <td v-else-if="!col.value" :key="i" :class="`text-${col.align}`">
                  <v-btn :disabled="isLoading" @click.stop="getDepositDetail(item, item.PayType)" color="primary" small outlined>
                    {{ textFilter('details') }}
                  </v-btn>
                </td>
                <!-- 备注 -->
                <td v-else :key="i" :class="`text-${col.align}`">
                  {{ item[col.value] }}
                </td>
              </template>
            </tr>
          </template>
        </v-data-table>
        <v-pagination v-if="pagination.length" v-model="pagination.page" :length="pagination.length" :total-visible="10"></v-pagination>
      </div>
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
import { balanceStatusList } from '@ASSETS/userCentre/balanceInfo';
import { depositStatusList } from '@ASSETS/userCentre/depositInfo';
import { withdrawalsStatusList, withdrawalsTypeList } from '@ASSETS/userCentre/withdrawalsInfo';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { textFilter } from '@UTILS/i18n';
import { money } from '@G/filters';
import lodash from 'lodash';

const defaultParams = {
  date: {},
  type: null, // 转帐類型
};

export default {
  name: 'balanceRecord',
  components: { Daterange },
  data() {
    return {
      withdrawalsTypeList,
      dateRange,
      date: {},
      params: {},
      pagination: {
        page: 1, // 當前頁
        length: 0, // 頁數總長
        rowsPerPage: 10, // 一頁筆數
        sort: [],
        desc: [],
      },
      showDetail: false,
      detailData: {},
      detailPayType: null,
      recordType: 'deposits',
      recordTypes: [
        {
          text: '存款记录',
          value: 'deposits',
        },
        {
          text: '取款记录',
          value: 'withdrawals',
        },
        {
          text: '余额记录',
          value: 'logs',
        },
      ],
      recordMap: {
        logs: {
          prefix: 'layout_userCentre_default_balanceRecord_',
          method: 'GET_BALANCE_HISTORY_LIST',
          statusList: balanceStatusList,
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
              align: 'center',
            },
          ],
          tableData: [],
        },
        deposits: {
          prefix: 'layout_userCentre_default_depositRecord_',
          method: 'GET_DEPOSIT_LIST',
          statusList: depositStatusList,
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
          tableData: [],
        },
        withdrawals: {
          prefix: 'layout_userCentre_default_withdrawalsRecord_',
          method: 'GET_WITHDRAWALS_LIST',
          statusList: withdrawalsStatusList,
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
              text: 'tableHeaders_RMB_amount',
              sortable: true,
              value: 'Amount',
              align: 'right',
            },
            {
              text: 'tableHeaders_USDT_amount',
              sortable: true,
              value: 'UsdtAmount',
              align: 'right',
            },
            {
              text: 'tableHeaders_actualAmount',
              sortable: true,
              value: 'Amount',
              align: 'right',
            },
            {
              text: 'tableHeaders_reason',
              sortable: false,
              value: 'Note',
              align: 'center',
            },
          ],
          tableData: [],
        },
      },
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'paymentsTypeList']),
    prefix() {
      return this.recordMap[this.recordType].prefix;
    },
    tableHeaders() {
      return this.recordMap[this.recordType].tableHeaders;
    },
    tableData: {
      get() {
        return this.recordMap[this.recordType].tableData;
      },
      set(val) {
        this.recordMap[this.recordType].tableData = val;
      },
    },
    statusList() {
      return this.recordMap[this.recordType].statusList;
    },
  },
  watch: {
    'pagination.page'(p) {
      !this.isLoading && this.getRecord(p);
    },
    'pagination.desc'(desc) {
      if (desc != null) this.getRecord();
    },
  },
  async created() {
    await this.resetparams();
    await this.GET_PAYMENT_TYPE_LIST();
    await this.GET_PAYMENT_ACCOUNTS_LIST();
    this.getRecord();
  },
  methods: {
    ...mapActions([
      'GET_BALANCE_HISTORY_LIST',
      'GET_DEPOSIT_LIST',
      'GET_DEPOSIT_DETAIL',
      'GET_PAYMENT_TYPE_LIST',
      'GET_PAYMENT_ACCOUNTS_LIST',
      'GET_WITHDRAWALS_LIST',
    ]),
    // 取得 存款列表
    async getRecord(page = 1) {
      this.pagination.page = page;
      let param = {
        s: this.params.date.start || null,
        e: this.params.date.end || null,
        page,
        type: this.params.type,
        num: this.pagination.rowsPerPage,
        sort: this.pagination.sort[0],
        asc: this.pagination.desc[0] === undefined ? undefined : !this.pagination.desc[0], // 後端收 asc
      };
      const res = await this.GET_RECORDS(param);
      if (!res.isError && Object.keys(res.result).length) {
        this.tableData = res.result[this.recordType];
        this.pagination.length = res.result.pageNums;
        this.pagination.totalItems = res.result.total;
      }
    },
    resetparams() {
      this.params = lodash.cloneDeep(defaultParams);
    },
    money(value) {
      return money(value);
    },
    textFilter(text, slot) {
      const { prefix } = this;
      return slot ? textFilter(text, prefix, slot) : textFilter(text, prefix);
    },
    async GET_RECORDS(param) {
      return await this[this.recordMap[this.recordType].method](param);
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

<style lang="scss" scoped>
.balanceRecord ::v-deep {
  .v-input__control {
    display: inline-flex;
    flex-direction: row;
    gap: 15px;
    width: auto;
    max-width: none;
    .v-input__slot {
      width: 240px;
    }
    .v-text-field__details {
      width: auto;
    }
  }
}
</style>
