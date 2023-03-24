<template>
  <!-- 代理錢包 -->
  <div class="AgencyWallet">
    <!-- 代理錢包 -->
    <v-row>
      <v-col cols="8">
        <v-text-field :label="textFilter('proxyWalletLabel')" v-model="agencyBalance" disabled> </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" depressed :disabled="agencyBalance === 0" @click="triggerModal(true)">{{ textFilter('goBackBtn') }}</v-btn>
      </v-col>
    </v-row>

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
        <v-checkbox v-model="data.type" :label="textFilter('transferIn')" :value="1"></v-checkbox>
      </v-col>
      <v-col>
        <v-checkbox v-model="data.type" :label="textFilter('transferOut')" :value="2"></v-checkbox>
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
          <div class="title">{{ item.created | formatDate }}</div>
          <div class="content">
            <div class="row">
              <div>{{ textFilter('type') }}</div>
              <div>{{ textFilter(item.type === 1 ? 'transferIn' : 'transferOut') }}</div>
              <div>{{ textFilter('beforeBalance') }}</div>
              <div>{{ item.before_balance }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter('balance') }}</div>
              <div>{{ item.change_balance }}</div>
              <div>{{ textFilter('afterBalance') }}</div>
              <div>{{ item.after_balance }}</div>
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
          <v-btn outlined @click="triggerModal(false)">{{ textFilter('cancelBtn') }}</v-btn>
          <v-btn color="primary" depressed :disabled="transferBtn" @click="transferMainWallet">{{ textFilter('confirmBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'AgencyWallet',
  data() {
    return {
      isOpen: false,
      balance: '',
      isShowDateModal: false,
      dateInfo: [],
      data: {
        date: [],
        type: [],
        page: 1,
        num: 10,
      },
      searchData: {},
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyBalance', 'balanceLog', 'agencyStatus']),
    rangeDatesText() {
      return this.dateInfo.join(this.textFilter('to'));
    },
    transferBtn() {
      return this.agencyBalance === 0;
    },
    totalPage() {
      const { total } = this.balanceLog;
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
    'balanceLog.logs'(v) {
      v && (this.tableData = this.tableData.concat(v));
    },
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
      this.tableData = [];
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi() {
      const { date, type, page, num } = this.searchData;
      let input = { page, num };
      date.length && (input.start = date[0]);
      date.length && (input.end = date[1]);
      type.length && (input.type = [...type]);
      this.GET_AGENCY_BALANCE_LIST(input);
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
      return textFilter(text, 'layout_userCentre_default_agencyCenter_wallet_');
    },
  },
};
</script>

<style lang="scss" scoped>
.AgencyWallet {
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
