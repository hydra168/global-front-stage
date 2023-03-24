<template>
  <!-- 遊戲紀錄 -->
  <div class="GamesRecord">
    <div class="width-940px position-relative overflow-hidden withdrawals-form">
      <!-- 搜尋 -->
      <div class="white pa-5">
        <h3 class="mt-0 font-size-18 black--text font-weight-400">投注记录</h3>
        <p class="mt-5 font-size-14 grey--text">当前系统支持查询最近30日的交易记录</p>
        <!-- <div class="mt-14px d-flex align-center gap-15 font-size-14 grey--text">
          <label>查看 :</label>
          <v-select v-model="recordType" :items="recordTypes" no-title solo outlined dense yabo></v-select>
        </div> -->
        <div class="mt-14px d-flex align-center gap-15 font-size-14 grey--text">
          <label>时间 :</label>
          <Daterange
            v-model="date"
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

          <v-btn class="width-100px" color="primary" @click="getGameList()">{{ $t('g_common_searchBar_searchBtn') }}</v-btn>
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
                <th v-for="item in headers" :key="item.text">
                  {{ textFilter(item.text) }}
                </th>
              </tr>
            </thead>
          </template>
          <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
          <template v-if="tableData.length" v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ platforms[item.game_pid] }} / {{ item.game_name }}</td>
                <td class="text-right">{{ item.round_no }}</td>
                <td class="text-center">{{ item.rule_type === '定位胆' ? textDingWeiDan : item.rule_type }}</td>
                <td class="text-right">{{ config.unit }}{{ item.bet_amount | money }}</td>
                <td class="text-right">{{ config.unit }}{{ item.payout_amount | money }}</td>
                <td class="text-right">{{ config.unit }}{{ item.result_amount | money }}</td>
                <td class="text-right">{{ item.bet_time | formatDate }}</td>
                <td class="text-right">{{ item.settle_time | formatDate }}</td>
                <td class="text-center">
                  <v-btn @click.stop="showDetail(item)" color="primary" small outlined>{{ textFilter(tableTitle) }}</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-if="tableData.length" v-slot:footer>
            <div class="px-5 py-3">
              <v-row v-for="item in titles" :key="item.name">
                <v-col :cols="9" class="text-right">
                  <span class="text-subtitle-1 font-weight-black">{{ textFilter(item.name) }}</span>
                </v-col>
                <v-col :cols="3" class="text-right">{{ config['unit'] }} {{ sums[item.money] }}</v-col>
              </v-row>
            </div>
          </template>
        </v-data-table>
        <v-pagination v-if="pagination.length" v-model="pagination.page" :length="pagination.length" :total-visible="10"></v-pagination>
      </div>
    </div>

    <!-- 明細 -->
    <v-dialog v-if="isShowDetail" v-model="isShowDetail" max-width="800px">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          <h3 class="text-center">{{ textFilter(tableTitle) }}</h3>
        </v-card-title>
        <v-card-text>
          <template v-if="!detailData.sport">
            <v-row v-for="(el, k) in detailData" :key="k" class="">
              <!-- 標題 -->
              <v-col :cols="4">
                <span class="text-subtitle-1 font-weight-black">{{ el.title }}</span>
              </v-col>
              <!-- 內容 -->
              <v-col :cols="8" v-if="k === 'Platform'">{{ el.value | formatDate }}</v-col>
              <v-col :cols="8" v-if="k === 'BetTime' || k === 'EndTime'">{{ el.value | formatDateAdd8Hours }}</v-col>
              <v-col :cols="8" v-else-if="k === 'Numbers'">
                <v-chip v-for="(num, kk) in el.value" :key="kk" class="ma-2" color="info" small>{{ num }} </v-chip>
              </v-col>
              <v-col :cols="8" v-else>{{ el.value }}</v-col>

              <v-col :cols="12"><v-divider></v-divider></v-col>
            </v-row>
          </template>
          <template v-else>
            <h3 class="mb-3">
              {{ detailData.sport.GameType }}
            </h3>
            <h4 class="mb-3">{{ detailData.sport.Oddsname }} @ {{ detailData.sport.Odds }}&nbsp;&nbsp;{{ oddTypes[detailData.sport.Oddstype] }}</h4>

            <h4>盘口：</h4>
            <div class="pa-1">
              <p>{{ detailData.sport.Bettype }}({{ detailData.sport.Eventpart }})</p>
              <p>{{ detailData.sport.P1 }} vs. {{ detailData.sport.P2 }}</p>
              <p>{{ detailData.sport.Event }}</p>
              <p>{{ new Date(`${detailData.sport.Starttime.split(' ').join('T')}Z`) | formatDate }}</p>
            </div>
            <h4>是否滚球 :</h4>
            <div class="pa-1">
              <p>{{ $t(['否', '是'][detailData.sport.Islive ? 1 : 0]) }}</p>
            </div>
            <h4>結果 :</h4>
            <div class="pa-1">
              <p>{{ stats[detailData.sport.Status] }}</p>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { gameTitleMap } from '@ASSETS/userCentre/gameInfo';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
