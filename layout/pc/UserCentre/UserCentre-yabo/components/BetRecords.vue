<template>
  <div class="BetRecords white pa-5">
    <h3 class="d-flex mt-0 black--text align-center justify-space-between font-size-18 font-weight-400">
      投注记录
      <v-btn class="pa-0 justify-end" text color="#4d9974" @click="ROUTER_PUSH({ name: 'gamesRecord' })">
        <template #default> 更多<v-icon class="ma-0" left>chevron_right</v-icon> </template>
      </v-btn>
    </h3>
    <div class="d-flex flex-wrap">
      <div v-if="!gameRecordList || !gameRecordList.games" class="grey--text min-height-360px d-flex align-center justify-center font-size-14">
        <span>目前还沒有投注记录，<a @click="ROUTER_PUSH({ name: 'ultimate' })" class="primary--text d-inline-block">前往</a></span>
      </div>
      <template v-else>
        <div class="d-flex flex-column width-100 grey--text my-5 border-bottom" v-for="(item, i) in gameRecordList.games.slice(0, 3)" :key="i">
          <h6 class="font-size-18 word-break">{{ platforms[item.game_pid] }}</h6>
          <span class="pb-1 py-1 font-size-11 w100 d-block">{{ item.bet_time | formatDate }}</span>
          <span class="pb-1 py-1 font-size-14 primary--text">
            {{ item.rule_type }} -
            <span class="font-size-12"> {{ item.game_name }} </span>
          </span>
          <span class="pt-1 font-size-14 w100 d-block">
            投注
            <v-icon class="ma-0 font-size-10">chevron_right</v-icon>
            赔率
            <v-icon class="ma-0 font-size-10">chevron_right</v-icon>
            结果
          </span>
          <span class="pb-1 py-1 font-size-14 w100 d-block primary--text">
            {{ item.bet_amount }}
            <v-icon class="ma-0 font-size-10">chevron_right</v-icon>
            {{ item.odds }}
            <v-icon class="ma-0 font-size-10">chevron_right</v-icon>
            {{ item.result_amount }}
          </span>
        </div>
        <v-btn class="ma-0 pa-0 justify-start mw0" text @click="ROUTER_PUSH({ name: 'gamesRecord' })">
          <template #default>...</template>
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
import { map } from 'lodash';

export default {
  name: 'BetRecords',
  props: {},
  created() {
    let param = {
      sort: 'settle_time',
      asc: true,
    };
    // if (this.date.start) {
    //   param['s'] = this.date.start;
    //   param['e'] = this.date.end;
    // }
    this.GET_GAMES_RECORD_LIST(param);
  },
  watch: {},
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['gameRecordList']),
    platforms() {
      return this.gameRecordList?.platforms;
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'GET_GAMES_RECORD_LIST']),
    formatNumber(n) {
      return n.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
  },
};
</script>
