<template>
  <!-- 遊戲紀錄 -->
  <div class="GamesRecord">
    <v-divider></v-divider>
    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col>
        <Daterange
          v-model="date"
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
      <v-col cols="2" class="text-right">
        <v-btn color="primary" depressed @click="getGameList()">{{ textFilter('searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 統計 -->
    <v-row dense>
      <v-col v-for="(item, name) in titles" :key="name" cols="4">
        <v-alert dense outlined border="left" colored-border color="primary">
          <div class="d-flex justify-space-between">
            <span class="align-self-start ml-2">{{ textFilter(item.name) }}</span>
            <span class="text-h6 font-weight-bold" :class="[sums[item.money] > 0 ? 'red--text' : 'green--text']">
              {{ config['unit'] }} {{ sums[item.money] }}
            </span>
          </div>
        </v-alert>
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
              <th v-for="item in headers" :key="item.text">{{ textFilter(item.text) }}</th>
            </tr>
          </thead>
        </template>
        <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
        <template v-if="tableData.length" v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name" :aria-numbers="item.numbers" :aria-playValue="item.pv">
              <td>{{ platforms[item.game_pid] }} / {{ item.game_name }}</td>
              <td class="text-right">{{ item.round_no }}</td>
              <td class="text-center">{{ item.rule_type === '定位胆' ? textDingWeiDan : item.rule_type }}</td>
              <td class="text-right">{{ config['unit'] }} {{ item.bet_amount | money }}</td>
              <td class="text-right">{{ config['unit'] }} {{ item.payout_amount | money }}</td>
              <td class="text-right" :class="[item.result_amount > 0 ? 'red--text font-weight-bold' : 'green--text font-weight-bold']">
                {{ config['unit'] }} {{ item.result_amount | money }}
              </td>
              <td class="text-right">{{ item.bet_time | formatDate }}</td>
              <td class="text-right">{{ item.settle_time | formatDate }}</td>
              <td class="text-center">
                <v-btn @click.stop="showDetail(item)" color="primary" small depressed>{{ textFilter(tableTitle) }}</v-btn>
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
    <v-dialog v-if="isShowDetail" v-model="isShowDetail" max-width="800px">
      <v-card>
        <v-card-title class="text-center py-5 d-flex justify-center">
          <h3 class="text-center">{{ textFilter(tableTitle) }}</h3>
        </v-card-title>
        <v-card-text>
          <template v-if="!detailData.sport">
            <v-row v-for="(item, i) in detailData.contentObj" :key="i" class="">
              <template v-if="$t(item.text)">
                <!-- 標題 -->
                <v-col :cols="4">
                  <span class="text-subtitle-1 font-weight-bold">{{ $t(item.text) }}</span>
                </v-col>
                <!-- 內容 -->
                <v-col :cols="8" v-if="item.label === 'Platform'">{{ item.value | formatDate }}</v-col>
                <v-col :cols="8" v-if="item.label === 'BetTime' || item.label === 'EndTime'">{{ item.value | formatDateAdd8Hours }}</v-col>
                <v-col :cols="8" v-else-if="item.label === 'Numbers'">
                  <div>
                    <v-chip v-for="(n, j) in item.value" :key="j" class="ma-2" color="info" small>{{ n }} </v-chip>
                  </div>
                </v-col>
                <v-col :cols="8" v-else-if="item.label === 'PlayValue'">
                  <div v-for="(numbers, j) in item.value" :key="j">
                    <v-chip class="ma-2" color="info" small v-for="(n, k) in numbers" :key="k">{{ n }}</v-chip>
                    <v-icon v-if="numbers.length == 0" size="x-small">remove </v-icon>
                  </div>
                </v-col>
                <v-col :cols="8" v-else>
                  {{ $t(item.value) }}
                </v-col>
                <v-col :cols="12"><v-divider></v-divider></v-col>
              </template>
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
  PC_GAMESRECORD_TABLEHEADERS_SETTLEMENTTIME,
  PC_GAMESRECORD_TITLE_TOTALBET,
  PC_GAMESRECORD_TITLE_TOTALPAYOUT,
  PC_GAMESRECORD_TITLE_WINORLOSE,
  GAMESRECORD_CHANGE_TEXT_DINGWEIDAN,
  GAMESRECORD_DETAILS_TITLEMAP_ONLYSHOW_WINLOSE,
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
          text: PC_GAMESRECORD_TABLEHEADERS_SETTLEMENTTIME,
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
    onlyShowWinLose() {
      return GAMESRECORD_DETAILS_TITLEMAP_ONLYSHOW_WINLOSE;
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
      // debugger; // eslint-disable-line no-debugger
      const { sport, contentObj } = item;
      this.detailData = {
        sport,
        contentObj,
      };
      this.isShowDetail = true;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_gamesRecord_');
    },
  },
};
</script>

<style lang="scss">
.GamesRecord {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
  }
}
</style>