import { textFilter } from '@UTILS/i18n';
import {
  PC_GAMESRECORD_TABLE_TITLE,
  PC_GAMESRECORD_TABLEHEADERS_TYPE,
  PC_GAMESRECORD_TABLEHEADERS_PERIOD,
  PC_GAMESRECORD_TABLEHEADERS_PLAY,
  PC_GAMESRECORD_TABLEHEADERS_BETTING,
  PC_GAMESRECORD_TABLEHEADERS_PAYOUT,
  PC_GAMESRECORD_TABLEHEADERS_RESULT,
  PC_GAMESRECORD_TABLEHEADERS_BETTINGTIME,
  PC_GAMESRECORD_TITLE_TOTALBET,
  PC_GAMESRECORD_TITLE_TOTALPAYOUT,
  PC_GAMESRECORD_TITLE_WINORLOSE,
  GAMESRECORD_CHANGE_TEXT_DINGWEIDAN,
} from '@G/consts';

export default {
  name: 'GamesRecord',
  components: { Daterange },
  data() {
    return {
      dateRange,
      date: {},
      tableData: [],
      tableHeaders: [
        {
          text: PC_GAMESRECORD_TABLEHEADERS_TYPE,
          sortable: false,
          value: 'game_pid',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_PERIOD,
          sortable: true,
          value: 'round_no',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_PLAY,
          sortable: false,
          value: 'rule_type',
          align: 'center',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_BETTING,
          sortable: true,
          value: 'bet_amount',
          align: 'right',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_PAYOUT,
          sortable: true,
          value: 'payout_amount',
          align: 'right',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_RESULT,
          sortable: true,
          value: 'result_amount',
          align: 'right',
        },
        {
          text: PC_GAMESRECORD_TABLEHEADERS_BETTINGTIME,
          sortable: true,
          value: 'bet_time',
        },
        {
          text: 'tableHeaders_settlementTime',
          sortable: true,
          value: 'payout_time',
        },
        {
          text: 'tableHeaders_operating',
          sortable: false,
          value: '',
          align: 'center',
        },
      ],
      titles: [
        {
          name: PC_GAMESRECORD_TITLE_TOTALBET,
          money: 'bet',
        },
        {
          name: PC_GAMESRECORD_TITLE_TOTALPAYOUT,
          money: 'payout',
        },
        {
          name: PC_GAMESRECORD_TITLE_WINORLOSE,
          money: 'result',
        },
      ],
      pagination: {
        page: 1,
        length: 0,
        rowsPerPage: 10,
        sort: [],
        desc: [],
      },
      platforms: {},
      isShowDetail: false,
      detailData: {},
      gameTitleMap,
      sums: { bet: '0', payout: '0', result: '0' },
      hideItem: ['CellScore', 'LineCode', 'ChannelID', 'MRate', 'Odds', 'OrderNo', 'SRate', 'DataType', 'Type', 'ID', 'Jackpotcomm'],
      oddTypes: ['', '欧洲盘', '香港盘', '馬来盘', '印尼盘', '分数式'],
      stats: ['', '进行中', '赢', '平局退款', '回滚退款', '提前结算', '输', '订单补正'],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'gameRecordList']),
    tableTitle() {
      return PC_GAMESRECORD_TABLE_TITLE;
    },
    textDingWeiDan() {
      return GAMESRECORD_CHANGE_TEXT_DINGWEIDAN;
    },
  },
  watch: {
    gameRecordList(obj) {
      if (Object.keys(obj).length) {
        this.tableData = obj.games;
        this.platforms = obj.platforms; // 平台種類
        this.pagination.length = obj.pageNums;
        this.pagination.totalItems = obj.total;
        obj.total > 0 && (this.sums = obj.sum);
      }
    },
    'pagination.page'(p) {
      !this.isLoading && this.getGameList(p);
    },
    'pagination.desc'(desc) {
      if (desc != null) this.getGameList();
    },
  },
  mounted() {
    this.getGameList();
    // console.log(GAMESRECORD_CHANGE_TEXT_DINGWEIDAN);
  },
  methods: {
    ...mapMutations(['SET_MESSAGE']),
    ...mapActions(['GET_GAMES_RECORD_LIST']),
    // 取得 遊戲紀錄列表
    async getGameList(page = 1) {
      this.pagination.page = page;
      let param = {
        page,
        num: this.pagination.rowsPerPage,
        sort: this.pagination.sort[0] || 'settle_time',
        asc: this.pagination.desc[0] === undefined ? true : !this.pagination.desc[0], // 後端收 asc
      };
      if (this.date.start) {
        param['s'] = this.date.start;
        param['e'] = this.date.end;
      }
      this.GET_GAMES_RECORD_LIST(param);
    },
    showDetail(item) {
      const contents = JSON.parse(item.contents);
      if (item.detail_json) {
        const { GameName, Rule } = contents;
        const sport = JSON.parse(item.detail_json);
        this.detailData.sport = {
          ...sport[0],
          GameName,
          Rule,
        };
      } else {
        delete this.detailData.sport;
      }
      for (let key in contents) {
        // 過濾資料
        if (this.hideItem.indexOf(key) < 0 && this.gameTitleMap[key]) {
          this.detailData[key] = { title: this.$t(this.gameTitleMap[key]), value: contents[key] };
        }
      }
      // contents.sportsDetail = contents.detailJson && contents.detailJson[0];
      this.isShowDetail = true;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_gamesRecord_');
    },
  },
};
</script>

<style lang="scss" scoped>
.GamesRecord ::v-deep {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
  }
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
