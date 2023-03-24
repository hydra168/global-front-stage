<template>
  <!-- 查看團隊 -->
  <div class="TeamModal">
    <!-- 項目選單 -->
    <v-row>
      <v-col>
        <v-btn-toggle v-model="type" rounded>
          <v-btn>{{ textFilter('team') }}</v-btn>
          <v-btn>{{ textFilter('personal') }}</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col class="text-right">
        <v-btn text color="primary" @click="close"> <v-icon>keyboard_arrow_left</v-icon> {{ textFilter('returnBtn') }} </v-btn>
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
        <v-text-field :label="textFilter('accountLabel')" v-model="data.username"> </v-text-field>
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
          <div class="title">
            <v-icon :color="item.is_online ? 'green' : 'red'">
              {{ item.is_online ? 'check_circle_outline' : 'highlight_off' }}
            </v-icon>
            {{ item.name }}
            <span v-if="userName === item.name">{{ textFilter('currentAccount') }}</span>
          </div>
          <div class="content">
            <div class="row">
              <div>{{ textFilter('immediateSuperior') }}</div>
              <div>{{ item.parent_name }}</div>
              <div>{{ textFilter(isTeam ? 'totalTeamProfitAndLoss' : 'totalProfitAndLoss') }}</div>
              <div>{{ isTeam ? item.team_result : item.personal_result }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter(isTeam ? 'teamRechargeAmount' : 'rechargeAmount') }}</div>
              <div>{{ isTeam ? item.team_deposit : item.personal_deposit }}</div>
              <div>{{ textFilter(isTeam ? 'teamCashWithdrawal' : 'withdrawalAmount') }}</div>
              <div>{{ isTeam ? item.team_withdrawal : item.personal_withdrawal }}</div>
            </div>
            <div class="row">
              <div>{{ textFilter(isTeam ? 'teamBetAmount' : 'betAmount') }}</div>
              <div>{{ isTeam ? item.team_bet : item.personal_bet }}</div>
              <div>{{ textFilter(isTeam ? 'teamPayoutAmount' : 'payoutAmount') }}</div>
              <div>{{ isTeam ? item.team_payout : item.personal_payout }}</div>
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
import { mapGetters } from 'vuex';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'TeamModal',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      type: 0,
      isShowDateModal: false,
      dateInfo: [],
      data: {
        date: [],
        username: '',
        page: 1,
        num: 10,
      },
      searchData: {},
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyTeamItem', 'userInfo']),
    rangeDatesText() {
      return this.dateInfo.join(this.textFilter('to'));
    },
    userName() {
      return this.userInfo.name || '';
    },
    isTeam() {
      return this.type === 0;
    },
    totalPage() {
      const { total } = this.agencyTeamItem;
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
    'agencyTeamItem.list'(v) {
      v && (this.tableData = this.tableData.concat(v));
    },
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.tableData = [];
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi() {
      const { username, date, page, num } = this.searchData;
      let input = { sub_id: this.info.user_id, page, num };
      username && (input.username = username);
      date.length && (input.start = date[0]);
      date.length && (input.end = date[1]);
      this.$emit('search', input);
    },
    changePage() {
      this.searchData.page++;
      this.callListApi();
    },
    close() {
      this.$emit('close', false);
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
      return textFilter(text, 'layout_userCentre_default_agencyCenter_teamModal_');
    },
  },
};
</script>

<style lang="scss" scoped>
.TeamModal {
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
